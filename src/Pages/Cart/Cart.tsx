import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  min-height: 60vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const CartItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  background: #f8f9fa;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 4px;
  font-weight: 600;
`;

const ItemPrice = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const ItemFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Feature = styled.span`
  background: #f0f0f0;
  color: #555;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #dbbc07;
  background: white;
  color: #dbbc07;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #dbbc07;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  color: #e74c3c;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #ffe6e6;
  }
`;

const ItemTotal = styled.div`
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-left: 16px;
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &.total {
    padding-top: 12px;
    border-top: 2px solid #f0f0f0;
    font-weight: 700;
    font-size: 1.2rem;
    color: #2c3e50;
  }
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: #dbbc07;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  
  &:hover {
    background: #c4a806;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
  
  .icon {
    font-size: 4rem;
    margin-bottom: 24px;
    opacity: 0.3;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 12px;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 24px;
  }
`;

const ShopButton = styled(motion.button)`
  padding: 12px 24px;
  background: #dbbc07;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #c4a806;
  }
`;

const CheckoutForm = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #dbbc07;
  }
`;

const Cart: React.FC = () => {
  const { state, updateQuantity, removeFromCart, checkout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setCheckoutError('Please fill in all required fields');
      return;
    }
    
    setIsCheckingOut(true);
    setCheckoutError('');
    
    try {
      const result = await checkout(customerInfo);
      
      if (result.success) {
        setCheckoutSuccess(true);
        setShowCheckoutForm(false);
        setCustomerInfo({ name: '', email: '', phone: '' });
      } else {
        setCheckoutError(result.error || 'Checkout failed. Please try again.');
      }
    } catch (error) {
      setCheckoutError('An error occurred during checkout.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (checkoutError) setCheckoutError('');
  };

  if (checkoutSuccess) {
    return (
      <CartContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '80px 20px' }}
        >
          <FiShoppingBag size={80} style={{ color: '#27ae60', marginBottom: '24px' }} />
          <h2 style={{ color: '#27ae60', marginBottom: '12px' }}>Order Placed Successfully!</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Thank you for your order. We'll process it and contact you soon.
          </p>
          <ShopButton 
            onClick={() => window.location.href = '/products'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </ShopButton>
        </motion.div>
      </CartContainer>
    );
  }

  if (state.items.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <div className="icon">
            <FiShoppingBag />
          </div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started</p>
          <ShopButton 
            onClick={() => window.location.href = '/products'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </ShopButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Header>
        <Title>🛒 Shopping Cart</Title>
        <Subtitle>Review your items and proceed to checkout</Subtitle>
      </Header>

      <CartContent>
        <CartItems>
          <AnimatePresence>
            {state.items.map((item) => (
              <CartItem
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price.toFixed(2)} each</ItemPrice>
                  <ItemFeatures>
                    {item.features?.slice(0, 2).map((feature, index) => (
                      <Feature key={index}>{feature}</Feature>
                    ))}
                  </ItemFeatures>
                </ItemInfo>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus size={14} />
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                  >
                    <FiPlus size={14} />
                  </QuantityButton>
                </QuantityControls>
                <ItemTotal>
                  ${(item.price * item.quantity).toFixed(2)}
                </ItemTotal>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 size={16} />
                </RemoveButton>
              </CartItem>
            ))}
          </AnimatePresence>
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal ({state.itemCount} items):</span>
            <span>${state.total.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping:</span>
            <span>Free</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax:</span>
            <span>$0.00</span>
          </SummaryRow>
          <SummaryRow className="total">
            <span>Total:</span>
            <span>${state.total.toFixed(2)}</span>
          </SummaryRow>

          {!showCheckoutForm ? (
            <CheckoutButton
              onClick={() => setShowCheckoutForm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiCreditCard size={20} />
              Proceed to Checkout
            </CheckoutButton>
          ) : (
            <CheckoutForm>
              <form onSubmit={handleCheckout}>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </FormGroup>
                
                {checkoutError && (
                  <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '16px' }}>
                    {checkoutError}
                  </div>
                )}
                
                <CheckoutButton
                  type="submit"
                  disabled={isCheckingOut}
                  whileHover={!isCheckingOut ? { scale: 1.02 } : {}}
                  whileTap={!isCheckingOut ? { scale: 0.98 } : {}}
                >
                  {isCheckingOut ? 'Processing...' : 'Place Order'}
                </CheckoutButton>
              </form>
            </CheckoutForm>
          )}
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
