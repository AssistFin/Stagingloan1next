import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkReturnStatus } from "../api/loanApi";
import SweetAlert from "../components/SweetAlert";

export default function ReturnUrl() {
  const [timeLeft, setTimeLeft] = useState(15);
  const [status, setStatus] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const router = useRouter();

  // ---------------- 15 sec timer ----------------
  useEffect(() => {
    if (timeLeft === 0) {
      callCheckStatus(); // auto call API
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // ---------------- API CALL ----------------
  const callCheckStatus = async () => {
    try {
      setAlertData(null);
      const res = await checkReturnStatus(); // API call
      console.log(res);
      if (res == "success") {
        //setStatus("success");
        router.push("/loanstatus");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      setAlertData({
        type: "error",
        message: "Something went wrong! Please try again.",
      });
    }
  };

  const goToBankInfo = () => router.push("/bankinfo");

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {alertData && <SweetAlert {...alertData} />}

      {status === null && (
        <>
          <h2>Processing your request...</h2>
          <p>Please wait {timeLeft} sec</p>
        </>
      )}

      {/* ERROR → Retry button */}
      {status === "error" && (
        <>
          <h3>Status: Failed ❌</h3>
          <button onClick={goToBankInfo} style={btnStyle}>
            Retry
          </button>
        </>
      )}
    </div>
  );
}

const btnStyle = {
  padding: "12px 25px",
  background: "#0070f3",
  color: "#fff",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};
