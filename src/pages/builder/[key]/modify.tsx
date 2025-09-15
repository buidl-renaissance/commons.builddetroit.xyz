import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import ProfileImageUpload from '../../../components/ProfileImageUpload';

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

const ModifyForm = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  padding: 3rem;
`;

const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FormSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1rem;
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
  min-height: 100px;
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

const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
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

interface BuilderData {
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

export default function ModifyBuilderPage() {
  const router = useRouter();
  const { key } = router.query;
  
  const [builderData, setBuilderData] = useState<BuilderData | null>(null);
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

  // Fetch builder data
  useEffect(() => {
    if (key) {
      fetchBuilderData(key as string);
    }
  }, [key]);

  const fetchBuilderData = async (modificationKey: string) => {
    try {
      const response = await fetch(`/api/builders/${modificationKey}`);
      if (response.ok) {
        const data = await response.json();
        setBuilderData(data);
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          skills: data.skills || '',
          website: data.website || '',
          linkedin: data.linkedin || '',
          github: data.github || '',
          twitter: data.twitter || '',
          instagram: data.instagram || '',
          otherLinks: data.other_links || '',
          profilePicture: data.profilePicture || '',
        });
        setProfilePictureUrl(data.profilePicture || '');
      } else {
        setError('Invalid modification key. Please check the URL and try again.');
      }
    } catch (err) {
      setError('Failed to load builder data. Please try again.');
    }
  };

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

    try {
      const response = await fetch(`/api/builders/${key}`, {
        method: 'PUT',
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
        setBuilderData(prev => prev ? { ...prev, ...formData, profilePicture: profilePictureUrl } : null);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error && !builderData) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Error - Detroit Commons</title>
          <meta name="description" content="Invalid modification key" />
        </Head>
        <Container>
          <Header>
            <Title>Error</Title>
            <Subtitle>We couldn&apos;t load your builder information.</Subtitle>
          </Header>
          <ModifyForm>
            <Message>{error}</Message>
            <BackLink href="/builders">
              ← Back to Builders
            </BackLink>
          </ModifyForm>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Modify Profile - Detroit Commons</title>
        <meta name="description" content="Modify your builder profile" />
      </Head>
      <Container>
        <Header>
          <Title>Modify Profile</Title>
          <Subtitle>
            Update your builder profile information, skills, and social links.
          </Subtitle>
        </Header>

        <ModifyForm>
          <FormTitle>Update Your Profile</FormTitle>
          <FormSubtitle>
            Keep your information current so other builders can connect with you.
          </FormSubtitle>

          <BackLink href={`/builder/${key}`}>
            ← Back to Builder Dashboard
          </BackLink>

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
                <Label htmlFor="bio">Bio</Label>
                <TextArea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself, your background, and what you're working on..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
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
            {success && <Message success>Profile updated successfully!</Message>}

            <Button type="submit" primary disabled={loading}>
              {loading ? 'Updating Profile...' : 'Update Profile'}
            </Button>
          </Form>
        </ModifyForm>
      </Container>
    </ThemeProvider>
  );
}
