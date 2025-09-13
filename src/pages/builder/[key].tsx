import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem 1rem;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2.5rem;
`;

const ActionCard = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 3rem;
  text-align: center;
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.neonYellow};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  margin: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.creamyBeige};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}60;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  margin: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.neonOrange};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
`;

const Message = styled.div<{ success?: boolean }>`
  padding: 1rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
  background-color: ${({ success, theme }) => 
    success 
      ? `${theme.colors.neonYellow}20` 
      : `${theme.colors.brickRed}20`
  };
  color: ${({ success, theme }) => 
    success 
      ? theme.colors.asphaltBlack 
      : theme.colors.brickRed
  };
`;

const TrackingSection = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel}30;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.creamyBeige}20;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ItemName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'accepted': return `${theme.colors.neonYellow}40`;
      case 'pending': return `${theme.colors.neonOrange}40`;
      case 'expired': return `${theme.colors.rustedSteel}40`;
      case 'draft': return `${theme.colors.rustedSteel}40`;
      case 'submitted': return `${theme.colors.neonOrange}40`;
      case 'approved': return `${theme.colors.neonYellow}40`;
      case 'rejected': return `${theme.colors.brickRed}40`;
      case 'in_review': return `${theme.colors.neonOrange}40`;
      default: return `${theme.colors.rustedSteel}40`;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'accepted': return theme.colors.asphaltBlack;
      case 'pending': return theme.colors.asphaltBlack;
      case 'expired': return theme.colors.rustedSteel;
      case 'draft': return theme.colors.rustedSteel;
      case 'submitted': return theme.colors.asphaltBlack;
      case 'approved': return theme.colors.asphaltBlack;
      case 'rejected': return theme.colors.brickRed;
      case 'in_review': return theme.colors.asphaltBlack;
      default: return theme.colors.rustedSteel;
    }
  }};
`;

const ItemDetails = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  line-height: 1.4;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-style: italic;
`;

interface MemberData {
  id: number;
  name: string;
  email: string;
  bio: string;
  skills: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  other_links: string;
  profilePicture: string;
}

