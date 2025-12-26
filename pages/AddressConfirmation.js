import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AddressConfirmation.module.css";
import { saveAddressDetails } from "../api/loanApi";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import SweetAlert from "../components/SweetAlert";

export default function AddressConfirmation({ startLoading, stopLoading }) {
  useAuthCheck();
  const { loanData } = useAuth();
  useLoanNavigation(loanData);

  const [alertData, setAlertData] = useState(null);
  const router = useRouter();

  // 👉 address_type fixed to "Both"
  const [formData, setFormData] = useState({
    loan_application_id: 1,
    address_type: "Both",
    relation: "",
    relative_name: "",
    contact_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact_number") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      if (numbersOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      await saveAddressDetails(formData);
      stopLoading();
      router.push("/otherinformation");
    } catch (error) {
      stopLoading();
      setAlertData({
        type: "error",
        title: "Error",
        message: "Error saving reference details. Please try again.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Reference Details</h1>
      <p className={styles.subheading}>Your data is completely secure with us</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.references}>Reference Information</p>

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
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Relative">Relative</option>
            <option value="Colleague">Colleague</option>
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

      {alertData && (
        <SweetAlert {...alertData} onClose={() => setAlertData(null)} />
      )}
    </div>
  );
}
