import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiMessageSquare, FiStar, FiHeart } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';

const FeedbackContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled(motion.div)`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #dbbc07;
    box-shadow: 0 0 0 3px rgba(219, 188, 7, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #dbbc07;
    box-shadow: 0 0 0 3px rgba(219, 188, 7, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const RatingContainer = styled.div`
  text-align: center;
`;

const RatingLabel = styled(Label)`
  justify-content: center;
  margin-bottom: 12px;
  font-size: 1rem;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Star = styled(motion.button)<{ filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: ${props => props.filled ? '#ffc107' : '#ddd'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #ffc107;
  }
  
  &:focus {
    outline: none;
  }
`;

const RatingText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const SubmitButton = styled(motion.button)`
  padding: 14px 28px;
  background: #dbbc07;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c4a806;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
  color: #27ae60;
  
  .icon {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.6rem;
    margin-bottom: 12px;
    color: #27ae60;
  }
  
  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 6px;
  padding: 8px 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 6px;
  border-left: 3px solid #e74c3c;
`;

const ratingTexts = [
  '',
  'Poor - We need to improve',
  'Fair - Could be better',
  'Good - We\'re on the right track',
  'Very Good - Almost perfect!',
  'Excellent - We\'re thrilled!'
];

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    message: '',
    rating: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleStarClick = (rating: number) => {
    handleInputChange('rating', rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName || !formData.customerEmail || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.rating) {
      setError('Please provide a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('feedback')
        .insert([{
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          message: formData.message,
          rating: formData.rating
        }]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setFormData({
        customerName: '',
        customerEmail: '',
        message: '',
        rating: 0
      });
    } catch (error) {
      console.error('Feedback submission failed:', error);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <FeedbackContainer>
        <SuccessMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="icon">
            <FiHeart />
          </div>
          <h3>Thank You for Your Feedback!</h3>
          <p>
            Your feedback helps us improve our services and provide better experiences 
            for all our customers. We truly appreciate you taking the time to share your thoughts.
          </p>
          <motion.button
            onClick={() => setSubmitted(false)}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#dbbc07',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Another Feedback
          </motion.button>
        </SuccessMessage>
      </FeedbackContainer>
    );
  }

  return (
    <FeedbackContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          <FiMessageSquare size={28} style={{ color: '#dbbc07' }} />
          Share Your Feedback
        </Title>
        <Subtitle>
          We value your opinion! Tell us about your experience with our products and services.
        </Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Label>
              <FiUser size={14} />
              Your Name *
            </Label>
            <Input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Enter your name"
              required
            />
          </FormGroup>

          <FormGroup
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label>
              <FiMail size={14} />
              Your Email *
            </Label>
            <Input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => handleInputChange('customerEmail', e.target.value)}
              placeholder="your@email.com"
              required
            />
          </FormGroup>
        </FormRow>

        <FormGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <RatingContainer>
            <RatingLabel>
              <FiStar size={16} />
              How would you rate our service? *
            </RatingLabel>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  type="button"
                  filled={star <= (hoveredStar || formData.rating)}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiStar 
                    fill={star <= (hoveredStar || formData.rating) ? '#ffc107' : 'none'}
                  />
                </Star>
              ))}
            </StarContainer>
            {(hoveredStar || formData.rating) > 0 && (
              <RatingText>
                {ratingTexts[hoveredStar || formData.rating]}
              </RatingText>
            )}
          </RatingContainer>
        </FormGroup>

        <FormGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Label>
            <FiMessageSquare size={14} />
            Your Message *
          </Label>
          <TextArea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell us about your experience, suggestions for improvement, or any other feedback..."
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </SubmitButton>
      </Form>
    </FeedbackContainer>
  );
};

export default FeedbackForm;
