-- The Long Game - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 3 AND age <= 18),
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
  ethnicity VARCHAR(50),
  zip_code VARCHAR(10) NOT NULL,
  state VARCHAR(2) NOT NULL,
  current_height_inches INTEGER NOT NULL,
  estimated_adult_height_inches INTEGER,
  father_height_inches INTEGER,
  mother_height_inches INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster user queries
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- ============================================================================
-- USER SETTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_settings (
  id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  active_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  weights JSONB DEFAULT '{"funFactor": 50, "skillFocus": 50, "competition": 50, "opportunity": 50, "accessibility": 50}',
  compare_list TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policies for profiles: users can only access their own data
CREATE POLICY "Users can view own profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profiles" ON profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own profiles" ON profiles
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete own profiles" ON profiles
  FOR DELETE USING (true);

-- Policies for user_settings: users can only access their own settings
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (true);

-- ============================================================================
-- DONE!
-- ============================================================================
-- After running this SQL:
-- 1. Go to Settings > API in your Supabase dashboard
-- 2. Copy your Project URL and anon/public key
-- 3. Add them to your .env file or Netlify environment variables:
--    VITE_SUPABASE_URL=your-project-url
--    VITE_SUPABASE_ANON_KEY=your-anon-key
