import Head from "next/head";
import Image from "next/image";
import styled, { css } from "styled-components";
import React, { useState } from "react";
import Link from "next/link";
import type { ThemeType } from "@/styles/theme";
import FooterComponent from "@/components/Footer";
import TreasuryBalance from "@/components/TreasuryBalance";

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
  margin-bottom: 1rem;
`;

const HeroTreeImage = styled(Image)`
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  @media (max-width: 768px) {
    width: 128px;
    height: 128px;
  }
`;

const MainHeadline = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: bold;
  margin-bottom: 0rem;
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
  margin-bottom: 3rem;
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
    margin-bottom: 2rem;
    line-height: 1.2;
  `}
`;

const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ columns }) => (columns === 2 ? "350px" : "250px")}, 1fr)
  );
  gap: 2rem;
  margin-top: 3rem;

  ${({ columns }) => columns === 2 && `
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }
  `}

  ${({ columns }) => !columns || columns !== 2 ? `
    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  ` : ''}

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
  padding: 1rem;
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

const HeroDatesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0 1.5rem 0;
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
  font-size: 2rem;
  font-weight: bold;
  color: ${openOctoberColors.goldenrod};
  margin-bottom: 0.5rem;

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

const FormTextArea = styled.textarea<{ theme: ThemeType }>`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid ${openOctoberColors.civicBlue};
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: rgba(245, 233, 218, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${openOctoberColors.githubGreen};
  }
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
  font-size: 1.8rem;
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-top: 2rem;
  }
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


