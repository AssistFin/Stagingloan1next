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

const PartnerGRMPolicyPage = () => {
  return (
    <PageWrapper>
      <Header>
        <h1>Grievance Redressal Mechanism</h1>
        <p>Altura Financial Services Pvt. Ltd. - Customers who wish to send in complaint/feedback over any issue can use the following channels.</p>
      </Header>

      <ContentSection>
        <h2>LEVEL 1: Customer Relationship Manager</h2>
        <p>
          Please contact Customer Relationship Manager.
        </p>
        <p>Timings: 10 am to 6 pm on week days</p>

        <h2>LEVEL 2: Customer Service Help Desk</h2>
        <p>
          If you are not satisfied with the response received from the branch or if you don&apos;t receive a response in 3 working days, please call our Help Desk Representatives available on the phone to register your complaints.
        </p>
        <ul>
          <li>Helpline No: +91-7700840543</li>
          <li>Email id: grievance@alturafinancials.com</li>
          <li>Timings: 9 am to 5 pm on week days</li>
        </ul>

        <h2>LEVEL 3: Grievance Redressal Officer</h2>
        <p>
          If you are not satisfied with the response from customer service helpdesk or if you don&apos;t receive a response within 3 working days, please call or write to Grievance Redressal Officer. You will receive a response within 5 working days of Grievance Redressal Officer receiving the complaint.
        </p>
        <div className="contact-info">
          <p><strong>Grievance Redressal Officer (Nodal Officer)</strong></p>
          <p>Name: Mr. Ravi Shankar Kumar</p>
          <p>Address: Ground Floor Plot No-121, Block-B, Pocket-4, Sector-23, Dwarka, New Delhi 110077</p>
          <p>Contact No: +91-7700840543</p>
          <p>Email: grievance@alturafinancials.com</p>
        </div>

        <h2>Escalation to Regulatory Authorities</h2>
        <p>
          Also, if the complaint / dispute are not redressed within a period of one month, the customer may appeal to the RBI on the following address:
        </p>
        <div className="contact-info">
          <p><strong>The General Manager</strong></p>
          <p>Deptt. Of Non-Banking Supervision (DNBS)</p>
          <p>Reserve Bank of India</p>
          <p>6, Sansad Marg, New Delhi- 110001</p>
        </div>
      </ContentSection>
    </PageWrapper>
  );
};

export default PartnerGRMPolicyPage;