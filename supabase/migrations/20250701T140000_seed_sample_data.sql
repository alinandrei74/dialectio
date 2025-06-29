-- Seed de ejemplo para dialectio.xyz
-- Genera un curso, Parte de introducción, sus fases, unidades y tres ejercicios
-- Ejecutar tras la migración de reestructuración.

BEGIN;

-------------------------------------------------------------
-- 1. Curso de muestra                                     ---
-------------------------------------------------------------
WITH new_course AS (
  INSERT INTO courses (
      id, title, description, target_language, source_language,
      level, total_lessons, estimated_hours, image_url, is_premium
  ) VALUES (
      gen_random_uuid(),
      'Español Básico para Francófonos',
      'Curso introductorio que enseña español a hablantes de francés.',
      'es', 'fr',
      'beginner', 42, 12,
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      FALSE
  )
  ON CONFLICT (title) DO UPDATE SET description = EXCLUDED.description
  RETURNING id
),
-------------------------------------------------------------
-- 2. Parte y fases de Introducción                        ---
-------------------------------------------------------------
intro_part AS (
  INSERT INTO parts (course_id, title, part_order, synopsis)
  SELECT id, 'Parte 1: Introducción', 1,
         'Saludos, presentaciones y frases esenciales.'
  FROM new_course
  ON CONFLICT DO NOTHING
  RETURNING id
),
intro_phases AS (
  INSERT INTO phases (part_id, kind, phase_order)
  SELECT ip.id, kind, phase_order
  FROM intro_part ip,
       LATERAL (VALUES ('preparation',1), ('conversation',2)) AS t(kind, phase_order)
  ON CONFLICT DO NOTHING
  RETURNING id, kind
),
-------------------------------------------------------------
-- 3. Unidad de preparación                               ---
-------------------------------------------------------------
prep_unit AS (
  INSERT INTO units (phase_id, kind, title, unit_order)
  SELECT id, 'exercise', 'Preparación', 1
  FROM intro_phases WHERE kind = 'preparation'
  ON CONFLICT DO NOTHING
  RETURNING id
),
-------------------------------------------------------------
-- 4. Dos situaciones de conversación                      ---
-------------------------------------------------------------
conv_units AS (
  INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
  SELECT ph.id, 'situation', title, unit_order, agent_name, agent_prompt
  FROM intro_phases ph,
       LATERAL (VALUES
         ('Situación A',1,'Agente 1','Eres un tutor paciente que guía al alumno a presentarse.'),
         ('Situación B',2,'Agente 2','Eres un camarero simpático que practica saludos.')
       ) AS v(title, unit_order, agent_name, agent_prompt)
  WHERE ph.kind = 'conversation'
  ON CONFLICT DO NOTHING
),
-------------------------------------------------------------
-- 5. Tres ejercicios de ejemplo                           ---
-------------------------------------------------------------
insert_exercises AS (
  INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
  SELECT pu.id,
         'Saludo correcto',
         'Selecciona la opción correcta para "Good morning".',
         'multiple_choice',
         '{"question":"¿Cómo se dice Good morning en español?","options":["Buenas noches","Buenos días","Buenas tardes","Hola"],"correct_answer":"Buenos días","explanation":"Se usa por la mañana"}'::jsonb,
         10,
         1
  FROM prep_unit pu
  UNION ALL
  SELECT pu.id,
         'Completa la frase',
         'Escribe la palabra que falta: ____ días.',
         'fill_blank',
         '{"question":"Completa la frase: ____ días.","correct_answer":"Buenos","explanation":"La respuesta es Buenos"}'::jsonb,
         15,
         2
  FROM prep_unit pu
  UNION ALL
  SELECT pu.id,
         'Traduce al español',
         'Traduce "Hello, how are you?" al español.',
         'translation',
         '{"question":"Hello, how are you?","correct_answer":"Hola, ¿cómo estás?","explanation":"Traducción estándar"}'::jsonb,
         20,
         3
  FROM prep_unit pu
)
SELECT 'Seed de ejemplo completado' AS mensaje;

COMMIT;