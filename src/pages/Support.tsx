import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import { FiDownload, FiHeadphones, FiPhone, FiTool, FiChevronRight, FiSearch, FiMonitor, FiSettings, FiShield, FiWifi, FiBatteryCharging, FiCheckCircle, FiAlertTriangle, FiBookOpen, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import LayerSvg from '../assets/Layer_1.svg';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons/lib';

const floatUpDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
  100% { transform: translateY(0); }
`;

const PageBg = styled.div`
  background: #fff;
  min-height: 100vh;
  position: relative;
`;

const HeaderSection = styled.header`
  background: #FFFFFF;
  color: #fff;
  padding:100px 0 40px 0;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  color: #333333;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 12px;

`;

const HeaderSubtitle = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 32px;
  color: #2D2D2D;
`;

const SearchBarWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 480px;
  border: 1px solid #e3e7ee;
  border-radius: 8px;
  overflow: hidden;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 13px 40px 13px 16px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px 0 0 8px;
  font-size: 1.08rem;
  outline: none;
  &::placeholder {
    color: #2D2D2D;
  }
`;

const SearchInputButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: none;
  border: none;
  padding: 0 12px;
  cursor: pointer;
  color: #2D2D2D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  &:hover {
    color: #2563eb;
  }
`;

const Section = styled.section`
  padding: 44px 0 0 0;
  width: 100%;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 1.45rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: #111;
`;

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px #e3e7ee;
  padding: 0;
  min-width: 240px;
  max-width: 300px;
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 16px;
`;

const CardIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 10px;
  color: #000;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.div`
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #222;
`;

const CardDesc = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 12px;
`;

const CardLink = styled.a`
  color: #1B9DBA;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  cursor: pointer;
  margin-top: 10px;
  &:hover, &:focus {
    text-decoration: underline;
    outline: none;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px 12px 12px 12px;
  margin-bottom: 0;
  display: block;
`;

const CategoryGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const CategoryCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 16px #e3e7ee;
  padding: 28px 32px 24px 32px;
  min-width: 240px;
  max-width: 320px;
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1B9DBA;
  gap: 8px;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #222;
  font-size: 1rem;
  li {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const CategoryItemLink = styled(Link)`
  color: #222;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;
  &:hover, &:focus {
    color: #2563eb;
    text-decoration: underline;
    outline: none;
  }
`;

const FindProductSection = styled.section`
  background: #fff;
  padding: 44px 0 0 0;
  text-align: center;
`;

const FindProductTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: #111;
`;

const FindProductDesc = styled.p`
  color: #555;
  font-size: 1rem;
  margin-bottom: 18px;
`;

const FindProductForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px #e3e7ee;
  padding: 32px 24px 24px 24px;
  max-width: 420px;
  margin: 0 auto 10px auto;
`;

const FindProductInput = styled.input`
  padding: 12px 14px;
  border: 1.5px solid #e3e7ee;
  border-radius: 7px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 8px;
`;

const FindProductButton = styled.button`
  background: #2D2D2D;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  margin-bottom: 6px;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #000;
    outline: none;
  }
`;

const FindProductHelp = styled.div`
  color: #2563eb;
  font-size: 0.98rem;
  margin-bottom: 8px;
`;

const ArticlesSection = styled.section`
  width: 100%;
  padding: 44px 0 0 0;
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto 32px auto;
  max-width: 1200px;
`;

const ArticleCard = styled.article`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px #e3e7ee;
  padding: 0 0 18px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  overflow: hidden;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const ArticleTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 700;
  color: #222;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 10px 0; 
  padding: 0 16px;
`;

const ArticleDesc = styled.div`
  color: #555;
  font-size: 0.98rem;
  padding: 0 16px;
  align-items: left;
`;

const ArticleLink = styled.a`
  color: #1B9DBA;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  margin: 30px 0 10px 16px;
  cursor: pointer;
  &:hover, &:focus {
    text-decoration: underline;
    outline: none;
  }
`;

const ToolsGrid = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const ToolCard = styled.div`
  background: #eaf2ff;
  border-radius: 20px;
  box-shadow: 0 2px 16px #e3e7ee;
  padding: 32px 32px 32px 32px;
  min-width: 320px;
  max-width: 400px;
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const ToolCardGreen = styled(ToolCard)`
  background: #e6f9ed;
`;

const ToolTitle = styled.div`
  font-size: 1.13rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToolDesc = styled.div`
  color: #222;
  font-size: 1rem;
  margin-bottom: 24px;
`;

const ToolButton = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #1746b0;
    outline: none;
  }
`;

const KnowledgeBaseSection = styled.section`
  background: #fff;
  padding: 44px 0 0 0;
`;

const KnowledgeBaseTitle = styled.h3`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: #111;
`;

const KnowledgeBaseGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const KBCol = styled.div`
  min-width: 260px;
  max-width: 340px;
  flex: 1 1 260px;
`;

const KBList = styled.div`
  background: #f6f9fc;
  border-radius: 12px;
  box-shadow: 0 1px 4px #e3e7ee;
  padding: 18px 18px 8px 18px;
  margin-bottom: 18px;
`;

const KBItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #222;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 0;
  text-decoration: none;
  border-bottom: 1px solid #e3e7ee;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover, &:focus {
    color: #2563eb;
    outline: none;
  }
`;

const KBDesc = styled.span`
  color: #888;
  font-size: 0.97rem;
  font-weight: 400;
`;

const HelpFooter = styled.footer`
  background: #fff;
  color: #fff;
  padding: 44px 0 44px 0;
  text-align: center;
  margin-top: 44px;
`;

const HelpFooterTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: #2D2D2D;
`;

const HelpFooterDesc = styled.p`
  font-size: 1.08rem;
  font-weight: 500;
  margin-bottom: 22px;
  color: #2D2D2D;
`;

const HelpFooterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
`;

const HelpFooterButton = styled.button`
  background: #fff;
  color: #2563eb;
  border: none;
  border-radius: 7px;
  padding: 12px 28px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover, &:focus {
    background: #e3e7ee;
    color: #1746b0;
    outline: none;
  }
`;

const LayerSvgImg = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 120px;
  max-width: 40vw;
  z-index: 1;
  pointer-events: none;
  margin-bottom: 80px;
  margin-right: 50px;
  animation: ${floatUpDown} 3.5s ease-in-out infinite;
  @media (max-width: 700px) {
    width: 180px;
    margin-bottom: 70px;
  }
`;

const LayerShadow = styled.div`
  position: fixed;
  right: 80px;
  bottom: 50px;
  width: 64px;
  height: 20px;
  background: radial-gradient(ellipse at center, rgba(37,99,235,0.18) 60%, transparent 100%);
  z-index: 0;
  pointer-events: none;
  filter: blur(2.5px);
  opacity: 0.85;
  animation: ${floatUpDown} 3.5s ease-in-out infinite;
`;

const ChatButton = styled.button`
  position: fixed;
  right: 39px;
  bottom: 3px;
  z-index: 10;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 62px;
  height: 62px;
  box-shadow: 0 4px 24px #2563eb44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  animation: ${floatUpDown} 3.5s ease-in-out infinite;
  &:hover, &:focus {
    background: #1746b0;
    box-shadow: 0 8px 32px #2563eb66;
    outline: none;
  }
  @media (max-width: 700px) {
    right: 16px;
    bottom: 16px;
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }
`;

const ResourceSection = styled.section`
  width: 100%;
  padding: 32px 0 0 0;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto 32px auto;
  max-width: 1200px;
`;

const ResourceCard = styled.a`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #e3e7ee;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  color: #222;
  font-size: 1.08rem;
  font-weight: 600;
  transition: box-shadow 0.2s, color 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover, &:focus {
    color: #2563eb;
    box-shadow: 0 6px 24px #2563eb22;
    outline: none;
    transform: translateY(-2px) scale(1.02);
  }
`;

const ResourceTitle = styled.div`
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1B9DBA;
`;

const ResourceDesc = styled.div`
  font-size: 0.98rem;
  color: #555;
`;

const resourceLinks = [
  {
    title: 'Troubleshooting',
    desc: 'Guides and solutions for common issues',
    href: '#',
  },
  {
    title: 'Drivers & Downloads',
    desc: 'Get the latest drivers and software',
    href: '#',
  },
  {
    title: 'Warranty Services',
    desc: 'Check and manage your warranty',
    href: '#',
  },
  {
    title: 'User Manuals',
    desc: 'Find and download user manuals',
    href: '#',
  },
  {
    title: 'Product Registration',
    desc: 'Register your Ention product',
    href: '#',
  },
  {
    title: 'Order Parts',
    desc: 'Order replacement parts and accessories',
    href: '#',
  },
  {
    title: 'FAQs',
    desc: 'Frequently asked questions',
    href: '#',
  },
  {
    title: 'Community Forums',
    desc: 'Join the Ention community',
    href: '#',
  },
  {
    title: 'Contact Support',
    desc: 'Get in touch with our support team',
    href: '#',
  },
];

// Create a wrapper component for icons
const IconWrapper: React.FC<{ icon: IconType; size?: number }> = ({ icon: Icon, size = 24 }) => {
  return <Icon size={size} />;
};

// Define proper types for our data structures
interface Article {
  title: string;
  desc: string;
  views: string;
  icon: IconType;
  img: string;
  link: string;
}

interface Category {
  key: string;
  icon: IconType;
  title: string;
  items: string[];
}

// Update the articleData with proper typing
const articleData: Article[] = [
  {
    title: 'How to Optimize Battery Life',
    desc: "Learn tips to extend your laptop's battery performance",
    views: '15,234 views',
    icon: FiBatteryCharging,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'WiFi Connection Issues',
    desc: 'Troubleshoot wireless connectivity problems',
    views: '12,891 views',
    icon: FiWifi,
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Installing Latest Drivers',
    desc: 'Step-by-step guide to update your drivers',
    views: '18,567 views',
    icon: FiDownload,
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Laptop Overheating Solutions',
    desc: 'Fix overheating issues and improve cooling',
    views: '9,432 views',
    icon: FiAlertTriangle,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Keyboard Not Working Fix',
    desc: 'Resolve keyboard and key responsiveness issues',
    views: '11,765 views',
    icon: FiTool,
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
  {
    title: 'Screen Flickering Solutions',
    desc: 'Fix display issues and screen problems',
    views: '7,891 views',
    icon: FiMonitor,
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    link: '#',
  },
];

// Update the categoryData with proper typing
const categoryData: Category[] = [
  {
    key: 'hardware',
    icon: FiMonitor,
    title: 'Hardware Support',
    items: [
      'Battery Issues',
      'Display Problems',
      'Keyboard & Touchpad',
      'Audio Issues',
      'Overheating',
    ],
  },
  {
    key: 'software',
    icon: FiSettings,
    title: 'Software Support',
    items: [
      'Driver Updates',
      'BIOS Updates',
      'Windows Issues',
      'Performance Optimization',
      'Security Updates',
    ],
  },
  {
    key: 'warranty',
    icon: FiShield,
    title: 'Warranty & Service',
    items: [
      'Check Warranty Status',
      'Extended Warranty',
      'Repair Services',
      'Parts Replacement',
      'Service Centers',
    ],
  },
];

const Support: React.FC = () => {
  return (
    <>
    <Navbar light />
    <PageBg>
      <HeaderSection>
        <HeaderTitle>Ention Support</HeaderTitle>
        <HeaderSubtitle>Get help with your Ention laptop. Find drivers, manuals, troubleshooting guides and more.</HeaderSubtitle>
        <SearchBarWrapper role="search">
          <SearchInputWrapper>
            <SearchInput placeholder="Search for support articles, drivers, or product guides..." aria-label="Search" />
            <SearchInputButton type="submit" aria-label="Search">
              <IconWrapper icon={FiSearch} size={20} />
            </SearchInputButton>
          </SearchInputWrapper>
        </SearchBarWrapper>
      </HeaderSection>

      <Section>
        <SectionTitle>Quick Support Options</SectionTitle>
        <CardGrid>
          <Card>
            <CardContent>
              <CardImage src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Drivers & Downloads" />
              <CardIcon>
                <IconWrapper icon={FiDownload} />
              </CardIcon>
              <CardTitle>Drivers & Downloads</CardTitle>
              <CardDesc>Get the latest drivers and software</CardDesc>
              <div style={{flex: 1}} />
              <CardLink href="#">Download Now</CardLink>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardImage src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Live Chat" />
              <CardIcon>
                <IconWrapper icon={FiHeadphones} />
              </CardIcon>
              <CardTitle>Live Chat</CardTitle>
              <CardDesc>Chat with our support team</CardDesc>
              <div style={{flex: 1}} />
              <CardLink href="#">Start Chat</CardLink>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardImage src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" alt="Phone Support" />
              <CardIcon>
                <IconWrapper icon={FiPhone} />
              </CardIcon>
              <CardTitle>Phone Support</CardTitle>
              <CardDesc>Call our technical support</CardDesc>
              <div style={{flex: 1}} />
              <CardLink href="#">Get Number</CardLink>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Service Request" />
              <CardIcon>
                <IconWrapper icon={FiTool} />
              </CardIcon>
              <CardTitle>Service Request</CardTitle>
              <CardDesc>Book a repair or maintenance service for your device</CardDesc>
              <div style={{flex: 1}} />
              <CardLink href="#">Book Service</CardLink>
            </CardContent>
          </Card>
        </CardGrid>
      </Section>

      <ResourceSection>
        <SectionTitle>Support Downloads & Resources</SectionTitle>
        <ResourceGrid>
          {resourceLinks.map(link => (
            <ResourceCard href={link.href} key={link.title} tabIndex={0} aria-label={link.title}>
              <ResourceTitle>{link.title}</ResourceTitle>
              <ResourceDesc>{link.desc}</ResourceDesc>
            </ResourceCard>
          ))}
        </ResourceGrid>
      </ResourceSection>

      <Section>
        <SectionTitle>Browse Support by Category</SectionTitle>
        <CategoryGrid>
          {categoryData.map((cat) => (
            <CategoryCard key={cat.key}>
              <CategoryTitle>
                <IconWrapper icon={cat.icon} /> {cat.title}
              </CategoryTitle>
              <CategoryList>
                {cat.items.map((item, index) => (
                  <li key={index}>
                    <CategoryItemLink to={`/support/${cat.key}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item}
                    </CategoryItemLink>
                  </li>
                ))}
              </CategoryList>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Section>

      <FindProductSection>
        <FindProductTitle>Find Your Product</FindProductTitle>
        <FindProductDesc>Enter your service tag or product model to get personalized support</FindProductDesc>
        <FindProductForm action="#">
          <FindProductInput placeholder="e.g., ENTION-XPS-13-2024" aria-label="Service Tag or Product Model" />
          <FindProductButton type="submit">Find My Product</FindProductButton>
        </FindProductForm>
        <FindProductHelp>Don't know your service tag? <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Learn how to find it</a></FindProductHelp>
      </FindProductSection>

      <ArticlesSection>
        <SectionTitle>Popular Support Articles</SectionTitle>
        <ArticlesGrid>
          {articleData.map((a, i) => (
            <ArticleCard key={i}>
              <ArticleImage src={a.img} alt={a.title} />
              <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ArticleTitle>
                  <IconWrapper icon={a.icon} /> {a.title}
                </ArticleTitle>
                <ArticleDesc>{a.desc}</ArticleDesc>
                <div style={{ flex: 1 }} />
                <ArticleLink href={a.link}>Read More</ArticleLink>
              </div>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </ArticlesSection>

      <Section>
        <SectionTitle>Service Tools & Features</SectionTitle>
        <ToolsGrid>
          <ToolCard>
            <ToolTitle>
              <IconWrapper icon={FiBookOpen} /> Track Service Status
            </ToolTitle>
            <ToolDesc>Monitor your repair progress in real-time and get updates on your service request.</ToolDesc>
            <ToolButton onClick={() => window.open('#', '_blank')}>Track Your Service</ToolButton>
          </ToolCard>
          <ToolCardGreen>
            <ToolTitle>
              <IconWrapper icon={FiCheckCircle} /> Auto Troubleshoot
            </ToolTitle>
            <ToolDesc>Run automated diagnostics to identify and fix common issues instantly.</ToolDesc>
            <ToolButton style={{ background: '#22c55e' }} onClick={() => window.open('#', '_blank')}>Run Diagnostics</ToolButton>
          </ToolCardGreen>
        </ToolsGrid>
      </Section>

      <KnowledgeBaseSection>
        <KnowledgeBaseTitle>Knowledge Base Articles</KnowledgeBaseTitle>
        <KnowledgeBaseGrid>
          <KBCol>
            <KBList>
              <KBItem href="#">First Time Setup Guide <IconWrapper icon={FiChevronRight} /></KBItem>
              <KBDesc>Complete setup instructions for new Ention laptops</KBDesc>
              <KBItem href="#">System Recovery Options <IconWrapper icon={FiChevronRight} /></KBItem>
              <KBDesc>How to restore your system to factory settings</KBDesc>
              <KBItem href="#">BIOS Settings Guide <IconWrapper icon={FiChevronRight} /></KBItem>
              <KBDesc>Navigate and configure BIOS settings</KBDesc>
            </KBList>
          </KBCol>
          <KBCol>
            <KBList>
              <KBItem href="#">Boot Issues Resolution <IconWrapper icon={FiChevronRight} /></KBItem>
              <KBDesc>Fix startup and boot-related problems</KBDesc>
              <KBItem href="#">Performance Optimization <IconWrapper icon={FiChevronRight} /></KBItem>
              <KBDesc>Speed up your laptop and improve performance</KBDesc>
              <KBItem href="#">Audio & Video Issues <IconWrapper icon={FiChevronRight} /></KBItem>
              <KBDesc>Resolve multimedia and device problems</KBDesc>
            </KBList>
          </KBCol>
        </KnowledgeBaseGrid>
      </KnowledgeBaseSection>

      <HelpFooter>
        <HelpFooterTitle>Still Need Help?</HelpFooterTitle>
        <HelpFooterDesc>Our support team is here to assist you 24/7</HelpFooterDesc>
        <HelpFooterButtons>
          <HelpFooterButton onClick={() => window.open('#', '_blank')}>Contact Support</HelpFooterButton>
          <HelpFooterButton style={{ background: '#2563eb', color: '#fff' }} onClick={() => window.open('#', '_blank')}>Schedule Callback</HelpFooterButton>
        </HelpFooterButtons>
      </HelpFooter>

      {/* Layer SVG and shadow at bottom right */}
      <LayerShadow />
      <LayerSvgImg src={LayerSvg} alt="Layer" />
      {/* Floating Chat Button */}
      <ChatButton aria-label="Chat with support" onClick={() => window.open('#', '_blank')}>
        <IconWrapper icon={FiMessageCircle} />
      </ChatButton>
    </PageBg>
    </>
  );
};

export default Support;