import React from 'react';
import styled from 'styled-components';
// import Image from 'next/image';

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
    font-size: 27px;
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
    font-size: 27px;
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

const PersonalLoan = () => {
  return (
    <PageWrapper>
      <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '27px' }}>Personal Loans</h1>
      
      {/* <ContentSection>
        <h2>Why Choose Personal Loans?</h2>
        <p>
          Personal loans are an excellent financial solution for individuals seeking quick and flexible funding for various needs, such as medical emergencies, home improvements, weddings, or debt consolidation. Unlike traditional loans, personal loans from us offer swift approval and disbursal, often within hours, eliminating the need for lengthy paperwork or collateral. Our digital platform ensures a seamless application process, making it ideal for salaried and self-employed individuals alike. With competitive interest rates and flexible repayment terms, personal loans empower you to achieve your goals without financial stress.
        </p>
        <p>
          Our user-friendly application is available on both the Google Play Store and iOS App Store, compatible with Android and iOS devices, allowing you to apply in just a few simple steps. We prioritize security, ensuring your personal and financial information is protected throughout the process. As a trusted financial service provider in India, we offer personal loans ranging from INR 50,000 to Rs. 20 lakhs, tailored to meet your specific needs. Whether you need funds for unexpected expenses or planned investments, our personal loans can be disbursed within 24 hours, providing instant financial relief. Affordable EMIs make repayment manageable, even for first-time borrowers.
        </p>
        <p>
          Whether you’re a salaried professional or self-employed, our personal loans are designed to offer quick access to funds anytime, anywhere. If you’re facing a financial crunch due to unforeseen expenses or planning a significant purchase, a personal loan from us can provide the necessary support without the hassle of traditional banking delays. You can apply online, and with minimal documentation, receive funds in your bank account within hours. With transparent terms and no hidden fees, our personal loans are the perfect solution for your financial needs.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within hours</li>
          <li>No collateral required</li>
          <li>Loan amounts from INR 50,000 to Rs. 20 lakhs</li>
          <li>Flexible and affordable EMIs</li>
          <li>Secure and easy online application</li>
          <li>Available for salaried and self-employed individuals</li>
        </ul>
      </ContentSection> */}

      <StepsSection>
        <h2>How to Apply for a Personal Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reliable personal loan provider that suits your needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You may need your Aadhaar Card, PAN, and income proof.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system evaluates your eligibility based on your income, credit score, and employment status within minutes.</p>
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

export default PersonalLoan;