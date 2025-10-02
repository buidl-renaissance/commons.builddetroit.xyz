import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { uploadFile } from '@/lib/upload';
import { db } from '../../../db';
import { expenses, expenseImages } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// Configure body parser for larger file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

interface ReceiptUploadData {
  file: string; // base64 encoded image
  fileName: string;
  fileType: string;
}

interface PayoutRequestData {
  expenseId: number;
  txHash?: string;
}

interface OpenAIReceiptAnalysis {
  title: string;
  merchant?: string;
  category?: string;
  amount?: number;
  currency?: string;
  date?: string;
  notes?: string;
  confidence?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST' && req.body.action === 'upload') {
    try {
      const { file, fileName, fileType }: ReceiptUploadData = req.body;

      if (!file || !fileName || !fileType) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required file data' 
        });
      }

      // Validate file type
      if (!fileType.startsWith('image/')) {
        return res.status(400).json({ 
          success: false, 
          error: 'File must be an image' 
        });
      }

      // Upload receipt image
      const base64Data = file.split(',')[1];
      const fileBuffer = Buffer.from(base64Data, 'base64');
      
      const receiptUrl = await uploadFile(
        fileBuffer,
        fileName,
        fileType,
        'receipts'
      );

      // Initialize OpenAI client
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY environment variable is required');
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Analyze receipt with OpenAI Vision
      const analysis = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this receipt image and extract the following information in JSON format: title (descriptive title for the expense), merchant (store/business name), category (expense category like 'Food', 'Office Supplies', 'Travel', etc.), amount (total amount as a number), currency (currency code), date (expense date in YYYY-MM-DD format), notes (any additional relevant details), confidence (confidence score 0-1). If any field cannot be determined, omit it from the response."
              },
              {
                type: "image_url",
                image_url: {
                  url: receiptUrl
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.1
      });

      const analysisText = analysis.choices[0]?.message?.content;
      if (!analysisText) {
        throw new Error('Failed to analyze receipt');
      }

      let parsedAnalysis: OpenAIReceiptAnalysis;
      try {
        // Strip markdown code blocks if present
        const cleanedText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedAnalysis = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', analysisText);
        throw new Error('Failed to parse receipt analysis');
      }

      // Save expense to database
      const result = await db.insert(expenses).values({
        title: parsedAnalysis.title || 'Receipt',
        merchant: parsedAnalysis.merchant || null,
        category: parsedAnalysis.category || null,
        amountCents: parsedAnalysis.amount ? Math.round(parsedAnalysis.amount * 100) : null,
        currency: parsedAnalysis.currency || 'USD',
        expenseDate: parsedAnalysis.date || null,
        notes: parsedAnalysis.notes || null,
        receiptUrl: receiptUrl,
        metadata: JSON.stringify({
          ...parsedAnalysis,
          analysisTimestamp: new Date().toISOString()
        })
      }).returning();

      return res.status(201).json({
        success: true,
        expense: result[0],
        analysis: parsedAnalysis
      });

    } catch (error) {
      console.error('Error processing receipt upload:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process receipt'
      });
    }
  } else if (req.method === 'POST' && req.body.action === 'payout') {
    try {
      const { expenseId, txHash }: PayoutRequestData = req.body;

      if (!expenseId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Expense ID is required' 
        });
      }

      // Get the expense
      const expense = await db
        .select()
        .from(expenses)
        .where(eq(expenses.id, expenseId))
        .limit(1);

      if (expense.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Expense not found' 
        });
      }

      const expenseData = expense[0];

      // Check if already paid out
      if (expenseData.payoutStatus === 'completed') {
        return res.status(400).json({ 
          success: false, 
          error: 'Expense has already been paid out' 
        });
      }

      // Validate amount
      if (!expenseData.amountCents || expenseData.amountCents <= 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid expense amount' 
        });
      }

      // Update expense with payout details
      await db
        .update(expenses)
        .set({ 
          payoutStatus: 'completed',
          payoutTxHash: txHash || null,
          payoutAmountCents: expenseData.amountCents,
          payoutDate: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .where(eq(expenses.id, expenseId));

      return res.status(200).json({
        success: true,
        message: 'Payout recorded successfully'
      });

    } catch (error) {
      console.error('Error recording payout:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to record payout'
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Get all expenses with their related images
      const allExpenses = await db
        .select()
        .from(expenses)
        .orderBy(expenses.createdAt);

      // Fetch images for each expense
      const expensesWithImages = await Promise.all(
        allExpenses.map(async (expense) => {
          const images = await db
            .select()
            .from(expenseImages)
            .where(eq(expenseImages.expenseId, expense.id))
            .orderBy(expenseImages.createdAt);

          return {
            ...expense,
            images
          };
        })
      );

      return res.status(200).json({
        success: true,
        expenses: expensesWithImages
      });
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch expenses'
      });
    }
  } else {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }
}
