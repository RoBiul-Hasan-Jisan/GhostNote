'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ANIMATION_DURATION } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_DURATION.medium },
    },
  };

  return (
    <main className="min-h-screen w-full px-4 py-16 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_DURATION.short }}
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4"
        >
          <motion.h1 variants={itemVariants} className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About GhostNote
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
            A platform for honest, anonymous communication
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* What is GhostNote */}
          <motion.section variants={itemVariants} className="glass neon-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">What is GhostNote?</h2>
            <p className="text-foreground/80 leading-relaxed">
              GhostNote is a modern anonymous messaging platform designed to facilitate honest, authentic communication. Whether you want to share a confession, send a sincere compliment, express a secret crush, or reveal a hidden truth, GhostNote provides a safe, private space for these messages.
            </p>
          </motion.section>

          {/* How it Works */}
          <motion.section variants={itemVariants} className="glass neon-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">How it Works</h2>
            <ol className="space-y-3 text-foreground/80">
              <li className="flex gap-3">
                <span className="font-bold text-secondary min-w-fit">1.</span>
                <span>Create your unique link with a custom or randomly generated username</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-secondary min-w-fit">2.</span>
                <span>Share your link with friends, family, or colleagues</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-secondary min-w-fit">3.</span>
                <span>Receive honest, anonymous messages from anyone who has your link</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-secondary min-w-fit">4.</span>
                <span>View and organize your messages in your personal dashboard</span>
              </li>
            </ol>
          </motion.section>

          {/* Privacy & Security */}
          <motion.section variants={itemVariants} className="glass neon-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Privacy & Security</h2>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Complete anonymity - senders are never identified</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Your data is stored locally on your device</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>No tracking, no ads, no third-party data collection</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>You have full control over your messages</span>
              </li>
            </ul>
          </motion.section>

          {/* Message Types */}
          <motion.section variants={itemVariants} className="glass neon-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Message Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-2xl mb-2">🤐</div>
                <h3 className="font-bold">Confession</h3>
                <p className="text-sm text-muted-foreground">Share your secrets and innermost thoughts</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">✨</div>
                <h3 className="font-bold">Compliment</h3>
                <p className="text-sm text-muted-foreground">Tell someone what you appreciate about them</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">💕</div>
                <h3 className="font-bold">Secret Crush</h3>
                <p className="text-sm text-muted-foreground">Express your feelings anonymously</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="font-bold">Secret</h3>
                <p className="text-sm text-muted-foreground">Share anything you want to keep hidden</p>
              </div>
            </div>
          </motion.section>

          {/* Getting Started */}
          <motion.section variants={itemVariants} className="glass neon-border-blue rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-foreground/80 mb-6">
              Create your unique GhostNote link and start receiving meaningful, anonymous messages today.
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary">
                Create Your Link
              </Button>
            </Link>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
