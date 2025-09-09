import Head from "next/head";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

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

const BackLink = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: #d2691e;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(210, 105, 30, 0.5);
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 20;
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    margin-bottom: 2rem;
  }
  
  &:hover {
    border-color: #00ff41;
    color: #00ff41;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
`;

const GlobeIcon = styled.div`
  font-size: clamp(3rem, 8vw, 4rem);
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(0, 255, 65, 0.4));
  animation: ${pulse} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 3.5rem);
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
  font-size: clamp(1rem, 3vw, 1.4rem);
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
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 900;
  margin-bottom: 3rem;
  color: #f0f0f0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    letter-spacing: 1px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 0 auto 4rem;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 3rem;
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
  font-size: clamp(2rem, 5vw, 2.5rem);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.4));
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
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
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.6;
  color: #c0c0c0;
  margin-bottom: 1.5rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CardLink = styled.a`
  color: #00ff41;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 255, 65, 0.5);
  border-radius: 4px;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 65, 0.1);
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
`;

const FeatureCard = styled(Card)`
  text-align: center;
  max-width: 600px;
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

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
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

export default function About() {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>About - Detroit&apos;s Open Commons</title>
        <meta name="description" content="Learn about Detroit's Open Commons community. We're building a collaborative, transparent digital commons that empowers Detroit's creators and builders." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={`${geistSans.variable} ${geistMono.variable}`}>
        <IndustrialGrid />
        <NetworkNodes />
        
        <Header>
          <BackLink href="/">← Back to Home</BackLink>
          <GlobeIcon>🌐</GlobeIcon>
          <Title>About Our Community</Title>
          <Subtitle>Building the future together</Subtitle>
          <Description>
            Detroit&apos;s Open Commons is more than a platform—it&apos;s a movement. 
            We&apos;re a community of builders, creators, and visionaries working together 
            to create transparent, collaborative systems that reflect our shared values.
          </Description>
        </Header>

        <Main>
          <SectionTitle>🤝 Our Community</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>👥</CardIcon>
              <CardTitle>Builders & Creators</CardTitle>
              <CardDescription>
                Developers, designers, entrepreneurs, and community organizers who believe in 
                the power of collaboration. We come from diverse backgrounds but share a 
                common vision of building something meaningful together.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🏭</CardIcon>
              <CardTitle>Detroit&apos;s Industrial Spirit</CardTitle>
              <CardDescription>
                We embrace Detroit&apos;s legacy of making things that matter. Our community 
                combines the city&apos;s industrial resilience with forward-thinking innovation, 
                creating tools and systems built to last.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🌱</CardIcon>
              <CardTitle>Regenerative Growth</CardTitle>
              <CardDescription>
                Like plants breaking through concrete, we believe in growth that heals and 
                strengthens communities. Our projects aim to create positive cycles that 
                benefit everyone involved.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🔗</CardIcon>
              <CardTitle>Connected Network</CardTitle>
              <CardDescription>
                We&apos;re building connections across Detroit and beyond. Every project, 
                every collaboration, every shared resource strengthens the network and 
                creates new opportunities for community growth.
              </CardDescription>
            </Card>
          </Grid>

          <SectionTitle>💡 Our Values</SectionTitle>
          <FeatureCard>
            <CardIcon>⚡</CardIcon>
            <CardTitle>What Drives Us</CardTitle>
            <CardDescription>
              These principles guide everything we do, from how we organize events to 
              how we build technology and foster collaboration.
            </CardDescription>
            <ValuesList>
              <li><strong>Radical Transparency</strong> – All our work, finances, and decisions are open</li>
              <li><strong>Community Ownership</strong> – The commons belongs to everyone who contributes</li>
              <li><strong>Inclusive Building</strong> – Everyone has something valuable to contribute</li>
              <li><strong>Sustainable Growth</strong> – We build for the long term, not quick wins</li>
              <li><strong>Local Impact</strong> – Detroit first, but with global applicability</li>
              <li><strong>Open Source Everything</strong> – Knowledge and tools should be freely shared</li>
            </ValuesList>
          </FeatureCard>

          <SectionTitle>🚀 Get Involved</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>💻</CardIcon>
              <CardTitle>Contribute Code</CardTitle>
              <CardDescription>
                Help build the platform, create tools, or contribute to open source projects. 
                Whether you&apos;re a seasoned developer or just getting started, there&apos;s 
                a place for you in our technical community.
              </CardDescription>
              <CardLink href="https://github.com/buidl-renaissance" target="_blank">
                View GitHub →
              </CardLink>
            </Card>

            <Card>
              <CardIcon>🎨</CardIcon>
              <CardTitle>Share Your Skills</CardTitle>
              <CardDescription>
                Designers, writers, organizers, educators—we need diverse skills to build 
                a thriving commons. Share your expertise and help others learn and grow.
              </CardDescription>
              <CardLink href="#join">
                Join Community →
              </CardLink>
            </Card>

            <Card>
              <CardIcon>🌟</CardIcon>
              <CardTitle>Start a Project</CardTitle>
              <CardDescription>
                Have an idea that could benefit the community? The Open Commons is the 
                perfect place to collaborate, get feedback, and find contributors who 
                share your vision.
              </CardDescription>
              <CardLink href="#submit">
                Submit Project →
              </CardLink>
            </Card>

            <Card>
              <CardIcon>📢</CardIcon>
              <CardTitle>Spread the Word</CardTitle>
              <CardDescription>
                Help grow the community by sharing our mission with other builders and 
                creators. The more diverse voices we have, the stronger our commons becomes.
              </CardDescription>
              <CardLink href="#share">
                Share Mission →
              </CardLink>
            </Card>
          </Grid>
        </Main>
      </Container>
    </>
  );
}