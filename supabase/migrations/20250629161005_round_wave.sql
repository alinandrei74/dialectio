BEGIN;

-- Verificar y crear la estructura de base de datos si no existe
-- Esta migración es idempotente y segura de ejecutar múltiples veces

-------------------------------------------------------------
-- 1. Asegurar que todas las tablas existen               ---
-------------------------------------------------------------

-- Crear tabla courses si no existe
CREATE TABLE IF NOT EXISTS courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    target_language text NOT NULL,
    source_language text NOT NULL DEFAULT 'es',
    total_lessons integer NOT NULL DEFAULT 0,
    estimated_hours integer NOT NULL DEFAULT 1,
    image_url text,
    is_premium boolean NOT NULL DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(target_language, source_language)
);

-- Crear tabla parts si no existe
CREATE TABLE IF NOT EXISTS parts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title text NOT NULL,
    part_order integer NOT NULL,
    synopsis text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(course_id, part_order)
);

-- Crear tabla phases si no existe
CREATE TABLE IF NOT EXISTS phases (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
    kind text NOT NULL CHECK (kind IN ('preparation','conversation')),
    phase_order integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(part_id, phase_order)
);

-- Crear tabla units si no existe
CREATE TABLE IF NOT EXISTS units (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id uuid NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
    kind text NOT NULL CHECK (kind IN ('exercise','situation')),
    title text NOT NULL,
    unit_order integer NOT NULL,
    agent_name text,
    agent_prompt text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(phase_id, unit_order)
);

-- Verificar estructura de exercises
DO $$ 
BEGIN
    -- Verificar si la tabla exercises existe
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exercises') THEN
        -- Verificar si tiene la columna lesson_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'lesson_id') THEN
            -- Si no tiene lesson_id, añadirla
            ALTER TABLE exercises ADD COLUMN lesson_id uuid;
        END IF;
        
        -- Verificar si tiene old_lesson_id
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'old_lesson_id') THEN
            -- Si no tiene old_lesson_id, añadirla
            ALTER TABLE exercises ADD COLUMN old_lesson_id uuid;
        END IF;
        
        -- Asegurar que lesson_id apunte a units
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'exercises_lesson_id_fkey') THEN
            ALTER TABLE exercises 
                ADD CONSTRAINT exercises_lesson_id_fkey 
                FOREIGN KEY (lesson_id) REFERENCES units(id) ON DELETE CASCADE;
        END IF;
    END IF;
END $$;

-- Crear tablas de seguimiento si no existen
CREATE TABLE IF NOT EXISTS attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    answer jsonb NOT NULL,
    score integer CHECK (score BETWEEN 0 AND 100),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    error_vector jsonb NOT NULL DEFAULT '[]',
    started_at timestamptz NOT NULL DEFAULT now(),
    finished_at timestamptz
);

CREATE TABLE IF NOT EXISTS chat_turns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    speaker text NOT NULL CHECK (speaker IN ('student','agent')),
    utterance text,
    analysis jsonb,
    suggestions jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

-------------------------------------------------------------
-- 2. Habilitar RLS en todas las tablas                   ---
-------------------------------------------------------------
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura pública de contenido del curso
DROP POLICY IF EXISTS "Anyone can read courses" ON courses;
CREATE POLICY "Anyone can read courses" ON courses FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read parts" ON parts;
CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read phases" ON phases;
CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Anyone can read units" ON units;
CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);

