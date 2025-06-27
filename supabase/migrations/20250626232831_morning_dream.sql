/*
  # Create Learning Platform Tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `target_language` (text)
      - `source_language` (text)
      - `level` (text)
      - `total_lessons` (integer)
      - `estimated_hours` (integer)
      - `image_url` (text, optional)
      - `is_premium` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `lessons`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `lesson_order` (integer)
      - `lesson_type` (text)
      - `estimated_minutes` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `exercises`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, foreign key)
      - `title` (text)
      - `instructions` (text)
      - `exercise_type` (text)
      - `content` (jsonb)
      - `points` (integer)
      - `exercise_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key)
      - `current_lesson_id` (uuid, optional foreign key)
      - `completed_lessons` (text array)
      - `total_points` (integer)
      - `completion_percentage` (integer)
      - `last_accessed` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `user_exercise_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `exercise_id` (uuid, foreign key)
      - `is_correct` (boolean)
      - `user_answer` (text)
      - `points_earned` (integer)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for public read access to courses and lessons
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  target_language text NOT NULL,
  source_language text NOT NULL DEFAULT 'es',
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  total_lessons integer NOT NULL DEFAULT 0,
  estimated_hours integer NOT NULL DEFAULT 1,
  image_url text,
  is_premium boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  lesson_order integer NOT NULL,
  lesson_type text NOT NULL CHECK (lesson_type IN ('vocabulary', 'grammar', 'conversation', 'culture', 'practice')),
  estimated_minutes integer NOT NULL DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  instructions text NOT NULL,
  exercise_type text NOT NULL CHECK (exercise_type IN ('multiple_choice', 'fill_blank', 'translation', 'audio', 'conversation')),
  content jsonb NOT NULL,
  points integer NOT NULL DEFAULT 10,
  exercise_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  current_lesson_id uuid REFERENCES lessons(id) ON DELETE SET NULL,
  completed_lessons text[] DEFAULT '{}',
  total_points integer DEFAULT 0,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create user_exercise_results table
CREATE TABLE IF NOT EXISTS user_exercise_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id uuid NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  is_correct boolean NOT NULL,
  user_answer text NOT NULL,
  points_earned integer DEFAULT 0,
  completed_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, lesson_order);
CREATE INDEX IF NOT EXISTS idx_exercises_lesson_id ON exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_exercises_order ON exercises(lesson_id, exercise_order);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_results_user_id ON user_exercise_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_results_exercise_id ON user_exercise_results(exercise_id);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_results ENABLE ROW LEVEL SECURITY;

-- Policies for courses (public read access)
CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO public
  USING (true);

-- Policies for lessons (public read access)
CREATE POLICY "Anyone can read lessons"
  ON lessons
  FOR SELECT
  TO public
  USING (true);

-- Policies for exercises (public read access)
CREATE POLICY "Anyone can read exercises"
  ON exercises
  FOR SELECT
  TO public
  USING (true);

-- Policies for user_progress (users can only access their own data)
CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_exercise_results (users can only access their own data)
CREATE POLICY "Users can read own exercise results"
  ON user_exercise_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise results"
  ON user_exercise_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();