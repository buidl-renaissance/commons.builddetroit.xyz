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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(34, 35, 36, 0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.neonOrange};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(34, 35, 36, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  opacity: 0.8;
`;

const QuickActions = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled(Link)`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(34, 35, 36, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(34, 35, 36, 0.15);
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActionDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const RecentActivity = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(34, 35, 36, 0.1);
`;

const ActivityList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamyBeige};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  width: 40px;
  text-align: center;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ActivityMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.9rem;
  opacity: 0.7;
  font-weight: 500;
`;

const ActivityDate = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.8rem;
  margin-left: 1rem;
  opacity: 0.6;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.rustedSteel};
`;

interface DashboardData {
  summary: {
    totalMembers: number;
    pendingProjects: number;
    pendingExpenses: number;
    activeInvitations: number;
  };
  breakdown: {
    projects: Array<{ status: string; count: number }>;
    expenses: Array<{ payoutStatus: string; count: number }>;
    invitations: Array<{ status: string; count: number }>;
  };
  recentActivity: Array<{
    id: number;
    type: string;
    date: string;
    [key: string]: any;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        console.error('Failed to fetch dashboard data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return '🚀';
      case 'expense': return '💰';
      case 'invitation': return '📧';
      default: return '📄';
    }
  };

  const formatActivityTitle = (item: any) => {
    switch (item.type) {
      case 'project':
        return `${item.name} (${item.status})`;
      case 'expense':
        return `${item.title} (${item.payoutStatus})`;
      case 'invitation':
        return `Invitation to ${item.email} (${item.status})`;
      default:
        return 'Unknown activity';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <Container>
          <LoadingSpinner>Loading dashboard...</LoadingSpinner>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - Commons</title>
        <meta name="description" content="Admin dashboard for Commons management" />
      </Head>
      
      <Container>
        <Header>
          <Title>Admin Dashboard</Title>
          <Subtitle>Overview of Commons management system</Subtitle>
        </Header>

        {dashboardData && (
          <>
            <StatsGrid>
              <StatCard>
                <StatIcon>👥</StatIcon>
                <StatValue>{dashboardData.summary.totalMembers}</StatValue>
                <StatLabel>Total Members</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatIcon>🚀</StatIcon>
                <StatValue>{dashboardData.summary.pendingProjects}</StatValue>
                <StatLabel>Pending Projects</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatIcon>💰</StatIcon>
                <StatValue>{dashboardData.summary.pendingExpenses}</StatValue>
                <StatLabel>Pending Expenses</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatIcon>📧</StatIcon>
                <StatValue>{dashboardData.summary.activeInvitations}</StatValue>
                <StatLabel>Active Invitations</StatLabel>
              </StatCard>
            </StatsGrid>

            <QuickActions>
              <SectionTitle>Quick Actions</SectionTitle>
              <ActionGrid>
                <ActionCard href="/admin/projects">
                  <ActionIcon>🚀</ActionIcon>
                  <ActionTitle>Manage Projects</ActionTitle>
                  <ActionDescription>Review and manage project submissions</ActionDescription>
                </ActionCard>
                
                <ActionCard href="/admin/expenses">
                  <ActionIcon>💰</ActionIcon>
                  <ActionTitle>Manage Expenses</ActionTitle>
                  <ActionDescription>Approve and process expense requests</ActionDescription>
                </ActionCard>
                
                <ActionCard href="/admin/invitations">
                  <ActionIcon>📧</ActionIcon>
                  <ActionTitle>Manage Invitations</ActionTitle>
                  <ActionDescription>Send and track builder invitations</ActionDescription>
                </ActionCard>
                
                <ActionCard href="/admin/members">
                  <ActionIcon>👥</ActionIcon>
                  <ActionTitle>View Members</ActionTitle>
                  <ActionDescription>Browse and manage community members</ActionDescription>
                </ActionCard>
              </ActionGrid>
            </QuickActions>

            <RecentActivity>
              <SectionTitle>Recent Activity</SectionTitle>
              <ActivityList>
                {dashboardData.recentActivity.map((item, index) => (
                  <ActivityItem key={`${item.type}-${item.id}-${index}`}>
                    <ActivityIcon>{getActivityIcon(item.type)}</ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>{formatActivityTitle(item)}</ActivityTitle>
                      <ActivityMeta>
                        {item.type === 'project' && `Project submission`}
                        {item.type === 'expense' && `Expense submission`}
                        {item.type === 'invitation' && `Builder invitation`}
                      </ActivityMeta>
                    </ActivityContent>
                    <ActivityDate>{formatDate(item.date)}</ActivityDate>
                  </ActivityItem>
                ))}
              </ActivityList>
            </RecentActivity>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
