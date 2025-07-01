import React from 'react';
import styles from '../styles/CancellationPolicy.module.css';

const CancellationPolicy = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle} style={{color:'#1e3a8a', fontSize:'27px'}}>Cancellation Policy</h1>
          <p className={styles.heroSubtitle}>
            LoanOne (Operated by AssistFin Technologies Private Limited)
          </p>
        </div>
      </section>

      {/* Policy Sections */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.policyCard}>
            <p className={styles.introText}>
              This Cancellation Policy (“Policy”) outlines the terms and conditions for cancellation of services availed through LoanOne, the brand name of AssistFin Technologies Private Limited (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By using our platform and initiating any transaction, you agree to be bound by the terms of this Policy, as may be amended from time to time.
            </p>

            <h4 className={styles.sectionTitle}>1. Nature of Services</h4>
            <p className={styles.sectionText}>
              LoanOne is a technology platform that facilitates access to credit and financial products offered by regulated financial institutions including Banks and NBFCs (“Lending Partners”). The final approval, disbursal, and terms of any loan are solely governed by the respective Lending Partner.
            </p>

            <h4 className={styles.sectionTitle}>2. Cancellation of Loan Application</h4>
            <ul className={styles.list}>
            <li>You may choose to cancel your loan application submitted via the LoanOne platform at any time prior to final approval or disbursal by the Lending Partner.</li>
              <li>Cancellation requests must be submitted through your registered account or by contacting our customer support at <a href="mailto:info@assistfin.com" className={styles.link}>info@assistfin.com</a>.</li>
              <li>
                Once your application is under processing by a Lending Partner, cancellation will be subject to the internal policies of that Partner. LoanOne does not guarantee cancellation once the file is under review or approved by a Lending Partner.
              </li>
            </ul>

            <h4 className={styles.sectionTitle}>3. Cancellation After Disbursal</h4>
            <ul className={styles.list}>
            <li>Once a loan amount is disbursed to your bank account, the transaction cannot be canceled.</li>
              <li>If you do not wish to utilize the funds, you may choose to repay the full amount along with any applicable interest and charges as per the loan agreement executed with the Lending Partner.</li>
              <li>Early repayment or foreclosure may be subject to penalties or fees as outlined in the respective lender’s terms and conditions.</li>
            </ul>

            <h4 className={styles.sectionTitle}>4. Cancellation of Ancillary Services</h4>
            <p className={styles.sectionText}>
              If you have opted for any ancillary services (such as insurance products, value-added financial tools, or premium verification services), the cancellation of such services will be subject to the individual service provider’s terms and conditions. LoanOne will assist you in coordinating with the relevant provider where possible.
            </p>

            <h4 className={styles.sectionTitle}>5. Processing Charges</h4>
            <ul className={styles.list}>
              <li>
              In the event of cancellation, any non-refundable processing fees, administrative charges, or verification fees already paid by you may not be refunded.
              </li>
              <li>If a fee was charged by a Lending Partner or third party, you may be required to approach them directly for resolution.</li>
            </ul>

            <h4 className={styles.sectionTitle}>6. Refunds (If Applicable)</h4>
            <ul className={styles.list}>
            <li>Where eligible, refunds will be processed to your original method of payment within 7–10 business days, depending on your bank’s processing time.</li>
              <li>Refunds are not applicable for services already rendered or partially completed during the cancellation period.</li>
            </ul>

            <h4 className={styles.sectionTitle}>7. LoanOne’s Role</h4>
            <p className={styles.sectionText}>
              LoanOne is not a lender. We are not responsible for decisions made by Lending Partners, nor for the fulfillment or cancellation of loans once transferred to their systems. Our role is limited to facilitating communication and service between you and the lender.
            </p>

            <h4 className={styles.sectionTitle}>8. Modifications to This Policy</h4>
            <p className={styles.sectionText}>
              We reserve the right to update or modify this Policy at any time. The updated Policy will be posted on our platform with the revised effective date. Continued use of our services after such changes shall constitute your acceptance of the revised terms.
            </p>

            <h4 className={styles.sectionTitle}>9. Contact Information</h4>
            <p className={styles.sectionText}>
              For cancellation assistance, please contact us at:
            </p>
            <p className={styles.sectionText}>
              <strong>AssistFin Technologies Pvt. Ltd.</strong><br />
              B-233, 2nd Floor, Pacific Business Park, Sahibabad,<br />
              Ghaziabad, Uttar Pradesh- 201306<br />
              Email: <a href="mailto:info@assistfin.com" className={styles.link}>info@assistfin.com</a><br />
              Contact: <a href="tel:7700840543" className={styles.link}>+917700840543</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CancellationPolicy;