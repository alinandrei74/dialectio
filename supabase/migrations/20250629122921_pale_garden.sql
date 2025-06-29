/*
  # Crear tablas de seguimiento y adaptación

  1. Nuevas tablas
    - `attempts` - Historial de respuestas a ejercicios
    - `chat_sessions` - Conversaciones por situation
    - `chat_turns` - Turnos dentro de sesiones
    - `error_catalog` - Catálogo de errores
    - `suggestion_rules` - Reglas de sugerencias

  2. Security
    - Enable RLS
    - Add policies apropiadas para cada tabla
*/

-- Tabla attempts
CREATE TABLE attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  answer jsonb,
  score integer CHECK (score BETWEEN 0 AND 100),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, unit_id)
);

-- Tabla chat_sessions
CREATE TABLE chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  error_vector jsonb DEFAULT '[]',
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz
);

-- Tabla chat_turns
CREATE TABLE chat_turns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  speaker text NOT NULL CHECK (speaker IN ('student','agent')),
  utterance text,
  analysis jsonb,
  suggestions jsonb,
  created_at timestamptz DEFAULT now()
);

-- Tabla error_catalog
CREATE TABLE error_catalog (
  id serial PRIMARY KEY,
  label text UNIQUE NOT NULL,
  description text
);

-- Tabla suggestion_rules
CREATE TABLE suggestion_rules (
  id serial PRIMARY KEY,
  error_id integer NOT NULL REFERENCES error_catalog(id) ON DELETE CASCADE,
  template text,
  weight numeric
);

-- Índices adicionales
CREATE INDEX idx_attempts_user_id ON attempts(user_id);
CREATE INDEX idx_attempts_unit_id ON attempts(unit_id);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_unit_id ON chat_sessions(unit_id);
CREATE INDEX idx_chat_turns_session_id ON chat_turns(session_id);
CREATE INDEX idx_suggestion_rules_error_id ON suggestion_rules(error_id);

-- Habilitar RLS
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestion_rules ENABLE ROW LEVEL SECURITY;

-- Políticas para attempts
CREATE POLICY "Users can read own attempts"
  ON attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts"
  ON attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attempts"
  ON attempts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas para chat_sessions
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

-- Políticas para chat_turns
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

-- Políticas para catálogos (lectura pública)
CREATE POLICY "Anyone can read error catalog"
  ON error_catalog FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read suggestion rules"
  ON suggestion_rules FOR SELECT
  TO public
  USING (true);