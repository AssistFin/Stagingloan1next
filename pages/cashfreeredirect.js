import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

import styles from "../styles/LoanStatus.module.css"; // Keep only ONE styles import
import { getEnachStatus } from "../api/loanApi";

export default function CashfreeRedirect() {
  const [statusMessage, setStatusMessage] = useState("Processing your enach mandate...");
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 2;
    const interval = 60000;

    const pollStatus = async () => {
      const status = await getEnachStatus();

      if (!status) {
        setStatusMessage("⚠️ Waiting for confirmation from bank...");
      } else if (status === "ACTIVE") {
        window.location.href = "/loandisbursal";
        return;
      } else if (status === "FAILED") {
        window.location.href = "/enachmandate";
        return;
      } else if (status === "INITIALIZED") {
        setStatusMessage(" Status: INITIALIZED... Please wait for a while.");
      } else if (status === "PENDING") {
        setStatusMessage(" Status: PENDING... Please wait for a while.");
      } else if (status === "INACTIVE") {
        window.location.href = "/viewloan";
      } else {
        setStatusMessage(" Unknown status received. Please wait...");
      }

      retries++;
      if (retries < maxRetries) {
        setTimeout(pollStatus, interval);
      } else {
        setStatusMessage("⛔ Timed out. Please click on retry to get the status.");
        setTimedOut(true);
      }
    };

    pollStatus();
  }, []);

  const handleBackToPan = () => {
    window.location.href = "/bankinfo";
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '80px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Processing your enach mandate...</h2>
      <p>{statusMessage}</p>

      {timedOut && (
        <>
          {/* Retry Button */}
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
            Retry
          </button>

          {/* Back Button Section */}
          <motion.div
            style={{
              marginTop: "30px",
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              className={styles.backButton}
              onClick={handleBackToPan}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className={styles.buttonIcon} />
              Back to Bank Info
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
}
