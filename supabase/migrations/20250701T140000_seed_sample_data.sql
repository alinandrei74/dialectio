-- Seed de ejemplo para dialectio.xyz
-- Genera un curso de muestra y rellena todas las tablas clave
-- ⇢ courses, parts, phases, units, exercises
-- Ejecutar tras la migración de reestructuración (y antes del seed_storyline si quieres usarlo).

BEGIN;

-------------------------------------------------------------
-- 1. Curso de ejemplo                                     ---
-------------------------------------------------------------
WITH new_course AS (
    INSERT INTO courses (
        id, title, description, target_language, source_language,
        level, total_lessons, estimated_hours, image_url, is_premium
    ) VALUES (
        gen_random_uuid(),
        'Español Básico para Francófonos',
        'Un curso introductorio para francófonos que aprenden español desde cero.',
        'es', 'fr',
        'beginner', 42, 12,
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        false
    )
    ON CONFLICT (title) DO NOTHING
    RETURNING id
),
-------------------------------------------------------------
-- 2. Parte & fases para el curso ejemplo                  ---
-------------------------------------------------------------
part_introduccion AS (
    INSERT INTO parts (course_id, title, part_order, synopsis)
    SELECT id, 'Parte 1: Introducción', 1, 'Saludos, presentaciones y frases esenciales.'
    FROM new_course
    ON CONFLICT DO NOTHING
    RETURNING id
),
phases_intro AS (
    INSERT INTO phases (part_id, kind, phase_order)
    SELECT p.id, k.kind, k.phase_order
    FROM part_introduccion p
    CROSS JOIN (VALUES ('preparation',1), ('conversation',2)) AS k(kind, phase_order)
    ON CONFLICT DO NOTHING
    RETURNING id, kind, phase_order, part_id
),
-------------------------------------------------------------
-- 3. Unidades                                             ---
-------------------------------------------------------------
units_preparation AS (
    INSERT INTO units (phase_id, kind, title, unit_order)
    SELECT ph.id, 'exercise', 'Preparación', 1
    FROM phases_intro ph WHERE ph.kind='preparation'
    ON CONFLICT DO NOTHING
    RETURNING id
),
units_conversation AS (
    INSERT INTO units (phase_id, kind, title, unit_order, agent_name, agent_prompt)
    SELECT ph.id, 'situation', t.title, t.unit_order, t.agent_name, t.agent_prompt
    FROM phases_intro ph
    CROSS JOIN (
        VALUES 
          ('Situación A',1,'Agente 1','Eres un tutor paciente que guía al alumno a presentarse.'),
          ('Situación B',2,'Agente 2','Eres un camarero simpático que conversa sobre saludos.')
    ) AS t(title,unit_order,agent_name,agent_prompt)
    WHERE ph.kind='conversation'
    ON CONFLICT DO NOTHING
    RETURNING id
),
-------------------------------------------------------------
-- 4. Ejercicios de ejemplo                                ---
-------------------------------------------------------------
insert_exercises AS (
    INSERT INTO exercises (
        lesson_id, title, instructions, exercise_type, content, points, exercise_order
    )
    SELECT u.id,
           'Saludo correcto',
           'Selecciona la opción correcta para "Good morning".',
           'multiple_choice',
           '{"question":"¿Cómo se dice Good morning en español?","options":["Buenas noches","Buenos días","Buenas tardes","Hola"],"correct_answer":"Buenos días","explanation":"Buenos días se usa por la mañana"}'::jsonb,
           10,
           1
    FROM units_preparation u
    UNION ALL
    SELECT u.id,
           'Completa la frase',
           'Escribe la palabra que falta: ____ días.',
           'fill_blank',
           '{"question":"Completa la frase: ____ días.","correct_answer":"Buenos","explanation":"La respuesta es Buenos"}'::jsonb,
           15,
           2
    UNION ALL
    SELECT u.id,
           'Traduce al español',
           'Traduce "Hello, how are you?" al español.',
           'translation',
           '{"question":"Hello, how are you?","correct_answer":"Hola, ¿cómo estás?","explanation":"Traducción estándar"}'::jsonb,
           20,
           3
);

COMMIT;
