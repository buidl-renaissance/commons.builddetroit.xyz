import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import ProfileImageUpload from '../../../components/ProfileImageUpload';

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
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-align: center;
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

const Button = styled.button<{ primary?: boolean }>`
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
  width: 100%;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.creamyBeige};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.rustedSteel};
    color: ${({ theme }) => theme.colors.creamyBeige};
    cursor: not-allowed;
    transform: none;
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


interface FormData {
  name: string;
  bio: string;
  skills: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  otherLinks: string;
  profilePicture: string;
}

interface Invitation {
  id: number;
  email: string;
  name: string;
  bio: string;
  skills: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  other_links: string;
  profilePicture: string;
  invitationToken: string;
  status: string;
  invitedBy: string;
  expiresAt: string;
}

export default function AcceptInvitationPage() {
  const router = useRouter();
  const { token } = router.query;
  
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    skills: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
    otherLinks: '',
    profilePicture: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const fetchInvitation = useCallback(async (invitationToken: string) => {
    try {
      const response = await fetch(`/api/invitations/${invitationToken}`);
      if (response.ok) {
        const data = await response.json();
        setInvitation(data.invitation);
        
        // Pre-fill form with invitation data
        setFormData({
          name: data.invitation.name || '',
          bio: data.invitation.bio || '',
          skills: data.invitation.skills || '',
          website: data.invitation.website || '',
          linkedin: data.invitation.linkedin || '',
          github: data.invitation.github || '',
          twitter: data.invitation.twitter || '',
          instagram: data.invitation.instagram || '',
          otherLinks: data.invitation.other_links || '',
          profilePicture: data.invitation.profilePicture || '',
        });
        setProfilePictureUrl(data.invitation.profilePicture || '');
      } else {
        setError('Invalid or expired invitation. Please check the link and try again.');
      }
    } catch (err) {
      setError('Failed to load invitation. Please try again.');
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchInvitation(token as string);
    }
  }, [token, fetchInvitation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleProfileImageChange = (url: string) => {
    setProfilePictureUrl(url);
  };

  const handleProfileImageError = (error: string) => {
    setError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (!formData.bio.trim()) {
      setError('Bio is required');
      setLoading(false);
      return;
    }

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

      if (data.success) {
        setSuccess(true);
        // Redirect to builder dashboard after 3 seconds
        setTimeout(() => {
          router.push(`/builder/${data.member.modificationKey}`);
        }, 3000);
      } else {
        setError(data.message || 'Failed to accept invitation');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to Detroit Builders! - Detroit Commons</title>
          <meta name="description" content="Successfully joined Detroit Builders" />
        </Head>
        <Container>
          <FormContainer>
            <Title>Welcome to Detroit Builders! 🎉</Title>
            <Subtitle>
              You&apos;ve successfully joined our builder community. You&apos;ll be redirected to your builder dashboard in a few seconds.
            </Subtitle>
            <Button onClick={() => router.push('/builders')}>
              Continue to Builders
            </Button>
          </FormContainer>
        </Container>
      </ThemeProvider>
    );
  }

  if (error && !invitation) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Invalid Invitation - Detroit Commons</title>
          <meta name="description" content="Invalid or expired invitation" />
        </Head>
        <Container>
          <FormContainer>
            <Title>Invalid Invitation</Title>
            <Message>{error}</Message>
          </FormContainer>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Accept Invitation - Detroit Commons</title>
        <meta name="description" content="Accept your invitation to join Detroit Builders" />
      </Head>
      <Container>
        <FormContainer>
          <Title>Accept Invitation</Title>
          <Subtitle>
            You&apos;ve been invited to join Detroit&apos;s builder community! Complete your profile below to get started.
          </Subtitle>


          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Profile Picture</SectionTitle>
              <ProfileImageUpload
                value={profilePictureUrl}
                onChange={handleProfileImageChange}
                onError={handleProfileImageError}
                label="Upload a profile picture"
              />
            </FormSection>

            <FormSection>
              <SectionTitle>Basic Information</SectionTitle>
              
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio *</Label>
                <TextArea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself, your background, and what you're working on..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="e.g., React, Python, Design, Marketing"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
              </div>
            </FormSection>

            <FormSection>
              <SectionTitle>Links & Social Media</SectionTitle>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  type="url"
                  id="github"
                  name="github"
                  placeholder="https://github.com/yourusername"
                  value={formData.github}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  type="url"
                  id="twitter"
                  name="twitter"
                  placeholder="https://twitter.com/yourusername"
                  value={formData.twitter}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  type="url"
                  id="instagram"
                  name="instagram"
                  placeholder="https://instagram.com/yourusername"
                  value={formData.instagram}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="otherLinks">Other Links</Label>
                <TextArea
                  id="otherLinks"
                  name="otherLinks"
                  placeholder="Any other relevant links (one per line)"
                  value={formData.otherLinks}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </FormSection>

            {error && <Message>{error}</Message>}

            <Button type="submit" primary disabled={loading}>
              {loading ? 'Accepting Invitation...' : 'Accept Invitation'}
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </ThemeProvider>
  );
}
