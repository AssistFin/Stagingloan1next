import React from 'react';
import styled from 'styled-components';
import LoanBanner from './LoanBanner'; // Adjust path based on your structure

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #fff;
  color: #1E3A8A; // Primary blue from your theme
`;

const ContentSection = styled.div`
  margin-bottom: 40px;
  line-height: 1.6;

  h2 {
    color: #1E3A8A;
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: 15px;
  }

  p {
    color: #4B5EAA;
    font-size: 1em;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    color: #4B5EAA;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 20px;

      &:before {
        content: '✓';
        color: #F7901A; // Orange checkmark for accents
        position: absolute;
        left: 0;
      }
    }
  }
`;

const StepsSection = styled.div`
  margin-bottom: 40px;

  h2 {
    color: #1E3A8A;
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .step {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .step-number {
      width: 30px;
      height: 30px;
      background: #1E3A8A;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-size: 1em;
    }

    p {
      color: #4B5EAA;
      font-size: 1em;
      flex: 1;
    }
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: 40px;

  button {
    padding: 15px 30px;
    font-size: 1.1em;
    background-color: #1E3A8A;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #163172; // Darker blue for hover
    }
  }
`;

const CreditLoan = () => {
  return (
    <PageWrapper>
      <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '3em' }}>Credit Loans</h1>
      <LoanBanner />
      <ContentSection>
        <h2>Why Choose Credit Loans?</h2>
        <p>
          Credit loans are versatile financial solutions designed for individuals seeking quick and flexible funding to improve their credit score, consolidate debts, or meet personal needs like education, travel, or major purchases. Unlike traditional loans, credit loans from us offer rapid approval and disbursal, often within hours, without requiring collateral or extensive paperwork. Our digital platform ensures a seamless application process, making it ideal for individuals looking to manage their finances effectively while building or repairing their credit history. With competitive interest rates and flexible repayment terms, credit loans empower you to achieve your financial goals with confidence.
        </p>
        <p>
          Our user-friendly application is accessible on both the Google Play Store and iOS App Store, compatible with Android and iOS devices, allowing you to apply in just a few simple steps. We prioritize security, ensuring your personal and financial information remains protected throughout the process. As a trusted financial service provider in India, we offer credit loans ranging from INR 25,000 to Rs. 15 lakhs, tailored to help you improve your creditworthiness and meet various needs. Whether you need funds for debt consolidation, credit score enhancement, or personal expenses, our credit loans can be disbursed within 24 hours, providing instant financial relief. Affordable EMIs, customizable to your income, make repayment manageable and help you build a stronger credit profile.
        </p>
        <p>
          If you’re an individual looking to manage debt, boost your credit score, or fund a personal goal, a credit loan from us can provide the support you need anytime, anywhere. You can apply online with minimal documentation, such as your Aadhaar Card, PAN, and bank statements, and receive funds in your bank account within hours. With transparent terms, no hidden fees, and a focus on credit improvement, our credit loans are the perfect solution for your financial needs.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within hours</li>
          <li>No collateral required</li>
          <li>Loan amounts from INR 25,000 to Rs. 15 lakhs</li>
          <li>Flexible repayment terms (12-48 months)</li>
          <li>Secure and easy online application</li>
          <li>Helps improve or build your credit score</li>
        </ul>
      </ContentSection>

      <StepsSection>
        <h2>How to Apply for a Credit Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reliable credit loan provider that suits your needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You may need your Aadhaar Card, PAN, and recent bank statements.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system evaluates your eligibility based on your income, credit history, and repayment capacity within minutes.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <p>Approval and Disbursal: Get approval within hours, with funds transferred to your bank account the same day.</p>
        </div>
      </StepsSection>

      <CTASection>
        <button onClick={() => alert('Apply Now clicked - Implement navigation or form submission here')}>
          Apply Now
        </button>
      </CTASection>
    </PageWrapper>
  );
};

export default CreditLoan;