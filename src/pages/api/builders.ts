import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { members } from '../../../db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Get all builders (members) with all their profile information
      const builders = await db.select({
        id: members.id,
        name: members.name,
        email: members.email,
        bio: members.bio,
        profilePicture: members.profilePicture,
        website: members.website,
        linkedin: members.linkedin,
        github: members.github,
        twitter: members.twitter,
        createdAt: members.createdAt,
      }).from(members);

      return res.status(200).json({
        success: true,
        builders: builders
      });
    } catch (error) {
      console.error('Error fetching builders:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch builders'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}