import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddressConfirmation.module.css";
import { saveAddressDetails } from "../api/loanApi";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import SweetAlert from "../components/SweetAlert"; // Added SweetAlert import

export default function AddressConfirmation({ startLoading, stopLoading }) {
  useAuthCheck();
  const { user, loanData, setLoanData } = useAuth();
  
  const [touched, setTouched] = useState({
    address_type: false,
    house_no: false,
    locality: false,
    pincode: false,
    city: false,
    state: false,
    marital_status: false,
  });

  const [alertData, setAlertData] = useState(null); // Added state for SweetAlert

  useLoanNavigation(loanData);

  const [formData, setFormData] = useState({
    loan_application_id: 1,
    address_type: "",
    house_no: "",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    marital_status: "",
    relation: "",
    relative_name: "",
    contact_number: "",
  });

  const router = useRouter();

  const [showPermanentAddressFields, setShowPermanentAddressFields] = useState(false);
  const [showCurrentAddressFields, setShowCurrentAddressFields] = useState(false);

  const handleAddressTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address_type: value,
    }));

    if (value === "Current") {
      setShowPermanentAddressFields(true);
      setShowCurrentAddressFields(false);
    } else if (value === "Permanent") {
      setShowPermanentAddressFields(false);
      setShowCurrentAddressFields(true);
    } else if (value === "Both") {
      setShowPermanentAddressFields(false);
      setShowCurrentAddressFields(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      await saveAddressDetails(formData);
      stopLoading();
      router.push("/otherinformation"); // No success alert, just redirect
    } catch (error) {
      stopLoading();
      setAlertData({
        type: "error",
        title: "Error",
        message: "Error saving address details. Please try again."
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact_number") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      if (numbersOnly.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numbersOnly,
        }));
      }
    } else if (name === "pincode") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      if (numbersOnly.length <= 6) {
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

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchCityAndState(formData.pincode);
    }
  }, [formData.pincode]);

  const fetchCityAndState = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data[0].Status === "Success") {
        setFormData((prevData) => ({
          ...prevData,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        }));
      } else {
        setAlertData({
          type: "error",
          title: "Invalid Pincode",
          message: "The entered pincode is invalid. Please check and try again."
        });
      }
    } catch (error) {
      setAlertData({
        type: "error",
        title: "Error",
        message: "Error fetching city and state information. Please try again."
      });
    }
  };

  const handleTouch = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Select Aadhaar Address Type</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>
      <div className={styles.addressBox}>
        {loanData && loanData.aadharAddress && loanData.aadharAddress.full_address && (
          <span>{loanData.aadharAddress.full_address}</span>
        )}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.formLabel}>
          Address Type:
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="address_type"
                value="Permanent"
                checked={formData.address_type === "Permanent"}
                onChange={handleAddressTypeChange}
                className={styles.radioInput}
              />
              Permanent
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="address_type"
                value="Current"
                checked={formData.address_type === "Current"}
                onChange={handleAddressTypeChange}
                className={styles.radioInput}
              />
              Current
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="address_type"
                value="Both"
                checked={formData.address_type === "Both"}
                onChange={handleAddressTypeChange}
                className={styles.radioInput}
              />
              Both
            </label>
          </div>
        </label>
        {showPermanentAddressFields && (
          <>
            <label className={styles.formLabel}>
              Permanent House No:
              <input
                type="text"
                name="house_no"
                value={formData.house_no}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.formLabel}>
              Permanent Locality:
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.formLabel}>
              Permanent Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
                maxLength={6}
              />
            </label>
            <label className={styles.formLabel}>
              Permanent City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.formLabel}>
              Permanent State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
          </>
        )}
        {showCurrentAddressFields && (
          <>
            <label className={styles.formLabel}>
              Current House No:
              <input
                type="text"
                name="house_no"
                value={formData.house_no}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.formLabel}>
              Current Locality:
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.formLabel}>
              Current Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
                maxLength={6}
              />
            </label>
            <label className={styles.formLabel}>
              Current City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.formLabel}>
              Current State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
          </>
        )}
        {/* <label className={styles.formLabel}>
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
        </label> */}
        <p className={styles.references}>References</p>
        <label className={styles.formLabel}>
          Relation:
          <select
            name="relation"
            value={formData.relation}
            onChange={handleInputChange}
            required
            className={styles.inputBox}
          >
            <option value="">Select</option>
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Child">Child</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Relative">Relative</option>
            <option value="Colleague">Colleague</option>
            <option value="Partner">Partner</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className={styles.formLabel}>
          Name:
          <input
            type="text"
            name="relative_name"
            value={formData.relative_name}
            onChange={handleInputChange}
            required
            className={styles.inputBox}
          />
        </label>
        <label className={styles.formLabel}>
          Contact Number:
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
            required
            className={styles.inputBox}
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      
      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}