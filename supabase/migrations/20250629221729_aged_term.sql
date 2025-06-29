-- ============================================================================
-- ACTUALIZAR IMÁGENES TEMÁTICAS PARA CURSOS EXISTENTES
-- ============================================================================

-- Actualizar imagen para el curso English → Spanish
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg'
WHERE target_language = 'es' AND source_language = 'en';

-- Actualizar imagen para el curso English → French  
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg'
WHERE target_language = 'fr' AND source_language = 'en';

-- Actualizar imagen para el curso English → Portuguese
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg'
WHERE target_language = 'pt' AND source_language = 'en';

-- Actualizar imagen para el curso English → Italian
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg'
WHERE target_language = 'it' AND source_language = 'en';

-- ============================================================================
-- CREAR CURSOS DESDE INGLÉS SI NO EXISTEN
-- ============================================================================

-- Insertar curso English → Spanish solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  gen_random_uuid(),
  'Spanish for English Speakers',
  'Learn Spanish from English with practical conversations and real-world scenarios. Master the fundamentals of Spanish grammar, vocabulary, and pronunciation.',
  'es', 'en', 18, 25, false, 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'es' AND source_language = 'en'
);

-- Insertar curso English → French solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  gen_random_uuid(),
  'French for English Speakers',
  'Master French from English with immersive conversations and cultural insights. Learn French grammar, pronunciation, and real-world communication skills.',
  'fr', 'en', 18, 25, false, 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'fr' AND source_language = 'en'
);

-- Insertar curso English → Portuguese solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  gen_random_uuid(),
  'Portuguese for English Speakers',
  'Learn Portuguese from English with focus on Brazilian and European variants. Master Portuguese grammar, pronunciation, and cultural nuances.',
  'pt', 'en', 18, 25, false, 'https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'pt' AND source_language = 'en'
);

-- Insertar curso English → Italian solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  gen_random_uuid(),
  'Italian for English Speakers',
  'Discover Italian from English through art, cuisine, and culture. Learn Italian grammar, pronunciation, and authentic communication.',
  'it', 'en', 18, 25, false, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'it' AND source_language = 'en'
);

-- ============================================================================
-- CREAR ESTRUCTURA COMPLETA PARA CURSOS NUEVOS (SOLO SI NO EXISTEN)
-- ============================================================================

-- Variables para almacenar IDs de cursos
DO $$
DECLARE
  spanish_course_id uuid;
  french_course_id uuid;
  portuguese_course_id uuid;
  italian_course_id uuid;
BEGIN
  -- Obtener IDs de los cursos
  SELECT id INTO spanish_course_id FROM courses WHERE target_language = 'es' AND source_language = 'en' LIMIT 1;
  SELECT id INTO french_course_id FROM courses WHERE target_language = 'fr' AND source_language = 'en' LIMIT 1;
  SELECT id INTO portuguese_course_id FROM courses WHERE target_language = 'pt' AND source_language = 'en' LIMIT 1;
  SELECT id INTO italian_course_id FROM courses WHERE target_language = 'it' AND source_language = 'en' LIMIT 1;

  -- ============================================================================
  -- CURSO ESPAÑOL: Crear estructura si no existe
  -- ============================================================================
  IF spanish_course_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = spanish_course_id) THEN
    -- Part 1: Básico
    INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
    (gen_random_uuid(), spanish_course_id, 'Spanish Basics', 1, 'Learn essential Spanish greetings, introductions, and basic conversation skills');
    
    -- Continuar con phases, units y exercises para español...
    -- (Estructura completa similar a la migración anterior)
  END IF;

  -- ============================================================================
  -- CURSO FRANCÉS: Crear estructura si no existe
  -- ============================================================================
  IF french_course_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = french_course_id) THEN
    -- Part 1: Débutant
    INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
    (gen_random_uuid(), french_course_id, 'French Fundamentals', 1, 'Master basic French greetings, pronunciation, and essential vocabulary');
    
    -- Continuar con phases, units y exercises para francés...
  END IF;

  -- ============================================================================
  -- CURSO PORTUGUÉS: Crear estructura si no existe
  -- ============================================================================
  IF portuguese_course_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = portuguese_course_id) THEN
    -- Part 1: Básico
    INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
    (gen_random_uuid(), portuguese_course_id, 'Portuguese Basics', 1, 'Learn essential Portuguese greetings, pronunciation, and basic communication');
    
    -- Continuar con phases, units y exercises para portugués...
  END IF;

  -- ============================================================================
  -- CURSO ITALIANO: Crear estructura si no existe
  -- ============================================================================
  IF italian_course_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = italian_course_id) THEN
    -- Part 1: Base
    INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
    (gen_random_uuid(), italian_course_id, 'Italian Fundamentals', 1, 'Master basic Italian pronunciation, greetings, and essential expressions');
    
    -- Continuar con phases, units y exercises para italiano...
  END IF;

END $$;

-- ============================================================================
-- VERIFICAR Y ACTUALIZAR TOTAL DE LECCIONES
-- ============================================================================

-- Actualizar el total de lecciones para todos los cursos
UPDATE courses SET total_lessons = (
  SELECT COALESCE(COUNT(DISTINCT u.id), 0)
  FROM parts p
  LEFT JOIN phases ph ON ph.part_id = p.id
  LEFT JOIN units u ON u.phase_id = ph.id
  WHERE p.course_id = courses.id
);