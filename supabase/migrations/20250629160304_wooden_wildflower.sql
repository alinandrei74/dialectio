BEGIN;

-- Limpiar datos existentes si existen
DELETE FROM exercises WHERE TRUE;
DELETE FROM units WHERE TRUE;
DELETE FROM phases WHERE TRUE;
DELETE FROM parts WHERE TRUE;
DELETE FROM courses WHERE TRUE;

-------------------------------------------------------------
-- 1. Cursos base (uno por idioma objetivo)               ---
-------------------------------------------------------------
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, image_url, is_premium) VALUES
-- Español para francófonos
(gen_random_uuid(), 'Español Esencial', 'Aprende español desde francés aprovechando las similitudes entre lenguas romances.', 'es', 'fr', 15, 8, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', false),

-- Francés para hispanohablantes  
(gen_random_uuid(), 'Français Essentiel', 'Aprende francés desde español con un enfoque práctico y comunicativo.', 'fr', 'es', 15, 8, 'https://images.pexels.com/photos/161154/paris-france-tower-eiffel-161154.jpeg', false),

-- Portugués para hispanohablantes
(gen_random_uuid(), 'Português Essencial', 'Domina el portugués aprovechando tu conocimiento del español.', 'pt', 'es', 15, 8, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', false),

-- Italiano para hispanohablantes
(gen_random_uuid(), 'Italiano Essenziale', 'Aprende italiano de forma natural desde el español.', 'it', 'es', 15, 8, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg', false),

-- Inglés para hispanohablantes
(gen_random_uuid(), 'Essential English', 'Aprende inglés con un enfoque comunicativo y práctico.', 'en', 'es', 15, 8, 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg', false);

-------------------------------------------------------------
-- 2. Crear partes para cada curso                        ---
-------------------------------------------------------------
INSERT INTO parts (course_id, title, part_order, synopsis)
SELECT 
  c.id,
  'Parte 1: Fundamentos',
  1,
  'Saludos, presentaciones y conversaciones básicas para empezar a comunicarte desde el primer día.'
FROM courses c;

-------------------------------------------------------------
-- 3. Crear fases para cada parte                         ---
-------------------------------------------------------------
INSERT INTO phases (part_id, kind, phase_order)
SELECT p.id, 'preparation', 1 FROM parts p
UNION ALL
SELECT p.id, 'conversation', 2 FROM parts p;

-------------------------------------------------------------
-- 4. Crear unidades de preparación (ejercicios)          ---
-------------------------------------------------------------
INSERT INTO units (phase_id, kind, title, unit_order)
SELECT 
  ph.id, 
  'exercise', 
  'Saludos y Presentaciones',
  1
FROM phases ph 
WHERE ph.kind = 'preparation'
UNION ALL
SELECT 
  ph.id, 
  'exercise', 
  'Información Personal',
  2
FROM phases ph 
WHERE ph.kind = 'preparation'
UNION ALL
SELECT 
  ph.id, 
  'exercise', 
  'Conversación Básica',
  3
FROM phases ph 
WHERE ph.kind = 'preparation';

-------------------------------------------------------------
-- 5. Crear unidades de conversación (situaciones)        ---
-------------------------------------------------------------
INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
SELECT 
  ph.id,
  'situation',
  'Encuentro Casual',
  1,
  'María',
  'Eres una persona amigable que quiere conocer gente nueva. Mantén la conversación natural y ayuda al estudiante a practicar presentaciones.'
FROM phases ph 
WHERE ph.kind = 'conversation'
UNION ALL
SELECT 
  ph.id,
  'situation',
  'En la Recepción',
  2,
  'Carlos',
  'Eres un recepcionista profesional de hotel. Ayuda al huésped con cortesía y practica vocabulario hotelero.'
FROM phases ph 
WHERE ph.kind = 'conversation';

-------------------------------------------------------------
-- 6. Crear ejercicios para las unidades de preparación   ---
-------------------------------------------------------------

-- Ejercicios para "Saludos y Presentaciones"
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Saludo Correcto',
  'Selecciona el saludo más apropiado para esta situación.',
  'multiple_choice',
  jsonb_build_object(
    'question', '¿Cómo saludarías a alguien por la mañana?',
    'options', ARRAY['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
    'correct_answer', 'Buenos días',
    'explanation', 'Buenos días se usa desde la mañana hasta el mediodía.'
  ),
  10,
  1
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Completa la Presentación',
  'Completa la frase con la palabra correcta.',
  'fill_blank',
  jsonb_build_object(
    'question', 'Me llamo Juan y ____ de España.',
    'correct_answer', 'soy',
    'acceptable_answers', ARRAY['soy', 'vengo'],
    'explanation', 'Usamos "soy" para indicar origen o nacionalidad.'
  ),
  10,
  2
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Traduce la Frase',
  'Traduce la siguiente frase al idioma objetivo.',
  'translation',
  jsonb_build_object(
    'question', 'Hello, how are you?',
    'correct_answer', 'Hola, ¿cómo estás?',
    'acceptable_answers', ARRAY['Hola, ¿cómo estás?', 'Hola, ¿qué tal?', 'Hola, ¿cómo está usted?'],
    'source_language', 'en',
    'target_language', 'es',
    'explanation', 'Esta es la traducción más común y natural.'
  ),
  15,
  3
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Escucha y Responde',
  'Escucha el audio y escribe lo que oyes.',
  'audio',
  jsonb_build_object(
    'question', 'Escucha el saludo y escribe lo que oyes.',
    'audio_url', 'https://example.com/audio/saludo.mp3',
    'correct_answer', 'Hola, mucho gusto',
    'acceptable_answers', ARRAY['Hola, mucho gusto', 'Hola mucho gusto'],
    'transcript', 'Hola, mucho gusto',
    'explanation', 'Es una forma común de saludar cuando conoces a alguien.'
  ),
  15,
  4
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Conversación Práctica',
  'Responde a la pregunta de forma natural.',
  'conversation',
  jsonb_build_object(
    'question', '¿De dónde eres?',
    'scenario', 'Conversación informal entre amigos',
    'expected_responses', ARRAY['Soy de...', 'Vengo de...', 'Nací en...'],
    'explanation', 'Puedes responder indicando tu ciudad, país o región.'
  ),
  20,
  5
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Saludos y Presentaciones' AND ph.kind = 'preparation';

-- Ejercicios para "Información Personal"
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Datos Personales',
  'Selecciona la respuesta correcta sobre información personal.',
  'multiple_choice',
  jsonb_build_object(
    'question', '¿Cómo preguntas la edad de alguien de forma educada?',
    'options', ARRAY['¿Cuántos años tienes?', '¿Qué edad tienes?', '¿Cuál es tu edad?', 'Todas son correctas'],
    'correct_answer', 'Todas son correctas',
    'explanation', 'Todas estas formas son correctas y educadas para preguntar la edad.'
  ),
  10,
  1
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Información Personal' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Completa tu Perfil',
  'Completa la información personal.',
  'fill_blank',
  jsonb_build_object(
    'question', 'Tengo ____ años y trabajo como ____.',
    'correct_answer', 'veinticinco, profesor',
    'acceptable_answers', ARRAY['25, profesor', 'veinticinco, maestro', '25, maestro'],
    'explanation', 'Puedes usar números o palabras para la edad, y varios términos para profesiones.'
  ),
  10,
  2
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Información Personal' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Traduce Información',
  'Traduce la información personal.',
  'translation',
  jsonb_build_object(
    'question', 'I am 30 years old and I live in Madrid',
    'correct_answer', 'Tengo 30 años y vivo en Madrid',
    'acceptable_answers', ARRAY['Tengo 30 años y vivo en Madrid', 'Tengo treinta años y vivo en Madrid'],
    'source_language', 'en',
    'target_language', 'es',
    'explanation', 'Estructura básica para expresar edad y lugar de residencia.'
  ),
  15,
  3
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Información Personal' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Audio Personal',
  'Escucha y completa la información.',
  'audio',
  jsonb_build_object(
    'question', 'Escucha la presentación personal.',
    'audio_url', 'https://example.com/audio/personal.mp3',
    'correct_answer', 'Me llamo Ana y soy doctora',
    'acceptable_answers', ARRAY['Me llamo Ana y soy doctora', 'Me llamo Ana y soy médica'],
    'transcript', 'Me llamo Ana y soy doctora',
    'explanation', 'Presentación personal básica con nombre y profesión.'
  ),
  15,
  4
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Información Personal' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Háblame de Ti',
  'Responde sobre tu información personal.',
  'conversation',
  jsonb_build_object(
    'question', '¿Puedes contarme algo sobre ti?',
    'scenario', 'Primera conversación con un nuevo conocido',
    'expected_responses', ARRAY['Me llamo...', 'Soy...', 'Trabajo en...', 'Vivo en...'],
    'explanation', 'Puedes compartir tu nombre, profesión, lugar de origen o residencia.'
  ),
  20,
  5
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Información Personal' AND ph.kind = 'preparation';

-- Ejercicios para "Conversación Básica"
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Frases Útiles',
  'Selecciona la frase más apropiada para la situación.',
  'multiple_choice',
  jsonb_build_object(
    'question', '¿Qué dices cuando no entiendes algo?',
    'options', ARRAY['No hablo español', '¿Puedes repetir, por favor?', 'No me gusta', 'Está bien'],
    'correct_answer', '¿Puedes repetir, por favor?',
    'explanation', 'Es una forma educada de pedir que repitan cuando no entiendes.'
  ),
  10,
  1
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Completa el Diálogo',
  'Completa la conversación.',
  'fill_blank',
  jsonb_build_object(
    'question', '- ¿Cómo estás? - ____ bien, gracias. ¿Y tú?',
    'correct_answer', 'Estoy',
    'acceptable_answers', ARRAY['Estoy', 'Muy', 'Todo'],
    'explanation', '"Estoy" es la respuesta más natural y común.'
  ),
  10,
  2
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Traduce el Diálogo',
  'Traduce esta conversación básica.',
  'translation',
  jsonb_build_object(
    'question', 'Nice to meet you. See you later!',
    'correct_answer', 'Mucho gusto. ¡Hasta luego!',
    'acceptable_answers', ARRAY['Mucho gusto. ¡Hasta luego!', 'Encantado. ¡Nos vemos!', 'Un placer. ¡Hasta pronto!'],
    'source_language', 'en',
    'target_language', 'es',
    'explanation', 'Formas comunes de despedirse después de conocer a alguien.'
  ),
  15,
  3
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Audio Conversación',
  'Escucha el diálogo y responde.',
  'audio',
  jsonb_build_object(
    'question', 'Escucha la conversación y escribe la respuesta.',
    'audio_url', 'https://example.com/audio/dialogo.mp3',
    'correct_answer', 'De nada, que tengas buen día',
    'acceptable_answers', ARRAY['De nada, que tengas buen día', 'De nada, buen día'],
    'transcript', 'De nada, que tengas buen día',
    'explanation', 'Respuesta educada después de que alguien te da las gracias.'
  ),
  15,
  4
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation'
UNION ALL
SELECT 
  gen_random_uuid(), -- old_lesson_id (placeholder)
  u.id,              -- lesson_id (actual unit id)
  'Mantén la Conversación',
  'Continúa esta conversación de forma natural.',
  'conversation',
  jsonb_build_object(
    'question', 'Ha sido un placer conocerte.',
    'scenario', 'Final de una primera conversación',
    'expected_responses', ARRAY['Igualmente', 'El placer ha sido mío', 'Espero verte pronto'],
    'explanation', 'Formas educadas de responder cuando alguien dice que fue un placer conocerte.'
  ),
  20,
  5
FROM units u
JOIN phases ph ON ph.id = u.phase_id
WHERE u.title = 'Conversación Básica' AND ph.kind = 'preparation';

COMMIT;

-- Mensaje de confirmación
SELECT 'Datos de muestra creados exitosamente' as status,
       (SELECT COUNT(*) FROM courses) as total_courses,
       (SELECT COUNT(*) FROM parts) as total_parts,
       (SELECT COUNT(*) FROM phases) as total_phases,
       (SELECT COUNT(*) FROM units) as total_units,
       (SELECT COUNT(*) FROM exercises) as total_exercises;