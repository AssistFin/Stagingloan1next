import { useState } from 'react';
import styles from '../styles/LoanAgreement.module.css'; // Import the CSS module
import useAuthCheck from '../hooks/useAuthCheck';

export default function LoanAgreementPage() {
  useAuthCheck();
  const [loanDetails, setLoanDetails] = useState({
    borrowerName: '',
    loanAmount: '',
    interestRate: '',
    repaymentPeriod: '',
  });

  const [agreementGenerated, setAgreementGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      loanDetails.borrowerName &&
      loanDetails.loanAmount &&
      loanDetails.interestRate &&
      loanDetails.repaymentPeriod
    ) {
      setAgreementGenerated(true);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Loan Agreement</h1>
      {!agreementGenerated ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Borrower Name:</label>
            <input
              type="text"
              name="borrowerName"
              value={loanDetails.borrowerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Loan Amount ($):</label>
            <input
              type="number"
              name="loanAmount"
              value={loanDetails.loanAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Interest Rate (%):</label>
            <input
              type="number"
              name="interestRate"
              value={loanDetails.interestRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Repayment Period (months):</label>
            <input
              type="number"
              name="repaymentPeriod"
              value={loanDetails.repaymentPeriod}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Generate Agreement
          </button>
        </form>
      ) : (
        <div className={styles.agreementDetails}>
          <h2>Loan Agreement Details</h2>
          <p>
            <strong>Borrower Name:</strong> {loanDetails.borrowerName}
          </p>
          <p>
            <strong>Loan Amount:</strong> ${loanDetails.loanAmount}
          </p>
          <p>
            <strong>Interest Rate:</strong> {loanDetails.interestRate}%
          </p>
          <p>
            <strong>Repayment Period:</strong> {loanDetails.repaymentPeriod} months
          </p>
          <p>
            This agreement is made between {loanDetails.borrowerName} and the lender. The borrower agrees to repay the loan amount of ${loanDetails.loanAmount} with an interest rate of {loanDetails.interestRate}% over a period of {loanDetails.repaymentPeriod} months.
          </p>
          <button
            onClick={() => setAgreementGenerated(false)}
            className={styles.editButton}
          >
            Edit Details
          </button>
        </div>
      )}
    </div>
  );
}