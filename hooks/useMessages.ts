'use client';

import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/types';
import { getUserProfile, addMessage, deleteMessage, ensureUserProfile } from '@/lib/storage';

export const useMessages = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load messages for user
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const profile = getUserProfile(userId);
      setMessages(profile?.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Add new message
  const addNewMessage = useCallback(
    (message: Message) => {
      try {
        addMessage(userId, message);
        setMessages((prev) => [...prev, message]);
        return message;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to add message';
        setError(message);
        throw err;
      }
    },
    [userId]
  );

  // Delete message
  const removeMessage = useCallback(
    (messageId: string) => {
      try {
        deleteMessage(userId, messageId);
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete message';
        setError(message);
        throw err;
      }
    },
    [userId]
  );

  // Get messages by type
  const getMessagesByType = useCallback((type: string) => {
    return messages.filter((msg) => msg.type === type);
  }, [messages]);

  return {
    messages,
    loading,
    error,
    addNewMessage,
    removeMessage,
    getMessagesByType,
  };
};
