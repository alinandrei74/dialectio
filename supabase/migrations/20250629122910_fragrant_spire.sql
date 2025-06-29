/*
  # Crear estructura pedagógica

  1. Nuevas tablas
    - `parts` - Partes narrativas dentro de un curso
    - `phases` - Fases dentro de cada parte (preparation, conversation)
    - `units` - Unidades mínimas (exercise, situation)
    - `exercises` - Ejercicios autocorregibles

  2. Security
    - Enable RLS en todas las tablas
    - Add policies para lectura pública
*/

-- Tabla parts
CREATE TABLE parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  part_order integer NOT NULL,
  synopsis text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla phases
CREATE TABLE phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('preparation','conversation')),
  phase_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla units
CREATE TABLE units (
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

-- Tabla exercises
CREATE TABLE exercises (
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
CREATE INDEX idx_parts_course_order ON parts(course_id, part_order);
CREATE INDEX idx_phases_part_order ON phases(part_id, phase_order);
CREATE INDEX idx_units_phase_order ON units(phase_id, unit_order);
CREATE INDEX idx_exercises_unit_order ON exercises(unit_id, exercise_order);

-- Habilitar RLS
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura pública
CREATE POLICY "Anyone can read parts"
  ON parts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read phases"
  ON phases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read units"
  ON units FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read exercises"
  ON exercises FOR SELECT
  TO public
  USING (true);