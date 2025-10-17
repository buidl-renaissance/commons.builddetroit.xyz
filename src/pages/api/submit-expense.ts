import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db';
import { expenses } from '../../../db/schema';
import { sendExpenseSubmissionNotification } from '@/lib/email';

// Configure body parser for larger file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

interface PublicExpenseSubmission {
  email: string;
  name: string;
  title: string;
  merchant?: string;
  category?: string;
  amountCents: number;
  currency?: string;
  expenseDate?: string;
  notes?: string;
  payoutAddress: string;
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
        title, 
        merchant, 
        category, 
        amountCents, 
        currency, 
        expenseDate, 
        notes, 
        payoutAddress 
      }: PublicExpenseSubmission = req.body;

      // Validate required fields
      if (!email || !name || !title || !amountCents || !payoutAddress) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: email, name, title, amount, and payout address are required' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid email format' 
        });
      }

      // Validate amount
      if (amountCents <= 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Amount must be greater than 0' 
        });
      }

      // Basic Ethereum address validation (starts with 0x and is 42 characters)
      if (!payoutAddress.startsWith('0x') || payoutAddress.length !== 42) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid payout address format. Must be a valid Ethereum address.' 
        });
      }

      // Create expense
      const result = await db.insert(expenses).values({
        title: title.trim(),
        merchant: merchant?.trim() || null,
        category: category?.trim() || null,
        amountCents,
        currency: currency || 'USD',
        expenseDate: expenseDate || null,
        notes: notes?.trim() || null,
        payoutAddress: payoutAddress.trim(),
        payoutStatus: 'pending_approval',
        metadata: JSON.stringify({
          submittedAt: new Date().toISOString(),
          submittedBy: email,
          submittedByName: name,
          submissionType: 'public'
        })
      }).returning();

      // Send notification to admins
      try {
        await sendExpenseSubmissionNotification({
          expenseTitle: result[0].title,
          amount: result[0].amountCents! / 100,
          currency: result[0].currency,
          submitterName: name,
          submitterEmail: email
        });
      } catch (emailError) {
        console.error('Failed to send admin notification:', emailError);
        // Don't fail the request if email fails
      }

      return res.status(201).json({
        success: true,
        expense: result[0],
        message: 'Expense submitted for approval. You will receive a confirmation email shortly.',
        trackingId: result[0].id
      });

    } catch (error) {
      console.error('Error submitting public expense:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit expense'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });
  }
}
