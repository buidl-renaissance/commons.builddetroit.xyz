import { NextApiRequest, NextApiResponse } from 'next';
import { desc } from 'drizzle-orm';
import { db } from '../../../../db';
import { openOctoberRegistrations } from '../../../../db/schema';

interface RegistrationData {
  email: string;
  name?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, name }: RegistrationData = req.body;

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

      // Insert registration into database
      try {
        const result = await db.insert(openOctoberRegistrations).values({
          email: email.trim().toLowerCase(),
          name: name?.trim() || null,
        }).returning();

        res.status(201).json({
          success: true,
          message: 'Registration successful! We\'ll send you event updates and details soon.',
          registration: result[0],
        });
      } catch (dbError: unknown) {
        // Handle unique constraint violation (duplicate email)
        if (dbError instanceof Error && dbError.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({
            success: false,
            message: 'This email is already registered for Open October.',
          });
        }
        throw dbError;
      }
    } catch (error) {
      console.error('Error registering for Open October:', error);
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
