import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "../styles/EnachMandate.module.css";
import { fetchLoanBankDetails, submitEnachMandate } from "../api/loanApi";
import { useRouter } from "next/router";

export default function EnachMandate() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subsSessionId, setSubsSessionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  // ✅ 1. Check if redirected back after successful ENACH
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("status") == "completed") {
      router.replace("/loandisbursal"); // immediate redirect without back button clutter
    }
  }, [router]);

  // ✅ 2. Load bank data
  useEffect(() => {
    const getData = async () => {
      try {
        const bank = await fetchLoanBankDetails();
        if (bank) {
          setBankName(bank.bank_name);
          setAccountNumber(bank.account_number);
          setIfscCode(bank.ifsc_code);
        } else {
          setError("Could not load bank account details.");
        }
      } catch (err) {
        console.error("Error loading bank details:", err);
        setError("Error loading bank details.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // ✅ 3. Handle Mandate creation
  const handleProceed = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubsSessionId("");

    try {
      const res = await submitEnachMandate({
        bank_name: bankName,
        account_number: accountNumber,
        ifsc_code: ifscCode,
      });

      if (res && res.status && res.link) {
        setSubsSessionId(res.link);
        setSubmitted(true);
      } else {
        setError(res?.message || "ENACH mandate failed.");
      }
    } catch (err) {
      console.error("Error creating ENACH mandate:", err);
      setError("Error creating ENACH mandate.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 4. Trigger Cashfree SDK checkout
  const handleCheckout = () => {
    if (!subsSessionId) return;

    if (typeof window !== "undefined" && window.Cashfree) {
      const cashfree = window.Cashfree({ mode: "sandbox" }); // Change to 'production' for live
      cashfree.subscriptionsCheckout({
        subsSessionId: subsSessionId,
        redirectTarget: "_self", // Opens in same tab
      });
    } else {
      console.error("Cashfree SDK not loaded yet");
    }
  };

  if (isRedirecting) {
    return (
      <div className={styles.container}>
        <h2 style={{ color: "green" }}>Mandate Successful!</h2>
        <p>Redirecting to loan disbursal page...</p>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
      />

      <div className={styles.container}>
        <h4>e-NACH Mandate in favour of Altura Financial Services Ltd. (via LoanOne)</h4>

        {!submitted && (
          <form onSubmit={handleProceed} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Bank Name</label>
              <input type="text" value={bankName} readOnly required />
            </div>

            <div className={styles.inputGroup}>
              <label>Account Number</label>
              <input type="text" value={accountNumber} readOnly required />
            </div>

            <div className={styles.inputGroup}>
              <label>IFSC Code</label>
              <input type="text" value={ifscCode} readOnly required />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Processing..." : "Proceed For ENACH Mandate"}
            </button>
          </form>
        )}

        {submitted && (
          <div>

            <input type="hidden" name="session_id" value={subsSessionId} />

            <div style={{ marginTop: "20px" }}>
              <button
                type="submit"
                onClick={handleCheckout}
                className={styles["custom-blue-button"]}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
