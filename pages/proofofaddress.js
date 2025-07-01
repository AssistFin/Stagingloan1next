import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/ProofOfAddress.module.css";
import { submitProofOfAddress } from "../api/loanApi";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import useAuthCheck from "../hooks/useAuthCheck";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa'; // Import the calendar icon
import SweetAlert from "../components/SweetAlert";

export default function ProofOfAddress({ startLoading, stopLoading }) {
  useAuthCheck();
  const router = useRouter();
  const { user, loanData, setLoanData } = useAuth();
  const [alertData, setAlertData] = useState(null);

  // State variables for input fields
  const [dob, setDob] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyIncomeNumber, setMonthlyIncomeNumber] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [incomeReceivedIn, setIncomeReceivedIn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility

  // Track touched state for each field
  const [touched, setTouched] = useState({
    dob: false,
    pinCode: false,
    city: false,
    monthlyIncome: false,
    employmentType: false,
    incomeReceivedIn: false,
  });

  // Automatically handle redirection based on loanData
  useLoanNavigation(loanData);

  useEffect(() => {
    if (pinCode.length === 6) {
      fetchCityName(pinCode);
    }
  }, [pinCode]);

  // Update touched state for a specific field
  const handleTouch = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleContinue = async () => {
    if (!pinCode || !city || !monthlyIncome || !employmentType || !incomeReceivedIn) {
      setAlertData({ type: "error", title: "Error!", message: "Please fill in all required fields" });
      return;
    }

   
    const personalDetails = {
      dob,
      pinCode,
      city,
      monthlyIncomeNumber,
      employmentType,
      incomeReceivedIn,
    };

    setIsSubmitting(true);

    try {
      startLoading();
      const response = await submitProofOfAddress(personalDetails);
      stopLoading();

      if (response.status) {
        console.log(response, "response");
        setTimeout(() => {
          console.log("settimeout");
          router.replace("/completekyc");
        }, 1000);
      } else {
        setAlertData({ type: "error", title: "Error!", message: "Failed to update" });
      }
      
    } catch (error) {
      stopLoading();
      console.error("Error submitting proof of address:", error);
      setAlertData({ type: "error", title: "Error!", message: "Failed to submit details. Please try again" });
    } finally {
      stopLoading();
      setIsSubmitting(false);
    }
  };

  const handleMonthlyIncomeChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value) {
      setMonthlyIncomeNumber(value);
      value = parseInt(value, 10).toLocaleString("en-IN"); 
      setMonthlyIncome(`₹ ${value}`);
    } else {
      setMonthlyIncome("");
    }
  };

  const fetchCityName = async (pin) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      if (data[0]?.Status === "Success") {
        setCity(data[0].PostOffice[0].District);
      } else {
        setAlertData({ type: "error", title: "Error!", message: "Invalid Pin Code" });
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      alert("Error fetching city name");
    }
  };


  const formatDateToLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submit Basic Details</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>

      <div className={styles.formContainer}>
        {/* Date of Birth */}
        <div className={styles.inputGroup}>
          {/* <label htmlFor="dob" className={styles.label}>Date of Birth</label>
          <div className={styles.inputWrapper}>
            <input
              id="dob"
              type="text"
              className={`${styles.input} ${touched.dob && !dob ? styles.error : ''}`}
              value={dob ? new Date(dob).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
              readOnly
              placeholder="DD/MM/YYYY"
              onClick={() => setShowCalendar(true)} 
              onFocus={() => handleTouch("dob")}
              onBlur={() => handleTouch("dob")}
            />
            <FaCalendarAlt className={styles.calendarIcon} /> 
          </div> */}
          {/* Conditionally render the Calendar component */}
          {showCalendar && (
            <Calendar
              className={`${styles.ccalendar} border rounded`}
              onChange={(date) => {
                
                const adjustedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                const selectedDate = formatDateToLocalISOString(adjustedDate);
                setDob(selectedDate);
                setShowCalendar(false);
              }}
              maxDate={new Date()}
              value={dob ? new Date(dob) : null}
            />
          )}
          {touched.dob && !dob && <span className={styles.error}>This field is required</span>}
        </div>

        {/* Pin Code */}
        <div className={styles.inputGroup}>
          <label htmlFor="pinCode" className={styles.label}>Pin Code</label>
          <input
            id="pinCode"
            type="text"
            className={`${styles.input} ${touched.pinCode && !pinCode ? styles.error : ''}`}
            placeholder="Enter your pin code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
            onBlur={() => handleTouch("pinCode")}
            onFocus={() => handleTouch("pinCode")}
            maxLength={6}
            inputMode="numeric"
          />
        </div>

        {/* City */}
        <div className={styles.inputGroup}>
          <label htmlFor="city" className={styles.label}>City</label>
          <input
            id="city"
            type="text"
            className={`${styles.input} ${touched.city && !city ? styles.error : ''}`}
            value={city}
            onBlur={() => handleTouch("city")}
            onFocus={() => handleTouch("city")}
            readOnly
          />
        </div>

        {/* Employment Type */}
        <div className={styles.inputGroup}>
          <label htmlFor="employmentType" className={styles.label}>Employment Type</label>
          <select
            id="employmentType"
            className={`${styles.input} ${touched.employmentType && !employmentType ? styles.error : ''}`}
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            onBlur={() => handleTouch("employmentType")}
            onFocus={() => handleTouch("employmentType")}
            required
          >
            <option value="" disabled>Select</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>
        </div>

        {/* Monthly Income */}
        <div className={styles.inputGroup}>
          <label htmlFor="monthlyIncome" className={styles.label}>Monthly Income</label>
          <input
            id="monthlyIncome"
            type="text"
            className={`${styles.input} ${touched.monthlyIncome && !monthlyIncome ? styles.error : ''}`}
            placeholder="Enter your monthly income"
            value={monthlyIncome}
            onChange={handleMonthlyIncomeChange}
            onBlur={() => handleTouch("monthlyIncome")}
            onFocus={() => handleTouch("monthlyIncome")}
            inputMode="numeric"
          />
        </div>

        {/* Income Received In */}
        <div className={styles.inputGroup}>
          <label htmlFor="incomeReceivedIn" className={styles.label}>Income Received In</label>
          <select
            id="incomeReceivedIn"
            className={`${styles.input} ${touched.incomeReceivedIn && !incomeReceivedIn ? styles.error : ''}`}
            value={incomeReceivedIn}
            onChange={(e) => setIncomeReceivedIn(e.target.value)}
            onBlur={() => handleTouch("incomeReceivedIn")}
            onFocus={() => handleTouch("incomeReceivedIn")}
            required
          >
            <option value="" disabled>Select</option>
            <option value="Account">Account</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        {/* Continue Button */}
        <button
          className={styles.continueButton}
          onClick={handleContinue}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>

        {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
      </div>
    </div>
  );
}