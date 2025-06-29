-- Script para eliminar todas las tablas relacionadas con cursos
-- ¡ADVERTENCIA! Este script eliminará permanentemente todos los datos

-- Eliminar tablas en el orden inverso de sus dependencias
DROP TABLE IF EXISTS chat_turns CASCADE;
DROP TABLE IF EXISTS attempts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS units CASCADE;
DROP TABLE IF EXISTS phases CASCADE;
DROP TABLE IF EXISTS parts CASCADE;
DROP TABLE IF EXISTS suggestion_rules CASCADE;
DROP TABLE IF EXISTS error_catalog CASCADE;

-- Eliminar las tablas legacy
DROP TABLE IF EXISTS legacy_user_exercise_results CASCADE;
DROP TABLE IF EXISTS legacy_user_progress CASCADE;
DROP TABLE IF EXISTS legacy_exercises CASCADE;
DROP TABLE IF EXISTS legacy_lessons CASCADE;

-- Eliminar la vista de compatibilidad lessons
DROP VIEW IF EXISTS lessons CASCADE;

-- Eliminar tabla courses para recrearla limpia
DROP TABLE IF EXISTS courses CASCADE;

-- Eliminar funciones relacionadas si existen
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

RAISE NOTICE 'Todas las tablas y vistas relacionadas con cursos han sido eliminadas.';