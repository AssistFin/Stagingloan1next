import { useRouter } from "next/router";
import styles from '../styles/LoanManagement.module.css';
import useAuthCheck from "../hooks/useAuthCheck";

export default function LoanManagement() {
  useAuthCheck();
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboardContent}>
        <h1 className={styles.pageTitle}>Loan Management Dashboard</h1>
        <div className={styles.buttonGroup}>
          {/* Button for Not Eligible */}
          <button
            className={styles.dashboardButton}
            onClick={() => navigateTo("/LoanManagement/not-eligible")}
          >
            Sorry, You Are Not Eligible
          </button>

          {/* Button for View Loan */}
          <button
            className={styles.dashboardButton}
            onClick={() => navigateTo("/LoanManagement/view-loan")}
          >
            View Loan with Terms
          </button>

          {/* Button for Loan Status */}
          <button
            className={styles.dashboardButton}
            onClick={() => navigateTo("/LoanManagement/loan-status")}
          >
            Loan Status
          </button>

          {/* Button for No Dues */}
          <button
            className={styles.dashboardButton}
            onClick={() => navigateTo("/LoanManagement/no-dues")}
          >
            No Due Payment
          </button>
        </div>
      </div>
    </div>
  );
}
