import { useState } from 'react';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';

const Container = styled.div<{ theme: ThemeType }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div<{ theme: ThemeType }>`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Version = styled.div<{ theme: ThemeType }>`
  display: inline-block;
  background: rgba(255, 79, 0, 0.2);
  color: ${({ theme }) => theme.colors.neonOrange};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 1rem;
`;

const Timeline = styled.div<{ theme: ThemeType }>`
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.neonOrange},
      ${({ theme }) => theme.colors.creamyBeige}
    );
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const Phase = styled.div<{ theme: ThemeType; position: 'left' | 'right' }>`
  display: flex;
  justify-content: ${({ position }) => position === 'left' ? 'flex-start' : 'flex-end'};
  padding: 2rem 0;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 50px;
  }
`;

const PhaseCard = styled.div<{ theme: ThemeType; status: string }>`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  border: 2px solid ${({ theme, status }) => 
    status === 'in-progress' ? theme.colors.neonOrange :
    status === 'planned' ? theme.colors.creamyBeige :
    'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  padding: 2rem;
  width: 45%;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 79, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PhaseNumber = styled.div<{ theme: ThemeType; status: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme, status }) => 
    status === 'in-progress' ? theme.colors.neonOrange :
    status === 'planned' ? theme.colors.creamyBeige :
    'rgba(255, 255, 255, 0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.2rem;
  z-index: 10;

  @media (max-width: 768px) {
    left: 20px;
    transform: translateY(-50%);
  }
`;

const PhaseHeader = styled.div<{ theme: ThemeType }>`
  margin-bottom: 1rem;
`;

const PhaseTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0 0 0.5rem 0;
`;

const PhaseDate = styled.div<{ theme: ThemeType }>`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
`;

const PhaseStatus = styled.span<{ theme: ThemeType; status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ status }) => 
    status === 'in-progress' ? 'rgba(255, 79, 0, 0.2)' :
    status === 'completed' ? 'rgba(40, 167, 69, 0.2)' :
    'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme, status }) => 
    status === 'in-progress' ? theme.colors.neonOrange :
    status === 'completed' ? '#28a745' :
    theme.colors.creamyBeige};
`;

const FeatureList = styled.ul<{ theme: ThemeType }>`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const Feature = styled.li<{ theme: ThemeType; completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  opacity: ${({ completed }) => completed ? 0.6 : 1};
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};

  &::before {
    content: '${({ completed }) => completed ? '✓' : '○'}';
    margin-right: 0.75rem;
    font-weight: bold;
    color: ${({ theme, completed }) => 
      completed ? '#28a745' : theme.colors.neonOrange};
  }
`;

const FeaturesSection = styled.div<{ theme: ThemeType }>`
  margin-top: 4rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FeatureGrid = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div<{ theme: ThemeType; priority: string }>`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.neonOrange :
    priority === 'medium' ? theme.colors.creamyBeige :
    'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-3px);
  }
`;

const FeatureTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0 0 0.5rem 0;
`;

const FeatureDescription = styled.p<{ theme: ThemeType }>`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.5;
`;

const PriorityBadge = styled.span<{ theme: ThemeType; priority: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ priority }) => 
    priority === 'high' ? 'rgba(255, 79, 0, 0.2)' :
    priority === 'medium' ? 'rgba(255, 193, 7, 0.2)' :
    'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.neonOrange :
    priority === 'medium' ? '#ffc107' :
    theme.colors.creamyBeige};
