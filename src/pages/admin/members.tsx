import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import AdminLayout from '@/components/AdminLayout';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
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
  margin: 0;
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.creamyBeige};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel};
  }
`;

const MembersTable = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(34, 35, 36, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  border-bottom: 2px solid ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.9rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamyBeige};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.creamyBeige};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  display: flex;
  align-items: center;
`;

const MemberAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neonOrange};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1rem;
`;

const MemberName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const MemberEmail = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  opacity: 0.7;
  font-weight: 500;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background-color: ${({ theme }) => theme.colors.creamyBeige};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const JoinDate = styled.div`
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.9rem;
  opacity: 0.7;
  font-weight: 500;
`;

const ViewButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.neonOrange};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.asphaltBlack};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  margin: 0;
`;

interface Member {
  id: number;
  name: string;
  email: string;
  skills: string;
  createdAt: string;
}

const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm]);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/builders');
      const result = await response.json();
      
      if (result.success) {
        setMembers(result.builders);
      } else {
        console.error('Failed to fetch members:', result.error);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
      return;
    }

    const filtered = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.skills && member.skills.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredMembers(filtered);
  };

  const parseSkills = (skillsString: string | null): string[] => {
    if (!skillsString) return [];
    try {
      return JSON.parse(skillsString);
    } catch {
      return [];
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Container>
          <LoadingSpinner>Loading members...</LoadingSpinner>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Members - Admin</title>
        <meta name="description" content="Manage Commons community members" />
      </Head>
      
      <Container>
        <Header>
          <Title>Members</Title>
          <Subtitle>Manage Commons community members</Subtitle>
        </Header>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search members by name, email, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        {filteredMembers.length === 0 ? (
          <EmptyState>
            <EmptyIcon>👥</EmptyIcon>
            <EmptyTitle>No members found</EmptyTitle>
            <EmptyDescription>
              {searchTerm ? 'Try adjusting your search terms.' : 'No members have joined yet.'}
            </EmptyDescription>
          </EmptyState>
        ) : (
          <MembersTable>
            <TableHeader>
              <div>Member</div>
              <div>Skills</div>
              <div>Joined</div>
              <div>Actions</div>
            </TableHeader>
            
            {filteredMembers.map((member) => {
              const skills = parseSkills(member.skills);
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <MemberAvatar>
                      {getInitials(member.name)}
                    </MemberAvatar>
                    <div>
                      <MemberName>{member.name}</MemberName>
                      <MemberEmail>{member.email}</MemberEmail>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <SkillsList>
                      {skills.length > 0 ? (
                        skills.slice(0, 3).map((skill, index) => (
                          <SkillTag key={index}>{skill}</SkillTag>
                        ))
                      ) : (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>No skills listed</span>
                      )}
                      {skills.length > 3 && (
                        <SkillTag>+{skills.length - 3} more</SkillTag>
                      )}
                    </SkillsList>
                  </TableCell>
                  
                  <TableCell>
                    <JoinDate>{formatDate(member.createdAt)}</JoinDate>
                  </TableCell>
                  
                  <TableCell>
                    <ViewButton href={`/builder/${member.id}`}>
                      View Profile
                    </ViewButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </MembersTable>
        )}
      </Container>
    </AdminLayout>
  );
};

export default AdminMembers;
