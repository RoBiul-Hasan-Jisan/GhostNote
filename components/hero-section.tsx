'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ANIMATION_DURATION } from '@/lib/constants';

interface HeroSectionProps {
  onCreateClick: () => void;
}

const SLOGAN_WORDS = ['Anonymous', 'Honest', 'Authentic'];

export const HeroSection: React.FC<HeroSectionProps> = ({ onCreateClick }) => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % SLOGAN_WORDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      {/* Floating cards background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_DURATION.long }}
        className="absolute top-20 left-10 w-32 h-32 glass neon-border rounded-lg blur-sm opacity-20 md:blur-none md:opacity-100 animate-float"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_DURATION.long, delay: 0.1 }}
        className="absolute bottom-32 right-10 w-24 h-24 glass neon-border-blue rounded-lg opacity-20 md:opacity-100 animate-float"
        style={{ animationDelay: '1s' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_DURATION.long, delay: 0.2 }}
        className="absolute top-40 right-20 w-20 h-20 glass neon-border rounded-lg opacity-20 md:opacity-100 animate-float"
        style={{ animationDelay: '2s' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            GhostNote
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Share your thoughts{' '}
            <span className="text-primary font-semibold">
              {SLOGAN_WORDS[currentWord]}
            </span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.1 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Receive honest, anonymous messages from your friends. Share confessions, compliments, crushes, or secrets in a safe, judgment-free space.
          </p>
          <p className="text-sm text-muted-foreground">
            Create your unique link, share it with friends, and start receiving real, meaningful messages today.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.2 }}
          className="pt-4 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            size="lg"
            variant="default"
            onClick={onCreateClick}
            className="text-lg px-8 py-6 animate-pulse-glow"
          >
            Create Your Link
          </Button>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Sign In
            </Button>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8"
        >
          {[
            { icon: '🔐', label: 'Private', desc: 'Your messages stay private' },
            { icon: '⚡', label: 'Instant', desc: 'Receive messages instantly' },
            { icon: '🎯', label: 'Authentic', desc: 'True anonymous feedback' },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass neon-border rounded-lg p-4"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="font-semibold text-primary mb-1">{feature.label}</div>
              <div className="text-xs text-muted-foreground">{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
