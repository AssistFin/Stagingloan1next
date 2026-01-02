import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/SubmitSelfie.module.css";
import { getSelfieUrl } from "../api/kycApi";
import { useAuth } from "../context/AuthContext";
import useLoanNavigation from "../hooks/useLoanNavigation";
import useAuthCheck from "../hooks/useAuthCheck";
import SweetAlert from "../components/SweetAlert"; // Add SweetAlert import

export default function SubmitSelfie({ startLoading, stopLoading }) {
  useAuthCheck();
  const [selfie, setSelfie] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null); // Add state for SweetAlert
  const [permissionDenied, setPermissionDenied] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  const { user, loanData, setLoanData } = useAuth();

  useLoanNavigation(loanData);

  useEffect(() => {
    if (!router.isReady) return;

    // Run only if URL contains query params
    if (!router.asPath.includes("?")) return;

    const handleCallback = async () => {
      try {
        const params = router.query;
        console.log("Selfie callback params:", params);

        // 🔗 your Laravel API endpoint
        const API_URL = "https://staging.api.loan1.io/api/selfie-callback";

        // 👉 send params to Laravel backend
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // optional auth
          },
          body: JSON.stringify(params),
        });

        const result = await response.json();
        console.log("Laravel API result:", result);

        if (result.success == false) {
          console.error("Callback API failed");
          router.push("/submitselfie");
          //return;
        }

        // ✨ clean query string (stay on same page)
        router.replace(router.pathname, undefined, { shallow: true });

        // 🚀 redirect after success
        router.push("/addressconfirmation");

      } catch (err) {
        console.error("Callback error:", err);
      }
    };

    handleCallback();
  }, [router.isReady]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      startLoading();
      const response = await getSelfieUrl();
      stopLoading();

      if (response.status === "success" && response.url) {
        window.location.href = response.url; 
      } else {
        setAlertData({
          type: "error",
          title: "Error!",
          message: 'Something went wrong !!',
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      setAlertData({
        type: "error",
        title: "Upload Failed",
        message: "Failed to upload selfie. Please try again."
      });
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submit Your Selfie</h1>

      <button className={styles.nextButton} onClick={handleSubmit}>
        {loading ? "Uploading..." : "Retake"}
      </button>

      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}