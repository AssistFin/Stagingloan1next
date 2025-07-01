import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #fff;
  color: #1E3A8A; // Primary blue from your theme
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    color: #1E3A8A;
    font-size: 27px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  p {
    color: #4B5EAA;
    font-size: 1em;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 40px;
  line-height: 1.6;

  h2 {
    color: #1E3A8A;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
    border-bottom: 2px solid #1E3A8A;
    padding-bottom: 10px;
  }

  p {
    color: #4B5EAA;
    font-size: 1em;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    color: #4B5EAA;

    li {
      margin-bottom: 10px;
      color: #4B5EAA;
    }
  }

  .contact-info {
    background: #f9fafb;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;

    p {
      color: #1E3A8A;
      font-weight: 500;
    }
  }
`;

const GrievanceRedressalPolicyPage = () => {
  return (
    <PageWrapper>
      <Header>
        <h1>Grievance Redressal Policy</h1>
        <p>Our Grievance Redressal Policy outlines the process for addressing and resolving customer complaints or concerns related to our loan services. We are committed to ensuring prompt and fair resolution.</p>
      </Header>

      <ContentSection>
        <h2>1. Purpose of the Policy</h2>
        <p>
          This Grievance Redressal Policy is designed to provide a structured and transparent mechanism for customers to raise concerns, complaints, or grievances related to our loan products, services, or processes. We aim to resolve issues efficiently, ensuring customer satisfaction and compliance with applicable laws and regulations in India, including the Reserve Bank of India (RBI) guidelines for financial institutions.
        </p>

        <h2>2. Scope</h2>
        <p>
          This policy applies to all customers, including individuals and businesses, who use our loan services through our website, mobile app, or other platforms. It covers grievances related to loan applications, disbursals, repayments, customer service, privacy, and any other interactions with our services.
        </p>

        <h2>3. Grievance Redressal Process</h2>
        <p>
          We follow a systematic process to address and resolve grievances:
        </p>
        <ul>
          <li>Submit your grievance through our website, mobile app, email, or phone.</li>
          <li>We will acknowledge your complaint within 24 hours of receipt.</li>
          <li>Our customer support team will investigate and attempt to resolve the issue within 7 working days.</li>
          <li>If the issue requires escalation, it will be referred to our Grievance Redressal Officer, who will resolve it within 30 days as per RBI guidelines.</li>
          <li>You will receive regular updates on the status of your grievance via email or SMS.</li>
        </ul>

        <h2>4. Grievance Redressal Officer</h2>
        <p>
          Our designated Grievance Redressal Officer is responsible for handling escalated complaints. You may contact them directly if your issue is not resolved satisfactorily at the initial level.
        </p>
        {/* <div className="contact-info">
          <p><strong>Grievance Redressal Officer:</strong> [Officer Name]</p>
          <p><strong>Email:</strong> grievance@loanone.in</p>
          <p><strong>Phone:</strong> +91-123-456-7890</p>
          <p><strong>Address:</strong> LoanOne, [Your Address], [City, State, PIN]</p>
        </div> */}

        <h2>5. Escalation to Regulatory Authorities</h2>
        <p>
          If your grievance remains unresolved within 30 days or you are dissatisfied with our response, you may escalate the matter to the Reserve Bank of India (RBI) or the relevant regulatory authority in India. Contact details for the RBI’s Ombudsman are available on their official website.
        </p>

        <h2>6. Confidentiality</h2>
        <p>
          All grievances and related information will be treated with strict confidentiality. We will not disclose your personal details to third parties without your consent, except as required by law or regulatory authorities.
        </p>

        <h2>7. Policy Updates</h2>
        <p>
          We reserve the right to update or modify this Grievance Redressal Policy at any time. Any changes will be effective immediately upon posting on our website or app. We recommend reviewing this policy periodically for updates.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          For any questions or to submit a grievance, please contact our customer support team at info@assistfin.com. We are committed to addressing your concerns promptly and ensuring your satisfaction.
        </p>
      </ContentSection>
    </PageWrapper>
  );
};

export default GrievanceRedressalPolicyPage;