/*
  # Insert Sample Learning Data

  1. Sample Data
    - Insert sample courses for Spanish, French, Portuguese, and Italian
    - Insert sample lessons for each course
    - Insert sample exercises for lessons
    - Update course lesson counts

  2. Data Structure
    - Courses with different levels and languages
    - Lessons with various types (vocabulary, grammar, conversation, etc.)
    - Exercises with multiple choice, fill blank, and translation types
*/

-- Insert sample courses
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, is_premium) VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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
    'b2c3d4e5-f6g7-8901-bcde-f23456789012',
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
    'c3d4e5f6-g7h8-9012-cdef-345678901234',
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
    'd4e5f6g7-h8i9-0123-def0-456789012345',
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
    'e5f6g7h8-i9j0-1234-efg1-567890123456',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Saludos y Presentaciones',
    'Aprende a saludar y presentarte en español',
    'En esta lección aprenderás las formas básicas de saludo en español: Hola, Buenos días, Buenas tardes, Buenas noches. También veremos cómo presentarse: Me llamo..., Soy..., Mucho gusto.',
    1,
    'vocabulary',
    20
  ),
  (
    'f6g7h8i9-j0k1-2345-fgh2-678901234567',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Los Números del 1 al 20',
    'Domina los números básicos en español',
    'Los números son fundamentales en cualquier idioma. En esta lección aprenderás los números del 1 al 20: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte.',
    2,
    'vocabulary',
    15
  ),
  (
    'g7h8i9j0-k1l2-3456-ghi3-789012345678',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'El Verbo SER',
    'Aprende uno de los verbos más importantes del español',
    'El verbo SER es esencial en español. Se usa para describir características permanentes: Yo soy, Tú eres, Él/Ella es, Nosotros somos, Vosotros sois, Ellos son.',
    3,
    'grammar',
    25
  ),
  (
    'h8i9j0k1-l2m3-4567-hij4-890123456789',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'La Familia',
    'Vocabulario sobre los miembros de la familia',
    'Aprende a hablar sobre tu familia: padre, madre, hermano, hermana, abuelo, abuela, tío, tía, primo, prima, hijo, hija.',
    4,
    'vocabulary',
    20
  ),
  (
    'i9j0k1l2-m3n4-5678-ijk5-901234567890',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Los Colores',
    'Aprende los colores básicos en español',
    'Los colores son muy útiles para describir objetos: rojo, azul, verde, amarillo, negro, blanco, rosa, morado, naranja, marrón.',
    5,
    'vocabulary',
    15
  ),
  (
    'j0k1l2m3-n4o5-6789-jkl6-012345678901',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'El Verbo ESTAR',
    'Aprende las diferencias entre SER y ESTAR',
    'El verbo ESTAR se usa para estados temporales y ubicación: Yo estoy, Tú estás, Él/Ella está, Nosotros estamos, Vosotros estáis, Ellos están.',
    6,
    'grammar',
    30
  ),
  (
    'k1l2m3n4-o5p6-7890-klm7-123456789012',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'En el Restaurante',
    'Vocabulario y frases para comer fuera',
    'Aprende a desenvolverte en un restaurante: la carta, pedir comida, la cuenta. Frases útiles: ¿Qué me recomienda? La cuenta, por favor.',
    7,
    'conversation',
    25
  ),
  (
    'l2m3n4o5-p6q7-8901-lmn8-234567890123',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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
    'm3n4o5p6-q7r8-9012-mno9-345678901234',
    'b2c3d4e5-f6g7-8901-bcde-f23456789012',
    'Les Salutations',
    'Apprenez à saluer en français',
    'Les salutations de base en français: Bonjour, Bonsoir, Salut, Au revoir. Comment vous appelez-vous? Je m''appelle...',
    1,
    'vocabulary',
    20
  ),
  (
    'n4o5p6q7-r8s9-0123-nop0-456789012345',
    'b2c3d4e5-f6g7-8901-bcde-f23456789012',
    'Les Articles',
    'Maîtrisez les articles français',
    'Les articles définis: le, la, les. Les articles indéfinis: un, une, des. Exemples et usage.',
    2,
    'grammar',
    25
  ),
  (
    'o5p6q7r8-s9t0-1234-opq1-567890123456',
    'b2c3d4e5-f6g7-8901-bcde-f23456789012',
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
    'p6q7r8s9-t0u1-2345-pqr2-678901234567',
    'c3d4e5f6-g7h8-9012-cdef-345678901234',
    'Pronúncia Portuguesa',
    'Domine a pronúncia do português',
    'Diferenças na pronúncia entre português brasileiro e europeu. Sons únicos do português: nh, lh, ão, ões.',
    1,
    'vocabulary',
    25
  ),
  (
    'q7r8s9t0-u1v2-3456-qrs3-789012345678',
    'c3d4e5f6-g7h8-9012-cdef-345678901234',
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
    'r8s9t0u1-v2w3-4567-rst4-890123456789',
    'd4e5f6g7-h8i9-0123-def0-456789012345',
    'Conversazione al Bar',
    'Impara a ordinare al bar come un italiano',
    'Frasi essenziali per il bar: Un caffè, per favore. Quanto costa? Il conto, grazie. Differenze culturali nel bere il caffè.',
    1,
    'conversation',
    20
  ),
  (
    's9t0u1v2-w3x4-5678-stu5-901234567890',
    'd4e5f6g7-h8i9-0123-def0-456789012345',
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
    't0u1v2w3-x4y5-6789-tuv6-012345678901',
    'e5f6g7h8-i9j0-1234-efg1-567890123456',
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
    'u1v2w3x4-y5z6-7890-uvw7-123456789012',
    'e5f6g7h8-i9j0-1234-efg1-567890123456',
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
    'v2w3x4y5-z6a7-8901-vwx8-234567890123',
    'e5f6g7h8-i9j0-1234-efg1-567890123456',
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
    'w3x4y5z6-a7b8-9012-wxy9-345678901234',
    'f6g7h8i9-j0k1-2345-fgh2-678901234567',
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
    'x4y5z6a7-b8c9-0123-xyz0-456789012345',
    'f6g7h8i9-j0k1-2345-fgh2-678901234567',
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
    'y5z6a7b8-c9d0-1234-yza1-567890123456',
    'm3n4o5p6-q7r8-9012-mno9-345678901234',
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
    'z6a7b8c9-d0e1-2345-zab2-678901234567',
    'g7h8i9j0-k1l2-3456-ghi3-789012345678',
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
    'a7b8c9d0-e1f2-3456-abc3-789012345678',
    'h8i9j0k1-l2m3-4567-hij4-890123456789',
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