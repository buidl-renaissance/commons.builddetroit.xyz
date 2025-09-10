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

const MilestonesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MilestoneInput = styled.div`
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
  description: string;
  roadmapLink: string;
  homepageLink: string;
  additionalResources: string[];
  leadName: string;
  leadEmail: string;
  teamMembers: string[];
}

export default function SubmitProject() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'additionalResources' | 'teamMembers', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'additionalResources' | 'teamMembers') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'additionalResources' | 'teamMembers', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
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
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit project');
      }

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        roadmapLink: '',
        homepageLink: '',
        additionalResources: [''],
        leadName: '',
        leadEmail: '',
        teamMembers: [''],
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
        <title>Submit Project - Detroit Commons</title>
        <meta name="description" content="Submit your project to the Detroit Commons community" />
      </Head>

      <Container>
        <FormContainer>
          <Title>Project Submission</Title>
          <Subtitle>
            Share your project with the Detroit Commons community. Tell us about your vision, 
            roadmap, and how you&apos;re contributing to our local ecosystem with global impact.
          </Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              <strong>🎉 Project submitted successfully!</strong>
              <br /><br />
              <a href="/submissions" style={{ color: '#059669', textDecoration: 'underline' }}>
                View all submissions →
              </a>
            </SuccessMessage>
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
                  placeholder="2–3 sentences on what it is, why it matters, and who it serves"
                  required
                />
              </div>
            </FormSection>


            <FormSection>
              <SectionTitle>Links</SectionTitle>
              
              <div>
                <Label htmlFor="homepageLink">Homepage / Marketing Page</Label>
                <Input
                  id="homepageLink"
                  type="url"
                  value={formData.homepageLink}
                  onChange={(e) => handleInputChange('homepageLink', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label htmlFor="roadmapLink">MVP Proposal for Open October *</Label>
                <Input
                  id="roadmapLink"
                  type="url"
                  value={formData.roadmapLink}
                  onChange={(e) => handleInputChange('roadmapLink', e.target.value)}
                  placeholder="Link to your MVP roadmap/proposal for 4-week completion"
                  required
                />
              </div>

              <div>
                <Label>Additional Resources (GitHub, Figma, etc.)</Label>
                <MilestonesContainer>
                  {formData.additionalResources.map((resource, index) => (
                    <MilestoneInput key={index}>
                      <Input
                        type="url"
                        value={resource}
                        onChange={(e) => handleArrayChange('additionalResources', index, e.target.value)}
                        placeholder="https://..."
                        style={{ flex: 1 }}
                      />
                      {formData.additionalResources.length > 1 && (
                        <RemoveButton
                          type="button"
                          onClick={() => removeArrayItem('additionalResources', index)}
                        >
                          Remove
                        </RemoveButton>
                      )}
                    </MilestoneInput>
                  ))}
                  <AddButton
                    type="button"
                    onClick={() => addArrayItem('additionalResources')}
                  >
                    Add Resource
                  </AddButton>
                </MilestonesContainer>
              </div>
            </FormSection>

            <FormSection>
              <SectionTitle>Collaborators</SectionTitle>
              
              <div>
                <Label htmlFor="leadName">Lead Name *</Label>
                <Input
                  id="leadName"
                  type="text"
                  value={formData.leadName}
                  onChange={(e) => handleInputChange('leadName', e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="leadEmail">Lead Email *</Label>
                <Input
                  id="leadEmail"
                  type="email"
                  value={formData.leadEmail}
                  onChange={(e) => handleInputChange('leadEmail', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <Label>Team Members / Collaborators</Label>
                <MilestonesContainer>
                  {formData.teamMembers.map((member, index) => (
                    <MilestoneInput key={index}>
                      <Input
                        type="text"
                        value={member}
                        onChange={(e) => handleArrayChange('teamMembers', index, e.target.value)}
                        placeholder="Team member name"
                        style={{ flex: 1 }}
                      />
                      {formData.teamMembers.length > 1 && (
                        <RemoveButton
                          type="button"
                          onClick={() => removeArrayItem('teamMembers', index)}
                        >
                          Remove
                        </RemoveButton>
                      )}
                    </MilestoneInput>
                  ))}
                  <AddButton
                    type="button"
                    onClick={() => addArrayItem('teamMembers')}
                  >
                    Add Team Member
                  </AddButton>
                </MilestonesContainer>
              </div>
            </FormSection>


            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}
