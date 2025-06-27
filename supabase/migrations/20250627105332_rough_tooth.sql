/*
  # Fix profiles table constraints and structure

  1. Database Structure Updates
    - Add UNIQUE constraint to profiles.email column
    - Ensure profiles table only contains fields used in registration
    - Add proper indexes for performance

  2. Security
    - Maintain RLS policies
    - Ensure data integrity with constraints

  3. Data Validation
    - Add check constraints where appropriate
    - Ensure email format validation at database level
*/

-- Add UNIQUE constraint to email column in profiles table
DO $$
BEGIN
  -- Check if the constraint doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_email_key' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
  END IF;
END $$;

-- Add email format validation constraint
DO $$
BEGIN
  -- Check if the constraint doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'profiles_email_format_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_email_format_check 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;
END $$;

-- Add username format validation constraint
DO $$
BEGIN
  -- Check if the constraint doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'profiles_username_format_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_username_format_check 
    CHECK (username ~* '^[a-zA-Z0-9_]{3,}$' AND length(username) >= 3);
  END IF;
END $$;

-- Add initial_language validation constraint
DO $$
BEGIN
  -- Check if the constraint doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'profiles_initial_language_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_initial_language_check 
    CHECK (initial_language IN ('es', 'fr', 'pt', 'it', 'en'));
  END IF;
END $$;

-- Ensure email index exists for performance
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'profiles_email_idx'
  ) THEN
    CREATE INDEX profiles_email_idx ON profiles (email);
  END IF;
END $$;

-- Ensure username index exists for performance
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'profiles_username_idx'
  ) THEN
    CREATE INDEX profiles_username_idx ON profiles (username);
  END IF;
END $$;

-- Update the sync_full_name_with_username function to be more robust
CREATE OR REPLACE FUNCTION public.sync_full_name_with_username()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    -- If full_name is null, empty, or just whitespace, use username
    IF NEW.full_name IS NULL OR trim(NEW.full_name) = '' THEN
        NEW.full_name = NEW.username;
    END IF;
    
    -- Ensure username is lowercase
    NEW.username = lower(NEW.username);
    
    -- Ensure email is lowercase
    NEW.email = lower(NEW.email);
    
    RETURN NEW;
END;
$$;

-- Add comment to the function
COMMENT ON FUNCTION public.sync_full_name_with_username() IS 'Sincroniza full_name con username cuando full_name está vacío, y normaliza username y email a minúsculas.';