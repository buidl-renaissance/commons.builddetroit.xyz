import { NextApiRequest, NextApiResponse } from 'next';
import { eq } from 'drizzle-orm';
import { db } from '../../../../../db';
import { projects } from '../../../../../db/schema';

interface ProjectUpdateData {
  status?: string;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      error: 'Invalid project ID',
    });
  }

  const projectId = parseInt(id);
  if (isNaN(projectId)) {
    return res.status(400).json({
      error: 'Invalid project ID format',
    });
  }

  if (req.method === 'PATCH') {
    try {
      const { status, reviewNotes, reviewedBy, reviewedAt }: ProjectUpdateData = req.body;

      // Validate status if provided
      const validStatuses = ['draft', 'submitted', 'in_review', 'approved', 'rejected'];
      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
          error: 'Invalid status. Must be one of: draft, submitted, in_review, approved, rejected',
        });
      }

      // Prepare update data
      const updateData: Partial<typeof projects.$inferInsert> = {
        updatedAt: new Date().toISOString(),
      };

      if (status) updateData.status = status;
      if (reviewNotes !== undefined) updateData.reviewNotes = reviewNotes;
      if (reviewedBy) updateData.reviewedBy = reviewedBy;
      if (reviewedAt) updateData.reviewedAt = reviewedAt;

      // If status is being changed to 'submitted' and it wasn't submitted before, set submittedAt
      if (status === 'submitted') {
        const existingProject = await db
          .select()
          .from(projects)
          .where(eq(projects.id, projectId))
          .limit(1);

        if (existingProject.length > 0 && !existingProject[0].submittedAt) {
          updateData.submittedAt = new Date().toISOString();
        }
      }

      // Update project in database
      const result = await db
        .update(projects)
        .set(updateData)
        .where(eq(projects.id, projectId))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({
          error: 'Project not found',
        });
      }

      const updatedProject = result[0];

      // Parse JSON fields for response
      const formattedProject = {
        ...updatedProject,
        additionalResources: updatedProject.additionalResources ? JSON.parse(updatedProject.additionalResources) : [],
        teamMembers: updatedProject.teamMembers ? JSON.parse(updatedProject.teamMembers) : [],
      };

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        project: formattedProject,
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Get specific project by ID
      const project = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId))
        .limit(1);

      if (project.length === 0) {
        return res.status(404).json({
          error: 'Project not found',
        });
      }

      const projectData = project[0];

      // Parse JSON fields for response
      const formattedProject = {
        ...projectData,
        additionalResources: projectData.additionalResources ? JSON.parse(projectData.additionalResources) : [],
        teamMembers: projectData.teamMembers ? JSON.parse(projectData.teamMembers) : [],
      };

      res.status(200).json({
        success: true,
        project: formattedProject,
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}
