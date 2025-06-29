/*
  # Configuración de Row Level Security (RLS)

  1. Habilitar RLS en todas las nuevas tablas
  2. Crear políticas de acceso apropiadas
*/

-- Habilitar RLS en todas las tablas nuevas
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestion_rules ENABLE ROW LEVEL SECURITY;

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

-- Políticas para exercises (público puede leer)
CREATE POLICY "Anyone can read exercises"
  ON exercises FOR SELECT
  TO public
  USING (true);

-- Políticas para attempts (usuarios solo pueden ver/modificar sus propios intentos)
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

-- Políticas para chat_sessions (usuarios solo pueden ver/modificar sus propias sesiones)
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

-- Políticas para chat_turns (usuarios pueden ver/modificar turnos de sus sesiones)
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

-- Políticas para error_catalog (público puede leer)
CREATE POLICY "Anyone can read error catalog"
  ON error_catalog FOR SELECT
  TO public
  USING (true);

-- Políticas para suggestion_rules (público puede leer)
CREATE POLICY "Anyone can read suggestion rules"
  ON suggestion_rules FOR SELECT
  TO public
  USING (true);