import Head from "next/head";
import Image from "next/image";
import styled, { css } from "styled-components";
import React, { useState } from "react";
import Link from "next/link";
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
  // Sponsor tier colors
  bronze: "#6b5126",
  silver: "#4f4f4f",
  gold: "#a3711f",
  platinum: "#464441",
};

const HeroSection = styled.section<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.asphaltBlack} 0%,
    #2d1810 50%,
    ${({ theme }) => theme.colors.asphaltBlack} 100%
  );
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-align: center;
  position: relative;
  padding: 4rem 1rem;
  overflow: hidden;

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

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    min-height: 75vh;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
`;

const HeroTreeContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const HeroTreeImage = styled(Image)`
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  @media (max-width: 768px) {
    width: 256px;
    height: 256px;
  }
`;

const HeroDatesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0 3rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin: 1rem 0 1rem 0;
  }
`;

const HeroDateItem = styled.div<{ theme: ThemeType }>`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const HeroDateNumber = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${openOctoberColors.goldenrod};
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDateLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const MainHeadline = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: bold;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  line-height: 1.1;
  background: linear-gradient(
    135deg,
    ${openOctoberColors.burnOrange},
    ${openOctoberColors.goldenrod}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
`;

const SubHeadline = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  margin-bottom: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const CTAButton = styled.button<{ primary?: boolean; theme: ThemeType }>`
  background: ${({ primary }) =>
    primary ? openOctoberColors.githubGreen : openOctoberColors.burnOrange};
  color: white;
  border: 2px solid
    ${({ primary }) =>
      primary ? openOctoberColors.githubGreen : openOctoberColors.burnOrange};
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 220px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    background: ${({ primary }) =>
      primary ? openOctoberColors.githubDark : openOctoberColors.crimsonRed};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    min-width: 200px;
  }
`;

const Section = styled.section<{ theme: ThemeType; autumn?: boolean }>`
  background: ${({ theme, autumn }) =>
    autumn
      ? `linear-gradient(135deg, #2D1810 0%, ${theme.colors.asphaltBlack} 100%)`
      : theme.colors.creamyBeige};
  color: ${({ theme, autumn }) =>
    autumn ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  padding: 3rem 2rem;
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
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
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

const SectionDescription = styled.p<{ theme: ThemeType; compact?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.4rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  text-align: center;
  ${({ compact }) => compact && css`
    font-size: 1rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  `}
`;

const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ columns }) => (columns === 2 ? "400px" : "250px")}, 1fr)
  );
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SponsorshipCard = styled.div<{ theme: ThemeType; tier?: string }>`
  background: transparent;
  border-radius: 12px;
  padding: 1rem;
  border: none;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SponsorshipBadgeContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SponsorshipBadgeImage = styled(Image)`
  margin-bottom: 1rem;
`;

const SponsorshipTierTitle = styled.h3<{ theme: ThemeType; tierColor: string }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  margin: 0;
  color: ${({ tierColor }) => tierColor};
  text-align: center;
`;

const SponsorshipPrice = styled.div<{ tierColor: string }>`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ tierColor }) => tierColor};
  margin-top: 0.5rem;
`;

const SponsorshipBenefits = styled.p<{ theme: ThemeType; tierColor: string }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ tierColor }) => tierColor};
  text-align: center;
`;

// Generic Card components for other sections
const Card = styled.div<{ theme: ThemeType; tier?: string }>`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  border: 2px solid ${openOctoberColors.burnOrange};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardDescription = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const ScheduleItem = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid ${openOctoberColors.burnOrange};
  border-radius: 0 8px 8px 0;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(10px);
  }
`;

const ScheduleDate = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${openOctoberColors.goldenrod};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ScheduleTitle = styled.h4<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ScheduleDescription = styled.p<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ResourceItem = styled.a<{ theme: ThemeType }>`
  display: block;
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${openOctoberColors.githubGreen};
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background: ${openOctoberColors.githubGreen};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
  }
`;

