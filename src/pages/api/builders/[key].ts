import { NextApiRequest, NextApiResponse } from 'next';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db';
import { members } from '../../../../db/schema';
import { isValidModificationKey } from '@/lib/modification-key';

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
      // Get builder by modification key
      const builder = await db
        .select()
        .from(members)
        .where(eq(members.modificationKey, key))
        .limit(1);

      if (builder.length === 0) {
        return res.status(404).json({
          error: 'Builder profile not found or modification key is invalid',
        });
      }

      const builderData = builder[0];

      // Parse JSON fields for response
      const formattedBuilder = {
        ...builderData,
        other_links: builderData.other_links ? JSON.parse(builderData.other_links) : [],
        skills: builderData.skills ? JSON.parse(builderData.skills) : [],
      };

      res.status(200).json(formattedBuilder);
    } catch (error) {
      console.error('Error fetching builder:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.',
      });
    }
  } else if (req.method === 'PUT') {
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
        other_links,
      } = req.body;

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

      // Update builder in database
      const result = await db
        .update(members)
        .set({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          bio: bio?.trim() || null,
          profilePicture: profilePicture?.trim() || null,
          website: website?.trim() || null,
          linkedin: linkedin?.trim() || null,
          github: github?.trim() || null,
          twitter: twitter?.trim() || null,
          instagram: instagram?.trim() || null,
          other_links: other_links && other_links.length > 0 ? JSON.stringify(other_links.filter((link: string) => link.trim())) : null,
        })
        .where(eq(members.modificationKey, key))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({
          error: 'Builder profile not found or modification key is invalid',
        });
      }

      res.status(200).json({
        message: 'Builder profile updated successfully',
        member: result[0],
      });
    } catch (error) {
      console.error('Error updating builder:', error);
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
