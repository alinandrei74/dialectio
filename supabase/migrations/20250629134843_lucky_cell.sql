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
-- 4. Verificar si lessons existe como tabla              ---
-------------------------------------------------------------
DO $$ 
DECLARE
    lessons_exists boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'lessons' AND table_type = 'BASE TABLE'
    ) INTO lessons_exists;
    
    IF lessons_exists THEN
        -- Solo proceder si lessons existe como tabla
        
        -- 4.1 Crear, si no existen, Parte 1 y sus dos fases por cada curso
        WITH new_parts AS (
            INSERT INTO parts (course_id, title, part_order)
            SELECT id, 'Parte 1: Introducción', 1
            FROM courses c
            WHERE NOT EXISTS (
                SELECT 1 FROM parts p WHERE p.course_id = c.id AND p.part_order = 1
            )
            ON CONFLICT DO NOTHING
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
        
        -- 4.3 Crear mapa temporal lesson_id → unit_id
        CREATE TEMP TABLE IF NOT EXISTS _lesson_unit_map AS
        SELECT l.id AS lesson_id, u.id AS unit_id
        FROM lessons l
        JOIN units   u ON u.title = l.title      -- se asume título único dentro de curso
        JOIN phases  ph ON ph.id = u.phase_id
        WHERE u.kind = 'exercise' AND ph.kind = 'preparation';
        
        -- 4.4 Reanclar exercises
        -- Añadir columna unit_id si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'unit_id') THEN
            ALTER TABLE exercises ADD COLUMN unit_id uuid;
        END IF;
        
        -- Actualizar exercises con el mapeo
        UPDATE exercises e
        SET    unit_id = m.unit_id
        FROM   _lesson_unit_map m
        WHERE  e.lesson_id = m.lesson_id;
        
        -- Eliminar FK antigua y crear nueva solo si no existe
        ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_lesson_id_fkey;
        
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'exercises_unit_id_fkey') THEN
            ALTER TABLE exercises
                ADD CONSTRAINT exercises_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;
        END IF;
        
        -- Renombrar columnas en exercises solo si no se han renombrado ya
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'lesson_id') THEN
            ALTER TABLE exercises RENAME COLUMN lesson_id TO old_lesson_id;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'unit_id') THEN
            ALTER TABLE exercises RENAME COLUMN unit_id TO lesson_id; -- mantenemos nombre para compatibilidad
        END IF;
        
        -- 4.5 Actualizar user_progress
        -- Añadir columna unit_id si no existe
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_progress' AND column_name = 'unit_id') THEN
            ALTER TABLE user_progress ADD COLUMN unit_id uuid;
        END IF;
        
        -- Actualizar user_progress con el mapeo usando current_lesson_id
        UPDATE user_progress up
        SET    unit_id = m.unit_id
        FROM   _lesson_unit_map m
        WHERE  up.current_lesson_id = m.lesson_id;
        
        -- Actualizar completed_lessons array
        UPDATE user_progress 
        SET completed_lessons = (
            SELECT array_agg(m.unit_id::text)
            FROM _lesson_unit_map m
            WHERE m.lesson_id::text = ANY(completed_lessons)
        )
        WHERE completed_lessons IS NOT NULL AND array_length(completed_lessons, 1) > 0;
        
        -- Eliminar FK antigua y crear nueva para user_progress
        ALTER TABLE user_progress DROP CONSTRAINT IF EXISTS user_progress_current_lesson_id_fkey;
        
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'user_progress_unit_id_fkey') THEN
            ALTER TABLE user_progress
                ADD CONSTRAINT user_progress_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE SET NULL;
        END IF;
        
        -- Renombrar columnas en user_progress solo si no se han renombrado ya
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_progress' AND column_name = 'current_lesson_id') THEN
            ALTER TABLE user_progress RENAME COLUMN current_lesson_id TO old_current_lesson_id;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_progress' AND column_name = 'unit_id') THEN
            ALTER TABLE user_progress RENAME COLUMN unit_id TO current_lesson_id; -- mantenemos nombre para compatibilidad
        END IF;
        
        -- 4.6 Actualizar user_exercise_results si tiene lesson_id
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_exercise_results' AND column_name = 'lesson_id') THEN
            -- Añadir columna unit_id
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_exercise_results' AND column_name = 'unit_id') THEN
                ALTER TABLE user_exercise_results ADD COLUMN unit_id uuid;
            END IF;
            
            -- Actualizar con el mapeo
            UPDATE user_exercise_results uer
            SET    unit_id = m.unit_id
            FROM   _lesson_unit_map m
            WHERE  uer.lesson_id = m.lesson_id;
            
            -- Renombrar columnas
            ALTER TABLE user_exercise_results RENAME COLUMN lesson_id TO old_lesson_id;
            ALTER TABLE user_exercise_results RENAME COLUMN unit_id TO lesson_id; -- mantenemos nombre para compatibilidad
        END IF;
        
        -- 4.7 Crear backup y vista
        DROP VIEW IF EXISTS lessons CASCADE;
        ALTER TABLE lessons RENAME TO lessons_backup;
        
        -- Limpiar tabla temporal
        DROP TABLE IF EXISTS _lesson_unit_map;
        
    END IF;
