import React from "react";
import styled from "styled-components";

import storyImg from "../assets/story.png";
import peopleImg from "../assets/people.png";
import goalsImg from "../assets/goals.png";
import heroImg from "../assets/hero.png";
import ellipseSvg from '../assets/Ellipse 4.svg';

const EllipseBg = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  width: 500px;
  height: auto;
  pointer-events: none;
`;

const PageBg = styled.div`
  background: #0FAFCA;
  min-height: 100vh;
  position: relative;
`;

const GradientHeader = styled.div`
  background: linear-gradient(
    180deg,
    #070D2A 0%,
    #133B5C 40%,
    #176B87 80%,
    rgba(15,175,202,0.5) 95%,
    rgba(15,175,202,0.0) 1000%
  );
  padding: 80px 0 48px 0;
  text-align: center;
`;

const Title = styled.h1`
  letter-spacing: 0.25em;
  font-size: 2.8rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 32px;
  margin-top: 240px;
`;

const Description = styled.p`
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.35rem;
  color: #fff;
  font-weight: 400;
  line-height: 1.4;
  b {
    color: #fff;
    font-weight: 700;
  }
`;

const CardsSection = styled.div`
  background: linear-gradient(180deg, #0FAFCA 100%, #070D2A 0%);
  padding: 80px 0;
  margin-top: 20px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 48px;
  max-width: 1300px;
  margin: 0 auto;
  flex-wrap: nowrap;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 350px;
  background-color: transparent;
  font-size: 21px;
  font-family: Inter;
  font-weight: 900;
  line-height: 157%;
  text-align: center;
  color: #FFFFFF;
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 8px 32px rgba(15,175,202,0.25);
    transform: translateY(-6px) scale(1.02);
  }
`;

const InfoCardTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 18px;
  margin-top: 0;
`;

const CardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 400;
  margin-bottom: 32px;
  text-align: center;
`;

const CardImageHolder = styled.div`
  width: 100%;
  height: 400px;
  background: #eaf6fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const CardButton = styled.button`
font-family: 'Inter', sans-serif;
  width: 90%;
  background: #f6f6f6;
  color: #111;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  margin: 32px auto 0 auto;
  padding: 18px 0;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s;
  display: block;
  &:hover {
    background: #e0e0e0;
  }
`;

const HeroSection = styled.div`  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100vw;
  height: auto;
  display: block;
  object-fit: cover;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
`;

const AboutUs: React.FC = () => (
  <PageBg>
    <EllipseBg src={ellipseSvg} alt="Ellipse Decoration" />
    <GradientHeader>
      <Title>ABOUT ENTION</Title>
      <Description>
        We are ENTION, a pioneering force as a Computing Devices Manufacturer, marketer and Service Consultant, driven by technology to create India's foremost laptop and computer brand. Our commitment to excellence ensures that our products stand out for their unparalleled quality and affordability, proudly bearing the label <b>MADE IN INDIA</b>.
      </Description>
    </GradientHeader>
    <HeroSection>
      <HeroImage src={heroImg} alt="Nature" />
    </HeroSection>
    <CardsSection>
      <InfoGrid>
        <InfoCard>
          <InfoCardTitle>Our Story</InfoCardTitle>
          <CardDesc>Discover the ideas, products and awards that make up our rich history as a global technology leader.</CardDesc>
          <CardImageHolder>
            <CardImage src={storyImg} alt="Our Story" />
          </CardImageHolder>
          <CardButton>RECOGNITION</CardButton>
        </InfoCard>
        <InfoCard>
          <InfoCardTitle>Our People</InfoCardTitle>
          <CardDesc>
            Discover the ideas, products and awards that make up our rich history as a global technology leader.
          </CardDesc>
          <CardImageHolder>
            <CardImage src={peopleImg} alt="Our People" />
          </CardImageHolder>
          <CardButton>LEADERSHIP</CardButton>
        </InfoCard>
        <InfoCard>
          <InfoCardTitle>Our Goals</InfoCardTitle>
          <CardDesc>
            Discover the ideas, products and awards that make up our rich history as a global technology leader.
          </CardDesc>
          <CardImageHolder>
            <CardImage src={goalsImg} alt="Our Goals" />
          </CardImageHolder>
          <CardButton>ENTION FOUNDATION</CardButton>
        </InfoCard>
      </InfoGrid>
    </CardsSection>
  </PageBg>
);

export default AboutUs;
