import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/BankInfo.module.css";
import { PDFDocument } from "pdf-lib";
import { submitBankDetails } from "../api/loanApi";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import SweetAlert from "../components/SweetAlert";

export default function BankInfo({ startLoading, stopLoading }) {
  useAuthCheck();
  const { user, loanData, setLoanData } = useAuth();

  useLoanNavigation(loanData);

  const [formData, setFormData] = useState({
    bankName: "",
    pdfFile: null,
    pdfPassword: "",
  });
  const [showPdfPassword, setShowPdfPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.redirectToBankInfo === "true") {
      setLoading(false);
    }
  }, [router.query.redirectToBankInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pdfFile: file,
    }));

    const reader = new FileReader();
    reader.onload = async (event) => {
      const uint8Array = new Uint8Array(event.target.result);
      try {
        const pdfDoc = await PDFDocument.load(uint8Array, { ignoreEncryption: true });
        if (pdfDoc.isEncrypted) {
          setShowPdfPassword(true);
        } else {
          setShowPdfPassword(false);
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
        setAlertData({
          type: "error",
          title: "PDF Error",
          message: "Error loading PDF file. Please try a different file."
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertData(null);

    if (!formData.bankName || !formData.pdfFile) {
      setAlertData({
        type: "error",
        title: "Missing Information",
        message: "Please select a bank and upload a PDF file."
      });
      return;
    }

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
    uploadData.append("bank_name", formData.bankName);
    uploadData.append("bank_statement", formData.pdfFile);
    uploadData.append("bank_statement_password", formData.pdfPassword);

    try {
      startLoading();
      const response = await submitBankDetails(uploadData);
      stopLoading();
      if (response.status) {
        setAlertData({
          type: "success",
          title: "Success",
          message: "Bank details submitted successfully!",
          onClose: () => {
            setAlertData(null);
            router.push("/loanstatus");
          }
        });
      } else {
        setAlertData({
          type: "error",
          title: "Submission Failed",
          message: "Failed to submit bank details. Please try again."
        });
      }
    } catch (error) {
      setAlertData({
        type: "error",
        title: "Error",
        message: "An error occurred. Please try again."
      });
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Indicator */}
      {/* <div className={styles.progressContainer}>
        {[5, 6, 7, 8].map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={`${styles.circle} ${step === 8 ? styles.activeCircle : ""}`}>
              {step}
            </div>
            {step !== 8 && <div className={styles.line}></div>}
          </div>
        ))}
      </div> */}

      {/* Heading and Subheading */}
      <h1 className={styles.heading}>Bank Info</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.formLabel}>
          Select your Bank Name:
          <select
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            required
            className={styles.inputBox}
          >
            <option value="">Select a Bank</option>
            <option value="Axis">Axis Bank</option>
            <option value="Baroda">Bank of Baroda</option>
            <option value="Maharashtra">Bank of Maharashtra</option>
            <option value="Canara">Canara Bank</option>
            <option value="Federal">Federal Bank</option>
            <option value="HDFC">HDFC Bank</option>
            <option value="Induslnd">Induslnd Bank</option>
            <option value="ICICI">ICICI Bank</option>
            <option value="IDBI">IDBI Bank</option>
            <option value="IDFC">IDFC First Bank</option>
            <option value="South">South Indian Bank</option>
            <option value="City">City Union Bank</option>
            <option value="HSBC">HSBC Bank</option>
            <option value="Overseas">Indian Overseas Bank</option>
            <option value="Kotak">Kotak Mahindra Bank</option>
            <option value="PNB">Punjab National Bank (PNB)</option>
            <option value="SBI">State Bank of India (SBI)</option>
            <option value="Syndicate">Syndicate Bank</option>
            <option value="UCO">UCO Bank</option>
            <option value="Union">Union Bank of India</option>
            <option value="Yes">Yes Bank</option>
            <option value="Indian">Indian Bank</option>
            <option value="Central">Central Bank of India</option>
            <option value="PunjabSind">Punjab & Sind Bank</option>
            <option value="AUSFB">AU Small Finance Bank</option>
            <option value="Equitas">Equitas Small Finance Bank</option>
            <option value="Ujjivan">Ujjivan Small Finance Bank</option>
            <option value="Jana">Jana Small Finance Bank</option>
            <option value="Suryoday">Suryoday Small Finance Bank</option>
            <option value="CapitalSFB">Capital Small Finance Bank</option>
            <option value="NorthEastSFB">North East Small Finance Bank</option>
            <option value="UtkarshSFB">Utkarsh Small Finance Bank</option>
            <option value="ESAFSFB">ESAF Small Finance Bank</option>
            <option value="FincareSFB">Fincare Small Finance Bank</option>
            <option value="ShivalikSFB">Shivalik Small Finance Bank</option>
            <option value="Citi">Citi Bank</option>
            <option value="Deutsche">Deutsche Bank</option>
            <option value="Standard">Standard Chartered Bank</option>
            <option value="BankAmerica">Bank of America</option>
            <option value="Barclays">Barclays Bank</option>
            <option value="BNP">BNP Paribas</option>
            <option value="DBS">DBS Bank</option>
            <option value="RBS">RBS</option>
            <option value="Tamilnad">Tamilnad Mercantile Bank</option>
            <option value="RBL">RBL Bank</option>
            <option value="Nainital">Nainital Bank</option>
            <option value="Karnataka">Karnataka Bank</option>
            <option value="Jammu">Jammu & Kashmir Bank</option>
            <option value="DCB">DCB Bank</option>
            <option value="CSB">CSB Bank</option>
            <option value="Bandhan">Bandhan Bank</option>
          </select>
        </label>

        <p>Please upload your 6-month Bank Statement for the account where your Salary/Income is deposited</p>
        <label className={styles.formLabel}>
          PDF Upload:
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className={`${styles.inputBox} ${styles.fileInput}`}
          />
        </label>

        {showPdfPassword && (
          <label className={styles.formLabel}>
            PDF Password:
            <input
              type="password"
              name="pdfPassword"
              value={formData.pdfPassword}
              onChange={handleInputChange}
              required
              className={styles.inputBox}
            />
          </label>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Please Wait</h4>
            <p>Your Loan is under Evaluation. We will notify you once we are ready with the decision.</p>
            <button onClick={() => router.push("/loanstatus")} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      {alertData && <SweetAlert {...alertData} onClose={alertData.onClose || (() => setAlertData(null))} />}
    </div>
  );
}