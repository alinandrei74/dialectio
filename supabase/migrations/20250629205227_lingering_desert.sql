/*  /supabase/migrations/20250702T150000_full_learning_system.sql
   ──────────────────────────────────────────────────────────────
   Migración integral:
   1.  Tablas (IF NOT EXISTS)                                  *
   2.  RLS + políticas (solo si faltan)                        *
   3.  Curso de italiano con partes, fases, unidades, ejercicios
   4.  updated_at triggers                                     *
   * si las versiones previas ya las crearon, estos pasos se
   vuelven idempotentes: no fallan ni duplican nada.
*/

BEGIN;

/*───────────── 1 · Esquema ─────────────*/

-- extensiones
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- cursos
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text UNIQUE NOT NULL,
  description text NOT NULL,
  target_language text NOT NULL,
  source_language text NOT NULL DEFAULT 'es',
  total_lessons integer NOT NULL DEFAULT 0,
  estimated_hours integer NOT NULL DEFAULT 1,
  image_url text,
  is_premium boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- partes
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

-- fases
CREATE TABLE IF NOT EXISTS phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation','conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(part_id, phase_order)
);

-- unidades
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

-- ejercicios (si la tabla ya existe sólo añadimos FK correcta)
CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES units(id) ON DELETE CASCADE,
  title text NOT NULL,
  instructions text,
  exercise_type text CHECK (exercise_type IN
    ('multiple_choice','fill_blank','translation','audio','conversation')),
  content jsonb NOT NULL,
  points integer DEFAULT 0,
  exercise_order integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- intentos
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  answer jsonb NOT NULL,
  score integer CHECK (score BETWEEN 0 AND 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- sesiones y turnos
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

-- progreso usuario (mínimo)
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  current_lesson_id uuid REFERENCES units(id) ON DELETE SET NULL,
  completed_lessons uuid[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

/*───────────── 2 · Seguridad (habilita RLS y políticas sólo si faltan) ─────────────*/
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'courses','parts','phases','units','exercises',
    'attempts','chat_sessions','chat_turns','user_progress'
  ] LOOP
    PERFORM 1 FROM pg_class c WHERE c.relname = tbl AND c.relrowsecurity;
    IF NOT FOUND THEN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    END IF;
  END LOOP;

  -- lectura pública del catálogo
  PERFORM 1 FROM pg_policies WHERE policyname = 'public_read_courses';
  IF NOT FOUND THEN
    CREATE POLICY public_read_courses ON courses  FOR SELECT TO public USING (true);
    CREATE POLICY public_read_parts   ON parts    FOR SELECT TO public USING (true);
    CREATE POLICY public_read_phases  ON phases   FOR SELECT TO public USING (true);
    CREATE POLICY public_read_units   ON units    FOR SELECT TO public USING (true);
    CREATE POLICY public_read_ex      ON exercises FOR SELECT TO public USING (true);
  END IF;

  -- políticas de usuario (attempts, chat, progress)
  PERFORM 1 FROM pg_policies WHERE policyname = 'own_attempts_select';
  IF NOT FOUND THEN
    CREATE POLICY own_attempts_select  ON attempts      FOR SELECT TO authenticated USING (auth.uid() = user_id);
    CREATE POLICY own_attempts_insert  ON attempts      FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

    CREATE POLICY own_sessions_select  ON chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
    CREATE POLICY own_sessions_mutate  ON chat_sessions FOR INSERT, UPDATE TO authenticated WITH CHECK (auth.uid() = user_id);

    CREATE POLICY own_turns_select ON chat_turns FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));
    CREATE POLICY own_turns_insert ON chat_turns FOR INSERT TO authenticated
      WITH CHECK (EXISTS (SELECT 1 FROM chat_sessions cs WHERE cs.id = session_id AND cs.user_id = auth.uid()));

    CREATE POLICY own_progress_all ON user_progress
      FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END$$;

