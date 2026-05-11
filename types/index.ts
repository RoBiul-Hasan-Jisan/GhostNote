export type MessageType = 'confession' | 'compliment' | 'crush' | 'secret';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  emojiReaction?: string;
  timestamp: number;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  username: string;
  createdAt: number;
  messages: Message[];
}

export interface AppState {
  profiles: Record<string, UserProfile>;
  currentUserId?: string;
}
