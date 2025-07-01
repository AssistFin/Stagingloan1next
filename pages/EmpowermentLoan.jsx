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

const EmpowermentLoan = () => {
  return (
    <PageWrapper>
      <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '3em' }}>Empowerment Loans</h1>
      <LoanBanner />
      <ContentSection>
        <h2>Why Choose Empowerment Loans?</h2>
        <p>
          Empowerment loans are designed to empower women, self-employed individuals, and underserved communities by providing quick, affordable, and accessible financing for personal and business growth. These loans are ideal for women entrepreneurs, small business owners, or individuals seeking to improve their financial independence, such as funding education, starting a business, or purchasing equipment. Unlike traditional loans, empowerment loans from us offer rapid approval and disbursal, often within hours, without requiring collateral or extensive paperwork. Our digital platform ensures a seamless application process, making it perfect for those looking to break financial barriers and achieve their dreams.
        </p>
        <p>
          Our user-friendly application is available on both the Google Play Store and iOS App Store, compatible with Android and iOS devices, allowing you to apply in just a few simple steps. We prioritize security, ensuring your personal and financial information remains protected throughout the process. As a trusted financial service provider in India, we offer empowerment loans ranging from INR 25,000 to Rs. 10 lakhs, tailored to meet the unique needs of women, self-employed individuals, and marginalized groups. Whether you need funds for a new venture, skill development, or personal empowerment, our loans can be disbursed within 24 hours, providing instant financial support. Flexible repayment options, including monthly EMIs, make repayment manageable for borrowers.
        </p>
        <p>
          Whether you’re a woman entrepreneur, self-employed professional, or part of an underserved community, our empowerment loans provide quick access to funds anytime, anywhere. If you’re aiming to start or expand a business, pursue education, or overcome financial challenges, an empowerment loan from us can offer the support you need without the burden of traditional banking hurdles. You can apply online with minimal documentation, and receive funds in your bank account within hours. With transparent terms, no hidden fees, and a focus on financial inclusion, our empowerment loans are the perfect solution for your empowerment journey.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within hours</li>
          <li>No collateral required</li>
          <li>Loan amounts from INR 25,000 to Rs. 10 lakhs</li>
          <li>Flexible repayment terms (6-36 months)</li>
          <li>Secure and easy online application</li>
          <li>Designed for women, self-employed, and underserved communities</li>
        </ul>
      </ContentSection>

      <StepsSection>
        <h2>How to Apply for an Empowerment Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reliable empowerment loan provider that suits your needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You may need your Aadhaar Card, PAN, and proof of identity or business.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system evaluates your eligibility based on your income, purpose, and community status within minutes.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <p>Approval and Disbursal: Get approval within hours, with funds transferred to your bank account the same day.</p>
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

export default EmpowermentLoan;