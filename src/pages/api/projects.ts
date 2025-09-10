import { NextApiRequest, NextApiResponse } from 'next';
import { eq, desc } from 'drizzle-orm';
import { db } from '../../../db';
import { projects } from '../../../db/schema';

interface ProjectSubmissionData {
  name: string;
  description: string;
  roadmapLink?: string;
  homepageLink?: string;
  additionalResources?: string[];
  leadName: string;
  leadEmail: string;
  teamMembers?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        description,
        roadmapLink,
        homepageLink,
        additionalResources,
        leadName,
        leadEmail,
        teamMembers,
      }: ProjectSubmissionData = req.body;

      // Validate required fields
      if (!name || !description || !roadmapLink || !leadName || !leadEmail) {
        return res.status(400).json({
          error: 'Missing required fields: name, description, MVP proposal link, leadName, and leadEmail are required',
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(leadEmail)) {
        return res.status(400).json({
          error: 'Invalid email format',
        });
      }

      // Insert project into database
      const result = await db.insert(projects).values({
        name: name.trim(),
        description: description.trim(),
        roadmapLink: roadmapLink?.trim() || null,
        homepageLink: homepageLink?.trim() || null,
        additionalResources: additionalResources ? JSON.stringify(additionalResources) : null,
        leadName: leadName.trim(),
        leadEmail: leadEmail.trim().toLowerCase(),
        teamMembers: teamMembers ? JSON.stringify(teamMembers) : null,
        status: 'pending',
      }).returning();

      res.status(201).json({
        message: 'Project submission received successfully',
        project: result[0],
      });
    } catch (error) {
      console.error('Error submitting project:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Get all projects (for submissions page)
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

      res.status(200).json(formattedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}
