import React from "react";
import styled from "styled-components";

import heroImg from "../assets/hero.png";
import storyImg from "../assets/story.png";
import peopleImg from "../assets/people.png";
import goalsImg from "../assets/goals.png";

const PageBg = styled.div`
  background: #0A1A2F;
  min-height: 100vh;
`;

const HeroImageFlexCenter = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 592.25px;
`;

const HeroImage = styled.img`
  width: 1440px;
  height: 774px;
  display: block;
  object-fit: contain;
  background: linear-gradient(180deg, #0000000A 4%, #2E2E2E 100%);
`;

const GradientHeader = styled.div`
  background: linear-gradient(180deg, #0A1A2F 0%, #1EC6E6 100%);
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
  background: linear-gradient(180deg, #0FAFCA 0%, #070D2A 100%);
  padding: 80px 0;
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
  font-size: 21px;
  font-family: Inter;
  font-weight: 900;
  line-height: 157%;
  letter-spacing: 50%;
  text-align: center;
  color: #FFFFFF;
`;

const CardDesc = styled.p`
  color: #fff;
  font: Inter;
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 32px;
  text-align: center;
`;

const CardImageHolder = styled.div`
  width: 100%;
  height: 340px;
  background: #eaf6fa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const CardButton = styled.button`
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

const AboutUs: React.FC = () => (
  <PageBg>
    <GradientHeader>
      <Title>ABOUT ENTION</Title>
      <Description>
        We are ENTION, a pioneering force as a Computing Devices Manufacturer, marketer and Service Consultant, driven by technology to create India's foremost laptop and computer brand. Our commitment to excellence ensures that our products stand out for their unparalleled quality and affordability, proudly bearing the label <b>MADE IN INDIA</b>.
      </Description>
    </GradientHeader>
    <HeroImageFlexCenter>
      <HeroImage src={heroImg} alt="Nature" />
    </HeroImageFlexCenter>
    <CardsSection>
      <InfoGrid>
        <InfoCard>
          Our Story
          <CardDesc>
            Discover the ideas, products and awards that make up our rich history as a global technology leader.
          </CardDesc>
          <CardImageHolder>
            <CardImage src={storyImg} alt="Our Story" />
          </CardImageHolder>
          <CardButton>RECOGNITION</CardButton>
        </InfoCard>
        <InfoCard>
          Our People
          <CardDesc>
            Discover the ideas, products and awards that make up our rich history as a global technology leader.
          </CardDesc>
          <CardImageHolder>
            <CardImage src={peopleImg} alt="Our People" />
          </CardImageHolder>
          <CardButton>LEADERSHIP</CardButton>
        </InfoCard>
        <InfoCard>
          Our Goals
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