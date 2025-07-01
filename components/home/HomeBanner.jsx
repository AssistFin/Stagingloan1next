import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loginWithMobile, verifyOTP } from '../../api/auth'; // Adjust path as needed
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link from next/link

const HomeBannerWrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #f9fafb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;

  .input-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: 0 auto 10px;
    flex-wrap: wrap;
    
    @media (max-width: 413px) {
      flex-direction: column;
      width: 100%;
    }
  }

  .terms-container2 label {
    margin-bottom: 7px;
  }

  .mobile-input {
    padding: 12px 15px;
    font-size: 1em;
    border: 1px solid #d1d5db;
    border-right: none;
    border-radius: 5px 0 0 5px;
    outline: none;
    flex: 1;
    box-sizing: border-box;
    background: #f3f4f6;
    min-width: 200px;
    margin-bottom: 5px;
    
    @media (max-width: 413px) {
      width: 100%;
      border-radius: 5px;
      border-right: 1px solid #d1d5db;
    }
  }

  .apply-button {
    padding: 12px 25px;
    font-size: 1em;
    background-color: #1e3a8a;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    margin-bottom: 5px;
    
    @media (max-width: 413px) {
      width: 100%;
      border-radius: 5px;
    }

    &:hover {
      background-color: #163172;
    }
  }

  .terms-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
  }

  @media (max-width: 413px) {
    .terms-container {
      flex-direction: row; /* Change from column to row */
      align-items: center; /* Ensures checkbox and text align properly */
      gap: 5px;
      padding: 0 10px;
    }

    .terms-container input[type="checkbox"] {
      margin-bottom: 0; /* Prevents extra space */
    }

    .terms-container label {
      font-size: 0.8em;
      text-align: left;
    }
  }

  @media (max-width: 380px) {
    h2.banner-title {
      font-size: 2.5em !important; /* Overrides inline style */
      margin-bottom: 15px;
      font-weight: bold;
      color: blue;
    }
  }

  .otp-container {
    margin-top: 20px;
  }

  .otp-input-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }

  .otp-input {
    width: 60px;
    height: 40px;
    font-size: 1.2em;
    text-align: center;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    outline: none;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }

  .otp-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .resend-button {
    background: none;
    border: none;
    color: #1e3a8a;
    cursor: pointer;
    font-size: 0.9em;
    &:disabled {
      cursor: not-allowed;
      color: #999;
    }
  }

  .timer {
    font-size: 0.9em;
    color: #1e3a8a;
  }

  .next-button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #1e3a8a;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #163172;
    }
  }
`;

function HomeBanner({ startLoading, stopLoading }) {
  const { login } = useAuth();
  const { user } = useAuth();
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     router.push("/applyforaloan");
  //   }
  // }, [user, router]); // Added 'router' to the dependency array

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

  const handleApply = async (e) => {
    e.preventDefault();
    setError("");
    if (mobile.length === 10) {
      const formattedMobile = mobile.startsWith("+91") ? mobile : `+91${mobile}`;
      setButtonDisabled(true);
      startLoading(); // Start the loading overlay
      try {
        const response = await loginWithMobile(formattedMobile);
        if (response?.data?.status === 'error') {
          setError(response.data.message);
        } else {
          setShowOtpDialog(true);
          startTimer();
        }
      } catch (error) {
        setError("Failed to send OTP. Please try again.");
      } finally {
        setButtonDisabled(false);
        stopLoading(); // Stop the loading overlay
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
    startLoading(); // Start the loading overlay
    try {
      const response = await verifyOTP(`+91${mobile}`, enteredOtp);
      if (response?.data?.status !== 'error') {
        const { user, access_token } = response.data.data;
        login(user, access_token);
      } else {
        setError(response.data.message?.error?.[0] || "Incorrect OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0").focus();
      }
    } catch (error) {
      setError("Incorrect OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0").focus();
    } finally {
      stopLoading(); // Stop the loading overlay
    }
  };

  return (
    <HomeBannerWrapper className="home-banner">
      <h1 style={{ color: '#1E3A8A', fontSize: '2em', marginBottom: '10px', fontWeight: 'normal' }}>
        Welcome to World of 1
      </h1>
      <h2 className="banner-title" style={{ color: '#1E3A8A', fontSize: '3em', marginBottom: '15px', fontWeight: 'bold' }}>
        Financial Empowerment
      </h2>
      <h3 style={{ color: '#1E3A8A', fontSize: '1.5em', marginBottom: '30px', fontWeight: 'normal' }}>
        With <span style={{ color: '#0D6EFD', fontWeight: 'bold', fontSize: '1.5em' }}>LoanOne</span>
      </h3>
      <div style={{ marginBottom: '30px', color: '#1E3A8A', fontWeight: '500' }}>
        <span style={{ margin: '0 15px' }}>Reliability</span> |
        <span style={{ margin: '0 15px' }}>Efficiency</span> |
        <span style={{ margin: '0 15px' }}>Innovation</span>
      </div>

      {!showOtpDialog ? (
        <form className="input-button-container" onSubmit={handleApply}>
          <input
            className="mobile-input"
            type="tel"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button className="apply-button" type="submit" disabled={buttonDisabled}>
            Apply Now
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      ) : (
        <div className="otp-container">
          <h4 style={{ color: '#1E3A8A', fontSize: '1.2em', marginBottom: '10px' }}>
            Verify Mobile Number
          </h4>
          <p style={{ color: '#1E3A8A', fontSize: '1em', marginBottom: '20px' }}>
            A 6-digit code has been sent to your mobile number ({mobile})
          </p>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && index > 0 && !otp[index]) {
                    document.getElementById(`otp-${index - 1}`).focus();
                  }
                }}
              />
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="otp-footer">
            <button className="resend-button" onClick={startTimer} disabled={timer > 0}>
              Resend OTP
            </button>
            <span className="timer">{`00:${timer.toString().padStart(2, "0")}`}</span>
          </div>
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        </div>
      )}

      <div className="terms-container">
        <div className="terms-container1"><input type="checkbox" id="terms" defaultChecked /></div>
        <div className="terms-container2"><label htmlFor="terms">
          By clicking this, I agree to the <Link legacyBehavior href="/terms&conditions"><a target="_blank" style={{ color: 'red', textDecoration: 'underline' }}>Terms and Conditions</a></Link>
        </label></div>
      </div>
    </HomeBannerWrapper>
  );
}

export default HomeBanner;