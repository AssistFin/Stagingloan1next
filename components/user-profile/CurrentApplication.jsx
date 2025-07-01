import React from 'react';
import styles from '../../styles/CurrentApplication.module.css';

const CurrentApplication = ({ application }) => {
  const steps = ['Processing', 'Bank Allocated', 'Approved', 'Disbursed'];
  const currentStep = steps.indexOf(application.status);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Current Loan Application</h3>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h5>Home Loan</h5>
          <span className={styles.date}>{application.submittedDate}</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.message}>
            <h6>Application ID: {application.applicationId}</h6>
            <p className={styles.success}>Congratulations!</p>
            <p className={styles.subtext}>
              Your loan has been approved. We will contact you for disbursal.
            </p>
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`${styles.progressSegment} ${index <= currentStep ? styles.active : ''}`}
                  style={{ width: `${100 / steps.length}%` }}
                ></div>
              ))}
            </div>
            <div className={styles.stepLabels}>
              {steps.map((step, index) => (
                <span key={step} className={`${styles.stepLabel} ${index <= currentStep ? styles.active : ''}`}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>Application Preview</h5>
          <div className={styles.grid}>
            <div>
              <h6 className={styles.subTitle}>Personal Information</h6>
              <p><strong>Name:</strong> {application.applicantName || 'N/A'}</p>
              <p><strong>Email:</strong> {application.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {application.phone || 'N/A'}</p>
              <p><strong>Residence Type:</strong> {application.residenceType || 'N/A'}</p>
            </div>
            <div>
              <h6 className={styles.subTitle}>Loan Details</h6>
              <p><strong>Loan Type:</strong> {application.type || 'N/A'}</p>
              <p><strong>Amount:</strong> ₹{application.amount || 'N/A'}</p>
              <p><strong>Status:</strong> <span className={styles.badgeSuccess}>{application.status}</span></p>
              <p><strong>Submitted:</strong> {application.submittedDate || 'N/A'}</p>
            </div>
            <div>
              <h6 className={styles.subTitle}>Bank Details</h6>
              <p><strong>Bank Allocated:</strong> {application.bankAllocated || 'N/A'}</p>
              <p><strong>Last Updated:</strong> {application.lastUpdated || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentApplication;