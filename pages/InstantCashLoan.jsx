import React from 'react';
import styled from 'styled-components';
import LoanBanner from './LoanBanner'; // Adjust path based on your structure
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

const InstantCashLoan = () => {
  return (
    <PageWrapper>
    <h1 style={{ color: '#1E3A8A', fontWeight: '700', marginBottom: '20px', textAlign: 'center', fontSize: '3em'}}>Instant Cash Loans</h1>
      <LoanBanner />
      <ContentSection>
        <h2>Why Choose Instant Cash Loans?</h2>
        <p>
          In today&#39;s fast-paced financial landscape, unforeseen emergencies and unexpected expenses can strike without warning. When you require swift access to cash, the traditional banking system can often subject you to lengthy waiting periods, sometimes spanning days or even weeks. This is where instant cash loans step in to provide a timely and hassle-free solution for your urgent financial requirements. Instant cash loans have emerged as the preferred choice for countless individuals. The days of waiting 7-10 working days for loan approval are long gone. Today, digital platforms, like ours, have revolutionized the application process, rendering it both faster and more accessible. With the ease of online loan applications, you can readily compare various lenders and their loan offerings to select the one that aligns best with your requirements. Attain the financial support you require swiftly and apply for an instant cash loan through us.
        </p>
        <p>
          Our user-friendly loan application is readily accessible on both the Google Play Store and iOS store, compatible with Android and iOS devices, enabling you to complete a loan application in just a few straightforward steps. Be assured that the application process for our quick cash loans is entirely secure, ensuring the protection of your personal information. As one of India&#39;s leading financial service providers, we disburse loans on a daily basis. Through our convenient loan application, you can gain access to a diverse array of personal loan options, ranging from INR 500 to Rs. 5 lakhs. The instant cash loan app is your ultimate solution for securing online instant loans. Small cash loans can be approved and disbursed within 24 hours, streamlining the management of financial emergencies. Furthermore, our affordable EMIs make the repayment process straightforward, even for those who are new to the world of personal loans.
        </p>
        <p>
          Irrespective of whether you are a salaried employee or a self-employed individual, we present an outstanding choice for obtaining an instant cash loan. With our quick and uncomplicated application process, you can access the funds you need at any time and from anywhere. Sometimes, you might urgently need cash because you&#39;re short on money or have unexpected expenses. Going to a regular bank for a loan may not be ideal since it can take a while for them to process your application and transfer the funds to your account. In this case, you can opt for an instant personal loan from us, and get the required funds to your bank account within an hour. You can avail of an instant cash loan in 5 minutes and an instant cash loan in 1 hour without documents, with proper research and guidance.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Quick disbursal within 5 minutes to 1 hour</li>
          <li>No documentation required</li>
          <li>Loan amounts from INR 500 to Rs. 5 lakhs</li>
          <li>Affordable EMIs for easy repayment</li>
          <li>Secure and user-friendly mobile app</li>
          <li>Available for both salaried and self-employed individuals</li>
        </ul>
      </ContentSection>

      <StepsSection>
        <h2>How to Apply for an Instant Cash Loan</h2>
        <div className="step">
          <div className="step-number">1</div>
          <p>Research and Choose a Lender: Select a reputable instant cash loan provider that aligns with your needs.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Online Application: Use our online platform or mobile app to complete the application in a few steps. You might need your Aadhaar Card or PAN to complete your loan application.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Eligibility Check: Our system assesses your eligibility within minutes based on your income, employment, and credit history.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <p>Approval and Disbursal: Get swift approval within minutes, with funds transferred to your bank account within an hour.</p>
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

export default InstantCashLoan;