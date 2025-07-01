import React from 'react';
import styled from 'styled-components';

const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 40px 20px;
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  max-width: 350px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #1E3A8A;
    font-size: 1.5em;
    margin: 15px 0 10px;
    font-weight: 600;
  }

  p {
    color: #4B5EAA;
    font-size: 0.9em;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.background || '#E6EFFF'};
  border-radius: 50%;
`;

const FeaturesPage = () => {
  return (
    <FeaturesWrapper>
      <FeatureCard>
        <IconWrapper $background="#E6FFE6">
          {/* Placeholder for Secure icon - Replace with actual SVG or image */}
          <span role="img" aria-label="secure">🔒</span>
        </IconWrapper>
        <h3>Secure</h3>
        <p>Your personal and financial details are locked down tight every step of the way.</p>
      </FeatureCard>

      <FeatureCard>
        <IconWrapper $background="#E6FFE6">
          {/* Placeholder for Instant Approval icon - Replace with actual SVG or image */}
          <span role="img" aria-label="clock">⏳</span>
        </IconWrapper>
        <h3>Instant Approval</h3>
        <p>Find out if you’re approved or not in minutes, not days.</p>
      </FeatureCard>

      <FeatureCard>
        <IconWrapper $background="#E6FFE6">
          {/* Placeholder for No Documentation icon - Replace with actual SVG or image */}
          <span role="img" aria-label="document">📄</span>
        </IconWrapper>
        <h3>No Documentation</h3>
        <p>Forget about paperwork. We are all digital, quick, and easy.</p>
      </FeatureCard>
    </FeaturesWrapper>
  );
};

export default FeaturesPage;