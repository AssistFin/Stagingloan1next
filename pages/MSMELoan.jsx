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

const MSMELoan = () => {
  return (
    <PageWrapper>
      <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '3em' }}>MSME Loans</h1>
      <LoanBanner />
      <ContentSection>
        <h2>Why Choose MSME Loans?</h2>
        <p>
          MSME (Micro, Small, and Medium Enterprises) loans are designed to support small businesses and entrepreneurs in India by providing quick, affordable, and flexible financing for business growth, working capital, equipment purchases, or expansion. Unlike traditional business loans, MSME loans from us offer rapid approval and disbursal, often within hours, without requiring collateral or extensive paperwork for eligible businesses. Our digital platform ensures a seamless application process, making it ideal for micro, small, and medium enterprises looking to scale operations, manage cash flow, or invest in new opportunities. With competitive interest rates and tailored repayment terms, MSME loans empower businesses to thrive and contribute to economic growth.
        </p>
        <p>
          Our user-friendly application is accessible on both the Google Play Store and iOS App Store, compatible with Android and iOS devices, allowing you to apply in just a few simple steps. We prioritize security, ensuring your business and financial information remains protected throughout the process. As a trusted financial service provider in India, we offer MSME loans ranging from INR 50,000 to Rs. 50 lakhs, customized to meet the unique needs of small businesses. Whether you need funds for inventory, machinery, or marketing, our MSME loans can be disbursed within 24 hours, providing instant financial support. Flexible repayment options, including monthly or quarterly EMIs, make repayment manageable for businesses of all sizes.
        </p>
        <p>
          Whether you’re a micro-enterprise, small business owner, or medium-sized company, our MSME loans provide quick access to funds anytime, anywhere. If you’re looking to start, grow, or stabilize your business, an MSME loan from us can deliver the support you need without the burden of traditional banking delays. You can apply online with minimal documentation, such as GST registration, PAN, and bank statements, and receive funds in your business account within hours. With transparent terms, no hidden fees, and a focus on supporting India’s MSME sector, our loans are the perfect solution for your business needs.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within hours</li>
          <li>No collateral required for eligible MSMEs</li>
          <li>Loan amounts from INR 50,000 to Rs. 50 lakhs</li>
          <li>Flexible repayment terms (6-60 months)</li>
          <li>Secure and easy online application</li>
          <li>Designed for micro, small, and medium enterprises</li>
        </ul>
      </ContentSection>

      <StepsSection>
        <h2>How to Apply for an MSME Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reliable MSME loan provider that suits your business needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You may need your GST registration, PAN, and recent bank statements.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system evaluates your eligibility based on your business turnover, credit score, and industry within minutes.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <p>Approval and Disbursal: Get approval within hours, with funds transferred to your business account the same day.</p>
        </div>
      </StepsSection>

      {/* <CTASection>
        <button onClick={() => alert('Apply Now clicked - Implement navigation or form submission here')}>
          Apply Now
        </button>
      </CTASection> */}
    </PageWrapper>
  );
};

export default MSMELoan;