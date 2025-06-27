/*
  # Insert Sample Learning Data

  This migration adds sample courses, lessons, and exercises for testing the learning platform.
*/

-- Insert sample courses
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, is_premium) VALUES
  (
    'course-spanish-basics',
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
    'course-french-basics',
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
    'course-portuguese-intermediate',
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
    'course-italian-conversation',
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
    'lesson-spanish-1',
    'course-spanish-basics',
    'Saludos y Presentaciones',
    'Aprende a saludar y presentarte en español',
    'En esta lección aprenderás las formas básicas de saludo en español: Hola, Buenos días, Buenas tardes, Buenas noches. También veremos cómo presentarse: Me llamo..., Soy..., Mucho gusto.',
    1,
    'vocabulary',
    20
  ),
  (
    'lesson-spanish-2',
    'course-spanish-basics',
    'Los Números del 1 al 20',
    'Domina los números básicos en español',
    'Los números son fundamentales en cualquier idioma. En esta lección aprenderás los números del 1 al 20: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte.',
    2,
    'vocabulary',
    15
  ),
  (
    'lesson-spanish-3',
    'course-spanish-basics',
    'El Verbo SER',
    'Aprende uno de los verbos más importantes del español',
    'El verbo SER es esencial en español. Se usa para describir características permanentes: Yo soy, Tú eres, Él/Ella es, Nosotros somos, Vosotros sois, Ellos son.',
    3,
    'grammar',
    25
  ),
  (
    'lesson-spanish-4',
    'course-spanish-basics',
    'La Familia',
    'Vocabulario sobre los miembros de la familia',
    'Aprende a hablar sobre tu familia: padre, madre, hermano, hermana, abuelo, abuela, tío, tía, primo, prima, hijo, hija.',
    4,
    'vocabulary',
    20
  );

-- Insert sample lessons for French course
INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes) VALUES
  (
    'lesson-french-1',
    'course-french-basics',
    'Les Salutations',
    'Apprenez à saluer en français',
    'Les salutations de base en français: Bonjour, Bonsoir, Salut, Au revoir. Comment vous appelez-vous? Je m''appelle...',
    1,
    'vocabulary',
    20
  ),
  (
    'lesson-french-2',
    'course-french-basics',
    'Les Articles',
    'Maîtrisez les articles français',
    'Les articles définis: le, la, les. Les articles indéfinis: un, une, des. Exemples et usage.',
    2,
    'grammar',
    25
  );

-- Insert sample exercises for Spanish lesson 1
INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
  (
    'exercise-spanish-1-1',
    'lesson-spanish-1',
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
    'exercise-spanish-1-2',
    'lesson-spanish-1',
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
    'exercise-spanish-1-3',
    'lesson-spanish-1',
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
    'exercise-spanish-2-1',
    'lesson-spanish-2',
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
    'exercise-spanish-2-2',
    'lesson-spanish-2',
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
    'exercise-french-1-1',
    'lesson-french-1',
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

-- Update course total_lessons count
UPDATE courses SET total_lessons = (
  SELECT COUNT(*) FROM lessons WHERE lessons.course_id = courses.id
);