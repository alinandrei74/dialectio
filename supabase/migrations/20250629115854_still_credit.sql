/*
  # Reestructuración del flujo pedagógico de dialectio.xyz

  1. Nuevas tablas
    - `parts` (capítulos de cursos)
    - `phases` (preparación y conversación)
    - `units` (unidades dentro de fases)
    - `attempts` (intentos de ejercicios)
    - `chat_sessions` (sesiones de chat)
    - `chat_turns` (turnos de conversación)

  2. Migración de datos
    - Convierte courses → parts → phases → units
    - Migra lessons a units
    - Actualiza exercises para usar unit_id

  3. Validaciones y constraints
    - Validación de exercises.content JSONB
    - Índices únicos y compuestos
    - Constraints de integridad

  4. Compatibilidad
    - Vista lessons para código legacy
*/

-- ============================================================================
-- BLOQUE UP: MIGRACIÓN HACIA ADELANTE
-- ============================================================================

BEGIN;

-- 1. Crear tabla 'parts' (capítulos)
CREATE TABLE IF NOT EXISTS parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  part_order integer NOT NULL,
  synopsis text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint único para evitar duplicados de orden por curso
  CONSTRAINT unique_course_part_order UNIQUE (course_id, part_order)
);

-- 2. Crear tabla 'phases' (preparación y conversación)
CREATE TABLE IF NOT EXISTS phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation', 'conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint único para evitar duplicados de orden por parte
  CONSTRAINT unique_part_phase_order UNIQUE (part_id, phase_order)
);

-- 3. Crear tabla 'units' (unidades dentro de fases)
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('exercise', 'situation')),
  title text NOT NULL,
  unit_order integer NOT NULL,
  agent_name text,
  agent_prompt text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint único para evitar duplicados de orden por fase
  CONSTRAINT unique_phase_unit_order UNIQUE (phase_id, unit_order),
  
  -- Constraint para campos de agente solo en situaciones
  CONSTRAINT agent_fields_only_for_situations CHECK (
    (kind = 'situation') OR (agent_name IS NULL AND agent_prompt IS NULL)
  )
);

-- 4. Crear tabla 'attempts' (intentos de ejercicios)
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  answer jsonb NOT NULL,
  score integer CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now()
);

-- 5. Crear tabla 'chat_sessions' (sesiones de chat)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  error_vector jsonb DEFAULT '[]'::jsonb,
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz,
  
  -- Constraint para asegurar que unit_id corresponde a una situación
  CONSTRAINT chat_sessions_unit_must_be_situation CHECK (
    EXISTS (
      SELECT 1 FROM units 
      WHERE units.id = unit_id AND units.kind = 'situation'
    )
  )
);

-- 6. Crear tabla 'chat_turns' (turnos de conversación)
CREATE TABLE IF NOT EXISTS chat_turns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  speaker text NOT NULL CHECK (speaker IN ('student', 'agent')),
  utterance text NOT NULL,
  analysis jsonb,
  suggestions jsonb,
  created_at timestamptz DEFAULT now()
);

