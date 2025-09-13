import { NextApiRequest, NextApiResponse } from 'next';
import { desc, eq } from 'drizzle-orm';
import { db } from '../../../db';
import { projects, members } from '../../../db/schema';
import { generateModificationKey } from '@/lib/modification-key';
import { sendProjectSubmissionEmail } from '@/lib/email';

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

      // Generate modification key for email-based updates
      const modificationKey = generateModificationKey();

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
        modificationKey,
      }).returning();

      // Send confirmation email with modification link
      try {
        await sendProjectSubmissionEmail(
          leadEmail.trim().toLowerCase(),
          name.trim(),
          modificationKey
        );
      } catch (emailError) {
        console.error('Failed to send project submission email:', emailError);
        // Don't fail the submission if email fails
      }

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
      const { modificationKey } = req.query;

      let allProjects;

      if (modificationKey && typeof modificationKey === 'string') {
        // Get projects for a specific member
        const member = await db
          .select()
          .from(members)
          .where(eq(members.modificationKey, modificationKey))
          .limit(1);

        if (member.length === 0) {
          return res.status(404).json({
            error: 'Member not found',
          });
        }

        allProjects = await db
          .select()
          .from(projects)
          .where(eq(projects.modificationKey, modificationKey))
          .orderBy(desc(projects.createdAt));
      } else {
        // Get all projects (for submissions page)
        allProjects = await db
          .select()
          .from(projects)
          .orderBy(desc(projects.createdAt));
      }

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
