import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

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

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfilePictureUpload = styled.div<{ hasImage: boolean }>`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px dashed ${({ theme, hasImage }) => hasImage ? theme.colors.neonOrange : theme.colors.rustedSteel}60;
  background: ${({ theme, hasImage }) => hasImage ? 'transparent' : `${theme.colors.creamyBeige}40`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    border-style: solid;
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(255, 79, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfilePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel}80;
  margin-bottom: 0.5rem;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-align: center;
  margin-top: 0.5rem;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${ProfilePictureUpload}:hover & {
    opacity: 1;
  }
`;

interface FormData {
  name: string;
  email: string;
  bio: string;
  profilePicture: File | null;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  otherLinks: string[];
}

export default function JoinBuilders() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bio: '',
    profilePicture: null,
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    otherLinks: [''],
  });

  const [profilePreview, setProfilePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, profilePicture: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      setError('');
    }
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
      let profilePictureUrl = '';
      
      // Upload profile picture if one is selected
      if (formData.profilePicture) {
        // Convert file to base64 for upload API
        const reader = new FileReader();
        const base64Data = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(formData.profilePicture!);
        });

        // Upload the file using the upload API
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
            fileName: `profile-${Date.now()}.${formData.profilePicture.name.split('.').pop()}`,
            fileType: formData.profilePicture.type,
            folder: 'profiles'
          }),
        });

        const uploadResult = await uploadResponse.json();
        
        if (!uploadResponse.ok || !uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload profile picture');
        }

        profilePictureUrl = uploadResult.url;
      }

      // Filter out empty strings from other links
      const cleanedData = {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        profilePicture: profilePictureUrl,
        website: formData.website,
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
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
        profilePicture: null,
        website: '',
        linkedin: '',
        github: '',
        twitter: '',
        otherLinks: [''],
      });
      setProfilePreview('');
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
              <a href="/builders" style={{ color: '#059669', textDecoration: 'underline', fontWeight: '600' }}>
                View all builders →
              </a>
            </SuccessMessage>
          )}

          {!success && (
            <Form onSubmit={handleSubmit}>
            {/* Profile Picture at the top */}
            <ProfilePictureContainer>
              <ProfilePictureUpload hasImage={!!profilePreview} onClick={() => document.getElementById('profilePictureInput')?.click()}>
                <HiddenFileInput
                  id="profilePictureInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                
                {profilePreview ? (
                  <>
                    <ProfileImage src={profilePreview} alt="Profile preview" />
                    <ImageOverlay>Change Photo</ImageOverlay>
                  </>
                ) : (
                  <ProfilePlaceholder>
                    <UploadIcon>📷</UploadIcon>
                    <div>Click to upload</div>
                  </ProfilePlaceholder>
                )}
              </ProfilePictureUpload>
              
              <UploadText>
                {profilePreview ? 'Click to change your profile picture' : 'Upload a profile picture (max 5MB)'}
              </UploadText>
            </ProfilePictureContainer>

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
