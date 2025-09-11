import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

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
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const BuildersGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BuilderCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(34, 35, 36, 0.15);
  }
`;

const ProfileImage = styled.div<{ imageUrl?: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: ${({ imageUrl, theme }) => 
    imageUrl 
      ? `url(${imageUrl})` 
      : `linear-gradient(135deg, ${theme.colors.rustedSteel}40, ${theme.colors.neonOrange}40)`
  };
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  border: 3px solid ${({ theme }) => theme.colors.rustedSteel}20;
`;

const BuilderName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BuilderBio = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const LinkButton = styled.a<{ type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  
  ${({ type, theme }) => {
    switch (type) {
      case 'website':
        return `
          background-color: ${theme.colors.neonOrange}20;
          color: ${theme.colors.neonOrange};
          border: 1px solid ${theme.colors.neonOrange}40;
          
          &:hover {
            background-color: ${theme.colors.neonOrange};
            color: white;
          }
        `;
      case 'linkedin':
        return `
          background-color: #0077B520;
          color: #0077B5;
          border: 1px solid #0077B540;
          
          &:hover {
            background-color: #0077B5;
            color: white;
          }
        `;
      case 'github':
        return `
          background-color: #33320;
          color: #333;
          border: 1px solid #33340;
          
          &:hover {
            background-color: #333;
            color: white;
          }
        `;
      case 'twitter':
        return `
          background-color: #1DA1F220;
          color: #1DA1F2;
          border: 1px solid #1DA1F240;
          
          &:hover {
            background-color: #1DA1F2;
            color: white;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.rustedSteel}20;
          color: ${theme.colors.rustedSteel};
          border: 1px solid ${theme.colors.rustedSteel}40;
          
          &:hover {
            background-color: ${theme.colors.rustedSteel};
            color: white;
          }
        `;
    }
  }}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.brickRed}20;
  color: ${({ theme }) => theme.colors.brickRed};
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid ${({ theme }) => theme.colors.brickRed};
  font-family: ${({ theme }) => theme.fonts.body};
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.neonOrange};
  color: white;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neonYellow};
    color: ${({ theme }) => theme.colors.asphaltBlack};
    transform: translateY(-2px);
  }
`;

interface Builder {
  id: number;
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  other_links?: string[];
  createdAt: string;
}

export default function Builders() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBuilders();
  }, []);

  const fetchBuilders = async () => {
    try {
      const response = await fetch('/api/builders');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch builders');
      }
      
      setBuilders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getLinkType = (url: string): string => {
    if (url.includes('linkedin.com')) return 'linkedin';
    if (url.includes('github.com')) return 'github';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    return 'website';
  };

  const getLinkIcon = (type: string): string => {
    switch (type) {
      case 'linkedin': return '💼';
      case 'github': return '💻';
      case 'twitter': return '🐦';
      case 'website': return '🌐';
      default: return '🔗';
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Builders - Detroit Commons</title>
          <meta name="description" content="Meet the builders of Detroit Commons" />
        </Head>
        <Container>
          <LoadingMessage>Loading builders...</LoadingMessage>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Builders - Detroit Commons</title>
          <meta name="description" content="Meet the builders of Detroit Commons" />
        </Head>
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Builders - Detroit Commons</title>
        <meta name="description" content="Meet the builders of Detroit Commons" />
      </Head>

      <Container>
        <Header>
          <Title>Detroit Builders</Title>
          <Subtitle>
            Meet the creative and technical minds building Detroit&apos;s open commons. 
            These are the people shaping our local ecosystem with global impact.
          </Subtitle>
        </Header>

        {builders.length === 0 ? (
          <EmptyState>
            <h3>No builders yet</h3>
            <p>Be the first to join Detroit&apos;s builder community!</p>
            <CTAButton href="/join">Join the Builders</CTAButton>
          </EmptyState>
        ) : (
          <BuildersGrid>
            {builders.map((builder) => (
              <BuilderCard key={builder.id}>
                <ProfileImage imageUrl={builder.profilePicture}>
                  {!builder.profilePicture && '👤'}
                </ProfileImage>
                
                <BuilderName>{builder.name}</BuilderName>
                
                {builder.bio && (
                  <BuilderBio>{builder.bio}</BuilderBio>
                )}
                
                <LinksContainer>
                  {builder.website && (
                    <LinkButton 
                      href={builder.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      type="website"
                    >
                      {getLinkIcon('website')} Website
                    </LinkButton>
                  )}
                  
                  {builder.linkedin && (
                    <LinkButton 
                      href={builder.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      type="linkedin"
                    >
                      {getLinkIcon('linkedin')} LinkedIn
                    </LinkButton>
                  )}
                  
                  {builder.github && (
                    <LinkButton 
                      href={builder.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      type="github"
                    >
                      {getLinkIcon('github')} GitHub
                    </LinkButton>
                  )}
                  
                  {builder.twitter && (
                    <LinkButton 
                      href={builder.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      type="twitter"
                    >
                      {getLinkIcon('twitter')} Twitter
                    </LinkButton>
                  )}
                  
                  {builder.other_links && builder.other_links.map((link, index) => (
                    <LinkButton 
                      key={index}
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      type="other"
                    >
                      {getLinkIcon('other')} Link
                    </LinkButton>
                  ))}
                </LinksContainer>
              </BuilderCard>
            ))}
          </BuildersGrid>
        )}
      </Container>
    </>
  );
}
