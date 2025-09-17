import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../../components/Products/ProductCard';
import { products } from '../../data/products';

const ProductsContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #2c3e50;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;



const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  
  h3 {
    margin-bottom: 8px;
    color: #333;
  }
`;

const Products: React.FC = () => {
  if (!products || products.length === 0) {
    return (
      <ProductsContainer>
        <EmptyState>
          <h3>No products available</h3>
          <p>Please check back later for our latest products.</p>
        </EmptyState>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>⚡ Our Products</Title>
        <Subtitle>
          Discover our wide range of high-quality electronic products, 
          from smartphones to smart home devices. Each product is carefully selected 
          to provide you with the best technology at competitive prices.
        </Subtitle>
      </Header>
      
      <ProductsGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default Products;
