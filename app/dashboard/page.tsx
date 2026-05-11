'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageList } from '@/components/message-list';
import { getShareUrl, copyToClipboard } from '@/lib/helpers';
import { useSBMessages } from '@/hooks/useSBMessages';
import { Copy, Share2, LogOut, Heart, MessageCircle } from 'lucide-react';
import { ANIMATION_DURATION } from '@/lib/constants';

export default function Dashboard() {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { messages, removeMessage } = useSBMessages(username);
  const [copied, setCopied] = useState(false);

  // Get username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('ghostnote-username');
    if (!storedUsername) {
      window.location.href = '/';
    } else {
      setUsername(storedUsername);
      setLoading(false);
    }
  }, []);

  if (loading || !username) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-4xl">✨</div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </motion.div>
      </main>
    );
  }

  const shareUrl = getShareUrl(username);

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
          title: 'GhostNote',
          text: `Share your thoughts with me anonymously! Send me a message on GhostNote.`,
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

  // Calculate message statistics
  const messageStats = {
    total: messages.length,
    confession: messages.filter(m => m.type === 'confession').length,
    compliment: messages.filter(m => m.type === 'compliment').length,
    crush: messages.filter(m => m.type === 'crush').length,
    secret: messages.filter(m => m.type === 'secret').length,
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
                  Welcome, {username}
                </span>
              </h1>
              <p className="text-muted-foreground">
                Here&apos;s what your friends have been sharing with you
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass neon-border rounded-xl p-6"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Your Shareable Link
            </h2>
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
                Share this link with friends to receive anonymous messages, confessions, compliments, and secrets
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            <div className="glass neon-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{messageStats.total}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Messages</div>
            </div>
            <div className="glass neon-border rounded-lg p-4 text-center">
              <div className="text-xl">💬</div>
              <div className="text-sm font-semibold mt-1">{messageStats.confession}</div>
              <div className="text-xs text-muted-foreground">Confessions</div>
            </div>
            <div className="glass neon-border rounded-lg p-4 text-center">
              <div className="text-xl">💕</div>
              <div className="text-sm font-semibold mt-1">{messageStats.compliment}</div>
              <div className="text-xs text-muted-foreground">Compliments</div>
            </div>
            <div className="glass neon-border rounded-lg p-4 text-center">
              <div className="text-xl">😍</div>
              <div className="text-sm font-semibold mt-1">{messageStats.crush}</div>
              <div className="text-xs text-muted-foreground">Crush Notes</div>
            </div>
            <div className="glass neon-border rounded-lg p-4 text-center">
              <div className="text-xl">🤫</div>
              <div className="text-sm font-semibold mt-1">{messageStats.secret}</div>
              <div className="text-xs text-muted-foreground">Secrets</div>
            </div>
          </motion.div>
        )}

        {/* Messages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Messages Received</h2>
            <span className="text-sm text-muted-foreground px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </span>
          </div>

          <MessageList
            messages={messages}
            onDeleteMessage={removeMessage}
            showDelete={true}
            emptyMessage="No messages yet. Share your link to get started! Your friends can send you anonymous messages, compliments, confessions, and secrets."
          />
        </motion.div>

        {/* Call to Action */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass neon-border rounded-xl p-8 text-center space-y-4"
          >
            <Heart className="w-12 h-12 mx-auto text-primary opacity-50" />
            <h3 className="text-2xl font-bold">Start sharing your link!</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Copy your unique link above and share it with friends via social media, text, or email. They can then send you anonymous messages, compliments, or confessions.
            </p>
            <Button
              onClick={handleShare}
              size="lg"
              className="gap-2 mx-auto"
            >
              <Share2 className="w-4 h-4" />
              Share Your Link Now
            </Button>
          </motion.div>
        )}

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-white/10"
        >
          <Link href="/">
            <Button variant="ghost" size="sm">
              Create Another Account
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm">
              About GhostNote
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
