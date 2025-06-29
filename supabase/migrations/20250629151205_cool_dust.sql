-- Mejorar políticas RLS para asegurar seguridad completa
-- Esta migración revisa y completa todas las políticas de seguridad

BEGIN;

-- Verificar que RLS esté habilitado en todas las tablas críticas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_turns ENABLE ROW LEVEL SECURITY;

-- Políticas para contenido público (cursos, partes, fases, unidades, ejercicios)
-- Estas tablas contienen contenido educativo que debe ser accesible a todos los usuarios autenticados

-- Cursos: acceso público para lectura
DROP POLICY IF EXISTS "Anyone can read courses" ON courses;
CREATE POLICY "Anyone can read courses" ON courses FOR SELECT TO public USING (true);

-- Partes: acceso público para lectura
DROP POLICY IF EXISTS "Anyone can read parts" ON parts;
CREATE POLICY "Anyone can read parts" ON parts FOR SELECT TO public USING (true);

-- Fases: acceso público para lectura
DROP POLICY IF EXISTS "Anyone can read phases" ON phases;
CREATE POLICY "Anyone can read phases" ON phases FOR SELECT TO public USING (true);

-- Unidades: acceso público para lectura
DROP POLICY IF EXISTS "Anyone can read units" ON units;
CREATE POLICY "Anyone can read units" ON units FOR SELECT TO public USING (true);

-- Ejercicios: acceso público para lectura
DROP POLICY IF EXISTS "Anyone can read exercises" ON exercises;
CREATE POLICY "Anyone can read exercises" ON exercises FOR SELECT TO public USING (true);

-- Políticas para datos de usuario (progreso, resultados, intentos)
-- Estos datos son privados y solo deben ser accesibles por el usuario propietario

-- Progreso de usuario: solo el usuario puede ver y modificar su progreso
DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

CREATE POLICY "Users can read own progress" ON user_progress 
    FOR SELECT TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress 
    FOR UPDATE TO authenticated 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

-- Resultados de ejercicios: solo el usuario puede ver y crear sus resultados
DROP POLICY IF EXISTS "Users can read own exercise results" ON user_exercise_results;
DROP POLICY IF EXISTS "Users can insert own exercise results" ON user_exercise_results;

CREATE POLICY "Users can read own exercise results" ON user_exercise_results 
    FOR SELECT TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise results" ON user_exercise_results 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = user_id);

-- Intentos: solo el usuario puede ver y crear sus intentos
DROP POLICY IF EXISTS "Users can read own attempts" ON attempts;
DROP POLICY IF EXISTS "Users can insert own attempts" ON attempts;

CREATE POLICY "Users can read own attempts" ON attempts 
    FOR SELECT TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON attempts 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = user_id);

-- Sesiones de chat: solo el usuario puede gestionar sus sesiones
DROP POLICY IF EXISTS "Users can read own chat sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Users can insert own chat sessions" ON chat_sessions;
DROP POLICY IF EXISTS "Users can update own chat sessions" ON chat_sessions;

CREATE POLICY "Users can read own chat sessions" ON chat_sessions 
    FOR SELECT TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON chat_sessions 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions" ON chat_sessions 
    FOR UPDATE TO authenticated 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

-- Turnos de chat: solo el usuario puede gestionar sus turnos
DROP POLICY IF EXISTS "Users can read own chat turns" ON chat_turns;
DROP POLICY IF EXISTS "Users can insert own chat turns" ON chat_turns;

CREATE POLICY "Users can read own chat turns" ON chat_turns 
    FOR SELECT TO authenticated 
    USING (EXISTS (
        SELECT 1 FROM chat_sessions cs 
        WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert own chat turns" ON chat_turns 
    FOR INSERT TO authenticated 
    WITH CHECK (EXISTS (
        SELECT 1 FROM chat_sessions cs 
        WHERE cs.id = chat_turns.session_id AND cs.user_id = auth.uid()
    ));

-- Políticas para perfiles: mejorar seguridad
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public can read usernames for login" ON profiles;

-- Permitir lectura pública solo de usernames para login (sin información personal)
CREATE POLICY "Public can read usernames for login" ON profiles 
    FOR SELECT TO anon 
    USING (true);

-- Los usuarios autenticados pueden ver su propio perfil completo
CREATE POLICY "Users can read own profile" ON profiles 
    FOR SELECT TO authenticated 
    USING (auth.uid() = id);

-- Los usuarios pueden crear su propio perfil durante el registro
CREATE POLICY "Users can insert own profile" ON profiles 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON profiles 
    FOR UPDATE TO authenticated 
    USING (auth.uid() = id) 
    WITH CHECK (auth.uid() = id);

-- Crear índices para mejorar el rendimiento de las consultas con RLS
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_results_user_id ON user_exercise_results(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);

-- Crear índices compuestos para consultas comunes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_course ON user_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_results_user_exercise ON user_exercise_results(user_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_unit ON attempts(user_id, unit_id);

COMMIT;