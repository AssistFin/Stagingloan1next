import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loginWithMobile, verifyOTP } from "../api/auth";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import FeaturesPage from "./FeaturesPage";
import Features from "../components/home/Features";
import HowItWork from "../components/accountDetail/HowItWork";
import Planning from "../components/common/Planning";
import Personalized from "../components/home/Personalized";
import Faq from "../components/faq/Faq";
import OurLoan from './ourLoan';
import WhyChoose from "./whychoose";
import useUTM from "../hooks/useUTM";



export default function LoginPage({ startLoading, stopLoading }) {
  const { sendAuthenticatedUTM } = useUTM();
  const { login } = useAuth();
  const { user } = useAuth();
  const [mobile, setMobile] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [touched, setTouched] = useState({
    mobile: false,
    otp: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/applyforaloan");
    }
  }, [user, router]);

  const startTimer = () => {
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


  const handleTouch = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };


  const handleMobileChange = (e) => {
    const value = e.target.value;
   
    const numbersOnly = value.replace(/[^0-9]/g, "");
    
    if (numbersOnly.length <= 10) {
      setMobile(numbersOnly);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (mobile.length === 10) {
      const formattedMobile = mobile.startsWith("+91")
        ? mobile
        : `+91${mobile}`;
      setButtonDisabled(true);
      startLoading();
      try {
        const response = await loginWithMobile(formattedMobile);
        if (response?.data?.status === "error") {
          setError(response.data.message);
        } else {
          setShowOtpDialog(true);
          startTimer();
        }
      } catch (error) {
        setError("Failed to send OTP. Please try again.");
      } finally {
        setButtonDisabled(false);
        stopLoading();
      }
    } else {
      setError("Please enter a valid 10-digit mobile number");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleNext = async () => {
    const enteredOtp = otp.join("");
    setError("");
    startLoading();
    try {
      const response = await verifyOTP(`+91${mobile}`, enteredOtp);
      if (response?.data?.status !== "error") {
        const { user, access_token } = response.data.data;
        login(user, access_token);

        const utmData = localStorage.getItem('utm_data');
        if (utmData) {
            await sendAuthenticatedUTM(JSON.parse(utmData));
            localStorage.removeItem('utm_data');
        }
      } else {
        setError(
          response.data.message?.error?.[0] ||
            "Incorrect OTP. Please try again."
        );
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0").focus();
      }
    } catch (error) {
      setError("Incorrect OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0").focus();
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <motion.div
        className={styles.pageContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {!showOtpDialog && (
          <>
            <h4 className={styles.welcomeText}>Welcome to World of Financial Empowerment with  <span className={styles.welcomeText} style={{color: '#062478'}}>Loan</span><span className={styles.welcomeText} style={{color: '#0a8a1d'}}>One</span></h4>
            <h3 className={styles.subTitle}>Salary Advance Loans for Working Professionals</h3>
            <div className={styles.tagline}>
              <span>Reliability</span> | <span>Efficiency</span> |{" "}
              <span>Innovation</span>
            </div>
            <motion.div
              className={styles.card}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.inputButtonContainer}>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    className={`${styles.input} ${
                      touched.mobile && !mobile ? styles.error : ""
                    }`}
                    onBlur={() => handleTouch("mobile")}
                    onFocus={() => handleTouch("mobile")}
                    value={mobile}
                    maxLength={10}
                    onChange={handleMobileChange}
                  />
                  <button
                    type="submit"
                    className={styles.loginButton}
                    disabled={buttonDisabled}
                  >
                    Apply Now
                  </button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
              </form>
            </motion.div>
            <div className={styles.termsContainer}>
              <div className={styles.termsCheckbox}>
                <input type="checkbox" id="terms" defaultChecked />
              </div>
              <div className={styles.termsLabel}>
                <label htmlFor="terms">
                  By clicking this, I agree with the following{" "}
                  <Link legacyBehavior href="/terms&conditions">
                    <a target="_blank" className={styles.termsLink}>
                      Terms and Conditions
                    </a>
                  </Link>
                </label>
              </div>
            </div>
          </>
        )}
        {showOtpDialog && (
          <motion.div
            className={styles.card}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.otpContainer}>
              <h4 className={styles.otpTitle}>Verify Mobile Number</h4>
              <p className={styles.otpSubtitle}>
                A 6-digit code has been sent to your mobile number (
                {`+91${mobile}`})
              </p>
              <div className={styles.otpInputContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    maxLength="1"
                    className={`${styles.otpInput} ${
                      touched.otp && !otp ? styles.error : ""
                    }`}
                    onBlur={() => handleTouch("otp")}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onFocus={(e) => {
                      handleTouch("otp");
                      e.target.select();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && index > 0 && !otp[index]) {
                        document.getElementById(`otp-${index - 1}`).focus();
                      }
                    }}
                  />
                ))}
              </div>
              {error && <p className={styles.errorMessage}>{error}</p>}
              <div className={styles.otpFooter}>
                <button
                  className={styles.resendButton}
                  onClick={startTimer}
                  disabled={timer > 0}
                >
                  {/* Resend OTP */}
                </button>
                <span className={styles.timer}>{`00:${timer
                  .toString()
                  .padStart(2, "0")}`}</span>
              </div>
              <button onClick={handleNext} className={styles.nextButton}>
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
      <FeaturesPage />
      <WhyChoose />
      <OurLoan />
      <Features />
      <HowItWork />
      <Planning />
      <Personalized />
      <Faq />
    </>
  );
}