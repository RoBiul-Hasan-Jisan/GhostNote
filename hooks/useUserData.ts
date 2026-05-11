'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '@/types';
import {
  getUserProfile,
  getUserProfileByUsername,
  createUserProfile,
  getCurrentUserId,
  setCurrentUserId,
} from '@/lib/storage';

export const useUserData = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user profile
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let userProfile: UserProfile | null = null;

      if (userId) {
        userProfile = getUserProfile(userId);
      } else {
        const currentUserId = getCurrentUserId();
        if (currentUserId) {
          userProfile = getUserProfile(currentUserId);
        }
      }

      setProfile(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Create new user
  const createUser = useCallback((userId: string, username: string) => {
    try {
      const newProfile = createUserProfile(userId, username);
      setProfile(newProfile);
      return newProfile;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      setError(message);
      throw err;
    }
  }, []);

  // Get user by username
  const getUserByUsername = useCallback((username: string) => {
    try {
      return getUserProfileByUsername(username);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get user';
      setError(message);
      return null;
    }
  }, []);

  // Set current user
  const setCurrentUser = useCallback((userId: string | null) => {
    try {
      setCurrentUserId(userId);
      if (userId) {
        const userProfile = getUserProfile(userId);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to set current user';
      setError(message);
    }
  }, []);

  return {
    profile,
    loading,
    error,
    createUser,
    getUserByUsername,
    setCurrentUser,
    currentUserId: getCurrentUserId(),
  };
};
