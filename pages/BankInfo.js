import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/BankInfo.module.css";
import { generateBankUrl } from "../api/loanApi"; // your new API
import SweetAlert from "../components/SweetAlert";

export default function BankInfo() {
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertData(null);

    if (!bankName) {
      return setAlertData({
        type: "error",
        title: "Missing Info",
        message: "Please select a bank",
      });
    }

    setLoading(true);
    try {
      const response = await generateBankUrl({   
        bank_name: bankName,
      });

      if (response.status && response.data?.url) {
        setGeneratedUrl(response.data.url);
        setAlertData({
          type: "success",
          title: "Success",
          message: "URL generated successfully. Continue to proceed!",
        });
      } else {
        setAlertData({
          type: "error",
          title: "Error",
          message: "Something went wrong. Try again.",
        });
      }
    } catch (err) {
      setAlertData({
        type: "error",
        title: "Error",
        message: "Could not generate link. Please try later.",
      });
    }
    setLoading(false);
  };

  const handleContinue = () => {
    if (generatedUrl) {
      window.location.href = generatedUrl;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Bank Info</h1>
      <p className={styles.subheading}>Your Data is Completely Secure with us</p>

      {!generatedUrl ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.formLabel}>
            Select your Bank Name:
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
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
              {/* Add the rest of your banks */}
            </select>
          </label>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      ) : (
        <button className={styles.submitButton} onClick={handleContinue}>
          Continue
        </button>
      )}

      {alertData && (
        <SweetAlert
          {...alertData}
          onClose={() => setAlertData(null)}
        />
      )}
    </div>
  );
}
