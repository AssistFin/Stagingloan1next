import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/CompleteKYC.module.css";
import Image from "next/image";
import { verifyPan } from "../api/kycApi";
import useLoanNavigation from "../hooks/useLoanNavigation";
import { useAuth } from "../context/AuthContext";
import useAuthCheck from "../hooks/useAuthCheck";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import SweetAlert from "../components/SweetAlert"; // Import SweetAlert component

export default function CompleteKYC({ startLoading, stopLoading }) {
  useAuthCheck();
  const router = useRouter();
  const [panNumber, setPanNumber] = useState("");
  const [nameOnPan, setNameOnPan] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD for API
  const [dobInput, setDobInput] = useState(""); // DD/MM/YYYY for display
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [touched, setTouched] = useState({
    panNumber: false,
    nameOnPan: false,
    dob: false,
  });
  const [alertData, setAlertData] = useState(null); // State for SweetAlert
  const { user, loanData, setLoanData } = useAuth();
  console.log(loanData, "loanData from complete kyc page");

  const calendarRef = useRef(null);

  useLoanNavigation(loanData);

  const handleTouch = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  // Format input to DD/MM/YYYY as user types
  const formatDateInput = (value) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");
    if (digits.length > 8) return dobInput; // Limit to 8 digits (DDMMYYYY)

    // Format as DD/MM/YYYY
    let formatted = "";
    for (let i = 0; i < digits.length; i++) {
      if (i === 2 || i === 4) formatted += "/";
      formatted += digits[i];
    }

    return formatted;
  };

  // Validate and convert DD/MM/YYYY to YYYY-MM-DD
  const validateAndSetDob = (input) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (regex.test(input)) {
      const [day, month, year] = input.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        year >= new Date().getFullYear() - 100 &&
        year <= new Date().getFullYear()
      ) {
        const formattedDate = formatDateToLocalISOString(date);
        setDob(formattedDate);
        return true;
      }
    }
    setDob(""); // Clear dob if invalid
    return false;
  };

  // Handle manual date input with formatting
  const handleDobChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatDateInput(value);
    setDobInput(formattedValue);
    validateAndSetDob(formattedValue); // Validate after formatting
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  const handleContinue = async () => {
    if (!validatePAN(panNumber)) {
      setAlertData({
        type: "error",
        title: "Error!",
        message: "Please enter a valid PAN number (e.g., AAAPA1234A).",
      });
      return;
    }
    if (!dob) {
      setAlertData({
        type: "error",
        title: "Error!",
        message:
          "Please enter a valid Date of Birth in DD/MM/YYYY format or select from the calendar.",
      });
      return;
    }
    if (!termsAccepted) {
      setAlertData({
        type: "error",
        title: "Error!",
        message: "Please accept the Terms & Conditions to proceed.",
      });
      return;
    }

    setLoading(true);
    try {
      startLoading();
      const response = await verifyPan(panNumber, nameOnPan, dob);
      stopLoading();

      if (response["status"] === "success") {
        // Removed success alert, redirecting directly
        router.replace("/aadharverification");
      } else {
        setAlertData({
          type: "error",
          title: "Error!",
          message:
            response.data?.message ||
            "PAN verification failed. Please check your details.",
        });
      }
    } catch (error) {
      console.error(error);
      stopLoading();
      setAlertData({
        type: "error",
        title: "Error!",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  const formatDateToLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.progressContainer}>
        {[1, 2, 3, 4].map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={`${styles.circle} ${step === 2 ? styles.activeCircle : ""}`}>
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

      <div className={styles.exampleImage}>
        <Image
          src="/images/pancard.png"
          width={300}
          height={200}
          alt="Pan Card"
        />
        <p className={styles.imageCaption}>Example PAN Number: XXXXX0000X</p>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="panNumber" className={styles.label}>
          Enter PAN Number
        </label>
        <input
          id="panNumber"
          type="text"
          className={`${styles.input} ${
            touched.panNumber && !panNumber ? styles.error : ""
          }`}
          placeholder="Enter PAN Number (e.g., AAAPA1234A)"
          value={panNumber}
          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
          onBlur={() => handleTouch("panNumber")}
          onFocus={() => handleTouch("panNumber")}
          maxLength={10}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="nameOnPan" className={styles.label}>
          Name as per PAN Card
        </label>
        <input
          id="nameOnPan"
          type="text"
          className={`${styles.input} ${
            touched.nameOnPan && !nameOnPan ? styles.error : ""
          }`}
          placeholder="Enter Name as per PAN Card"
          value={nameOnPan}
          onChange={(e) => setNameOnPan(e.target.value)}
          onBlur={() => handleTouch("nameOnPan")}
          onFocus={() => handleTouch("nameOnPan")}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="dob" className={styles.label}>
          Date of Birth (as per PAN Card)
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="dob"
            type="text"
            className={`${styles.input} ${
              touched.dob && !dob ? styles.error : ""
            }`}
            value={dobInput}
            onChange={handleDobChange}
            onBlur={() => handleTouch("dob")}
            onFocus={() => handleTouch("dob")}
            placeholder="DD/MM/YYYY"
            maxLength={10}
            onClick={() => setShowCalendar(true)}
          />
          <FaCalendarAlt className={styles.calendarIcon} />
        </div>
        {showCalendar && (
          <div ref={calendarRef}>
            <Calendar
              className={`${styles.ccalendar} border rounded`}
              onChange={(date) => {
                const adjustedDate = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                );
                const formattedDate = formatDateToLocalISOString(adjustedDate);
                setDob(formattedDate);
                setDobInput(
                  `${String(date.getDate()).padStart(2, "0")}/${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}/${date.getFullYear()}`
                );
                setShowCalendar(false);
              }}
              maxDate={new Date()}
              minDate={new Date(new Date().getFullYear() - 100, 0, 1)}
              value={dob ? new Date(dob) : null}
            />
          </div>
        )}
        {touched.dob && !dob && (
          <span className={styles.error}>
            Please enter a valid date (DD/MM/YYYY)
          </span>
        )}
      </div>

      <div className={styles.checkboxContainer}>
        <input
          id="terms"
          type="checkbox"
          className={styles.checkbox}
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <label
          htmlFor="terms"
          className={styles.checkboxLabel}
          onClick={() => setShowTermsModal(true)}
        >
          I Accept the <span className={styles.link}>Terms & Conditions</span>
        </label>
      </div>

      <button
        className={styles.continueButton}
        onClick={handleContinue}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Continue"}
      </button>

      {showTermsModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>
              You are agreeing with all details and information provided, and
              you are ready to go further.
            </p>
            <button
              className={styles.closeButton}
              onClick={() => setShowTermsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {alertData && (
        <SweetAlert {...alertData} onClose={() => setAlertData(null)} />
      )}
    </div>
  );
}
