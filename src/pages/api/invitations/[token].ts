import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../db';
import { builderInvitations, members } from '../../../../db/schema';
import { generateModificationKey } from '@/lib/modification-key';
import { eq, and } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid invitation token' });
  }

  if (req.method === 'GET') {
    // Get invitation details
    try {
      const invitation = await db
        .select()
        .from(builderInvitations)
        .where(
          and(
            eq(builderInvitations.invitationToken, token),
            eq(builderInvitations.status, 'pending')
          )
        )
        .limit(1);

      if (invitation.length === 0) {
        return res.status(404).json({ success: false, error: 'Invitation not found or expired' });
      }

      const inv = invitation[0];
      
      // Check if invitation has expired
      if (inv.expiresAt && new Date(inv.expiresAt) < new Date()) {
        return res.status(400).json({ success: false, error: 'Invitation has expired' });
      }

      res.status(200).json({
        success: true,
        invitation: {
          id: inv.id,
          email: inv.email,
          name: inv.name,
          bio: inv.bio,
          skills: inv.skills ? JSON.parse(inv.skills) : [],
          profilePicture: inv.profilePicture,
          website: inv.website,
          linkedin: inv.linkedin,
          github: inv.github,
          twitter: inv.twitter,
          other_links: inv.other_links ? JSON.parse(inv.other_links) : [],
          expiresAt: inv.expiresAt
        }
      });

    } catch (error: any) {
      console.error('Error fetching invitation:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to fetch invitation' });
    }
  } else if (req.method === 'POST') {
    // Accept invitation and create builder profile
    try {
      const invitation = await db
        .select()
        .from(builderInvitations)
        .where(
          and(
            eq(builderInvitations.invitationToken, token),
            eq(builderInvitations.status, 'pending')
          )
        )
        .limit(1);

      if (invitation.length === 0) {
        return res.status(404).json({ success: false, error: 'Invitation not found or expired' });
      }

      const inv = invitation[0];
      
      // Check if invitation has expired
      if (inv.expiresAt && new Date(inv.expiresAt) < new Date()) {
        return res.status(400).json({ success: false, error: 'Invitation has expired' });
      }

      const {
        name,
        bio,
        skills,
        website,
        linkedin,
        github,
        twitter,
        instagram,
        other_links,
        profilePicture
      } = req.body;

      if (!name) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }

      // Check if user already exists
      const existingMember = await db
        .select()
        .from(members)
        .where(eq(members.email, inv.email))
        .limit(1);

      if (existingMember.length > 0) {
        return res.status(400).json({ success: false, error: 'User already exists' });
      }

      // Create builder profile
      const modificationKey = generateModificationKey();
      const newMember = await db.insert(members).values({
        name,
        email: inv.email,
        bio,
        skills: skills ? JSON.stringify(skills) : null,
        website,
        linkedin,
        github,
        twitter,
        instagram,
        other_links: other_links ? JSON.stringify(other_links) : null,
        profilePicture,
        modificationKey
      }).returning();

      // Update invitation status
      await db
        .update(builderInvitations)
        .set({
          status: 'accepted',
          acceptedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .where(eq(builderInvitations.id, inv.id));

      res.status(201).json({
        success: true,
        member: {
          id: newMember[0].id,
          name: newMember[0].name,
          email: newMember[0].email,
          modificationKey: newMember[0].modificationKey
        }
      });

    } catch (error: any) {
      console.error('Error accepting invitation:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to accept invitation' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
