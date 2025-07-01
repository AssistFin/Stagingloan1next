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
`;

const CodeOfConductPage = () => {
  return (
    <PageWrapper>
      <Header>
        <h1>Code of Conduct</h1>
        <p>Our Code of Conduct outlines the ethical standards and behavioral expectations for all employees, partners, and stakeholders of LoanOne. We are committed to maintaining integrity, transparency, and professionalism in all our operations.</p>
      </Header>

      <ContentSection>
        <h2>1. Purpose of the Code</h2>
        <p>
          This Code of Conduct is designed to foster a culture of integrity, accountability, and respect within LoanOne. It applies to all employees, directors, contractors, vendors, and partners interacting with our organization or customers. The code ensures compliance with applicable laws, regulations, and ethical standards, particularly those set by the Reserve Bank of India (RBI) and other regulatory bodies in India.
        </p>

        <h2>2. Scope</h2>
        <p>
          This policy applies to all individuals associated with LoanOne, including full-time and part-time employees, consultants, and third-party partners. It covers all aspects of our operations, including customer interactions, financial dealings, marketing, and internal conduct.
        </p>

        <h2>3. Core Principles</h2>
        <p>
          We uphold the following principles in all our activities:
        </p>
        <ul>
          <li>Integrity: Act honestly, ethically, and with fairness in all dealings.</li>
          <li>Transparency: Maintain open and honest communication with customers, employees, and stakeholders.</li>
          <li>Respect: Treat all individuals with dignity, courtesy, and respect, regardless of gender, background, or position.</li>
          <li>Confidentiality: Protect the privacy and sensitive information of customers and employees as per our Privacy Policy.</li>
          <li>Compliance: Adhere to all applicable laws, regulations, and internal policies, including anti-corruption and anti-money laundering guidelines.</li>
        </ul>

        <h2>4. Employee Responsibilities</h2>
        <p>
          Employees are expected to:
        </p>
        <ul>
          <li>Maintain high standards of professional behavior in all interactions.</li>
          <li>Avoid conflicts of interest and disclose any potential conflicts promptly.</li>
          <li>Refrain from engaging in bribery, corruption, or unethical practices.</li>
          <li>Protect company assets, including intellectual property and customer data.</li>
          <li>Report any violations of this Code to the Compliance Officer or Grievance Redressal Officer.</li>
        </ul>

        <h2>5. Customer Interactions</h2>
        <p>
          We are committed to providing fair, transparent, and respectful service to our customers. This includes:
        </p>
        <ul>
          <li>Providing accurate and complete information about loan products, fees, and terms.</li>
          <li>Ensuring timely responses to customer inquiries and complaints.</li>
          <li>Adhering to data protection laws and safeguarding customer information.</li>
          <li>Avoiding misleading or aggressive marketing practices.</li>
        </ul>

        <h2>6. Partner and Vendor Conduct</h2>
        <p>
          All partners, vendors, and third-party service providers must adhere to the same ethical standards as our employees. We conduct due diligence to ensure our partners align with our Code of Conduct and terminate relationships if violations occur.
        </p>

        <h2>7. Reporting Violations</h2>
        <p>
          Any suspected or observed violation of this Code should be reported immediately to our Compliance Officer or Grievance Redressal Officer. Reports can be made anonymously, and we ensure protection against retaliation for good-faith reporting.
        </p>
        {/* <p>
          Contact: <br />
          <strong>Compliance Officer:</strong> compliance@loanone.in <br />
          <strong>Phone:</strong> +91-987-654-3210
        </p> */}

        <h2>8. Consequences of Non-Compliance</h2>
        <p>
          Violations of this Code may result in disciplinary action, including termination of employment, legal action, or termination of partnerships, depending on the severity of the breach. We also cooperate fully with law enforcement and regulatory authorities as required.
        </p>

        <h2>9. Policy Updates</h2>
        <p>
          We reserve the right to update or modify this Code of Conduct at any time. Any changes will be effective immediately upon posting on our website or app. We recommend reviewing this policy periodically for updates.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For any questions or to report concerns, please contact our customer support team at info@assistfin.com. We are committed to upholding the highest standards of conduct and addressing your inquiries promptly.
        </p>
      </ContentSection>
    </PageWrapper>
  );
};

export default CodeOfConductPage;