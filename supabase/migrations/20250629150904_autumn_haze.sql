-- Actualizar vista lessons para reflejar correctamente la nueva estructura
-- Esta migración asegura que la vista lessons funcione correctamente con units

BEGIN;

-- Eliminar vista existente si existe
DROP VIEW IF EXISTS lessons CASCADE;

-- Crear vista lessons actualizada que mapea units a lessons
CREATE VIEW lessons AS
SELECT  
    u.id                       AS id,
    p.course_id                AS course_id,
    u.title                    AS title,
    COALESCE(
        CASE u.kind 
            WHEN 'exercise' THEN 'Practica y mejora tus habilidades con estos ejercicios.'
            WHEN 'situation' THEN 'Participa en conversaciones reales y situaciones prácticas.'
            ELSE 'Contenido de aprendizaje interactivo.'
        END, 
        'Contenido de la unidad'
    ) AS description,
    COALESCE(
        CASE u.kind 
            WHEN 'exercise' THEN 'Esta unidad contiene ejercicios prácticos para reforzar tu aprendizaje.'
            WHEN 'situation' THEN 'Esta unidad te permite practicar en situaciones reales de conversación.'
            ELSE 'Contenido detallado de la unidad.'
        END,
        'Contenido detallado'
    ) AS content,
    u.unit_order               AS lesson_order,
    CASE 
        WHEN ph.kind = 'preparation' AND u.kind = 'exercise' THEN 'vocabulary'
        WHEN ph.kind = 'conversation' AND u.kind = 'situation' THEN 'conversation'
        ELSE 'practice'
    END AS lesson_type,
    CASE u.kind 
        WHEN 'exercise' THEN 15
        WHEN 'situation' THEN 25
        ELSE 20
    END AS estimated_minutes,
    u.created_at,
    u.updated_at
FROM units u
JOIN phases ph ON ph.id = u.phase_id
JOIN parts p ON p.id = ph.part_id
ORDER BY p.course_id, p.part_order, ph.phase_order, u.unit_order;

-- Asegurar que la vista tenga los permisos correctos
GRANT SELECT ON lessons TO anon, authenticated;

COMMIT;