`;

export default function RoadmapPage() {
  const phases = [
    {
      number: 1,
      title: 'MVP Launch',
      date: 'February 2026',
      status: 'in-progress',
      description: 'Core identity, event check-in, and community feed',
      features: [
        { name: 'Treasury management system', completed: true },
        { name: 'Expense tracking with AI receipt analysis', completed: true },
        { name: 'Project management dashboard', completed: true },
        { name: 'Decentralized identity (DID) system', completed: false },
        { name: 'Event check-in functionality', completed: false },
        { name: 'Community feed', completed: false },
      ]
    },
    {
      number: 2,
      title: 'Beta Access',
      date: 'March 2026',
      status: 'planned',
      description: 'Partner organizations and mobile experience',
      features: [
        { name: 'Partner organization onboarding', completed: false },
        { name: 'Mobile app (Expo)', completed: false },
        { name: 'Credit & reputation system', completed: false },
        { name: 'Enhanced analytics', completed: false },
      ]
    },
    {
      number: 3,
      title: 'Public Launch',
      date: 'May 2026',
      status: 'planned',
      description: 'Open to all community members',
      features: [
        { name: 'Open community onboarding', completed: false },
        { name: 'Public dashboard', completed: false },
        { name: 'Commons explorer (map/timeline)', completed: false },
        { name: 'Community governance tools', completed: false },
      ]
    },
    {
      number: 4,
      title: 'Open API',
      date: 'July 2026',
      status: 'planned',
      description: 'External integrations and civic dashboards',
      features: [
        { name: 'External data access APIs', completed: false },
        { name: 'Civic dashboards for city partners', completed: false },
        { name: 'Developer documentation', completed: false },
        { name: 'SDK/libraries for integrations', completed: false },
      ]
    },
  ];

  const coreFeatures = [
    {
      title: 'Decentralized Identity',
      description: 'Wallet or email-based identity system for verified community members',
      priority: 'high'
    },
    {
      title: 'Event Check-in',
      description: 'QR/NFC-based attendance tracking for community events',
      priority: 'high'
    },
    {
      title: 'Community Feed',
      description: 'Aggregated stream of verified posts, projects, and events',
      priority: 'high'
    },
    {
      title: 'Credit & Reputation',
      description: 'Earn credits and badges for community engagement',
      priority: 'medium'
    },
    {
      title: 'Commons Explorer',
      description: 'Interactive map and timeline visualization of local projects',
      priority: 'medium'
    },
    {
      title: 'AI Summarization',
      description: 'Auto-generate community recaps from event data',
      priority: 'low'
    },
  ];

  return (
    <Container>
      <Header>
        <Title>🗺️ Product Roadmap</Title>
        <Subtitle>
          Building Detroit&apos;s digital public commons — transparent, collaborative, and community-owned.
        </Subtitle>
        <Version>Version 0.1 - MVP Development</Version>
      </Header>

      <Timeline>
        {phases.map((phase, index) => (
          <Phase key={phase.number} position={index % 2 === 0 ? 'left' : 'right'}>
            <PhaseNumber status={phase.status}>{phase.number}</PhaseNumber>
            <PhaseCard status={phase.status}>
              <PhaseHeader>
                <PhaseTitle>{phase.title}</PhaseTitle>
                <PhaseDate>📅 Target: {phase.date}</PhaseDate>
                <PhaseStatus status={phase.status}>{phase.status.replace('-', ' ')}</PhaseStatus>
              </PhaseHeader>
              <p style={{ opacity: 0.9, marginBottom: '1rem' }}>{phase.description}</p>
              <FeatureList>
                {phase.features.map((feature, idx) => (
                  <Feature key={idx} completed={feature.completed}>
                    {feature.name}
                  </Feature>
                ))}
              </FeatureList>
            </PhaseCard>
          </Phase>
        ))}
      </Timeline>

      <FeaturesSection>
        <SectionTitle>🔥 Core Features</SectionTitle>
        <FeatureGrid>
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={index} priority={feature.priority}>
              <div style={{ marginBottom: '0.75rem' }}>
                <PriorityBadge priority={feature.priority}>
                  {feature.priority === 'high' ? '🔥 High' : 
                   feature.priority === 'medium' ? '⚡ Medium' : 
                   '💡 Low'} Priority
                </PriorityBadge>
              </div>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      <div style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.7 }}>
        <p>
          📖 View the complete{' '}
          <a 
            href="https://github.com/buidl-renaissance/commons.builddetroit.xyz/blob/main/docs/PRD.md" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#FF4F00', textDecoration: 'underline' }}
          >
            Product Requirements Document
          </a>
          {' '}for detailed specifications.
        </p>
      </div>
    </Container>
  );
}

