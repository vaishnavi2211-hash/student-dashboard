-- Run this SQL in your Supabase project's SQL Editor
-- Dashboard → SQL Editor → New Query → Paste and Run

-- Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'book-open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anon key) — adjust for auth in production
CREATE POLICY "Public read access"
  ON courses FOR SELECT
  TO anon
  USING (true);

-- Seed data: 4 mock courses
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Layers'),
  ('System Design for Engineers', 42, 'Network'),
  ('TypeScript Deep Dive', 90, 'Code2'),
  ('Full-Stack with Next.js', 28, 'Globe');
