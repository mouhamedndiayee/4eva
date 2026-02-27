/*
  # Create 4eva Application Schema

  ## Overview
  This migration creates the complete database schema for the 4eva application,
  a web platform for a Muslim couple interested in cosmos, geomatics, and Islamic sciences.

  ## Tables Created

  ### 1. weekends
  Special weekend experiences with:
  - id (uuid, primary key)
  - title (text) - Weekend title
  - description (text) - Full description
  - image_url (text) - Cover image URL
  - start_date (date) - When weekend begins
  - sections (jsonb) - Array of weekend sections/activities
  - created_at (timestamptz)
  - created_by (uuid) - References auth.users

  ### 2. articles
  Knowledge library articles about Islamic astronomy, geomatics, etc:
  - id (uuid, primary key)
  - title (text) - Article title
  - slug (text, unique) - URL-friendly identifier
  - category (text) - Category (astronomy, geomatics, history, etc.)
  - content (text) - Full article content
  - excerpt (text) - Short summary
  - image_url (text) - Cover image
  - tags (text array) - Searchable tags
  - is_published (boolean) - Publication status
  - created_at (timestamptz)
  - updated_at (timestamptz)

  ### 3. contemplation_entries
  Private journal entries for the couple:
  - id (uuid, primary key)
  - user_id (uuid) - References auth.users
  - title (text) - Entry title
  - content (text) - Journal entry text
  - verse_reference (text) - Quranic verse reference
  - observation_type (text) - Type of observation (celestial, reflection, etc.)
  - images (text array) - URLs to uploaded photos
  - created_at (timestamptz)

  ### 4. quiz_questions
  Questions for knowledge quizzes:
  - id (uuid, primary key)
  - category (text) - Question category
  - question (text) - Question text
  - options (jsonb) - Array of answer options
  - correct_answer (text) - Correct answer
  - explanation (text) - Why this is the answer
  - difficulty (text) - easy, medium, hard
  - created_at (timestamptz)

  ### 5. quiz_attempts
  Track quiz results:
  - id (uuid, primary key)
  - user_id (uuid) - References auth.users
  - quiz_date (date) - When quiz was taken
  - score (integer) - Points earned
  - total_questions (integer) - Total questions
  - badges_earned (text array) - Badges awarded
  - created_at (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Authenticated users can read articles and quiz questions
  - Only authenticated users can create/read their own contemplation entries
  - Only authenticated users can create/read their own quiz attempts
  - Weekends are readable by authenticated users

  ## Notes
  - All tables use UUID primary keys with gen_random_uuid()
  - Timestamps default to now()
  - Proper foreign key constraints to auth.users
  - Comprehensive RLS policies for data security
*/

-- Create weekends table
CREATE TABLE IF NOT EXISTS weekends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  start_date date NOT NULL,
  sections jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE weekends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view weekends"
  ON weekends FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create weekends"
  ON weekends FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  tags text[] DEFAULT ARRAY[]::text[],
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  TO authenticated
  USING (is_published = true);

-- Create contemplation_entries table
CREATE TABLE IF NOT EXISTS contemplation_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  verse_reference text,
  observation_type text DEFAULT 'reflection',
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contemplation_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own contemplation entries"
  ON contemplation_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own contemplation entries"
  ON contemplation_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contemplation entries"
  ON contemplation_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contemplation entries"
  ON contemplation_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  explanation text,
  difficulty text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view quiz questions"
  ON quiz_questions FOR SELECT
  TO authenticated
  USING (true);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  quiz_date date DEFAULT CURRENT_DATE,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  badges_earned text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own quiz attempts"
  ON quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_weekends_start_date ON weekends(start_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_contemplation_user_id ON contemplation_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
