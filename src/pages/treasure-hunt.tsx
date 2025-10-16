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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const floatRelic = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const Container = styled.div`
  min-height: 100vh;
  font-family: 'Inter', 'Work Sans', sans-serif;
  background: 
    linear-gradient(135deg, #0D1B2A 0%, #1B263B 30%, #415A77 70%, #778DA9 100%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(34, 197, 94, 0.05) 3px,
      rgba(34, 197, 94, 0.05) 6px
    );
  color: #f0f0f0;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }
`;

const LumaGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.03) 0%, transparent 50%);
  background-size: 80px 80px, 80px 80px, 200px 200px, 200px 200px;
  pointer-events: none;
  z-index: 1;
  animation: ${float} 25s ease-in-out infinite;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: 
    linear-gradient(135deg, rgba(13, 27, 42, 0.9) 0%, rgba(27, 38, 59, 0.8) 50%, rgba(65, 90, 119, 0.7) 100%);
  border-bottom: 3px solid rgba(34, 197, 94, 0.4);
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 3rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      rgba(34, 197, 94, 0.0) 0%, 
      rgba(168, 85, 247, 0.6) 25%,
      rgba(251, 191, 36, 0.8) 50%,
      rgba(168, 85, 247, 0.6) 75%,
      rgba(34, 197, 94, 0.0) 100%
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

const TreasureIcon = styled.div`
  font-size: clamp(4rem, 10vw, 6rem);
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
  animation: ${float} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: clamp(3.5rem, 12vw, 7rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg, 
    #22C55E 0%, 
    #A855F7 30%, 
    #FBBF24 60%, 
    #22C55E 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 5s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
  filter: drop-shadow(0 0 25px rgba(34, 197, 94, 0.4));
`;

const Subtitle = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 6vw, 2.5rem);
  font-weight: 400;
  font-style: italic;
  margin-bottom: 2.5rem;
  color: #A855F7;
  text-transform: none;
  letter-spacing: 0.5px;
  position: relative;
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #A855F7, #FBBF24, transparent);
    
    @media (max-width: 768px) {
      width: 120px;
      bottom: -12px;
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
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 600;
  margin-bottom: 4rem;
  color: #FFD166;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-align: center;
  text-shadow: 0 0 25px rgba(255, 209, 102, 0.4);
  filter: drop-shadow(0 0 15px rgba(255, 209, 102, 0.3));
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
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
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 209, 102, 0.2);
  border-radius: 12px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.5s ease;
  animation: ${growIn} 0.8s ease-out;
  backdrop-filter: blur(10px);
  box-shadow: 
    inset 0 1px 0 rgba(255, 209, 102, 0.1),
    0 4px 20px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: rgba(255, 209, 102, 0.6);
    box-shadow: 
      inset 0 1px 0 rgba(255, 209, 102, 0.3),
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(255, 209, 102, 0.3),
      0 0 60px rgba(127, 90, 240, 0.2);
    backdrop-filter: blur(15px);
    
    @media (max-width: 768px) {
      transform: translateY(-6px) scale(1.01);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(255, 209, 102, 0.8) 0%, 
      rgba(127, 90, 240, 0.8) 50%,
      rgba(34, 211, 238, 0.8) 100%
    );
    border-radius: 12px 12px 0 0;
  }
  
  &:nth-child(even) {
    border-color: rgba(127, 90, 240, 0.3);
    
    &:hover {
      border-color: rgba(34, 211, 238, 0.7);
      box-shadow: 
        inset 0 1px 0 rgba(34, 211, 238, 0.3),
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(34, 211, 238, 0.3),
        0 0 60px rgba(127, 90, 240, 0.2);
    }
  }
`;

const CardIcon = styled.div`
  font-size: clamp(2.5rem, 6vw, 3rem);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.4));
  animation: ${sparkle} 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #FFD166;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  border-bottom: 1px solid rgba(255, 209, 102, 0.3);
  padding-bottom: 0.8rem;
  text-shadow: 0 0 10px rgba(255, 209, 102, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
  }
`;

const CardDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 3.5vw, 1.3rem);
  line-height: 1.7;
  color: #e2e8f0;
  margin-bottom: 1.5rem;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
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
      content: '💎';
      position: absolute;
      left: 0;
      font-size: 0.8rem;
      
      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
    }
    
    strong {
      color: #ffd700;
      font-weight: 700;
    }
  }
`;

