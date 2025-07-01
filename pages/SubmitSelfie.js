import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/SubmitSelfie.module.css";
import { uploadSelfie } from "../api/documentApi";
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

  const checkPermissionStatus = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' });
      return permissionStatus.state === 'denied';
    } catch (err) {
      console.error("Error checking permission status:", err);
      return false;
    }
  };

  const handleOpenCamera = async () => {
    setCameraOpen(true);
    setAlertData(null); // Clear any previous alerts
    setPermissionDenied(false);

    const isDenied = await checkPermissionStatus();
    if (isDenied) {
      setPermissionDenied(true);
      setAlertData({
        type: "error",
        title: "Camera Access Denied",
        message: "Camera permissions are blocked. Please allow camera access in your browser settings and try again."
      });
      setCameraOpen(false);
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setPermissionDenied(true);
        setAlertData({
          type: "error",
          title: "Permission Error",
          message: "Camera access was denied. Please allow camera permissions in your browser settings and try again."
        });
      } else if (error.name === "NotFoundError") {
        setAlertData({
          type: "error",
          title: "Camera Not Found",
          message: "No camera device was found. Please ensure a camera is connected."
        });
      } else {
        setAlertData({
          type: "error",
          title: "Camera Error",
          message: "An error occurred while accessing the camera. Please try again."
        });
      }
      setCameraOpen(false);
    }
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvasRef.current.toDataURL("image/png");
      setSelfie(imageData);
      handleCloseCamera();
    }
  };

  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraOpen(false);
  };

  const handleRetake = () => {
    setSelfie(null);
    handleOpenCamera();
  };

  const handleSubmit = async () => {
    if (!selfie) return;

    setLoading(true);
    setAlertData(null);

    try {
      const blob = await (await fetch(selfie)).blob();
      const file = new File([blob], "selfie.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("selfie_image", file);

      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      startLoading();
      await uploadSelfie(formData);
      stopLoading();
      router.push("/addressconfirmation"); // No success alert, just redirect
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

  useEffect(() => {
    if (cameraOpen && !stream) {
      checkPermissionStatus().then((isDenied) => {
        if (isDenied) {
          setPermissionDenied(true);
          setAlertData({
            type: "error",
            title: "Camera Access Blocked",
            message: "Camera permissions are blocked. Please allow camera access in your browser settings and try again."
          });
          setCameraOpen(false);
        }
      });
    }
  }, [cameraOpen, stream]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submit Your Selfie</h1>

      <div className={styles.selfieSection}>
        <div className={styles.ovalShape}>
          {selfie ? (
            <Image src={selfie} alt="Selfie" width={200} height={250} unoptimized />
          ) : (
            cameraOpen && <video ref={videoRef} autoPlay playsInline className={styles.video}></video>
          )}
        </div>

        {!cameraOpen && !selfie && (
          <button className={styles.selfieButton} onClick={handleOpenCamera}>
            Open Camera
          </button>
        )}

        {cameraOpen && (
          <div>
            <canvas ref={canvasRef} width="300" height="300" style={{ display: 'none' }}></canvas>
            <button className={styles.readyButton} onClick={handleTakePhoto}>
              Capture
            </button>
          </div>
        )}

        {selfie && (
          <button className={styles.retakeButton} onClick={handleRetake}>
            Retake
          </button>
        )}
      </div>

      {permissionDenied && (
        <p className={styles.permissionHint}>
          Camera permissions are blocked. Please go to your browser settings (e.g., chrome://settings/content/camera), allow camera access for this site, then reload the page or click &quot;Open Camera&quot; again.
        </p>
      )}

      <button className={styles.nextButton} disabled={!selfie || loading} onClick={handleSubmit}>
        {loading ? "Uploading..." : "Next"}
      </button>

      {alertData && <SweetAlert {...alertData} onClose={() => setAlertData(null)} />}
    </div>
  );
}