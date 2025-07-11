import { useAuth } from "../context/AuthContext";
import useAuthCheck from "../hooks/useAuthCheck";
import useLoanNavigation from "../hooks/useLoanNavigation";
import styles from "../styles/LoanManagement.module.css";
import { useEffect, useState } from "react";
import { fetchLoanApprovalData, fetchLoanDisbursalData } from "../api/loanApi";

export default function LoanStatus({ startLoading, stopLoading }) {
  useAuthCheck();
  const { user, loanData, setLoanData } = useAuth();
  const [loan, setLoan] = useState(null);
  const [loanDisbursal, setLoanDisbursal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLoanNavigation(loanData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loanDataRes = await fetchLoanApprovalData();
        setLoan(loanDataRes.data);

        const disbursalRes = await fetchLoanDisbursalData();
        setLoanDisbursal(disbursalRes.data);
      } catch (err) {
        setError(err.message || "Failed to fetch loan data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!loan) return <p className={styles.noData}>No loan data found.</p>;

  return (
    <div className={styles.loanStatusContainer}>
      <div className={styles.loanCard}>
        <h1 className={styles.loanAmount}>
          ₹{parseFloat(loan.approval_amount).toFixed(2)}
        </h1>
        <p className={styles.loanStatus}>
          Loan Status: <span className={styles.statusText}>Approved</span>
        </p>
      </div>

      <div className={styles.repaymentCard}>
        <h3 className={styles.repaymentTitle}>Repayment Schedule</h3>
        {loan.repay_date && (
          <div className={styles.repaymentItem}>
            <p className={styles.repaymentDate}>
              <strong>Due Date:</strong> {new Date(loan.repay_date).toLocaleDateString()}
            </p>
            <p className={styles.repaymentAmount}>
              <strong>Amount:</strong> ₹{parseFloat(loan.repayment_amount).toFixed(2)}
            </p>
            <p
              className={`${styles.repaymentStatus} ${
                loanDisbursal ? styles.statusPaid : styles.statusOverdue
              }`}
            >
              <strong>Status:</strong> {loanDisbursal ? "Disbursed" : "Pending for Disbursement"}
            </p>
          </div>
        )}
      </div>
        <div className={styles.helpText}>
              <p>Your Loan Amount will be disbursed in next 2 Hours</p>
              <p>Need help for payment, please call at +917700840543</p>
            </div>
    </div>
  );
}