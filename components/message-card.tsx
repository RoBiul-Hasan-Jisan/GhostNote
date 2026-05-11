'use client';

import React from 'react';
import { Message } from '@/types';
import { MESSAGE_TYPES } from '@/lib/constants';
import { formatDate } from '@/lib/helpers';
import { Trash2 } from 'lucide-react';

interface MessageCardProps {
  message: Message;
  onDelete?: (messageId: string) => void;
  showDelete?: boolean;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onDelete,
  showDelete = false,
}) => {
  const messageConfig = MESSAGE_TYPES[message.type];

  return (
    <div
      className={`glass neon-border rounded-lg p-6 flex flex-col gap-3 hover:shadow-[0_0_30px_rgba(167,139,250,0.2)] transition-all duration-200 group ${messageConfig.color}`}
    >
      {/* Header with type and date */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{messageConfig.emoji}</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {messageConfig.label}
          </span>
        </div>
        {showDelete && onDelete && (
          <button
            onClick={() => onDelete(message.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 p-1.5 hover:bg-red-500/10 rounded"
            aria-label="Delete message"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Message content */}
      <p className="text-sm leading-relaxed text-foreground break-words">{message.content}</p>

      {/* Footer with timestamp */}
      <div className="flex items-center justify-between gap-2 mt-2 pt-3 border-t border-white/10">
        <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
        {message.emojiReaction && (
          <span className="text-lg">{message.emojiReaction}</span>
        )}
      </div>
    </div>
  );
};
