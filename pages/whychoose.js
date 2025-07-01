import React from 'react';
import styles from '../styles/whyChooseSection.module.css'

const WhyChoose = () => {
  const features = [
    {
      icon: <i className="bi bi-shield-lock" style={{ fontSize: '36px', color: '#0072CE' }}></i>, // Blue
      title: "Secure & Transparent",
      description: "Your financial information is protected with bank-level security measures. We maintain complete transparency throughout the loan process."
    },
    {
      icon: <i className="bi bi-graph-up" style={{ fontSize: '36px', color: '#10B981' }}></i>, // Green
      title: "Fast Approvals",
      description: "Our advanced algorithms and streamlined process enable quick loan decisions, often within 24 hours of application submission."
    },
    {
      icon: <i className="bi bi-key" style={{ fontSize: '36px', color: '#F97316' }}></i>, // Orange
      title: "Flexible Solutions",
      description: "We offer customizable loan terms and repayment options that adapt to your specific financial situation and goals."
    },
    {
      icon: <i className="bi bi-file-text" style={{ fontSize: '36px', color: '#0072CE' }}></i>, // Blue
      title: "Simple Application",
      description: "Our intuitive online application takes just minutes to complete, with minimal documentation requirements."
    },
    {
      icon: <i className="bi bi-piggy-bank" style={{ fontSize: '36px', color: '#0072CE' }}></i>, // Blue
      title: "Competitive Rates",
      description: "Benefit from market-competitive interest rates and transparent fee structures with no hidden charges."
    },
    {
      icon: <i className="bi bi-people" style={{ fontSize: '36px', color: '#10B981' }}></i>, // Green
      title: "Dedicated Support",
      description: "Our customer support team is available to assist you throughout your loan journey, from application to final payment."
    }
  ];

  const renderFeatureCard = ({ icon, title, description }) => (
    <div className={styles['feature-card']}>
      <div className={styles['feature-icon']}>{icon}</div>
      <h3 className={styles['feature-title']}>{title}</h3>
      <p className={styles['feature-description']}>{description}</p>
    </div>
  );

  return (
    <section className={styles['why-choose-section']}>
      <div className={styles['section-container']}>
        <h2 className={styles['section-title']}>
          Why Choose <span className={styles.highlight}>LoanOne</span>
        </h2>
        <p className={styles['section-description']}>
          Our innovative fintech platform combines cutting-edge technology with personalized service to 
          provide you with the best loan experience possible.
        </p>
        <div className={styles['features-grid']}>
          {features.map((feature, index) => (
            <div key={index}>
              {renderFeatureCard({
                icon: feature.icon,
                title: feature.title,
                description: feature.description,
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;