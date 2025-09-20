import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/VerifyOTP.module.css";
import Image from "next/image";
import { sendAadhaarOtp, verifyAadharOtp } from "../api/kycApi";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import useAuthCheck from "../hooks/useAuthCheck";
import { updateLoanStep } from "../api/loanApi";
import SweetAlert from "../components/SweetAlert"; // Import SweetAlert component

export default function VerifyOTP({ startLoading, stopLoading }) {
  useAuthCheck();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null); // State for SweetAlert
  const router = useRouter();
  const inputRefs = useRef([]);
  const { user, loanData, setLoanData } = useAuth();

  // Automatically handle redirection based on loanData
  useLoanNavigation(loanData);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleInputChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const referenceId = localStorage.getItem("session_id");
    try {
      startLoading();
      const response = await verifyAadharOtp(referenceId);
      stopLoading();

      if (response.status === "success") {
        // Removed success alert, redirecting directly
        router.push("/submitselfie");
      } else {
        const msg = response.message.error[0];
        const msg1 = "Incorrect Session Id. Please try again.";
        let testval;
        if(response.data.status === "error"){ testval = msg; }else{ testval = msg;}
        setAlertData({
          type: "error",
          title: "Error!",
          message: testval,
        });
      }
    } catch (err) {
      stopLoading();
      setAlertData({
        type: "error",
        title: "Error!",
        message: "An error occurred. Please try again.",
      });
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setOtp(Array(6).fill(""));
    setTimer(59);
    setError("");
    setLoading(true);
    try {
      startLoading();
      const response = await sendAadhaarOtp();
      stopLoading();
      if (!response.success) {
        setAlertData({
          type: "error",
          title: "Error!",
          message: response.message || "Failed to resend OTP.",
        });
      }
    } catch (err) {
      stopLoading();
      setAlertData({
        type: "error",
        title: "Error!",
        message: "An error occurred while resending OTP.",
      });
    }
    setLoading(false);
  };

  const handleBackToPan = async () => {
    try {
      startLoading();
      const response = await updateLoanStep(
        "completekyc",
        "aadharverification"
      );
      stopLoading();

      if (response.status) {
        // Removed success alert, redirecting directly
        router.push("/aadharverification");
      } else {
        setAlertData({
          type: "error",
          title: "Error!",
          message: "Failed to update navigation step. Please try again.",
        });
      }
    } catch (error) {
      stopLoading();
      console.error("Error updating navigation:", error);
      setAlertData({
        type: "error",
        title: "Error!",
        message: "Error updating navigation. Please try again.",
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.progressContainer}>
        {[1, 2, 3, 4].map((step, index) => (
          <div key={index} className={styles.step}>
            <div
              className={`${styles.circle} ${step === 4 ? styles.activeCircle : ""}`}
            >
              {step}
            </div>
            {step !== 4 && <div className={styles.line}></div>}
          </div>
        ))}
      </div> */}
      <h1 className={styles.heading}>Complete your KYC</h1>
      <p className={styles.subheading}>
        Your Data is Completely Secure with us
      </p>
      <div className={styles.otpImage}>
        <Image
          src="/images/otp.png"
          width={300}
          height={170}
          alt="OTP Verification"
        />
      </div>
      <h2 className={styles.otpHeading}>Verify Aadhar</h2>
      
      <div className={styles.resendContainer}>
        <span className={styles.timer}>
          {timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : "Ready"}
        </span>
      </div>
      <button
        className={styles.continueButton}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Next"}
      </button>
      {/* Back to PAN Button */}
      <button className={styles.backButton} onClick={handleBackToPan}>
        Back to Aadhar
      </button>
      {alertData && (
        <SweetAlert {...alertData} onClose={() => setAlertData(null)} />
      )}
    </div>
  );
}
