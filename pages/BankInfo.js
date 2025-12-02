import { useState } from "react";
import styles from "../styles/BankInfo.module.css";
import { submitBankDetails } from "../api/loanApi";
import SweetAlert from "../components/SweetAlert";

export default function BankInfo() {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const handleContinue = async () => {
    setAlertData(null);
    setLoading(true);

    const loanApplicationId = 1;
    if (!loanApplicationId) {
      setAlertData({
        type: "error",
        title: "Error",
        message: "Loan application ID is missing."
      });
      setLoading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append("loan_application_id", loanApplicationId);

    try {
      const response = await submitBankDetails(uploadData); // no bank name required now

      if (response.status && response.data2) {
        window.location.href = response.data2;  // redirect immediately
      } else {
        setAlertData({
          type: "error",
          title: "Error",
          message: "Failed to generate URL",
        });
      }
    } catch (err) {
      setAlertData({
        type: "error",
        title: "Error",
        message: "API request failed. Try again later.",
      });
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Bank Info</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>

      <button
        className={styles.submitButton}
        onClick={handleContinue}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Continue"}
      </button>

      {alertData && (
        <SweetAlert
          {...alertData}
          onClose={() => setAlertData(null)}
        />
      )}
    </div>
  );
}
