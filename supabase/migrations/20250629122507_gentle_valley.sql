/*
  # Crear vista de compatibilidad lessons

  1. Vista lessons
    - Selecciona de units donde kind='exercise'
    - Mantiene compatibilidad con código existente
    - Incluye campos calculados para lesson_order y lesson_type
*/

-- Crear vista lessons que selecciona de units donde kind='exercise'
CREATE OR REPLACE VIEW lessons AS
SELECT 
  u.id,
  u.phase_id as course_id, -- Mapeo temporal, se puede ajustar según necesidades
  u.title,
  'Ejercicio de ' || u.title as description,
  'Contenido del ejercicio' as content,
  u.unit_order as lesson_order,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'vocabulary'
    ) THEN 'vocabulary'
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'multiple_choice'
    ) THEN 'practice'
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'conversation'
    ) THEN 'conversation'
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'translation'
    ) THEN 'grammar'
    ELSE 'practice'
  END as lesson_type,
  COALESCE(
    (SELECT AVG(e.points * 2) FROM exercises e WHERE e.unit_id = u.id), 
    15
  )::integer as estimated_minutes,
  u.created_at,
  u.updated_at
FROM units u
WHERE u.kind = 'exercise';

-- Habilitar RLS en la vista
ALTER VIEW lessons ENABLE ROW LEVEL SECURITY;

-- Política para la vista lessons (público puede leer)
CREATE POLICY "Anyone can read lessons view"
  ON lessons FOR SELECT
  TO public
  USING (true);

COMMENT ON VIEW lessons IS 'Vista de compatibilidad que mapea units de tipo exercise como lessons para mantener compatibilidad con código existente';