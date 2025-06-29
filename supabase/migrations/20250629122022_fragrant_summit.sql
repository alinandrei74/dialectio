/*
  # Capa 3: Seguimiento y Adaptación

  1. Tabla attempts (historial de respuestas a ejercicios)
  2. Tabla chat_sessions (conversaciones por situación)
  3. Tabla chat_turns (turnos dentro de sesiones)
  4. Tabla error_catalog (catálogo de errores)
  5. Tabla suggestion_rules (reglas de sugerencias)
*/

-- Tabla attempts
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  answer jsonb,
  score integer CHECK (score BETWEEN 0 AND 100),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, unit_id)
);

-- Tabla chat_sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  error_vector jsonb DEFAULT '[]',
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz
);

-- Tabla chat_turns
CREATE TABLE IF NOT EXISTS chat_turns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  speaker text NOT NULL CHECK (speaker IN ('student','agent')),
  utterance text,
  analysis jsonb,
  suggestions jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, id)
);

-- Tabla error_catalog
CREATE TABLE IF NOT EXISTS error_catalog (
  id serial PRIMARY KEY,
  label text UNIQUE NOT NULL,
  description text
);

-- Tabla suggestion_rules
CREATE TABLE IF NOT EXISTS suggestion_rules (
  id serial PRIMARY KEY,
  error_id integer NOT NULL REFERENCES error_catalog(id) ON DELETE CASCADE,
  template text,
  weight numeric
);

-- Índices adicionales
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_unit_id ON attempts(unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_unit_id ON chat_sessions(unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_turns_session_id ON chat_turns(session_id);
CREATE INDEX IF NOT EXISTS idx_suggestion_rules_error_id ON suggestion_rules(error_id);