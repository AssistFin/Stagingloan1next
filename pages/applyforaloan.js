import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/ApplyForLoan.module.css";
import useAuthCheck from "../hooks/useAuthCheck";
import Cookies from "js-cookie";
import { applyForLoan } from "../api/loanApi";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import SweetAlert from "../components/SweetAlert"; // Import SweetAlert component

export default function ApplyForALoan({ startLoading, stopLoading }) {
  useAuthCheck();

  const router = useRouter();
  const { user, loanData, setLoanData } = useAuth();

  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [runningLoan, setRunningLoan] = useState("");
  const [touched, setTouched] = useState(false);
  const [alertData, setAlertData] = useState(null); // State for SweetAlert

  // Automatically handle redirection based on loanData
  useLoanNavigation(loanData);

  // Format the raw numeric value for display with ₹ symbol
  const getDisplayValue = (value) => {
    if (!value) return "";
    const numericValue = value.replace(/[^0-9]/g, ""); // Keep only numbers
    return numericValue ? `₹ ${Number(numericValue).toLocaleString("en-IN")}` : "";
  };

  const handleApplyLoan = async () => {
    if (!loanAmount || !loanPurpose || !runningLoan) {
      setAlertData({
        type: "error",
        title: "Error!",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      startLoading();
      const response = await applyForLoan(loanAmount, loanPurpose, runningLoan);
      stopLoading();

      if (response.status) {
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        Cookies.set("loan_application_id", response.data.id, {
          expires,
          secure: true,
          sameSite: "Strict",
        });

        setLoanData(response.data);
        // Removed success alert, redirecting directly
        router.replace("/proofofaddress");
      } else {
        setAlertData({
          type: "error",
          title: "Error!",
          message: response.data?.message || "Failed to apply for loan",
        });
      }
    } catch (error) {
      console.error("Error applying for loan:", error);
      stopLoading();
      setAlertData({
        type: "error",
        title: "Error!",
        message: error.response?.data?.message || "Error applying for loan",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Apply for a Loan</h1>
      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="loanAmount" className={styles.label}>
            How much money you want to borrow?
          </label>
          <input
            id="loanAmount"
            type="text"
            className={`${styles.input} ${styles.rupeeInput} ${touched && !loanAmount ? styles.error : ""}`}
            value={getDisplayValue(loanAmount)}
            onChange={(e) => setLoanAmount(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={() => setTouched(true)}
            onFocus={() => setTouched(true)}
            placeholder="₹ 1,20,000"
            inputMode="numeric"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="loanPurpose" className={styles.label}>
            Purpose of Loan?
          </label>
          <select
            id="loanPurpose"
            className={styles.input}
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          >
            <option value="" disabled>Select Purpose</option>
            <option value="⁠Business purposes">⁠Business purposes</option>
            <option value="EMI payment">EMI Payment</option>
            <option value="Food and Daily Needs">Food and Daily Needs</option>
            <option value="Medical Emergency">Medical Emergency</option>
            <option value="⁠Personal Expenses">⁠Personal Expenses</option>
            <option value="School Fee">School Fee</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.label}>Do you have any running loan?</p>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="runningLoan"
                value="Yes"
                checked={runningLoan === "Yes"}
                onChange={(e) => setRunningLoan(e.target.value)}
              />
              Yes
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="runningLoan"
                value="No"
                checked={runningLoan === "No"}
                onChange={(e) => setRunningLoan(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        <button className={styles.continueButton} onClick={handleApplyLoan}>
          Continue
        </button>
      </div>
      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}