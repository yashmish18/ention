import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import LogoBlack from "../assets/logo_black.svg";
import FrameSvg from "../assets/Frame.svg";
import LayerSvg from "../assets/Layer_1.svg";
import Navbar from "../components/Navbar";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageBg = styled.div`
  min-height: 130vh;
  width: 100vw;
  background: linear-gradient(180deg, #F5F7FA 0%, #333333 100%, #424242 0%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  font-family: 'Inter', 'Poppins', 'Montserrat', sans-serif;
  overflow: hidden;
`;

const SplitLayout = styled.div`
  display: flex;
  width: 900px;
  min-height: 600px;
  background: rgba(255,255,255,0.98);
  border-radius: 40px;
  box-shadow: 0 12px 40px #000;
  overflow: hidden;
  animation: ${slideIn} 0.7s cubic-bezier(.4,1.2,.6,1) 0s 1;
  margin-top: 190px;
  margin-bottom: 48px;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 98vw;
    min-height: unset;
    margin-top: 100px;
    margin-bottom: 24px;
  }
`;

const LeftPanel = styled.div`
  flex: 1.1;
  background: linear-gradient(135deg, #010a23 60%, #133B5C 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 48px 24px 48px 24px;
  z-index: 1;
  @media (max-width: 900px) {
    flex: unset;
    min-height: 220px;
    padding: 32px 12px 24px 12px;
  }
`;

const SvgBg = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.13;
  z-index: 0;
  pointer-events: none;
`;

const BrandLogo = styled.img`
  width: 70px;
  margin-bottom: 18px;
  filter: drop-shadow(0 0 18px #00bcd4cc);
  z-index: 2;
  transition: filter 0.3s;
  &:focus, &:hover {
    filter: drop-shadow(0 0 32px #00bcd4ff);
  }
`;

const Slogan = styled.h2`
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 0.08em;
  z-index: 2;
`;

const Benefits = styled.ul`
  font-size: 1.05rem;
  font-weight: 500;
  margin: 0;
  padding: 0 0 0 18px;
  z-index: 2;
  opacity: 0.92;
  li { margin-bottom: 8px; }
`;

const RightPanel = styled.div`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 48px 32px 32px 32px;
  z-index: 2;
  @media (max-width: 900px) {
    padding: 32px 12px 24px 12px;
  }
`;

const FormLogo = styled.img`
  width: 54px;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  filter: none;
`;

const Title = styled.h1`
  color: #010a23;
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.div`
  color: #333333;
  font-size: 1.08rem;
  font-weight: 600;
  margin-bottom: 28px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 320px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 14px 16px 14px 40px;
  border: 2px solid ${props => props.hasError ? '#ff1744' : '#cfd8dc'};
  border-radius: ${props => props.hasError ? '10px' : '10px'};
  font-size: 1rem;
  background: #f7fafc;
  color: #010a23;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: ${props => props.hasError ? ' #ff1744' : 'none'};
  &:focus {
    outline: none;
    border-color: #2C2D2D;
  }
`;

const EyeIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #333333;
  font-size: 1.3em;
  cursor: pointer;
  opacity: 0.7;
  display: flex;
  align-items: center;
  transition: color 0.2s, opacity 0.2s;
  &:hover {
    color: #2C2D2D;
    opacity: 1;
  }
`;

const ErrorMsg = styled.div`
  color: #ff1744;
  font-size: 0.90rem;
  margin-top: 8px;
  margin-bottom: -10px;
`;

const RegisterButton = styled.button`
  background: #fff;
  color: #000;
  border: 1px solid #2C2D2D;
  border-radius: 10px;
  font-size: 1.05rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15,175,202,0.12);
  margin-top: 8px;
  margin-bottom: 12px;
  padding: 12px 0;
  width: 100%;
  transition: background 0.3s, box-shadow 0.3s;
  &:hover {
    background:  #333333;
    color: #fff;
    box-shadow: 0 4px 16px #2C2D2D;
  }
`;

const LoginLink = styled(Link)`
  color:  #2C2D2D;
  text-decoration: none;
  text-align: center;
  margin-top: 24px;
  display: block;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
    color: #333333;
  }
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #00bcd4;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.7s linear infinite;
  margin: 0 auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GoogleBtn = styled.button`
  background: #fff;
  border: 1px solid #2C2D2D;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 1.05rem;
  color: #333333;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 8px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  &:hover {
    border-color: #333333;
    box-shadow: 0 2px 8px #2C2D2D;
    background:  #333333;
    color: #fff;
  }
`;

const GoogleIcon = styled.img`
  width: 22px;
  height: 22px;
  display: inline-block;
`;

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, password?: string, confirmPassword?: string}>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs: {name?: string, email?: string, password?: string, confirmPassword?: string} = {};
    if (!formData.name) errs.name = "Name is required.";
    if (!formData.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errs.email = "Enter a valid email.";
    if (!formData.password) errs.password = "Password is required.";
    else if (formData.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!formData.confirmPassword) errs.confirmPassword = "Confirm your password.";
    else if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1200);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      window.location.href = "/auth/google";
    }, 800);
  };

  return (
    <>
      <Navbar light />
      <PageBg>
        <SplitLayout>
          <LeftPanel>
            <SvgBg src={FrameSvg} alt="Tech Frame" />
            <BrandLogo src={Logo} alt="ENTION Logo" tabIndex={0} />
            <Slogan>Join ENTION</Slogan>
            <Benefits>
              <li>Access your dashboard and device settings</li>
              <li>Track your ENTION purchases</li>
              <li>Get premium support</li>
            </Benefits>
          </LeftPanel>
          <RightPanel>
            <SvgBg src={LayerSvg} alt="Tech Layer" style={{opacity:0.09, right:0, left:'unset', width:'110%', top:'unset', bottom:0}} />
            <FormLogo src={LogoBlack} alt="ENTION Logo" />
            <Title>Create Account</Title>
            <Subtitle>Register to manage your ENTION devices and purchases</Subtitle>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <InputWrapper>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  hasError={!!errors.name}
                  autoComplete="name"
                />
                {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  hasError={!!errors.email}
                  autoComplete="username"
                />
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
              </InputWrapper>
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  hasError={!!errors.password}
                  autoComplete="new-password"
                />
                <PasswordToggle type="button" tabIndex={0} onClick={() => setShowPassword(v => !v)} aria-label="Toggle password visibility">
                  {showPassword ? (
                    <EyeIcon viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </EyeIcon>
                  ) : (
                    <EyeIcon viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </EyeIcon>
                  )}
                </PasswordToggle>
                {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
              </InputWrapper>
              <InputWrapper>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  hasError={!!errors.confirmPassword}
                  autoComplete="new-password"
                />
                <PasswordToggle type="button" tabIndex={0} onClick={() => setShowConfirmPassword(v => !v)} aria-label="Toggle confirm password visibility">
                  {showConfirmPassword ? (
                    <EyeIcon viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </EyeIcon>
                  ) : (
                    <EyeIcon viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </EyeIcon>
                  )}
                </PasswordToggle>
                {errors.confirmPassword && <ErrorMsg>{errors.confirmPassword}</ErrorMsg>}
              </InputWrapper>
              <RegisterButton type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Register"}
              </RegisterButton>
              <GoogleBtn type="button" onClick={handleGoogle} disabled={loading || googleLoading}>
                {googleLoading ? <Spinner /> : <><GoogleIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
                Sign up with Google</>}
              </GoogleBtn>
            </Form>
            <LoginLink to="/login">
              Already have an account? Login here
            </LoginLink>
          </RightPanel>
        </SplitLayout>
      </PageBg>
    </>
  );
};

export default Register; 