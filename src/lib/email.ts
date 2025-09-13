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
        body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #FF4F00, #FFD700); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { display: inline-block; background: #FF4F00; color: white !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .button:hover { background: #e04500; color: white !important; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; padding: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
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
          <p>This email was sent because you're part of our builder community.</p>
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

/**
 * Send builder invitation email
 */
export async function sendBuilderInvitationEmail({
  to,
  name,
  invitationUrl,
  invitedBy
}: {
  to: string;
  name: string;
  invitationUrl: string;
  invitedBy: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You're Invited to Detroit Builders - Detroit Commons</title>
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
        .highlight {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 You're Invited!</h1>
          <p>Detroit's Builder Community</p>
        </div>
        
        <div class="content">
          <h2>Hi ${name}!</h2>
          
          <p>You've been invited to Detroit's builder community by ${invitedBy}! We'd love to have you as part of our network of creative and technical minds building Detroit's open commons.</p>
          
          <div class="highlight">
            <strong>What's next?</strong> Click the button below to accept your invitation and set up your builder profile. You'll be able to customize your information and connect with other builders in the community.
          </div>
          
          <h3>What you'll get:</h3>
          <ul>
            <li>Your own builder profile page</li>
            <li>Access to the community directory</li>
            <li>Opportunities to collaborate on projects</li>
            <li>Connection with other Detroit builders</li>
            <li>Updates on community events and opportunities</li>
          </ul>
          
          <a href="${invitationUrl}" class="button">Accept Invitation</a>
          
          <p><strong>Important:</strong> This invitation link will expire in 30 days. If you have any questions, just reply to this email!</p>
          
          <hr>
          
          <p>Questions? Reply to this email or visit <a href="https://commons.buildetroit.xyz">commons.buildetroit.xyz</a></p>
        </div>
        
        <div class="footer">
          <p>Detroit Commons - Building in the Open</p>
          <p>This invitation was sent by ${invitedBy} to invite you to our builder community.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: `You're Invited to Detroit Builders!`,
    html,
  });
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  modificationKey: string
) {
  const modificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/builder/${modificationKey}/modify`;
  const openOctoberUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/open-october`;
  const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/builder/${modificationKey}/invite`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Detroit Builders!</title>
    </head>
    <body style="margin: 0; padding: 1rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
            Welcome to Detroit Builders! 🎉
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            You're now part of our amazing builder community
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="color: #222324; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Hi ${name},
          </p>
          
          <p style="color: #222324; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Welcome to Detroit Commons! We're thrilled to have you in our community of builders, creators, and innovators. You're now part of something special.
          </p>

          <!-- Open October Section -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #FF6B35; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h2 style="color: #FF6B35; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
              🚀 Open October is Here!
            </h2>
            <p style="color: #222324; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Don't miss out on our biggest event of the year! Open October brings together builders from across Detroit for a month of collaboration, learning, and building in the open.
            </p>
            <a href="${openOctoberUrl}" style="display: inline-block; background-color: #FF6B35; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
              Learn About Open October
            </a>
          </div>

          <!-- Account Management Section -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h2 style="color: #4CAF50; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
              ✏️ Manage Your Profile
            </h2>
            <p style="color: #222324; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              You can update your profile, add more details, or change your information anytime using your personal modification link.
            </p>
            <a href="${modificationUrl}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
              Update My Profile
            </a>
          </div>

          <!-- Invite Others Section -->
          <div style="background-color: #f8f9fa; border-left: 4px solid #2196F3; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h2 style="color: #2196F3; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
              👥 Invite Other Builders
            </h2>
            <p style="color: #222324; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Know other amazing builders who should be part of our community? You can send them personalized invitations with pre-filled profiles.
            </p>
            <a href="${inviteUrl}" style="display: inline-block; background-color: #2196F3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
              Invite Builders
            </a>
          </div>

          <p style="color: #222324; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
            We're excited to see what you'll build! If you have any questions or need help getting started, don't hesitate to reach out.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
            <strong>Detroit Commons</strong> - Building in the Open
          </p>
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            Questions? Reply to this email or visit <a href="https://commons.buildetroit.xyz" style="color: #FF6B35; text-decoration: none;">commons.buildetroit.xyz</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Welcome to Detroit Builders, ${name}! 🎉`,
    html,
  });
}
