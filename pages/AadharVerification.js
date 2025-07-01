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
    if (!validateAadhar(aadharNumber)) {
      setAlertData({
        type: "error",
        title: "Error!",
        message: "Please enter a valid 12-digit Aadhar number.",
      });
      return;
    }

    try {
      startLoading();
      const response = await sendAadhaarOtp(aadharNumber);
      stopLoading();

      if (response && response.data && response.data.reference_id) {
        localStorage.setItem("reference_id", response.data.reference_id); // Store reference_id
        // Removed success alert, redirecting directly
        router.push("/verifyotp");
      } else {
        setAlertData({
          type: "error",
          title: "Error!",
          message: response.data?.message || "Failed to request OTP. Please try again.",
        });
      }
    } catch (error) {
      stopLoading();
      console.error("Error requesting OTP:", error);
      setAlertData({
        type: "error",
        title: "Error!",
        message: error.response?.data?.message || "Error requesting OTP. Please check your input.",
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
        <p className={styles.imageCaption}>Example Aadhaar Number: 123456789012</p>
      </div>

      {/* Aadhaar Input Field */}
      <div className={styles.inputGroup}>
        <label htmlFor="aadharNumber" className={styles.label}>Enter Aadhaar Number</label>
        <input
          id="aadharNumber"
          type="text"
          className={`${styles.input} ${touched.aadharNumber && !aadharNumber ? styles.error : ""}`}
          placeholder="Enter your 12-digit Aadhaar number"
          value={aadharNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
          onChange={(e) => setAadharNumber(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={() => handleTouch("aadharNumber")}
          onFocus={() => handleTouch("aadharNumber")}
          maxLength={14}
          inputMode="numeric"
        />
      </div>

      {/* Continue Button */}
      <button className={styles.continueButton} onClick={handleContinue} disabled={loading}>
        {loading ? "Sending OTP..." : "Continue"}
      </button>

      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}