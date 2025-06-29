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
-- CREAR CURSOS DESDE INGLÉS SI NO EXISTEN (SIN BLOQUES PL/pgSQL)
-- ============================================================================

-- Insertar curso English → Spanish solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567001'::uuid,
  'Spanish for English Speakers',
  'Learn Spanish from English with practical conversations and real-world scenarios. Master the fundamentals of Spanish grammar, vocabulary, and pronunciation.',
  'es', 'en', 18, 25, false, 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'es' AND source_language = 'en'
);

-- Insertar curso English → French solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567002'::uuid,
  'French for English Speakers',
  'Master French from English with immersive conversations and cultural insights. Learn French grammar, pronunciation, and real-world communication skills.',
  'fr', 'en', 18, 25, false, 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'fr' AND source_language = 'en'
);

-- Insertar curso English → Portuguese solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567003'::uuid,
  'Portuguese for English Speakers',
  'Learn Portuguese from English with focus on Brazilian and European variants. Master Portuguese grammar, pronunciation, and cultural nuances.',
  'pt', 'en', 18, 25, false, 'https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'pt' AND source_language = 'en'
);

-- Insertar curso English → Italian solo si no existe
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium, image_url) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567004'::uuid,
  'Italian for English Speakers',
  'Discover Italian from English through art, cuisine, and culture. Learn Italian grammar, pronunciation, and authentic communication.',
  'it', 'en', 18, 25, false, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg'
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE target_language = 'it' AND source_language = 'en'
);

-- ============================================================================
-- CREAR ESTRUCTURA BÁSICA PARA CURSO ESPAÑOL (SI NO EXISTE)
-- ============================================================================

-- Part 1: Spanish Basics
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567011'::uuid,
  c.id,
  'Spanish Basics',
  1,
  'Learn essential Spanish greetings, introductions, and basic conversation skills'
FROM courses c 
WHERE c.target_language = 'es' AND c.source_language = 'en'
AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = c.id);

-- Phase 1: Preparation
INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567111'::uuid,
  p.id,
  'preparation',
  1
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'es' AND c.source_language = 'en' AND p.part_order = 1
AND NOT EXISTS (SELECT 1 FROM phases WHERE part_id = p.id);

