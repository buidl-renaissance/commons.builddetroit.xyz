import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { members } from '../../../db/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Get all builders (members)
      const builders = await db.select({
        id: members.id,
        name: members.name,
        email: members.email,
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