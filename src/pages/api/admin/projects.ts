import { NextApiRequest, NextApiResponse } from 'next';
import { desc } from 'drizzle-orm';
import { db } from '../../../../db';
import { projects } from '../../../../db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Get all projects for admin review
      const allProjects = await db
        .select()
        .from(projects)
        .orderBy(desc(projects.createdAt));

      // Parse JSON fields for response
      const formattedProjects = allProjects.map(project => ({
        ...project,
        additionalResources: project.additionalResources ? JSON.parse(project.additionalResources) : [],
        teamMembers: project.teamMembers ? JSON.parse(project.teamMembers) : [],
      }));

      res.status(200).json({
        success: true,
        projects: formattedProjects,
      });
    } catch (error) {
      console.error('Error fetching projects for admin:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}
