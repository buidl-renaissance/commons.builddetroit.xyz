import Head from "next/head";
import styled, { css } from "styled-components";
import type { ThemeType } from "@/styles/theme";
import FooterComponent from "@/components/Footer";

// October-themed color extensions with civic colors
const openOctoberColors = {
  // Warm October tones
  burnOrange: "#CC5500",
  goldenrod: "#DAA520",
  crimsonRed: "#DC143C",
  rustBrown: "#8B4513",
  // GitHub-inspired greens
  githubGreen: "#28a745",
  githubDark: "#165928",
  // Civic colors for open data
  civicBlue: "#2E5BBA",
  civicTeal: "#1B998B",
  dataGreen: "#2D7D32",
};

const PageContainer = styled.div<{ theme: ThemeType }>`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const HeroSection = styled.section<{ theme: ThemeType }>`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.asphaltBlack} 0%,
    #2d1810 50%,
    ${({ theme }) => theme.colors.asphaltBlack} 100%
  );
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 4rem 2rem;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="autumnGrid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(218,165,32,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23autumnGrid)"/></svg>');
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: bold;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  line-height: 1.2;
  background: linear-gradient(
    135deg,
    ${openOctoberColors.burnOrange},
    ${openOctoberColors.goldenrod}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const HeroSubtitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 400;
`;

const ContentSection = styled.section<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 4rem 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${openOctoberColors.burnOrange},
      ${openOctoberColors.goldenrod},
      ${openOctoberColors.burnOrange},
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  color: ${openOctoberColors.burnOrange};

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${openOctoberColors.burnOrange},
      ${openOctoberColors.goldenrod}
    );
    border-radius: 2px;
  }
`;

const Paragraph = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const Emphasis = styled.strong`
  color: ${openOctoberColors.burnOrange};
  font-weight: 600;
`;

const List = styled.ul<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const HighlightBox = styled.div<{ theme: ThemeType }>`
  background: linear-gradient(
    135deg,
    rgba(204, 85, 0, 0.05) 0%,
    rgba(218, 165, 32, 0.05) 100%
  );
  border-left: 4px solid ${openOctoberColors.burnOrange};
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const BackLink = styled.a<{ theme: ThemeType }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${openOctoberColors.burnOrange};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${openOctoberColors.goldenrod};
    text-decoration: underline;
  }
`;

export default function OpenOctoberIntentions() {
  return (
    <PageContainer>
      <Head>
        <title>Open October Intentions | Detroit Commons</title>
        <meta
          name="description"
          content="Open October Intentions: No expectations, but clear direction. Our North Star for building together in Detroit."
        />
        <meta property="og:title" content="Open October Intentions | Detroit Commons" />
        <meta
          property="og:description"
          content="Open October Intentions: No expectations, but clear direction. Our North Star for building together in Detroit."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Open October Intentions | Detroit Commons" />
        <meta
          name="twitter:description"
          content="Open October Intentions: No expectations, but clear direction. Our North Star for building together in Detroit."
        />
      </Head>

      <HeroSection>
        <HeroContent>
          <HeroTitle>Open October Intention</HeroTitle>
          <HeroSubtitle>
            No expectations, but clear direction.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <BackLink href="/open-october">
            ← Back to Open October
          </BackLink>

          <Paragraph>
            We&apos;re not here to force outcomes—we&apos;re here to create space. That said, we do want to set a North Star so that the work we do, no matter how experimental or playful, points toward something meaningful.
          </Paragraph>

          <SectionTitle>The North Star</SectionTitle>

          <Paragraph>
            Our aim is to change the status quo of how we build together. That means:
          </Paragraph>

          <List>
            <ListItem>
              <Emphasis>Breaking down silos</Emphasis> across disciplines.
            </ListItem>
            <ListItem>
              <Emphasis>Building in the open</Emphasis>, where knowledge and tools are shared.
            </ListItem>
            <ListItem>
              <Emphasis>Creating a digital commons for Detroit</Emphasis>: a working space that archives, shares, and expands on the technology and learnings we produce.
            </ListItem>
          </List>

          <HighlightBox>
            Technology is becoming increasingly cheap. What matters most—and will only grow in value—are <Emphasis>relationships</Emphasis>. Open October is about strengthening those connections by working side by side as if we were one cross-functional team.
          </HighlightBox>

          <SectionTitle>The Spirit</SectionTitle>

          <Paragraph>
            Take it seriously, but don&apos;t take yourself too seriously. We&apos;re building for ArtNight, but this is also a chance to experiment and have fun.
          </Paragraph>

          <Paragraph>
            Think of this as a collaborative sandbox: the more open you are with your ideas, the more others can build on them.
          </Paragraph>

          <Paragraph>
            We&apos;re not just coding, designing, or organizing—we&apos;re learning how to work together differently.
          </Paragraph>

          <SectionTitle>What We&apos;re Building</SectionTitle>

          <List>
            <ListItem>
              <Emphasis>Open technology stacks</Emphasis> that anyone can adopt.
            </ListItem>
            <ListItem>
              <Emphasis>A network of creators, builders, and organizers</Emphasis> with shared resources.
            </ListItem>
            <ListItem>
              <Emphasis>A foundation for building businesses and creative projects together</Emphasis>, rooted in collaboration and transparency.
            </ListItem>
          </List>
        </Container>
      </ContentSection>

      <FooterComponent />
    </PageContainer>
  );
}
