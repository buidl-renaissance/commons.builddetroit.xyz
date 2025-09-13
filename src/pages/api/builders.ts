import { NextApiRequest, NextApiResponse } from 'next';
import { eq, desc } from 'drizzle-orm';
import { db } from '../../../db';
import { members } from '../../../db/schema';
import { generateModificationKey } from '@/lib/modification-key';
import { sendBuilderSubmissionEmail } from '@/lib/email';

interface BuilderSubmissionData {
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string; // URL to uploaded image
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  otherLinks?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        email,
        bio,
        profilePicture,
        website,
        linkedin,
        github,
        twitter,
        instagram,
        otherLinks,
      }: BuilderSubmissionData = req.body;

      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({
          error: 'Missing required fields: name and email are required',
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Invalid email format',
        });
      }

      // Check if email already exists
      const existingMember = await db
        .select()
        .from(members)
        .where(eq(members.email, email.trim().toLowerCase()))
        .limit(1);

      if (existingMember.length > 0) {
        return res.status(409).json({
          error: 'A builder with this email already exists',
        });
      }

      // Generate modification key for email-based updates
      const modificationKey = generateModificationKey();

      // Insert member into database
      const result = await db.insert(members).values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        bio: bio?.trim() || null,
        profilePicture: profilePicture?.trim() || null,
        website: website?.trim() || null,
        linkedin: linkedin?.trim() || null,
        github: github?.trim() || null,
        twitter: twitter?.trim() || null,
        instagram: instagram?.trim() || null,
        other_links: otherLinks && otherLinks.length > 0 ? JSON.stringify(otherLinks.filter((link: string) => link.trim())) : null,
        skills: null, // We'll add skills later if needed
        modificationKey,
      }).returning();

      // Send confirmation email with modification link
      try {
        await sendBuilderSubmissionEmail(
          email.trim().toLowerCase(),
          name.trim(),
          modificationKey
        );
      } catch (emailError) {
        console.error('Failed to send builder submission email:', emailError);
        // Don't fail the submission if email fails
      }

      res.status(201).json({
        message: 'Builder profile created successfully',
        member: result[0],
      });
    } catch (error) {
      console.error('Error submitting builder profile:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Get all builders (for public directory)
      const allBuilders = await db
        .select()
        .from(members)
        .orderBy(desc(members.createdAt));

      // Parse JSON fields for response
      const formattedBuilders = allBuilders.map(member => ({
        ...member,
        other_links: member.other_links ? JSON.parse(member.other_links) : [],
        skills: member.skills ? JSON.parse(member.skills) : [],
      }));

      res.status(200).json(formattedBuilders);
    } catch (error) {
      console.error('Error fetching builders:', error);
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
