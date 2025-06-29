/*
  # Datos de muestra para el nuevo esquema

  1. Crear cursos de ejemplo
  2. Crear estructura completa de parts/phases/units/exercises
  3. Poblar catálogo de errores básico
*/

-- Insertar cursos de muestra
INSERT INTO courses (
  id,
  title,
  description,
  target_language,
  source_language,
  level,
  total_lessons,
  estimated_hours,
  image_url,
  is_premium
) VALUES 
(
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'Español Básico para Francófonos',
  'Un curso introductorio para aprender español aprovechando tu conocimiento del francés.',
  'es',
  'fr',
  'beginner',
  4,
  3,
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
),
(
  'b2c3d4e5-f6a7-8901-2345-67890abcdef0',
  'Français pour Hispanophones',
  'Apprends le français en tirant parti de tes connaissances en espagnol.',
  'fr',
  'es',
  'beginner',
  4,
  3,
  'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
),
(
  'c3d4e5f6-a7b8-9012-3456-7890abcdef01',
  'Português para Hispanohablantes',
  'Aprende portugués aprovechando las similitudes con el español.',
  'pt',
  'es',
  'beginner',
  4,
  3,
  'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
);

-- Crear estructura para el curso de Español para Francófonos
DO $$
DECLARE
  course_id uuid := 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  part1_id uuid;
  part2_id uuid;
  prep1_id uuid;
  conv1_id uuid;
  prep2_id uuid;
  conv2_id uuid;
  unit_id uuid;
BEGIN
  -- Parte 1: Fundamentos
  INSERT INTO parts (id, course_id, title, part_order, synopsis)
  VALUES (
    gen_random_uuid(),
    course_id,
    'Parte 1: Fundamentos del Español',
    1,
    'Aprende los conceptos básicos del español: saludos, presentaciones y vocabulario esencial.'
  )
  RETURNING id INTO part1_id;
  
  -- Fases de la Parte 1
  INSERT INTO phases (id, part_id, kind, phase_order)
  VALUES (gen_random_uuid(), part1_id, 'preparation', 1)
  RETURNING id INTO prep1_id;
  
  INSERT INTO phases (id, part_id, kind, phase_order)
  VALUES (gen_random_uuid(), part1_id, 'conversation', 2)
  RETURNING id INTO conv1_id;
  
  -- Units de preparación - Parte 1
  INSERT INTO units (id, phase_id, kind, title, unit_order)
  VALUES (gen_random_uuid(), prep1_id, 'exercise', 'Saludos y Despedidas', 1)
  RETURNING id INTO unit_id;
  
  -- Ejercicios para Saludos y Despedidas
  INSERT INTO exercises (unit_id, title, instructions, exercise_type, content, points, exercise_order)
  VALUES 
  (
    unit_id,
    'Selecciona el saludo correcto',
    'Elige la traducción correcta de "Bonjour" en español.',
    'multiple_choice',
    '{
      "question": "¿Cómo se dice \"Bonjour\" en español?",
      "options": ["Buenas noches", "Buenos días", "Buenas tardes", "Adiós"],
      "correct_answer": "Buenos días",
      "explanation": "\"Bonjour\" se traduce como \"Buenos días\" en español."
    }',
    10,
    1
  ),
  (
    unit_id,
    'Completa el saludo',
    'Completa la frase de saludo en español.',
    'fill_blank',
    '{
      "question": "Completa: \"_____ días\"",
      "correct_answer": "Buenos",
      "explanation": "La frase completa es \"Buenos días\"."
    }',
    15,
    2
  );
  
  -- Segunda unidad de preparación
  INSERT INTO units (id, phase_id, kind, title, unit_order)
  VALUES (gen_random_uuid(), prep1_id, 'exercise', 'Presentaciones Personales', 2)
  RETURNING id INTO unit_id;
  
  INSERT INTO exercises (unit_id, title, instructions, exercise_type, content, points, exercise_order)
  VALUES 
  (
    unit_id,
    'Traduce la presentación',
    'Traduce esta presentación del francés al español.',
    'translation',
    '{
      "question": "Traduce: \"Je m''appelle Marie et je suis française\"",
      "correct_answer": "Me llamo María y soy francesa",
      "explanation": "Esta es la traducción correcta de la presentación."
    }',
    20,
    1
  );
  
  -- Unit de conversación - Parte 1
  INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt)
  VALUES (
    gen_random_uuid(),
    conv1_id,
    'situation',
    'Conversación: Primer Encuentro',
    1,
    'Carlos',
    'Eres Carlos, un español amigable que conoce a alguien por primera vez. Mantén la conversación simple, enfócate en saludos y presentaciones básicas. Corrige gentilmente los errores y sugiere mejores formas de expresarse.'
  );
  
  -- Parte 2: Vida Cotidiana
  INSERT INTO parts (id, course_id, title, part_order, synopsis)
  VALUES (
    gen_random_uuid(),
    course_id,
    'Parte 2: Vida Cotidiana',
    2,
    'Vocabulario y expresiones para situaciones del día a día: familia, trabajo, tiempo libre.'
  )
  RETURNING id INTO part2_id;
  
  -- Fases de la Parte 2
  INSERT INTO phases (id, part_id, kind, phase_order)
  VALUES (gen_random_uuid(), part2_id, 'preparation', 1)
  RETURNING id INTO prep2_id;
  
  INSERT INTO phases (id, part_id, kind, phase_order)
  VALUES (gen_random_uuid(), part2_id, 'conversation', 2)
  RETURNING id INTO conv2_id;
  
  -- Units de preparación - Parte 2
  INSERT INTO units (id, phase_id, kind, title, unit_order)
  VALUES (gen_random_uuid(), prep2_id, 'exercise', 'La Familia', 1)
  RETURNING id INTO unit_id;
  
  INSERT INTO exercises (unit_id, title, instructions, exercise_type, content, points, exercise_order)
  VALUES 
  (
    unit_id,
    'Vocabulario familiar',
    'Selecciona la traducción correcta.',
    'multiple_choice',
    '{
      "question": "¿Cómo se dice \"frère\" en español?",
      "options": ["hermana", "hermano", "primo", "padre"],
      "correct_answer": "hermano",
      "explanation": "\"Frère\" significa \"hermano\" en español."
    }',
    10,
    1
  );
  
  -- Unit de conversación - Parte 2
  INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt)
  VALUES (
    gen_random_uuid(),
    conv2_id,
    'situation',
    'Conversación: Hablando de la Familia',
    1,
    'Ana',
    'Eres Ana, una española que le gusta hablar de su familia. Haz preguntas sobre la familia del estudiante y comparte información sobre la tuya. Usa vocabulario familiar y corrige errores de manera natural.'
  );
  
