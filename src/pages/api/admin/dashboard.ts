import { db } from '../../../../db';
import { members, projects, expenses, builderInvitations } from '../../../../db/schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { count, eq, and, gte, desc } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Get total members count
      const [totalMembers] = await db.select({ count: count() }).from(members);

      // Get projects by status
      const projectsByStatus = await db
        .select({ 
          status: projects.status,
          count: count()
        })
        .from(projects)
        .groupBy(projects.status);

      // Get expenses by status
      const expensesByStatus = await db
        .select({ 
          payoutStatus: expenses.payoutStatus,
          count: count()
        })
        .from(expenses)
        .groupBy(expenses.payoutStatus);

      // Get invitations by status
      const invitationsByStatus = await db
        .select({ 
          status: builderInvitations.status,
          count: count()
        })
        .from(builderInvitations)
        .groupBy(builderInvitations.status);

      // Get recent activity (last 10 items)
      const recentProjects = await db
        .select({
          id: projects.id,
          name: projects.name,
          status: projects.status,
          createdAt: projects.createdAt,
          type: 'project' as unknown as typeof projects.status
        })
        .from(projects)
        .orderBy(desc(projects.createdAt))
        .limit(5);

      const recentExpenses = await db
        .select({
          id: expenses.id,
          title: expenses.title,
          payoutStatus: expenses.payoutStatus,
          createdAt: expenses.createdAt,
          type: 'expense' as unknown as typeof expenses.payoutStatus
        })
        .from(expenses)
        .orderBy(desc(expenses.createdAt))
        .limit(5);

      const recentInvitations = await db
        .select({
          id: builderInvitations.id,
          email: builderInvitations.email,
          status: builderInvitations.status,
          createdAt: builderInvitations.createdAt,
          type: 'invitation' as unknown as typeof builderInvitations.status
        })
        .from(builderInvitations)
        .orderBy(desc(builderInvitations.createdAt))
        .limit(5);

      // Combine and sort recent activity
      const recentActivity = [
        ...recentProjects.map(p => ({ ...p, date: p.createdAt })),
        ...recentExpenses.map(e => ({ ...e, date: e.createdAt })),
        ...recentInvitations.map(i => ({ ...i, date: i.createdAt }))
      ]
        .sort((a: { date: string | null }, b: { date: string | null }) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
        .slice(0, 10);

      // Calculate summary statistics
      const pendingProjects = projectsByStatus.find(p => p.status === 'submitted')?.count || 0;
      const pendingExpenses = expensesByStatus.find(e => e.payoutStatus === 'pending_approval')?.count || 0;
      const activeInvitations = invitationsByStatus.find(i => i.status === 'pending')?.count || 0;

      return res.status(200).json({
        success: true,
        data: {
          summary: {
            totalMembers: totalMembers.count,
            pendingProjects,
            pendingExpenses,
            activeInvitations
          },
          breakdown: {
            projects: projectsByStatus,
            expenses: expensesByStatus,
            invitations: invitationsByStatus
          },
          recentActivity
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch dashboard data'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
