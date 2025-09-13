import Head from "next/head";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global styles for industrial theme
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: #0a0a0a;
    overflow-x: hidden;
  }
`;

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const growIn = keyframes`
  0% { 
    transform: scale(0.9);
    opacity: 0;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Container = styled.div`
  min-height: 100vh;
  font-family: var(--font-geist-sans);
  background: 
    linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(47, 79, 79, 0.9) 100%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(112, 128, 144, 0.03) 2px,
      rgba(112, 128, 144, 0.03) 4px
    );
  color: #f0f0f0;
  position: relative;
  
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(210, 105, 30, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(112, 128, 144, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const IndustrialGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(112, 128, 144, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(112, 128, 144, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 1;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 4rem 2rem 3rem;
  background: 
    linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(47, 79, 79, 0.7) 100%);
  border-bottom: 3px solid rgba(210, 105, 30, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem 1rem 2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      rgba(0, 255, 65, 0.0) 0%, 
      rgba(0, 255, 65, 0.6) 50%, 
      rgba(0, 255, 65, 0.0) 100%
    );
  }
`;

const GlobeIcon = styled.div`
  font-size: clamp(4rem, 10vw, 6rem);
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(0, 255, 65, 0.4));
  animation: ${pulse} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg, 
    #f0f0f0 0%, 
    #d2691e 30%, 
    #708090 70%, 
    #00ff41 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
`;

const Subtitle = styled.p`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 2rem;
  color: #d2691e;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    letter-spacing: 0.5px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff41, transparent);
    
    @media (max-width: 768px) {
      width: 80px;
      bottom: -8px;
    }
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 3vw, 1.2rem);
  line-height: 1.7;
  color: #c0c0c0;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 400;
  
  @media (max-width: 768px) {
    line-height: 1.6;
    padding: 0 0.5rem;
  }
`;

const Main = styled.main`
  position: relative;
  z-index: 10;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 800px;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: 
    linear-gradient(135deg, 
      rgba(47, 79, 79, 0.4) 0%, 
      rgba(10, 10, 10, 0.8) 100%
    );
  border: 2px solid rgba(112, 128, 144, 0.3);
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  transition: all 0.4s ease;
  animation: ${growIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 255, 65, 0.6);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(0, 255, 65, 0.2);
      
    @media (max-width: 768px) {
      transform: translateY(-4px);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      rgba(210, 105, 30, 0.8) 0%, 
      rgba(0, 255, 65, 0.6) 100%
    );
    border-radius: 8px 8px 0 0;
  }
  
  &:nth-child(even) {
    border-color: rgba(210, 105, 30, 0.4);
    
    &:hover {
      border-color: rgba(255, 215, 0, 0.7);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.4),
        0 0 20px rgba(255, 215, 0, 0.2);
    }
  }
`;

const CardIcon = styled.div`
  font-size: clamp(2.5rem, 6vw, 3rem);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.4));
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #f0f0f0;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid rgba(210, 105, 30, 0.5);
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
  }
`;

const CardDescription = styled.p`
  font-size: clamp(1rem, 3vw, 1.1rem);
  line-height: 1.6;
  color: #c0c0c0;
  margin-bottom: 1.5rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(112, 128, 144, 0.2);
    color: #d0d0d0;
    position: relative;
    padding-left: 1.5rem;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    
    @media (max-width: 768px) {
      padding: 0.6rem 0;
      padding-left: 1.2rem;
    }
    
    &:last-child {
      border-bottom: none;
    }
    
    &::before {
      content: '▶';
      position: absolute;
      left: 0;
      color: #00ff41;
      font-size: 0.8rem;
      
      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
    }
    
    strong {
      color: #d2691e;
      font-weight: 700;
    }
  }
`;

const CTASection = styled.section`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 4rem 2rem;
  background: 
    linear-gradient(135deg, 
      rgba(10, 10, 10, 0.9) 0%, 
      rgba(47, 79, 79, 0.6) 50%,
      rgba(10, 10, 10, 0.9) 100%
    );
  border-top: 3px solid rgba(0, 255, 65, 0.4);
  border-bottom: 3px solid rgba(210, 105, 30, 0.4);
  
  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 900;
  margin-bottom: 3rem;
  color: #f0f0f0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    letter-spacing: 1px;
  }
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 600px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }
`;

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: 
    linear-gradient(135deg, 
      rgba(112, 128, 144, 0.3) 0%, 
      rgba(47, 79, 79, 0.6) 100%
    );
  border: 2px solid rgba(210, 105, 30, 0.6);
  border-radius: 8px;
  color: #f0f0f0;
  text-decoration: none;
  font-weight: 700;
  font-size: clamp(1rem, 3vw, 1.1rem);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    gap: 0.8rem;
    letter-spacing: 0.5px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 255, 65, 0.2), 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    border-color: #00ff41;
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(0, 255, 65, 0.3);
    transform: translateY(-3px);
    
    @media (max-width: 768px) {
      transform: translateY(-2px);
    }
    
    &::before {
      left: 100%;
    }
  }
`;

const ContentSection = styled.section`
  position: relative;
  z-index: 10;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem 3rem;
  }
