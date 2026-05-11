'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateUniqueUsername, copyToClipboard, getShareUrl } from '@/lib/helpers';
import { createUser, usernameExists } from '@/lib/supabase-storage';
import { Copy, Share2, RotateCcw } from 'lucide-react';
import { ANIMATION_DURATION } from '@/lib/constants';

interface LinkGeneratorProps {
  onLinksGenerated?: () => void;
}

export const LinkGenerator: React.FC<LinkGeneratorProps> = ({ onLinksGenerated }) => {
  const [username, setUsername] = useState<string>('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const generateLink = async () => {
    setLoading(true);
    setError('');
    try {
      let finalUsername = username.trim();
      
      // If no username provided, generate one
      if (!finalUsername) {
        finalUsername = generateUniqueUsername();
      }
      
      // Check if username already exists
      const exists = await usernameExists(finalUsername);
      if (exists) {
        setError('Username already taken. Please choose another one.');
        setLoading(false);
        return;
      }
      
      // Create user in Supabase
      const user = await createUser(finalUsername);
      if (!user) {
        setError('Failed to create account. Please try again.');
        setLoading(false);
        return;
      }
      
      // Save username to localStorage for dashboard access
      localStorage.setItem('ghostnote-username', finalUsername);
      
      setUsername(finalUsername);
      setGenerated(true);
      onLinksGenerated?.();
    } catch (error) {
      console.error('Failed to generate link:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const url = getShareUrl(username);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = getShareUrl(username);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ChittiLink',
          text: 'Share your anonymous messages with me!',
          url: url,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      handleCopy();
    }
  };

  const shareUrl = generated ? getShareUrl(username) : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: ANIMATION_DURATION.medium }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="glass neon-border rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Create Your Link</h2>
          <p className="text-muted-foreground">
            {generated
              ? 'Share this link with friends to receive messages'
              : 'Generate your unique ChittiLink to start receiving messages'}
          </p>
        </div>

        {!generated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ANIMATION_DURATION.short }}
            className="space-y-4"
          >
            <div className="space-y-3">
              <label className="block text-sm font-medium">Your Username</label>
              <div className="flex gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a custom username (optional)"
                  disabled={loading}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave empty to generate a random username
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <Button
              onClick={generateLink}
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate My Link'}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.medium }}
            className="space-y-4"
          >
            {/* Display generated link */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your Link</label>
              <div className="flex gap-2 bg-black/30 rounded-lg p-3 border border-primary/30">
                <Input
                  value={shareUrl}
                  readOnly
                  className="bg-transparent border-0 text-foreground text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Username display */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your Username</label>
              <div className="bg-black/30 rounded-lg p-3 border border-primary/30 text-center">
                <p className="text-lg font-mono font-bold text-primary">{username}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setGenerated(false);
                  setUsername('');
                  setCopied(false);
                }}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                New Link
              </Button>
            </div>

            {/* Info box */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm text-foreground">
              <p className="font-medium mb-1">How it works:</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>1. Share your link with friends</li>
                <li>2. They can send you anonymous messages</li>
                <li>3. View all messages in your dashboard</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
