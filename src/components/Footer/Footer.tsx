import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterWrapper = styled.footer`
  background: #000000;
  color: #fff;
  padding: 60px 20px 30px;
  margin-top: 60px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }
`;

const FooterSection = styled(motion.div)`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #dbbc07;
    font-weight: 600;
  }
  
  p {
    font-size: 0.9rem;
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 12px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 10px;
      
      a {
        color: #aaa;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
        
        &:hover {
          color: #dbbc07;
        }
      }
    }
  }
`;

const CompanySection = styled(FooterSection)`
  .logo {
    font-size: 1.8rem;
    font-weight: 800;
    color: #dbbc07;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    @media (max-width: 576px) {
      justify-content: center;
    }
  }
  
  .description {
    margin-bottom: 24px;
    max-width: 300px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #aaa;
    font-size: 0.9rem;
    
    .icon {
      color: #dbbc07;
      font-size: 1rem;
    }
    
    a {
      color: #aaa;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #dbbc07;
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(219, 188, 7, 0.1);
  border: 1px solid rgba(219, 188, 7, 0.3);
  color: #dbbc07;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
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
    border-color: #25d366;
  }
  
  &.facebook:hover {
    background: #1877f2;
    color: white;
    border-color: #1877f2;
  }
  
  &.instagram:hover {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
    border-color: #dc2743;
  }
  
  &.twitter:hover {
    background: #1da1f2;
    color: white;
    border-color: #1da1f2;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid rgba(219, 188, 7, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: 576px) {
    justify-content: center;
    text-align: center;
  }
  
  .copyright {
    color: #aaa;
    font-size: 0.85rem;
  }
  
  .links {
    display: flex;
    gap: 20px;
    
    a {
      color: #aaa;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.3s ease;
      
      &:hover {
        color: #dbbc07;
      }
    }
    
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 10px;
    }
  }
`;

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Book Service', path: '/booking' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Electrical Installation',
    'Electrical Repair',
    'Solar Installation',
    'Generator Setup',
    'Emergency Service'
  ];

  const products = [
    'Smartphones',
    'Laptops & Computers',
    'Home Appliances',
    'Smart Devices',
    'Electrical Supplies'
  ];

  return (
    <FooterWrapper>
      <FooterContainer>
        <CompanySection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="logo">
            ⚡ GreenLantern Electronics
          </div>
          <p className="description">
            Your trusted partner for quality electronics and professional electrical services. 
            We provide cutting-edge technology solutions and expert electrical work.
          </p>
          
          <ContactInfo>
            <div className="contact-item">
              <FiPhone className="icon" />
              <a href="tel:+2348109657708">08109657708</a>
            </div>
            <div className="contact-item">
              <FiMail className="icon" />
              <span>info@greenlanternelectronics.com</span>
            </div>
            <div className="contact-item">
              <FiMapPin className="icon" />
              <span>Lagos, Nigeria</span>
            </div>
          </ContactInfo>
          
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
        </CompanySection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Services</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Products</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <span>{product}</span>
              </li>
            ))}
          </ul>
        </FooterSection>
      </FooterContainer>
      
      <FooterBottom>
        <div className="copyright">
          © {new Date().getFullYear()} GreenLantern Electronics. All rights reserved.
        </div>
        <div className="links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Support</a>
        </div>
      </FooterBottom>
    </FooterWrapper>  
  );
};

export default Footer;
