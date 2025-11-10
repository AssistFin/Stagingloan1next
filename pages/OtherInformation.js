import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/OtherInformation.module.css";
import { saveEmploymentDetails } from "../api/loanApi";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import SweetAlert from "../components/SweetAlert"; // Added SweetAlert import
import DayPickerModal from "../components/DayPickerModal";

export default function OtherInformation({ startLoading, stopLoading }) {
  useAuthCheck();
  const { user, loanData, setLoanData } = useAuth();
  const [touched, setTouched] = useState({
    residence_type: false,
    company_name: false,
    designation: false,
    email: false,
    salary_date : false,
    office_address: false,
    education_qualification: false,
    marital_status: false,
    work_experience_years: false,

  });

  const [alertData, setAlertData] = useState(null); // Added state for SweetAlert
  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);


  useLoanNavigation(loanData);

  const handleTouch = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const [formData, setFormData] = useState({
    loan_application_id: 1,
    residence_type: "",
    company_name: "",
    designation: "",
    email: "",
    residence_address: "",
    office_address: "",
    education_qualification: "",
    marital_status: "",
    work_experience_years: "",
    salary_date : "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertData(null); // Clear any previous alerts

    try {
      startLoading();
      await saveEmploymentDetails(formData);
      stopLoading();
      router.push("/bankinfo"); // No success alert, just redirect
    } catch (error) {
      setAlertData({
        type: "error",
        title: "Error",
        message: "Error submitting employment details. Please try again."
      });
      console.error(error);
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "work_experience_years") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      if (numbersOnly.length <= 3) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numbersOnly,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Indicator */}
      {/* <div className={styles.progressContainer}>
        {[5, 6, 7, 8].map((step, index) => (
          <div key={index} className={styles.step}>
            <div
              className={`${styles.circle} ${
                step === 7 ? styles.activeCircle : ""
              }`}
            >
              {step}
            </div>
            {step !== 8 && <div className={styles.line}></div>}
          </div>
        ))}
      </div> */}

      {/* Heading and Subheading */}
      <h1 className={styles.heading}>Other Information</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* <label className={styles.formLabel}>
          Residence Type:
          <select
            name="residence_type"
            value={formData.residence_type}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.residence_type && !formData.residence_type ? styles.error : ''}`}
            onBlur={() => handleTouch('residence_type')}
            onFocus={() => handleTouch('residence_type')}
          >
            <option value="">Select</option>
            <option value="Rental">Rental</option>
            <option value="Owned">Owned</option>
          </select>
        </label> */}

        <label className={styles.formLabel}>
          Company Name:
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.company_name && !formData.company_name ? styles.error : ''}`}
            onBlur={() => handleTouch('company_name')}
            onFocus={() => handleTouch('company_name')}
          />
        </label>

        <label className={styles.formLabel}>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.designation && !formData.designation ? styles.error : ''}`}
            onBlur={() => handleTouch('designation')}
            onFocus={() => handleTouch('designation')}
          />
        </label>

        <label className={styles.formLabel}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.email && !formData.email ? styles.error : ''}`}
            onBlur={() => handleTouch('email')}
            onFocus={() => handleTouch('email')}
          />
        </label>

        {/* <label className={styles.formLabel}>
          Residence Address:
          <input
            type="text"
            name="residence_address"
            value={formData.residence_address}
            onChange={handleInputChange}
            required
            className={styles.inputBox}
          />
        </label> */}

        {/* ✅ Each Month Salary Date Field (with custom day picker modal) */}
        <label className={styles.formLabel}>
          Each Month Salary Date:
          <input
            type="text"
            name="salary_date"
            value={formData.salary_date ? `${formData.salary_date}` : ""}
            readOnly
            placeholder=""
            onClick={() => setIsDayPickerOpen(true)}
            required
            className={`${styles.inputBox} ${touched.salary_date && !formData.salary_date ? styles.error : ''}`}
            onBlur={() => handleTouch('salary_date')}
            onFocus={() => handleTouch('salary_date')}
          />
          <small className={styles.helperText}>
          </small>
        </label>

        {isDayPickerOpen && (
          <DayPickerModal
            onSelect={(day) =>
              setFormData((prev) => ({ ...prev, salary_date: day }))
            }
            onClose={() => setIsDayPickerOpen(false)}
          />
        )}

        <label className={styles.formLabel}>
          Office Address:
          <input
            type="text"
            name="office_address"
            value={formData.office_address}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.office_address && !formData.office_address ? styles.error : ''}`}
            onBlur={() => handleTouch('office_address')}
            onFocus={() => handleTouch('office_address')}
          />
        </label>

        <label className={styles.formLabel}>
          Education Qualification:
          <select
            name="education_qualification"
            value={formData.education_qualification}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.education_qualification && !formData.education_qualification ? styles.error : ''}`}
            onBlur={() => handleTouch('education_qualification')}
            onFocus={() => handleTouch('education_qualification')}
          >
            <option value="">Select</option>
            <option value="less10thpass">Less 10th Pass</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Post Graduate</option>
          </select>
        </label>

        <label className={styles.formLabel}>
          Marital Status:
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.marital_status && !formData.marital_status ? styles.error : ''}`}
            onBlur={() => handleTouch('marital_status')}
            onFocus={() => handleTouch('marital_status')}
          >
            <option value="">Select</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
          </select>
        </label>

        <label className={styles.formLabel}>
          Work Experience in Years:
          <input
            type="text"
            name="work_experience_years"
            value={formData.work_experience_years}
            onChange={handleInputChange}
            required
            className={`${styles.inputBox} ${touched.work_experience_years && !formData.work_experience_years ? styles.error : ''}`}
            onBlur={() => handleTouch('work_experience_years')}
            onFocus={() => handleTouch('work_experience_years')}
            maxLength={3}
          />
        </label>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}