/*
  # Insertar datos de muestra

  1. Cursos de ejemplo
  2. Estructura pedagógica completa
  3. Ejercicios de muestra
  4. Catálogo de errores básico
  5. Reglas de sugerencias
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
  'Un curso introductorio para aprender español aprovechando tu conocimiento del francés. Descubre las similitudes y diferencias entre ambos idiomas.',
  'es',
  'fr',
  'beginner',
  8,
  6,
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
),
(
  'b2c3d4e5-f6a7-8901-2345-67890abcdef0',
  'Français pour Hispanophones',
  'Apprends le français en tirant parti de tes connaissances en espagnol. Un parcours optimisé pour les locuteurs natifs d''espagnol.',
  'fr',
  'es',
  'beginner',
  8,
  6,
  'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
),
(
  'c3d4e5f6-a7b8-9012-3456-7890abcdef01',
  'Português para Hispanohablantes',
  'Aprende portugués aprovechando las similitudes con el español. Enfoque en las diferencias clave y la pronunciación brasileña.',
  'pt',
  'es',
  'beginner',
  8,
  6,
  'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
),
(
  'd4e5f6a7-b8c9-0123-4567-890abcdef012',
  'Italiano per Ispanofoni',
  'Impara l''italiano sfruttando le tue conoscenze dello spagnolo. Un corso pensato per chi parla già spagnolo.',
  'it',
  'es',
  'beginner',
  8,
  6,
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
),
(
  'e5f6a7b8-c9d0-1234-5678-90abcdef0123',
  'English for Spanish Speakers',
  'Learn English leveraging your Spanish knowledge. Focus on the key differences and common challenges for Spanish speakers.',
  'en',
  'es',
  'beginner',
  8,
  6,
  'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  false
);

-- Crear estructura completa para el curso de Español para Francófonos
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
    'Aprende los conceptos básicos del español: saludos, presentaciones y vocabulario esencial. Descubre las similitudes con el francés.'
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
      "explanation": "\"Bonjour\" se traduce como \"Buenos días\" en español. Ambos idiomas usan expresiones similares para saludar por la mañana."
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
      "explanation": "La frase completa es \"Buenos días\". En español, el adjetivo \"buenos\" concuerda en género y número con \"días\"."
    }',
    15,
    2
  ),
  (
    unit_id,
    'Traduce el saludo',
    'Traduce esta expresión del francés al español.',
    'translation',
    '{
      "question": "Traduce: \"Bonne nuit\"",
      "correct_answer": "Buenas noches",
      "explanation": "\"Bonne nuit\" se traduce como \"Buenas noches\". Ambas expresiones se usan para despedirse por la noche."
    }',
    20,
    3
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
      "explanation": "Esta es la traducción correcta. Nota que \"je m''appelle\" se traduce como \"me llamo\" en español."
    }',
    20,
    1
  ),
  (
    unit_id,
    'Selecciona la nacionalidad',
    'Elige la forma correcta de expresar nacionalidad.',
    'multiple_choice',
    '{
      "question": "¿Cómo se dice \"Je suis français\" en español?",
      "options": ["Soy francés", "Estoy francés", "Tengo francés", "Hago francés"],
      "correct_answer": "Soy francés",
      "explanation": "Para expresar nacionalidad en español usamos el verbo \"ser\": \"Soy francés/francesa\"."
    }',
    15,
    2
  );
  
  -- Tercera unidad de preparación
  INSERT INTO units (id, phase_id, kind, title, unit_order)
  VALUES (gen_random_uuid(), prep1_id, 'exercise', 'Números y Edad', 3)
  RETURNING id INTO unit_id;
  
  INSERT INTO exercises (unit_id, title, instructions, exercise_type, content, points, exercise_order)
  VALUES 
  (
    unit_id,
    'Números básicos',
    'Selecciona la traducción correcta del número.',
    'multiple_choice',
    '{
      "question": "¿Cómo se dice \"vingt\" en español?",
      "options": ["quince", "veinte", "veinticinco", "treinta"],
      "correct_answer": "veinte",
      "explanation": "\"Vingt\" en francés se traduce como \"veinte\" en español."
    }',
    10,
    1
  ),
  (
    unit_id,
    'Expresar la edad',
    'Completa la frase para expresar edad.',
    'fill_blank',
    '{
      "question": "Completa: \"Tengo _____ años\"",
      "correct_answer": "veinte",
      "explanation": "En español expresamos la edad con \"tener + número + años\". Ejemplo: \"Tengo veinte años\"."
    }',
    15,
    2
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
    'Eres Carlos, un español amigable que conoce a alguien por primera vez en un café de Madrid. Mantén la conversación simple, enfócate en saludos, presentaciones básicas, nacionalidad y edad. Corrige gentilmente los errores y sugiere mejores formas de expresarse. Usa un tono cálido y paciente.'
  );
  
  -- Parte 2: Vida Cotidiana
  INSERT INTO parts (id, course_id, title, part_order, synopsis)
  VALUES (
    gen_random_uuid(),
    course_id,
    'Parte 2: Vida Cotidiana',
    2,
    'Vocabulario y expresiones para situaciones del día a día: familia, trabajo, tiempo libre y actividades cotidianas.'
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
      "explanation": "\"Frère\" significa \"hermano\" en español. Nota la similitud con el francés."
    }',
    10,
    1
  ),
  (
    unit_id,
    'Miembros de la familia',
    'Completa con el término familiar correcto.',
    'fill_blank',
    '{
      "question": "Mi _____ es la hermana de mi madre",
      "correct_answer": "tía",
      "explanation": "La hermana de la madre es la \"tía\". En francés sería \"tante\"."
    }',
    15,
    2
  );
  
  -- Segunda unidad - Trabajo y Profesiones
  INSERT INTO units (id, phase_id, kind, title, unit_order)
  VALUES (gen_random_uuid(), prep2_id, 'exercise', 'Trabajo y Profesiones', 2)
  RETURNING id INTO unit_id;
  
  INSERT INTO exercises (unit_id, title, instructions, exercise_type, content, points, exercise_order)
  VALUES 
  (
    unit_id,
    'Profesiones',
    'Traduce la profesión del francés al español.',
    'translation',
    '{
      "question": "Traduce: \"Je suis médecin\"",
      "correct_answer": "Soy médico",
      "explanation": "\"Je suis médecin\" se traduce como \"Soy médico/médica\". En español, las profesiones pueden cambiar de género."
    }',
    20,
    1
  );
  
  -- Unit de conversación - Parte 2
  INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt)
  VALUES (
    gen_random_uuid(),
    conv2_id,
    'situation',
    'Conversación: Hablando de la Familia y Trabajo',
    1,
    'Ana',
    'Eres Ana, una española que trabaja como profesora y le gusta hablar de su familia. Haz preguntas sobre la familia y el trabajo del estudiante, y comparte información sobre los tuyos. Usa vocabulario familiar y profesional. Corrige errores de manera natural y sugiere expresiones más naturales.'
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
('spelling_error', 'Error ortográfico general'),
('ser_estar_confusion', 'Confusión entre los verbos ser y estar');

-- Reglas de sugerencias básicas
INSERT INTO suggestion_rules (error_id, template, weight) VALUES
(1, 'Recuerda que en español los adjetivos deben concordar en género con el sustantivo. Ejemplo: "la casa blanca" (femenino), "el coche blanco" (masculino).', 1.0),
(2, 'Los adjetivos y artículos deben concordar en número con el sustantivo. Ejemplo: "los libros rojos" (plural), "el libro rojo" (singular).', 1.0),
(3, 'Revisa la conjugación del verbo. Cada persona tiene su forma específica. Ejemplo: "yo hablo", "tú hablas", "él habla".', 1.0),
(4, 'Verifica el artículo. En español: "el" (masculino singular), "la" (femenino singular), "los" (masculino plural), "las" (femenino plural).', 1.0),
(5, 'Las preposiciones en español pueden ser diferentes al francés. Ejemplo: "pienso en ti" (no "pienso de ti").', 1.0),
(6, 'El orden de palabras en español es más flexible que en francés, pero sigue patrones específicos. El orden básico es Sujeto-Verbo-Objeto.', 1.0),
(7, 'Cuidado con los falsos amigos. Ejemplo: "éxito" en español significa "succès" en francés, no "sortie".', 1.0),
(8, 'No olvides los acentos. En español, las tildes cambian el significado: "papa" (potato) vs "papá" (dad).', 1.0),
(9, 'Revisa la ortografía. Recuerda las reglas específicas del español.', 1.0),
(10, 'En español tenemos dos verbos "ser" y "estar" para expresar diferentes tipos de estados. "Ser" para características permanentes, "estar" para estados temporales.', 1.0);