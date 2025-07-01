import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #fff;
  color: #1E3A8A;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    color: #1E3A8A;
    font-size: 27px;
    font-weight: 700;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  p {
    color: #1E3A8A;
    font-size: 16px;
    ${'' /* max-width: 800px;
    margin: 0 auto 15px;
    line-height: 1.5; */}
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;
    color: #1E3A8A;
    margin: 0 0 15px;

    li {
      margin-bottom: 10px;
      color: #1E3A8A;
    }
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
    color: #1E3A8A;
    font-size: 16px;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;
    color: #1E3A8A;

    li {
      margin-bottom: 10px;
      color: #1E3A8A;
    }
  }
`;

const TermsAndConditionsPage = () => {
  return (
    <PageWrapper>
      <Header>
        <h1>GENERAL TERMS AND CONDITIONS</h1>
      </Header>
      <ContentSection>
      <p>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY. BY ACCESSING OR USING THE LOANONE PLATFORM, YOU AGREE TO BE BOUND BY THE TERMS SET FORTH HEREIN. IF YOU DO NOT AGREE WITH ANY PART OF THESE TERMS, PLEASE DO NOT USE OUR SERVICES.</p>
        <p>These General Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;you&quot;, &quot;your&quot;, &quot;user&quot;, or &quot;Customer&quot;) and AssistFin Technologies Private Limited (&quot;Company&quot;, &quot;LoanOne&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), the owner and operator of the LoanOne platform. These Terms govern your access to and use of our website, mobile application, and all services provided via the LoanOne platform (collectively, the &quot;Platform&quot;).</p>
        <p>These Terms are published in accordance with Indian laws, including but not limited to:</p>
        <ul>
          <li>The Indian Contract Act, 1872</li>
          <li>The Information Technology Act, 2000, and associated rules</li>
          <li>The Reserve Bank of India Act, 1934, and applicable regulations</li>
          <li>Guidelines issued by the Reserve Bank of India (RBI) for Digital Lending</li>
        </ul>
        <p>This document is an electronic record under the Information Technology Act, 2000 and does not require physical or digital signatures.</p>
        <h2>1. Definitions</h2>
        <ul>
          <li><strong>User/Customer/You:</strong> Any natural person who accesses or uses the LoanOne platform and intends to avail financial services facilitated by LoanOne.</li>
          <li><strong>LoanOne/Platform:</strong> The fintech technology platform operated by AssistFin Technologies Private Limited for enabling users to access loan-related services.</li>
          <li><strong>Lending Partner:</strong> A Reserve Bank of India (RBI) regulated entity, such as a Bank or Non-Banking Financial Company (NBFC), that provides credit facilities through the Platform.</li>
        </ul>

        <h2>2. Eligibility</h2>
        <p>By accessing the Platform and availing the services, you represent that you are:</p>
        <ul>
          <li>A resident Indian citizen;</li>
          <li>At least 18 years of age;</li>
          <li>Of sound mind and not disqualified from entering into contracts under the Indian Contract Act, 1872;</li>
          <li>Using the Platform for lawful purposes and not in violation of any applicable law.</li>
        </ul>
        <p>LoanOne reserves the right to deny access or services to any user who does not meet the eligibility criteria or violates these Terms.</p>

        <h2>3. Nature of Services</h2>
        <p>LoanOne is a facilitator and technology service provider that enables users to apply for and manage financial products offered by Lending Partners. LoanOne is not a lender and does not issue credit or loans directly. All loan-related decisions, terms, and approvals are made solely by the Lending Partners, subject to their internal credit policies and applicable laws.</p>

        <h2>4. User Information and Consent</h2>
        <p>You agree and understand that the submission of accurate, complete, and current personal information is mandatory to avail services via LoanOne. You authorize LoanOne to collect, use, verify, and share your information—including KYC documents, employment details, financial information, and contact details—with its Lending Partners and authorized third-party service providers solely for the purposes of:</p>
        <ul>
          <li>KYC verification;</li>
          <li>Credit Bureau Report</li>
          <li>Credit Worthiness Assessment;</li>
          <li>Loan processing, disbursal, and servicing;</li>
          <li>Regulatory compliance;</li>
          <li>Customer communication and service support.</li>
        </ul>
        <p>You also provide explicit consent to the Lending Partner/LoanOne for accessing your credit bureau reports from authorized bureaus for evaluating loan eligibility.</p>

        <h2>5. Use of Platform</h2>
        <p>By using the Platform, you agree:</p>
        <ul>
          <li>Not to use the Platform for any illegal or unauthorized purposes;</li>
          <li>Not to misrepresent or conceal your identity;</li>
          <li>Not to post or share false, misleading, or defamatory content;</li>
          <li>Not to attempt to gain unauthorized access to the Platform’s infrastructure or interfere with its security features.</li>
        </ul>
        <p>You acknowledge that the Platform may be unavailable from time to time due to scheduled maintenance or technical disruptions.</p>

        <h2>6. Loan Agreements</h2>
        <p>All loan terms—including interest rates, repayment schedule, penalties, processing fees, and other applicable charges—are governed by the individual loan agreement executed between you and the respective Lending Partner. It is your responsibility to review the loan agreement thoroughly before acceptance.</p>
        <p>LoanOne shall not be liable for any dispute between you and the Lending Partner arising from the loan contract or repayment terms.</p>

        <h2>7. Amendments to Terms</h2>
        <p>LoanOne reserves the right to revise these Terms at any time at its sole discretion. Any updates will be posted on the Platform with the revised effective date. Continued usage of the Platform after any such changes constitutes your acceptance of the updated Terms.</p>

        <h2>8. Limitation of Liability</h2>
        <p>LoanOne shall not be responsible or liable for any direct, indirect, incidental, special, or consequential losses or damages, including but not limited to:</p>
        <ul>
          <li>Loss of data or business opportunity;</li>
          <li>Delay or failure in loan processing due to technical errors;</li>
          <li>Disputes arising between the user and Lending Partner;</li>
          <li>Unauthorized access to user information resulting from user negligence.</li>
        </ul>
        <p>The Platform is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without any warranties, express or implied.</p>

        <h2>9. Data Privacy and Protection</h2>
        <p>All personal data collected from you is processed in accordance with our Privacy Policy and applicable data protection laws, including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023 (DPDP Act), where applicable. By accepting these Terms, you confirm that you have read and agreed to our Privacy Policy.</p>

        <h2>10. Termination</h2>
        <p>LoanOne reserves the right to suspend or terminate your access to the Platform, in whole or in part, at any time without notice for reasons including but not limited to breach of these Terms, violation of applicable laws, fraudulent behavior, or abuse of services.</p>
        <p>Upon termination, your right to use the Platform shall immediately cease, and any ongoing transactions with Lending Partners shall be governed independently by the respective loan agreements.</p>

        <h2>11. Dispute Resolution and Governing Law</h2>
        <p>Any dispute or claim arising out of or in relation to these Terms shall be governed by the laws of India. The courts located in Uttar Pradesh, India, shall have exclusive jurisdiction over any proceedings arising under or in connection with these Terms.</p>

        <h2>12. Contact Information</h2>
        <p>For any queries or concerns related to these Terms or the use of the Platform, you may contact:</p>
        <p>AssistFin Technologies Private Limited<br />B-233, 2nd Floor, Pacific Business Park, Sahibabad,<br />Ghaziabad, Uttar Pradesh- 201306<br />Email: info@assistfin.com<br />Contact: 7700840543</p>
      </ContentSection>
    </PageWrapper>
  );
};

export default TermsAndConditionsPage;