/*───────────── 3 · Curso de italiano (encadenado, sin UUID fijos) ─────────────*/
WITH new_course AS (
  INSERT INTO courses (
      id, title, description, target_language, source_language,
      total_lessons, estimated_hours, is_premium
  )
  VALUES (
      gen_random_uuid(),
      'Italiano Básico',
      'Aprende italiano desde el español aprovechando las similitudes.',
      'it','es',
      0, 4, FALSE
  )
  ON CONFLICT (title) DO UPDATE
      SET description = EXCLUDED.description
  RETURNING id
), part1 AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT id, 'Primeros pasos en italiano', 1,
         'Saludos, presentaciones y temas personales.'
  FROM new_course
  ON CONFLICT DO NOTHING
  RETURNING id
), phases AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT p.id, v.kind, v.order_n
  FROM part1 p
  CROSS JOIN (VALUES ('preparation',1), ('conversation',2)) AS v(kind,order_n)
  ON CONFLICT DO NOTHING
  RETURNING id, kind
), prep_unit AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT id, 'exercise', 'Saludos y presentaciones', 1
  FROM phases WHERE kind = 'preparation'
  RETURNING id
), conv_units AS (
  INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
  SELECT
      ph.id, 'situation',
      v.title, v.order_n, v.agent, v.prompt
  FROM phases ph,
       (VALUES
         ('Encuentro casual',1,'Sofia',
          'Sei Sofia, una giovane italiana. Conoce al estudiante y preséntate.'),
         ('Recepción de hotel',2,'Marco',
          'Sei Marco, recepcionista en Florencia. Atiende con cortesía.')
       ) AS v(title,order_n,agent,prompt)
  WHERE ph.kind = 'conversation'
  RETURNING id
), ex1 AS (
  -- tres ejercicios enlazados a la unidad de preparación
  INSERT INTO exercises (lesson_id,title,instructions,exercise_type,content,points,exercise_order)
  SELECT
    u.id,
    'Saludo correcto',
    'Elige la traducción correcta de «Hola».',
    'multiple_choice',
    '{
      "question":"¿Cómo se dice \"Hola\" en italiano?",
      "options":["Ciao","Grazie","Prego","Scusi"],
      "correct_answer":"Ciao"
    }'::jsonb,
    10,1
  FROM prep_unit u
  UNION ALL
  SELECT
    u.id,
    'Mi chiamo…',
    'Completa: «Mi ____ Marco».',
    'fill_blank',
    '{
      "question":"Mi ____ Marco.",
      "correct_answer":"chiamo"
    }'::jsonb,
    10,2
  FROM prep_unit u
  UNION ALL
  SELECT
    u.id,
    'Por favor',
    'Traduce «Por favor» al italiano.',
    'translation',
    '{
      "question":"Por favor",
      "correct_answer":"Per favore"
    }'::jsonb,
    15,3
  FROM prep_unit u
)
UPDATE courses
SET total_lessons = (
  SELECT COUNT(*) FROM units u
  JOIN phases ph ON ph.id = u.phase_id
  JOIN parts  pa ON pa.id = ph.part_id
  WHERE pa.course_id = courses.id
)
WHERE id = (SELECT id FROM new_course);

/*───────────── 4 · updated_at triggers (una sola función reutilizable) ─────────────*/
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER  LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END$$;

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'courses','parts','phases','units','exercises','user_progress'
  ] LOOP
    PERFORM 1 FROM pg_trigger
      WHERE tgname = format('update_%s_updated_at',t);
    IF NOT FOUND THEN
      EXECUTE format(
        'CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON %I
         FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', t, t);
    END IF;
  END LOOP;
END$$;

/*───────────── índices útiles (idempotentes) ─────────────*/
CREATE INDEX IF NOT EXISTS idx_attempts_user_id     ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_unit   ON attempts(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user   ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_pair   ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_exercises_lesson_id  ON exercises(lesson_id);

/*───────────── vista lecciones (compatibilidad) ─────────────*/
CREATE OR REPLACE VIEW lessons AS
SELECT
  u.id,
  pa.course_id,
  u.title,
  COALESCE(pa.synopsis,'Práctica de '||u.title)       AS description,
  u.title                                             AS content,
  u.unit_order                                        AS lesson_order,
  CASE WHEN u.kind='exercise'   THEN 'practice'
       WHEN u.kind='situation'  THEN 'conversation'
       ELSE                        'other' END        AS lesson_type,
  15                                                  AS estimated_minutes,
  u.created_at,
  u.updated_at
FROM units u
JOIN phases ph ON ph.id = u.phase_id
JOIN parts  pa ON pa.id = ph.part_id
ORDER BY pa.part_order, ph.phase_order, u.unit_order;

COMMIT;
