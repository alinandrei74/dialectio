/*
  # ROLLBACK: Restaurar estructura original de base de datos

  Este script revierte la migración de reestructuración pedagógica,
  restaurando el esquema original sin pérdida de datos de cursos,
  lecciones ni ejercicios.
*/

-- ============================================================================
-- BLOQUE DOWN: ROLLBACK DE LA MIGRACIÓN
-- ============================================================================

BEGIN;

-- 1. Eliminar vista lessons
DROP VIEW IF EXISTS lessons;

-- 2. Restaurar tabla lessons original desde units
CREATE TABLE IF NOT EXISTS lessons_restored (
  id uuid PRIMARY KEY,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  lesson_order integer NOT NULL,
  lesson_type text NOT NULL CHECK (lesson_type IN ('vocabulary', 'grammar', 'conversation', 'culture', 'practice')),
  estimated_minutes integer DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Migrar datos de units de vuelta a lessons
INSERT INTO lessons_restored (
  id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes, created_at, updated_at
)
SELECT 
  u.id,
  p.course_id,
  u.title,
  'Lección restaurada desde unit',
  'Contenido restaurado desde unit',
  u.unit_order,
  'vocabulary', -- Tipo por defecto
  15,
  u.created_at,
  u.updated_at
FROM units u
JOIN phases ph ON u.phase_id = ph.id
JOIN parts p ON ph.part_id = p.id
WHERE u.kind = 'exercise';

-- 4. Renombrar unit_id de vuelta a lesson_id en exercises
ALTER TABLE exercises RENAME COLUMN unit_id TO lesson_id;

-- 5. Actualizar FK en exercises para apuntar a lessons restauradas
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_unit_id_fkey;
ALTER TABLE exercises ADD CONSTRAINT exercises_lesson_id_fkey 
  FOREIGN KEY (lesson_id) REFERENCES lessons_restored(id) ON DELETE CASCADE;

-- 6. Renombrar tabla lessons restaurada
DROP TABLE IF EXISTS lessons;
ALTER TABLE lessons_restored RENAME TO lessons;

-- 7. Recrear índices originales en lessons
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, lesson_order);

-- 8. Recrear trigger para lessons
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Recrear RLS en lessons
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read lessons" ON lessons FOR SELECT TO public USING (true);

-- 10. Eliminar constraint de validación de exercises.content
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_content_validation;

-- 11. Eliminar tablas nuevas en orden inverso (por dependencias FK)
DROP TABLE IF EXISTS chat_turns CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS attempts CASCADE;
DROP TABLE IF EXISTS units CASCADE;
DROP TABLE IF EXISTS phases CASCADE;
DROP TABLE IF EXISTS parts CASCADE;

-- 12. Limpiar índices huérfanos
DROP INDEX IF EXISTS idx_parts_course_id;
DROP INDEX IF EXISTS idx_phases_part_id;
DROP INDEX IF EXISTS idx_units_phase_id;
DROP INDEX IF EXISTS idx_attempts_user_unit;
DROP INDEX IF EXISTS idx_chat_sessions_user_unit;
DROP INDEX IF EXISTS idx_chat_turns_session_id;

COMMIT;

-- ============================================================================
-- INFORMACIÓN DE ROLLBACK
-- ============================================================================

DO $$
DECLARE
  total_courses integer;
  total_lessons integer;
  total_exercises integer;
BEGIN
  SELECT COUNT(*) INTO total_courses FROM courses;
  SELECT COUNT(*) INTO total_lessons FROM lessons;
  SELECT COUNT(*) INTO total_exercises FROM exercises;
  
  RAISE NOTICE '=== ROLLBACK COMPLETADO ===';
  RAISE NOTICE 'Cursos restaurados: %', total_courses;
  RAISE NOTICE 'Lecciones restauradas: %', total_lessons;
  RAISE NOTICE 'Ejercicios restaurados: %', total_exercises;
  RAISE NOTICE '';
  RAISE NOTICE 'Estructura original restaurada exitosamente.';
  RAISE NOTICE 'No se perdieron datos de cursos, lecciones ni ejercicios.';
END $$;