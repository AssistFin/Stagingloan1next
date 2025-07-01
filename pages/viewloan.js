import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/ViewLoans.module.css";
import { acceptLoan, fetchLoanApprovalData } from "../api/loanApi";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function ViewLoans({ startLoading, stopLoading }) {
  useAuthCheck();
  const { user, loanData, setLoanData } = useAuth();
  const router = useRouter();
  const [viewLoanData, setViewLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLoanNavigation(loanData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLoanApprovalData();
        setViewLoanData(data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch loan data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router.query.id]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!viewLoanData) return <p className={styles.noData}>No loan data found.</p>;

  const handleLoanAcceptance = async () => {
    try {
      const response = await acceptLoan(viewLoanData.kfs_path);
      if (response.status) {
        router.push("/loandisbursal");
      } else {
        alert("Loan acceptance failed. Please try again.");
      }
    } catch (error) {
      stopLoading();
      alert("An error occurred while accepting the loan.");
    }
  };

  return (
    <div className={styles.viewLoansContainer}>
      <div className={styles.viewLoansContent}>
        <p className={styles.loanId}>Loan ID: {viewLoanData.loan_number}</p>
        <h1 className={styles.loanAmount}>
          ₹{parseFloat(viewLoanData.approval_amount).toFixed(2)}
        </h1>
        <p className={styles.approvedAmount}>Approved Amount</p>

        <div className={styles.loanDetails}>
          <div className={styles.loanInfoGrid}>
            <div className={styles.loanInfoItem}>
              <p className={styles.label}>Approved Amount:</p>
              <p className={styles.value}>
                ₹{parseFloat(viewLoanData.approval_amount).toFixed(2)}
              </p>
            </div>
            <div className={styles.loanInfoItem}>
              <p className={styles.label}>Processing Fee + Tax:</p>
              <p className={styles.value}>
                ₹
                {(Number(viewLoanData.processing_fee_amount) +
                  Number(viewLoanData.gst_amount)).toFixed(2)}
              </p>
            </div>
            <div className={styles.loanInfoItem}>
              <p className={styles.label}>Loan Disbursal Date:</p>
              <p className={styles.value}>
                {new Date(viewLoanData.approval_date).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.loanInfoItem}>
              <p className={styles.label}>Repayment Date:</p>
              <p className={styles.value}>
                {new Date(viewLoanData.repay_date).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.loanInfoItem}>
              <p className={styles.label}>Tenure:</p>
              <p className={styles.value}>{viewLoanData.loan_tenure_days} Days</p>
            </div>
          </div>

          <h3 className={styles.repaymentScheduleTitle}>Repayment Schedule</h3>
          <p className={styles.repaymentDetails}>
            Due Date: {new Date(viewLoanData.repay_date).toLocaleDateString()} | Amount: ₹
            {parseFloat(viewLoanData.repayment_amount).toFixed(2)}
          </p>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="terms" className={styles.checkbox} />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I accept the{" "}
              <a
                href={`${BASE_URL}/kfs-document/${viewLoanData.kfs_path}/${viewLoanData.loan_application_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
              Sanction Terms, KFS and Loan Agreement
              </a>
            </label>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.submitButton} onClick={handleLoanAcceptance}>
            Submit
          </button>
          {/* <button className={styles.declineButton} onClick={() => router.push("/")}>
            Decline
          </button> */}
        </div>
      </div>
    </div>
  );
}