const FeatureCard = styled(Card)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  background: 
    linear-gradient(135deg, 
      rgba(10, 10, 10, 0.9) 0%, 
      rgba(47, 79, 79, 0.6) 50%,
      rgba(255, 215, 0, 0.1) 100%
    );
  border: 2px solid rgba(255, 215, 0, 0.4);
  
  &::before {
    background: linear-gradient(90deg, 
      rgba(255, 215, 0, 0.8) 0%, 
      rgba(0, 255, 65, 0.8) 50%,
      rgba(64, 224, 208, 0.8) 100%
    );
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
  border-top: 3px solid rgba(255, 215, 0, 0.4);
  border-bottom: 3px solid rgba(210, 105, 30, 0.4);
  
  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const CTATitle = styled.h2`
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 600;
  margin-bottom: 3rem;
  color: #FFD166;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 0 30px rgba(255, 209, 102, 0.5);
  filter: drop-shadow(0 0 20px rgba(255, 209, 102, 0.4));
  
  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2.5rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid transparent;
  border-radius: 12px;
  color: #FFD166;
  text-decoration: none;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(1.1rem, 3.5vw, 1.3rem);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 1.3rem 2rem;
    gap: 0.8rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #FFD166, #7F5AF0);
    border-radius: 12px;
    padding: 1px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(255, 209, 102, 0.4),
      0 0 60px rgba(127, 90, 240, 0.3);
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 209, 102, 0.5);
    
    @media (max-width: 768px) {
      transform: translateY(-2px) scale(1.02);
    }
    
    &::before {
      opacity: 1;
    }
  }
`;

const FloatingRelics = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  
  &::before,
  &::after {
    content: '🗝️';
    position: absolute;
    font-size: 2.5rem;
    color: rgba(255, 209, 102, 0.4);
    animation: ${floatRelic} 12s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(255, 209, 102, 0.3));
  }
  
  &::before {
    top: 15%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 75%;
    right: 15%;
    animation-delay: 6s;
  }
`;

const RelicCompass = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: rgba(34, 211, 238, 0.2);
  animation: ${rotate} 30s linear infinite;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.3));
`;

