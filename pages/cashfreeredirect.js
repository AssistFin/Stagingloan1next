import { useEffect, useState } from 'react';
import styles from "../styles/EnachMandate.module.css";
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
        setStatusMessage(" Status: INITIALIZED... Please wait forawhile.");
      } else if (status === "PENDING") {
        setStatusMessage(" Status: PENDING... Please wait forawhile.");
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

  return (
    <div style={{ textAlign: 'center', paddingTop: '80px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Processing your enach mandate...</h2>
      <p>{statusMessage}</p>
      {timedOut && (
        <button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
          Retry
        </button>
      )}
    </div>
  );
}
