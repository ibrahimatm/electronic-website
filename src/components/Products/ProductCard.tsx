import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar, FiCheck } from 'react-icons/fi';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #dbbc07;
  color: #000;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const Features = styled.div`
  margin-bottom: 12px;
`;

const Feature = styled.span`
  display: inline-block;
  background: #f0f0f0;
  color: #555;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-right: 6px;
  margin-bottom: 4px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
`;

const Stock = styled.span`
  font-size: 0.85rem;
  color: #27ae60;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const AddToCartButton = styled(motion.button)<{ added: boolean }>`
  flex: 1;
  padding: 12px 16px;
  background: ${props => props.added ? '#27ae60' : '#dbbc07'};
  color: ${props => props.added ? 'white' : '#000'};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.added ? '#229954' : '#c4a806'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 6px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
    color: #333;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  border: none;
  background: transparent;
  width: 40px;
  text-align: center;
  font-weight: 600;
  color: #333;
  
  &:focus {
    outline: none;
  }
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!product.inStock || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(product, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        size={14}
        fill={index < Math.floor(rating) ? '#ffc107' : 'transparent'}
        color="#ffc107"
      />
    ));
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
        {!product.inStock && <Badge>Out of Stock</Badge>}
      </ImageContainer>
      
      <Content>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        
        {product.features && product.features.length > 0 && (
          <Features>
            {product.features.slice(0, 3).map((feature, index) => (
              <Feature key={index}>{feature}</Feature>
            ))}
          </Features>
        )}
        
        <RatingContainer>
          {renderStars(product.rating)}
          <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: '4px' }}>
            ({product.rating})
          </span>
        </RatingContainer>
        
        <PriceContainer>
          <Price>${product.price.toFixed(2)}</Price>
          {product.inStock && (
            <Stock>
              <FiCheck size={14} />
              In Stock
            </Stock>
          )}
        </PriceContainer>
        
        <ButtonContainer>
          <QuantitySelector>
            <QuantityButton
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </QuantityButton>
            <QuantityInput
              type="number"
              value={quantity}
              onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
            />
            <QuantityButton
              onClick={() => updateQuantity(quantity + 1)}
              disabled={quantity >= 10}
            >
              +
            </QuantityButton>
          </QuantitySelector>
          
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            added={justAdded}
            whileTap={{ scale: 0.98 }}
          >
            {isAdding ? (
              'Adding...'
            ) : justAdded ? (
              <>
                <FiCheck size={16} />
                Added!
              </>
            ) : (
              <>
                <FiShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </AddToCartButton>
        </ButtonContainer>
      </Content>
    </Card>
  );
};

export default ProductCard;
