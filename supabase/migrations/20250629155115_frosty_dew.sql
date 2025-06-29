/*
  # Seed de datos de muestra para dialectio.xyz
  
  1. Datos de muestra
    - Cursos para cada idioma objetivo
    - Partes, fases y unidades estructuradas
    - Ejercicios variados con contenido completo
    - Situaciones de conversación
  
  2. Estructura
    - Cada curso tiene 1 parte de introducción
    - Cada parte tiene 2 fases: preparación y conversación
    - Fase de preparación: unidades de ejercicios
    - Fase de conversación: unidades de situación
*/

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
WITH course_parts AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT 
    c.id,
    'Parte 1: Fundamentos',
    1,
    'Saludos, presentaciones y conversaciones básicas para empezar a comunicarte desde el primer día.'
  FROM courses c
  RETURNING id, course_id
),

-------------------------------------------------------------
-- 3. Crear fases para cada parte                         ---
-------------------------------------------------------------
part_phases AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT cp.id, 'preparation', 1 FROM course_parts cp
  UNION ALL
  SELECT cp.id, 'conversation', 2 FROM course_parts cp
  RETURNING id, part_id, kind
),

-------------------------------------------------------------
-- 4. Crear unidades de preparación (ejercicios)          ---
-------------------------------------------------------------
prep_units AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT 
    ph.id, 
    'exercise', 
    CASE 
      WHEN ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id) = 1 THEN 'Saludos y Presentaciones'
      WHEN ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id) = 2 THEN 'Información Personal'
      ELSE 'Conversación Básica'
    END,
    ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id)
  FROM part_phases ph 
  WHERE ph.kind = 'preparation'
  CROSS JOIN generate_series(1, 3) -- 3 unidades de ejercicios por fase
  RETURNING id, title
),

-------------------------------------------------------------
-- 5. Crear unidades de conversación (situaciones)        ---
-------------------------------------------------------------
conv_units AS (
  INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
  SELECT 
    ph.id,
    'situation',
    CASE 
      WHEN ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id) = 1 THEN 'Encuentro Casual'
      ELSE 'En la Recepción'
    END,
    ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id),
    CASE 
      WHEN ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id) = 1 THEN 'María'
      ELSE 'Carlos'
    END,
    CASE 
      WHEN ROW_NUMBER() OVER (PARTITION BY ph.id ORDER BY ph.id) = 1 THEN 'Eres una persona amigable que quiere conocer gente nueva. Mantén la conversación natural y ayuda al estudiante a practicar presentaciones.'
      ELSE 'Eres un recepcionista profesional de hotel. Ayuda al huésped con cortesía y practica vocabulario hotelero.'
    END
  FROM part_phases ph 
  WHERE ph.kind = 'conversation'
  CROSS JOIN generate_series(1, 2) -- 2 situaciones de conversación por fase
  RETURNING id, title
)

-------------------------------------------------------------
-- 6. Crear ejercicios para las unidades de preparación   ---
-------------------------------------------------------------
INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT 
  pu.id,
  CASE 
    WHEN gs.num = 1 THEN 'Saludo Correcto'
    WHEN gs.num = 2 THEN 'Completa la Presentación'
    WHEN gs.num = 3 THEN 'Traduce la Frase'
    WHEN gs.num = 4 THEN 'Escucha y Responde'
    ELSE 'Conversación Práctica'
  END,
  CASE 
    WHEN gs.num = 1 THEN 'Selecciona el saludo más apropiado para esta situación.'
    WHEN gs.num = 2 THEN 'Completa la frase con la palabra correcta.'
    WHEN gs.num = 3 THEN 'Traduce la siguiente frase al idioma objetivo.'
    WHEN gs.num = 4 THEN 'Escucha el audio y escribe lo que oyes.'
    ELSE 'Responde a la pregunta de forma natural.'
  END,
  CASE 
    WHEN gs.num = 1 THEN 'multiple_choice'
    WHEN gs.num = 2 THEN 'fill_blank'
    WHEN gs.num = 3 THEN 'translation'
    WHEN gs.num = 4 THEN 'audio'
    ELSE 'conversation'
  END,
  CASE 
    WHEN gs.num = 1 THEN jsonb_build_object(
      'question', '¿Cómo saludarías a alguien por la mañana?',
      'options', ARRAY['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
      'correct_answer', 'Buenos días',
      'explanation', 'Buenos días se usa desde la mañana hasta el mediodía.'
    )
    WHEN gs.num = 2 THEN jsonb_build_object(
      'question', 'Me llamo Juan y ____ de España.',
      'correct_answer', 'soy',
      'acceptable_answers', ARRAY['soy', 'vengo'],
      'explanation', 'Usamos "soy" para indicar origen o nacionalidad.'
    )
    WHEN gs.num = 3 THEN jsonb_build_object(
      'question', 'Hello, how are you?',
      'correct_answer', 'Hola, ¿cómo estás?',
      'acceptable_answers', ARRAY['Hola, ¿cómo estás?', 'Hola, ¿qué tal?', 'Hola, ¿cómo está usted?'],
      'source_language', 'en',
      'target_language', 'es',
      'explanation', 'Esta es la traducción más común y natural.'
    )
    WHEN gs.num = 4 THEN jsonb_build_object(
      'question', 'Escucha el saludo y escribe lo que oyes.',
      'audio_url', 'https://example.com/audio/saludo.mp3',
      'correct_answer', 'Hola, mucho gusto',
      'acceptable_answers', ARRAY['Hola, mucho gusto', 'Hola mucho gusto'],
      'transcript', 'Hola, mucho gusto',
      'explanation', 'Es una forma común de saludar cuando conoces a alguien.'
    )
    ELSE jsonb_build_object(
      'question', '¿De dónde eres?',
      'scenario', 'Conversación informal entre amigos',
      'expected_responses', ARRAY['Soy de...', 'Vengo de...', 'Nací en...'],
      'explanation', 'Puedes responder indicando tu ciudad, país o región.'
    )
  END,
  CASE 
    WHEN gs.num <= 2 THEN 10
    WHEN gs.num <= 4 THEN 15
    ELSE 20
  END,
  gs.num
FROM prep_units pu
CROSS JOIN generate_series(1, 5) gs(num); -- 5 ejercicios por unidad

COMMIT;

-- Mensaje de confirmación
SELECT 'Datos de muestra creados exitosamente' as status,
       (SELECT COUNT(*) FROM courses) as total_courses,
       (SELECT COUNT(*) FROM parts) as total_parts,
       (SELECT COUNT(*) FROM phases) as total_phases,
       (SELECT COUNT(*) FROM units) as total_units,
       (SELECT COUNT(*) FROM exercises) as total_exercises;