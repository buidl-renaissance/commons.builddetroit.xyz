import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile } from '@/lib/upload';
import { db } from '../../../db';
import { expenseImages } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// Configure body parser for larger file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

interface ImageUploadData {
  expenseId: number;
  file: string; // base64 encoded image
  fileName: string;
  fileType: string;
  description?: string;
  imageType?: string;
  uploadedBy?: string;
}

interface ImageUpdateData {
  imageId: number;
  description?: string;
  imageType?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { 
        expenseId, 
        file, 
        fileName, 
        fileType, 
        description, 
        imageType, 
        uploadedBy 
      }: ImageUploadData = req.body;

      if (!expenseId || !file || !fileName || !fileType) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: expenseId, file, fileName, fileType' 
        });
      }

      // Validate file type
      if (!fileType.startsWith('image/')) {
        return res.status(400).json({ 
          success: false, 
          error: 'File must be an image' 
        });
      }

      // Upload image
      const base64Data = file.split(',')[1];
      const fileBuffer = Buffer.from(base64Data, 'base64');
      
      const imageUrl = await uploadFile(
        fileBuffer,
        fileName,
        fileType,
        'expense-proofs'
      );

      // Save image record to database
      const result = await db.insert(expenseImages).values({
        expenseId,
        imageUrl,
        description: description || null,
        imageType: imageType || 'proof',
        uploadedBy: uploadedBy || null,
      }).returning();

      return res.status(201).json({
        success: true,
        image: result[0]
      });

    } catch (error) {
      console.error('Error uploading expense image:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to upload image'
      });
    }
  } else if (req.method === 'PUT') {
    try {
      const { imageId, description, imageType }: ImageUpdateData = req.body;

      if (!imageId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Image ID is required' 
        });
      }

      // Update image metadata
      const result = await db
        .update(expenseImages)
        .set({ 
          description: description || null,
          imageType: imageType || 'proof'
        })
        .where(eq(expenseImages.id, imageId))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Image not found' 
        });
      }

      return res.status(200).json({
        success: true,
        image: result[0]
      });

    } catch (error) {
      console.error('Error updating expense image:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update image'
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { imageId } = req.query;

      if (!imageId || typeof imageId !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Image ID is required' 
        });
      }

      // Delete image record
      const result = await db
        .delete(expenseImages)
        .where(eq(expenseImages.id, parseInt(imageId)))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Image not found' 
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });

    } catch (error) {
      console.error('Error deleting expense image:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete image'
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { expenseId } = req.query;

      if (!expenseId || typeof expenseId !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Expense ID is required' 
        });
      }

      // Get all images for an expense
      const images = await db
        .select()
        .from(expenseImages)
        .where(eq(expenseImages.expenseId, parseInt(expenseId)))
        .orderBy(expenseImages.createdAt);

      return res.status(200).json({
        success: true,
        images
      });
    } catch (error) {
      console.error('Error fetching expense images:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch images'
      });
    }
  } else {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }
}