`;

const VisionCard = styled(Card)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  background: 
    linear-gradient(135deg, 
      rgba(10, 10, 10, 0.9) 0%, 
      rgba(47, 79, 79, 0.6) 50%,
      rgba(0, 255, 65, 0.1) 100%
    );
  border: 2px solid rgba(0, 255, 65, 0.4);
  
  &::before {
    background: linear-gradient(90deg, 
      rgba(0, 255, 65, 0.8) 0%, 
      rgba(255, 215, 0, 0.8) 50%,
      rgba(64, 224, 208, 0.8) 100%
    );
  }
`;

const Footer = styled.footer`
  position: relative;
  z-index: 10;
  padding: 3rem 2rem;
  text-align: center;
  background: 
    linear-gradient(135deg, 
      rgba(10, 10, 10, 0.95) 0%, 
      rgba(47, 79, 79, 0.8) 100%
    );
  border-top: 2px solid rgba(112, 128, 144, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Tagline = styled.div`
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  font-style: italic;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #d2691e;
  text-shadow: 0 0 10px rgba(210, 105, 30, 0.5);
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const NetworkNodes = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(0, 255, 65, 0.6);
    border-radius: 50%;
    animation: ${pulse} 3s ease-in-out infinite;
  }
  
  &::before {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 70%;
    right: 20%;
    animation-delay: 1.5s;
  }
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Detroit&apos;s Open Commons</title>
        <meta name="description" content="Detroit builds in the open. A shared digital space where creators come together to connect, collaborate, and build." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={`${geistSans.variable} ${geistMono.variable}`}>
        <IndustrialGrid />
        <NetworkNodes />
        
        <Header>
          <GlobeIcon>🌐</GlobeIcon>
          <Title>Detroit&apos;s Open Commons</Title>
          <Subtitle>Detroit builds in the open.</Subtitle>
          <Description>
            A shared space where creators come together to connect, collaborate, and build. 
            It&apos;s a public commons designed to empower Detroit&apos;s community by aligning scattered efforts, 
            breaking down silos, and amplifying collective impact.
          </Description>
        </Header>

        <Main>
          <Card>
            <CardIcon>✨</CardIcon>
            <CardTitle>Mission</CardTitle>
            <CardDescription>
              To create and maintain an open commons that empowers Detroit&apos;s communities to:
            </CardDescription>
            <CardList>
              <li>Collaborate transparently</li>
              <li>Share resources and knowledge</li>
              <li>Build projects together</li>
              <li>Uplift one another through shared goals and values</li>
            </CardList>
          </Card>

          <Card>
            <CardIcon>📜</CardIcon>
            <CardTitle>Principles</CardTitle>
            <CardList>
              <li><strong>Openness</strong> – Contributions are visible, remixable, and free to build upon</li>
              <li><strong>Transparency</strong> – Decisions, processes, and resources are documented in public</li>
              <li><strong>Collaboration</strong> – Projects overlap and strengthen one another</li>
              <li><strong>Accessibility</strong> – The commons is inclusive and easy to join</li>
              <li><strong>Shared Stewardship</strong> – Community collectively maintains and evolves the commons</li>
            </CardList>
          </Card>

          <Card>
            <CardIcon>📍</CardIcon>
            <CardTitle>Why Detroit?</CardTitle>
            <CardDescription>
              Detroit is full of creative and technical energy. But efforts are often scattered, resources siloed, 
              and opportunities missed. The Open Commons provides a common ground for Detroit&apos;s builders and creators — 
              starting here, replicable anywhere.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>🛠️</CardIcon>
            <CardTitle>What Lives in the Commons?</CardTitle>
            <CardList>
              <li><strong>Open projects</strong> (code, data, docs, designs)</li>
              <li><strong>Community knowledge</strong> (guides, learnings, toolkits)</li>
              <li><strong>Collaboration protocols</strong> (shared ways to work, govern, and share credit)</li>
              <li><strong>Transparency tools</strong> (dashboards, open ledgers, participation records)</li>
            </CardList>
          </Card>
        </Main>

        <CTASection>
          <CTATitle>🚀 How to Get Involved</CTATitle>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: '#f0f0f0', 
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            <strong style={{ color: '#FF4F00' }}>Open October is upon us!</strong> Join Detroit&apos;s month-long open source build cycle. 
            Submit your project, collaborate with builders, and help strengthen our open commons.
          </p>
          <CTAGrid>
            <CTAButton href="/open-october" role="button" style={{ backgroundColor: '#FF4F00', borderColor: '#FF4F00', fontSize: '1.1rem', fontWeight: '800' }}>
              Learn more about Open October
            </CTAButton>
            <CTAButton href="/builders" role="button">
              👥 Meet the Builders
            </CTAButton>
          </CTAGrid>
        </CTASection>

        <ContentSection>
          <VisionCard>
            <CardIcon>🌱</CardIcon>
            <CardTitle>Long-Term Vision</CardTitle>
            <CardDescription>
              We are building the first node of Detroit&apos;s Open Commons, a decentralized, community-owned network of digital commons. 
              The goal is to create a replicable model — so any community, anywhere, can establish their own Open Commons 
              to support collaboration and shared ownership.
            </CardDescription>
          </VisionCard>
        </ContentSection>

        <Footer>
          <Tagline>&ldquo;The commons belongs to us all.&rdquo;</Tagline>
          <p style={{color: '#708090', fontSize: '0.9rem'}}>
            Built with Next.js and styled-components • Industrial Roots → Solarpunk Future
          </p>
        </Footer>
      </Container>
    </>
  );
}