interface Invitation {
  id: number;
  email: string;
  name: string;
  status: string;
  createdAt: string;
  acceptedAt?: string;
  expiresAt: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export default function BuilderPage() {
  const router = useRouter();
  const { key } = router.query;
  
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch member data, invitations, and projects
  useEffect(() => {
    if (key) {
      fetchMemberData(key as string);
      fetchInvitations(key as string);
      fetchProjects(key as string);
    }
  }, [key]);

  const fetchMemberData = async (modificationKey: string) => {
    try {
      const response = await fetch(`/api/builders/${modificationKey}`);
      if (response.ok) {
        const data = await response.json();
        setMemberData(data);
      } else {
        setError('Invalid builder link. Please check the URL and try again.');
      }
    } catch {
      setError('Failed to load builder data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitations = async (modificationKey: string) => {
    try {
      // First get the member data to get the ID
      const memberResponse = await fetch(`/api/builders/${modificationKey}`);
      if (memberResponse.ok) {
        const memberData = await memberResponse.json();
        const response = await fetch(`/api/member-invitations?memberId=${memberData.id}`);
        if (response.ok) {
          const data = await response.json();
          setInvitations(data.invitations || []);
        }
      }
    } catch (err) {
      console.error('Failed to load invitations:', err);
    }
  };

  const fetchProjects = async (modificationKey: string) => {
    try {
      const response = await fetch(`/api/projects?modificationKey=${modificationKey}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Loading... - Detroit Commons</title>
        </Head>
        <Container>
          <Header>
            <Title>Loading...</Title>
            <Subtitle>Please wait while we load your builder information.</Subtitle>
          </Header>
        </Container>
      </ThemeProvider>
    );
  }

  if (error || !memberData) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Error - Detroit Commons</title>
          <meta name="description" content="Invalid builder link" />
        </Head>
        <Container>
          <Header>
            <Title>Error</Title>
            <Subtitle>We couldn&apos;t load your builder information.</Subtitle>
          </Header>
          <ActionCard>
            <Message>{error || 'Builder not found'}</Message>
            <BackLink href="/builders">
              ← Back to Builders
            </BackLink>
          </ActionCard>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{memberData.name} - Detroit Commons</title>
        <meta name="description" content={`${memberData.name}'s builder profile on Detroit Commons`} />
      </Head>
      <Container>
        <Header>
          <Title>Welcome, {memberData.name}!</Title>
          <Subtitle>
            Manage your builder profile and invite others to join Detroit&apos;s builder community.
          </Subtitle>
        </Header>

        <ActionCard>
          <CardTitle>Profile Management</CardTitle>
          <CardDescription>
            Update your builder profile information, skills, and social links.
          </CardDescription>
          <Button href={`/builder/${key}/modify`}>
            Modify My Profile
          </Button>
        </ActionCard>

        <ActionCard>
          <CardTitle>Invite Other Builders</CardTitle>
          <CardDescription>
            Know other amazing builders who should be part of our community? Send them personalized invitations.
          </CardDescription>
          <Button href={`/builder/${key}/invite`}>
            Send Invitations
          </Button>
        </ActionCard>

        <ActionCard>
          <CardTitle>Community</CardTitle>
          <CardDescription>
            Explore the builder community and discover new opportunities.
          </CardDescription>
          <SecondaryButton href="/builders">
            View All Builders
          </SecondaryButton>
          <SecondaryButton href="/open-october">
            Open October
          </SecondaryButton>
        </ActionCard>

        <TrackingSection>
          <SectionTitle>Your Invitations</SectionTitle>
          {invitations.length > 0 ? (
            <ItemList>
              {invitations.map((invitation) => (
                <ItemCard key={invitation.id}>
                  <ItemHeader>
                    <ItemName>{invitation.name || invitation.email}</ItemName>
                    <StatusBadge status={invitation.status}>
                      {invitation.status}
                    </StatusBadge>
                  </ItemHeader>
                  <ItemDetails>
                    <div><strong>Email:</strong> {invitation.email}</div>
                    <div><strong>Sent:</strong> {new Date(invitation.createdAt).toLocaleDateString()}</div>
                    {invitation.acceptedAt && (
                      <div><strong>Accepted:</strong> {new Date(invitation.acceptedAt).toLocaleDateString()}</div>
                    )}
                    {invitation.status === 'pending' && (
                      <div><strong>Expires:</strong> {new Date(invitation.expiresAt).toLocaleDateString()}</div>
                    )}
                  </ItemDetails>
                </ItemCard>
              ))}
            </ItemList>
          ) : (
            <EmptyState>No invitations sent yet</EmptyState>
          )}
        </TrackingSection>

        <TrackingSection>
          <SectionTitle>Your Projects</SectionTitle>
          {projects.length > 0 ? (
            <ItemList>
              {projects.map((project) => (
                <ItemCard key={project.id}>
                  <ItemHeader>
                    <ItemName>{project.name}</ItemName>
                    <StatusBadge status={project.status}>
                      {project.status.replace('_', ' ')}
                    </StatusBadge>
                  </ItemHeader>
                  <ItemDetails>
                    <div>{project.description}</div>
                    <div><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</div>
                    {project.submittedAt && (
                      <div><strong>Submitted:</strong> {new Date(project.submittedAt).toLocaleDateString()}</div>
                    )}
                    {project.reviewedAt && (
                      <div><strong>Reviewed:</strong> {new Date(project.reviewedAt).toLocaleDateString()}</div>
                    )}
                    {project.reviewNotes && (
                      <div><strong>Review Notes:</strong> {project.reviewNotes}</div>
                    )}
                  </ItemDetails>
                </ItemCard>
              ))}
            </ItemList>
          ) : (
            <EmptyState>No projects yet</EmptyState>
          )}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button href="/submit-project">
              Submit New Project
            </Button>
          </div>
        </TrackingSection>

      </Container>
    </ThemeProvider>
  );
}
