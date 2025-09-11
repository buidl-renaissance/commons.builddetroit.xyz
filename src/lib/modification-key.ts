import { randomBytes } from 'crypto';

/**
 * Generate a secure modification key for email-based submissions
 * This key will be used to allow submitters to modify their submissions
 * via email links without requiring authentication
 */
export function generateModificationKey(): string {
  // Generate 32 random bytes and convert to base64url
  // This creates a secure, URL-safe key that's hard to guess
  const randomBytesBuffer = randomBytes(32);
  return randomBytesBuffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, ''); // Remove padding for shorter URLs
}

/**
 * Validate that a modification key has the expected format
 * This is a basic validation - the key should be base64url encoded
 */
export function isValidModificationKey(key: string): boolean {
  // Check if it's a valid base64url string of expected length
  // Our keys are 32 bytes = 43 characters in base64url (without padding)
  const base64urlRegex = /^[A-Za-z0-9_-]{43}$/;
  return base64urlRegex.test(key);
}

/**
 * Create a modification URL for a given key and type
 */
export function createModificationUrl(key: string, type: 'project' | 'builder'): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/modify/${type}/${key}`;
}
