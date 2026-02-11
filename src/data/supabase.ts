import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Create Supabase client (only if configured)
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types matching our schema
export interface ProfileRow {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  ethnicity: string | null;
  zip_code: string;
  state: string;
  current_height_inches: number;
  estimated_adult_height_inches: number | null;
  father_height_inches: number | null;
  mother_height_inches: number | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface SettingsRow {
  id: number;
  user_id: string;
  active_profile_id: string | null;
  weights: {
    funFactor: number;
    skillFocus: number;
    competition: number;
    opportunity: number;
    accessibility: number;
  };
  compare_list: string[];
  created_at: string;
  updated_at: string;
}

// Get or generate anonymous user ID (stored in localStorage)
export const getUserId = (): string => {
  const storageKey = 'the-long-game-user-id';
  let userId = localStorage.getItem(storageKey);
  if (!userId) {
    userId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, userId);
  }
  return userId;
};
