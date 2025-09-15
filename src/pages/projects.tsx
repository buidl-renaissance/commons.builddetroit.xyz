import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

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
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2.5rem;
`;

const ProjectsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(34, 35, 36, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProjectCardContent = styled.div`
  padding: 2rem;
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
`;

const ProjectIframeContainer = styled.div`
  width: 60%;
  height: 700px;
  border-left: 2px solid ${({ theme }) => theme.colors.rustedSteel}20;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 600px;
    border-left: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.rustedSteel}20;
  }

  @media (max-width: 480px) {
    height: 600px;
  }
`;

const ProjectIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

const IframeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1;
  pointer-events: none;
`;

const ProjectHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ProjectName = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectLead = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProjectEmail = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
`;

const TeamSection = styled.div`
  margin-bottom: 1.5rem;
`;

const TeamTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const TeamMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TeamMember = styled.span`
  background-color: ${({ theme }) => theme.colors.creamyBeige}40;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 500;
`;

const ResourcesSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ResourcesTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const ResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ResourceLink = styled.a`
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.rustedSteel}20;
`;

const ProjectDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.8rem;
`;

const StatusBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.neonYellow}40;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.brickRed};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  font-style: italic;
`;


interface Project {
  id: number;
  name: string;
  description: string;
  roadmapLink?: string;
  homepageLink?: string;
  additionalResources?: string[];
  leadName: string;
  leadEmail: string;
  teamMembers?: string[];
  status: string;
  createdAt: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActiveProjects();
  }, []);

  const fetchActiveProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        // Filter for active projects only
        const activeProjects = data.projects.filter((project: Project) => 
          project.status === 'active'
        );
        setProjects(activeProjects);
      } else {
        setError('Failed to load projects');
      }
    } catch (err: unknown) {
      console.error('Failed to load projects:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Active Projects - Detroit Commons</title>
        </Head>
        <Container>
          <Header>
            <Title>Active Projects</Title>
            <Subtitle>
              Discover the innovative projects currently being built by the Detroit Commons community.
            </Subtitle>
          </Header>
          <LoadingState>Loading active projects...</LoadingState>
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Error - Detroit Commons</title>
        </Head>
        <Container>
          <Header>
            <Title>Active Projects</Title>
          </Header>
          <ErrorState>{error}</ErrorState>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Active Projects - Detroit Commons</title>
        <meta name="description" content="Discover active projects from the Detroit Commons builder community" />
      </Head>
      <Container>
        <Header>
          <Title>Active Projects</Title>
          <Subtitle>
            Discover the innovative projects that are currently being built by the Detroit Commons community.
          </Subtitle>
        </Header>

        {projects.length > 0 ? (
          <ProjectsGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectCardContent>
                  <ProjectHeader>
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectLead>Lead: {project.leadName}</ProjectLead>
                  </ProjectHeader>

                  <ProjectDescription>{project.description}</ProjectDescription>

                  <ProjectLinks>
                    {project.roadmapLink && (
                      <ProjectLink href={project.roadmapLink} target="_blank" rel="noopener noreferrer">
                        📋 View Roadmap
                      </ProjectLink>
                    )}
                    {project.homepageLink && (
                      <ProjectLink href={project.homepageLink} target="_blank" rel="noopener noreferrer">
                        🌐 Visit Homepage
                      </ProjectLink>
                    )}
                  </ProjectLinks>

                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <TeamSection>
                      <TeamTitle>Team Members</TeamTitle>
                      <TeamMembers>
                        {project.teamMembers.map((member, index) => (
                          <TeamMember key={index}>{member}</TeamMember>
                        ))}
                      </TeamMembers>
                    </TeamSection>
                  )}

                  {project.additionalResources && project.additionalResources.length > 0 && (
                    <ResourcesSection>
                      <ResourcesTitle>Additional Resources</ResourcesTitle>
                      <ResourcesList>
                        {project.additionalResources.map((resource, index) => (
                          <ResourceLink key={index} href={resource} target="_blank" rel="noopener noreferrer">
                            {resource}
                          </ResourceLink>
                        ))}
                      </ResourcesList>
                    </ResourcesSection>
                  )}

                  <ProjectMeta>
                    <ProjectDate>
                      Started: {new Date(project.createdAt).toLocaleDateString()}
                    </ProjectDate>
                    <StatusBadge>Active</StatusBadge>
                  </ProjectMeta>
                </ProjectCardContent>

                <ProjectIframeContainer>
                  <ProjectIframe
                    src={project.homepageLink || project.roadmapLink || 'https://commons.buildetroit.xyz'}
                    title={`${project.name} - Project Preview`}
                    loading="lazy"
                  />
                  <IframeOverlay />
                </ProjectIframeContainer>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        ) : (
          <EmptyState>
            No active projects yet. Check back soon for exciting new projects from our builder community!
          </EmptyState>
        )}
      </Container>
    </ThemeProvider>
  );
}
