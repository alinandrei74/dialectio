/*
  # Migración: Estructura Narrativa para dialectio.xyz

  ## Razonamiento Pedagógico
  
  Esta migración transforma la estructura plana de lecciones en una jerarquía narrativa
  de tres niveles que permite mapear el recorrido del alumno:
  
  - **Partes**: Capítulos del relato que agrupan contenido temático
  - **Fases**: Alternan entre preparación (ejercicios) y conversación (chat con agente)
  - **Unidades**: Contenido específico (ejercicios heredados o situaciones conversacionales)
  
  Las Unidades de tipo "exercise" heredan los ejercicios existentes, mientras que las
  Unidades de tipo "situation" albergarán los prompts del agente conversacional.
  
  Las tablas chat_sessions y chat_turns recogen el diálogo con metadatos suficientes
  para retroalimentar el sistema adaptativo, incluyendo un vector de errores que
  permite al chatbot priorizar sugerencias basadas en los fallos recientes del alumno.

  ## Cambios Implementados
  
  1. **Nuevas Tablas Jerárquicas**
     - `parts`: Capítulos del curso
     - `phases`: Fases de preparación o conversación
     - `units`: Unidades de ejercicio o situación conversacional
  
  2. **Tablas de Conversación**
     - `chat_sessions`: Sesiones de chat con vector de errores
     - `chat_turns`: Turnos individuales de conversación
  
  3. **Migración de Datos**
     - Preservación completa de datos existentes
     - Creación automática de estructura jerárquica para contenido actual
     - Actualización de claves foráneas sin pérdida de información
  
  4. **Compatibilidad Temporal**
     - Vista `lessons` para mantener compatibilidad con frontend actual
     - Todas las FK existentes se mantienen funcionales
*/

-- Habilitar extensión para UUID si no está activa
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. CREAR NUEVAS TABLAS JERÁRQUICAS

-- Tabla parts: Capítulos del curso
CREATE TABLE IF NOT EXISTS parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  part_order integer NOT NULL,
  synopsis text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índice único para orden de partes por curso
CREATE UNIQUE INDEX IF NOT EXISTS parts_course_order_idx 
ON parts(course_id, part_order);

-- Tabla phases: Fases de preparación o conversación
CREATE TABLE IF NOT EXISTS phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation', 'conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índice único para orden de fases por parte
CREATE UNIQUE INDEX IF NOT EXISTS phases_part_order_idx 
ON phases(part_id, phase_order);

-- Tabla units: Unidades de ejercicio o situación conversacional
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

-- Índice único para orden de unidades por fase
CREATE UNIQUE INDEX IF NOT EXISTS units_phase_order_idx 
ON units(phase_id, unit_order);

-- 2. CREAR TABLAS DE CONVERSACIÓN

-- Tabla chat_sessions: Sesiones de chat con vector de errores
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  error_vector jsonb DEFAULT '[]'::jsonb,
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz
);

-- Comentario explicativo para error_vector
COMMENT ON COLUMN chat_sessions.error_vector IS 
'Array JSON con pares [error_id, weight] extraído automáticamente de los últimos intentos fallidos del alumno; el chatbot lo usa para priorizar sugerencias';

-- Tabla chat_turns: Turnos individuales de conversación
CREATE TABLE IF NOT EXISTS chat_turns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  speaker text NOT NULL CHECK (speaker IN ('student', 'agent')),
  utterance text,
  analysis jsonb,
  suggestions jsonb,
  created_at timestamptz DEFAULT now()
);

-- 3. MIGRAR DATOS EXISTENTES

-- Crear estructura jerárquica automática para cursos existentes
DO $$
DECLARE
  course_record RECORD;
  part_id uuid;
  prep_phase_id uuid;
  conv_phase_id uuid;
BEGIN
  -- Para cada curso existente
  FOR course_record IN SELECT * FROM courses LOOP
    -- Crear una parte por defecto
    INSERT INTO parts (course_id, title, part_order, synopsis)
    VALUES (
      course_record.id,
      'Parte 1: Introducción',
      1,
      'Introducción al ' || course_record.title
    )
    RETURNING id INTO part_id;
    
    -- Crear fase de preparación
    INSERT INTO phases (part_id, kind, phase_order)
    VALUES (part_id, 'preparation', 1)
    RETURNING id INTO prep_phase_id;
    
    -- Crear fase de conversación
    INSERT INTO phases (part_id, kind, phase_order)
    VALUES (part_id, 'conversation', 2)
    RETURNING id INTO conv_phase_id;
    
    -- Migrar lecciones existentes como unidades de ejercicio
    INSERT INTO units (phase_id, kind, title, unit_order)
    SELECT 
      prep_phase_id,
      'exercise',
      title,
      lesson_order
    FROM lessons 
    WHERE course_id = course_record.id
    ORDER BY lesson_order;
    
  END LOOP;
