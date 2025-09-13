import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { builderInvitations } from '../../../db/schema';
import { generateInvitationToken, createInvitationUrl } from '@/lib/invitation-token';
import { sendBuilderInvitationEmail } from '@/lib/email';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new invitation
    try {
      const { 
        email, 
        name, 
        bio, 
        skills, 
        website, 
        linkedin, 
        github, 
        twitter, 
        instagram,
        other_links,
        profilePicture,
        invitedBy = 'admin@commons.buildetroit.xyz'
      } = req.body;

      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
      }

      // Check if invitation already exists for this email
      const existingInvitation = await db
        .select()
        .from(builderInvitations)
        .where(eq(builderInvitations.email, email))
        .limit(1);

      if (existingInvitation.length > 0) {
        const invitation = existingInvitation[0];
        if (invitation.status === 'pending') {
          return res.status(400).json({ 
            success: false, 
            error: 'Invitation already exists for this email',
            invitationUrl: createInvitationUrl(invitation.invitationToken)
          });
        }
      }

      // Generate invitation token and expiration date (7 days from now)
      const invitationToken = generateInvitationToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      // Create invitation
      const invitation = await db.insert(builderInvitations).values({
        email,
        name,
        bio,
        skills: skills ? JSON.stringify(skills) : null,
        profilePicture,
        website,
        linkedin,
        github,
        twitter,
        instagram,
        other_links: other_links ? JSON.stringify(other_links) : null,
        invitationToken,
        invitedBy,
        expiresAt: expiresAt.toISOString(),
        status: 'pending'
      }).returning();

      // Send invitation email
      const invitationUrl = createInvitationUrl(invitationToken);
      try {
        await sendBuilderInvitationEmail({
          to: email,
          name: name || 'Builder',
          invitationUrl,
          invitedBy: invitedBy || 'admin@commons.buildetroit.xyz'
        });

        res.status(201).json({
          success: true,
          invitation: {
            id: invitation[0].id,
            email,
            invitationUrl,
            expiresAt: expiresAt.toISOString()
          }
        });
      } catch (emailError) {
        console.error('Error sending invitation email:', emailError);
        // Still return success since the invitation was created
        res.status(201).json({
          success: true,
          invitation: {
            id: invitation[0].id,
            email,
            invitationUrl,
            expiresAt: expiresAt.toISOString()
          },
          warning: 'Invitation created but email failed to send. Please contact them directly.'
        });
      }

    } catch (error: unknown) {
      console.error('Error creating invitation:', error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to create invitation' });
    }
  } else if (req.method === 'GET') {
    // Get all invitations
    try {
      const invitations = await db
        .select()
        .from(builderInvitations)
        .orderBy(builderInvitations.createdAt);

      res.status(200).json({
        success: true,
        invitations: invitations.map(invitation => ({
          id: invitation.id,
          email: invitation.email,
          name: invitation.name,
          status: invitation.status,
          invitedBy: invitation.invitedBy,
          createdAt: invitation.createdAt,
          expiresAt: invitation.expiresAt,
          acceptedAt: invitation.acceptedAt
        }))
      });

    } catch (error: unknown) {
      console.error('Error fetching invitations:', error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch invitations' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
