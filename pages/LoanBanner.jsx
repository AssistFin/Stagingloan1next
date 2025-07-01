import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image'; // Optional, for optimized images if you use Next.js Image

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .banner-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    h2 {
      color: #1E3A8A;
      font-size: 2em;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .input-button-container {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 500px;
      margin: 0 auto 10px;

      @media (max-width: 413px) {
        flex-direction: column;
        width: 100%;
      }
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
      background-color: #1E3A8A;
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
      gap: 5px;
      margin-top: 10px;

      input[type="checkbox"] {
        display: none; // Hide default checkbox
      }

      .custom-checkbox {
        width: 20px;
        height: 20px;
        border: 2px solid #1E3A8A;
        border-radius: 4px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        margin-right: 5px;

        &:before {
          content: '✓';
          color: #00C851; // Green checkmark
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          opacity: 0;
        }

        &.checked:before {
          opacity: 1;
        }
      }

      label {
        color: #F7901A;
        font-size: 0.9em;
        margin: 0;
        cursor: pointer;

        @media (max-width: 413px) {
          font-size: 0.8em;
        }
      }
    }
  }
`;

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px; // Reduced gap for tighter stacking on mobile
    padding: 0 10px; // Added padding to ensure cards fit within screen
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  max-width: 300px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100%; // Ensure cards take full width on mobile
    width: 100%; // Explicitly set width to full on mobile
  }

  h3 {
    color: #1E3A8A;
    font-size: 1.2em;
    font-weight: 600;
    margin: 10px 0;
  }

  p {
    color: #4B5EAA;
    font-size: 0.9em;
    line-height: 1.5;
  }

  .icon {
    width: 60px; // Increased from 40px to make icons larger
    height: 60px; // Increased from 40px to match
    margin-bottom: 10px;
  }
`;

const LoanBanner = () => {
  const [isChecked, setIsChecked] = useState(true); // Default checked state

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <HeaderSection>
      <div className="banner-content">
        <h2>Welcome to World of Financial Happiness</h2>
        <form className="input-button-container" onSubmit={(e) => e.preventDefault()}>
          <input
            className="mobile-input"
            type="tel"
            placeholder="Enter your mobile number"
          />
          <button className="apply-button" type="submit">
            Apply Now
          </button>
        </form>
        <div className="terms-container">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms" className={`custom-checkbox ${isChecked ? 'checked' : ''}`}></label>
          <label htmlFor="terms">By clicking this, I agree to the Terms and conditions</label>
        </div>
      </div>
      <FeaturesGrid>
        <FeatureCard>
          <Image src="/images/no-collateral.png" alt="No Collateral Required" className="icon" width={60} height={60} />
          <h3>No Collateral Required</h3>
          <p>We don’t require you to submit your property papers or anything as a collateral</p>
        </FeatureCard>
        <FeatureCard>
          <Image src="/images/easy-emis.png" alt="Easy EMIs" className="icon" width={60} height={60} />
          <h3>Easy EMIs</h3>
          <p>Easy EMI options.</p>
        </FeatureCard>
        <FeatureCard>
          <Image src="/images/instant-approval.png" alt="Instant Approval" className="icon" width={60} height={60} />
          <h3>Instant Approval</h3>
          <p>Approved for your sanctioned limit happens instantly.</p>
        </FeatureCard>
      </FeaturesGrid>
    </HeaderSection>
  );
};

export default LoanBanner;