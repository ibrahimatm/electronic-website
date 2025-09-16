import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import FeedbackForm from '../../components/Feedback/FeedbackForm';

const ContactContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 60px;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfoSection = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 24px;
  font-weight: 700;
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
  
  .icon {
    width: 48px;
    height: 48px;
    background: #dbbc07;
    color: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    
    h3 {
      font-size: 1.1rem;
      color: #2c3e50;
      margin-bottom: 4px;
      font-weight: 600;
    }
    
    p {
      color: #666;
      font-size: 0.95rem;
      margin: 0;
    }
  }
`;

const SocialSection = styled.div`
  margin-top: 32px;
  
  h3 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 16px;
    font-weight: 600;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const SocialIcon = styled(motion.a)`
  width: 48px;
  height: 48px;
  background: #2c3e50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dbbc07;
    color: #000;
    transform: translateY(-2px);
  }
  
  &.whatsapp:hover {
    background: #25d366;
    color: white;
  }
  
  &.facebook:hover {
    background: #1877f2;
    color: white;
  }
  
  &.instagram:hover {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
  }
  
  &.twitter:hover {
    background: #1da1f2;
    color: white;
  }
`;

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: <FiPhone />,
      title: 'Call Us',
      info: '08109657708',
      description: 'Available 24/7 for emergency services'
    },
    {
      icon: <FiMail />,
      title: 'Email Us',
      info: 'info@greenlanternelectronics.com',
      description: 'We\'ll respond within 24 hours'
    },
    {
      icon: <FiMapPin />,
      title: 'Visit Us',
      info: 'Lagos, Nigeria',
      description: 'Professional electrical services'
    }
  ];

  return (
    <ContactContainer>
      <ContentWrapper>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Get In Touch</Title>
          <Subtitle>
            Have questions about our products or services? Need technical support? 
            We're here to help! Reach out to us through any of the channels below 
            or share your feedback.
          </Subtitle>
        </Header>

        <ContactGrid>
          <ContactInfoSection
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle>Contact Information</SectionTitle>
            {contactMethods.map((method, index) => (
              <ContactMethod
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="icon">
                  {method.icon}
                </div>
                <div className="content">
                  <h3>{method.title}</h3>
                  <p><strong>{method.info}</strong></p>
                  <p>{method.description}</p>
                </div>
              </ContactMethod>
            ))}
            
            <SocialSection>
              <h3>Follow Us</h3>
              <SocialIcons>
                <SocialIcon
                  href="https://wa.me/2348109657708"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp />
                </SocialIcon>
                <SocialIcon
                  href="https://instagram.com/greenlantern_enterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon
                  href="https://twitter.com/ik_gwarzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter />
                </SocialIcon>
                <SocialIcon
                  href="https://facebook.com/ibrahim.tijjani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebookF />
                </SocialIcon>
              </SocialIcons>
            </SocialSection>
          </ContactInfoSection>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FeedbackForm />
          </motion.div>
        </ContactGrid>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;
