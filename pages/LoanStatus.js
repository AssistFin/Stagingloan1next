import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styles from "../styles/LoanStatus.module.css";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import { updateLoanStep } from "../api/loanApi";
import { FaClock, FaArrowLeft } from "react-icons/fa";
import SweetAlert from "../components/SweetAlert";
import { useState } from "react";

export default function LoanStatus({ startLoading, stopLoading }) {
  useAuthCheck();
  const { user, loanData, setLoanData } = useAuth();
  const router = useRouter();
  const [alertData, setAlertData] = useState(null);

  useLoanNavigation(loanData);

  const handleBackToPan = async () => {
    try {
      startLoading();
      const response = await updateLoanStep("otherinformation", "bankinfo");
      stopLoading();

      if (response["status"]) {
        router.push("/bankinfo");
      } else {
        setAlertData({
          type: "error",
          title: "Navigation Failed",
          message: "Failed to update navigation step. Please try again.",
        });
      }
    } catch (error) {
      stopLoading();
      console.error("Error updating navigation:", error);
      setAlertData({
        type: "error",
        title: "Error",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.h1
        className={styles.heading}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Loan Application Status
      </motion.h1>

      <motion.p
        className={styles.message}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Thank you for your application! It’s currently under review by our team.
        We’ll notify you once a decision is made.
      </motion.p>

      <motion.div
        className={styles.statusContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className={styles.statusHeader}>
          <FaClock className={styles.statusIcon} />
          <h2 className={styles.subheading}>Current Status</h2>
        </div>
        <p className={styles.status}>Under Evaluation</p>
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <p className={styles.note}>
          Please allow some time for processing. Check back later or await our update.
        </p>
      </motion.div>

      <motion.div
        className={styles.buttonContainer}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.button
          className={styles.backButton}
          onClick={handleBackToPan}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className={styles.buttonIcon} />
          Back to Bank Info
        </motion.button>
      </motion.div>

      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </motion.div>
  );
}