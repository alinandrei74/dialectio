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
  SELECT cd.course_id, v.part_title, v.part_order, v.synopsis 
  FROM course_data cd,
  LATERAL (VALUES
    ('Parte 1: Primeros Pasos', 1, 'Saludos, presentaciones y expresiones básicas de cortesía.'),
    ('Parte 2: Vida Cotidiana', 2, 'Vocabulario y situaciones del día a día: familia, trabajo, tiempo libre.'),
    ('Parte 3: En la Ciudad', 3, 'Orientación, transporte, compras y servicios urbanos.')
  ) AS v(part_title, part_order, synopsis)
  RETURNING id, part_order
),

-- Crear Phases para cada Part
phases_data AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT pd.id, v.phase_kind, v.phase_order 
  FROM parts_data pd,
  LATERAL (VALUES
    ('preparation', 1),
    ('conversation', 2)
  ) AS v(phase_kind, phase_order)
  RETURNING id, part_id, kind
),

-- Crear Units para Parte 1 - Preparation
prep_units_p1 AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT ph.id, 'exercise', v.unit_title, v.unit_order 
  FROM phases_data ph
  JOIN parts_data pt ON pt.id = ph.part_id
  CROSS JOIN LATERAL (VALUES
    ('Saludos y Despedidas', 1),
    ('Presentaciones Personales', 2),
    ('Números y Fechas', 3),
    ('Expresiones de Cortesía', 4),
    ('Países y Nacionalidades', 5)
  ) AS v(unit_title, unit_order)
  WHERE ph.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
),

-- Crear Units para Parte 1 - Conversation  
conv_units_p1 AS (
  INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
  SELECT ph.id, 'situation', v.unit_title, v.unit_order, v.agent_name, v.agent_prompt
  FROM phases_data ph
  JOIN parts_data pt ON pt.id = ph.part_id
  CROSS JOIN LATERAL (VALUES
    ('Encuentro Casual', 1, 'María', 'Eres María, una española amigable que conoce a alguien por primera vez en un café. Ayuda al estudiante a practicar saludos y presentaciones de forma natural.'),
    ('En la Recepción', 2, 'Carlos', 'Eres Carlos, recepcionista de un hotel en Madrid. Ayuda al estudiante a practicar el registro y preguntas básicas de cortesía.')
  ) AS v(unit_title, unit_order, agent_name, agent_prompt)
  WHERE ph.kind = 'conversation' AND pt.part_order = 1
  RETURNING id, title
),

-- Crear ejercicios para la primera unidad de preparación (Saludos y Despedidas)
exercises_saludos AS (
  INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
  SELECT gen_random_uuid(), pu.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
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
  ) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
  WHERE pu.title = 'Saludos y Despedidas'
  RETURNING id
),

-- Ejercicios para Presentaciones Personales
exercises_presentaciones AS (
  INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
  SELECT gen_random_uuid(), pu.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
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
  ) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
  WHERE pu.title = 'Presentaciones Personales'
  RETURNING id
),

-- Ejercicios para Números y Fechas
exercises_numeros AS (
  INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
  SELECT gen_random_uuid(), pu.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
  FROM prep_units_p1 pu
  CROSS JOIN LATERAL (VALUES
    ('Números básicos', 'Selecciona el número correcto.', 'multiple_choice',
     '{"question":"¿Cómo se dice 15 en español?","options":["quince","cincuenta","cinco","quinientos"],"correct_answer":"quince","explanation":"Quince es el número 15 en español."}',
     10, 1),
    ('¿Qué fecha es?', 'Completa la fecha.', 'fill_blank',
     '{"question":"Hoy es el ____ de enero.","correct_answer":"primero","explanation":"Para el día 1 se usa primero, no uno."}',
     15, 2)
  ) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
  WHERE pu.title = 'Números y Fechas'
  RETURNING id
)

SELECT 'Estructura creada para Español Básico para Francófonos' as resultado;

-------------------------------------------------------------
-- 3. Crear estructura básica para Francés                ---
-------------------------------------------------------------