-- Units for Spanish preparation
INSERT INTO units (id, phase_id, kind, title, unit_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234561111'::uuid,
  ph.id,
  'exercise',
  'Greetings and Introductions',
  1
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'es' AND c.source_language = 'en' AND ph.kind = 'preparation'
AND NOT EXISTS (SELECT 1 FROM units WHERE phase_id = ph.id AND unit_order = 1);

INSERT INTO units (id, phase_id, kind, title, unit_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234561112'::uuid,
  ph.id,
  'exercise',
  'Numbers and Time',
  2
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'es' AND c.source_language = 'en' AND ph.kind = 'preparation'
AND NOT EXISTS (SELECT 1 FROM units WHERE phase_id = ph.id AND unit_order = 2);

-- Phase 2: Conversation
INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567112'::uuid,
  p.id,
  'conversation',
  2
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'es' AND c.source_language = 'en' AND p.part_order = 1
AND NOT EXISTS (SELECT 1 FROM phases WHERE part_id = p.id AND phase_order = 2);

-- Conversation units for Spanish
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234561121'::uuid,
  ph.id,
  'situation',
  'Meeting Someone New',
  1,
  'Carlos',
  'You are Carlos, a friendly Spanish teacher. Help the student practice basic introductions and greetings in Spanish. Keep the conversation simple and encouraging.'
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'es' AND c.source_language = 'en' AND ph.kind = 'conversation'
AND NOT EXISTS (SELECT 1 FROM units WHERE phase_id = ph.id AND unit_order = 1);

-- ============================================================================
-- CREAR ESTRUCTURA BÁSICA PARA CURSO FRANCÉS (SI NO EXISTE)
-- ============================================================================

-- Part 1: French Fundamentals
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567021'::uuid,
  c.id,
  'French Fundamentals',
  1,
  'Master basic French greetings, pronunciation, and essential vocabulary'
FROM courses c 
WHERE c.target_language = 'fr' AND c.source_language = 'en'
AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = c.id);

-- Phase 1: Preparation for French
INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567211'::uuid,
  p.id,
  'preparation',
  1
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'fr' AND c.source_language = 'en' AND p.part_order = 1
AND NOT EXISTS (SELECT 1 FROM phases WHERE part_id = p.id);

-- Units for French preparation
INSERT INTO units (id, phase_id, kind, title, unit_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234562111'::uuid,
  ph.id,
  'exercise',
  'French Pronunciation',
  1
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'fr' AND c.source_language = 'en' AND ph.kind = 'preparation'
AND NOT EXISTS (SELECT 1 FROM units WHERE phase_id = ph.id AND unit_order = 1);

-- ============================================================================
-- CREAR ESTRUCTURA BÁSICA PARA CURSO PORTUGUÉS (SI NO EXISTE)
-- ============================================================================

-- Part 1: Portuguese Basics
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567031'::uuid,
  c.id,
  'Portuguese Basics',
  1,
  'Learn essential Portuguese greetings, pronunciation, and basic communication'
FROM courses c 
WHERE c.target_language = 'pt' AND c.source_language = 'en'
AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = c.id);

-- Phase 1: Preparation for Portuguese
INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567311'::uuid,
  p.id,
  'preparation',
  1
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'pt' AND c.source_language = 'en' AND p.part_order = 1
AND NOT EXISTS (SELECT 1 FROM phases WHERE part_id = p.id);

-- Units for Portuguese preparation
INSERT INTO units (id, phase_id, kind, title, unit_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234563111'::uuid,
  ph.id,
  'exercise',
  'Portuguese Sounds',
  1
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'pt' AND c.source_language = 'en' AND ph.kind = 'preparation'
AND NOT EXISTS (SELECT 1 FROM units WHERE phase_id = ph.id AND unit_order = 1);

-- ============================================================================
-- CREAR ESTRUCTURA BÁSICA PARA CURSO ITALIANO (SI NO EXISTE)
-- ============================================================================

-- Part 1: Italian Fundamentals
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567041'::uuid,
  c.id,
  'Italian Fundamentals',
  1,
  'Master basic Italian pronunciation, greetings, and essential expressions'
FROM courses c 
WHERE c.target_language = 'it' AND c.source_language = 'en'
AND NOT EXISTS (SELECT 1 FROM parts WHERE course_id = c.id);

-- Phase 1: Preparation for Italian
INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234567411'::uuid,
  p.id,
  'preparation',
  1
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'it' AND c.source_language = 'en' AND p.part_order = 1
AND NOT EXISTS (SELECT 1 FROM phases WHERE part_id = p.id);

-- Units for Italian preparation
INSERT INTO units (id, phase_id, kind, title, unit_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234564111'::uuid,
  ph.id,
  'exercise',
  'Italian Pronunciation',
  1
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'it' AND c.source_language = 'en' AND ph.kind = 'preparation'
AND NOT EXISTS (SELECT 1 FROM units WHERE phase_id = ph.id AND unit_order = 1);

-- ============================================================================
-- CREAR ALGUNOS EJERCICIOS BÁSICOS
-- ============================================================================

-- Ejercicio básico para español
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234551111'::uuid,
  u.id,
  u.id,
  'Basic Spanish Greetings',
  'Choose the correct Spanish greeting for each situation.',
  'multiple_choice',
  '{"question": "How do you say \"Good morning\" in Spanish?", "options": ["Buenos días", "Buenas tardes", "Buenas noches", "Hola"], "correct_answer": "Buenos días", "explanation": "Buenos días is used to greet someone in the morning until around noon."}'::jsonb,
  10,
  1
FROM units u
JOIN phases ph ON ph.id = u.phase_id
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'es' AND c.source_language = 'en' 
AND u.title = 'Greetings and Introductions'
AND NOT EXISTS (SELECT 1 FROM exercises WHERE lesson_id = u.id);

-- Ejercicio básico para francés
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT 
  'b1c2d3e4-f5g6-7890-bcde-fg1234552111'::uuid,
  u.id,
  u.id,
  'French Pronunciation Basics',
  'Listen and identify the correct French pronunciation.',
  'multiple_choice',
  '{"question": "How do you say \"hello\" in French?", "options": ["Bonjour", "Bonsoir", "Salut", "Au revoir"], "correct_answer": "Bonjour", "explanation": "Bonjour is the standard French greeting meaning hello or good day."}'::jsonb,
  10,
  1
FROM units u
JOIN phases ph ON ph.id = u.phase_id
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE c.target_language = 'fr' AND c.source_language = 'en' 
AND u.title = 'French Pronunciation'
AND NOT EXISTS (SELECT 1 FROM exercises WHERE lesson_id = u.id);

-- ============================================================================
-- ACTUALIZAR TOTAL DE LECCIONES
-- ============================================================================

-- Actualizar el total de lecciones para todos los cursos
UPDATE courses SET total_lessons = (
  SELECT COALESCE(COUNT(DISTINCT u.id), 0)
  FROM parts p
  LEFT JOIN phases ph ON ph.part_id = p.id
  LEFT JOIN units u ON u.phase_id = ph.id
  WHERE p.course_id = courses.id
) WHERE source_language = 'en';