'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMessages } from '@/hooks/useMessages';
import { MESSAGE_TYPES, VALIDATION } from '@/lib/constants';
import { generateMessageId, validateMessage } from '@/lib/helpers';
import { MessageType, Message } from '@/types';
import { Send } from 'lucide-react';
import { ANIMATION_DURATION } from '@/lib/constants';

interface MessageFormProps {
  recipientId: string;
  onMessageSent?: () => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ recipientId, onMessageSent }) => {
  const { addNewMessage } = useMessages(recipientId);
  const [messageType, setMessageType] = useState<MessageType>('confession');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate message
    const validation = validateMessage(content);
    if (!validation.valid) {
      setError(validation.error || 'Invalid message');
      return;
    }

    setLoading(true);

    try {
      const newMessage: Message = {
        id: generateMessageId(),
        type: messageType,
        content,
        timestamp: Date.now(),
        createdAt: new Date().toLocaleDateString(),
      };

      addNewMessage(newMessage);
      setContent('');
      setSuccess(true);
      onMessageSent?.();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const charCount = content.length;
  const maxChars = VALIDATION.maxMessageLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION.medium }}
      className="w-full"
    >
      <div className="glass neon-border rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Type Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Message Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(MESSAGE_TYPES).map(([type, config]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMessageType(type as MessageType)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    messageType === type
                      ? 'border-primary/50 bg-primary/20 shadow-[0_0_20px_rgba(167,139,250,0.3)]'
                      : 'border-white/20 hover:border-primary/30 hover:bg-primary/10'
                  }`}
                >
                  <span className="text-2xl">{config.emoji}</span>
                  <span className="text-xs font-medium text-center">{config.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="content" className="block text-sm font-medium">
                Your Message
              </label>
              <span className={`text-xs ${
                charCount > maxChars * 0.9 ? 'text-red-400' : 'text-muted-foreground'
              }`}>
                {charCount}/{maxChars}
              </span>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your anonymous message here..."
              disabled={loading}
              maxLength={maxChars}
              className="min-h-[150px] resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-200"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-sm text-green-200 flex items-center gap-2"
            >
              <span className="text-lg">✓</span>
              Message sent successfully!
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={loading || !content.trim()}
            >
              <Send className="w-4 h-4" />
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </div>

          {/* Info */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <p className="text-xs text-muted-foreground text-center">
              Your message will be sent anonymously. The recipient won&apos;t know who sent it.
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 text-xs text-muted-foreground">
              <ul className="space-y-1">
                <li>Be genuine and authentic in your message</li>
                <li>Keep it respectful and positive</li>
                <li>Messages are permanently stored</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