END $$;

-------------------------------------------------------------
-- 5. Crear vista lessons                                 ---
-------------------------------------------------------------
CREATE OR REPLACE VIEW lessons AS
SELECT  u.id                       AS id,
        p.course_id                AS course_id,
        u.title,
        'Contenido de la unidad'   AS description,
        'Contenido detallado'      AS content,
        u.unit_order               AS lesson_order,
        'vocabulary'               AS lesson_type, -- placeholder
        15                         AS estimated_minutes, -- placeholder
        u.created_at,
        u.updated_at
FROM units u
JOIN phases ph ON ph.id = u.phase_id AND ph.kind = 'preparation'
JOIN parts  p  ON p.id = ph.part_id
WHERE u.kind = 'exercise';

-------------------------------------------------------------
-- 6. Triggers para updated_at                            ---
-------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers a las nuevas tablas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_parts_updated_at') THEN
        CREATE TRIGGER update_parts_updated_at 
            BEFORE UPDATE ON parts 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_phases_updated_at') THEN
        CREATE TRIGGER update_phases_updated_at 
            BEFORE UPDATE ON phases 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_units_updated_at') THEN
        CREATE TRIGGER update_units_updated_at 
            BEFORE UPDATE ON units 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-------------------------------------------------------------
-- 7. RLS (Row Level Security)                            ---
-------------------------------------------------------------
-- Habilitar RLS en las nuevas tablas
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura pública de contenido del curso
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can read parts') THEN
        CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can read phases') THEN
        CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can read units') THEN
        CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);
    END IF;
    
    -- Políticas para datos de usuario
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own attempts') THEN
        CREATE POLICY "Users can read own attempts" ON attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own attempts') THEN
        CREATE POLICY "Users can insert own attempts" ON attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own chat sessions') THEN
        CREATE POLICY "Users can read own chat sessions" ON chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own chat sessions') THEN
        CREATE POLICY "Users can insert own chat sessions" ON chat_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own chat sessions') THEN
        CREATE POLICY "Users can update own chat sessions" ON chat_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own chat turns') THEN
        CREATE POLICY "Users can read own chat turns" ON chat_turns 
            FOR SELECT TO authenticated 
            USING (EXISTS (SELECT 1 FROM chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own chat turns') THEN
        CREATE POLICY "Users can insert own chat turns" ON chat_turns 
            FOR INSERT TO authenticated 
            WITH CHECK (EXISTS (SELECT 1 FROM chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));
    END IF;
END $$;

COMMIT;

-- FIN DE MIGRACIÓN ---------------------------------------