/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `slug` (text, unique, not null)
      - `author_id` (uuid, foreign key to profiles)
      - `content` (text, not null)
      - `excerpt` (text, nullable)
      - `image_url` (text, nullable)
      - `published_at` (timestamp, nullable)
      - `is_published` (boolean, default false)
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public to read published posts
    - Add policies for authenticated users to manage their own posts

  3. Indexes
    - Add index on slug for fast lookups
    - Add index on published_at for sorting
    - Add index on is_published for filtering
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  excerpt text,
  image_url text,
  published_at timestamptz,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can create their own posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can read their own posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update their own posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can delete their own posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);

-- Trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();