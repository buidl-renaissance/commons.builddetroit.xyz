import { NextApiRequest, NextApiResponse } from 'next';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db';
import { projects } from '../../../../db/schema';
import { isValidModificationKey } from '../../../../lib/modification-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key } = req.query;

  if (!key || typeof key !== 'string') {
    return res.status(400).json({
      error: 'Invalid modification key',
    });
  }

  if (!isValidModificationKey(key)) {
    return res.status(400).json({
      error: 'Invalid modification key format',
    });
  }

  if (req.method === 'GET') {
    try {
      // Get project by modification key
      const project = await db
        .select()
        .from(projects)
        .where(eq(projects.modificationKey, key))
        .limit(1);

      if (project.length === 0) {
        return res.status(404).json({
          error: 'Project not found or modification key is invalid',
        });
      }

      const projectData = project[0];

      // Parse JSON fields for response
      const formattedProject = {
        ...projectData,
        additionalResources: projectData.additionalResources ? JSON.parse(projectData.additionalResources) : [],
        teamMembers: projectData.teamMembers ? JSON.parse(projectData.teamMembers) : [],
      };

      res.status(200).json(formattedProject);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else if (req.method === 'PUT') {
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
      } = req.body;

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

      // Update project in database
      const result = await db
        .update(projects)
        .set({
          name: name.trim(),
          description: description.trim(),
          roadmapLink: roadmapLink?.trim() || null,
          homepageLink: homepageLink?.trim() || null,
          additionalResources: additionalResources ? JSON.stringify(additionalResources) : null,
          leadName: leadName.trim(),
          leadEmail: leadEmail.trim().toLowerCase(),
          teamMembers: teamMembers ? JSON.stringify(teamMembers) : null,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(projects.modificationKey, key))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({
          error: 'Project not found or modification key is invalid',
        });
      }

      res.status(200).json({
        message: 'Project updated successfully',
        project: result[0],
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}
