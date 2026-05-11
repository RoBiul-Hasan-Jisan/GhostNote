'use client';

import { useEffect, useState } from 'react';
import { getMessages, deleteMessage, getUserProfileByUsername, Message as SBMessage } from '@/lib/supabase-storage';
import { Message } from '@/types';

interface UseSBMessagesReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  removeMessage: (messageId: string) => Promise<void>;
}

export function useSBMessages(userIdentifier: string): UseSBMessagesReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userIdentifier) {
        setMessages([]);
        setLoading(false);
        return;
      }

      try {
        // Get user profile to get their ID
        const userProfile = await getUserProfileByUsername(userIdentifier);
        if (!userProfile) {
          setError('User not found');
          setLoading(false);
          return;
        }

        // Fetch messages from Supabase
        const sbMessages = await getMessages(userProfile.id);

        // Convert Supabase messages to app Message format
        const convertedMessages: Message[] = sbMessages.map((msg) => ({
          id: msg.id,
          type: msg.messageType as 'confession' | 'compliment' | 'crush' | 'secret',
          content: msg.messageText,
          timestamp: new Date(msg.createdAt).getTime(),
          createdAt: new Date(msg.createdAt).toLocaleDateString(),
        }));

        setMessages(convertedMessages);
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages');
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userIdentifier]);

  const removeMessage = async (messageId: string) => {
    try {
      const success = await deleteMessage(messageId);
      if (success) {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message');
    }
  };

  return { messages, loading, error, removeMessage };
}