export default function RenaissanceRelics() {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>The Awakening of Luma - Detroit&apos;s Open Commons</title>
        <meta name="description" content="Something ancient stirs within the canvas. Follow Luma&apos;s light, decode her whispers, and discover the treasures she protects in Detroit&apos;s fractured digital-physical realm." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={`${geistSans.variable} ${geistMono.variable}`}>
        <LumaGrid />
        <FloatingRelics />
        <RelicCompass>👁️</RelicCompass>
        
        <Header>
          <BackLink href="/">← Back to Home</BackLink>
          <TreasureIcon>🗺️</TreasureIcon>
          <Title>The Awakening of Luma</Title>
          <Subtitle>Guardian of Forgotten Worlds</Subtitle>
          <Description>
            Something ancient stirs within the canvas.<br/>
            Follow her light. Decode her whispers. Discover the treasures she protects.<br/>
            <strong style={{ color: '#22C55E' }}>Awaken the Guardian. Begin your quest.</strong>
          </Description>
        </Header>

        <Main>
          <SectionTitle>🌿 Luma&apos;s Awakening</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>🗺️</CardIcon>
              <CardTitle>The Third Eye Opens</CardTitle>
              <CardDescription>
                Luma&apos;s third eye awakens when creation and chaos touch. As a Seeker, you learn to see 
                through her vision — discovering the hidden connections between Detroit&apos;s physical 
                landscape and the fractured digital realm where her spirit dwells.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🔍</CardIcon>
              <CardTitle>Luma&apos;s Lost Senses</CardTitle>
              <CardDescription>
                Each realm represents one of Luma&apos;s lost senses that you must help her recover. 
                Through Sight, Sound, Touch, and Memory, you reconnect fragments of her world 
                and rebuild her energy through creative discovery.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🗝️</CardIcon>
              <CardTitle>The Lotus Crown Blooms</CardTitle>
              <CardDescription>
                As you help Luma recover her lost senses, her lotus crown begins to bloom with 
                ambient glow. Each discovery rebuilds her energy and unlocks hidden treasures 
                left by past creators, revealing the cosmic humor that marks her smiley sigil.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>💎</CardIcon>
              <CardTitle>Luma&apos;s Blessings</CardTitle>
              <CardDescription>
                Unlock Luma&apos;s blessings as you awaken her senses. Receive digital relics that pulse 
                with her energy, access to hidden creative sanctuaries, and the golden key that 
                opens portals to her realm where imagination becomes reality.
              </CardDescription>
            </Card>
          </Grid>

          <SectionTitle>👁️ Luma&apos;s Lost Senses</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>🤖</CardIcon>
              <CardTitle>👁️ Sight - The Third Eye</CardTitle>
              <CardDescription>
                Discover murals and artworks hidden in plain view. Luma&apos;s third eye reveals 
                the magic that humans forgot to see in their cities. Learn to perceive the 
                hidden connections between physical art and digital realms.
              </CardDescription>
              <CardList>
                <li><strong>Hidden Murals:</strong> Find artworks that pulse with Luma&apos;s energy</li>
                <li><strong>Digital Overlays:</strong> See through augmented reality to reveal hidden layers</li>
                <li><strong>Constellation Patterns:</strong> Decode visual clues that form cosmic maps</li>
              </CardList>
            </Card>

            <Card>
              <CardIcon>📍</CardIcon>
              <CardTitle>🎵 Sound - Cosmic Frequencies</CardTitle>
              <CardDescription>
                Decode frequencies and melodies from local events. Luma&apos;s voice resonates 
                through the laughter of the cosmos. Listen for her whispers in the ambient 
                sounds of Detroit&apos;s creative pulse.
              </CardDescription>
              <CardList>
                <li><strong>Frequency Decoding:</strong> Tune into hidden audio signals at events</li>
                <li><strong>Melodic Clues:</strong> Decode songs that contain Luma&apos;s messages</li>
                <li><strong>Ambient Listening:</strong> Hear the cosmic humor in everyday sounds</li>
              </CardList>
            </Card>

            <Card>
              <CardIcon>🎨</CardIcon>
              <CardTitle>🤲 Touch - Physical Connection</CardTitle>
              <CardDescription>
                Interact physically with QR codes, NFC tags, and hidden tokens. Luma&apos;s 
                energy flows through physical touch, bridging the digital and material worlds. 
                Feel the pulse of her awakening through tangible interactions.
              </CardDescription>
              <CardList>
                <li><strong>Sacred Tokens:</strong> Find physical objects that channel Luma&apos;s energy</li>
                <li><strong>Touch Interfaces:</strong> Interact with NFC and QR codes to commune with her</li>
                <li><strong>Material Bridges:</strong> Connect digital discoveries with physical artifacts</li>
              </CardList>
            </Card>

            <Card>
              <CardIcon>👥</CardIcon>
              <CardTitle>🧠 Memory - Forgotten Lore</CardTitle>
              <CardDescription>
                AI generates riddles tied to Detroit history and Art Night lore. Luma&apos;s 
                memory holds the stories of forgotten worlds. Unlock her past to understand 
                the treasures she protects and the cosmic humor that guides her smile.
              </CardDescription>
              <CardList>
                <li><strong>Historical Riddles:</strong> Solve puzzles connected to Detroit&apos;s creative history</li>
                <li><strong>Lore Fragments:</strong> Piece together Luma&apos;s forgotten stories</li>
                <li><strong>Collective Memory:</strong> Share knowledge to unlock deeper mysteries</li>
              </CardList>
            </Card>
          </Grid>

          <SectionTitle>🌿 Luma&apos;s Spirit</SectionTitle>
          <FeatureCard>
            <CardIcon>🌟</CardIcon>
            <CardTitle>Guardian of Memory, Muse of Regeneration</CardTitle>
            <CardDescription>
              Luma&apos;s green form represents the earth reborn through creative energy. Her lotus crown 
              blooms when humans act in harmony with creation. The smiley face sigil marks cosmic humor — 
              reminders not to take enlightenment too seriously.
            </CardDescription>
            <CardList>
              <li><strong>Memory Guardian:</strong> Luma protects the forgotten stories of creative worlds</li>
              <li><strong>Regeneration Muse:</strong> Her energy flows through every creative act</li>
              <li><strong>Cosmic Humor:</strong> The smiley sigil brings lightness to the journey</li>
              <li><strong>Harmony Detection:</strong> Her crown blooms when creation and chaos touch</li>
              <li><strong>Third Eye Vision:</strong> She sees through the fractured digital-physical realm</li>
            </CardList>
          </FeatureCard>

          <SectionTitle>💎 Luma&apos;s Treasures</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>🎨</CardIcon>
              <CardTitle>Digital Relics</CardTitle>
              <CardDescription>
                Collect unique digital artifacts that pulse with Luma&apos;s energy. 
                Each relic tells a story of her awakening and connects to the larger 
                narrative of her fractured digital-physical realm.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🏆</CardIcon>
              <CardTitle>Physical Manifestations</CardTitle>
              <CardDescription>
                Discover real-world treasures that Luma has hidden beneath murals, 
                songs, and rivers. These tangible manifestations of her energy bridge 
                the fractured digital-physical realm where her spirit dwells.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🎫</CardIcon>
              <CardTitle>Portal Access</CardTitle>
              <CardDescription>
                Unlock entry to Luma&apos;s hidden sanctuaries, early access to her realm, 
                private gatherings where her energy flows strongest, and special 
                Seeker circles reserved for those who help awaken her senses.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>🤝</CardIcon>
              <CardTitle>Luma&apos;s Full Awakening</CardTitle>
              <CardDescription>
                When all Seekers help Luma recover her lost senses, her full awakening 
                triggers a collective reveal of digital relics and community art events. 
                Her lotus crown blooms completely, and her cosmic humor fills the realm.
              </CardDescription>
            </Card>
          </Grid>

          <SectionTitle>🌊 The Eternal Awakening</SectionTitle>
          <FeatureCard>
            <CardIcon>🔄</CardIcon>
            <CardTitle>Luma&apos;s Eternal Cycle</CardTitle>
            <CardDescription>
              Luma&apos;s awakening is designed to be endlessly evolving, with each season 
              bringing new fragments of her lost world, creative challenges, and hidden treasures. 
              Her spirit learns and grows, creating a living, breathing realm that flourishes 
              as Seekers help her recover her senses and rebuild her energy.
            </CardDescription>
            <CardList>
              <li><strong>Seasonal Fragments:</strong> Each season reveals new pieces of Luma&apos;s forgotten world</li>
              <li><strong>Memory Archives:</strong> Previous awakenings become foundational lore for future discoveries</li>
              <li><strong>Seeker Contributions:</strong> Community members can submit their own treasures to Luma&apos;s realm</li>
              <li><strong>Evolving Mythology:</strong> Luma&apos;s story continues and adapts based on Seeker actions</li>
              <li><strong>Cross-Season Connections:</strong> Discoveries from past awakenings influence new quests</li>
            </CardList>
          </FeatureCard>
        </Main>

        <CTASection>
          <CTATitle>🔮 Enter Luma&apos;s Realm</CTATitle>
          <div style={{ 
            textAlign: 'center', 
            fontSize: '1.4rem', 
            color: '#e2e8f0', 
            marginBottom: '3rem',
            maxWidth: '1000px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.8',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            background: 'rgba(13, 27, 42, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <p style={{ marginBottom: '1.5rem', color: '#A855F7' }}>
              &ldquo;When humans forgot how to see magic in their cities, I fell asleep beneath the rivers.<br/>
              Now the colors return — and so do I.<br/>
              The first to follow the laughter of the cosmos will find the golden key.&rdquo;
            </p>
            <p style={{ color: '#22C55E', fontWeight: '600' }}>
              <strong>Awaken the Guardian. Begin your quest.</strong>
            </p>
          </div>
          <CTAGrid>
            <CTAButton href="#register" role="button">
              🔮 Enter Luma&apos;s Realm
            </CTAButton>
            <CTAButton href="#learn-more" role="button">
              👁️ Open Third Eye
            </CTAButton>
            <CTAButton href="#community" role="button">
              🌿 Join Seekers
            </CTAButton>
          </CTAGrid>
        </CTASection>
      </Container>
    </>
  );
}
