import React from 'react';
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
  background: ${props => props.light ? '#f6f7fb' : 'transparent'};
  height: 100px;
  display: flex;
  align-items: center;
  overflow: visible;
  border-bottom: ${props => props.light ? '2px solid #e3e7ee' : 'none'};
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
`;

const FlexSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const CenterSection = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  right: 32px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const LogoImg = styled.img<NavbarProps>`
  height: 80px;
  display: block;
  margin: 0;
  ${({ light }) =>
    light &&
    `
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.18));
    `}
`;

const NavLink = styled(Link)<NavbarProps>`
  color: ${props => props.light ? '#222' : '#fff'};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s, color 0.2s;
  &:hover {
    opacity: 1;
    color: #00bcd4;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 48px;
`;

const NavButton = styled(Link)<{ filled?: boolean; light?: boolean }>`
  display: inline-block;
  min-width: 70px;
  padding: 3px 18px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 20px;
  border: 1.5px solid;
  border-color: ${({ filled, light }) =>
    light
      ? filled
        ? '#00bcd4'
        : '#00bcd4'
      : filled
      ? '#fff'
      : '#fff'};
  background: ${({ filled, light }) =>
    light
      ? filled
        ? '#00bcd4'
        : '#fff'
      : filled
      ? '#fff'
      : 'transparent'};
  color: ${({ filled, light }) =>
    light
      ? filled
        ? '#fff'
        : '#00bcd4'
      : filled
      ? '#222'
      : '#fff'};
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  box-shadow: none;
  line-height: 1.7;
  text-align: center;
  &:hover {
    background: ${({ filled, light }) =>
      light
        ? filled
          ? '#0097a7'
          : '#e6fafd'
        : filled
        ? 'transparent'
        : '#fff'};
    color: ${({ filled, light }) =>
      light
        ? filled
          ? '#fff'
          : '#0097a7'
        : filled
        ? '#00bcd4'
        : '#222'};
    border-color: ${({ filled, light }) =>
      light
        ? filled
          ? '#0097a7'
          : '#0097a7'
        : filled
        ? '#00bcd4'
        : '#fff'};
  }
`;

const Navbar: React.FC<NavbarProps> = ({ light }) => (
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
    </NavContent>
  </NavbarContainer>
);

export default Navbar;