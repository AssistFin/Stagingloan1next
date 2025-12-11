import { useEffect, useState } from "react";
import Script from "next/script";
import styles from "../styles/EnachMandate.module.css";
import { getBankFromAA, submitAABankDetails } from "../api/loanApi";
import { useRouter } from "next/router";

export default function BankConfirmation() {
  const [customer_name, setCustomerName] = useState("");
  const [loan_application_id, setleadId] = useState("");
  const [bankName, setBankName] = useState("");
  const [maskedAcc, setAccountNumber] = useState("");
  const [confirmAccNo, setConfirmAccNo] = useState("");
  const [ifsc, setIfscCode] = useState("");
  const [apiLast4, setApiLast4] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subsSessionId, setSubsSessionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [accError, setAccError] = useState("");
  const [isAccValid, setIsAccValid] = useState(false);

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
        const bank = await getBankFromAA();
        if (bank) {
          setleadId(bank.loan_application_id);
          setCustomerName(bank.customer_name);
          setBankName(bank.bankName);
          setAccountNumber(bank.maskedAcc);
          setIfscCode(bank.ifsc);
          setApiLast4(bank.last4);
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

    const handleProceed = async (e) => {
    e.preventDefault();

    console.log("🔵 CLICKED SUBMIT");

    if (!isAccValid) {
        setAccError("Account number does not match");
        return;
    }

    setLoading(true);
    setError("");

    let apiResult = null;

    try {
        console.log("🔵 Calling API submitAABankDetails...");

        apiResult = await submitAABankDetails({
        bank_name: bankName,
        account_number: confirmAccNo,
        ifsc_code: ifsc,
        loan_application_id: loan_application_id,
        customer_name: customer_name,
        });

        console.log("🟢 API Response:", apiResult);

        if (apiResult?.status === true) {
            console.log("🟢 STATUS TRUE → Redirecting NOW...");
            window.location.href = "/loanstatus";
        }

        if (apiResult?.status === false) {
            console.log("🔴 STATUS FALSE:", apiResult.message);
            setError(apiResult.message);
            return;
        }

    } catch (err) {
        console.error("🔥 ERROR in handleProceed:", err);
        setError("Error creating Bank Account Details.");
    } finally {
        // ❗ Only reset loading if NOT redirecting
        if (!apiResult?.status) {
            console.log("🟡 FINALLY → No redirect, setting loading=false");
            setLoading(false);
        } else {
            console.log("🟡 FINALLY → Redirecting, so NOT updating state");
        }
    }
    };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className={styles.container}>
        <h4>Bank Account Details for Disbursement</h4>
        <p>We use this bank account for e-nach and disbursement. Your account details are stored securely.</p>
        {(
          <form onSubmit={handleProceed} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Customer Name</label>
              <input type="text" value={customer_name} readOnly required />
            </div>

            <div className={styles.inputGroup}>
              <label>Bank Name</label>
              <input type="text" value={bankName} readOnly required />
            </div>

            <div className={styles.inputGroup}>
              <label>Account Number</label>
              <input type="text" value={maskedAcc} readOnly required />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Account Number</label>
              <input type="text"  value={confirmAccNo} required onChange={(e) => {
                    const val = e.target.value;
                    setConfirmAccNo(val);

                    // Validate last 4 digits
                    if (val.length >= 4) {
                        const last4 = val.slice(-4);

                        if (last4 !== apiLast4) {
                        setAccError("Account number does not match");
                        setIsAccValid(false);
                        } else {
                        setAccError("");
                        setIsAccValid(true);
                        }
                    } else {
                        setAccError("Please enter the full account no");
                        setIsAccValid(false);
                    }
                    }} />

                {accError && <p style={{ color: "red", fontSize: "13px" }}>{accError}</p>}
            </div>

            <div className={styles.inputGroup}>
              <label>IFSC Code</label>
              <input type="text" value={ifsc} readOnly required />
            </div>

            <button type="submit" className={styles.button} disabled={loading || !isAccValid}>
                {loading ? "Processing..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
