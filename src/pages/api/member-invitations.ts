import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { builderInvitations } from '../../../db/schema';
import { generateInvitationToken, createInvitationUrl } from '@/lib/invitation-token';
import { sendBuilderInvitationEmail } from '@/lib/email';

interface MemberInvitationData {
  email: string;
  name?: string;
  bio?: string;
  skills?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  otherLinks?: string;
  profilePicture?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
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
        otherLinks,
        profilePicture,
        invitedBy,
      }: MemberInvitationData & { invitedBy?: string } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please enter a valid email address',
        });
      }

      // Generate invitation token and URL
      const invitationToken = generateInvitationToken();
      const invitationUrl = createInvitationUrl(invitationToken);

      // Set expiration date (30 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Parse other links if provided
      let parsedOtherLinks = null;
      if (otherLinks) {
        const links = otherLinks
          .split('\n')
          .map(link => link.trim())
          .filter(link => link.length > 0);
        if (links.length > 0) {
          parsedOtherLinks = JSON.stringify(links);
        }
      }

      // Parse skills if provided
      let parsedSkills = null;
      if (skills) {
        const skillsArray = skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
        if (skillsArray.length > 0) {
          parsedSkills = JSON.stringify(skillsArray);
        }
      }

      // Insert invitation into database
      try {
        const result = await db.insert(builderInvitations).values({
          email: email.trim().toLowerCase(),
          name: name?.trim() || null,
          bio: bio?.trim() || null,
          skills: parsedSkills,
          profilePicture: profilePicture?.trim() || null,
          website: website?.trim() || null,
          linkedin: linkedin?.trim() || null,
          github: github?.trim() || null,
          twitter: twitter?.trim() || null,
          instagram: instagram?.trim() || null,
          other_links: parsedOtherLinks,
          invitationToken,
          status: 'pending',
          invitedBy: invitedBy || 'a community member',
          expiresAt: expiresAt.toISOString(),
        }).returning();

        // Send invitation email
        try {
          await sendBuilderInvitationEmail({
            to: email,
            name: name || 'there',
            invitationUrl,
            invitedBy: invitedBy || 'a community member',
          });

          res.status(201).json({
            success: true,
            message: 'Invitation sent successfully!',
            invitation: {
              id: result[0].id,
              email: result[0].email,
              token: result[0].invitationToken,
            },
          });
        } catch (emailError) {
          console.error('Error sending invitation email:', emailError);
          // Still return success since the invitation was created
          res.status(201).json({
            success: true,
            message: 'Invitation created but email failed to send. Please contact them directly.',
            invitation: {
              id: result[0].id,
              email: result[0].email,
              token: result[0].invitationToken,
              url: invitationUrl,
            },
          });
        }
      } catch (dbError: unknown) {
        // Handle unique constraint violation (duplicate email)
        if (dbError instanceof Error && dbError.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({
            success: false,
            message: 'An invitation has already been sent to this email address.',
          });
        }
        throw dbError;
      }
    } catch (error) {
      console.error('Error creating member invitation:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error. Please try again later.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  }
}
