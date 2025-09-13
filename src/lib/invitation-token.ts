import { randomBytes } from 'crypto';

/**
 * Generate a secure invitation token
 */
export function generateInvitationToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Create an invitation URL
 */
export function createInvitationUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/invite/builder/${token}`;
}
