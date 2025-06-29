/*
  # Add comprehensive course data for all language combinations

  1. New Courses
    - Courses from Spanish to French, Portuguese, English
    - Courses from English to Spanish, French, Italian, Portuguese  
    - Courses from French to Spanish, Italian
    - Courses from Portuguese to Spanish, Italian
    - Courses from Italian to Spanish, French

  2. Sample Content
    - Parts, phases, and units for key courses
    - Sample exercises with proper content structure
    - Conversation scenarios with AI agents

  3. Conflict Handling
    - Proper UPSERT logic for all tables
    - Handle existing data gracefully
    - Maintain referential integrity
*/

-- First, let's add all the courses with proper conflict handling
-- We'll use INSERT ... ON CONFLICT DO UPDATE to handle existing courses

-- Courses from Spanish (es) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- French from Spanish
('550e8400-e29b-41d4-a716-446655440100', 'Francés Básico', 'Aprende francés desde español aprovechando las similitudes entre las lenguas romances', 'fr', 'es', 6, 3, false),
-- Portuguese from Spanish  
('550e8400-e29b-41d4-a716-446655440200', 'Portugués Básico', 'Aprende portugués desde español - dos idiomas hermanos con muchas similitudes', 'pt', 'es', 6, 3, false),
-- English from Spanish
('550e8400-e29b-41d4-a716-446655440300', 'Inglés Básico', 'Aprende inglés desde español con un enfoque práctico y comunicativo', 'en', 'es', 8, 5, false)
ON CONFLICT (target_language, source_language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons,
  estimated_hours = EXCLUDED.estimated_hours,
  updated_at = now();

-- Courses from English (en) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from English
('550e8400-e29b-41d4-a716-446655440400', 'Basic Spanish', 'Learn Spanish from English with practical conversations and cultural insights', 'es', 'en', 8, 4, false),
-- French from English
('550e8400-e29b-41d4-a716-446655440500', 'Basic French', 'Learn French from English - master the language of love and culture', 'fr', 'en', 7, 4, false),
-- Italian from English
('550e8400-e29b-41d4-a716-446655440600', 'Basic Italian', 'Learn Italian from English - discover the beauty of Italian language and culture', 'it', 'en', 7, 4, false),
-- Portuguese from English
('550e8400-e29b-41d4-a716-446655440700', 'Basic Portuguese', 'Learn Portuguese from English - connect with Brazil and Portugal', 'pt', 'en', 6, 3, false)
ON CONFLICT (target_language, source_language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons,
  estimated_hours = EXCLUDED.estimated_hours,
  updated_at = now();

-- Courses from French (fr) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from French
('550e8400-e29b-41d4-a716-446655440800', 'Espagnol de Base', 'Apprenez l''espagnol depuis le français - deux langues latines proches', 'es', 'fr', 6, 3, false),
-- Italian from French
('550e8400-e29b-41d4-a716-446655440900', 'Italien de Base', 'Apprenez l''italien depuis le français - explorez la beauté de la langue italienne', 'it', 'fr', 6, 3, false)
ON CONFLICT (target_language, source_language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons,
  estimated_hours = EXCLUDED.estimated_hours,
  updated_at = now();

-- Courses from Portuguese (pt) as source language  
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from Portuguese
('550e8400-e29b-41d4-a716-446655441000', 'Espanhol Básico', 'Aprenda espanhol a partir do português - idiomas irmãos com muitas semelhanças', 'es', 'pt', 6, 3, false),
-- Italian from Portuguese
('550e8400-e29b-41d4-a716-446655441100', 'Italiano Básico', 'Aprenda italiano a partir do português - descubra a beleza da língua italiana', 'it', 'pt', 6, 3, false)
ON CONFLICT (target_language, source_language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons,
  estimated_hours = EXCLUDED.estimated_hours,
  updated_at = now();

-- Courses from Italian (it) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from Italian
('550e8400-e29b-41d4-a716-446655441200', 'Spagnolo di Base', 'Impara lo spagnolo dall''italiano - due lingue romanze molto simili', 'es', 'it', 6, 3, false),
-- French from Italian  
('550e8400-e29b-41d4-a716-446655441300', 'Francese di Base', 'Impara il francese dall''italiano - esplora la lingua della cultura e dell''arte', 'fr', 'it', 6, 3, false)
ON CONFLICT (target_language, source_language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons,
  estimated_hours = EXCLUDED.estimated_hours,
  updated_at = now();

-- Update total lesson counts for existing courses
UPDATE courses SET total_lessons = 8 WHERE id = '550e8400-e29b-41d4-a716-446655440000'; -- Italian from Spanish

-- Add sample content for French course (from Spanish)
DO $$
DECLARE
    french_course_id uuid;
    french_part_id uuid;
    french_prep_phase_id uuid;
    french_conv_phase_id uuid;
BEGIN
    -- Get the course ID for French from Spanish
    SELECT id INTO french_course_id FROM courses WHERE target_language = 'fr' AND source_language = 'es' LIMIT 1;
    
    IF french_course_id IS NOT NULL THEN
        -- Add parts for French course (handle conflict by course_id and part_order)
        INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
        ('550e8400-e29b-41d4-a716-446655440101', french_course_id, 'Primeros Pasos en Francés', 1, 'Introducción básica al francés con saludos y presentaciones')
        ON CONFLICT (course_id, part_order) DO UPDATE SET
          title = EXCLUDED.title,
          synopsis = EXCLUDED.synopsis,
          updated_at = now()
        RETURNING id INTO french_part_id;
        
        -- If no new part was inserted, get the existing one
        IF french_part_id IS NULL THEN
            SELECT id INTO french_part_id FROM parts WHERE course_id = french_course_id AND part_order = 1 LIMIT 1;
        END IF;

        -- Add phases for French course (handle conflict by part_id and phase_order)
        INSERT INTO phases (id, part_id, kind, phase_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440102', french_part_id, 'preparation', 1)
        ON CONFLICT (part_id, phase_order) DO UPDATE SET
          kind = EXCLUDED.kind,
          updated_at = now()
        RETURNING id INTO french_prep_phase_id;
        
        INSERT INTO phases (id, part_id, kind, phase_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440103', french_part_id, 'conversation', 2)
        ON CONFLICT (part_id, phase_order) DO UPDATE SET
          kind = EXCLUDED.kind,
          updated_at = now()
        RETURNING id INTO french_conv_phase_id;
        
        -- If no new phases were inserted, get the existing ones
        IF french_prep_phase_id IS NULL THEN
            SELECT id INTO french_prep_phase_id FROM phases WHERE part_id = french_part_id AND phase_order = 1 LIMIT 1;
        END IF;
        IF french_conv_phase_id IS NULL THEN
            SELECT id INTO french_conv_phase_id FROM phases WHERE part_id = french_part_id AND phase_order = 2 LIMIT 1;
        END IF;

        -- Add units for French course (handle conflict by phase_id and unit_order)
        INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
        ('550e8400-e29b-41d4-a716-446655440104', french_prep_phase_id, 'exercise', 'Saludos en Francés', 1, NULL, NULL)
        ON CONFLICT (phase_id, unit_order) DO UPDATE SET
          title = EXCLUDED.title,
          kind = EXCLUDED.kind,
          updated_at = now();
        
        INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
        ('550e8400-e29b-41d4-a716-446655440105', french_conv_phase_id, 'situation', 'Encuentro en París', 1, 'Marie', 'Vous êtes Marie, une Parisienne amicale. Vous rencontrez un étudiant de français dans un café à Paris. Commencez une conversation naturelle, présentez-vous et posez des questions sur sa vie. Parlez toujours en français et corrigez gentiment les erreurs.')
        ON CONFLICT (phase_id, unit_order) DO UPDATE SET
          title = EXCLUDED.title,
          kind = EXCLUDED.kind,
          agent_name = EXCLUDED.agent_name,
          agent_prompt = EXCLUDED.agent_prompt,
          updated_at = now();

        -- Add sample exercises for French course
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440104', 'Saludo Básico en Francés', 'Selecciona la forma correcta de saludar en francés', 'multiple_choice', '{
          "question": "¿Cómo se dice \"Hola\" en francés?",
          "options": ["Bonjour", "Merci", "Au revoir", "Excusez-moi"],
          "correct_answer": "Bonjour",
          "explanation": "\"Bonjour\" est la salutation formelle la plus courante en français.",
          "hints": ["C''est une salutation très commune", "On l''utilise pendant la journée", "C''est similaire à \"buenos días\" en espagnol"]
        }', 10, 1)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          instructions = EXCLUDED.instructions,
          content = EXCLUDED.content,
          updated_at = now();
    END IF;
END $$;

-- Add sample content for English course (from Spanish)
DO $$
DECLARE
    english_course_id uuid;
    english_part_id uuid;
    english_prep_phase_id uuid;
    english_conv_phase_id uuid;
BEGIN
    -- Get the course ID for English from Spanish
    SELECT id INTO english_course_id FROM courses WHERE target_language = 'en' AND source_language = 'es' LIMIT 1;
    
    IF english_course_id IS NOT NULL THEN
        -- Add parts for English course
        INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
        ('550e8400-e29b-41d4-a716-446655440301', english_course_id, 'Primeros Pasos en Inglés', 1, 'Introducción básica al inglés con saludos y presentaciones')
        ON CONFLICT (course_id, part_order) DO UPDATE SET
          title = EXCLUDED.title,
          synopsis = EXCLUDED.synopsis,
          updated_at = now()
        RETURNING id INTO english_part_id;
        
        -- If no new part was inserted, get the existing one
        IF english_part_id IS NULL THEN
            SELECT id INTO english_part_id FROM parts WHERE course_id = english_course_id AND part_order = 1 LIMIT 1;
        END IF;

        -- Add phases for English course
        INSERT INTO phases (id, part_id, kind, phase_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440302', english_part_id, 'preparation', 1)
        ON CONFLICT (part_id, phase_order) DO UPDATE SET
          kind = EXCLUDED.kind,
          updated_at = now()
        RETURNING id INTO english_prep_phase_id;
        
        INSERT INTO phases (id, part_id, kind, phase_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440303', english_part_id, 'conversation', 2)
        ON CONFLICT (part_id, phase_order) DO UPDATE SET
          kind = EXCLUDED.kind,
          updated_at = now()
        RETURNING id INTO english_conv_phase_id;
        
        -- If no new phases were inserted, get the existing ones
        IF english_prep_phase_id IS NULL THEN
            SELECT id INTO english_prep_phase_id FROM phases WHERE part_id = english_part_id AND phase_order = 1 LIMIT 1;
        END IF;
        IF english_conv_phase_id IS NULL THEN
            SELECT id INTO english_conv_phase_id FROM phases WHERE part_id = english_part_id AND phase_order = 2 LIMIT 1;
        END IF;

        -- Add units for English course
        INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
        ('550e8400-e29b-41d4-a716-446655440304', english_prep_phase_id, 'exercise', 'Saludos en Inglés', 1, NULL, NULL)
        ON CONFLICT (phase_id, unit_order) DO UPDATE SET
          title = EXCLUDED.title,
          kind = EXCLUDED.kind,
          updated_at = now();
        
        INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
        ('550e8400-e29b-41d4-a716-446655440305', english_conv_phase_id, 'situation', 'Meeting in New York', 1, 'Sarah', 'You are Sarah, a friendly New Yorker. You meet a Spanish-speaking student learning English in a coffee shop in Manhattan. Start a natural conversation, introduce yourself and ask questions about their life. Always speak in English and gently correct any errors.')
        ON CONFLICT (phase_id, unit_order) DO UPDATE SET
          title = EXCLUDED.title,
          kind = EXCLUDED.kind,
          agent_name = EXCLUDED.agent_name,
          agent_prompt = EXCLUDED.agent_prompt,
          updated_at = now();

        -- Add sample exercises for English course
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440306', '550e8400-e29b-41d4-a716-446655440304', '550e8400-e29b-41d4-a716-446655440304', 'Basic English Greeting', 'Selecciona la forma correcta de saludar en inglés', 'multiple_choice', '{
          "question": "¿Cómo se dice \"Hola\" en inglés?",
          "options": ["Hello", "Thank you", "Goodbye", "Excuse me"],
          "correct_answer": "Hello",
          "explanation": "\"Hello\" is the most common greeting in English.",
          "hints": ["It''s a very common greeting", "Used at any time of day", "Similar to \"hola\" in Spanish"]
        }', 10, 1)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          instructions = EXCLUDED.instructions,
          content = EXCLUDED.content,
          updated_at = now();
    END IF;
END $$;

-- Add sample content for Spanish course (from English)
DO $$
DECLARE
    spanish_course_id uuid;
    spanish_part_id uuid;
    spanish_prep_phase_id uuid;
    spanish_conv_phase_id uuid;
BEGIN
    -- Get the course ID for Spanish from English
    SELECT id INTO spanish_course_id FROM courses WHERE target_language = 'es' AND source_language = 'en' LIMIT 1;
    
    IF spanish_course_id IS NOT NULL THEN
        -- Add parts for Spanish course
        INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
        ('550e8400-e29b-41d4-a716-446655440401', spanish_course_id, 'First Steps in Spanish', 1, 'Basic introduction to Spanish with greetings and introductions')
        ON CONFLICT (course_id, part_order) DO UPDATE SET
          title = EXCLUDED.title,
          synopsis = EXCLUDED.synopsis,
          updated_at = now()
        RETURNING id INTO spanish_part_id;
        
        -- If no new part was inserted, get the existing one
        IF spanish_part_id IS NULL THEN
            SELECT id INTO spanish_part_id FROM parts WHERE course_id = spanish_course_id AND part_order = 1 LIMIT 1;
        END IF;

        -- Add phases for Spanish course
        INSERT INTO phases (id, part_id, kind, phase_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440402', spanish_part_id, 'preparation', 1)
        ON CONFLICT (part_id, phase_order) DO UPDATE SET
          kind = EXCLUDED.kind,
          updated_at = now()
        RETURNING id INTO spanish_prep_phase_id;
        
        INSERT INTO phases (id, part_id, kind, phase_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440403', spanish_part_id, 'conversation', 2)
        ON CONFLICT (part_id, phase_order) DO UPDATE SET
          kind = EXCLUDED.kind,
          updated_at = now()
        RETURNING id INTO spanish_conv_phase_id;
        
        -- If no new phases were inserted, get the existing ones
        IF spanish_prep_phase_id IS NULL THEN
            SELECT id INTO spanish_prep_phase_id FROM phases WHERE part_id = spanish_part_id AND phase_order = 1 LIMIT 1;
        END IF;
        IF spanish_conv_phase_id IS NULL THEN
            SELECT id INTO spanish_conv_phase_id FROM phases WHERE part_id = spanish_part_id AND phase_order = 2 LIMIT 1;
        END IF;

        -- Add units for Spanish course
        INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
        ('550e8400-e29b-41d4-a716-446655440404', spanish_prep_phase_id, 'exercise', 'Spanish Greetings', 1, NULL, NULL)
        ON CONFLICT (phase_id, unit_order) DO UPDATE SET
          title = EXCLUDED.title,
          kind = EXCLUDED.kind,
          updated_at = now();
        
        INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
        ('550e8400-e29b-41d4-a716-446655440405', spanish_conv_phase_id, 'situation', 'Meeting in Madrid', 1, 'Carlos', 'Eres Carlos, un madrileño amigable. Te encuentras con un estudiante de español en una cafetería en Madrid. Inicia una conversación natural, preséntate y haz preguntas sobre su vida. Habla siempre en español y corrige gentilmente los errores.')
        ON CONFLICT (phase_id, unit_order) DO UPDATE SET
          title = EXCLUDED.title,
          kind = EXCLUDED.kind,
          agent_name = EXCLUDED.agent_name,
          agent_prompt = EXCLUDED.agent_prompt,
          updated_at = now();

        -- Add sample exercises for Spanish course (from English)
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
        ('550e8400-e29b-41d4-a716-446655440406', '550e8400-e29b-41d4-a716-446655440404', '550e8400-e29b-41d4-a716-446655440404', 'Basic Spanish Greeting', 'Select the correct way to say hello in Spanish', 'multiple_choice', '{
          "question": "How do you say \"Hello\" in Spanish?",
          "options": ["Hola", "Gracias", "Adiós", "Perdón"],
          "correct_answer": "Hola",
          "explanation": "\"Hola\" es el saludo más común en español.",
          "hints": ["Es un saludo muy común", "Se usa en cualquier momento del día", "Es similar a \"hello\" en inglés"]
        }', 10, 1)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          instructions = EXCLUDED.instructions,
          content = EXCLUDED.content,
          updated_at = now();
    END IF;
END $$;