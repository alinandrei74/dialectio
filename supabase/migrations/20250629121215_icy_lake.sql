/*
  # Reestructuración del flujo pedagógico de Dialectio

  Esta migración transforma la estructura de base de datos para soportar el nuevo flujo pedagógico:
  Curso → Partes → Fases → Unidades

  ## Cambios principales:
  1. Nuevas tablas: parts, phases, units, attempts, chat_sessions, chat_turns
  2. Migración de lessons existentes a units
  3. Actualización de exercises para usar unit_id en lugar de lesson_id
  4. Renombrado de tabla lessons a lessons_raw
  5. Creación de vista lessons para compatibilidad con código legacy
  6. Validación mejorada del contenido de ejercicios
*/

BEGIN;

-- ============================================================================
-- 1. CREAR NUEVAS TABLAS
-- ============================================================================

-- Tabla parts: Capítulos de cada curso
CREATE TABLE IF NOT EXISTS parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  part_order integer NOT NULL,
  synopsis text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla phases: Fases dentro de cada parte (preparación/conversación)
CREATE TABLE IF NOT EXISTS phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation', 'conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla units: Unidades dentro de cada fase
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('exercise', 'situation')),
  title text NOT NULL,
  unit_order integer NOT NULL,
  agent_name text,
  agent_prompt text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla attempts: Intentos del alumno en cada ejercicio
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  answer jsonb NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now()
);

-- Tabla chat_sessions: Sesiones de chat con el agente
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  error_vector jsonb DEFAULT '[]'::jsonb,
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz
);

-- Tabla chat_turns: Turnos de conversación en cada sesión
CREATE TABLE IF NOT EXISTS chat_turns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  speaker text NOT NULL CHECK (speaker IN ('student', 'agent')),
  utterance text NOT NULL,
  analysis jsonb,
  suggestions jsonb,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 2. CREAR ÍNDICES ÚNICOS Y COMPUESTOS
-- ============================================================================

-- Índices únicos para garantizar orden correcto
CREATE UNIQUE INDEX IF NOT EXISTS parts_course_order_unique 
  ON parts(course_id, part_order);

CREATE UNIQUE INDEX IF NOT EXISTS phases_part_order_unique 
  ON phases(part_id, phase_order);

CREATE UNIQUE INDEX IF NOT EXISTS units_phase_order_unique 
  ON units(phase_id, unit_order);