const TreasuryWidget = styled.div<{ theme: ThemeType }>`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.asphaltBlack},
    #1a1a1a
  );
  border: 2px solid ${openOctoberColors.githubGreen};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${openOctoberColors.githubGreen},
      ${openOctoberColors.goldenrod},
      ${openOctoberColors.githubGreen}
    );
  }
`;

const TreasuryAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 2rem;
  color: ${openOctoberColors.githubGreen};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TreasuryLabel = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
`;

const PizzaIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const GitIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${openOctoberColors.githubGreen};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

// Registration form components

const FormInput = styled.input<{ theme: ThemeType }>`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid ${openOctoberColors.civicBlue};
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: rgba(245, 233, 218, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${openOctoberColors.githubGreen};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  accent-color: ${openOctoberColors.githubGreen};
  margin-right: 0.25rem;
`;

const CheckboxLabel = styled.label<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
`;

const SubmitButton = styled(CTAButton)`
  width: 100%;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FormMessage = styled.div<{ success?: boolean; theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  color: ${({ success }) =>
    success ? openOctoberColors.githubGreen : "#ff6b6b"};
  background: ${({ success }) =>
    success ? "rgba(40, 167, 69, 0.1)" : "rgba(255, 107, 107, 0.1)"};
  border: 1px solid
    ${({ success }) => (success ? openOctoberColors.githubGreen : "#ff6b6b")};
`;

// Resources section components
const ResourcesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResourceSectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};

  &.featured {
    color: ${openOctoberColors.goldenrod};
  }

  &.open-data {
    color: ${openOctoberColors.civicBlue};
  }

  &.git-guides {
    color: ${openOctoberColors.goldenrod};
  }

  &.educational {
    color: ${openOctoberColors.dataGreen};
  }
`;

const ResourceSectionContainer = styled.div`
  margin-top: 3rem;
`;

const RecordingsNote = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const RecordingsText = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

// Registration section components
const RegistrationContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const RegistrationFormContainer = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`;

const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactSection = styled.div`
  margin-top: 3rem;
  font-size: 1rem;
  opacity: 0.8;
`;

const ContactEmail = styled.a`
  color: ${openOctoberColors.goldenrod};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Hero section components
const HeroSubHeadlineStyled = styled(SubHeadline)`
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.2rem;
`;


const AboutQuote = styled.div`
  text-align: center;
  margin-top: 3rem;
  font-size: 1.3rem;
  font-style: italic;
`;

// Schedule section components
const ScheduleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Sponsorship section components
const SponsorshipCTAContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

// Community section components
const CommunityLinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CommunityLink = styled.a`
  color: ${openOctoberColors.githubGreen};
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CommunityPartnersNote = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