WITH course_fr AS (
  SELECT id as course_id FROM courses WHERE title = 'Français Débutant pour Hispanophones' LIMIT 1
),
parts_fr AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT cf.course_id, v.part_title, v.part_order, v.synopsis 
  FROM course_fr cf,
  LATERAL (VALUES
    ('Partie 1: Premiers Pas', 1, 'Salutations, présentations et expressions de politesse.'),
    ('Partie 2: Vie Quotidienne', 2, 'Vocabulaire et situations du quotidien: famille, travail, loisirs.')
  ) AS v(part_title, part_order, synopsis)
  RETURNING id, part_order
),
phases_fr AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT pf.id, v.phase_kind, v.phase_order 
  FROM parts_fr pf,
  LATERAL (VALUES 
    ('preparation', 1), 
    ('conversation', 2)
  ) AS v(phase_kind, phase_order)
  RETURNING id, part_id, kind
),
units_fr AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT ph.id, 'exercise', v.unit_title, v.unit_order 
  FROM phases_fr ph
  JOIN parts_fr pt ON pt.id = ph.part_id
  CROSS JOIN LATERAL (VALUES
    ('Salutations et Politesse', 1),
    ('Se Présenter', 2),
    ('Les Nombres', 3)
  ) AS v(unit_title, unit_order)
  WHERE ph.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
)
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT gen_random_uuid(), uf.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
FROM units_fr uf
CROSS JOIN LATERAL (VALUES
  ('Comment saluer?', 'Choisissez la salutation appropriée.', 'multiple_choice',
   '{"question":"Comment dit-on Hola en français?","options":["Au revoir","Bonjour","Bonsoir","Salut"],"correct_answer":"Bonjour","explanation":"Bonjour est la salutation standard en français."}',
   10, 1),
  ('Je m''appelle...', 'Complétez la présentation.', 'fill_blank',
   '{"question":"Je _______ Marie et je suis espagnole.","correct_answer":"m''appelle","explanation":"Je m''appelle est la façon de dire son nom en français."}',
   15, 2)
) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
WHERE uf.title = 'Salutations et Politesse';

-------------------------------------------------------------
-- 4. Crear estructura básica para Portugués              ---
-------------------------------------------------------------

WITH course_pt AS (
  SELECT id as course_id FROM courses WHERE title = 'Português Básico para Hispanohablantes' LIMIT 1
),
parts_pt AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT cp.course_id, v.part_title, v.part_order, v.synopsis 
  FROM course_pt cp,
  LATERAL (VALUES
    ('Parte 1: Primeiros Passos', 1, 'Cumprimentos, apresentações e expressões básicas de cortesia.')
  ) AS v(part_title, part_order, synopsis)
  RETURNING id, part_order
),
phases_pt AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT pp.id, v.phase_kind, v.phase_order 
  FROM parts_pt pp,
  LATERAL (VALUES 
    ('preparation', 1), 
    ('conversation', 2)
  ) AS v(phase_kind, phase_order)
  RETURNING id, part_id, kind
),
units_pt AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT ph.id, 'exercise', v.unit_title, v.unit_order 
  FROM phases_pt ph
  JOIN parts_pt pt ON pt.id = ph.part_id
  CROSS JOIN LATERAL (VALUES
    ('Cumprimentos Básicos', 1),
    ('Apresentações', 2)
  ) AS v(unit_title, unit_order)
  WHERE ph.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
)
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT gen_random_uuid(), up.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
FROM units_pt up
CROSS JOIN LATERAL (VALUES
  ('Como cumprimentar?', 'Escolha o cumprimento apropriado.', 'multiple_choice',
   '{"question":"Como se diz Hola em português?","options":["Tchau","Olá","Boa noite","Até logo"],"correct_answer":"Olá","explanation":"Olá é o cumprimento padrão em português."}',
   10, 1),
  ('Eu me chamo...', 'Complete a apresentação.', 'fill_blank',
   '{"question":"Eu me _____ Ana e sou do Brasil.","correct_answer":"chamo","explanation":"Eu me chamo é a forma de dizer o nome em português."}',
   15, 2)
) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
WHERE up.title = 'Cumprimentos Básicos';

-------------------------------------------------------------
-- 5. Crear estructura básica para Italiano               ---
-------------------------------------------------------------

