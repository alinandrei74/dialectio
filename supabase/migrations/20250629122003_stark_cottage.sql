/*
  # Capa 1: Catálogo de Cursos

  1. Tabla courses (ya existe, solo actualizamos constraints si es necesario)
    - Verificar que tenga todos los campos requeridos
    - Añadir constraints faltantes
*/

-- Actualizar tabla courses si es necesario
DO $$
BEGIN
  -- Verificar y añadir columnas faltantes
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'total_lessons'
  ) THEN
    ALTER TABLE courses ADD COLUMN total_lessons integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'estimated_hours'
  ) THEN
    ALTER TABLE courses ADD COLUMN estimated_hours integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE courses ADD COLUMN image_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'courses' AND column_name = 'is_premium'
  ) THEN
    ALTER TABLE courses ADD COLUMN is_premium boolean DEFAULT false;
  END IF;
END $$;

-- Añadir constraints a courses
ALTER TABLE courses 
  DROP CONSTRAINT IF EXISTS courses_target_language_check,
  DROP CONSTRAINT IF EXISTS courses_source_language_check,
  DROP CONSTRAINT IF EXISTS courses_level_check,
  DROP CONSTRAINT IF EXISTS courses_total_lessons_check,
  DROP CONSTRAINT IF EXISTS courses_estimated_hours_check;

ALTER TABLE courses 
  ADD CONSTRAINT courses_target_language_check 
    CHECK (target_language IN ('es','fr','pt','it','en')),
  ADD CONSTRAINT courses_source_language_check 
    CHECK (source_language IN ('es','fr','pt','it','en')),
  ADD CONSTRAINT courses_level_check 
    CHECK (level IN ('beginner','intermediate','advanced')),
  ADD CONSTRAINT courses_total_lessons_check 
    CHECK (total_lessons > 0),
  ADD CONSTRAINT courses_estimated_hours_check 
    CHECK (estimated_hours > 0);

-- Asegurar que title sea NOT NULL
ALTER TABLE courses ALTER COLUMN title SET NOT NULL;

-- Asegurar que is_premium tenga default
ALTER TABLE courses ALTER COLUMN is_premium SET DEFAULT false;