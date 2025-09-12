import { Resend } from 'resend';
import { createModificationUrl } from './modification-key';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is required');
  }

  try {
    const result = await resend.emails.send({
      from: from || 'Detroit Open Commons <john@thebarefoot.dev>',
      to: [to],
      subject,
      html,
    });

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

/**
 * Send project submission confirmation email with modification link
 */
export async function sendProjectSubmissionEmail(
  email: string,
  projectName: string,
  modificationKey: string
) {
  const modificationUrl = createModificationUrl(modificationKey, 'project');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Submitted - Detroit Commons</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF4F00, #FFD700); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #FF4F00; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .button:hover { background: #e04500; color: white !important; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 Project Submitted!</h1>
        <p>Welcome to Detroit's Open Commons</p>
      </div>
      
      <div class="content">
        <h2>Thank you for submitting "${projectName}"</h2>
        
        <p>Your project has been successfully submitted to Detroit Commons. We're excited to see what you're building!</p>
        
        <h3>What happens next?</h3>
        <ul>
          <li>Your project will be reviewed by our community</li>
          <li>You'll receive updates on its status</li>
          <li>Other builders can discover and collaborate on your project</li>
        </ul>
        
        <h3>Need to make changes?</h3>
        <p>You can modify your project submission anytime using the link below:</p>
        
        <a href="${modificationUrl}" class="button">Modify Your Project</a>
        
        <p><strong>Important:</strong> Keep this link safe - it's the only way to modify your submission.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <p>Questions? Reply to this email or visit <a href="https://commons.builddetroit.xyz">commons.buildetroit.xyz</a></p>
      </div>
      
      <div class="footer">
        <p>Detroit Commons - Building in the Open</p>
        <p>This email was sent because you submitted a project to our community.</p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Project "${projectName}" Submitted to Detroit Commons`,
    html,
  });
}

/**
 * Send builder profile confirmation email with modification link
 */
export async function sendBuilderSubmissionEmail(
  email: string,
  builderName: string,
  modificationKey: string
) {
  const modificationUrl = createModificationUrl(modificationKey, 'builder');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Detroit Builders - Detroit Commons</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 20px; 
          background-color: #f5f5f5;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 8px; 
          overflow: hidden; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #FF4F00, #FFD700); 
          color: white; 
          padding: 30px; 
          text-align: center; 
        }
        .content { 
          background: white; 
          padding: 30px; 
        }
        .button { 
          display: inline-block; 
          background: #FF4F00; 
          color: white !important; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 6px; 
          font-weight: bold; 
          margin: 20px 0; 
        }
        .button:hover { 
          background: #e04500; 
          color: white !important; 
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #666; 
          font-size: 14px; 
        }
        a { 
          color: #FF4F00; 
          text-decoration: none; 
        }
        a:hover { 
          color: #e04500; 
          text-decoration: underline; 
        }
        h1 { 
          margin: 0 0 10px 0; 
          font-size: 28px; 
        }
        h2 { 
          margin: 0 0 15px 0; 
          color: #FF4F00; 
          font-size: 24px; 
        }
        h3 { 
          margin: 25px 0 15px 0; 
          color: #333; 
          font-size: 18px; 
        }
        ul { 
          margin: 15px 0; 
          padding-left: 20px; 
        }
        li { 
          margin: 8px 0; 
        }
        p { 
          margin: 15px 0; 
        }
        hr { 
          margin: 30px 0; 
          border: none; 
          border-top: 1px solid #ddd; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛠️ Welcome to Detroit Builders!</h1>
          <p>You're now part of the community</p>
        </div>
        
        <div class="content">
          <h2>Hi ${builderName}!</h2>
          
          <p>Welcome to Detroit's builder community! Your profile has been successfully added to our directory.</p>
          
          <h3>What you can do now:</h3>
          <ul>
            <li>Connect with other builders in the community</li>
            <li>Discover and collaborate on projects</li>
            <li>Share your skills and expertise</li>
            <li>Help strengthen Detroit's open commons</li>
          </ul>
          
          <a href="https://commons.buildetroit.xyz/builders" class="button">View All Builders</a>
          
          <h3>Need to update your profile?</h3>
          <p>You can modify your builder profile anytime using the link below:</p>
          
          <a href="${modificationUrl}" class="button">Modify Your Profile</a>
          
          <p><strong>Important:</strong> Keep this link safe - it's the only way to modify your profile.</p>
          
          <hr>
          
          <p>Questions? Reply to this email or visit <a href="https://commons.buildetroit.xyz">commons.buildetroit.xyz</a></p>
        </div>
        
        <div class="footer">
          <p>Detroit Commons - Building in the Open</p>
          <p>This email was sent because you joined our builder community.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Welcome to Detroit Builders, ${builderName}!`,
    html,
  });
}
