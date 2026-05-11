import { ADJECTIVES, NOUNS, VALIDATION } from '@/lib/constants';
import { getUserProfileByUsername } from '@/lib/storage';

/**
 * Generate a random username from adjectives and nouns
 */
export const generateUsername = (): string => {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const randomNum = Math.floor(Math.random() * 1000);

  return `${adjective}${noun}${randomNum}`.toLowerCase();
};

/**
 * Generate a unique username that hasn't been taken
 */
export const generateUniqueUsername = (): string => {
  let username = generateUsername();
  let attempts = 0;
  const maxAttempts = 10;

  while (getUserProfileByUsername(username) !== null && attempts < maxAttempts) {
    username = generateUsername();
    attempts++;
  }

  if (attempts >= maxAttempts) {
    // Fallback to adding timestamp
    username = `${generateUsername()}-${Date.now()}`.toLowerCase();
  }

  return username;
};

/**
 * Validate username format
 */
export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  if (!username) {
    return { valid: false, error: 'Username is required' };
  }

  if (username.length < VALIDATION.minUsernameLength) {
    return {
      valid: false,
      error: `Username must be at least ${VALIDATION.minUsernameLength} characters`,
    };
  }

  if (username.length > VALIDATION.maxUsernameLength) {
    return {
      valid: false,
      error: `Username must not exceed ${VALIDATION.maxUsernameLength} characters`,
    };
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      valid: false,
      error: 'Username can only contain letters, numbers, dashes, and underscores',
    };
  }

  return { valid: true };
};

/**
 * Validate message content
 */
export const validateMessage = (content: string): { valid: boolean; error?: string } => {
  if (!content || !content.trim()) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (content.length < VALIDATION.minMessageLength) {
    return { valid: false, error: 'Message is too short' };
  }

  if (content.length > VALIDATION.maxMessageLength) {
    return {
      valid: false,
      error: `Message must not exceed ${VALIDATION.maxMessageLength} characters`,
    };
  }

  return { valid: true };
};

/**
 * Generate a unique message ID
 */
export const generateMessageId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format timestamp to readable date
 */
export const formatDate = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  // Less than a minute
  if (diff < 60000) {
    return 'just now';
  }

  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // Less than a week
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  // Format as date
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

/**
 * Get share URL for a username
 */
export const getShareUrl = (username: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return `${window.location.origin}/u/${username}`;
};
