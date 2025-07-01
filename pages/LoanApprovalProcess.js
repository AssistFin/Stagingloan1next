// pages/LoanApprovalProcess.js
import React from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/LoanApprovalProcess.module.css";
import useAuthCheck from '../hooks/useAuthCheck';

const LoanApprovalProcess = () => {
  useAuthCheck();
  const router = useRouter();

  const handleContinue = () => {
    router.push('/LoanApproved');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome Back, Ram 👋</h1>
      </div>
      <div className={styles.content}>
        <h2>Your loan approval is in process</h2>
        <div className={styles.progressBar}>
          <div className={`${styles.step} ${styles.completed}`}><p className={styles.stepText}>KYC</p></div>
          <div className={styles.line}></div>
          <div className={`${styles.step} ${styles.completed}`}><p className={styles.stepText}>Personal Details</p></div>
          <div className={styles.line}></div>
          <div className={styles.step}><p className={styles.stepText}>Get Disbursal</p></div>
        </div>
        <p style={{fontSize:'14px', marginTop:'30px'}}>Were now preparing for approval<br />Please wait a moment.</p>
        <button className={styles.reviewButton} onClick={handleContinue}>Under review</button>
      </div>
    </div>
  );
};

export default LoanApprovalProcess;

