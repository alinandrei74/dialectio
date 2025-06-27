/*
  # Actualizar tabla profiles para configuración actual

  1. Cambios en la tabla profiles
    - Hacer el campo `full_name` opcional (nullable)
    - Agregar valor por defecto para `full_name` basado en `username`
    - Actualizar registros existentes donde `full_name` esté vacío

  2. Funciones
    - Crear función para sincronizar `full_name` con `username` automáticamente

  3. Triggers
    - Agregar trigger para mantener `full_name` actualizado cuando se cambie `username`

  4. Notas importantes
    - Los usuarios existentes mantendrán sus datos actuales
    - Los nuevos usuarios tendrán `username` como `full_name` por defecto
    - Se mantiene la flexibilidad para que los usuarios puedan cambiar su `full_name` más adelante
*/

-- Hacer el campo full_name nullable y agregar valor por defecto
ALTER TABLE profiles 
ALTER COLUMN full_name DROP NOT NULL;

-- Actualizar registros existentes donde full_name esté vacío o sea null
UPDATE profiles 
SET full_name = username 
WHERE full_name IS NULL OR full_name = '';

-- Crear función para sincronizar full_name con username cuando sea necesario
CREATE OR REPLACE FUNCTION sync_full_name_with_username()
RETURNS TRIGGER AS $$
BEGIN
  -- Si full_name está vacío o es null, usar el username
  IF NEW.full_name IS NULL OR NEW.full_name = '' THEN
    NEW.full_name := NEW.username;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para ejecutar la función en INSERT y UPDATE
DROP TRIGGER IF EXISTS sync_full_name_trigger ON profiles;
CREATE TRIGGER sync_full_name_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION sync_full_name_with_username();

-- Agregar comentarios para documentar los cambios
COMMENT ON COLUMN profiles.full_name IS 'Nombre completo del usuario. Si está vacío, se usa el username automáticamente.';
COMMENT ON FUNCTION sync_full_name_with_username() IS 'Sincroniza full_name con username cuando full_name está vacío.';