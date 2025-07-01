import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/ViewLoans.module.css';
import { acceptLoan, fetchLoanApprovalData } from '../../api/loanApi';

export default function ViewLoans() {
  const router = useRouter();
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan approval data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLoanApprovalData();
        console.log(data);
        setLoanData(data.data); 
      } catch (err) {
        setError(err.message || 'Failed to fetch loan data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.query.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!loanData) {
    return <p>No loan data found.</p>;
  }

  const handleLoanAcceptance = async () => {
    try {
      const response = await acceptLoan();
      if (response.status) {  
        router.push("/loandisbursal");
      } else {
        alert("Loan acceptance failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while accepting the loan.");
    }
  };

  return (
    <div className={styles.viewLoansContainer}>
      <div className={styles.viewLoansContent}>
        <p style={{ fontSize: '14px' }}>Loan ID: {loanData.loan_number}</p>
        <h1 className={styles.loanAmount}>₹{parseFloat(loanData.approval_amount).toFixed(2)}</h1>
        <p className={styles.approvedAmount}>Approved Amount</p>

        <div className={styles.loanDetails}>
          <div className={styles.loanForm}>
            <div className={styles.loanFormd}>
              <div className={styles.adjustLeft}>
                <p>Approved Amt:</p>
                <p>₹ {parseFloat(loanData.approval_amount).toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.loanFormd}>
              <div className={styles.adjustLeft}>
                <p>Processing Fee+Tax</p>
                <p>₹ {loanData.processing_fee}</p>
              </div>
              <div className={styles.adjustRight}>
                <p>Loan Disbursal Date:</p>
                <p>{new Date(loanData.approval_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className={styles.loanFormd}>
              <div className={styles.adjustLeft}>
                <p>Repayment Date:</p>
                <p>{new Date(loanData.repay_date).toLocaleDateString()}</p>
              </div>
              <div className={styles.adjustRight}>
                <p>Tenure:</p>
                <p>{loanData.loan_tenure} Days</p>
              </div>
            </div>
          </div>

          <h3 className={styles.repaymentScheduleTitle}>Repayment Schedule</h3>
          <p className={styles.repaymentDetails}>
            Due Date: {new Date(loanData.repay_date).toLocaleDateString()} | Amount: ₹{parseFloat(loanData.approval_amount).toFixed(2)}
          </p>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="terms" className={styles.checkbox} />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I accept the Terms & Conditions
            </label>
          </div>
        </div>

        <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={handleLoanAcceptance}>
          Submit
        </button>
          <button
            className={styles.declineButton}
            onClick={() => router.push("/")}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}