/*
  # Migración completa con datos de muestra - Dialectio

  1. Nuevas tablas
    - `courses` - Cursos de idiomas disponibles
    - `parts` - Partes de cada curso
    - `phases` - Fases dentro de cada parte (preparación/conversación)
    - `units` - Unidades dentro de cada fase (ejercicios/situaciones)
    - `exercises` - Ejercicios específicos con contenido JSONB
    - `attempts` - Intentos de ejercicios por usuario
    - `chat_sessions` - Sesiones de chat con IA
    - `chat_turns` - Turnos individuales en las conversaciones
    - `user_progress` - Progreso del usuario por curso

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para acceso público a contenido educativo
    - Políticas para datos privados del usuario

  3. Datos de muestra
    - Curso completo de italiano con ejercicios y conversaciones
    - Contenido estructurado con pistas en el idioma objetivo
    - Agentes de conversación configurados
*/

-- Crear tabla de cursos
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
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de partes
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

-- Crear tabla de fases
CREATE TABLE IF NOT EXISTS phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation', 'conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(part_id, phase_order)
);

-- Crear tabla de unidades
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('exercise', 'situation')),
  title text NOT NULL,
  unit_order integer NOT NULL,
  agent_name text,
  agent_prompt text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(phase_id, unit_order)
);

-- Crear tabla de ejercicios (actualizada)
CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  old_lesson_id uuid NOT NULL, -- Mantener por compatibilidad
  lesson_id uuid REFERENCES units(id) ON DELETE CASCADE, -- Nueva referencia a units
  title text NOT NULL,
  instructions text NOT NULL,
  exercise_type text NOT NULL CHECK (exercise_type IN ('multiple_choice', 'fill_blank', 'translation', 'audio', 'conversation')),
  content jsonb NOT NULL,
  points integer NOT NULL DEFAULT 10,
  exercise_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de intentos
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  answer jsonb NOT NULL,
  score integer CHECK (score >= 0 AND score <= 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Crear tabla de sesiones de chat
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  error_vector jsonb NOT NULL DEFAULT '[]',
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz
);

-- Crear tabla de turnos de chat
CREATE TABLE IF NOT EXISTS chat_turns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  speaker text NOT NULL CHECK (speaker IN ('student', 'agent')),
  utterance text,
  analysis jsonb,
  suggestions jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Crear tabla de progreso del usuario (actualizada)
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  old_current_lesson_id uuid, -- Mantener por compatibilidad
  current_lesson_id uuid REFERENCES units(id) ON DELETE SET NULL, -- Nueva referencia a units
  completed_lessons text[] DEFAULT '{}',
  total_points integer DEFAULT 0,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Habilitar RLS en todas las tablas
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para contenido público (cursos, partes, fases, unidades, ejercicios)
CREATE POLICY "Anyone can read courses" ON courses FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read exercises" ON exercises FOR SELECT TO public USING (true);

-- Políticas para datos del usuario
CREATE POLICY "Users can insert own attempts" ON attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own attempts" ON attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON chat_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own chat sessions" ON chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own chat sessions" ON chat_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat turns" ON chat_turns 
  FOR INSERT TO authenticated 
  WITH CHECK (EXISTS (
    SELECT 1 FROM chat_sessions cs 
    WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
  ));

CREATE POLICY "Users can read own chat turns" ON chat_turns 
  FOR SELECT TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM chat_sessions cs 
    WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own progress" ON user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Crear índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_unit ON attempts(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_exercises_lesson_id ON exercises(lesson_id);

-- Crear vista de lecciones para compatibilidad
CREATE OR REPLACE VIEW lessons AS
SELECT 
  u.id,
  p.course_id,
  u.title,
  COALESCE(pt.synopsis, 'Práctica de ' || u.title) as description,
  u.title as content,
  u.unit_order as lesson_order,
  CASE 
    WHEN u.kind = 'exercise' THEN 'practice'
    WHEN u.kind = 'situation' THEN 'conversation'
    ELSE 'vocabulary'
  END as lesson_type,
  15 as estimated_minutes,
  u.created_at,
  u.updated_at
FROM units u
JOIN phases ph ON u.phase_id = ph.id
JOIN parts pt ON ph.part_id = pt.id
JOIN courses c ON pt.course_id = c.id
ORDER BY pt.part_order, ph.phase_order, u.unit_order;

-- Insertar datos de muestra

-- 1. Curso de Italiano
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Italiano Básico', 'Aprende italiano desde español aprovechando las similitudes entre ambos idiomas', 'it', 'es', 8, 4, false);