END $$;

-- 4. ACTUALIZAR TABLAS EXISTENTES

-- Agregar nueva columna unit_id a exercises (temporalmente nullable)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exercises' AND column_name = 'unit_id'
  ) THEN
    ALTER TABLE exercises ADD COLUMN unit_id uuid;
  END IF;
END $$;

-- Actualizar exercises con los nuevos unit_id
UPDATE exercises 
SET unit_id = units.id
FROM units
JOIN phases ON units.phase_id = phases.id
JOIN parts ON phases.part_id = parts.id
JOIN lessons ON lessons.course_id = parts.course_id 
  AND lessons.id = exercises.lesson_id
WHERE units.kind = 'exercise' 
  AND units.title = lessons.title
  AND units.unit_order = lessons.lesson_order;

-- Hacer unit_id NOT NULL y agregar FK
ALTER TABLE exercises 
  ALTER COLUMN unit_id SET NOT NULL,
  ADD CONSTRAINT exercises_unit_id_fkey 
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;

-- Actualizar constraint de exercise_type
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'exercises' AND constraint_name = 'exercises_exercise_type_check'
  ) THEN
    ALTER TABLE exercises DROP CONSTRAINT exercises_exercise_type_check;
  END IF;
  
  ALTER TABLE exercises ADD CONSTRAINT exercises_exercise_type_check 
    CHECK (exercise_type IN ('multiple_choice', 'fill_blank', 'translation', 'audio', 'conversation'));
END $$;

-- Crear índice para unit_id en exercises
CREATE INDEX IF NOT EXISTS idx_exercises_unit_id ON exercises(unit_id);

-- 5. ACTUALIZAR USER_PROGRESS

-- Agregar nueva columna current_unit_id (temporalmente nullable)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_progress' AND column_name = 'current_unit_id'
  ) THEN
    ALTER TABLE user_progress ADD COLUMN current_unit_id uuid;
  END IF;
END $$;

-- Actualizar current_unit_id basado en current_lesson_id
UPDATE user_progress 
SET current_unit_id = units.id
FROM units
JOIN phases ON units.phase_id = phases.id
JOIN parts ON phases.part_id = parts.id
JOIN lessons ON lessons.course_id = parts.course_id 
  AND lessons.id = user_progress.current_lesson_id
WHERE units.kind = 'exercise' 
  AND units.title = lessons.title
  AND units.unit_order = lessons.lesson_order;

-- Agregar FK para current_unit_id
ALTER TABLE user_progress 
  ADD CONSTRAINT user_progress_current_unit_id_fkey 
    FOREIGN KEY (current_unit_id) REFERENCES units(id) ON DELETE SET NULL;

-- Agregar nueva columna completed_units (temporalmente nullable)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_progress' AND column_name = 'completed_units'
  ) THEN
    ALTER TABLE user_progress ADD COLUMN completed_units text[] DEFAULT '{}';
  END IF;
END $$;

-- Migrar completed_lessons a completed_units
UPDATE user_progress 
SET completed_units = ARRAY(
  SELECT units.id::text
  FROM units
  JOIN phases ON units.phase_id = phases.id
  JOIN parts ON phases.part_id = parts.id
  JOIN lessons ON lessons.course_id = parts.course_id
  WHERE units.kind = 'exercise' 
    AND lessons.id = ANY(user_progress.completed_lessons)
    AND units.title = lessons.title
    AND units.unit_order = lessons.lesson_order
);

-- 6. ACTUALIZAR USER_EXERCISE_RESULTS

-- Agregar nueva columna unit_id (temporalmente nullable)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_exercise_results' AND column_name = 'unit_id'
  ) THEN
    ALTER TABLE user_exercise_results ADD COLUMN unit_id uuid;
  END IF;
END $$;

-- Actualizar unit_id basado en exercise_id
UPDATE user_exercise_results 
SET unit_id = exercises.unit_id
FROM exercises
WHERE exercises.id = user_exercise_results.exercise_id;

-- Hacer unit_id NOT NULL y agregar FK
ALTER TABLE user_exercise_results 
  ALTER COLUMN unit_id SET NOT NULL,
  ADD CONSTRAINT user_exercise_results_unit_id_fkey 
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE;

