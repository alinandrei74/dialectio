/*
  # Sample Learning Data Migration

  1. Sample Courses
    - Spanish for Beginners (free)
    - French for Beginners (free) 
    - Intermediate Portuguese (premium)
    - Italian Conversation (premium)

  2. Sample Lessons
    - 8 lessons for Spanish course
    - 3 lessons for French course
    - 2 lessons for Portuguese course
    - 2 lessons for Italian course

  3. Sample Exercises
    - Multiple choice, fill blank, and translation exercises
    - Distributed across different lessons

  4. Course Updates
    - Update total lesson counts automatically
*/

-- Insert sample courses
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, is_premium) VALUES
  (
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'Español para Principiantes',
    'Aprende los fundamentos del español desde cero. Perfecto para quienes nunca han estudiado español antes.',
    'es',
    'en',
    'beginner',
    8,
    12,
    false
  ),
  (
    'b2c3d4e5-f6a7-2345-bcde-f23456789012',
    'Français pour Débutants',
    'Découvrez les bases du français. Idéal pour les hispanophones qui veulent apprendre le français.',
    'fr',
    'es',
    'beginner',
    10,
    15,
    false
  ),
  (
    'c3d4e5f6-a7b8-3456-cdef-345678901234',
    'Português Intermediário',
    'Aprofunde seus conhecimentos de português. Para quem já tem uma base e quer avançar.',
    'pt',
    'es',
    'intermediate',
    12,
    18,
    true
  ),
  (
    'd4e5f6a7-b8c9-4567-def0-456789012345',
    'Conversazione Italiana',
    'Migliora la tua capacità di conversazione in italiano attraverso situazioni reali.',
    'it',
    'es',
    'advanced',
    15,
    25,
    true
  );

-- Insert sample lessons for Spanish course
INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes) VALUES
  (
    'e5f6a7b8-c9d0-5678-ef12-567890123456',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'Saludos y Presentaciones',
    'Aprende a saludar y presentarte en español',
    'En esta lección aprenderás las formas básicas de saludo en español: Hola, Buenos días, Buenas tardes, Buenas noches. También veremos cómo presentarse: Me llamo..., Soy..., Mucho gusto.',
    1,
    'vocabulary',
    20
  ),
  (
    'f6a7b8c9-d0e1-6789-f234-678901234567',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'Los Números del 1 al 20',
    'Domina los números básicos en español',
    'Los números son fundamentales en cualquier idioma. En esta lección aprenderás los números del 1 al 20: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte.',
    2,
    'vocabulary',
    15
  ),
  (
    'a7b8c9d0-e1f2-7890-a345-789012345678',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'El Verbo SER',
    'Aprende uno de los verbos más importantes del español',
    'El verbo SER es esencial en español. Se usa para describir características permanentes: Yo soy, Tú eres, Él/Ella es, Nosotros somos, Vosotros sois, Ellos son.',
    3,
    'grammar',
    25
  ),
  (
    'b8c9d0e1-f2a3-8901-b456-890123456789',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'La Familia',
    'Vocabulario sobre los miembros de la familia',
    'Aprende a hablar sobre tu familia: padre, madre, hermano, hermana, abuelo, abuela, tío, tía, primo, prima, hijo, hija.',
    4,
    'vocabulary',
    20
  ),
  (
    'c9d0e1f2-a3b4-9012-c567-901234567890',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'Los Colores',
    'Aprende los colores básicos en español',
    'Los colores son muy útiles para describir objetos: rojo, azul, verde, amarillo, negro, blanco, rosa, morado, naranja, marrón.',
    5,
    'vocabulary',
    15
  ),
  (
    'd0e1f2a3-b4c5-0123-d678-012345678901',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'El Verbo ESTAR',
    'Aprende las diferencias entre SER y ESTAR',
    'El verbo ESTAR se usa para estados temporales y ubicación: Yo estoy, Tú estás, Él/Ella está, Nosotros estamos, Vosotros estáis, Ellos están.',
    6,
    'grammar',
    30
  ),
  (
    'e1f2a3b4-c5d6-1234-e789-123456789012',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'En el Restaurante',
    'Vocabulario y frases para comer fuera',
    'Aprende a desenvolverte en un restaurante: la carta, pedir comida, la cuenta. Frases útiles: ¿Qué me recomienda? La cuenta, por favor.',
    7,
    'conversation',
    25
  ),
  (
    'f2a3b4c5-d6e7-2345-f890-234567890123',
    'a1b2c3d4-e5f6-1234-abcd-ef1234567890',
    'Cultura Hispana',
    'Introducción a la cultura de los países hispanohablantes',
    'Descubre aspectos culturales importantes: tradiciones, festividades, comida típica, música y costumbres de España y Latinoamérica.',
    8,
    'culture',
    20
  );

