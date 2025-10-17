import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { uploadFile } from '@/lib/upload';
import { db } from '../../../db';
import { expenses, expenseImages, members } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { isValidModificationKey } from '@/lib/modification-key';
import { 
  sendExpenseSubmissionNotification, 
  sendExpenseApprovalNotification, 
  sendExpenseRejectionNotification,
  sendExpensePayoutNotification 
} from '@/lib/email';

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

interface SubmitExpenseData {
  title: string;
  merchant?: string;
  category?: string;
  amountCents: number;
  currency?: string;
  expenseDate?: string;
  notes?: string;
  payoutAddress: string;
  submittedBy: number; // member ID
  modificationKey: string; // for authentication
}

interface ApproveExpenseData {
  expenseId: number;
  approvedBy: string; // admin email
}

interface RejectExpenseData {
  expenseId: number;
  rejectedBy: string; // admin email
  rejectionReason?: string;
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

      // Send notification to submitter about payout
      try {
        const submitter = await db
          .select()
          .from(members)
          .where(eq(members.id, expenseData.submittedBy!))
          .limit(1);

        if (submitter.length > 0) {
          await sendExpensePayoutNotification({
            submitterEmail: submitter[0].email,
            submitterName: submitter[0].name,
            expenseTitle: expenseData.title,
            amount: expenseData.amountCents! / 100,
            currency: expenseData.currency,
            txHash: txHash!
          });
        }
      } catch (emailError) {
        console.error('Failed to send payout notification:', emailError);
        // Don't fail the request if email fails
      }

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
  } else if (req.method === 'POST' && req.body.action === 'submit') {
    try {
      const { 
        title, 
        merchant, 
        category, 
        amountCents, 
        currency, 
        expenseDate, 
        notes, 
        payoutAddress, 
        submittedBy, 
        modificationKey 
      }: SubmitExpenseData = req.body;

      // Validate required fields
      if (!title || !amountCents || !payoutAddress || !submittedBy || !modificationKey) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields' 
        });
      }

      // Validate modification key
      if (!isValidModificationKey(modificationKey)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid modification key format' 
        });
      }

      // Verify the member exists and modification key matches
      const member = await db
        .select()
        .from(members)
        .where(eq(members.id, submittedBy))
        .limit(1);

      if (member.length === 0 || member[0].modificationKey !== modificationKey) {
        return res.status(403).json({ 
          success: false, 
          error: 'Invalid member or modification key' 
        });
      }

      // Validate amount
      if (amountCents <= 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Amount must be greater than 0' 
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
        submittedBy,
        payoutStatus: 'pending_approval',
        metadata: JSON.stringify({
          submittedAt: new Date().toISOString(),
          submittedBy: member[0].email
        })
      }).returning();

      // Send notification to admins
      try {
        await sendExpenseSubmissionNotification({
          expenseTitle: result[0].title,
          amount: result[0].amountCents! / 100,
          currency: result[0].currency,
          submitterName: member[0].name,
          submitterEmail: member[0].email
        });
      } catch (emailError) {
        console.error('Failed to send admin notification:', emailError);
        // Don't fail the request if email fails
      }

      return res.status(201).json({
        success: true,
        expense: result[0],
        message: 'Expense submitted for approval'
      });

    } catch (error) {
      console.error('Error submitting expense:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit expense'
      });
    }
  } else if (req.method === 'POST' && req.body.action === 'approve') {
    try {
      const { expenseId, approvedBy }: ApproveExpenseData = req.body;

      if (!expenseId || !approvedBy) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields' 
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

      // Check if already processed
      if (expenseData.payoutStatus !== 'pending_approval') {
        return res.status(400).json({ 
          success: false, 
          error: 'Expense is not pending approval' 
        });
      }

      // Update expense with approval
      await db
        .update(expenses)
        .set({ 
          payoutStatus: 'pending',
          approvedBy,
          approvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .where(eq(expenses.id, expenseId));

      // Send notification to submitter
      try {
        const submitter = await db
          .select()
          .from(members)
          .where(eq(members.id, expenseData.submittedBy!))
          .limit(1);

        if (submitter.length > 0) {
          await sendExpenseApprovalNotification({
            submitterEmail: submitter[0].email,
            submitterName: submitter[0].name,
            expenseTitle: expenseData.title,
            amount: expenseData.amountCents! / 100,
            currency: expenseData.currency
          });
        }
      } catch (emailError) {
        console.error('Failed to send approval notification:', emailError);
        // Don't fail the request if email fails
      }

      return res.status(200).json({
        success: true,
        message: 'Expense approved successfully'
      });

    } catch (error) {
      console.error('Error approving expense:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to approve expense'
      });
    }
  } else if (req.method === 'POST' && req.body.action === 'reject') {
    try {
      const { expenseId, rejectedBy, rejectionReason }: RejectExpenseData = req.body;

      if (!expenseId || !rejectedBy) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields' 
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

      // Check if already processed
      if (expenseData.payoutStatus !== 'pending_approval') {
        return res.status(400).json({ 
          success: false, 
          error: 'Expense is not pending approval' 
        });
      }

      // Update expense with rejection
      await db
        .update(expenses)
        .set({ 
          payoutStatus: 'rejected',
          rejectedBy,
          rejectedAt: new Date().toISOString(),
          rejectionReason: rejectionReason?.trim() || null,
          updatedAt: new Date().toISOString()
        })
        .where(eq(expenses.id, expenseId));

      // Send notification to submitter
      try {
        const submitter = await db
          .select()
          .from(members)
          .where(eq(members.id, expenseData.submittedBy!))
          .limit(1);

        if (submitter.length > 0) {
          await sendExpenseRejectionNotification({
            submitterEmail: submitter[0].email,
            submitterName: submitter[0].name,
            expenseTitle: expenseData.title,
            rejectionReason: rejectionReason?.trim()
          });
        }
      } catch (emailError) {
        console.error('Failed to send rejection notification:', emailError);
        // Don't fail the request if email fails
      }

      return res.status(200).json({
        success: true,
        message: 'Expense rejected successfully'
      });

    } catch (error) {
      console.error('Error rejecting expense:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to reject expense'
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { builderId, status } = req.query;
      
      let query = db.select().from(expenses);
      
      // Filter by builder if specified
      if (builderId) {
        query = query.where(eq(expenses.submittedBy, parseInt(builderId as string)));
      }
      
      // Filter by status if specified
      if (status) {
        query = query.where(eq(expenses.payoutStatus, status as string));
      }
      
      // Get expenses with their related images
      const allExpenses = await query.orderBy(expenses.createdAt);

      // Fetch images and submitter info for each expense
      const expensesWithDetails = await Promise.all(
        allExpenses.map(async (expense) => {
          const images = await db
            .select()
            .from(expenseImages)
            .where(eq(expenseImages.expenseId, expense.id))
            .orderBy(expenseImages.createdAt);

          let submitterInfo = null;
          if (expense.submittedBy) {
            const submitter = await db
              .select()
              .from(members)
              .where(eq(members.id, expense.submittedBy))
              .limit(1);
            
            if (submitter.length > 0) {
              submitterInfo = {
                id: submitter[0].id,
                name: submitter[0].name,
                email: submitter[0].email
              };
            }
          }

          return {
            ...expense,
            images,
            submitter: submitterInfo
          };
        })
      );

      return res.status(200).json({
        success: true,
        expenses: expensesWithDetails
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
