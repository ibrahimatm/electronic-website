import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
`;

// HERO SECTION
const Hero = styled.section`
  width: 100%;
  height: 70vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 10px;
`;

const CTAButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.2rem;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #e68900;
  }
`;

// PRODUCTS GRID
const ProductsSection = styled.section`
  margin: 50px 0;
  width: 90%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
    
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

// FEATURE SECTION
const FeatureSection = styled.section`
  width: 90%;
  max-width: 1200px;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;

const FeatureImage = styled.img`
  flex: 1 1 500px;
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const FeatureContent = styled.div`
  flex: 1 1 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  const products = [
    { name: "Wiring Materials", image: "/images/fittings.jpg" },
    { name: "Fittings", image: "/images/fittings.jpg" },
    { name: "Home Appliances", image: "/images/fittings.jpg" },
    { name: "Solar Energy", image: "/images/fittings.jpg" },
  ];

  const features = [
    {
      title: "High-Quality Products",
      description:
        "We only bring the best electrical appliances to ensure efficiency, durability and safety for consumer use.",
    },
    {
      title: "Electrians availability",
      description:
        "Our team offers professional services and qualitative advice to help you choose the right products for your needs.",
    },
    {
      title: "Affordable Prices",
      description:
        "We provide the best prices without compromising on quality or service.",
    },
  ];

  return (
    <HomeContainer>
      {/* HERO */}
      <Hero>
        <HeroTitle>⚡ Green Lantern Electronics</HeroTitle>
        <HeroSubtitle>Your Best Shop for Electronics</HeroSubtitle>
        <CTAButton>Shop Now</CTAButton>
      </Hero>

      {/* PRODUCTS */}
      <ProductsSection>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <ProductImage src={product.image} alt={product.name} />
            {product.name}
          </ProductCard>
        ))}
      </ProductsSection>

      {/* FEATURE SECTION */}
      <FeatureSection>
        <FeatureImage src="/images/fittings.jpg"
         alt="Electronics Showcase" />
        <FeatureContent>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureContent>
      </FeatureSection>
    </HomeContainer>
  );
};

export default Home;