-- Políticas para datos de usuario
DROP POLICY IF EXISTS "Users can read own attempts" ON attempts;
CREATE POLICY "Users can read own attempts" ON attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own attempts" ON attempts;
CREATE POLICY "Users can insert own attempts" ON attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own chat sessions" ON chat_sessions;
CREATE POLICY "Users can read own chat sessions" ON chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own chat sessions" ON chat_sessions;
CREATE POLICY "Users can insert own chat sessions" ON chat_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own chat sessions" ON chat_sessions;
CREATE POLICY "Users can update own chat sessions" ON chat_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own chat turns" ON chat_turns;
CREATE POLICY "Users can read own chat turns" ON chat_turns 
    FOR SELECT TO authenticated 
    USING (EXISTS (SELECT 1 FROM chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can insert own chat turns" ON chat_turns;
CREATE POLICY "Users can insert own chat turns" ON chat_turns 
    FOR INSERT TO authenticated 
    WITH CHECK (EXISTS (SELECT 1 FROM chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));

-------------------------------------------------------------
-- 3. Crear o actualizar la vista lessons                 ---
-------------------------------------------------------------
DROP VIEW IF EXISTS lessons CASCADE;

CREATE VIEW lessons AS
SELECT  
    u.id                       AS id,
    p.course_id                AS course_id,
    u.title,
    'Contenido de la unidad'   AS description,
    'Contenido detallado'      AS content,
    u.unit_order               AS lesson_order,
    CASE 
        WHEN u.title ILIKE '%saludo%' OR u.title ILIKE '%presentacion%' THEN 'vocabulary'
        WHEN u.title ILIKE '%informacion%' OR u.title ILIKE '%personal%' THEN 'grammar'
        WHEN u.title ILIKE '%conversacion%' OR u.title ILIKE '%basica%' THEN 'conversation'
        ELSE 'practice'
    END                        AS lesson_type,
    15                         AS estimated_minutes,
    u.created_at,
    u.updated_at
FROM units u
JOIN phases ph ON ph.id = u.phase_id AND ph.kind = 'preparation'
JOIN parts  p  ON p.id = ph.part_id
WHERE u.kind = 'exercise';

-------------------------------------------------------------
-- 4. Insertar datos de muestra SOLO si no existen       ---
-------------------------------------------------------------

-- Verificar si ya hay cursos
DO $$ 
DECLARE
    course_count integer;
BEGIN
    SELECT COUNT(*) INTO course_count FROM courses;
    
    -- Solo insertar datos si no hay cursos
    IF course_count = 0 THEN
        -- Insertar cursos
        INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, image_url, is_premium) VALUES
        (gen_random_uuid(), 'Español Esencial', 'Aprende español desde francés aprovechando las similitudes entre lenguas romances.', 'es', 'fr', 15, 8, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', false),
        (gen_random_uuid(), 'Français Essentiel', 'Aprende francés desde español con un enfoque práctico y comunicativo.', 'fr', 'es', 15, 8, 'https://images.pexels.com/photos/161154/paris-france-tower-eiffel-161154.jpeg', false),
        (gen_random_uuid(), 'Português Essencial', 'Domina el portugués aprovechando tu conocimiento del español.', 'pt', 'es', 15, 8, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', false),
        (gen_random_uuid(), 'Italiano Essenziale', 'Aprende italiano de forma natural desde el español.', 'it', 'es', 15, 8, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg', false),
        (gen_random_uuid(), 'Essential English', 'Aprende inglés con un enfoque comunicativo y práctico.', 'en', 'es', 15, 8, 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg', false);

        -- Insertar partes
        INSERT INTO parts (course_id, title, part_order, synopsis)
        SELECT 
          c.id,
          'Parte 1: Fundamentos',
          1,
          'Saludos, presentaciones y conversaciones básicas para empezar a comunicarte desde el primer día.'
        FROM courses c;

        -- Insertar fases
        INSERT INTO phases (part_id, kind, phase_order)
        SELECT p.id, 'preparation', 1 FROM parts p
        UNION ALL
        SELECT p.id, 'conversation', 2 FROM parts p;

        -- Insertar unidades de preparación
        INSERT INTO units (phase_id, kind, title, unit_order)
        SELECT 
          ph.id, 
          'exercise', 
          'Saludos y Presentaciones',
          1
        FROM phases ph 
        WHERE ph.kind = 'preparation'
        UNION ALL
        SELECT 
          ph.id, 
          'exercise', 
          'Información Personal',
          2
        FROM phases ph 
        WHERE ph.kind = 'preparation'
        UNION ALL
        SELECT 
          ph.id, 
          'exercise', 
          'Conversación Básica',
          3
        FROM phases ph 
        WHERE ph.kind = 'preparation';

        -- Insertar unidades de conversación
        INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
        SELECT 
          ph.id,
          'situation',
          'Encuentro Casual',
          1,
          'María',
          'Eres una persona amigable que quiere conocer gente nueva. Mantén la conversación natural y ayuda al estudiante a practicar presentaciones.'
        FROM phases ph 
        WHERE ph.kind = 'conversation'
        UNION ALL
        SELECT 
          ph.id,
          'situation',
          'En la Recepción',
          2,
          'Carlos',
          'Eres un recepcionista profesional de hotel. Ayuda al huésped con cortesía y practica vocabulario hotelero.'
        FROM phases ph 
        WHERE ph.kind = 'conversation';

        -- Insertar ejercicios solo si la tabla exercises existe y está configurada correctamente
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exercises') 
           AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'lesson_id') THEN
            
            -- Ejercicios para "Saludos y Presentaciones"
            INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            SELECT 
              gen_random_uuid(),
              u.id,
              'Saludo Correcto',
              'Selecciona el saludo más apropiado para esta situación.',
              'multiple_choice',
              jsonb_build_object(
                'question', '¿Cómo saludarías a alguien por la mañana?',
                'options', ARRAY['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
                'correct_answer', 'Buenos días',
                'explanation', 'Buenos días se usa desde la mañana hasta el mediodía.',
                'hints', ARRAY['Piensa en el momento del día', 'Es un saludo matutino']
              ),
              10,
              1
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation'
            UNION ALL
            SELECT 
              gen_random_uuid(),
              u.id,
              'Completa la Presentación',
              'Completa la frase con la palabra correcta.',
              'fill_blank',
              jsonb_build_object(
                'question', 'Me llamo Juan y ____ de España.',
                'correct_answer', 'soy',
                'acceptable_answers', ARRAY['soy', 'vengo'],
                'explanation', 'Usamos "soy" para indicar origen o nacionalidad.',
                'hints', ARRAY['Verbo ser para origen', 'Primera persona singular']
              ),
              10,
              2
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation'
            UNION ALL
            SELECT 
              gen_random_uuid(),
              u.id,
              'Traduce la Frase',
              'Traduce la siguiente frase al idioma objetivo.',
              'translation',
              jsonb_build_object(
                'question', 'Hello, how are you?',
                'correct_answer', 'Hola, ¿cómo estás?',
                'acceptable_answers', ARRAY['Hola, ¿cómo estás?', 'Hola, ¿qué tal?', 'Hola, ¿cómo está usted?'],
                'source_language', 'en',
                'target_language', 'es',
                'explanation', 'Esta es la traducción más común y natural.',
                'hints', ARRAY['Saludo informal', 'Pregunta sobre el estado']
              ),
              15,
              3
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation';

            -- Ejercicios para "Información Personal"
            INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            SELECT 
              gen_random_uuid(),
              u.id,
              'Datos Personales',
              'Selecciona la respuesta correcta sobre información personal.',
              'multiple_choice',
              jsonb_build_object(
                'question', '¿Cómo preguntas la edad de alguien de forma educada?',
                'options', ARRAY['¿Cuántos años tienes?', '¿Qué edad tienes?', '¿Cuál es tu edad?', 'Todas son correctas'],
                'correct_answer', 'Todas son correctas',
                'explanation', 'Todas estas formas son correctas y educadas para preguntar la edad.',
                'hints', ARRAY['Todas las opciones son válidas', 'Diferentes formas de preguntar lo mismo']
              ),
              10,
              1
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Información Personal' AND ph.kind = 'preparation'
            UNION ALL
            SELECT 
              gen_random_uuid(),
              u.id,
              'Completa tu Perfil',
              'Completa la información personal.',
              'fill_blank',
              jsonb_build_object(
                'question', 'Tengo ____ años y trabajo como ____.',
                'correct_answer', 'veinticinco, profesor',
                'acceptable_answers', ARRAY['25, profesor', 'veinticinco, maestro', '25, maestro', '25, docente'],
                'explanation', 'Puedes usar números o palabras para la edad, y varios términos para profesiones.',
                'hints', ARRAY['Edad en números o letras', 'Profesión relacionada con enseñanza']
              ),
              10,
              2
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Información Personal' AND ph.kind = 'preparation';

            -- Ejercicios para "Conversación Básica"
            INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            SELECT 
              gen_random_uuid(),
              u.id,
              'Frases Útiles',
              'Selecciona la frase más apropiada para la situación.',
              'multiple_choice',
              jsonb_build_object(
                'question', '¿Qué dices cuando no entiendes algo?',
                'options', ARRAY['No hablo español', '¿Puedes repetir, por favor?', 'No me gusta', 'Está bien'],
                'correct_answer', '¿Puedes repetir, por favor?',
                'explanation', 'Es una forma educada de pedir que repitan cuando no entiendes.',
                'hints', ARRAY['Frase educada', 'Pedir repetición']
              ),
              10,
              1
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation'
            UNION ALL
            SELECT 
              gen_random_uuid(),
              u.id,
              'Completa el Diálogo',
              'Completa la conversación.',
              'fill_blank',
              jsonb_build_object(
                'question', '- ¿Cómo estás? - ____ bien, gracias. ¿Y tú?',
                'correct_answer', 'Estoy',
                'acceptable_answers', ARRAY['Estoy', 'Muy', 'Todo'],
                'explanation', '"Estoy" es la respuesta más natural y común.',
                'hints', ARRAY['Verbo estar', 'Primera persona']
              ),
              10,
              2
            FROM units u
            JOIN phases ph ON ph.id = u.phase_id
            WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation';

        END IF;

        RAISE NOTICE 'Datos de muestra insertados exitosamente';
    ELSE
        RAISE NOTICE 'Los datos ya existen, no se insertaron duplicados';
    END IF;
END $$;

-------------------------------------------------------------
-- 5. Crear triggers para updated_at                      ---
-------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_courses_updated_at') THEN
        CREATE TRIGGER update_courses_updated_at 
            BEFORE UPDATE ON courses 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
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

COMMIT;

-- Verificación final
SELECT 
    'Migración completada exitosamente' as status,
    (SELECT COUNT(*) FROM courses) as total_courses,
    (SELECT COUNT(*) FROM parts) as total_parts,
    (SELECT COUNT(*) FROM phases) as total_phases,
    (SELECT COUNT(*) FROM units) as total_units,
    (SELECT COUNT(*) FROM exercises) as total_exercises;