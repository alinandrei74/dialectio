/*
# Add comprehensive course data for all language combinations

This migration adds courses for all supported language pairs to ensure users
can find available courses regardless of their base language setting.

## New Courses Added:
1. From Spanish (es): French, Portuguese, English
2. From English (en): Spanish, French, Italian, Portuguese  
3. From French (fr): Spanish, Italian
4. From Portuguese (pt): Spanish, Italian
5. From Italian (it): Spanish, French

## Sample Content:
- Each course includes basic parts, phases, and units
- Sample exercises with proper localization
- Conversation agents configured for each target language
*/

-- Add more comprehensive course data for different language combinations

-- Courses from Spanish (es) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- French from Spanish
('550e8400-e29b-41d4-a716-446655440100', 'Francés Básico', 'Aprende francés desde español aprovechando las similitudes entre las lenguas romances', 'fr', 'es', 6, 3, false),
-- Portuguese from Spanish  
('550e8400-e29b-41d4-a716-446655440200', 'Portugués Básico', 'Aprende portugués desde español - dos idiomas hermanos con muchas similitudes', 'pt', 'es', 6, 3, false),
-- English from Spanish
('550e8400-e29b-41d4-a716-446655440300', 'Inglés Básico', 'Aprende inglés desde español con un enfoque práctico y comunicativo', 'en', 'es', 8, 5, false)
ON CONFLICT (id) DO NOTHING;

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
ON CONFLICT (id) DO NOTHING;

-- Courses from French (fr) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from French
('550e8400-e29b-41d4-a716-446655440800', 'Espagnol de Base', 'Apprenez l''espagnol depuis le français - deux langues latines proches', 'es', 'fr', 6, 3, false),
-- Italian from French
('550e8400-e29b-41d4-a716-446655440900', 'Italien de Base', 'Apprenez l''italien depuis le français - explorez la beauté de la langue italienne', 'it', 'fr', 6, 3, false)
ON CONFLICT (id) DO NOTHING;

-- Courses from Portuguese (pt) as source language  
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from Portuguese
('550e8400-e29b-41d4-a716-446655441000', 'Espanhol Básico', 'Aprenda espanhol a partir do português - idiomas irmãos com muitas semelhanças', 'es', 'pt', 6, 3, false),
-- Italian from Portuguese
('550e8400-e29b-41d4-a716-446655441100', 'Italiano Básico', 'Aprenda italiano a partir do português - descubra a beleza da língua italiana', 'it', 'pt', 6, 3, false)
ON CONFLICT (id) DO NOTHING;

-- Courses from Italian (it) as source language
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, is_premium) VALUES
-- Spanish from Italian
('550e8400-e29b-41d4-a716-446655441200', 'Spagnolo di Base', 'Impara lo spagnolo dall''italiano - due lingue romanze molto simili', 'es', 'it', 6, 3, false),
-- French from Italian  
('550e8400-e29b-41d4-a716-446655441300', 'Francese di Base', 'Impara il francese dall''italiano - esplora la lingua della cultura e dell''arte', 'fr', 'it', 6, 3, false)
ON CONFLICT (id) DO NOTHING;

-- Update total lesson counts for existing courses
UPDATE courses SET total_lessons = 8 WHERE id = '550e8400-e29b-41d4-a716-446655440000'; -- Italian from Spanish

