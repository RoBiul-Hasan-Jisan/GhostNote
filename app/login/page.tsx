'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserData } from '@/hooks/useUserData';
import { ANIMATION_DURATION } from '@/lib/constants';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { getUserByUsername, setCurrentUser, currentUserId } = useUserData();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUserId) {
      window.location.href = '/dashboard';
    }
  }, [currentUserId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setLoading(true);

    try {
      const userProfile = getUserByUsername(username.trim());

      if (!userProfile) {
        setError(`No account found with username "${username}". Please create a new account.`);
        setLoading(false);
        return;
      }

      // Set as current user
      setCurrentUser(userProfile.userId);

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full px-4 py-16">
      <div className="max-w-md mx-auto space-y-8">
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
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-muted-foreground">
            Sign in to your GhostNote account to view your messages
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.medium, delay: 0.1 }}
          className="glass neon-border rounded-xl p-8 space-y-6"
        >
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
                autoComplete="username"
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                Enter the username from your GhostNote link
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading || !username.trim()}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-background text-muted-foreground">or</span>
            </div>
          </div>

          {/* Create Account Link */}
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              Create New Account
            </Button>
          </Link>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass neon-border rounded-lg p-4 space-y-3"
        >
          <h3 className="font-semibold text-sm">Need Help?</h3>
          <p className="text-xs text-muted-foreground">
            If you can&apos;t remember your username, you&apos;ll need to create a new GhostNote. Your username is shown in your share link.
          </p>
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-full">
              Create New Account
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
