import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BookingForm from '../../components/Booking/BookingForm';

const BookingPageContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 900px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ServiceHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
  
  .icon {
    font-size: 2.5rem;
    color: #dbbc07;
    margin-bottom: 12px;
  }
  
  h3 {
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const Booking: React.FC = () => {
  const serviceHighlights = [
    {
      icon: '🔧',
      title: 'Expert Technicians',
      description: 'Certified and experienced electricians for all your electrical needs'
    },
    {
      icon: '⚡',
      title: '24/7 Emergency',
      description: 'Emergency electrical services available around the clock'
    },
    {
      icon: '💡',
      title: 'Quality Guarantee',
      description: 'All work backed by our satisfaction guarantee and warranty'
    },
    {
      icon: '📱',
      title: 'Easy Booking',
      description: 'Simple online booking system with flexible scheduling'
    }
  ];

  return (
    <BookingPageContainer>
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageHeader>
          <PageTitle>Professional Electrical Services</PageTitle>
          <PageDescription>
            Get reliable, professional electrical services from certified technicians. 
            Whether it's installation, repair, or emergency service, we've got you covered 
            with quality workmanship and competitive pricing.
          </PageDescription>
        </PageHeader>

        <ServiceHighlights>
          {serviceHighlights.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServiceHighlights>

        <BookingForm />
      </ContentWrapper>
    </BookingPageContainer>
  );
};

export default Booking;
