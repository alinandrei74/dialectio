/*
  # Seed de datos de muestra para dialectio.xyz
  
  1. Cursos de muestra
    - Español para francófonos
    - Francés para hispanohablantes  
    - Portugués para hispanohablantes
    - Italiano para hispanohablantes
    
  2. Estructura completa
    - Parts con contenido temático
    - Phases de preparación y conversación
    - Units con ejercicios variados
    - Exercises con contenido realista
    
  3. Contenido educativo
    - Ejercicios de vocabulario, gramática y conversación
    - Progresión lógica de dificultad
    - Contenido culturalmente relevante
*/

BEGIN;

-------------------------------------------------------------
-- 1. Cursos de muestra                                   ---
-------------------------------------------------------------

-- Español para francófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
(gen_random_uuid(), 'Español Básico para Francófonos', 'Aprende español aprovechando tu conocimiento del francés. Curso diseñado específicamente para hablantes nativos de francés.', 'es', 'fr', 'beginner', 15, 8, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', false),
(gen_random_uuid(), 'Español Intermedio para Francófonos', 'Profundiza tu español con estructuras más complejas y vocabulario avanzado.', 'es', 'fr', 'intermediate', 20, 12, 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg', true);

-- Francés para hispanohablantes  
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
(gen_random_uuid(), 'Français Débutant pour Hispanophones', 'Découvre le français en utilisant tes connaissances de l''espagnol. Méthode adaptée aux hispanophones.', 'fr', 'es', 'beginner', 18, 10, 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg', false),
(gen_random_uuid(), 'Français Intermédiaire pour Hispanophones', 'Perfectionne ton français avec des structures avancées et un vocabulaire riche.', 'fr', 'es', 'intermediate', 22, 14, 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg', true);

-- Portugués para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
(gen_random_uuid(), 'Português Básico para Hispanohablantes', 'Aprende portugués de forma rápida aprovechando las similitudes con el español.', 'pt', 'es', 'beginner', 16, 9, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', false),
(gen_random_uuid(), 'Português Intermedio para Hispanohablantes', 'Domina las diferencias sutiles entre español y portugués.', 'pt', 'es', 'intermediate', 20, 12, 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg', true);

-- Italiano para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
(gen_random_uuid(), 'Italiano Básico para Hispanohablantes', 'Descubre la belleza del italiano usando tu base de español.', 'it', 'es', 'beginner', 17, 9, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg', false),
(gen_random_uuid(), 'Italiano Intermedio para Hispanohablantes', 'Perfecciona tu italiano con expresiones auténticas y cultura italiana.', 'it', 'es', 'intermediate', 21, 13, 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg', true);

-- Inglés para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
(gen_random_uuid(), 'English Basics for Spanish Speakers', 'Learn English efficiently using your Spanish knowledge as a foundation.', 'en', 'es', 'beginner', 20, 12, 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg', false);

-------------------------------------------------------------
-- 2. Crear estructura para el primer curso               ---
-------------------------------------------------------------

-- Obtener el ID del primer curso (Español Básico para Francófonos)
WITH course_data AS (
  SELECT id as course_id FROM courses WHERE title = 'Español Básico para Francófonos' LIMIT 1
),

-- Crear Parts
parts_data AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT course_id, title, part_order, synopsis FROM course_data,
  LATERAL (VALUES
    ('Parte 1: Primeros Pasos', 1, 'Saludos, presentaciones y expresiones básicas de cortesía.'),
    ('Parte 2: Vida Cotidiana', 2, 'Vocabulario y situaciones del día a día: familia, trabajo, tiempo libre.'),
    ('Parte 3: En la Ciudad', 3, 'Orientación, transporte, compras y servicios urbanos.')
  ) AS v(title, part_order, synopsis)
  RETURNING id, part_order
),

-- Crear Phases para cada Part
phases_data AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT id, kind, phase_order FROM parts_data,
  LATERAL (VALUES
    ('preparation', 1),
    ('conversation', 2)
  ) AS v(kind, phase_order)
  RETURNING id, part_id, kind
),

-- Crear Units para Parte 1 - Preparation
prep_units_p1 AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT pd.id, 'exercise', title, unit_order 
  FROM phases_data pd
  JOIN parts_data pt ON pt.id = pd.part_id
  CROSS JOIN LATERAL (VALUES
    ('Saludos y Despedidas', 1),
    ('Presentaciones Personales', 2),
    ('Números y Fechas', 3),
    ('Expresiones de Cortesía', 4),
    ('Países y Nacionalidades', 5)
  ) AS v(title, unit_order)
  WHERE pd.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
),

-- Crear Units para Parte 1 - Conversation  
conv_units_p1 AS (
  INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
  SELECT pd.id, 'situation', title, unit_order, agent_name, agent_prompt
  FROM phases_data pd
  JOIN parts_data pt ON pt.id = pd.part_id
  CROSS JOIN LATERAL (VALUES
    ('Encuentro Casual', 1, 'María', 'Eres María, una española amigable que conoce a alguien por primera vez en un café. Ayuda al estudiante a practicar saludos y presentaciones de forma natural.'),
    ('En la Recepción', 2, 'Carlos', 'Eres Carlos, recepcionista de un hotel en Madrid. Ayuda al estudiante a practicar el registro y preguntas básicas de cortesía.')
  ) AS v(title, unit_order, agent_name, agent_prompt)
  WHERE pd.kind = 'conversation' AND pt.part_order = 1
  RETURNING id, title
)

-- Crear ejercicios para la primera unidad de preparación
INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT pu.id, title, instructions, exercise_type, content::jsonb, points, exercise_order
FROM prep_units_p1 pu
CROSS JOIN LATERAL (VALUES
  ('¿Cómo saludar?', 'Selecciona el saludo más apropiado para cada momento del día.', 'multiple_choice', 
   '{"question":"¿Cómo saludas por la mañana en español?","options":["Buenas noches","Buenos días","Buenas tardes","Hasta luego"],"correct_answer":"Buenos días","explanation":"Buenos días se usa desde la mañana hasta el mediodía."}', 
   10, 1),
  ('Completa el saludo', 'Escribe la palabra que falta en cada saludo.', 'fill_blank',
   '{"question":"Completa: ¡____ tardes! ¿Cómo está usted?","correct_answer":"Buenas","explanation":"Buenas tardes es el saludo apropiado desde el mediodía hasta la noche."}',
   15, 2),
  ('Traduce el saludo', 'Traduce esta expresión del francés al español.', 'translation',
   '{"question":"Bonsoir, comment allez-vous?","correct_answer":"Buenas noches, ¿cómo está usted?","explanation":"Traducción formal de un saludo nocturno."}',
   20, 3)
) AS v(title, instructions, exercise_type, content, points, exercise_order)
WHERE pu.title = 'Saludos y Despedidas';

-- Ejercicios para Presentaciones Personales
INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT pu.id, title, instructions, exercise_type, content::jsonb, points, exercise_order
FROM prep_units_p1 pu
CROSS JOIN LATERAL (VALUES
  ('Me llamo...', 'Elige la forma correcta de presentarse.', 'multiple_choice',
   '{"question":"¿Cuál es la forma más común de decir tu nombre?","options":["Yo soy llamado Juan","Me llamo Juan","Mi nombre es siendo Juan","Soy de nombre Juan"],"correct_answer":"Me llamo Juan","explanation":"Me llamo es la forma más natural y común de presentarse."}',
   10, 1),
  ('¿De dónde eres?', 'Completa la pregunta sobre origen.', 'fill_blank',
   '{"question":"¿De ____ eres? - Soy de Francia.","correct_answer":"dónde","explanation":"¿De dónde eres? es la pregunta estándar para preguntar el origen."}',
   15, 2),
  ('Presentación completa', 'Traduce esta presentación completa.', 'translation',
   '{"question":"Je m''appelle Pierre, j''ai 25 ans et je suis de Lyon.","correct_answer":"Me llamo Pierre, tengo 25 años y soy de Lyon.","explanation":"Presentación completa con nombre, edad y origen."}',
   20, 3)
) AS v(title, instructions, exercise_type, content, points, exercise_order)
WHERE pu.title = 'Presentaciones Personales';

-------------------------------------------------------------
-- 3. Crear más contenido para otros cursos               ---
-------------------------------------------------------------

-- Estructura básica para Francés para hispanohablantes
WITH course_fr AS (
  SELECT id as course_id FROM courses WHERE title = 'Français Débutant pour Hispanophones' LIMIT 1
),
parts_fr AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT course_id, title, part_order, synopsis FROM course_fr,
  LATERAL (VALUES
    ('Partie 1: Premiers Pas', 1, 'Salutations, présentations et expressions de politesse.'),
    ('Partie 2: Vie Quotidienne', 2, 'Vocabulaire et situations du quotidien: famille, travail, loisirs.')
  ) AS v(title, part_order, synopsis)
  RETURNING id, part_order
),
phases_fr AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT id, kind, phase_order FROM parts_fr,
  LATERAL (VALUES ('preparation', 1), ('conversation', 2)) AS v(kind, phase_order)
  RETURNING id, part_id, kind
),
units_fr AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT pd.id, 'exercise', title, unit_order 
  FROM phases_fr pd
  JOIN parts_fr pt ON pt.id = pd.part_id
  CROSS JOIN LATERAL (VALUES
    ('Salutations et Politesse', 1),
    ('Se Présenter', 2),
    ('Les Nombres', 3)
  ) AS v(title, unit_order)
  WHERE pd.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
)
INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT uf.id, title, instructions, exercise_type, content::jsonb, points, exercise_order
FROM units_fr uf
CROSS JOIN LATERAL (VALUES
  ('Comment saluer?', 'Choisissez la salutation appropriée.', 'multiple_choice',
   '{"question":"Comment dit-on Hola en français?","options":["Au revoir","Bonjour","Bonsoir","Salut"],"correct_answer":"Bonjour","explanation":"Bonjour est la salutation standard en français."}',
   10, 1),
  ('Je m''appelle...', 'Complétez la présentation.', 'fill_blank',
   '{"question":"Je _______ Marie et je suis espagnole.","correct_answer":"m''appelle","explanation":"Je m''appelle est la façon de dire son nom en français."}',
   15, 2)
) AS v(title, instructions, exercise_type, content, points, exercise_order)
WHERE uf.title = 'Salutations et Politesse';

COMMIT;