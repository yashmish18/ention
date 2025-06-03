import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/logo.png";
import Layer1 from '../assets/Layer_1.svg';

const PageBg = styled.div`
  background: #fff;
  min-height: 100vh;
  padding: 0;
`;

const HeaderRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  padding-left: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  background: transparent;
  z-index: 10;
`;

const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 60px;
  background: transparent;
  margin: 0;
  border-radius: 0;
`;

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 36px;
`;

const HeaderNavLink = styled(Link)<{ $active?: boolean }>`
  color: #fff;
  font-size: 1.08rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s, color 0.2s;
  ${({ $active }) => $active && `border-bottom: 2px solid #fff; font-weight: 600;`}
  &:hover {
    border-bottom: 2px solid #00BCD4;
    border-bottom-offset: 2px;
  }
`;

const MainSection = styled.div`
  display: flex;
  width: 100vw;
  min-height: 480px;
  margin: 0;
  padding: 0;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftCol = styled.div`
  flex: 1;
  background: #070D2A;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 100px 0 32px 0; /* Added padding-bottom: 32px */
  min-height: 480px;
  border-radius: 0;
  position: relative;
`;

const LeftLogo = styled.img`
  width: 80px;
  margin-bottom: 32px;
`;

const GetStartedBox = styled.div`
  background: transparent;
  border: 2px solid #fff;
  border-radius: 24px;
  padding: 40px 32px 32px 32px;
  width: 370px;
  margin-top: 16px;
  box-shadow: 0 2px 16px #0002;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GetStartedTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;

const GetStartedForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

const Label = styled.label`
  color: #fff;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  margin-bottom: 6px;
  margin-top: 16px;
  align-self: flex-start;
`;

const ErrorMsg = styled.div`
  color: #ff1744;
  font-size: 0.95rem;
  margin-top: 4px;
  margin-bottom: -8px;
  align-self: flex-start;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1.5px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7fafc;
  color: #010a23;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 100%;
  transition: border-color 0.3s;
  margin-bottom: 0;
  &:focus {
    outline: none;
    border-color: #00bcd4;
  }
`;

const Select = styled.select`
  padding: 14px 16px;
  border: 1.5px solid #cfd8dc;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7fafc;
  color: #010a23;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 100%;
  transition: border-color 0.3s;
  margin-bottom: 0;
  &:focus {
    outline: none;
    border-color: #00bcd4;
  }
`;

const RegisterNowBtn = styled.button`
  background: #00bcd4;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.08rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 28px;
  padding: 14px 0;
  width: 100%;
  transition: background 0.3s;
  &:hover {
    background: #176B87;
  }
`;

const RightCol = styled.div`
  flex: 1;
  background: #00BCD4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0 0 0;
  min-height: 480px;
  position: relative;
  border-radius: 0;
`;

const Illustration = styled.div`
  width: 260px;
  height: 180px;
  background: #fff;
  border-radius: 18px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px #0002;
  img {
    width: 80%;
    height: auto;
  }
`;

const StartupTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 8px;
  color: #fff;
`;

const StartupPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
`;

const StartupDesc = styled.p`
  color: #fff;
  font-size: 1.05rem;
  font-weight: 400;
  max-width: 340px;
  margin-bottom: 0;
`;

const Section = styled.div`
  display: flex;
  background: #fff;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: flex-start;
  margin: 48px auto 0 auto;
  max-width: 1200px;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
`;

const TopicsMenu = styled.div`
  background: #00BCD4;
  padding: 24px 0 0px 0;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopicsHeading = styled.div`
  font-weight: 700;
  color: #fff;
  font-size: 1.18rem;
  margin-bottom: 18px;
  text-align: center;
  letter-spacing: 0.01em;
`;

const TopicBtn = styled(Link)`
  color: #fff;
  border-radius: 0;
  font-size: 1.05rem;
  border-top: 2px solid #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  padding: 18px 0;
  margin: 0 0;
  text-align: center;
  text-decoration: none;
  width: 100%;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  &:hover {
    background: #F5F7FA;
    color: #333333;
    border: 2px solid #2C2D2D;
  }
`;

const CardsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CardGroup = styled.div`
  background: #f4f4f4;
  border-radius: 12px;
  padding: 32px 32px 32px 32px;
  margin-bottom: 18px;
`;

const CardGroupTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #888;
  margin-bottom: 18px;
`;

const CardRow = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 32px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const OptionCard = styled(Link)`
  background: #fff;
  color: #232b4a;
  border-radius: 3px;
  font-size: 1.08rem;
  font-weight: 600;
  padding: 32px 24px;
  text-align: center;
  text-decoration: none;
  min-width: 180px;
  min-height: 70px;
  box-shadow: 0 3px 24px rgb(137, 141, 141);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  transition: box-shadow 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    color: #2C2D2D;
    box-shadow: 0 5px 24px rgb(137, 141, 141);
    transform: scale(1.04);
  }
`;

const ChatBotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 64px;
  img {
    width: 90px;
    height: 200px;
    margin-bottom: 0;
  }
  button {
    background: #232b4a;
    color: #fff;
    border: none;
    border-radius: 18px;
    padding: 10px 22px;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 18px;
    cursor: pointer;
    box-shadow: 0 2px 8px #0001;
    outline: none;
  }
  button:hover {
    background: #00BCD4;
  }
`;

const BotShadow = styled.div`
  width: 70px;
  height: 16px;
  background: radial-gradient(ellipse at center, #2B3A7475 5%, transparent 100%);
  margin-top: 0px;
  margin-bottom: 18px;
  border-radius: 50%;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArticlesSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 8px;
  justify-content: flex-start;
  max-width: 1100px;
`;

const ArticleCard = styled(Link)`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 320px;
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 6px 24px #00bcd422;
    transform: translateY(-2px) scale(1.02);
  }
`;

const ArticleImg = styled.div`
  width: 220px;
  height: 190px;
  background: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0px;
  text-align: left;
  margin-top: 16px;
  width: 100%;
  color: #111;
  display: block;
`;

const ArticleDesc = styled.p`
  color: #333;
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  width: 100%;
`;

const ArticleLinksRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 32px 0 80px 0;
`;

const ArticleLinkWrapper = styled.div`
  width: 320px;
  padding-left: 24px;
`;

const ArticleLink = styled.a`
  font-size: 1.05rem;
  font-weight: 600;
  color: #232b4a;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  span {
    border-bottom: 2px solid #00bcd4;
    padding-bottom: 2px;
  }
  &:hover {
    font-weight: 700;
    color: #00bcd4;
  }
