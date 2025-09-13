import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem 1rem;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 3rem;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}30;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel}70;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}30;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  background-color: white;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel}70;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.neonYellow};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.creamyBeige};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.rustedSteel}50;
    color: ${({ theme }) => theme.colors.rustedSteel};
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  text-align: center;
  background-color: ${({ type, theme }) => 
    type === 'success' ? `${theme.colors.neonYellow}20` : `${theme.colors.brickRed}20`
  };
  color: ${({ type, theme }) => 
    type === 'success' ? theme.colors.asphaltBlack : theme.colors.brickRed
  };
  border: 2px solid ${({ type, theme }) => 
    type === 'success' ? theme.colors.neonYellow : theme.colors.brickRed
  };
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
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

interface FormData {
  name: string;
  description: string;
  roadmapLink: string;
  homepageLink: string;
  additionalResources: string[];
  leadName: string;
  leadEmail: string;
  teamMembers: string[];
}

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
  modificationKey: string;
}

export default function BuilderSubmitProject() {
  const router = useRouter();
  const { key } = router.query;

  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    roadmapLink: '',
    homepageLink: '',
    additionalResources: [''],
    leadName: '',
    leadEmail: '',
    teamMembers: [''],
  });

  useEffect(() => {
    if (key) {
      fetchMemberData(key as string);
    }
  }, [key]);

  const fetchMemberData = async (modificationKey: string) => {
    try {
      const response = await fetch(`/api/builders/${modificationKey}`);
      if (response.ok) {
        const data = await response.json();
        setMemberData(data);
        // Pre-fill with builder's information
        setFormData(prev => ({
          ...prev,
          leadName: data.name || '',
          leadEmail: data.email || '',
        }));
      } else {
        setError('Builder not found');
      }
    } catch (err) {
      setError('Failed to load builder data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (field: 'additionalResources' | 'teamMembers', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const addArrayItem = (field: 'additionalResources' | 'teamMembers') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'additionalResources' | 'teamMembers', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        additionalResources: formData.additionalResources.filter(item => item.trim()),
        teamMembers: formData.teamMembers.filter(item => item.trim()),
        builderId: memberData?.id,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          description: '',
          roadmapLink: '',
          homepageLink: '',
          additionalResources: [''],
          leadName: memberData?.name || '',
          leadEmail: memberData?.email || '',
          teamMembers: [''],
        });
      } else {
        setError(data.error || 'Failed to submit project');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Submit Project - Detroit Commons</title>
        </Head>
        <Container>
          <FormContainer>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading...
            </div>
          </FormContainer>
        </Container>
      </ThemeProvider>
    );
  }

  if (error && !memberData) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Error - Detroit Commons</title>
        </Head>
        <Container>
          <FormContainer>
            <Message type="error">{error}</Message>
            <BackLink href={`/builder/${key}`}>
              ← Back to Dashboard
            </BackLink>
          </FormContainer>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Submit Project - Detroit Commons</title>
        <meta name="description" content="Submit your project to Detroit Commons" />
      </Head>
      <Container>
        <FormContainer>
          <BackLink href={`/builder/${key}`}>
            ← Back to Dashboard
          </BackLink>
          
          <Title>Submit Project</Title>
          <Subtitle>
            Share your project with the Detroit Commons community. This will be associated with your builder profile.
          </Subtitle>

          {success && (
            <Message type="success">
              Project submitted successfully! You can view it in your dashboard.
            </Message>
          )}

          {error && (
            <Message type="error">{error}</Message>
          )}

          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Project Information</SectionTitle>
              
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Clear, short title of your project"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Brief Description *</Label>
                <TextArea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what your project does, its goals, and how it contributes to Detroit's tech ecosystem..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="roadmapLink">MVP Proposal Link *</Label>
                <Input
                  id="roadmapLink"
                  type="url"
                  value={formData.roadmapLink}
                  onChange={(e) => handleInputChange('roadmapLink', e.target.value)}
                  placeholder="Link to your project roadmap, MVP proposal, or detailed plan"
                  required
                />
              </div>

              <div>
                <Label htmlFor="homepageLink">Homepage Link</Label>
                <Input
                  id="homepageLink"
                  type="url"
                  value={formData.homepageLink}
                  onChange={(e) => handleInputChange('homepageLink', e.target.value)}
                  placeholder="Link to your project's homepage, demo, or landing page"
                />
              </div>
            </FormSection>

            <FormSection>
              <SectionTitle>Additional Resources</SectionTitle>
              <p style={{ color: theme.colors.rustedSteel, fontSize: '0.9rem', marginBottom: '1rem' }}>
                Add any relevant links (GitHub repos, documentation, videos, etc.)
              </p>
              
              {formData.additionalResources.map((resource, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Input
                    type="url"
                    value={resource}
                    onChange={(e) => handleArrayInputChange('additionalResources', index, e.target.value)}
                    placeholder="https://example.com"
                  />
                  {formData.additionalResources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('additionalResources', index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: theme.colors.brickRed,
                        cursor: 'pointer',
                        padding: '0.5rem',
                        fontSize: '1.2rem',
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('additionalResources')}
                style={{
                  background: 'none',
                  border: `2px dashed ${theme.colors.rustedSteel}50`,
                  color: theme.colors.rustedSteel,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: theme.fonts.body,
                }}
              >
                + Add Resource
              </button>
            </FormSection>

            <FormSection>
              <SectionTitle>Team Information</SectionTitle>
              
              <div>
                <Label htmlFor="leadName">Project Lead Name *</Label>
                <Input
                  id="leadName"
                  type="text"
                  value={formData.leadName}
                  onChange={(e) => handleInputChange('leadName', e.target.value)}
                  placeholder="Your name as project lead"
                  required
                />
              </div>

              <div>
                <Label htmlFor="leadEmail">Project Lead Email *</Label>
                <Input
                  id="leadEmail"
                  type="email"
                  value={formData.leadEmail}
                  onChange={(e) => handleInputChange('leadEmail', e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <Label>Team Members</Label>
                <p style={{ color: theme.colors.rustedSteel, fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Add other team members (optional)
                </p>
                
                {formData.teamMembers.map((member, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Input
                      type="text"
                      value={member}
                      onChange={(e) => handleArrayInputChange('teamMembers', index, e.target.value)}
                      placeholder="Team member name or email"
                    />
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('teamMembers', index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: theme.colors.brickRed,
                          cursor: 'pointer',
                          padding: '0.5rem',
                          fontSize: '1.2rem',
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addArrayItem('teamMembers')}
                  style={{
                    background: 'none',
                    border: `2px dashed ${theme.colors.rustedSteel}50`,
                    color: theme.colors.rustedSteel,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.body,
                  }}
                >
                  + Add Team Member
                </button>
              </div>
            </FormSection>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </ThemeProvider>
  );
}