-- Insert sample lessons for French course
INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes) VALUES
  (
    'a3b4c5d6-e7f8-3456-a901-345678901234',
    'b2c3d4e5-f6a7-2345-bcde-f23456789012',
    'Les Salutations',
    'Apprenez à saluer en français',
    'Les salutations de base en français: Bonjour, Bonsoir, Salut, Au revoir. Comment vous appelez-vous? Je m''appelle...',
    1,
    'vocabulary',
    20
  ),
  (
    'b4c5d6e7-f8a9-4567-b012-456789012345',
    'b2c3d4e5-f6a7-2345-bcde-f23456789012',
    'Les Articles',
    'Maîtrisez les articles français',
    'Les articles définis: le, la, les. Les articles indéfinis: un, une, des. Exemples et usage.',
    2,
    'grammar',
    25
  ),
  (
    'c5d6e7f8-a9b0-5678-c123-567890123456',
    'b2c3d4e5-f6a7-2345-bcde-f23456789012',
    'Les Nombres',
    'Apprenez les nombres en français',
    'Les nombres de 1 à 20: un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix, onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt.',
    3,
    'vocabulary',
    18
  );

-- Insert sample lessons for Portuguese course
INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes) VALUES
  (
    'd6e7f8a9-b0c1-6789-d234-678901234567',
    'c3d4e5f6-a7b8-3456-cdef-345678901234',
    'Pronúncia Portuguesa',
    'Domine a pronúncia do português',
    'Diferenças na pronúncia entre português brasileiro e europeu. Sons únicos do português: nh, lh, ão, ões.',
    1,
    'vocabulary',
    25
  ),
  (
    'e7f8a9b0-c1d2-7890-e345-789012345678',
    'c3d4e5f6-a7b8-3456-cdef-345678901234',
    'Verbos Irregulares',
    'Aprenda os verbos irregulares mais comuns',
    'Verbos irregulares importantes: ser, estar, ter, fazer, ir, vir, dar, ver, poder, querer.',
    2,
    'grammar',
    30
  );

-- Insert sample lessons for Italian course
INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes) VALUES
  (
    'f8a9b0c1-d2e3-8901-f456-890123456789',
    'd4e5f6a7-b8c9-4567-def0-456789012345',
    'Conversazione al Bar',
    'Impara a ordinare al bar come un italiano',
    'Frasi essenziali per il bar: Un caffè, per favore. Quanto costa? Il conto, grazie. Differenze culturali nel bere il caffè.',
    1,
    'conversation',
    20
  ),
  (
    'a9b0c1d2-e3f4-9012-a567-901234567890',
    'd4e5f6a7-b8c9-4567-def0-456789012345',
    'Gestualità Italiana',
    'Comprendi i gesti italiani',
    'I gesti più comuni nella comunicazione italiana: cosa significano e quando usarli. La comunicazione non verbale in Italia.',
    2,
    'culture',
    25
  );