-- 7. CREAR VISTA DE COMPATIBILIDAD

-- Vista lessons para mantener compatibilidad temporal
CREATE OR REPLACE VIEW lessons AS
SELECT 
  units.id,
  parts.course_id,
  units.title,
  'Contenido migrado desde la nueva estructura' as description,
  'Contenido migrado desde la nueva estructura' as content,
  units.unit_order as lesson_order,
  CASE 
    WHEN units.kind = 'exercise' THEN 'practice'
    ELSE 'conversation'
  END as lesson_type,
  15 as estimated_minutes,
  units.created_at,
  units.updated_at
FROM units
JOIN phases ON units.phase_id = phases.id
JOIN parts ON phases.part_id = parts.id
WHERE units.kind = 'exercise';

-- Comentario sobre la vista
COMMENT ON VIEW lessons IS 
'Vista de compatibilidad temporal. Se eliminará en la próxima versión mayor. Usar la nueva estructura parts -> phases -> units.';

-- 8. CONFIGURAR TRIGGERS DE AUDITORÍA

-- Trigger para parts
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers a todas las nuevas tablas
DO $$
BEGIN
  -- Parts
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_parts_updated_at'
  ) THEN
    CREATE TRIGGER update_parts_updated_at 
      BEFORE UPDATE ON parts 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  -- Phases
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_phases_updated_at'
  ) THEN
    CREATE TRIGGER update_phases_updated_at 
      BEFORE UPDATE ON phases 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  -- Units
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_units_updated_at'
  ) THEN
    CREATE TRIGGER update_units_updated_at 
      BEFORE UPDATE ON units 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- 9. HABILITAR ROW LEVEL SECURITY

-- Habilitar RLS en nuevas tablas
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;

-- Políticas para parts (público puede leer)
CREATE POLICY "Anyone can read parts"
  ON parts FOR SELECT
  TO public
  USING (true);

-- Políticas para phases (público puede leer)
CREATE POLICY "Anyone can read phases"
  ON phases FOR SELECT
  TO public
  USING (true);

-- Políticas para units (público puede leer)
CREATE POLICY "Anyone can read units"
  ON units FOR SELECT
  TO public
  USING (true);

-- Políticas para chat_sessions (usuarios pueden gestionar sus propias sesiones)
CREATE POLICY "Users can read own chat sessions"
  ON chat_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions"
  ON chat_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions"
  ON chat_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas para chat_turns (usuarios pueden gestionar turnos de sus sesiones)
CREATE POLICY "Users can read own chat turns"
  ON chat_turns FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_sessions 
      WHERE chat_sessions.id = chat_turns.session_id 
        AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own chat turns"
  ON chat_turns FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_sessions 
      WHERE chat_sessions.id = chat_turns.session_id 
        AND chat_sessions.user_id = auth.uid()
    )
  );

-- 10. CREAR ÍNDICES ADICIONALES PARA RENDIMIENTO

-- Índices para chat_sessions
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_unit_id ON chat_sessions(unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started_at ON chat_sessions(started_at);

-- Índices para chat_turns
CREATE INDEX IF NOT EXISTS idx_chat_turns_session_id ON chat_turns(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_turns_created_at ON chat_turns(created_at);

-- Índices para la nueva estructura jerárquica
CREATE INDEX IF NOT EXISTS idx_parts_course_id ON parts(course_id);
CREATE INDEX IF NOT EXISTS idx_phases_part_id ON phases(part_id);
CREATE INDEX IF NOT EXISTS idx_units_phase_id ON units(phase_id);

-- 11. LIMPIAR COLUMNAS OBSOLETAS (COMENTADO PARA SEGURIDAD)

-- NOTA: Las siguientes operaciones están comentadas por seguridad.
-- Descomentar solo después de verificar que la migración fue exitosa
-- y que el frontend ha sido actualizado para usar la nueva estructura.

/*
-- Eliminar columnas obsoletas de exercises
-- ALTER TABLE exercises DROP COLUMN IF EXISTS lesson_id;

-- Eliminar columnas obsoletas de user_progress  
-- ALTER TABLE user_progress DROP COLUMN IF EXISTS current_lesson_id;
-- ALTER TABLE user_progress DROP COLUMN IF EXISTS completed_lessons;

-- Eliminar tabla lessons original (la vista la reemplaza temporalmente)
-- DROP TABLE IF EXISTS lessons CASCADE;
*/