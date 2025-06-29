/*
  # Capa 2: Recorrido Pedagógico

  1. Tabla parts (Partes narrativas dentro de un curso)
  2. Tabla phases (Fases dentro de cada parte)
  3. Tabla units (Unidades mínimas - ejercicios y situaciones)
  4. Tabla exercises (Ejercicios autocorregibles)
*/

-- Tabla parts
CREATE TABLE IF NOT EXISTS parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  part_order integer NOT NULL,
  synopsis text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla phases
CREATE TABLE IF NOT EXISTS phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation','conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla units
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id uuid NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('exercise','situation')),
  title text NOT NULL,
  unit_order integer NOT NULL,
  agent_name text,
  agent_prompt text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Nueva tabla exercises
CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title text NOT NULL,
  instructions text,
  exercise_type text NOT NULL CHECK (exercise_type IN ('multiple_choice','fill_blank','translation','audio','conversation')),
  content jsonb NOT NULL,
  points integer DEFAULT 0 CHECK (points >= 0),
  exercise_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_parts_updated_at 
  BEFORE UPDATE ON parts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_phases_updated_at 
  BEFORE UPDATE ON phases 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at 
  BEFORE UPDATE ON units 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at 
  BEFORE UPDATE ON exercises 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices esenciales
CREATE INDEX IF NOT EXISTS idx_parts_course_order ON parts(course_id, part_order);
CREATE INDEX IF NOT EXISTS idx_phases_part_order ON phases(part_id, phase_order);
CREATE INDEX IF NOT EXISTS idx_units_phase_order ON units(phase_id, unit_order);
CREATE INDEX IF NOT EXISTS idx_exercises_unit_order ON exercises(unit_id, exercise_order);