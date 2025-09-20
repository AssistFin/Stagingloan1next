import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AadharVerification.module.css";
import Image from "next/image";
import { sendAadhaarOtp } from "../api/kycApi";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import useAuthCheck from "../hooks/useAuthCheck";
import { updateLoanStep } from "../api/loanApi";
import SweetAlert from "../components/SweetAlert"; // Import SweetAlert component

export default function AadharVerification({ startLoading, stopLoading }) {
  useAuthCheck();
  const [aadharNumber, setAadharNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    aadharNumber: false,
  });
  const [alertData, setAlertData] = useState(null); // State for SweetAlert
  const router = useRouter();
  const { user, loanData, setLoanData } = useAuth();

  // Automatically handle redirection based on loanData
  useLoanNavigation(loanData);

  // Update touched state for a specific field
  const handleTouch = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAadhar = (aadhar) => /^[0-9]{12}$/.test(aadhar);

  const handleContinue = async () => {
    try {
      startLoading();
      const response = await sendAadhaarOtp(aadharNumber);
      stopLoading();

      if (response && response.data && response.data.session_id && response.data.authorization_url) {
        localStorage.setItem("session_id", response.data.session_id); // Store reference_id
        // Removed success alert, redirecting directly
        window.location.href = response.data.authorization_url;
      } else {
        const msg = response.message.error[0];
        const msg1 = "Failed for processing. Please try again.";
        let testval;
        if(response.data.session_id === null){ testval = msg; }else{ testval = msg;}
        setAlertData({
          type: "error",
          title: "Error!",
          message: testval,
        });
      }
    } catch (error) {
      stopLoading();
      console.error("Error for processing :", error);
      setAlertData({
        type: "error",
        title: "Error!",
        message: error.response?.data?.message || "Error for processing. Please check your input.",
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Indicator */}
      {/* <div className={styles.progressContainer}>
        {[1, 2, 3, 4].map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={`${styles.circle} ${step === 3 ? styles.activeCircle : ""}`}>
              {step}
            </div>
            {step !== 4 && <div className={styles.line}></div>}
          </div>
        ))}
      </div> */}

      {/* Heading and Subheading */}
      <h1 className={styles.heading}>Complete your KYC</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>

      {/* Aadhaar Card Example Image */}
      <div className={styles.exampleImage}>
        <Image src="/images/aadharcard.png" width={300} height={200} alt="Aadhaar Card" />
      </div>

      {/* Continue Button */}
      <button className={styles.continueButton} onClick={handleContinue} disabled={loading}>
        {loading ? "Processing..." : "Aadhar Verification Via Digilocker"}
      </button>

      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}