export default function OpenOctober() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    subscribeToNewsletter: false,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/open-october/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setError("");
        setFormData({ email: "", name: "", subscribeToNewsletter: false });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Open October: Build • Learn • Merge | Detroit Open Source Event Series
        </title>
        <meta
          name="description"
          content="Join Detroit's month-long open source event series. Learn Git, build in community, and celebrate at the Merge Party. From pizza to pull requests, Detroit is building its open commons."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Open October: Build • Learn • Merge"
        />
        <meta
          property="og:description"
          content="A month-long open source event series in Detroit — learn Git, build in community, and celebrate at the Merge Party."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://thebarefoot.dev/open-october"
        />
        <meta
          property="og:image"
          content="https://thebarefoot.dev/images/open-october-featured.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Open October: Detroit's open source and open data event series"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Open October: Build • Learn • Merge"
        />
        <meta
          name="twitter:description"
          content="Detroit's month-long open source event series. Learn Git, build in community, celebrate open source."
        />
        <meta
          name="twitter:image"
          content="https://thebarefoot.dev/images/open-october-featured.png"
        />
        <meta
          name="twitter:image:alt"
          content="Open October: Detroit's open source and open data event series"
        />
      </Head>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <MainHeadline>Open October</MainHeadline>
          <HeroTreeContainer>
            <HeroTreeImage
              src="/images/open-october-tree.png"
              alt="Open October Tree - Git branching graph merging into a data tree"
              width={300}
              height={300}
            />
          </HeroTreeContainer>

          <SubHeadline>Connect • Build • Merge</SubHeadline>

          {/* <HeroDatesContainer>
            <HeroDateItem>
              <HeroDateNumber>Oct 7</HeroDateNumber>
              <HeroDateLabel>Kickoff</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>Oct 14</HeroDateNumber>
              <HeroDateLabel>Build #1</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>Oct 21</HeroDateNumber>
              <HeroDateLabel>Build #2</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>Oct 28</HeroDateNumber>
              <HeroDateLabel>Merge Party</HeroDateLabel>
            </HeroDateItem>
          </HeroDatesContainer> */}

          <HeroSubHeadlineStyled>
            Join the team building the open commons of Detroit.
          </HeroSubHeadlineStyled>
          <CTAGroup>
            <Link href="#register" passHref legacyBehavior>
              <CTAButton primary as="a">
                <GitIcon>git</GitIcon> Register for Kickoff
              </CTAButton>
            </Link>
          </CTAGroup>
        </HeroContent>
      </HeroSection>

      {/* About Open October */}
      <Section>
        <Container>
          <SectionTitle>About Open October</SectionTitle>

          <SectionDescription>
            Open October is a month-long build cycle where Detroit&apos;s creative and technical community comes together to launch and document projects that strengthen the <strong>Detroit Open Commons</strong>. We are building open, collaborative systems that reflect values of transparency, accessibility, and permissionless innovation.
          </SectionDescription>

          <AboutQuote>
            &quot;Open source. Open data. An Open Platform for Detroit.&quot;
          </AboutQuote>
        </Container>
      </Section>

      {/* Schedule */}
      <Section autumn>
        <Container>
          <SectionTitle>Schedule</SectionTitle>
          <SectionDescription compact>
            A month of hands-on learning with open source tools, open data
            exploration, and community building.
          </SectionDescription>

          <ScheduleContainer>
            <ScheduleItem>
              <ScheduleDate>October 1st • Submission Deadline</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>init</GitIcon> Project Proposals Due
              </ScheduleTitle>
              <ScheduleDescription>
                • Submit your project proposals
                <br />
                • Include project name, description, and 4-week scope
                <br />
                • Define how others can contribute
                <br />
                • 5 projects will be selected for Open October
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>October 2nd • Kickoff Day</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>fork</GitIcon> Projects Introduced & Teams Formed
              </ScheduleTitle>
              <ScheduleDescription>
                • Selected projects are introduced, goals discussed
                <br />
                • Teams formed around 5 curated projects
                <br />
                • Meet your fellow builders and collaborators
                <br />
                • Set expectations and timelines
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>October 7th</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>add</GitIcon> Open Build Session #1
              </ScheduleTitle>
              <ScheduleDescription>
                <PizzaIcon>🍕</PizzaIcon> Community building, peer
                mentoring, and pizza.
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>October 14th</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>add</GitIcon> Open Build Session #2
              </ScheduleTitle>
              <ScheduleDescription>
                <PizzaIcon>🍕</PizzaIcon> Community building, peer
                mentoring, and pizza.
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>October 21st</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>commit</GitIcon> Open Build Session #3
              </ScheduleTitle>
              <ScheduleDescription>
                <PizzaIcon>🍕</PizzaIcon> Community building, peer
                  mentoring, and pizza.
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>October 28th</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>commit</GitIcon> Open Build Session #4
              </ScheduleTitle>
              <ScheduleDescription>
                <PizzaIcon>🍕</PizzaIcon> Community building, peer
                  mentoring, and pizza.
              </ScheduleDescription>
            </ScheduleItem>

            <ScheduleItem>
              <ScheduleDate>October 30th</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>merge</GitIcon> Merge Party Showcase
              </ScheduleTitle>
              <ScheduleDescription>
                Demos of what was built (apps, visualizations, stories).
                <br />
                Symbolic merge into shared repo.
                <br />
                Community celebration with food, drinks, and networking.
              </ScheduleDescription>
            </ScheduleItem>
          </ScheduleContainer>
        </Container>
      </Section>

      {/* Project Guidelines & Collaboration */}
      <Section>
        <Container>
          <SectionTitle>How We Build Together</SectionTitle>
          <SectionDescription compact>
            Clear expectations, collaborative principles, and shared outcomes that make Open October successful.
          </SectionDescription>

          <Grid>
            <Card>
              <CardTitle>🔍 Project Criteria</CardTitle>
              <CardDescription>
                <strong>Contribute to Detroit Open Commons</strong> — Open source, open data, permissionless
                <br /><br />
                <strong>Scoped for 4 weeks</strong> — Show meaningful progress in sprint timeframe
                <br /><br />
                <strong>Collaborative by design</strong> — Clear roles for contributors
                <br /><br />
                <strong>Interactive outputs</strong> — Others can engage with code, data, designs, documentation
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>👥 Participation Expectations</CardTitle>
              <CardDescription>
                <strong>Attend key events</strong> — Kickoff Day, Merge Party, and at least one Open Build Day
                <br /><br />
                <strong>Communicate openly</strong> — Life happens, but ghosting is not community
                <br /><br />
                <strong>Respect time & contributions</strong> — Honor each other&apos;s pace of learning
                <br /><br />
                <strong>Commitment to Commons</strong> — Participation is a commitment to shared success
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>📜 Code of Collaboration</CardTitle>
              <CardDescription>
                <strong>Openness</strong> — Projects contribute back to the Commons
                <br /><br />
                <strong>Respect</strong> — Honor time, contributions, and shared goals
                <br /><br />
                <strong>Permissionlessness</strong> — Anyone can fork, remix, or extend projects
                <br /><br />
                <strong>Accountability</strong> — Non-communication affects future invitations until trust is re-earned
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>📦 Expected Outcomes</CardTitle>
              <CardDescription>
                <strong>5 new Commons projects</strong> — Initiated and documented for ongoing development
                <br /><br />
                <strong>Reusable playbook</strong> — Framework for future Open Commons build cycles
                <br /><br />
                <strong>Sustained momentum</strong> — Ongoing collaboration in Detroit&apos;s open ecosystem
                <br /><br />
                <strong>Community growth</strong> — Stronger connections between creators and builders
              </CardDescription>
            </Card>
          </Grid>

          <AboutQuote style={{ marginTop: "3rem" }}>
            &quot;Participation is a commitment to the Commons.&quot;
          </AboutQuote>
        </Container>
      </Section>



      {/* Registration/Contact */}
      <Section id="register" autumn>
        <Container>
          <RegistrationContainer>
            <RegistrationFormContainer>
              <SectionTitle>Register for Open October</SectionTitle>
              <SectionDescription>
                Ready to connect, build, and merge with Detroit&apos;s open
                source and open data community? Register below.
              </SectionDescription>

              <RegistrationForm onSubmit={handleRegistrationSubmit}>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Your name (optional)"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <CheckboxGroup>
                  <Checkbox
                    type="checkbox"
                    id="newsletter"
                    name="subscribeToNewsletter"
                    checked={formData.subscribeToNewsletter}
                    onChange={handleInputChange}
                  />
                  <CheckboxLabel htmlFor="newsletter">
                    Also subscribe to thebarefoot.dev newsletter
                  </CheckboxLabel>
                </CheckboxGroup>
                <SubmitButton type="submit" primary disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </SubmitButton>
              </RegistrationForm>

              {error && <FormMessage>{error}</FormMessage>}
              {success && (
                <FormMessage success>
                  🎉 You&apos;re registered! We&apos;ll send you event updates
                  and details soon.
                </FormMessage>
              )}
            </RegistrationFormContainer>

            <ContactSection>
              <p>Questions? Contact us:</p>
              <p>
                <ContactEmail href="mailto:john@thebarefoot.dev">
                  john@thebarefoot.dev
                </ContactEmail>
              </p>
            </ContactSection>
          </RegistrationContainer>
        </Container>
      </Section>

      {/* Sponsorship */}
      <Section>
        <Container>
          <SectionTitle>Become a Sponsor</SectionTitle>
          <SectionDescription>
            Fuel Detroit&apos;s open commons. <br /> 
            <span style={{ fontSize: "1rem" }}>Your sponsorship directly
            supports community learning, transparency, and local innovation.</span>
          </SectionDescription>

          <Grid>
            <SponsorshipCard tier="branch">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/bronze-commit.png"
                  alt="Bronze Git Commit Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.bronze}>
                  Bronze Git Commit
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.bronze}>
                  $25
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.bronze}>
                Sponsor an X-Large pizza you get:
                <br />
                Logo on website
                <br />
                Social media recognition
                <br />
                Newsletter mention
              </SponsorshipBenefits>
            </SponsorshipCard>

            <SponsorshipCard tier="branch">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/silver-branch.png"
                  alt="Silver Branch Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.silver}>
                  Silver Branch
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.silver}>
                  $50
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.silver}>
                Sponsor 2 X-Large pizzas you get:
                <br />
                All Commit benefits +
                <br />
                Sponsored Text in Promotional Materials
              </SponsorshipBenefits>
            </SponsorshipCard>

            <SponsorshipCard tier="pr">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/golden-pr.png"
                  alt="Golden Pull Request Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.gold}>
                  Golden Pull Request
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.gold}>
                  $100
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.gold}>
                Sponsor 4 X-Large pizzas you get:
                <br />
                All Branch benefits +
                <br />
                IRL mentions at events
              </SponsorshipBenefits>
            </SponsorshipCard>

            <SponsorshipCard tier="merge">
              <SponsorshipBadgeContainer>
                <SponsorshipBadgeImage
                  src="/images/platinum-merge.png"
                  alt="Platinum Merge Badge"
                  width={120}
                  height={120}
                />
                <SponsorshipTierTitle tierColor={openOctoberColors.platinum}>
                  Platinum Merge
                </SponsorshipTierTitle>
                <SponsorshipPrice tierColor={openOctoberColors.platinum}>
                  $250+
                </SponsorshipPrice>
              </SponsorshipBadgeContainer>
              <SponsorshipBenefits tierColor={openOctoberColors.platinum}>
                Sponsor 5+ X-Large pizzas you get:
                <br />
                All Pull Request benefits +
                <br />
                Sponsorship messaging in promotional materials
                <br />1 minute pitch opportunity
              </SponsorshipBenefits>
            </SponsorshipCard>
          </Grid>

          <SponsorshipCTAContainer>
            <CTAButton
              primary
              onClick={() =>
                window.open(
                  "mailto:john@thebarefood.dev?subject=Open October Sponsorship",
                  "_blank"
                )
              }
            >
              Become a Sponsor
            </CTAButton>
          </SponsorshipCTAContainer>

          {/* Treasury Transparency */}
          <TreasuryWidget>
            <TreasuryAmount>$0 USDC</TreasuryAmount>
            <TreasuryLabel>Transparent Treasury Balance</TreasuryLabel>
            <div style={{ marginTop: "1rem" }}>
              <Link
                href="https://etherscan.io/address/0x..."
                passHref
                legacyBehavior
              >
                <CommunityLink>View on Etherscan →</CommunityLink>
              </Link>
            </div>
          </TreasuryWidget>
        </Container>
      </Section>

      <FooterComponent />
    </>
  );
}
