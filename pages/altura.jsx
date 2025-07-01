import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #1E3A8A;
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    color: #4B5EAA;
    font-size: 0.9em;
    line-height: 1.5;
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

const ContactInfo = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  p {
    color: #1E3A8A;
    font-weight: 500;
    margin-bottom: 10px;
  }
  a {
    color: #1E3A8A;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

const AlturaFinancePage = () => {
  return (
    <PageWrapper>
      <Header>
        <h1>Altura Financial Services Limited</h1>
        <p>Welcome to Altura, your trusted partner in financial solutions. We are committed to empowering individuals and businesses with innovative, secure, and accessible financial services tailored to your needs.</p>
      </Header>

      <ContentSection>
        <h2>About Us</h2>
        <p>
          Altura is a leading financial institution dedicated to transforming lives through entrepreneurial success and financial inclusion. With a focus on low- and moderate-income communities, diverse ownership, and high-growth markets, we provide tailored loan products, investment opportunities, and financial advisory services. Our mission is to create long-term value, foster economic growth, and support our clients in achieving their financial goals with integrity and transparency.
        </p>
      </ContentSection>

      <ContentSection>
        <h2>Our Features</h2>
        <ServicesGrid>
          <ServiceCard>
            <h3>Trusted Company</h3>
            <p>Altura Financial Services Limited is a trusted Non-Banking Financial Company (NBFC) committed to delivering transparent, reliable, and customer-centric financial solutions. With a focus on responsible lending.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>Anytime Money Back</h3>
            <p>With Altura, an NBFC you can trust, enjoy the flexibility of our &apos;Anytime Money Back&apos; insurance plans to get relief. Access your funds whenever you need them, ensuring financial freedom and peace of mind.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>Flexible Plans</h3>
            <p>Altura, a trusted NBFC, offers flexible insurance plans designed to adapt to your unique needs. Whether it&apos;s adjusting coverage or accessing benefits, our plans provide the freedom to secure your future on your terms.</p>
          </ServiceCard>
          <ServiceCard>
            <h3>24/7 Fast Support</h3>
            <p>At Altura Financial Services Limited, we&apos;re committed to being there when you need us. Our dedicated support team is available 24/7 to assist you with your financial queries, loan applications, or any other concerns.</p>
          </ServiceCard>
        </ServicesGrid>
      </ContentSection>

      <ContentSection>
        <h2>Our Mission and Values</h2>
        <p>
          At Altura, our mission is to elevate the financial well-being of our clients and communities by providing innovative solutions that drive economic empowerment. We uphold values of integrity, accountability, transparency, and collaboration, ensuring every interaction reflects our commitment to excellence and social impact.
        </p>
      </ContentSection>

      <ContentSection>
        <h2>Contact Us</h2>
        <p>
          We’re here to help you with your financial needs. Reach out to us for more information or to apply for our services.
        </p>
        <ContactInfo>
          <p><strong>Email:</strong> afs@alturafinancials.com</p>
          <p><strong>Website:</strong> <a href="https://alturafinancials.com/" target="_blank" rel="noopener noreferrer" style={{}}>https://alturafinancials.com/</a></p>
          <p><strong>Phone:</strong> +91-9582581128</p>
          <p><strong>Address:</strong> Ground Floor, Plot No-121, Block-B,Pocket-4, Sector-23, Dwarka, New Delhi, 110077</p>
          <p><strong>Support Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM IST</p>
        </ContactInfo>
      </ContentSection>
    </PageWrapper>
  );
};

export default AlturaFinancePage;