-- 2. Partes del curso
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Primeros Pasos en Italiano', 1, 'Introducción básica al italiano con saludos y presentaciones');

-- 3. Fases (preparación y conversación)
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'preparation', 1),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'conversation', 2);

-- 4. Unidades de ejercicios (preparación)
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'exercise', 'Saludos y Presentaciones', 1),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'exercise', 'Información Personal', 2);

-- 5. Unidades de conversación (situaciones)
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'situation', 'Encuentro Casual', 1, 'Sofia', 'Sei Sofia, una ragazza italiana amichevole. Incontri uno studente di italiano in un caffè a Roma. Inizia una conversazione naturale, presentati e fai domande sulla sua vita. Parla sempre in italiano e correggi gentilmente gli errori.'),
('550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'situation', 'En la Recepción', 2, 'Marco', 'Sei Marco, un receptionist di un hotel a Firenze. Aiuta gli ospiti con cortesia e professionalità. Parla sempre in italiano e usa un registro formale appropriato per l''ambiente alberghiero.');

-- 6. Ejercicios con contenido en italiano (pistas en italiano)
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
-- Ejercicios para "Saludos y Presentaciones"
('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Saludo Básico', 'Selecciona la forma correcta de saludar en italiano', 'multiple_choice', '{
  "question": "¿Cómo se dice \"Hola\" en italiano?",
  "options": ["Ciao", "Grazie", "Prego", "Scusi"],
  "correct_answer": "Ciao",
  "explanation": "\"Ciao\" è il saluto informale più comune in italiano.",
  "hints": ["È un saluto molto comune", "Si usa tra amici", "È simile al \"hola\" spagnolo"]
}', 10, 1),

('550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Presentación Personal', 'Completa la frase de presentación', 'fill_blank', '{
  "question": "Mi _____ Marco. (Me llamo Marco)",
  "correct_answer": "chiamo",
  "acceptable_answers": ["chiamo"],
  "case_sensitive": false,
  "explanation": "\"Mi chiamo\" significa \"me llamo\" en italiano.",
  "hints": ["È il verbo \"chiamarsi\"", "Prima persona singolare", "Simile a \"me llamo\" in spagnolo"]
}', 10, 2),

('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Traducción de Cortesía', 'Traduce esta expresión de cortesía', 'translation', '{
  "question": "Por favor",
  "correct_answer": "Per favore",
  "acceptable_answers": ["Per favore", "Prego"],
  "source_language": "es",
  "target_language": "it",
  "explanation": "\"Per favore\" è la traduzione più diretta di \"por favor\".",
  "hints": ["È una forma di cortesia", "Si usa per chiedere qualcosa", "Molto simile al francese"]
}', 15, 3),

-- Ejercicios para "Información Personal"
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Países y Nacionalidades', 'Selecciona la nacionalidad correcta', 'multiple_choice', '{
  "question": "Una persona de España es...",
  "options": ["spagnolo/a", "spagnuolo/a", "español/a", "hispano/a"],
  "correct_answer": "spagnolo/a",
  "explanation": "In italiano, una persona della Spagna è \"spagnolo\" (maschio) o \"spagnola\" (femmina).",
  "hints": ["È simile alla parola spagnola", "Cambia solo una lettera", "Finisce con -olo/-ola"]
}', 10, 1),

('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Età e Numeri', 'Completa con la edad en italiano', 'fill_blank', '{
  "question": "Ho _____ anni. (Tengo veinticinco años)",
  "correct_answer": "venticinque",
  "acceptable_answers": ["venticinque", "25"],
  "case_sensitive": false,
  "explanation": "\"Venticinque\" è il numero 25 in italiano.",
  "hints": ["È formato da \"venti\" + \"cinque\"", "I numeri italiani sono simili agli spagnoli", "Si scrive tutto attaccato"]
}', 15, 2),

('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Profesiones', 'Traduce esta profesión al italiano', 'translation', '{
  "question": "Soy profesor",
  "correct_answer": "Sono insegnante",
  "acceptable_answers": ["Sono insegnante", "Sono professore", "Sono prof"],
  "source_language": "es",
  "target_language": "it",
  "explanation": "\"Insegnante\" è la traduzione più comune di \"profesor\" in italiano.",
  "hints": ["\"Sono\" significa \"soy\"", "\"Insegnante\" è neutro (vale per maschio e femmina)", "È una parola molto simile all''inglese \"teacher\""]
}', 15, 3);

-- Actualizar el total de lecciones en el curso
UPDATE courses SET total_lessons = 8 WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_phases_updated_at BEFORE UPDATE ON phases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();