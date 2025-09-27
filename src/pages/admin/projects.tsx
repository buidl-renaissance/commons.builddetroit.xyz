import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem 1rem;
`;

const Header = styled.div`
  max-width: 1400px;
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
  font-size: 1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ProjectsList = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(34, 35, 36, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.colors.rustedSteel}20;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel}20;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  vertical-align: top;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  
  ${({ status, theme }) => {
    switch (status) {
      case 'draft':
        return `
          background-color: #fff3cd;
          color: #856404;
        `;
      case 'submitted':
        return `
          background-color: #d1ecf1;
          color: #0c5460;
        `;
      case 'approved':
        return `
          background-color: #d4edda;
          color: #155724;
        `;
      case 'rejected':
        return `
          background-color: #f8d7da;
          color: #721c24;
        `;
      case 'in_review':
        return `
          background-color: #e2e3e5;
          color: #383d41;
        `;
      default:
        return `
          background-color: ${theme.colors.rustedSteel}20;
          color: ${theme.colors.rustedSteel};
        `;
    }
  }}
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0.25rem;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.neonOrange};
          color: ${theme.colors.creamyBeige};
          &:hover {
            background-color: ${theme.colors.neonYellow};
            color: ${theme.colors.asphaltBlack};
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.brickRed};
          color: ${theme.colors.creamyBeige};
          &:hover {
            background-color: #dc3545;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.rustedSteel};
          color: ${theme.colors.creamyBeige};
          &:hover {
            background-color: ${theme.colors.rustedSteel}80;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ProjectName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ProjectLead = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
`;

const ProjectDescription = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel}20;
`;

const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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

const Select = styled.select`
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
`;

const ModalFooter = styled.div`
  padding: 1rem 2rem 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
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
  modificationKey: string;
  builderId?: number;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [reviewData, setReviewData] = useState({
    status: '',
    reviewNotes: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      setProjects(data.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewProject = (project: Project) => {
    setSelectedProject(project);
    setReviewData({
      status: project.status,
      reviewNotes: project.reviewNotes || ''
    });
    setShowModal(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedProject) return;

    setActionLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/projects/${selectedProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: reviewData.status,
          reviewNotes: reviewData.reviewNotes,
          reviewedBy: 'admin@commons.builddetroit.xyz', // TODO: Get from auth context
          reviewedAt: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project status');
      }

      setSuccess(`Project "${selectedProject.name}" status updated successfully!`);
      setShowModal(false);
      setSelectedProject(null);
      setReviewData({ status: '', reviewNotes: '' });
      
      // Refresh projects list
      fetchProjects();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setReviewData({ status: '', reviewNotes: '' });
    setError('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusCounts = () => {
    const counts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: projects.length,
      draft: counts.draft || 0,
      submitted: counts.submitted || 0,
      in_review: counts.in_review || 0,
      approved: counts.approved || 0,
      rejected: counts.rejected || 0
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Manage Projects - Detroit Commons</title>
        <meta name="description" content="Admin panel for managing submitted projects" />
      </Head>

      <Container>
        <Header>
          <Title>Manage Projects</Title>
          <Subtitle>
            Review and manage all submitted projects from the Detroit Commons community.
          </Subtitle>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        {loading ? (
          <LoadingState>Loading projects...</LoadingState>
        ) : (
          <ProjectsList>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--color-rusted-steel)20',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-asphalt-black)',
                margin: '0',
                fontSize: '1.5rem'
              }}>
                Project Submissions ({statusCounts.total})
              </h2>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-rusted-steel)' }}>
                <span>Draft: {statusCounts.draft}</span>
                <span>Submitted: {statusCounts.submitted}</span>
                <span>In Review: {statusCounts.in_review}</span>
                <span>Approved: {statusCounts.approved}</span>
                <span>Rejected: {statusCounts.rejected}</span>
              </div>
            </div>

            <Table>
              <thead>
                <tr>
                  <TableHeader>Project</TableHeader>
                  <TableHeader>Lead</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Submitted</TableHeader>
                  <TableHeader>Reviewed</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <TableCell>
                      <ProjectName>{project.name}</ProjectName>
                      <ProjectDescription>{project.description}</ProjectDescription>
                    </TableCell>
                    <TableCell>
                      <div>{project.leadName}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-rusted-steel)' }}>
                        {project.leadEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={project.status}>
                        {project.status.replace('_', ' ')}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      {project.submittedAt ? formatDate(project.submittedAt) : '-'}
                    </TableCell>
                    <TableCell>
                      {project.reviewedAt ? (
                        <div>
                          <div>{formatDate(project.reviewedAt)}</div>
                          {project.reviewedBy && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-rusted-steel)' }}>
                              by {project.reviewedBy}
                            </div>
                          )}
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <ActionButton 
                        variant="primary" 
                        onClick={() => handleReviewProject(project)}
                      >
                        Review
                      </ActionButton>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ProjectsList>
        )}

        {showModal && selectedProject && (
          <ModalOverlay onClick={handleCloseModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Review Project: {selectedProject.name}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>Project Details</Label>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: 'var(--color-creamy-beige)40',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    <div><strong>Lead:</strong> {selectedProject.leadName} ({selectedProject.leadEmail})</div>
                    <div><strong>Description:</strong> {selectedProject.description}</div>
                    {selectedProject.roadmapLink && (
                      <div><strong>Roadmap:</strong> <a href={selectedProject.roadmapLink} target="_blank" rel="noopener noreferrer">{selectedProject.roadmapLink}</a></div>
                    )}
                    {selectedProject.homepageLink && (
                      <div><strong>Homepage:</strong> <a href={selectedProject.homepageLink} target="_blank" rel="noopener noreferrer">{selectedProject.homepageLink}</a></div>
                    )}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    id="status"
                    value={reviewData.status}
                    onChange={(e) => setReviewData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                    <option value="in_review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="reviewNotes">Review Notes</Label>
                  <TextArea
                    id="reviewNotes"
                    value={reviewData.reviewNotes}
                    onChange={(e) => setReviewData(prev => ({ ...prev, reviewNotes: e.target.value }))}
                    placeholder="Add any notes about your review decision..."
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <ActionButton onClick={handleCloseModal}>
                  Cancel
                </ActionButton>
                <ActionButton 
                  variant="primary" 
                  onClick={handleStatusUpdate}
                  disabled={actionLoading || !reviewData.status}
                >
                  {actionLoading ? 'Updating...' : 'Update Status'}
                </ActionButton>
              </ModalFooter>
            </Modal>
          </ModalOverlay>
        )}
      </Container>
    </ThemeProvider>
  );
}
