import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { 
  ZapIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  FileTextIcon, 
  CheckIcon 
} from '../../utils/iconUtils';

const BookingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: grid;
  gap: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled(motion.div)`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
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

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #dbbc07;
    box-shadow: 0 0 0 3px rgba(219, 188, 7, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
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

const ServiceOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

const ServiceOption = styled(motion.label)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid ${props => props.selected ? '#dbbc07' : '#e1e8ed'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'rgba(219, 188, 7, 0.05)' : 'white'};
  
  &:hover {
    border-color: #dbbc07;
  }
  
  input {
    display: none;
  }
  
  span {
    font-weight: ${props => props.selected ? '600' : '400'};
    color: ${props => props.selected ? '#dbbc07' : '#555'};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 16px 32px;
  background: #dbbc07;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
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
    font-size: 4rem;
    margin-bottom: 24px;
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: #27ae60;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 6px;
  border-left: 3px solid #e74c3c;
`;

const serviceTypes = [
  'Electrical Installation',
  'Electrical Repair',
  'Wiring & Rewiring',
  'Solar Panel Installation',
  'Generator Setup',
  'Circuit Breaker Issues',
  'Lighting Installation',
  'Emergency Electrical Service',
  'Other'
];

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || 
        !formData.serviceType || !formData.preferredDate || !formData.preferredTime || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([{
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          service_type: formData.serviceType,
          description: formData.description || null,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          address: formData.address,
          status: 'pending'
        }]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        serviceType: '',
        description: '',
        preferredDate: '',
        preferredTime: '',
        address: ''
      });
    } catch (error) {
      console.error('Booking submission failed:', error);
      setError('Failed to submit booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <BookingContainer>
        <SuccessMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="icon">
            <CheckIcon />
          </div>
          <h3>Booking Submitted Successfully!</h3>
          <p>
            Thank you for choosing our electrical services. We'll review your request 
            and contact you within 24 hours to confirm your appointment and discuss the details.
          </p>
          <motion.button
            onClick={() => setSubmitted(false)}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
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
            Book Another Service
          </motion.button>
        </SuccessMessage>
      </BookingContainer>
    );
  }

  return (
    <BookingContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          <ZapIcon size={32} style={{ color: '#dbbc07' }} />
          Book an Electrician
        </Title>
        <Subtitle>
          Professional electrical services at your doorstep. Fill out the form below 
          and we'll get back to you within 24 hours to schedule your appointment.
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
              <UserIcon size={16} />
              Full Name *
            </Label>
            <Input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>

          <FormGroup
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label>
              <MailIcon size={16} />
              Email Address *
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

        <FormRow>
          <FormGroup
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Label>
              <PhoneIcon size={16} />
              Phone Number *
            </Label>
            <Input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange('customerPhone', e.target.value)}
              placeholder="+234 8XX XXX XXXX"
              required
            />
          </FormGroup>

          <FormGroup
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label>
              <ZapIcon size={16} />
              Service Type *
            </Label>
            <Select
              value={formData.serviceType}
              onChange={(e) => handleInputChange('serviceType', e.target.value)}
              required
            >
              <option value="">Select a service</option>
              {serviceTypes.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Label>
              <CalendarIcon size={16} />
              Preferred Date *
            </Label>
            <Input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>

          <FormGroup
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Label>
              <ClockIcon size={16} />
              Preferred Time *
            </Label>
            <Select
              value={formData.preferredTime}
              onChange={(e) => handleInputChange('preferredTime', e.target.value)}
              required
            >
              <option value="">Select time</option>
              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Label>
            <MapPinIcon size={16} />
            Service Address *
          </Label>
          <TextArea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter the complete address where the service is needed"
            required
          />
        </FormGroup>

        <FormGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <Label>
            <FileTextIcon size={16} />
            Additional Details (Optional)
          </Label>
          <TextArea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Please describe your electrical issue or requirements in detail..."
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
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
        </SubmitButton>
      </Form>
    </BookingContainer>
  );
};

export default BookingForm;