WITH course_it AS (
  SELECT id as course_id FROM courses WHERE title = 'Italiano Básico para Hispanohablantes' LIMIT 1
),
parts_it AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT ci.course_id, v.part_title, v.part_order, v.synopsis 
  FROM course_it ci,
  LATERAL (VALUES
    ('Parte 1: Primi Passi', 1, 'Saluti, presentazioni ed espressioni di cortesia.')
  ) AS v(part_title, part_order, synopsis)
  RETURNING id, part_order
),
phases_it AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT pi.id, v.phase_kind, v.phase_order 
  FROM parts_it pi,
  LATERAL (VALUES 
    ('preparation', 1), 
    ('conversation', 2)
  ) AS v(phase_kind, phase_order)
  RETURNING id, part_id, kind
),
units_it AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT ph.id, 'exercise', v.unit_title, v.unit_order 
  FROM phases_it ph
  JOIN parts_it pt ON pt.id = ph.part_id
  CROSS JOIN LATERAL (VALUES
    ('Saluti e Cortesia', 1),
    ('Presentazioni', 2)
  ) AS v(unit_title, unit_order)
  WHERE ph.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
)
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT gen_random_uuid(), ui.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
FROM units_it ui
CROSS JOIN LATERAL (VALUES
  ('Come salutare?', 'Scegli il saluto appropriato.', 'multiple_choice',
   '{"question":"Come si dice Hola in italiano?","options":["Arrivederci","Ciao","Buonasera","A presto"],"correct_answer":"Ciao","explanation":"Ciao è il saluto standard informale in italiano."}',
   10, 1),
  ('Mi chiamo...', 'Completa la presentazione.', 'fill_blank',
   '{"question":"Mi _____ Marco e sono di Roma.","correct_answer":"chiamo","explanation":"Mi chiamo è il modo di dire il proprio nome in italiano."}',
   15, 2)
) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
WHERE ui.title = 'Saluti e Cortesia';

-------------------------------------------------------------
-- 6. Crear estructura básica para Inglés                 ---
-------------------------------------------------------------

WITH course_en AS (
  SELECT id as course_id FROM courses WHERE title = 'English Basics for Spanish Speakers' LIMIT 1
),
parts_en AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT ce.course_id, v.part_title, v.part_order, v.synopsis 
  FROM course_en ce,
  LATERAL (VALUES
    ('Part 1: First Steps', 1, 'Greetings, introductions and basic courtesy expressions.')
  ) AS v(part_title, part_order, synopsis)
  RETURNING id, part_order
),
phases_en AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT pe.id, v.phase_kind, v.phase_order 
  FROM parts_en pe,
  LATERAL (VALUES 
    ('preparation', 1), 
    ('conversation', 2)
  ) AS v(phase_kind, phase_order)
  RETURNING id, part_id, kind
),
units_en AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT ph.id, 'exercise', v.unit_title, v.unit_order 
  FROM phases_en ph
  JOIN parts_en pt ON pt.id = ph.part_id
  CROSS JOIN LATERAL (VALUES
    ('Basic Greetings', 1),
    ('Introductions', 2)
  ) AS v(unit_title, unit_order)
  WHERE ph.kind = 'preparation' AND pt.part_order = 1
  RETURNING id, title
)
INSERT INTO exercises (old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order)
SELECT gen_random_uuid(), ue.id, v.ex_title, v.ex_instructions, v.ex_type, v.ex_content::jsonb, v.ex_points, v.ex_order
FROM units_en ue
CROSS JOIN LATERAL (VALUES
  ('How to greet?', 'Choose the appropriate greeting.', 'multiple_choice',
   '{"question":"How do you say Hola in English?","options":["Goodbye","Hello","Good night","See you later"],"correct_answer":"Hello","explanation":"Hello is the standard greeting in English."}',
   10, 1),
  ('My name is...', 'Complete the introduction.', 'fill_blank',
   '{"question":"My _____ is John and I am from Spain.","correct_answer":"name","explanation":"My name is the way to say your name in English."}',
   15, 2)
) AS v(ex_title, ex_instructions, ex_type, ex_content, ex_points, ex_order)
WHERE ue.title = 'Basic Greetings';

COMMIT;