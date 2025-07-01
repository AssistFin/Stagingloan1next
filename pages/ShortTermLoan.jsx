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

const ShortTermLoan = () => {
  return (
    <PageWrapper>
      <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '3em' }}>Short Term Loans</h1>
      <LoanBanner />
      <ContentSection>
        <h2>Why Choose Short Term Loans?</h2>
        <p>
          Short term loans are an ideal financial solution for individuals needing quick, short-duration funding to cover immediate expenses, such as urgent bills, emergency repairs, or temporary cash flow gaps. Unlike long-term loans, short term loans from us offer rapid disbursal, often within hours, without the need for collateral or extensive documentation. Our digital platform simplifies the application process, making it perfect for salaried individuals, self-employed professionals, or small businesses facing short-term financial challenges. With competitive rates and short repayment periods, short term loans provide a fast and efficient way to manage unexpected costs without long-term commitment.
        </p>
        <p>
          Our user-friendly application is accessible on both the Google Play Store and iOS App Store, compatible with Android and iOS devices, allowing you to apply in just a few simple steps. We prioritize security, ensuring your personal and financial information remains protected throughout the process. As a trusted financial service provider in India, we offer short term loans ranging from INR 10,000 to Rs. 5 lakhs, designed to meet your immediate needs. Whether you need funds for a sudden expense or a quick business boost, our short term loans can be disbursed within 24 hours, offering instant financial relief. Flexible repayment options, including weekly or monthly EMIs, make repayment manageable for borrowers.
        </p>
        <p>
          Whether you’re a salaried employee, self-employed, or running a small business, our short term loans provide quick access to funds anytime, anywhere. If you’re facing a temporary cash crunch or need funds for a short-term project, a short term loan from us can deliver the support you need without the burden of long-term debt. You can apply online with minimal documentation, and receive funds in your bank account within hours. With transparent terms, no hidden fees, and rapid approval, our short term loans are the perfect solution for your short-term financial needs.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within hours</li>
          <li>No collateral required</li>
          <li>Loan amounts from INR 10,000 to Rs. 5 lakhs</li>
          <li>Short repayment terms (1-12 months)</li>
          <li>Secure and easy online application</li>
          <li>Available for salaried, self-employed, and small businesses</li>
        </ul>
      </ContentSection>

      <StepsSection>
        <h2>How to Apply for a Short Term Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reliable short term loan provider that suits your needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You may need your Aadhaar Card, PAN, and recent bank statements.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system evaluates your eligibility based on your income, credit score, and repayment capacity within minutes.</p>
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

export default ShortTermLoan;