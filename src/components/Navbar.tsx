import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LogoBlack from '../assets/logo_black.svg';

interface NavbarProps {
  light?: boolean;
}

const NavbarContainer = styled.nav<NavbarProps>`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${props => props.light ? ' #F0F0F0' : 'transparent'};
  box-shadow: ${props => props.light ? '0 4px 24px rgba(0,0,0,0.08)' : 'none'};
  height: 100px;
  display: flex;
  align-items: center;
  overflow: visible;
  border-bottom: ${props => props.light ? '2px solid, #e3e7ee' : 'none'};
  @media (max-width: 900px) {
    height: 70px;
    min-height: 70px;
    flex-direction: row;
    padding: 0;
    justify-content: space-between;
  }
`;

const NavContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  position: relative;
  z-index: 1;
  @media (max-width: 900px) {
    padding: 0 16px;
    justify-content: space-between;
  }
`;

const FlexSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

const CenterSection = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    margin: 0;
    z-index: 1001;
  }
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  right: 32px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
`;

const LogoImg = styled.img<NavbarProps>`
  height: 80px;
  display: block;
  margin: 0;
  margin-right: 40px;
  margin-left: 40px;
  transition: transform 0.3s ease-in-out;
  ${({ light } ) =>
    light &&
    `
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.18));
    `}
  &:hover {
    
    transform: scale(1.10);
  }
  @media (max-width: 900px) {
    height: 54px;
  }
`;

const NavLink = styled(Link)<NavbarProps>`
  color: ${props => props.light ? '#111' : '#fff'};
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s, color 0.2s;
 &:hover {
    opacity: 1;
    text-decoration: underline  #00bcd4 4px;
     text-decoration: underline ${props => props.light ? '#111' : '#00bcd4'} 4px;
    text-underline-offset: 7px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 48px;
  @media (max-width: 900px) {
    gap: 18px;
    margin: 0;
    flex-direction: column;
    align-items: center;
  }
`;

const NavButton = styled(Link)<{ filled?: boolean; light?: boolean }>`
  display: inline-block;
  min-width: 90px;
  padding: 3px 18px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 20px;
  border: 1.5px solid;
  margin-right: 10px;
  border-color: ${({ filled, light }) =>
    light
      ? filled
        ? '#333333'
        : '#333333'
      : filled
      ? '#fff'
      : '#fff'};
  background: ${({ filled, light }) =>
    light
      ? filled
        ? '#333333'
        : '#fff'
      : filled
      ? '#fff'
      : 'transparent'};
  color: ${({ filled, light }) =>
    light
      ? filled
        ? '#fff'
        : '#333333'
      : filled
      ? '#222'
      : '#fff'};
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s, transform 0.22s cubic-bezier(.4,1.2,.6,1);
  box-shadow: none;
  line-height: 1.7;
  text-align: center;
  &:hover {
    background: ${({ filled, light }) =>
      light
        ? filled
          ? '#000'
          : '#000'
        : filled
        ? 'transparent'
        : '#fff'};
    color: ${({ filled, light }) =>
      light
        ? filled
          ? '#fff'
          : '#fff'
        : filled
        ? '#fff'
        : '#333333'};
    border-color: ${({ filled, light }) =>
      light
        ? filled
          ? '#333333'
          : '#333333'
        : filled
        ? '#fff'
        : '#fff'};
    transform: scale(1.05);
  }
  @media (max-width: 900px) {
    min-width: 120px;
    font-size: 1.1rem;
    padding: 10px 0;
    width: 180px;
  }
`;

const Hamburger = styled.button`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    background: none;
    border: none;
    font-size: 2.2rem;
    color: #00bcd4;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    cursor: pointer;
    z-index: 1200;
  }
`;

const MobileMenuOverlay = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 20, 40, 0.98);
    z-index: 1100;
    animation: fadeIn 0.2s;
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2.2rem;
  cursor: pointer;
  z-index: 1201;
`;

const Navbar: React.FC<NavbarProps> = ({ light }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <NavbarContainer light={light}>
      <NavContent>
        <FlexSection style={{ justifyContent: 'flex-end' }}>
          <NavLinks>
            <NavLink to="/" light={light}>Home</NavLink>
            <NavLink to="/products" light={light}>Products</NavLink>
            <NavLink to="/services" light={light}>Services</NavLink>
          </NavLinks>
        </FlexSection>
        <CenterSection>
          <Link to="/">
            <LogoImg src={light ? LogoBlack : Logo} alt="Logo" />
          </Link>
        </CenterSection>
        <FlexSection style={{ justifyContent: 'flex-start' }}>
          <NavLinks>
            <NavLink to="/about" light={light}>About Us</NavLink>
            <NavLink to="/support" light={light}>Support</NavLink>
            <NavLink to="/shop" light={light}>Shop</NavLink>
          </NavLinks>
        </FlexSection>
        <ButtonsWrapper>
          <NavButtons>
            <NavButton to="/login" light={light}>Login</NavButton>
            <NavButton to="/register" filled light={light}>Register</NavButton>
          </NavButtons>
        </ButtonsWrapper>
        <Hamburger onClick={() => setMenuOpen(true)} aria-label="Open menu">
          &#9776;
        </Hamburger>
      </NavContent>
      {menuOpen && (
        <MobileMenuOverlay>
          <CloseButton onClick={() => setMenuOpen(false)} aria-label="Close menu">&times;</CloseButton>
          <LogoImg src={light ? LogoBlack : Logo} alt="Logo" style={{ marginBottom: 24 }} />
          <NavLinks>
            <NavLink to="/" light={light} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" light={light} onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/services" light={light} onClick={() => setMenuOpen(false)}>Services</NavLink>
            <NavLink to="/about" light={light} onClick={() => setMenuOpen(false)}>About Us</NavLink>
            <NavLink to="/support" light={light} onClick={() => setMenuOpen(false)}>Support</NavLink>
            <NavLink to="/shop" light={light} onClick={() => setMenuOpen(false)}>Shop</NavLink>
          </NavLinks>
          <NavButtons style={{ marginTop: 32 }}>
            <NavButton to="/login" light={light} onClick={() => setMenuOpen(false)}>Login</NavButton>
            <NavButton to="/register" filled light={light} onClick={() => setMenuOpen(false)}>Register</NavButton>
          </NavButtons>
        </MobileMenuOverlay>
      )}
    </NavbarContainer>
  );
};

export default Navbar;