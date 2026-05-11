'use client';

import React, { useMemo, useState } from 'react';
import { Message, MessageType } from '@/types';
import { MessageCard } from './message-card';
import { MESSAGE_TYPES } from '@/lib/constants';
import { motion } from 'framer-motion';

interface MessageListProps {
  messages: Message[];
  onDeleteMessage?: (messageId: string) => void;
  showDelete?: boolean;
  filter?: MessageType | 'all';
  emptyMessage?: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onDeleteMessage,
  showDelete = false,
  filter = 'all',
  emptyMessage = 'No messages yet. Share your link to receive your first message!',
}) => {
  const [selectedFilter, setSelectedFilter] = useState<MessageType | 'all'>(filter);

  // Filter messages
  const filteredMessages = useMemo(() => {
    if (selectedFilter === 'all') {
      return [...messages].sort((a, b) => b.timestamp - a.timestamp);
    }
    return [...messages]
      .filter((msg) => msg.type === selectedFilter)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [messages, selectedFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const types = messages.reduce(
      (acc, msg) => {
        acc[msg.type] = (acc[msg.type] || 0) + 1;
        return acc;
      },
      {} as Record<MessageType, number>
    );

    return {
      total: messages.length,
      types,
    };
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <div className="text-4xl opacity-30">📭</div>
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats and Filter Section */}
      {showDelete && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div
              className="glass neon-border rounded-lg p-3 text-center cursor-pointer hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] transition-all"
              onClick={() => setSelectedFilter('all')}
            >
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>

            {Object.entries(MESSAGE_TYPES).map(([type, config]) => (
              <div
                key={type}
                className={`glass rounded-lg p-3 text-center cursor-pointer hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] transition-all border ${
                  selectedFilter === type
                    ? 'border-primary/50 shadow-[0_0_20px_rgba(167,139,250,0.3)]'
                    : 'border-white/20'
                }`}
                onClick={() => setSelectedFilter(type as MessageType)}
              >
                <div className="text-xl">{config.emoji}</div>
                <div className="text-xs text-muted-foreground">
                  {stats.types[type as MessageType] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <MessageCard
              message={message}
              onDelete={onDeleteMessage}
              showDelete={showDelete}
            />
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredMessages.length === 0 && selectedFilter !== 'all' && (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-2">
          <div className="text-3xl opacity-30">
            {MESSAGE_TYPES[selectedFilter].emoji}
          </div>
          <p className="text-center text-muted-foreground">
            No {MESSAGE_TYPES[selectedFilter].label.toLowerCase()} messages yet
          </p>
        </div>
      )}
    </div>
  );
};
