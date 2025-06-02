// src/components/Footer.tsx
import React from "react"
import styled from "styled-components"
import logo from "../assets/logo.png"

const FooterSection = styled.footer`
  background: #070D2A;
  color: #b0b8c1;
  padding: 48px 0 0 0;
  font-size: 1rem;
  border-top: 1px solid #16213a;
`

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  margin-right: 64px;
  @media (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 32px;
  }
`

const FooterLogo = styled.img`
  width: 100px;
  margin-bottom: 18px;
  margin-top: 18px;
`

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;
  svg {
    transition: stroke 0.2s, fill 0.2s;
  }
  &:hover svg {
    stroke: #0FAFCA !important;
    fill: #0FAFCA !important;
  }
`

const Socials = styled.div`
  margin: 100px 0 0 0;
  display: flex;
  gap: 10px;
  justify-content: center;
`

const FooterColumns = styled.div`
  display: flex;
  gap: 64px;
  flex: 1;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 32px;
    width: 100%;
    align-items: center;
  }
`

const FooterCol = styled.div`
  min-width: 150px;
`

const FooterTitle = styled.div`
  font-weight: bold;
  color: #fff;
  margin-bottom: 18px;
  font-size: 1.05rem;
`

const FooterLink = styled.a`
  display: block;
  color: #b0b8c1;
  margin-bottom: 10px;
  font-size: 1rem;
  opacity: 1;
  transition: color 0.2s;
  &:hover {
    color: #1ec6e6;
  }
`

const FooterBottom = styled.div`
  text-align: center;
  color: #7a8599;
  margin-top: 48px;
  padding-bottom: 24px;
  font-size: 0.95rem;
`

// SVG icons for X, GitHub, Slack, YouTube
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
);
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.47C19.13 20.58 22 16.76 22 12.26 22 6.58 17.52 2 12 2z"/></svg>
);
const SlackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5.1 15.9a2.1 2.1 0 11-2.1 2.1h2.1v-2.1zm1.05 0a2.1 2.1 0 114.2 0v5.25a2.1 2.1 0 11-4.2 0V15.9zm2.1-10.5a2.1 2.1 0 112.1-2.1v2.1h-2.1zm0 1.05a2.1 2.1 0 110 4.2H5.1a2.1 2.1 0 110-4.2h5.25zm10.5 2.1a2.1 2.1 0 112.1-2.1h-2.1v2.1zm-1.05 0a2.1 2.1 0 11-4.2 0V5.1a2.1 2.1 0 114.2 0v5.25zm-2.1 10.5a2.1 2.1 0 11-2.1 2.1v-2.1h2.1zm0-1.05a2.1 2.1 0 110-4.2h5.25a2.1 2.1 0 110 4.2H15.9z"/></svg>
);
const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M21.8 8.001a2.75 2.75 0 00-1.94-1.95C18.2 6 12 6 12 6s-6.2 0-7.86.05A2.75 2.75 0 002.2 8.001 28.6 28.6 0 002 12a28.6 28.6 0 00.2 3.999 2.75 2.75 0 001.94 1.95C5.8 18 12 18 12 18s6.2 0 7.86-.05a2.75 2.75 0 001.94-1.95A28.6 28.6 0 0022 12a28.6 28.6 0 00-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
);

const Footer: React.FC = () => (
  <FooterSection>
    <FooterContainer>
      <FooterLeft>
        <FooterLogo src={logo} alt="Ention Logo" />
        <Socials>
          <SocialIconLink href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"><XIcon /></SocialIconLink>
          <SocialIconLink href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></SocialIconLink>
          <SocialIconLink href="https://slack.com/" target="_blank" rel="noopener noreferrer" aria-label="Slack"><SlackIcon /></SocialIconLink>
          <SocialIconLink href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YouTubeIcon /></SocialIconLink>
        </Socials>
      </FooterLeft>
      <FooterColumns>
        <FooterCol>
          <FooterTitle>Product</FooterTitle>
          <FooterLink href="#">Features</FooterLink>
          <FooterLink href="#">Integrations</FooterLink>
          <FooterLink href="#">Pricing</FooterLink>
          <FooterLink href="#">Changelog</FooterLink>
          <FooterLink href="#">Docs</FooterLink>
          <FooterLink href="#">Linear Method</FooterLink>
          <FooterLink href="#">Download</FooterLink>
        </FooterCol>
        <FooterCol>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="#">About us</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Customers</FooterLink>
          <FooterLink href="#">Brand</FooterLink>
        </FooterCol>
        <FooterCol>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="#">Startup Program</FooterLink>
          <FooterLink href="#">Community</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">DPA</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of service</FooterLink>
          <FooterLink href="#">Report a vulnerability</FooterLink>
        </FooterCol>
        <FooterCol>
          <FooterTitle>Developers</FooterTitle>
          <FooterLink href="#">API</FooterLink>
          <FooterLink href="#">Status</FooterLink>
          <FooterLink href="#">GitHub</FooterLink>
          <FooterLink href="#">README</FooterLink>
        </FooterCol>
      </FooterColumns>
    </FooterContainer>
    <FooterBottom>
      
    </FooterBottom>
  </FooterSection>
)

export default Footer
