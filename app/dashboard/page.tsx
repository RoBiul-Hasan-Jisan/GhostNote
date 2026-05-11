'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageList } from '@/components/message-list';
import { useUserData } from '@/hooks/useUserData';
import { useMessages } from '@/hooks/useMessages';
import { getShareUrl, copyToClipboard } from '@/lib/helpers';
import { Copy, Share2, LogOut, Settings } from 'lucide-react';
import { ANIMATION_DURATION } from '@/lib/constants';

export default function Dashboard() {
  const { profile, currentUserId } = useUserData();
  const { messages, removeMessage } = useMessages(currentUserId || '');
  const [copied, setCopied] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Redirect if no user logged in
  useEffect(() => {
    if (!currentUserId) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUserId]);

  if (redirecting || !profile || !currentUserId) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-4xl">🔄</div>
          <p className="text-muted-foreground">Redirecting to home...</p>
        </motion.div>
      </main>
    );
  }

  const shareUrl = getShareUrl(profile.username);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ChittiLink',
          text: 'Share your anonymous messages with me!',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out? You can log back in with your username.')) {
      localStorage.removeItem('chittilink-app-state');
      window.location.href = '/';
    }
  };

  return (
    <main className="min-h-screen w-full px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Your Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground">
                Welcome back, <span className="font-mono font-bold text-primary">{profile.username}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Share Section */}
          <div className="glass neon-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Your ChittiLink</h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-black/30 rounded-lg p-3 border border-primary/30 overflow-hidden">
                  <p className="text-sm font-mono text-foreground break-all">{shareUrl}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="gap-2 shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleShare}
                    className="gap-2 shrink-0"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this link with friends to receive anonymous messages
              </p>
            </div>
          </div>
        </motion.div>

        {/* Messages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Messages</h2>
            <span className="text-sm text-muted-foreground px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </span>
          </div>

          <MessageList
            messages={messages}
            onDeleteMessage={removeMessage}
            showDelete={true}
            emptyMessage="No messages yet. Share your link to receive your first message!"
          />
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-white/10"
        >
          <Link href="/">
            <Button variant="ghost" size="sm">
              Create Another Link
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm">
              About
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
