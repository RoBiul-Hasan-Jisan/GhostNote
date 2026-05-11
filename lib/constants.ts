import { MessageType } from '@/types';

export const ADJECTIVES = [
  'Silent', 'Vivid', 'Swift', 'Mystic', 'Zen', 'Neon', 'Echo', 'Pixel',
  'Cyber', 'Nova', 'Quantum', 'Cosmic', 'Phoenix', 'Nebula', 'Arcane',
  'Ethereal', 'Twilight', 'Radiant', 'Stellar', 'Aurora',
];

export const NOUNS = [
  'Ghost', 'Tiger', 'Wolf', 'Dragon', 'Phoenix', 'Falcon', 'Raven',
  'Lynx', 'Viper', 'Panther', 'Shadow', 'Knight', 'Sage', 'Oracle',
  'Seeker', 'Wanderer', 'Dancer', 'Mystic', 'Cipher', 'Nova',
];

export const MESSAGE_TYPES: Record<MessageType, { label: string; emoji: string; color: string }> = {
  confession: {
    label: 'Confession',
    emoji: '🤐',
    color: 'bg-purple-500/20 border-purple-500/50',
  },
  compliment: {
    label: 'Compliment',
    emoji: '✨',
    color: 'bg-blue-500/20 border-blue-500/50',
  },
  crush: {
    label: 'Secret Crush',
    emoji: '💕',
    color: 'bg-pink-500/20 border-pink-500/50',
  },
  secret: {
    label: 'Secret',
    emoji: '🔐',
    color: 'bg-indigo-500/20 border-indigo-500/50',
  },
};

export const PLACEHOLDER_MESSAGES = [
  'You seem like a genuinely kind person...',
  'I think you&apos;re amazing at what you do',
  'Your presence makes people feel welcome',
  'I admire your courage and authenticity',
  'You have a great sense of humor',
  'I appreciate how you listen to others',
  'Your creativity is inspiring',
  'You make a difference in people&apos;s lives',
];

export const TOAST_MESSAGES = {
  linkCopied: 'Link copied to clipboard!',
  messageSent: 'Message sent successfully!',
  messageDeleted: 'Message deleted',
  errorSubmitting: 'Failed to send message. Please try again.',
  errorFetching: 'Failed to load messages. Please refresh.',
};

export const VALIDATION = {
  minMessageLength: 1,
  maxMessageLength: 500,
  minUsernameLength: 3,
  maxUsernameLength: 20,
};

export const ANIMATION_DURATION = {
  short: 0.2,
  medium: 0.3,
  long: 0.5,
};

export const COLORS = {
  primary: '#a78bfa', // purple
  secondary: '#60a5fa', // blue
  accent: '#c084fc', // purple variant
  dark: '#0f172a',
  darkSecondary: '#1e293b',
};
