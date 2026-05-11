'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageForm } from '@/components/message-form';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/hooks/useUserData';
import { ANIMATION_DURATION } from '@/lib/constants';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function MessagePage({ params }: PageProps) {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const { getUserByUsername } = useUserData();

  useEffect(() => {
    // Unwrap params promise
    params.then(({ username }) => {
      setUsername(username);
      const profile = getUserByUsername(username);
      if (!profile) {
        setProfileNotFound(true);
      }
      setLoading(false);
    });
  }, [params, getUserByUsername]);

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-4xl">✨</div>
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      </main>
    );
  }

  if (profileNotFound) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: ANIMATION_DURATION.medium }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="text-6xl">❌</div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Link Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, we couldn&apos;t find the ChittiLink you&apos;re looking for. The link may be expired or invalid.
            </p>
          </div>

          <div className="glass neon-border-blue rounded-lg p-4 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              Make sure you copied the link correctly and try again.
            </div>
          </div>

          <Link href="/">
            <Button size="lg" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_DURATION.short }}
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium }}
          className="text-center space-y-4"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Send an Anonymous Message
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              to <span className="font-mono font-bold text-primary">{username}</span>
            </p>
          </div>

          <div className="glass neon-border rounded-lg p-4 text-sm text-muted-foreground">
            Your identity will remain completely anonymous. Only the message content will be shared.
          </div>
        </motion.div>

        {/* Message Form */}
        <MessageForm recipientId={username} onMessageSent={() => {}} />

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: '🔐', title: 'Anonymous', desc: 'Completely private' },
            { icon: '⚡', title: 'Instant', desc: 'Delivered immediately' },
            { icon: '❤️', title: 'Authentic', desc: 'No judgment zone' },
          ].map((feature) => (
            <div key={feature.title} className="glass neon-border rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="font-semibold text-primary mb-1">{feature.title}</div>
              <div className="text-xs text-muted-foreground">{feature.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
