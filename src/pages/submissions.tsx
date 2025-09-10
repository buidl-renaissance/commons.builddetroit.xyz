import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem 1rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.neonYellow};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 3rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.creamyBeige};
    transform: translateY(-2px);
  }
`;

const SubmissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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

const ProjectName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
`;

const ProjectLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  background-color: ${({ theme }) => theme.colors.neonOrange}20;
  color: ${({ theme }) => theme.colors.neonOrange};
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: white;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ status, theme }) => 
    status === 'approved' ? '#10B98120' :
    status === 'rejected' ? theme.colors.brickRed + '20' :
    theme.colors.rustedSteel + '20'
  };
  color: ${({ status, theme }) => 
    status === 'approved' ? '#059669' :
    status === 'rejected' ? theme.colors.brickRed :
    theme.colors.rustedSteel
  };
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.1rem;
  padding: 3rem;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.brickRed}20;
  color: ${({ theme }) => theme.colors.brickRed};
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid ${({ theme }) => theme.colors.brickRed};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: center;
  margin: 2rem 0;
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
}

export default function Submissions() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getArrayValue = (value?: string[] | string): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    // Fallback for string values (shouldn't happen with updated API)
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  };

  return (
    <>
      <Head>
        <title>Project Submissions - Detroit Commons</title>
        <meta name="description" content="View all project submissions to the Detroit Commons community" />
      </Head>

      <Container>
        <ContentContainer>
          <Header>
            <Title>Project Submissions</Title>
            <Subtitle>
              Explore the innovative projects being built by the Detroit Commons community.
              <br />
              Each submission represents a vision for strengthening our local ecosystem with global impact.
            </Subtitle>
            <CTAButton href="/submit-project">
              🚀 Submit Your Project
            </CTAButton>
          </Header>

          {loading && <LoadingMessage>Loading submissions...</LoadingMessage>}
          
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!loading && !error && projects.length === 0 && (
            <LoadingMessage>
              No submissions yet. Be the first to submit your project!
            </LoadingMessage>
          )}

          {!loading && !error && projects.length > 0 && (
            <SubmissionsGrid>
              {projects.map((project) => (
                <ProjectCard key={project.id}>
                  <ProjectCardContent>
                    <ProjectName>{project.name}</ProjectName>
                    <StatusBadge status={project.status}>{project.status}</StatusBadge>
                    
                    <ProjectDescription>{project.description}</ProjectDescription>

                    <ProjectMeta>
                      <div><strong>Lead:</strong> {project.leadName}</div>
                      {getArrayValue(project.teamMembers).length > 0 && (
                        <div><strong>Team:</strong> {getArrayValue(project.teamMembers).join(', ')}</div>
                      )}
                      <div><strong>Submitted:</strong> {formatDate(project.createdAt)}</div>
                    </ProjectMeta>

                    <ProjectLinks>
                      {project.roadmapLink && (
                        <ProjectLink href={project.roadmapLink} target="_blank" rel="noopener noreferrer">
                          📋 MVP Proposal
                        </ProjectLink>
                      )}
                      {project.homepageLink && (
                        <ProjectLink href={project.homepageLink} target="_blank" rel="noopener noreferrer">
                          🌐 Homepage
                        </ProjectLink>
                      )}
                      {getArrayValue(project.additionalResources).map((resource, index) => (
                        <ProjectLink 
                          key={index} 
                          href={resource} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          🔗 Resource {index + 1}
                        </ProjectLink>
                      ))}
                    </ProjectLinks>
                  </ProjectCardContent>

                  {project.homepageLink && (
                    <ProjectIframeContainer>
                      <ProjectIframe 
                        src={project.homepageLink}
                        title={`${project.name} Marketing Page`}
                        loading="lazy"
                      />
                      <IframeOverlay />
                    </ProjectIframeContainer>
                  )}
                </ProjectCard>
              ))}
            </SubmissionsGrid>
          )}
        </ContentContainer>
      </Container>
    </>
  );
}
