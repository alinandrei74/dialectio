/*
  # Crear vista de compatibilidad

  1. Vista lessons
    - Mapea units de tipo 'exercise' como lessons
    - Mantiene compatibilidad con código existente
    - Incluye campos necesarios para la aplicación

  2. Security
    - Enable RLS en la vista
    - Add policy para lectura pública
*/

-- Crear vista lessons que mapea units de tipo 'exercise'
CREATE OR REPLACE VIEW lessons AS
SELECT 
  u.id,
  p.course_id,
  u.title,
  COALESCE(
    'Unidad de ' || u.title || ' - ' || 
    CASE ph.kind 
      WHEN 'preparation' THEN 'Preparación'
      WHEN 'conversation' THEN 'Conversación'
      ELSE 'Ejercicio'
    END,
    'Descripción del ejercicio'
  ) as description,
  'Contenido del ejercicio: ' || u.title as content,
  u.unit_order as lesson_order,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'multiple_choice'
    ) THEN 'vocabulary'
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'translation'
    ) THEN 'grammar'
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'conversation'
    ) THEN 'conversation'
    WHEN EXISTS (
      SELECT 1 FROM exercises e 
      WHERE e.unit_id = u.id 
      AND e.exercise_type = 'audio'
    ) THEN 'culture'
    ELSE 'practice'
  END as lesson_type,
  COALESCE(
    (SELECT AVG(e.points)::integer FROM exercises e WHERE e.unit_id = u.id), 
    15
  ) as estimated_minutes,
  u.created_at,
  u.updated_at
FROM units u
JOIN phases ph ON ph.id = u.phase_id
JOIN parts p ON p.id = ph.part_id
WHERE u.kind = 'exercise'
ORDER BY p.course_id, p.part_order, ph.phase_order, u.unit_order;

-- Comentario explicativo
COMMENT ON VIEW lessons IS 'Vista de compatibilidad que mapea units de tipo exercise como lessons para mantener compatibilidad con código existente';

-- Nota: Las vistas no soportan RLS directamente, pero las tablas subyacentes sí tienen RLS habilitado