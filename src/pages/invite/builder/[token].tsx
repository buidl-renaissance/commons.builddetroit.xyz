import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import ProfileImageUpload from '@/components/ProfileImageUpload';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem 1rem;
`;

const Card = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  display: block;
  line-height: 1.4;
`;

const Input = styled.input`
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}60;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.rustedSteel}80;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel}CC;
  }
`;

const TextArea = styled.textarea`
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}60;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.rustedSteel}80;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel}CC;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SkillTag = styled.span`
  background-color: ${({ theme }) => theme.colors.neonOrange}20;
  color: ${({ theme }) => theme.colors.neonOrange};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: white;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.neonYellow};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.creamyBeige};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.rustedSteel}40;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.brickRed}20;
  color: ${({ theme }) => theme.colors.brickRed};
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid ${({ theme }) => theme.colors.brickRed};
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #28a745;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
`;


interface Invitation {
  id: number;
  email: string;
  name?: string;
  bio?: string;
  skills: string[];
  profilePicture?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  other_links: string[];
  expiresAt: string;
}

export default function InviteBuilder() {
  const router = useRouter();
  const { token } = router.query;
  
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: [] as string[],
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
    other_links: [] as string[]
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  const fetchInvitation = useCallback(async () => {
    try {
      const response = await fetch(`/api/invitations/${token}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch invitation');
      }
      
      setInvitation(data.invitation);
      
      // Pre-fill form with invitation data
      setFormData({
        name: data.invitation.name || '',
        bio: data.invitation.bio || '',
        skills: data.invitation.skills || [],
        website: data.invitation.website || '',
        linkedin: data.invitation.linkedin || '',
        github: data.invitation.github || '',
        twitter: data.invitation.twitter || '',
        instagram: data.invitation.instagram || '',
        other_links: data.invitation.other_links || []
      });
      
      // Set profile picture URL if provided
      if (data.invitation.profilePicture) {
        setProfilePictureUrl(data.invitation.profilePicture);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token && typeof token === 'string') {
      fetchInvitation();
    }
  }, [token, fetchInvitation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleProfileImageChange = (url: string) => {
    setProfilePictureUrl(url);
  };

  const handleProfileImageError = (error: string) => {
    setError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/invitations/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profilePicture: profilePictureUrl
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to accept invitation');
      }

      setSuccess(true);
      
      // Redirect to builders page after 3 seconds
      setTimeout(() => {
        router.push('/builders');
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Accept Invitation - Detroit Commons</title>
        </Head>
        <Container>
          <LoadingMessage>Loading invitation...</LoadingMessage>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Invitation Error - Detroit Commons</title>
        </Head>
        <Container>
          <Card>
            <ErrorMessage>{error}</ErrorMessage>
          </Card>
        </Container>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Head>
          <title>Welcome to Detroit Builders! - Detroit Commons</title>
        </Head>
        <Container>
          <Card>
            <SuccessMessage>
              🎉 Welcome to Detroit Builders! Your profile has been created successfully. 
              You&apos;ll be redirected to the builders page in a moment.
            </SuccessMessage>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Accept Invitation - Detroit Commons</title>
        <meta name="description" content="Accept your invitation to join Detroit Builders" />
      </Head>

      <Container>
        <Card>
          <Header>
            <Title>Join Detroit Builders</Title>
            <Subtitle>
              You&apos;ve been invited to join our builder community! Complete your profile below to get started.
            </Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <ProfileImageUpload
              label="Profile Picture"
              value={profilePictureUrl}
              onChange={handleProfileImageChange}
              onError={handleProfileImageError}
              required={false}
              maxSize={5}
            />

            <FormSection>
              <SectionTitle>Basic Information</SectionTitle>
              
              <FormGroup>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <TextArea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself, your interests, and what you're building..."
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Skills & Expertise</SectionTitle>
              
              <FormGroup>
                <Label htmlFor="skills">Skills</Label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} style={{ margin: 0, padding: '0.8rem 1rem' }}>
                    Add
                  </Button>
                </div>
                <SkillsContainer>
                  {formData.skills.map((skill, index) => (
                    <SkillTag key={index} onClick={() => removeSkill(skill)}>
                      {skill} ×
                    </SkillTag>
                  ))}
                </SkillsContainer>
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>Professional Links</SectionTitle>
              
              <FormGroup>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/yourusername"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/yourusername"
                />
              </FormGroup>
            </FormSection>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating Profile...' : 'Accept Invitation & Join'}
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
