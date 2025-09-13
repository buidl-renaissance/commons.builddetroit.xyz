import { NextApiRequest, NextApiResponse } from 'next';
import { desc } from 'drizzle-orm';
import { db } from '../../../../db';
import { openOctoberRegistrations } from '../../../../db/schema';

interface InformationRequestData {
  email: string;
  name: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, name, message }: InformationRequestData = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Name is required',
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

      // Insert registration into database
      try {
        const result = await db.insert(openOctoberRegistrations).values({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          message: message?.trim() || null,
        }).returning();

        res.status(201).json({
          success: true,
          message: 'Thanks for your interest! We\'ll reach out with information about how to get involved in Open October.',
          registration: result[0],
        });
      } catch (dbError: unknown) {
        // Handle unique constraint violation (duplicate email)
        if (dbError instanceof Error && dbError.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({
            success: false,
            message: 'We already have your information for Open October.',
          });
        }
        throw dbError;
      }
    } catch (error) {
      console.error('Error processing Open October information request:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error. Please try again later.',
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Get registration count for admin/stats purposes
      const registrations = await db
        .select()
        .from(openOctoberRegistrations)
        .orderBy(desc(openOctoberRegistrations.createdAt));

      res.status(200).json({
        success: true,
        count: registrations.length,
        // Don't expose emails in public endpoint
        registrations: registrations.map(reg => ({
          id: reg.id,
          name: reg.name,
          createdAt: reg.createdAt,
        })),
      });
    } catch (error) {
      console.error('Error fetching registrations:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error. Please try again later.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  }
}
