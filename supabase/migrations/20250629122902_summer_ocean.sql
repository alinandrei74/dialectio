/*
  # Crear tabla courses

  1. Nueva tabla courses
    - `id` (uuid, primary key)
    - `title` (text, required)
    - `description` (text)
    - `target_language` (text, check constraint)
    - `source_language` (text, check constraint)
    - `level` (text, check constraint)
    - `total_lessons` (integer, check > 0)
    - `estimated_hours` (integer, check > 0)
    - `image_url` (text, optional)
    - `is_premium` (boolean, default false)
    - `created_at` (timestamptz, default now)
    - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS
    - Add policy for public read access
*/

-- Crear tabla courses
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  target_language text NOT NULL CHECK (target_language IN ('es','fr','pt','it','en')),
  source_language text NOT NULL CHECK (source_language IN ('es','fr','pt','it','en')),
  level text NOT NULL CHECK (level IN ('beginner','intermediate','advanced')),
  total_lessons integer NOT NULL CHECK (total_lessons > 0),
  estimated_hours integer NOT NULL CHECK (estimated_hours > 0),
  image_url text,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at en courses
CREATE TRIGGER update_courses_updated_at 
  BEFORE UPDATE ON courses 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Anyone can read courses"
  ON courses FOR SELECT
  TO public
  USING (true);

-- Índice para búsquedas por idioma
CREATE INDEX idx_courses_languages ON courses(source_language, target_language);
CREATE INDEX idx_courses_level ON courses(level);