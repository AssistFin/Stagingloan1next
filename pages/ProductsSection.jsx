import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image'; // Import next/image

const ProductsWrapper = styled.div`
  background: #ffffff;
  padding: 40px 20px;
  text-align: center;

  h2 {
    color: #1E3A8A;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  p {
    color: #4B5EAA;
    font-size: 0.9em;
    margin-bottom: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 430px) {
    h2{
      font-size: 34px;
    }
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  cursor: pointer; // Indicates clickable

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #1E3A8A;
    font-size: 20px;
    font-weight: 600;
    margin: 15px 0 10px;
  }

  .arrow {
    color: #1E3A8A;
    font-size: 1.5em;
    margin-top: 10px;
  }
`;

const IconWrapper = styled.div`
  width: 120px; // Increased from 80px to make the image larger
  height: 120px; // Increased from 80px to match
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFF5E6; // Light orange to match card background (or adjust to #c2e0ff for consistency)
  border-radius: 50%;
  overflow: hidden;
`;

const ProductsSection = () => {
  const router = useRouter();

  // Updated products array with image paths from public/images
  const products = [
    { title: 'Personal Loan', icon: '/images/personal-loan.png', path: '/PersonalLoan' },
    { title: 'Short Term Loan', icon: '/images/short-term-loan.png', path: '/ShortTermLoan' },
    { title: 'Empowerment Loan', icon: '/images/empowerment-loan.png', path: '/EmpowermentLoan' },
    { title: 'MSME Loan', icon: '/images/msme-loan.png', path: '/MSMELoan' },
    // Add 'Credit Assist' if needed, e.g., { title: 'Credit Assist', icon: '/images/credit-assist.png', path: '/credit-assist' }
  ];

  const handleCardClick = (path) => {
    router.push(path);
  };

  return (
    <ProductsWrapper>
      <h2>Our Products</h2>
      <p>Introducing our suite of innovative loan products and features, tailored to meet the unique needs of salaried, self-employed, and women customers - simplifying finance for everyone.</p>
      <ProductsGrid>
        {products.map((product, index) => (
          <ProductCard key={index} onClick={() => handleCardClick(product.path)}>
            <IconWrapper>
              <Image 
                src={product.icon} 
                alt={`${product.title} icon`} 
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </IconWrapper>
            <h3>{product.title}</h3>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsWrapper>
  );
};

export default ProductsSection;