-- 7. Crear índices imprescindibles
CREATE INDEX IF NOT EXISTS idx_parts_course_id ON parts(course_id);
CREATE INDEX IF NOT EXISTS idx_phases_part_id ON phases(part_id);
CREATE INDEX IF NOT EXISTS idx_units_phase_id ON units(phase_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_unit ON attempts(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_unit ON chat_sessions(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_turns_session_id ON chat_turns(session_id);

-- 8. Migración de datos existentes
DO $$
DECLARE
  course_record RECORD;
  part_record RECORD;
  prep_phase_id uuid;
  conv_phase_id uuid;
  lesson_record RECORD;
  unit_record RECORD;
  parts_created integer := 0;
  phases_created integer := 0;
  units_created integer := 0;
  exercises_updated integer := 0;
BEGIN
  RAISE NOTICE 'Iniciando migración de datos...';
  
  -- a. Para cada curso, crear una parte "Introducción"
  FOR course_record IN SELECT id, title FROM courses ORDER BY created_at LOOP
    INSERT INTO parts (course_id, title, part_order, synopsis)
    VALUES (
      course_record.id,
      'Introducción',
      1,
      'Parte introductoria del curso ' || course_record.title
    )
    RETURNING * INTO part_record;
    
    parts_created := parts_created + 1;
    
    -- b. Para cada parte, crear dos fases
    -- Fase de preparación
    INSERT INTO phases (part_id, kind, phase_order)
    VALUES (part_record.id, 'preparation', 1)
    RETURNING id INTO prep_phase_id;
    
    phases_created := phases_created + 1;
    
    -- Fase de conversación
    INSERT INTO phases (part_id, kind, phase_order)
    VALUES (part_record.id, 'conversation', 2)
    RETURNING id INTO conv_phase_id;
    
    phases_created := phases_created + 1;
    
    -- c. Migrar lecciones del curso a unidades de la fase de preparación
    FOR lesson_record IN 
      SELECT id, title, lesson_order 
      FROM lessons 
      WHERE course_id = course_record.id 
      ORDER BY lesson_order 
    LOOP
      INSERT INTO units (phase_id, kind, title, unit_order)
      VALUES (
        prep_phase_id,
        'exercise',
        lesson_record.title,
        lesson_record.lesson_order
      )
      RETURNING * INTO unit_record;
      
      units_created := units_created + 1;
      
      -- d. Actualizar ejercicios para usar el nuevo unit_id
      UPDATE exercises 
      SET lesson_id = unit_record.id 
      WHERE lesson_id = lesson_record.id;
      
      GET DIAGNOSTICS exercises_updated = exercises_updated + ROW_COUNT;
    END LOOP;
  END LOOP;
  
  RAISE NOTICE 'Migración completada:';
  RAISE NOTICE '- Partes creadas: %', parts_created;
  RAISE NOTICE '- Fases creadas: %', phases_created;
  RAISE NOTICE '- Unidades creadas: %', units_created;
  RAISE NOTICE '- Ejercicios actualizados: %', exercises_updated;
END $$;

-- 9. Renombrar columna lesson_id a unit_id en exercises
ALTER TABLE exercises RENAME COLUMN lesson_id TO unit_id;

-- 10. Eliminar la constraint FK antigua y crear la nueva
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_lesson_id_fkey;
ALTER TABLE exercises ADD CONSTRAINT exercises_unit_id_fkey 
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;

-- 11. Validación del campo exercises.content (JSONB)
ALTER TABLE exercises ADD CONSTRAINT exercises_content_validation CHECK (
  -- Debe contener 'question' y 'correct_answer'
  jsonb_path_exists(content, '$.question') AND
  jsonb_path_exists(content, '$.correct_answer') AND
  -- Si es multiple_choice, debe tener 'options'
  (exercise_type != 'multiple_choice' OR jsonb_path_exists(content, '$.options')) AND
  -- Si es audio, debe tener 'audio_url'
  (exercise_type != 'audio' OR jsonb_path_exists(content, '$.audio_url'))
);

-- 12. Crear vista lessons para compatibilidad con código legacy
CREATE OR REPLACE VIEW lessons AS
SELECT 
  u.id,
  p.course_id,
  u.title,
  'Unidad migrada desde lesson' as description,
  'Contenido migrado desde lesson' as content,
  u.unit_order as lesson_order,
  'exercise' as lesson_type,
  15 as estimated_minutes, -- Valor por defecto
  u.created_at,
  u.updated_at
FROM units u
JOIN phases ph ON u.phase_id = ph.id
JOIN parts p ON ph.part_id = p.id
WHERE u.kind = 'exercise'
ORDER BY p.course_id, u.unit_order;

-- 13. Crear triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers a las nuevas tablas
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phases_updated_at BEFORE UPDATE ON phases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 14. Habilitar RLS en las nuevas tablas
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;

-- 15. Crear políticas RLS básicas

-- Parts: Cualquiera puede leer
CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);

-- Phases: Cualquiera puede leer
CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);

-- Units: Cualquiera puede leer
CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);

-- Attempts: Los usuarios solo pueden ver/crear sus propios intentos
CREATE POLICY "Users can read own attempts" ON attempts 
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON attempts 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Chat sessions: Los usuarios solo pueden ver/crear sus propias sesiones
CREATE POLICY "Users can read own chat sessions" ON chat_sessions 
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON chat_sessions 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions" ON chat_sessions 
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Chat turns: Los usuarios solo pueden ver/crear turnos de sus sesiones
CREATE POLICY "Users can read own chat turns" ON chat_turns 
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM chat_sessions 
      WHERE chat_sessions.id = session_id AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own chat turns" ON chat_turns 
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_sessions 
      WHERE chat_sessions.id = session_id AND chat_sessions.user_id = auth.uid()
    )
  );

COMMIT;

-- ============================================================================
-- INFORMACIÓN DE MIGRACIÓN
-- ============================================================================

DO $$
DECLARE
  total_courses integer;
  total_parts integer;
  total_phases integer;
  total_units integer;
  total_exercises integer;
BEGIN
  SELECT COUNT(*) INTO total_courses FROM courses;
  SELECT COUNT(*) INTO total_parts FROM parts;
  SELECT COUNT(*) INTO total_phases FROM phases;
  SELECT COUNT(*) INTO total_units FROM units;
  SELECT COUNT(*) INTO total_exercises FROM exercises;
  
  RAISE NOTICE '=== RESUMEN DE MIGRACIÓN ===';
  RAISE NOTICE 'Cursos existentes: %', total_courses;
  RAISE NOTICE 'Partes creadas: %', total_parts;
  RAISE NOTICE 'Fases creadas: %', total_phases;
  RAISE NOTICE 'Unidades creadas: %', total_units;
  RAISE NOTICE 'Ejercicios migrados: %', total_exercises;
  RAISE NOTICE '';
  RAISE NOTICE 'Estructura esperada:';
  RAISE NOTICE '- % cursos → % partes (1 por curso)', total_courses, total_parts;
  RAISE NOTICE '- % partes → % fases (2 por parte)', total_parts, total_phases;
  RAISE NOTICE '- Unidades = lecciones migradas: %', total_units;
  RAISE NOTICE '';
  RAISE NOTICE 'Migración completada exitosamente.';
END $$;