export default function OpenOctober() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        setFormData({ email: "", name: "", message: "" });
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
          Open October: Build • Learn • Merge | Detroit Open Commons Event Series
        </title>
        <meta
          name="description"
          content="Detroit's month-long open source event series. Learn Git, build in community, and celebrate at the Merge Party. From pizza to pull requests, Detroit is building its open commons."
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
          content="https://commons.builddetroit.xyz/images/open-october-featured.jpg"
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
          content="https://commons.builddetroit.xyz/images/open-october-featured.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Open October: Detroit's open source and open data event series"
        />
      </Head>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTreeContainer>
            <HeroTreeImage
              src="/images/open-october-tree.png"
              alt="Open October Tree - Git branching graph merging into a data tree"
              width={150}
              height={150}
            />
          </HeroTreeContainer>
          
          <MainHeadline>Open October</MainHeadline>

          <SubHeadline>Connect • Build • Merge</SubHeadline>

          <HeroDatesContainer>
            <HeroDateItem>
              <HeroDateNumber>1st</HeroDateNumber>
              <HeroDateLabel>KICKOFF</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>7th</HeroDateNumber>
              <HeroDateLabel>BUILD #1</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>14th</HeroDateNumber>
              <HeroDateLabel>BUILD #2</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>21st</HeroDateNumber>
              <HeroDateLabel>BUILD #3</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>28th</HeroDateNumber>
              <HeroDateLabel>BUILD #4</HeroDateLabel>
            </HeroDateItem>
            <HeroDateItem>
              <HeroDateNumber>30th</HeroDateNumber>
              <HeroDateLabel>MERGE PARTY</HeroDateLabel>
            </HeroDateItem>
          </HeroDatesContainer>

          <HeroSubHeadlineStyled>
            Building the open commons of Detroit together.
          </HeroSubHeadlineStyled>
          <CTAGroup>
            <Link href="#register" passHref legacyBehavior>
              <CTAButton primary as="a">
                <GitIcon>git</GitIcon> Learn How to Get Involved
              </CTAButton>
            </Link>
            {/* <Link href="/submit-project" passHref legacyBehavior>
              <CTAButton as="a">
                🚀 Submit Your Project
              </CTAButton>
            </Link> */}
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

      {/* Project Submission Call to Action */}
      {/* <Section autumn>
        <Container>
          <SectionTitle>🚀 Submit Your Project</SectionTitle>
          
          <SectionDescription>
            Got an idea that could strengthen Detroit&apos;s open commons? We&apos;re looking for <strong>5 projects</strong> to launch during Open October. Your project could be the foundation of something bigger.
          </SectionDescription>

          <Grid columns={2}>
            <Card>
              <CardTitle>💡 What We&apos;re Looking For</CardTitle>
              <CardDescription>
                <strong>Open Source Projects</strong> — Code, data, or tools that anyone can use and contribute to
                <br /><br />
                <strong>Community Impact</strong> — Projects that serve Detroit&apos;s neighborhoods, creators, or civic needs
                <br /><br />
                <strong>Collaborative by Design</strong> — Clear ways for others to jump in and help
                <br /><br />
                <strong>4-Week MVP</strong> — Clear roadmap with achievable MVP goals for Open October completion
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>🎯 Project Examples</CardTitle>
              <CardDescription>
                <strong>Civic Tech</strong> — Tools for local government transparency, community organizing, or public data
                <br /><br />
                <strong>Creative Platforms</strong> — Apps or sites that showcase Detroit&apos;s artists, musicians, or makers
                <br /><br />
                <strong>Open Data</strong> — Datasets about Detroit neighborhoods, businesses, or community resources
                <br /><br />
                <strong>Developer Tools</strong> — Libraries, APIs, or frameworks that help other builders
              </CardDescription>
            </Card>
          </Grid>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/submit-project" passHref legacyBehavior>
              <CTAButton primary as="a" style={{ fontSize: '1.2rem', padding: '1.25rem 2.5rem' }}>
                🚀 Submit Your Project Idea
              </CTAButton>
            </Link>
            <div style={{ marginTop: '2rem', opacity: 0.8, fontSize: '0.9rem' }}>
              <strong>Submission Deadline:</strong> October 1st
            </div>
          </div>

          <AboutQuote style={{ marginTop: '2.5rem', fontSize: '1.1rem' }}>
            &quot;The best projects are the ones that invite others to build alongside you.&quot;
          </AboutQuote>
        </Container>
      </Section> */}

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
              <ScheduleDate>October 1st • Kickoff Day</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>add</GitIcon> Projects Introduced & Teams Formed
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
              <ScheduleDate>October 7th, 14th, 21st and 28th</ScheduleDate>
              <ScheduleTitle>
                <GitIcon>commit</GitIcon> Open Build Session #1-4
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

      {/* How We Build Together */}
      <Section>
        <Container>
          <SectionTitle>How We Build Together</SectionTitle>
          <SectionDescription>
            No expectations, but clear direction. We&apos;re not here to force outcomes—we&apos;re here to create space for meaningful collaboration.
          </SectionDescription>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <Card>
              <CardTitle>🌟 The North Star</CardTitle>
              <CardDescription>
                <strong>Breaking down silos</strong> across disciplines
                <br /><br />
                <strong>Building in the open</strong> where knowledge and tools are shared
                <br /><br />
                <strong>Creating a digital commons for Detroit</strong> — a working space that archives, shares, and expands on the technology and learnings we produce
                <br /><br />
                <strong>Strengthening relationships</strong> by working side by side as one cross-functional team
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>🎯 The Spirit</CardTitle>
              <CardDescription>
                <strong>Take it seriously, but don&apos;t take yourself too seriously</strong> — We&apos;re building for ArtNight, but this is also a chance to experiment and have fun
                <br /><br />
                <strong>Collaborative sandbox</strong> — The more open you are with your ideas, the more others can build on them
                <br /><br />
                <strong>Learning to work together differently</strong> — We&apos;re not just coding, designing, or organizing
              </CardDescription>
            </Card>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <Card>
              <CardTitle>🏗️ What We&apos;re Building</CardTitle>
              <CardDescription>
                <strong>Open technology stacks</strong> that anyone can adopt
                <br /><br />
                <strong>A network of creators, builders, and organizers</strong> with shared resources
                <br /><br />
                <strong>A foundation for building businesses and creative projects together</strong>, rooted in collaboration and transparency
              </CardDescription>
            </Card>

            <Card>
              <CardTitle>💡 Project Approach</CardTitle>
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
          </div>

          <AboutQuote style={{ marginTop: "3rem" }}>
            &quot;Technology is becoming increasingly cheap. What matters most—and will only grow in value—are relationships.&quot;
          </AboutQuote>
        </Container>
      </Section>



      {/* Registration/Contact */}
      <Section id="register" autumn>
        <Container>
          <RegistrationContainer>
            <RegistrationFormContainer>
              <SectionTitle>Get Involved</SectionTitle>
              <SectionDescription compact>
                Interested in connecting, building, and merging with Detroit&apos;s open
                commons? Let us know how you&apos;d like to participate.
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
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <FormTextArea
                  name="message"
                  placeholder="Tell us about yourself and why you're interested in Open October... (optional)"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                />
                <SubmitButton type="submit" primary disabled={loading}>
                  {loading ? "Sending Request..." : "Request Information"}
                </SubmitButton>
              </RegistrationForm>

              {error && <FormMessage>{error}</FormMessage>}
              {success && (
                <FormMessage success>
                  🎉 Thanks for your interest! We&apos;ll reach out with information
                  about how to get involved in Open October.
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
          <TreasuryBalance 
            address="0x84Da1546238937296355A0F3217Ee4163E2ECC42"
            chainId={8453}
          />
        </Container>
      </Section>

      <FooterComponent />
    </>
  );
}
