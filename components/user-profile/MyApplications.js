import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import styles from "../../styles/MyApplications.module.css";
import { initiateLoanPayment } from "../../api/payment";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const formatCurrency = (amount) => `₹ ${parseFloat(amount || 0).toFixed(2)}`;
const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleDateString("en-IN") : "-";

const MyApplications = ({ loanApplication }) => {
  const [expandedLoanIds, setExpandedLoanIds] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(null);

  if (!loanApplication || !loanApplication.data) {
    return <p>Loading profile details...</p>;
  }

  const { loans } = loanApplication.data;

  const toggleRepayment = (loanId) => {
    setExpandedLoanIds((prev) =>
      prev.includes(loanId)
        ? prev.filter((id) => id !== loanId)
        : [...prev, loanId]
    );
  };

  const handlePayment = async (loan) => {
    setLoadingPayment(loan.id);
    try {
      const paymentData = {
        loan_application_no: loan.loan_no,
        loan_account_no: loan.loan_disbursal_number,
        current_repayment_amount: loan.current_repayment_amount,
        repayment_amount: loan.repayment_amount,
        loan_amount: loan.loan_amount,
        overdue_amount: loan.overdue_amount,
        interestAmount: loan.interestAmount,
        penalAmount: loan.penalAmount,
        application_id: loan.id,
      };

      const { payment_link } = await initiateLoanPayment(paymentData);
      if (payment_link) {
        window.location.href = payment_link;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoadingPayment(null);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>My Applications</h3>

      {loans?.length > 0 ? (
        loans.map((loan) => (
          <div className={styles.card} key={loan.id}>
            <div className={styles.cardBody}>
              <div className={styles.verticalTable}>
                <div className={styles.tableRow}>
                  <div className={styles.cell}><span>Application No</span><span>{loan.loan_no}</span></div>
                  <div className={styles.cell}><span>Loan A/c No</span><span>{loan.loan_disbursal_number || "-"}</span></div>
                  <div className={styles.cell}><span>Sanctioned Amount</span><span>{formatCurrency(loan.loan_amount)}</span></div>
                  <div className={styles.cell}><span>Disbursal Date</span><span>{formatDate(loan.loan_disbursal_date)}</span></div>
                  <div className={styles.cell}><span>Repayment Amount</span><span>{formatCurrency(loan.repayment_amount)}</span></div>
                  <div className={styles.cell}><span>Repayment Due Date</span><span>{formatDate(loan.repayment_due_date)}</span></div>
                  <div className={styles.cell}><span>Total Interest</span><span>{formatCurrency(loan.interestAmount)}</span></div>
                  <div className={styles.cell}><span>Overdue Interest</span><span>{formatCurrency(loan.overdue_amount)}</span></div>
                  <div className={styles.cell}><span>Penal Amount</span><span>{formatCurrency(loan.penalAmount)}</span></div>
                  <div className={styles.cell}><span>Purpose</span><span>{loan.purpose_of_loan}</span></div>
                  <div className={styles.cell}><span>Disbursal Status</span><span>{loan.loan_disbursal_status}</span></div>
                  <div className={styles.cell}><span>Approval Status</span><span>{loan.admin_approval_status}</span></div>
                  <div className={styles.cell}><span>Closed Status</span><span>{loan.loan_closed_status}</span></div>
                  <div className={styles.cell}><span>Closed Date</span><span>{formatDate(loan.loan_closed_date)}</span></div>
                  <div className={styles.cell}><span>Application Date</span><span>{formatDate(loan.application_date)}</span></div>
                  <div className={styles.cell}><span>Download</span><span>
                    <a
                      href={`${BASE_URL}/updated/kfs-document/${loan.kfs_filename}/${loan.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className={styles.downloadBtn}
                    >
                      <FaDownload style={{ marginRight: 6 }} />
                    </a>
                  </span></div>
                </div>

                {/* New Payment Button Row */}
                {
                  loan.loan_closed_status != "closed" && (
                    <>
                    <div className={styles.tableRow}>
                      <div className={styles.cellFull}>
                        <button
                          onClick={() => handlePayment(loan)}
                          disabled={!loan.repayment_amount || loadingPayment === loan.id}
                          className={styles.payNowButton}
                        >
                          {loadingPayment === loan.id 
                            ? "Processing Payment..." 
                            : loan.repayment_amount 
                              ? `Pay Now (${formatCurrency(loan.current_repayment_amount)})` 
                              : "No Payment Due"}
                        </button>
                      </div>
                    </div>
                    </>
                  )}
                
                {loan.repaymentHistory &&
                  loan.repaymentHistory.length > 0 && (
                    <>
                      <div className={styles.tableRow}>
                        <div className={styles.cellFull}>
                          <button
                            onClick={() => toggleRepayment(loan.id)}
                            className={styles.toggleBtn}
                          >
                            {expandedLoanIds.includes(loan.id)
                              ? "Hide"
                              : "Show"}{" "}
                            Repayment History ↓
                          </button>
                        </div>
                      </div>

                      {expandedLoanIds.includes(loan.id) && (
                        <div className={styles.tableRow}>
                          <div className={styles.cellFull}>
                            <div className={styles.tableSmall}>
                              {loan.repaymentHistory.map((payment, i) => (
                                <div className={styles.tableSmallRow} key={payment.id || i}>
                                  <div className={styles.smallCell}><span>Sl. No.</span><span>{i + 1}</span></div>
                                  <div className={styles.smallCell}><span>Loan A/c No</span><span>{loan.loan_disbursal_number}</span></div>
                                  <div className={styles.smallCell}><span>Payment Date</span><span>{formatDate(payment.payment_date)}</span></div>
                                  <div className={styles.smallCell}><span>Payment Amount</span><span>{formatCurrency(payment.payment_amount)}</span></div>
                                  <div className={styles.smallCell}><span>Principal Payment</span><span>{formatCurrency(payment.principal_payment)}</span></div>
                                  <div className={styles.smallCell}><span>Interest Payment</span><span>{formatCurrency(payment.interest_payment)}</span></div>
                                  <div className={styles.smallCell}><span>Penal</span><span>{formatCurrency(payment.penal)}</span></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No loan applications found.</p>
      )}
    </div>
  );
};

export default MyApplications;