-- Insert sample exercises for Spanish lesson 1
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
  (
    'b0c1d2e3-f4a5-0123-b678-012345678901',
    'e5f6a7b8-c9d0-5678-ef12-567890123456',
    'Elige el saludo correcto',
    'Selecciona el saludo apropiado para cada momento del día',
    'multiple_choice',
    '{
      "question": "¿Qué saludo usarías a las 10:00 AM?",
      "options": ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"],
      "correct_answer": 1,
      "explanation": "Buenos días se usa desde la mañana hasta aproximadamente las 12:00 PM"
    }',
    10,
    1
  ),
  (
    'c1d2e3f4-a5b6-1234-c789-123456789012',
    'e5f6a7b8-c9d0-5678-ef12-567890123456',
    'Completa la presentación',
    'Completa la frase de presentación',
    'fill_blank',
    '{
      "question": "Hola, _____ llamo María.",
      "correct_answer": "me",
      "explanation": "La forma correcta es ''me llamo'' para presentarse"
    }',
    10,
    2
  ),
  (
    'd2e3f4a5-b6c7-2345-d890-234567890123',
    'e5f6a7b8-c9d0-5678-ef12-567890123456',
    'Traduce al español',
    'Traduce la siguiente frase al español',
    'translation',
    '{
      "question": "Nice to meet you",
      "correct_answer": "Mucho gusto",
      "explanation": "''Mucho gusto'' es la traducción más común de ''Nice to meet you''"
    }',
    15,
    3
  );

-- Insert sample exercises for Spanish lesson 2
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
  (
    'e3f4a5b6-c7d8-3456-e901-345678901234',
    'f6a7b8c9-d0e1-6789-f234-678901234567',
    'Cuenta del 1 al 10',
    'Selecciona el número correcto',
    'multiple_choice',
    '{
      "question": "¿Cómo se dice ''7'' en español?",
      "options": ["seis", "siete", "ocho", "nueve"],
      "correct_answer": 1,
      "explanation": "Siete es el número 7 en español"
    }',
    10,
    1
  ),
  (
    'f4a5b6c7-d8e9-4567-f012-456789012345',
    'f6a7b8c9-d0e1-6789-f234-678901234567',
    'Escribe el número',
    'Escribe el número en palabras',
    'fill_blank',
    '{
      "question": "15 = _____",
      "correct_answer": "quince",
      "explanation": "Quince es el número 15 en español"
    }',
    10,
    2
  );

-- Insert sample exercises for French lesson 1
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
  (
    'a5b6c7d8-e9f0-5678-a123-567890123456',
    'a3b4c5d6-e7f8-3456-a901-345678901234',
    'Choisissez la bonne salutation',
    'Sélectionnez la salutation appropriée',
    'multiple_choice',
    '{
      "question": "Comment dit-on ''Good morning'' en français?",
      "options": ["Bonsoir", "Bonjour", "Salut", "Au revoir"],
      "correct_answer": 1,
      "explanation": "Bonjour signifie ''Good morning'' en français"
    }',
    10,
    1
  );

-- Insert more exercises for variety
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
  (
    'b6c7d8e9-f0a1-6789-b234-678901234567',
    'a7b8c9d0-e1f2-7890-a345-789012345678',
    'Conjuga el verbo SER',
    'Completa con la forma correcta del verbo SER',
    'fill_blank',
    '{
      "question": "Yo _____ estudiante.",
      "correct_answer": "soy",
      "explanation": "La primera persona singular del verbo SER es ''soy''"
    }',
    10,
    1
  ),
  (
    'c7d8e9f0-a1b2-7890-c345-789012345678',
    'b8c9d0e1-f2a3-8901-b456-890123456789',
    'Miembros de la familia',
    'Selecciona la palabra correcta',
    'multiple_choice',
    '{
      "question": "¿Cómo se dice ''grandmother'' en español?",
      "options": ["tía", "madre", "abuela", "hermana"],
      "correct_answer": 2,
      "explanation": "Abuela es la traducción de ''grandmother''"
    }',
    10,
    1
  );

-- Update course total_lessons count
UPDATE courses SET total_lessons = (
  SELECT COUNT(*) FROM lessons WHERE lessons.course_id = courses.id
);