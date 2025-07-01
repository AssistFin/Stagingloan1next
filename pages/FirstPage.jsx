import React from 'react';
import styled from 'styled-components';

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

.terms-container2 label{
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
`;

function FirstPage() {
  return (
    <HomeBannerWrapper className="home-banner">
      <h1 style={{ color: '#1E3A8A', fontSize: '2em', marginBottom: '10px', fontWeight: 'normal' }}>
        Welcome to World of
      </h1>
      <h2 className="banner-title" style={{ color: 'blue', fontSize: '3em', marginBottom: '15px', fontWeight: 'bold' }}>
        Financial Empowerment
      </h2>
      <h3 style={{ color: '#F7901A', fontSize: '1.5em', marginBottom: '30px', fontWeight: 'normal' }}>
        With LoanOne
      </h3>

      <div style={{ marginBottom: '30px', color: '#1E3A8A', fontWeight: '500' }}>
        <span style={{ margin: '0 15px' }}>Reliability</span> |
        <span style={{ margin: '0 15px' }}>Efficiency</span> |
        <span style={{ margin: '0 15px' }}>Innovation</span>
      </div>

      <div className="input-button-container">
        <input
          className="mobile-input"
          type="text"
          placeholder="+91 | Enter your mobile number" />
        <button className="apply-button">
          Apply Now
        </button>
      </div>

      <div className="terms-container">
        <div className="terms-container1"><input type="checkbox" id="terms" defaultChecked /></div>
        <div className="terms-container2"><label htmlFor="terms">
          By clicking this, I agree to the Terms and conditions
        </label></div>
      </div>
    </HomeBannerWrapper>
  );
}

export default FirstPage;