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
  const [accError, setAccError] = useState("");
  const [isAccValid, setIsAccValid] = useState(false);

  const router = useRouter();

  /* ---------------------------------------
     DEFINITION:
     A masked account number is one that
     contains 'X' or '*'
  ---------------------------------------- */
  const isMaskedAccount =
    maskedAcc?.includes("X") || maskedAcc?.includes("*");

  // ✅ Redirect after ENACH success
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("status") === "completed") {
      router.replace("/loandisbursal");
    }
  }, [router]);

  // ✅ Load bank details
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

  // ✅ Submit handler
  const handleProceed = async (e) => {
    e.preventDefault();

    if (!isAccValid) {
      setAccError("Account number validation failed");
      return;
    }

    setLoading(true);
    setError("");

    let apiResult = null;

    try {
      apiResult = await submitAABankDetails({
        bank_name: bankName,
        account_number: confirmAccNo,
        ifsc_code: ifsc,
        loan_application_id: loan_application_id,
        customer_name: customer_name,
      });

      if (apiResult?.status === true) {
        window.location.href = "/loanstatus";
        return;
      }

      if (apiResult?.status === false) {
        setError(apiResult.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error creating Bank Account Details.");
    } finally {
      if (!apiResult?.status) {
        setLoading(false);
      }
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h4>Bank Account Details for Disbursement</h4>
      <p>
        We use this bank account for e-nach and disbursement. Your account
        details are stored securely.
      </p>

      <form onSubmit={handleProceed} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Customer Name</label>
          <input type="text" value={customer_name} readOnly />
        </div>

        <div className={styles.inputGroup}>
          <label>Bank Name</label>
          <input type="text" value={bankName} readOnly />
        </div>

        <div className={styles.inputGroup}>
          <label>Account Number</label>
          <input type="text" value={maskedAcc} readOnly />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirm Account Number</label>

          <input
            type="text"
            value={confirmAccNo}
            inputMode="numeric"
            placeholder="Enter full account number"
            style={{
              border: "2px solid #007bff",
              background: "#eaf3ff",
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "600",
            }}
            onChange={(e) => {
              const val = e.target.value.trim();
              setConfirmAccNo(val);

              /* ❌ Block masked input */
              if (val.includes("X") || val.includes("*")) {
                setAccError(
                  "Masked account number is not allowed. Enter full account number."
                );
                setIsAccValid(false);
                return;
              }

              /* ✅ CASE 1: API account is MASKED */
              if (isMaskedAccount) {
                if (val.length < 4) {
                  setAccError("Please enter full account number");
                  setIsAccValid(false);
                  return;
                }

                const last4 = val.slice(-4);

                if (last4 !== apiLast4) {
                  setAccError("Account number does not match");
                  setIsAccValid(false);
                } else {
                  setAccError("");
                  setIsAccValid(true);
                }
                return;
              }

              /* ✅ CASE 2: API account is NOT masked */
              if (val !== maskedAcc) {
                setAccError("Account number does not match");
                setIsAccValid(false);
              } else {
                setAccError("");
                setIsAccValid(true);
              }
            }}
          />

          <p style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
            Please mention your full account number
          </p>

          {accError && (
            <p style={{ color: "red", fontSize: "13px" }}>{accError}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>IFSC Code</label>
          <input type="text" value={ifsc} readOnly />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={loading || !isAccValid}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