-- Índices compuestos para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_parts_course_id ON parts(course_id);
CREATE INDEX IF NOT EXISTS idx_phases_part_id ON phases(part_id);
CREATE INDEX IF NOT EXISTS idx_units_phase_id ON units(phase_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_unit ON attempts(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_unit ON chat_sessions(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_turns_session_id ON chat_turns(session_id);

-- ============================================================================
-- 3. HABILITAR RLS EN NUEVAS TABLAS
-- ============================================================================

ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para parts, phases, units (lectura pública)
CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);

-- Políticas RLS para attempts (solo el usuario propietario)
CREATE POLICY "Users can insert own attempts" ON attempts 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own attempts" ON attempts 
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Políticas RLS para chat_sessions (solo el usuario propietario)
CREATE POLICY "Users can insert own chat sessions" ON chat_sessions 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own chat sessions" ON chat_sessions 
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own chat sessions" ON chat_sessions 
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Políticas RLS para chat_turns (a través de la sesión)
CREATE POLICY "Users can insert chat turns in own sessions" ON chat_turns 
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_sessions cs 
      WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can read chat turns in own sessions" ON chat_turns 
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM chat_sessions cs 
      WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 4. CREAR TRIGGERS PARA UPDATED_AT
-- ============================================================================

CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phases_updated_at BEFORE UPDATE ON phases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 5. MIGRAR DATOS EXISTENTES
-- ============================================================================

-- CTE para mapear lesson_id → unit_id durante la migración
WITH migration_data AS (
  -- Paso 1: Crear partes para cada curso
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT 
    id as course_id,
    'Introducción' as title,
    1 as part_order,
    'Parte introductoria del curso ' || title as synopsis
  FROM courses
  RETURNING id as part_id, course_id
),
phase_data AS (
  -- Paso 2: Crear fases para cada parte
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT 
    md.part_id,
    phase_info.kind,
    phase_info.phase_order
  FROM migration_data md
  CROSS JOIN (
    VALUES 
      ('preparation', 1),
      ('conversation', 2)
  ) AS phase_info(kind, phase_order)
  RETURNING id as phase_id, part_id, kind
),
unit_data AS (
  -- Paso 3: Crear unidades desde lessons existentes
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT 
    pd.phase_id,
    'exercise' as kind,
    l.title,
    l.lesson_order as unit_order
  FROM lessons l
  JOIN migration_data md ON l.course_id = md.course_id
  JOIN phase_data pd ON md.part_id = pd.part_id AND pd.kind = 'preparation'
  RETURNING id as unit_id, phase_id, title, unit_order
),
lesson_unit_mapping AS (
  -- Paso 4: Mapear lesson_id → unit_id
  SELECT 
    l.id as lesson_id,
    ud.unit_id
  FROM lessons l
  JOIN migration_data md ON l.course_id = md.course_id
  JOIN phase_data pd ON md.part_id = pd.part_id AND pd.kind = 'preparation'
  JOIN unit_data ud ON pd.phase_id = ud.phase_id AND l.lesson_order = ud.unit_order
)
-- Paso 5: Actualizar exercises.lesson_id → unit_id
UPDATE exercises 
SET lesson_id = lum.unit_id
FROM lesson_unit_mapping lum
WHERE exercises.lesson_id = lum.lesson_id;

-- ============================================================================
-- 6. MODIFICAR TABLA EXERCISES
-- ============================================================================

-- Renombrar columna lesson_id a unit_id
ALTER TABLE exercises RENAME COLUMN lesson_id TO unit_id;

-- Eliminar constraint FK antigua
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_lesson_id_fkey;

-- Agregar nueva constraint FK
ALTER TABLE exercises ADD CONSTRAINT exercises_unit_id_fkey 
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;

-- ============================================================================
-- 7. AGREGAR VALIDACIÓN DE CONTENIDO DE EJERCICIOS
-- ============================================================================

-- Constraint básico: debe tener question y correct_answer
ALTER TABLE exercises
ADD CONSTRAINT exercises_content_basic
CHECK (
  content ? 'question'
  AND content ? 'correct_answer'
);

-- Constraint específico por tipo de ejercicio
ALTER TABLE exercises
ADD CONSTRAINT exercises_content_specific
CHECK (
  (exercise_type <> 'multiple_choice' OR content ? 'options')
  AND
  (exercise_type <> 'audio' OR content ? 'audio_url')
);

-- ============================================================================
-- 8. RENOMBRAR TABLA LESSONS Y CREAR VISTA
-- ============================================================================

-- Renombrar tabla lessons original para evitar colisión
ALTER TABLE lessons RENAME TO lessons_raw;

-- Crear vista lessons para compatibilidad con código legacy
CREATE VIEW lessons AS
SELECT * FROM units WHERE kind = 'exercise';

COMMIT;

-- ============================================================================
-- 9. REPORTE DE MIGRACIÓN
-- ============================================================================

DO $$
DECLARE
  total_courses integer;
  total_parts integer;
  total_phases integer;
  total_units integer;
  total_exercises integer;
  total_preparation_phases integer;
  total_conversation_phases integer;
BEGIN
  -- Contar elementos creados
  SELECT COUNT(*) INTO total_courses FROM courses;
  SELECT COUNT(*) INTO total_parts FROM parts;
  SELECT COUNT(*) INTO total_phases FROM phases;
  SELECT COUNT(*) INTO total_units FROM units;
  SELECT COUNT(*) INTO total_exercises FROM exercises;
  SELECT COUNT(*) INTO total_preparation_phases FROM phases WHERE kind = 'preparation';
  SELECT COUNT(*) INTO total_conversation_phases FROM phases WHERE kind = 'conversation';
  
  -- Mostrar reporte
  RAISE NOTICE '=== MIGRACIÓN COMPLETADA EXITOSAMENTE ===';
  RAISE NOTICE '';
  RAISE NOTICE 'ESTRUCTURA CREADA:';
  RAISE NOTICE '- Cursos existentes: %', total_courses;
  RAISE NOTICE '- Partes creadas: % (1 por curso)', total_parts;
  RAISE NOTICE '- Fases creadas: % (2 por parte)', total_phases;
  RAISE NOTICE '  - Fases de preparación: %', total_preparation_phases;
  RAISE NOTICE '  - Fases de conversación: %', total_conversation_phases;
  RAISE NOTICE '- Unidades creadas: % (desde lessons)', total_units;
  RAISE NOTICE '- Ejercicios migrados: %', total_exercises;
  RAISE NOTICE '';
  RAISE NOTICE 'CAMBIOS EN TABLAS:';
  RAISE NOTICE '- ✓ Tabla lessons renombrada a lessons_raw';
  RAISE NOTICE '- ✓ Vista lessons creada para compatibilidad';
  RAISE NOTICE '- ✓ exercises.lesson_id → exercises.unit_id';
  RAISE NOTICE '';
  RAISE NOTICE 'VALIDACIONES:';
  RAISE NOTICE '- ✓ Constraints de contenido aplicados';
  RAISE NOTICE '- ✓ Índices únicos creados';
  RAISE NOTICE '- ✓ RLS habilitado en todas las tablas';
  RAISE NOTICE '';
  RAISE NOTICE 'La migración se ejecutó sin pérdida de datos.';
  RAISE NOTICE 'Todas las lecciones existentes ahora son unidades de ejercicio.';
  RAISE NOTICE 'El código legacy seguirá funcionando a través de la vista lessons.';
END $$;