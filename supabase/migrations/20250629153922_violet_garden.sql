-- Migración para eliminar niveles de curso
-- Elimina la columna level y restricciones asociadas de la tabla courses

BEGIN;

-- 1. Eliminar la restricción CHECK para levels
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_level_check;

-- 2. Eliminar la columna level
ALTER TABLE courses DROP COLUMN IF EXISTS level;

-- 3. Actualizar cursos existentes para asegurar que solo hay uno por combinación de idiomas
-- Eliminar duplicados manteniendo solo el primer curso de cada combinación
DELETE FROM courses 
WHERE id NOT IN (
    SELECT DISTINCT ON (target_language, source_language) id
    FROM courses 
    ORDER BY target_language, source_language, created_at ASC
);

-- 4. Crear índice único para prevenir duplicados futuros
CREATE UNIQUE INDEX IF NOT EXISTS courses_language_pair_unique 
ON courses (target_language, source_language);

COMMIT;