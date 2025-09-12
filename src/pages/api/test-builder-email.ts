import { NextApiRequest, NextApiResponse } from 'next';
import { sendBuilderSubmissionEmail } from '@/lib/email';
import { generateModificationKey } from '@/lib/modification-key';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ 
        error: 'Missing required fields: email and name are required' 
      });
    }

    // Generate a test modification key
    const modificationKey = generateModificationKey();
    
    console.log('🧪 Testing Builder Modifier Email...');
    console.log('📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('🔑 Modification Key:', modificationKey.substring(0, 8) + '...');

    // Send the builder submission email
    const result = await sendBuilderSubmissionEmail(
      email,
      name,
      modificationKey
    );

    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', result);

    res.status(200).json({
      success: true,
      message: 'Test builder modifier email sent successfully!',
      emailId: result,
      modificationKey: modificationKey.substring(0, 8) + '...',
      details: {
        to: email,
        subject: `Welcome to Detroit Builders, ${name}!`,
        modificationKey: modificationKey
      }
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
