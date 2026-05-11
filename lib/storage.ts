import { AppState, UserProfile, Message } from '@/types';

const STORAGE_KEY = 'chittilink-app-state';

// Initialize default state
const getDefaultState = (): AppState => ({
  profiles: {},
  currentUserId: undefined,
});

// Get entire app state
export const getAppState = (): AppState => {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const state = localStorage.getItem(STORAGE_KEY);
    return state ? JSON.parse(state) : getDefaultState();
  } catch (error) {
    console.error('Error reading app state:', error);
    return getDefaultState();
  }
};

// Save entire app state
export const saveAppState = (state: AppState): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving app state:', error);
  }
};

// Get user profile by userId or username
export const getUserProfile = (userIdentifier: string): UserProfile | null => {
  const state = getAppState();
  
  // Try direct lookup by userId first
  if (state.profiles[userIdentifier]) {
    return state.profiles[userIdentifier];
  }
  
  // Then try lookup by username
  return Object.values(state.profiles).find((p) => p.username === userIdentifier) || null;
};

// Get user profile by username
export const getUserProfileByUsername = (username: string): UserProfile | null => {
  const state = getAppState();
  return Object.values(state.profiles).find((p) => p.username === username) || null;
};

// Create new user profile
export const createUserProfile = (userId: string, username: string): UserProfile => {
  const state = getAppState();

  const userProfile: UserProfile = {
    userId,
    username,
    createdAt: Date.now(),
    messages: [],
  };

  state.profiles[userId] = userProfile;
  state.currentUserId = userId;

  saveAppState(state);
  return userProfile;
};

// Ensure user profile exists, create if not
export const ensureUserProfile = (userId: string, username?: string): UserProfile => {
  const state = getAppState();
  let profile = state.profiles[userId];

  if (!profile) {
    // Create profile if it doesn't exist
    profile = {
      userId,
      username: username || userId,
      createdAt: Date.now(),
      messages: [],
    };
    state.profiles[userId] = profile;
    saveAppState(state);
  }

  return profile;
};

// Add message to user profile
export const addMessage = (userIdentifier: string, message: Message): void => {
  const state = getAppState();
  
  // Try to find by userId first, then by username
  let profile = state.profiles[userIdentifier];
  
  if (!profile) {
    // If not found by userId, search by username
    profile = Object.values(state.profiles).find((p) => p.username === userIdentifier);
  }

  if (!profile) {
    // Create profile if it doesn't exist when receiving a message
    profile = ensureUserProfile(userIdentifier, userIdentifier);
  }

  profile.messages.push(message);
  state.profiles[profile.userId] = profile;
  saveAppState(state);
};

// Delete message from user profile
export const deleteMessage = (userId: string, messageId: string): void => {
  const state = getAppState();
  const profile = state.profiles[userId];

  if (!profile) {
    console.error('Profile not found:', userId);
    return;
  }

  profile.messages = profile.messages.filter((msg) => msg.id !== messageId);
  saveAppState(state);
};

// Get current user ID
export const getCurrentUserId = (): string | null => {
  const state = getAppState();
  return state.currentUserId || null;
};

// Set current user ID
export const setCurrentUserId = (userId: string | null): void => {
  const state = getAppState();
  state.currentUserId = userId || undefined;
  saveAppState(state);
};

// Clear all data (for development/testing)
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
