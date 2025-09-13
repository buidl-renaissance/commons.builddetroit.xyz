import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import ProfileImageUpload from '@/components/ProfileImageUpload';

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

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LinkInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.brickRed};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
    
  &:hover {
    background-color: ${({ theme }) => theme.colors.brickRed}dd;
  }
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.rustedSteel};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.rustedSteel}dd;
  }
`;

const SubmitButton = styled.button`
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

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.rustedSteel};
    color: ${({ theme }) => theme.colors.creamyBeige};
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
  background-color: #10B98120;
  color: #059669;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #059669;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 1rem;
`;


interface FormData {
  name: string;
  email: string;
  bio: string;
  profilePicture: string; // Now stores URL instead of File
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  otherLinks: string[];
}

export default function JoinBuilders() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
    otherLinks: [''],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileImageChange = (url: string) => {
    setFormData(prev => ({ ...prev, profilePicture: url }));
  };

  const handleProfileImageError = (error: string) => {
    setError(error);
  };

  const handleOtherLinksChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      otherLinks: prev.otherLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const addOtherLink = () => {
    setFormData(prev => ({
      ...prev,
      otherLinks: [...prev.otherLinks, '']
    }));
  };

  const removeOtherLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      otherLinks: prev.otherLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Filter out empty strings from other links
      const cleanedData = {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        profilePicture: formData.profilePicture, // Already uploaded, just pass the URL
        website: formData.website,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
        instagram: formData.instagram,
        otherLinks: formData.otherLinks.filter(link => link.trim()),
      };

      const response = await fetch('/api/builders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit builder profile');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        bio: '',
        profilePicture: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
        instagram: '',
        otherLinks: [''],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Join Builders - Detroit Commons</title>
        <meta name="description" content="Join the Detroit Commons community of builders" />
      </Head>

      <Container>
        <FormContainer>
          <Title>Join the Builders</Title>
          <Subtitle>
            Connect with Detroit&apos;s creative and technical community. Share your profile, 
            showcase your experience, and help strengthen our local ecosystem with global impact.
          </Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              <strong>🎉 Welcome to the builders community!</strong>
              <br /><br />
              Your profile has been submitted successfully. You&apos;re now part of Detroit&apos;s 
              open commons community.
              <br /><br />
              <Link href="/builders" style={{ color: '#059669', textDecoration: 'underline', fontWeight: '600' }}>
                View all builders →
              </Link>
            </SuccessMessage>
          )}

          {!success && (
            <Form onSubmit={handleSubmit}>
            {/* Profile Picture at the top */}
            <ProfileImageUpload
              label="Profile Picture"
              value={formData.profilePicture}
              onChange={handleProfileImageChange}
              onError={handleProfileImageError}
              required={false}
              maxSize={5}
            />

            <FormSection>
              <SectionTitle>Basic Information</SectionTitle>
              
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio / Experience *</Label>
                <TextArea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself, your background, skills, and what you're passionate about building..."
                  required
                />
              </div>
            </FormSection>

            <FormSection>
              <SectionTitle>Professional Links</SectionTitle>
              
              <div>
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <Input
                  id="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter/X Profile</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram Profile</Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              <div>
                <Label>Other Links (Portfolio, Blog, etc.)</Label>
                <LinksContainer>
                  {formData.otherLinks.map((link, index) => (
                    <LinkInput key={index}>
                      <Input
                        type="url"
                        value={link}
                        onChange={(e) => handleOtherLinksChange(index, e.target.value)}
                        placeholder="https://..."
                        style={{ flex: 1 }}
                      />
                      {formData.otherLinks.length > 1 && (
                        <RemoveButton
                          type="button"
                          onClick={() => removeOtherLink(index)}
                        >
                          Remove
                        </RemoveButton>
                      )}
                    </LinkInput>
                  ))}
                  <AddButton
                    type="button"
                    onClick={addOtherLink}
                  >
                    Add Link
                  </AddButton>
                </LinksContainer>
              </div>
            </FormSection>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join the Builders'}
            </SubmitButton>
          </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
}
