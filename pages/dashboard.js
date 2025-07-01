import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";
import useAuthCheck from "../hooks/useAuthCheck";


export default function Dashboard() {
  useAuthCheck();
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobileFromStorage = localStorage.getItem("mobile");
      if (mobileFromStorage) {
        setMobileNumber(mobileFromStorage);
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.profileWrapper}>
            {/* Profile Icon */}
            <div
              className={styles.profileIcon}
              onClick={() => router.push("/user-profile")}
              title="Go to Profile"
            >
              <i className="bi bi-person-circle"></i>
            </div>
            {/* Mobile Number and Greeting */}
            <div>
              <p className={styles.mobileNumber}>+91 {mobileNumber}</p>
              <p className={styles.greetingText}>{getGreeting()}</p>
            </div>
          </div>
          <div className={styles.bell} title="Notifications">
            <i className="bi bi-bell"></i>
          </div>
        </div>

        {/* Loan Information Section */}
        <div className={styles.loanInfo}>
          <div className={styles.loanDetail}>
            <p className={styles.loanLabel}>Maximum Loan</p>
            <p className={styles.loanValue}>₹1,00,000</p>
          </div>
          <div className={styles.loanDetail}>
            <p className={styles.loanLabel}>Maximum Tenure</p>
            <p className={styles.loanValue}>Max 90 Days</p>
          </div>
        </div>

        {/* Instant Apply Section */}
        <div className={styles.instantApplySection}>
          <p className={styles.instantApplyHeading}>Instant Apply</p>
          <p className={styles.instantApplyDetails}>
            KYC | Basic Details | Disbursal
          </p>
          <p className={styles.instantApplyDetails}>
            Minimum Document, Online Process
          </p>
          <button
            className={styles.applyButton}
            onClick={() => router.push("/applyforaloan")}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