`;

const Support: React.FC = () => {
  const [form, setForm] = useState({ email: "", phone: "", name: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{email?: string, phone?: string, name?: string, city?: string}>({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: {email?: string, phone?: string, name?: string, city?: string} = {};
    if (!form.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.phone) errs.phone = "Phone number is required.";
    else if (!/^\+?\d{10,15}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = "Enter a valid phone number.";
    if (!form.name) errs.name = "Name is required.";
    if (!form.city) errs.city = "City is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    // Backend-ready: replace with real API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <>
      <PageBg>
        <HeaderRow>
          <HeaderLeft>
            <HeaderNav>
              <HeaderNavLink to="/" $active={location.pathname === "/"}>Home</HeaderNavLink>
              <HeaderNavLink to="/products" $active={location.pathname === "/products"}>Products</HeaderNavLink>
              <HeaderNavLink to="/contact" $active={location.pathname === "/contact"}>Contact Us</HeaderNavLink>
              <HeaderNavLink to="/demo" $active={location.pathname === "/demo"}>Request Demo</HeaderNavLink>
            </HeaderNav>
          </HeaderLeft>
        </HeaderRow>
        <MainSection>
          <LeftCol>
            <LeftLogo src={Logo} alt="ENTION Logo" />
            <GetStartedBox>
              <GetStartedTitle>Get Started<br /><span style={{ fontWeight: 400, fontSize: '0.98rem' }}>Welcome, please enter your details.</span></GetStartedTitle>
              <GetStartedForm onSubmit={handleSubmit} autoComplete="off">
                <Label htmlFor="email">Email Address</Label>
                <Input type="email" id="email" name="email" placeholder="amal.m@gmail.com" value={form.email} onChange={handleChange} />
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                <Label htmlFor="phone">Mobile Number</Label>
                <Input type="tel" id="phone" name="phone" placeholder="+91" value={form.phone} onChange={handleChange} />
                {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
                <Label htmlFor="city">Select City</Label>
                <Select id="city" name="city" value={form.city} onChange={handleChange}>
                  <option value="">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Other">Other</option>
                </Select>
                {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
                <RegisterNowBtn type="submit" disabled={loading}>{loading ? "Registering..." : "Register Now"}</RegisterNowBtn>
                {success && <div style={{ color: '#176B87', marginTop: 8 }}>Registration successful!</div>}
                {error && <div style={{ color: '#ff1744', marginTop: 8 }}>{error}</div>}
              </GetStartedForm>
            </GetStartedBox>
          </LeftCol>
          <RightCol>
            <Illustration>
              {/* Placeholder illustration */}
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Startup" />
            </Illustration>
            <StartupTitle>Startup Registration</StartupTitle>
            <StartupPrice>Starting for ₹ 2420</StartupPrice>
            <StartupDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</StartupDesc>
          </RightCol>
        </MainSection>
        <Section>
          <LeftColumn>
            <TopicsMenu>
              <TopicsHeading>Support Topics</TopicsHeading>
              <TopicBtn to="#">Get Started</TopicBtn>
              <TopicBtn to="#">Product Support</TopicBtn>
              <TopicBtn to="#">Warranty & Protection Plans</TopicBtn>
              <TopicBtn to="#">Recycling & Sustainability</TopicBtn>
              <TopicBtn to="#">User Guides & Manuals</TopicBtn>
              <TopicBtn to="#">Community Forums</TopicBtn>
              <TopicBtn to="#">Contact ENTION</TopicBtn>
            </TopicsMenu>
            <ChatBotContainer>
              <img src={Layer1} alt="Chat Bot" />
              <BotShadow />
              <button>Chat...</button>
            </ChatBotContainer>
          </LeftColumn>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardsSection>
              <CardGroup>
                <CardGroupTitle>Get Started</CardGroupTitle>
                <CardRow>
                  <OptionCard to="#">Unboxing & First-Time Setup</OptionCard>
                  <OptionCard to="#">Product Registration</OptionCard>
                  <OptionCard to="#">User Guides & Manuals</OptionCard>
                </CardRow>
              </CardGroup>
              <CardGroup>
                <CardGroupTitle>Product Support</CardGroupTitle>
                <CardRow>
                  <OptionCard to="#">Drivers & Downloads</OptionCard>
                  <OptionCard to="#">FAQs & Troubleshooting</OptionCard>
                </CardRow>
              </CardGroup>
            </CardsSection>
            <ArticlesSection>
              <ArticleCard to="/support/windows-11-faq">
                <ArticleImg>
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" alt="Windows 11" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                </ArticleImg>
                <ArticleTitle>Windows 11 FAQ</ArticleTitle>
                <ArticleDesc>Find Answers To Commonly Asked Windows 11 Questions.</ArticleDesc>
              </ArticleCard>
              <ArticleCard to="/support/e-waste">
                <ArticleImg>
                  <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="E-Waste" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                </ArticleImg>
                <ArticleTitle>E-Waste</ArticleTitle>
                <ArticleDesc>Find More Details On E-Waste Management</ArticleDesc>
              </ArticleCard>
              <ArticleCard to="/support/accessories">
                <ArticleImg>
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Accessories" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                </ArticleImg>
                <ArticleTitle>Purchase Accessories</ArticleTitle>
                <ArticleDesc>Did You Know That Acer Offers Accessories For Many Of Our Products? Visit Our Store Today And Get The Most Out Of Your Acer.</ArticleDesc>
              </ArticleCard>
            </ArticlesSection>
            <ArticleLinksRow>
              <ArticleLinkWrapper>
                <ArticleLink href="#"><span>Product Tips</span></ArticleLink>
              </ArticleLinkWrapper>
              <ArticleLinkWrapper>
                <ArticleLink href="#"><span>Check Repair Status</span></ArticleLink>
              </ArticleLinkWrapper>
              <ArticleLinkWrapper>
                <ArticleLink href="#"><span>Troubleshoot Your Device</span></ArticleLink>
              </ArticleLinkWrapper>
            </ArticleLinksRow>
          </div>
        </Section>
      </PageBg>
    </>
  );
};

export default Support;