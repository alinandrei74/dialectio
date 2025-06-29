-- dialectio.xyz – estructura narrativa Parte → Fase → Unidad
-- Migración completa, idempotente y con copia de datos
-- Ejecutar en Supabase CLI: supabase db push
-- ⇢ Crea tablas parts, phases, units, attempts, chat_sessions, chat_turns
-- ⇢ Copia datos de lessons → units, re-ancla exercises y progreso
-- ⇢ Conserva lessons como VIEW y deja lessons_backup con los datos originales

BEGIN;

-------------------------------------------------------------
-- 1. Extensión para generar UUID                         ---
-------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-------------------------------------------------------------
-- 2. Nuevas tablas de currículo                          ---
-------------------------------------------------------------
CREATE TABLE IF NOT EXISTS parts (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id   uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title       text NOT NULL,
    part_order  integer NOT NULL,
    synopsis    text,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE(course_id, part_order)
);

CREATE TABLE IF NOT EXISTS phases (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    part_id     uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
    kind        text NOT NULL CHECK (kind IN ('preparation','conversation')),
    phase_order integer NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE(part_id, phase_order)
);

CREATE TABLE IF NOT EXISTS units (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id    uuid NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
    kind        text NOT NULL CHECK (kind IN ('exercise','situation')),
    title       text NOT NULL,
    unit_order  integer NOT NULL,
    agent_name  text,
    agent_prompt text,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE(phase_id, unit_order)
);

-------------------------------------------------------------
-- 3. Tablas de seguimiento y conversación                ---
-------------------------------------------------------------
CREATE TABLE IF NOT EXISTS attempts (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    unit_id    uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    answer     jsonb NOT NULL,
    score      integer CHECK (score BETWEEN 0 AND 100),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    unit_id      uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    error_vector jsonb NOT NULL DEFAULT '[]', -- pares [error_id, weight]
    started_at   timestamptz NOT NULL DEFAULT now(),
    finished_at  timestamptz
);

CREATE TABLE IF NOT EXISTS chat_turns (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id  uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    speaker     text NOT NULL CHECK (speaker IN ('student','agent')),
    utterance   text,
    analysis    jsonb,
    suggestions jsonb,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-------------------------------------------------------------
-- 4. Copiar datos de lessons → units                     ---
-------------------------------------------------------------

-- 4.1 Crear, si no existen, Parte 1 y sus dos fases por cada curso
WITH new_parts AS (
    INSERT INTO parts (course_id, title, part_order)
    SELECT id, 'Parte 1: Introducción', 1
    FROM courses c
    WHERE NOT EXISTS (
        SELECT 1 FROM parts p WHERE p.course_id = c.id AND p.part_order = 1
    )
    RETURNING id, course_id
),
new_phases AS (
    INSERT INTO phases (part_id, kind, phase_order)
    SELECT np.id, 'preparation', 1 FROM new_parts np
    UNION ALL
    SELECT np.id, 'conversation', 2 FROM new_parts np
    ON CONFLICT DO NOTHING
    RETURNING id, part_id, kind
)
-- 4.2 Units de ejercicios: cada lesson existente se convierte en unit exercise
INSERT INTO units (phase_id, kind, title, unit_order, created_at, updated_at)
SELECT
    ph.id        AS phase_id,
    'exercise'   AS kind,
    l.title      AS title,
    COALESCE(l.lesson_order, 1) AS unit_order,
    COALESCE(l.created_at, now()),
    COALESCE(l.updated_at, now())
FROM lessons l
JOIN courses c       ON c.id = l.course_id
JOIN parts p         ON p.course_id = c.id AND p.part_order = 1
JOIN phases ph       ON ph.part_id = p.id AND ph.kind = 'preparation'
ON CONFLICT DO NOTHING;

-------------------------------------------------------------
-- 5. Mapa lesson_id → unit_id                            ---
-------------------------------------------------------------
CREATE TEMP TABLE _lesson_unit_map AS
SELECT l.id AS lesson_id, u.id AS unit_id
FROM lessons l
JOIN units   u ON u.title = l.title      -- se asume título único dentro de curso
JOIN phases  ph ON ph.id = u.phase_id
WHERE u.kind = 'exercise' AND ph.kind = 'preparation';

-------------------------------------------------------------
-- 6. Reanclar exercises y progreso                       ---
-------------------------------------------------------------
-- 6.1 Añadir columna unit_id si no existe (antes de renombrar)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'unit_id') THEN
        ALTER TABLE exercises ADD COLUMN unit_id uuid;
    END IF;
END $$;

UPDATE exercises e
SET    unit_id = m.unit_id
FROM   _lesson_unit_map m
WHERE  e.lesson_id = m.lesson_id;

-- 6.2 FK y renombrado seguro
ALTER TABLE exercises
    DROP CONSTRAINT IF EXISTS exercises_lesson_id_fkey;
ALTER TABLE exercises
    ADD CONSTRAINT exercises_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;
ALTER TABLE exercises RENAME COLUMN lesson_id TO old_lesson_id;
ALTER TABLE exercises RENAME COLUMN unit_id   TO lesson_id; -- mantenemos nombre para el código actual

-- 6.3 user_progress
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_progress' AND column_name = 'lesson_id') THEN
        ALTER TABLE user_progress RENAME COLUMN lesson_id TO unit_id;
    END IF;
END $$;

UPDATE user_progress up
SET    unit_id = m.unit_id
FROM   _lesson_unit_map m
WHERE  up.unit_id = m.lesson_id;

-- FK para user_progress si aún no existe
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_progress_unit_id_fkey') THEN
        ALTER TABLE user_progress
            ADD CONSTRAINT user_progress_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 6.4 user_exercise_results si existe lesson_id
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_exercise_results' AND column_name = 'lesson_id') THEN
        ALTER TABLE user_exercise_results RENAME COLUMN lesson_id TO unit_id;
    END IF;
END $$;

-- Actualizar posibles valores
UPDATE user_exercise_results uer
SET    unit_id = m.unit_id
FROM   _lesson_unit_map m
WHERE  uer.unit_id = m.lesson_id;

-- FK para user_exercise_results
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_exercise_results_unit_id_fkey') THEN
        ALTER TABLE user_exercise_results
            ADD CONSTRAINT user_exercise_results_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;
    END IF;
END $$;

-------------------------------------------------------------
-- 7. Levantamos la vista lessons y preservamos backup    ---
-------------------------------------------------------------
DROP VIEW IF EXISTS lessons CASCADE;
ALTER TABLE lessons RENAME TO lessons_backup;

CREATE VIEW lessons AS
SELECT  u.id                       AS id,
        p.course_id                AS course_id,
        u.title,
        u.unit_order               AS lesson_order,
        'vocabulary'               AS lesson_type, -- placeholder: ajustar vía trigger si se necesita
        u.created_at,
        u.updated_at
FROM units u
JOIN phases ph ON ph.id = u.phase_id AND ph.kind = 'preparation'
JOIN parts  p  ON p.id = ph.part_id
WHERE u.kind = 'exercise';

-------------------------------------------------------------
-- 8. Limpieza temporal                                   ---
-------------------------------------------------------------
DROP TABLE IF EXISTS _lesson_unit_map;

COMMIT;

-- FIN DE MIGRACIÓN ---------------------------------------
