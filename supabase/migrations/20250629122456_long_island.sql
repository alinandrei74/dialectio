/*
  # Renombrar tablas legacy y crear vista de compatibilidad

  1. Renombrado seguro de tablas existentes
    - Verifica si las tablas existen antes de renombrarlas
    - Manejo especial para la tabla lessons
  
  2. Limpieza de vistas y tablas conflictivas
    - Elimina vistas y tablas lessons existentes
  
  3. Vista de compatibilidad
    - Crea vista lessons que selecciona de units donde kind='exercise'
*/

-- Función auxiliar para verificar si una tabla existe
DO $$
BEGIN
  -- Renombrar lessons de manera segura
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'lessons' 
    AND table_type = 'BASE TABLE'
  ) THEN
    -- Verificar que es una tabla real (no una vista)
    IF EXISTS (
      SELECT 1 FROM pg_class 
      WHERE relname = 'lessons' 
      AND relkind = 'r'
    ) THEN
      ALTER TABLE lessons RENAME TO legacy_lessons;
      RAISE NOTICE 'Tabla lessons renombrada a legacy_lessons';
    END IF;
  END IF;

  -- Renombrar otras tablas si existen
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'exercises' 
    AND table_type = 'BASE TABLE'
  ) THEN
    ALTER TABLE exercises RENAME TO legacy_exercises;
    RAISE NOTICE 'Tabla exercises renombrada a legacy_exercises';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'user_progress' 
    AND table_type = 'BASE TABLE'
  ) THEN
    ALTER TABLE user_progress RENAME TO legacy_user_progress;
    RAISE NOTICE 'Tabla user_progress renombrada a legacy_user_progress';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'user_exercise_results' 
    AND table_type = 'BASE TABLE'
  ) THEN
    ALTER TABLE user_exercise_results RENAME TO legacy_user_exercise_results;
    RAISE NOTICE 'Tabla user_exercise_results renombrada a legacy_user_exercise_results';
  END IF;

END $$;

-- Limpiar vistas y tablas lessons existentes
DROP VIEW IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;

RAISE NOTICE 'Limpieza de lessons completada';

-- Crear vista de compatibilidad lessons
-- NOTA: Esta vista se creará después de que exista la tabla units
-- Se incluirá en una migración posterior para evitar errores de dependencias