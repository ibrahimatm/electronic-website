import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;
`;

const ImageContainer = styled.div`
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const BioContainer = styled.div`
  flex: 2 1 500px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const BioText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <ImageContainer>
        <ProfileImage src="/images/me.jpg" alt="Your Name" />
      </ImageContainer>
      <BioContainer>
        <Title>About Me</Title>
        <BioText>
          Hello! My name is <strong>Ibrahim Abdullahi</strong>, and I am the founder of{" "}
          <strong>Green Lantern Electronics</strong>. I am passionate about
          providing high-quality electrical and electronic solutions to homes,
          offices, and businesses. Withhands-on experience in electrical
          installations, solar energy systems, and modern smart devices, I am
          dedicated to bringing affordable, efficient, and sustainable technology
          to my community.  
          <br />
          <br />
          At Green Lantern Electronics, we focus on customer satisfaction, offering
          top-notch products and exceptional service. Thank you for trusting us!
        </BioText>
      </BioContainer>
    </AboutContainer>
  );
};

export default About;
