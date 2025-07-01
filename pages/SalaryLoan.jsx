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

const SalaryLoan = () => {
  return (
    <PageWrapper>
      <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '3em' }}>Salary Loans</h1>
      <LoanBanner />
      <ContentSection>
        <h2>Why Choose Salary Loans?</h2>
        <p>
          Salary loans are tailored financial solutions for salaried individuals seeking quick and convenient funding for personal needs, such as medical emergencies, home renovations, weddings, or clearing debts. Unlike traditional loans, salary loans from us offer rapid approval and disbursal, often within hours, leveraging your stable income as the primary eligibility criterion. Our digital platform ensures a hassle-free application process, requiring minimal documentation and no collateral. With competitive interest rates and flexible repayment terms tied to your salary cycle, salary loans empower salaried professionals to meet their financial goals without stress.
        </p>
        <p>
          Our user-friendly application is accessible on both the Google Play Store and iOS App Store, compatible with Android and iOS devices, allowing you to apply in just a few simple steps. We prioritize security, ensuring your personal and financial information remains protected throughout the process. As a trusted financial service provider in India, we offer salary loans ranging from INR 50,000 to Rs. 10 lakhs, designed to align with your monthly income. Whether you need funds for unexpected expenses or planned investments, our salary loans can be disbursed within 24 hours, providing instant financial relief. Affordable EMIs, scheduled around your salary dates, make repayment manageable and convenient.
        </p>
        <p>
          If you’re a salaried employee facing a financial crunch due to sudden expenses or planning a significant purchase, a salary loan from us can provide the support you need anytime, anywhere. You can apply online with minimal documentation, such as your salary slips, Aadhaar Card, and PAN, and receive funds in your bank account within hours. With transparent terms, no hidden fees, and a focus on salaried individuals, our salary loans are the perfect solution for your immediate financial needs.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within hours</li>
          <li>No collateral required</li>
          <li>Loan amounts from INR 50,000 to Rs. 10 lakhs</li>
          <li>Repayment terms tied to salary cycles (12-60 months)</li>
          <li>Secure and easy online application</li>
          <li>Designed for salaried individuals</li>
        </ul>
      </ContentSection>

      <StepsSection>
        <h2>How to Apply for a Salary Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reliable salary loan provider that suits your needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You may need your salary slips, Aadhaar Card, and PAN.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system evaluates your eligibility based on your salary, credit score, and employment stability within minutes.</p>
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

export default SalaryLoan;