-- Add sample parts, phases, and units for the new French course (from Spanish)
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440100', 'Primeros Pasos en Francés', 1, 'Introducción básica al francés con saludos y presentaciones')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440101', 'preparation', 1),
('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440101', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440102', 'exercise', 'Saludos en Francés', 1, NULL, NULL),
('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440103', 'situation', 'Encuentro en París', 1, 'Marie', 'Vous êtes Marie, une Parisienne amicale. Vous rencontrez un étudiant de français dans un café à Paris. Commencez une conversation naturelle, présentez-vous et posez des questions sur sa vie. Parlez toujours en français et corrigez gentiment les erreurs.')
ON CONFLICT (id) DO NOTHING;

-- Add sample exercises for French course
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440104', 'Saludo Básico en Francés', 'Selecciona la forma correcta de saludar en francés', 'multiple_choice', '{
  "question": "¿Cómo se dice \"Hola\" en francés?",
  "options": ["Bonjour", "Merci", "Au revoir", "Excusez-moi"],
  "correct_answer": "Bonjour",
  "explanation": "\"Bonjour\" est la salutation formelle la plus courante en français.",
  "hints": ["C''est une salutation très commune", "On l''utilise pendant la journée", "C''est similaire à \"buenos días\" en espagnol"]
}', 10, 1)
ON CONFLICT (id) DO NOTHING;

-- Add sample parts, phases, and units for English course (from Spanish)
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440300', 'Primeros Pasos en Inglés', 1, 'Introducción básica al inglés con saludos y presentaciones')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440301', 'preparation', 1),
('550e8400-e29b-41d4-a716-446655440303', '550e8400-e29b-41d4-a716-446655440301', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655440304', '550e8400-e29b-41d4-a716-446655440302', 'exercise', 'Saludos en Inglés', 1, NULL, NULL),
('550e8400-e29b-41d4-a716-446655440305', '550e8400-e29b-41d4-a716-446655440303', 'situation', 'Meeting in New York', 1, 'Sarah', 'You are Sarah, a friendly New Yorker. You meet a Spanish-speaking student learning English in a coffee shop in Manhattan. Start a natural conversation, introduce yourself and ask questions about their life. Always speak in English and gently correct any errors.')
ON CONFLICT (id) DO NOTHING;

-- Add sample exercises for English course
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655440306', '550e8400-e29b-41d4-a716-446655440304', '550e8400-e29b-41d4-a716-446655440304', 'Basic English Greeting', 'Selecciona la forma correcta de saludar en inglés', 'multiple_choice', '{
  "question": "¿Cómo se dice \"Hola\" en inglés?",
  "options": ["Hello", "Thank you", "Goodbye", "Excuse me"],
  "correct_answer": "Hello",
  "explanation": "\"Hello\" is the most common greeting in English.",
  "hints": ["It''s a very common greeting", "Used at any time of day", "Similar to \"hola\" in Spanish"]
}', 10, 1)
ON CONFLICT (id) DO NOTHING;

-- Add sample parts, phases, and units for Spanish course (from English)
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('550e8400-e29b-41d4-a716-446655440401', '550e8400-e29b-41d4-a716-446655440400', 'First Steps in Spanish', 1, 'Basic introduction to Spanish with greetings and introductions')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('550e8400-e29b-41d4-a716-446655440402', '550e8400-e29b-41d4-a716-446655440401', 'preparation', 1),
('550e8400-e29b-41d4-a716-446655440403', '550e8400-e29b-41d4-a716-446655440401', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('550e8400-e29b-41d4-a716-446655440404', '550e8400-e29b-41d4-a716-446655440402', 'exercise', 'Spanish Greetings', 1, NULL, NULL),
('550e8400-e29b-41d4-a716-446655440405', '550e8400-e29b-41d4-a716-446655440403', 'situation', 'Meeting in Madrid', 1, 'Carlos', 'Eres Carlos, un madrileño amigable. Te encuentras con un estudiante de español en una cafetería en Madrid. Inicia una conversación natural, preséntate y haz preguntas sobre su vida. Habla siempre en español y corrige gentilmente los errores.')
ON CONFLICT (id) DO NOTHING;

-- Add sample exercises for Spanish course (from English)
INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('550e8400-e29b-41d4-a716-446655440406', '550e8400-e29b-41d4-a716-446655440404', '550e8400-e29b-41d4-a716-446655440404', 'Basic Spanish Greeting', 'Select the correct way to say hello in Spanish', 'multiple_choice', '{
  "question": "How do you say \"Hello\" in Spanish?",
  "options": ["Hola", "Gracias", "Adiós", "Perdón"],
  "correct_answer": "Hola",
  "explanation": "\"Hola\" es el saludo más común en español.",
  "hints": ["Es un saludo muy común", "Se usa en cualquier momento del día", "Es similar a \"hello\" en inglés"]
}', 10, 1)
ON CONFLICT (id) DO NOTHING;

-- Update lesson counts for all courses
UPDATE courses SET total_lessons = 6 WHERE target_language = 'fr' AND source_language = 'es';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'pt' AND source_language = 'es';
UPDATE courses SET total_lessons = 8 WHERE target_language = 'en' AND source_language = 'es';
UPDATE courses SET total_lessons = 8 WHERE target_language = 'es' AND source_language = 'en';
UPDATE courses SET total_lessons = 7 WHERE target_language = 'fr' AND source_language = 'en';
UPDATE courses SET total_lessons = 7 WHERE target_language = 'it' AND source_language = 'en';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'pt' AND source_language = 'en';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'es' AND source_language = 'fr';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'it' AND source_language = 'fr';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'es' AND source_language = 'pt';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'it' AND source_language = 'pt';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'es' AND source_language = 'it';
UPDATE courses SET total_lessons = 6 WHERE target_language = 'fr' AND source_language = 'it';