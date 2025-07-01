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
    font-size: 3em;
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
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: 15px;
    border-bottom: 2px solid #1E3A8A;
    padding-bottom: 10px;
  }

  h3 {
    color: #1E3A8A;
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 10px;
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
    }
  }
`;

const EligibilityCriteria = () => {
  return (
    <PageWrapper>
      <Header>
        <h1>Eligibility Criteria</h1>
        <p>Learn about the eligibility requirements for our various loan products to determine if you qualify for financial support from us.</p>
      </Header>

      <ContentSection>
        <h2>General Eligibility Criteria</h2>
        <p>
          To apply for any loan product with us, you must meet the following general eligibility criteria:
        </p>
        <ul>
          <li>Be at least 18 years old;</li>
          <li>Be a resident of India with a valid government-issued ID (e.g., Aadhaar Card, PAN Card);</li>
          <li>Have a stable source of income (salaried, self-employed, or business owner);</li>
          <li>Provide accurate and complete information during the application process;</li>
          <li>Have an active bank account in India;</li>
          <li>Possess a good credit history (subject to loan type and amount).</li>
        </ul>

        <h2>Specific Eligibility Criteria by Loan Type</h2>

        <h3>1. Personal Loans</h3>
        <p>
          In addition to the general criteria, eligibility for Personal Loans includes:
        </p>
        <ul>
          <li>Minimum monthly income of INR 25,000 for salaried individuals or equivalent for self-employed;</li>
          <li>Employment tenure of at least 6 months for salaried individuals or 2 years for self-employed;</li>
          <li>Loan amounts range from INR 50,000 to Rs. 20 lakhs, based on income and credit score;</li>
          <li>No collateral required, but creditworthiness is assessed.</li>
        </ul>

        <h3>2. Salary Loans</h3>
        <p>
          In addition to the general criteria, eligibility for Salary Loans includes:
        </p>
        <ul>
          <li>Salaried individuals with a minimum monthly salary of INR 20,000;</li>
          <li>Minimum employment tenure of 6 months with the current employer;</li>
          <li>Loan amounts range from INR 50,000 to Rs. 10 lakhs, tied to salary and repayment capacity;</li>
          <li>No collateral required, with repayment terms aligned with salary cycles (12-60 months).</li>
        </ul>

        <h3>3. Short Term Loans</h3>
        <p>
          In addition to the general criteria, eligibility for Short Term Loans includes:
        </p>
        <ul>
          <li>Minimum monthly income of INR 15,000 for individuals or equivalent for businesses;</li>
          <li>Stable income source, either salaried, self-employed, or small business owner;</li>
          <li>Loan amounts range from INR 10,000 to Rs. 5 lakhs, with repayment terms of 1-12 months;</li>
          <li>No collateral required, with quick assessment based on income and credit history.</li>
        </ul>

        <h3>4. Empowerment Loans</h3>
        <p>
          In addition to the general criteria, eligibility for Empowerment Loans includes:
        </p>
        <ul>
          <li>Targeted at women entrepreneurs, self-employed individuals, and underserved communities;</li>
          <li>Minimum income of INR 20,000 or proof of business activity for self-employed;</li>
          <li>Loan amounts range from INR 25,000 to Rs. 10 lakhs, with repayment terms of 6-36 months;</li>
          <li>No collateral required, with priority given to financial inclusion and empowerment goals.</li>
        </ul>

        <h3>5. MSME Loans</h3>
        <p>
          In addition to the general criteria, eligibility for MSME Loans includes:
        </p>
        <ul>
          <li>Micro, Small, and Medium Enterprises (MSMEs) registered under the MSME Act or GST;</li>
          <li>Minimum annual turnover of INR 5 lakhs, depending on the business size;</li>
          <li>Loan amounts range from INR 50,000 to Rs. 50 lakhs, with repayment terms of 6-60 months;</li>
          <li>No collateral required for eligible MSMEs, with assessment based on business performance and credit history.</li>
        </ul>

        <h3>6. Credit Loans</h3>
        <p>
          In addition to the general criteria, eligibility for Credit Loans includes:
        </p>
        <ul>
          <li>Minimum monthly income of INR 20,000 for individuals;</li>
          <li>Stable employment or income source, with a fair to good credit score;</li>
          <li>Loan amounts range from INR 25,000 to Rs. 15 lakhs, aimed at improving creditworthiness;</li>
          <li>No collateral required, with repayment terms of 12-48 months.</li>
        </ul>

        <h3>7. Business Loans</h3>
        <p>
          In addition to the general criteria, eligibility for Business Loans includes:
        </p>
        <ul>
          <li>Businesses (startups, MSMEs, or established companies) with a minimum annual turnover of INR 5 lakhs;</li>
          <li>Minimum 1 year of business operation for startups, 2 years for established businesses;</li>
          <li>Loan amounts range from INR 50,000 to Rs. 50 lakhs, with repayment terms of 6-60 months;</li>
          <li>No collateral required for eligible businesses, with assessment based on business performance and credit history.</li>
        </ul>

        <h2>Documentation Required</h2>
        <p>
          Depending on the loan type, you may need to provide the following documents:
        </p>
        <ul>
          <li>Identity Proof: Aadhaar Card, PAN Card, or Passport;</li>
          <li>Address Proof: Utility bill, Aadhaar Card, or rental agreement;</li>
          <li>Income Proof: Salary slips (for salaried), bank statements (for self-employed/business), or GST returns (for MSMEs);</li>
          <li>Business Proof: GST registration, business license, or trade license (for MSMEs/business loans);</li>
          <li>Other Documents: Photographs, employment certificate, or additional documents as requested.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have questions about eligibility or need assistance with your loan application, please contact our customer support team at support@loanone.in or [Your Contact Number]. We’re here to help you determine if you qualify for our loan products.
        </p>
      </ContentSection>
    </PageWrapper>
  );
};

export default EligibilityCriteria;