END $$;

-- Poblar catálogo de errores básico
INSERT INTO error_catalog (label, description) VALUES
('gender_agreement', 'Error de concordancia de género entre sustantivo y adjetivo'),
('number_agreement', 'Error de concordancia de número (singular/plural)'),
('verb_conjugation', 'Error en la conjugación verbal'),
('article_usage', 'Uso incorrecto de artículos (el, la, los, las)'),
('preposition_usage', 'Uso incorrecto de preposiciones'),
('word_order', 'Orden incorrecto de palabras en la oración'),
('false_friend', 'Uso de falso cognado'),
('accent_missing', 'Falta de acento ortográfico'),
('spelling_error', 'Error ortográfico general');

-- Reglas de sugerencias básicas
INSERT INTO suggestion_rules (error_id, template, weight) VALUES
(1, 'Recuerda que en español los adjetivos deben concordar en género con el sustantivo. Ejemplo: "la casa blanca" (femenino), "el coche blanco" (masculino).', 1.0),
(2, 'Los adjetivos y artículos deben concordar en número con el sustantivo. Ejemplo: "los libros rojos" (plural), "el libro rojo" (singular).', 1.0),
(3, 'Revisa la conjugación del verbo. Cada persona tiene su forma específica. Ejemplo: "yo hablo", "tú hablas", "él habla".', 1.0),
(4, 'Verifica el artículo. En español: "el" (masculino singular), "la" (femenino singular), "los" (masculino plural), "las" (femenino plural).', 1.0),
(5, 'Las preposiciones en español pueden ser diferentes al francés. Ejemplo: "pienso en ti" (no "pienso de ti").', 1.0);