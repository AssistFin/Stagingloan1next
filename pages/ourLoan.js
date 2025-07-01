import React from 'react';
import styles from '../styles/OurLoanPage.module.css';

const OurLoan = () => {
  const products = [
    {
      icon: <i className="bi bi-currency-rupee" style={{ fontSize: '36px', color: '#1E3A8A' }}></i>,
      title: "Personal Loans",
      description: "Flexible financing for life's moments, big and small.",
      features: [
        "₹5,000 - ₹50,000",
        "Terms from upto 12 months",
        "Interest Rate upto 2% per month",
        "Processing Fee upto 5% + GST",
        "No prepayment penalties",
        "Quick & direct transfer to the Bank Account",
        "Minimal documentation, quick & direct transfer to the Bank Account",
      ],
    },
    {
      icon: <i className="bi bi-briefcase" style={{ fontSize: '36px', color: '#F97316' }}></i>,
      title: "Salary Advance Loan",
      description: "Get a portion of your salary in advance to cover urgent financial needs",
      features: [
        "₹10,000 - ₹1,00,000",
        "Terms from upto 12 months",
        "Interest Rate upto 2% per month",
        "Processing Fee upto 5% + GST",
        "No prepayment penalties",
        "Quick & direct transfer to the Bank Account",
        "Minimal documentation, quick & direct transfer to the Bank Account",
      ],
    },
    {
      icon: <i className="bi bi-file-text" style={{ fontSize: '36px', color: '#1E3A8A' }}></i>,
      title: "Line of Credit",
      description: "Access a revolving line of credit for personal or business use",
      features: [
        " ₹50,000 to ₹2,00,000",
        "Terms from upto 12 months",
        "Interest Rate upto 2% per month",
        "Processing Fee upto 5% + GST",
        "Prepayment penalties as applicable",
        "No collateral or pledge of security",
        "Minimal documentation, quick & direct transfer to the Bank Account",
      ],
    },
    {
      icon: <i className="bi bi-house" style={{ fontSize: '36px', color: '#10B981' }}></i>, // Fixed here
      title: "Business Loan",
      description: "Grow your business with tailored business loans",
      features: [
        "₹50,000 - ₹2,00,000",
        "Terms from upto 12 months",
        "Interest Rate upto 2% per month",
        "Processing Fee upto 5% + GST",
        "Prepayment penalties as applicable",
        "No collateral or pledge of security",
        "Minimal documentation, quick & direct transfer to the Bank Account",
      ],
    },
  ];

  const renderLoanProduct = ({ icon, title, description, features }) => (
    <div className={styles['feature-card']}>
      <div className={styles['feature-icon']}>{icon}</div>
      <h3 className={styles['feature-title']}>{title}</h3>
      <p className={styles['feature-description']}>{description}</p>
      <ul className={styles['feature-list']}>
        {features.map((feature, index) => (
          <li key={index} className={styles['feature-item']}>
            <i className="bi bi-check-circle" style={{ color: '#10B981', marginRight: '8px' }}></i>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className={styles['loan-products-section']}>
      <div className={styles['section-container']}>
        <h2 className={styles['section-title']}>Our Loan Products</h2>
        <p className={styles['section-description']}>
          Explore our range of flexible financial solutions designed to meet your unique needs.
        </p>
        <div className={styles['products-grid']}>
          {products.map((product, index) => (
            <div key={index}>
              {renderLoanProduct({
                icon: product.icon,
                title: product.title,
                description: product.description,
                features: product.features,
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurLoan;