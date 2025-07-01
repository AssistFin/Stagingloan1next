import React from 'react';
import styles from '../styles/RefundPolicy.module.css';

const RefundPolicy = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}  style={{color:'#1e3a8a', fontSize:'27px'}}>Refund Policy</h1>
          <p className={styles.heroSubtitle}>
            LoanOne (Operated by AssistFin Technologies Private Limited)
          </p>
        </div>
      </section>

      {/* Policy Sections */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.policyCard}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.sectionText}>
              At LoanOne, operated by AssistFin Technologies Private Limited (&quotwe&quot, &quotus&quot, or &quotour&quot), we prioritize transparency, integrity, and customer satisfaction. This Refund Policy outlines our practices and conditions related to refunds for payments made via our platform in connection with the financial services we facilitate. Please read this policy carefully before making any payments through the LoanOne platform.
            </p>

            <h2 className={styles.sectionTitle}>2. Nature of Services</h2>
            <p className={styles.sectionText}>
              LoanOne is a technology-driven platform that enables users to apply for and manage financial services, including loan applications, through partnerships with regulated financial institutions such as banks and NBFCs. We facilitate service delivery, processing, and user support, but do not directly disburse or collect loans.
            </p>

            <h2 className={styles.sectionTitle}>3. Applicability</h2>
            <p className={styles.sectionText}>
              This Refund Policy applies to any service charges, fees, or payments made by users to LoanOne or to any financial services facilitated through the platform. This includes application fees, technology usage charges, convenience fees, or third-party verification service charges paid via LoanOne.
            </p>

            <h2 className={styles.sectionTitle}>4. Non-Refundable Fees</h2>
            <p className={styles.sectionText}>
              Unless otherwise specified, the following payments are non-refundable:
            </p>
            <ul className={styles.list}>
              <li>Loan application processing charges, once the application is submitted.</li>
              <li>Technology usage or convenience fees incurred for using the LoanOne platform.</li>
              <li>Third-party KYC/verification costs once services are rendered.</li>
              <li>Service charges paid to partner institutions, unless those partners specify otherwise.</li>
            </ul>

            <h2 className={styles.sectionTitle}>5. Exceptions to Non-Refundability</h2>
            <p className={styles.sectionText}>
              Refunds may be considered under exceptional circumstances, including:
            </p>
            <ul className={styles.list}>
              <li>Duplicate payments due to a technical error or platform malfunction.</li>
              <li>Transaction failures where the amount was debited but service was not rendered.</li>
              <li>Unauthorised transactions due to platform error (not including cases of user negligence).</li>
            </ul>
            <p className={styles.sectionText}>
              All refund requests must be submitted with proof of payment and valid reasoning. Each request will be reviewed on a case-by-case basis, and a decision will be communicated to the user within 10 working days.
            </p>

            <h2 className={styles.sectionTitle}>6. Refund Request Procedure</h2>
            <p className={styles.sectionText}>
              To initiate a refund request, please email us at <a href="mailto:info@assistfin.com" className={styles.link}>info@assistfin.com</a> with the following details:
            </p>
            <ul className={styles.list}>
              <li>Full name and registered mobile number/email ID.</li>
              <li>Date and time of transaction.</li>
              <li>Payment reference number.</li>
              <li>Reason for refund.</li>
              <li>Supporting documents or screenshots (if applicable).</li>
            </ul>

            <h2 className={styles.sectionTitle}>7. Processing of Approved Refunds</h2>
            <p className={styles.sectionText}>
              Approved refunds will be processed to the original mode of payment within 7-10 business days. In cases where the original payment method is no longer valid or active, alternate arrangements may be made with the consent of the user.
            </p>

            <h2 className={styles.sectionTitle}>8. No Refund for Loan Repayments</h2>
            <p className={styles.sectionText}>
              Loan repayments made to lending partners through the LoanOne platform are governed by the terms of the respective loan agreement. LoanOne is not responsible for refunding EMIs or interest once paid. Any such concerns must be addressed directly to the respective lender.
            </p>

            <h2 className={styles.sectionTitle}>9. Contact Information</h2>
            <p className={styles.sectionText}>
              For queries related to this Refund Policy or to track the status of a refund request, please contact:
            </p>
            <p className={styles.sectionText}>
              <strong>AssistFin Technologies Private Limited</strong><br />
              B-233, 2nd Floor, Pacific Business Park, Sahibabad,<br />
              Ghaziabad, Uttar Pradesh- 201306<br />
              Email: <a href="mailto:info@assistfin.com" className={styles.link}>info@assistfin.com</a><br />
              Contact: <a href="tel:7700840543" className={styles.link}>+917700840543</a>
            </p>

            <h2 className={styles.sectionTitle}>10. Policy Amendments</h2>
            <p className={styles.sectionText}>
              LoanOne reserves the right to revise this Refund Policy from time to time to reflect changes in regulatory requirements, platform functionality, or user feedback. Updated versions will be published on our Platform with the effective date clearly mentioned.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;