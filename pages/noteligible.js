import React from 'react';
import Link from 'next/link';
import styles from '../styles/LoanManagement.module.css';

const NotEligible = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
        {/* Main Not Eligible Card */}
        <div className={styles.mainCard}>
          <h1 className={styles.mainHeading}>Not Eligible</h1>
          <p className={styles.mainMessage}>
            We&apos;re sorry, but you don’t meet the current eligibility criteria for a loan with LoanOne.
          </p>
        </div>

        {/* Guidance Card */}
        <div className={styles.guidanceCard}>
          <h2 className={styles.guidanceTitle}>What to Do Next</h2>
          <ul className={styles.guidanceList}>
            <li>
              <strong>Check Eligibility:</strong>{' '}
                Review our criteria
            </li>
            <li>
              <strong>Get Help:</strong>{' '}
              <a href="mailto:info@assistfin.com" className={styles.link}>
                Email us
              </a>{' '}
              or call{' '}
              <a href="tel:7700840543" className={styles.link}>7700840543</a> for assistance.
            </li>
            <li>
              <strong>Explore Options:</strong> Reapply after meeting the criteria or explore other products.
            </li>
          </ul>
          <Link href="/applyforaloan" className={styles.applyButton}>
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotEligible;