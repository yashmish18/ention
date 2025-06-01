import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

const NavbarContainer = styled.nav`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  height: 64px;
  display: flex;
  align-items: center;
  overflow: visible;
`;

const NavContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
  position: relative;
  z-index: 1;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: 20px;
`;

const LogoImg = styled.img`
  height: 80px;
  display: block;
  margin-left: 40px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: 150px;
`;

const NavLink = styled.a`
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-left: 32px;
`;

const NavButton = styled.a<{ filled?: boolean }>`
  color: ${({ filled }) => (filled ? '#070D2A' : '#fff')};
  background: ${({ filled }) => (filled ? '#fff' : 'rgba(255,255,255,0.08)')};
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #070D2A;
  }
`;

const Navbar: React.FC = () => (
  <NavbarContainer>
    <NavContent>
      <NavLinks>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">Products</NavLink>
        <NavLink href="#">Services</NavLink>
      </NavLinks>
      <LogoImg src={Logo} alt="Logo" />
      <RightSection>
        <NavLinks>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Support</NavLink>
          <NavLink href="#">Shop</NavLink>
        </NavLinks>
        <NavButtons>
          <NavButton href="#">Login</NavButton>
          <NavButton href="#" filled>Register</NavButton>
        </NavButtons>
      </RightSection>
    </NavContent>
  </NavbarContainer>
);

export default Navbar;