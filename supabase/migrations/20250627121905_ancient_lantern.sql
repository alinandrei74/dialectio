/*
  # Insert Sample Learning Data with Valid UUIDs

  1. Sample Data
    - Insert sample courses for Spanish, French, Portuguese, and Italian
    - Insert sample lessons for each course
    - Insert sample exercises for lessons
    - Update course lesson counts

  2. UUID Generation
    - Use gen_random_uuid() to generate valid UUIDs automatically
    - Ensures all UUIDs are properly formatted and unique

  3. Data Structure
    - Courses with different levels and languages
    - Lessons with various types (vocabulary, grammar, conversation, etc.)
    - Exercises with multiple choice, fill blank, and translation types
*/

-- Use a DO block to generate UUIDs and insert data
DO $$
DECLARE
    course_spanish_id uuid := gen_random_uuid();
    course_french_id uuid := gen_random_uuid();
    course_portuguese_id uuid := gen_random_uuid();
    course_italian_id uuid := gen_random_uuid();
    
    lesson_spanish_1_id uuid := gen_random_uuid();
    lesson_spanish_2_id uuid := gen_random_uuid();
    lesson_spanish_3_id uuid := gen_random_uuid();
    lesson_spanish_4_id uuid := gen_random_uuid();
    lesson_spanish_5_id uuid := gen_random_uuid();
    lesson_spanish_6_id uuid := gen_random_uuid();
    lesson_spanish_7_id uuid := gen_random_uuid();
    lesson_spanish_8_id uuid := gen_random_uuid();
    
    lesson_french_1_id uuid := gen_random_uuid();
    lesson_french_2_id uuid := gen_random_uuid();
    lesson_french_3_id uuid := gen_random_uuid();
    
    lesson_portuguese_1_id uuid := gen_random_uuid();
    lesson_portuguese_2_id uuid := gen_random_uuid();
    
    lesson_italian_1_id uuid := gen_random_uuid();
    lesson_italian_2_id uuid := gen_random_uuid();
BEGIN
    -- Insert sample courses
    INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, is_premium) VALUES
      (
        course_spanish_id,
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
        course_french_id,
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
        course_portuguese_id,
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
        course_italian_id,
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
        lesson_spanish_1_id,
        course_spanish_id,
        'Saludos y Presentaciones',
        'Aprende a saludar y presentarte en español',
        'En esta lección aprenderás las formas básicas de saludo en español: Hola, Buenos días, Buenas tardes, Buenas noches. También veremos cómo presentarse: Me llamo..., Soy..., Mucho gusto.',
        1,
        'vocabulary',
        20
      ),
      (
        lesson_spanish_2_id,
        course_spanish_id,
        'Los Números del 1 al 20',
        'Domina los números básicos en español',
        'Los números son fundamentales en cualquier idioma. En esta lección aprenderás los números del 1 al 20: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte.',
        2,
        'vocabulary',
        15
      ),
      (
        lesson_spanish_3_id,
        course_spanish_id,
        'El Verbo SER',
        'Aprende uno de los verbos más importantes del español',
        'El verbo SER es esencial en español. Se usa para describir características permanentes: Yo soy, Tú eres, Él/Ella es, Nosotros somos, Vosotros sois, Ellos son.',
        3,
        'grammar',
        25
      ),
      (
        lesson_spanish_4_id,
        course_spanish_id,
        'La Familia',
        'Vocabulario sobre los miembros de la familia',
        'Aprende a hablar sobre tu familia: padre, madre, hermano, hermana, abuelo, abuela, tío, tía, primo, prima, hijo, hija.',
        4,
        'vocabulary',
        20
      ),
      (
        lesson_spanish_5_id,
        course_spanish_id,
        'Los Colores',
        'Aprende los colores básicos en español',
        'Los colores son muy útiles para describir objetos: rojo, azul, verde, amarillo, negro, blanco, rosa, morado, naranja, marrón.',
        5,
        'vocabulary',
        15
      ),
      (
        lesson_spanish_6_id,
        course_spanish_id,
        'El Verbo ESTAR',
        'Aprende las diferencias entre SER y ESTAR',
        'El verbo ESTAR se usa para estados temporales y ubicación: Yo estoy, Tú estás, Él/Ella está, Nosotros estamos, Vosotros estáis, Ellos están.',
        6,
        'grammar',
        30
      ),
      (
        lesson_spanish_7_id,
        course_spanish_id,
        'En el Restaurante',
        'Vocabulario y frases para comer fuera',
        'Aprende a desenvolverte en un restaurante: la carta, pedir comida, la cuenta. Frases útiles: ¿Qué me recomienda? La cuenta, por favor.',
        7,
        'conversation',
        25
      ),
      (
        lesson_spanish_8_id,
        course_spanish_id,
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
        lesson_french_1_id,
        course_french_id,
        'Les Salutations',
        'Apprenez à saluer en français',
        'Les salutations de base en français: Bonjour, Bonsoir, Salut, Au revoir. Comment vous appelez-vous? Je m''appelle...',
        1,
        'vocabulary',
        20
      ),
      (
        lesson_french_2_id,
        course_french_id,
        'Les Articles',
        'Maîtrisez les articles français',
        'Les articles définis: le, la, les. Les articles indéfinis: un, une, des. Exemples et usage.',
        2,
        'grammar',
        25
      ),
      (
        lesson_french_3_id,
        course_french_id,
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
        lesson_portuguese_1_id,
        course_portuguese_id,
        'Pronúncia Portuguesa',
        'Domine a pronúncia do português',
        'Diferenças na pronúncia entre português brasileiro e europeu. Sons únicos do português: nh, lh, ão, ões.',
        1,
        'vocabulary',
        25
      ),
      (
        lesson_portuguese_2_id,
        course_portuguese_id,
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
        lesson_italian_1_id,
        course_italian_id,
        'Conversazione al Bar',
        'Impara a ordinare al bar come un italiano',
        'Frasi essenziali per il bar: Un caffè, per favore. Quanto costa? Il conto, grazie. Differenze culturali nel bere il caffè.',
        1,
        'conversation',
        20
      ),
      (
        lesson_italian_2_id,
        course_italian_id,
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
        gen_random_uuid(),
        lesson_spanish_1_id,
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
        gen_random_uuid(),
        lesson_spanish_1_id,
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
        gen_random_uuid(),
        lesson_spanish_1_id,
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
        gen_random_uuid(),
        lesson_spanish_2_id,
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
        gen_random_uuid(),
        lesson_spanish_2_id,
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

    -- Insert sample exercises for Spanish lesson 3
    INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
      (
        gen_random_uuid(),
        lesson_spanish_3_id,
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
        gen_random_uuid(),
        lesson_spanish_3_id,
        'Identifica el uso de SER',
        'Selecciona cuándo usar el verbo SER',
        'multiple_choice',
        '{
          "question": "¿Cuándo usamos el verbo SER?",
          "options": ["Para ubicación temporal", "Para características permanentes", "Para estados de ánimo", "Para el clima"],
          "correct_answer": 1,
          "explanation": "SER se usa para características permanentes como nacionalidad, profesión, personalidad"
        }',
        10,
        2
      );

    -- Insert sample exercises for Spanish lesson 4
    INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
      (
        gen_random_uuid(),
        lesson_spanish_4_id,
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
      ),
      (
        gen_random_uuid(),
        lesson_spanish_4_id,
        'Completa la familia',
        'Escribe el miembro de la familia',
        'fill_blank',
        '{
          "question": "El hijo de mi hermano es mi _____.",
          "correct_answer": "sobrino",
          "explanation": "El hijo de tu hermano es tu sobrino"
        }',
        10,
        2
      );

    -- Insert sample exercises for French lesson 1
    INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
      (
        gen_random_uuid(),
        lesson_french_1_id,
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
      ),
      (
        gen_random_uuid(),
        lesson_french_1_id,
        'Présentez-vous',
        'Complétez la présentation',
        'fill_blank',
        '{
          "question": "Bonjour, je _____ appelle Pierre.",
          "correct_answer": "me",
          "explanation": "En français, on dit ''je me appelle'' pour se présenter"
        }',
        10,
        2
      );

    -- Insert sample exercises for French lesson 2
    INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
      (
        gen_random_uuid(),
        lesson_french_2_id,
        'Les articles définis',
        'Choisissez le bon article',
        'multiple_choice',
        '{
          "question": "Quel article utilise-t-on avec ''maison''?",
          "options": ["le", "la", "les", "un"],
          "correct_answer": 1,
          "explanation": "''Maison'' est féminin, donc on utilise ''la''"
        }',
        10,
        1
      );

    -- Update course total_lessons count
    UPDATE courses SET total_lessons = (
      SELECT COUNT(*) FROM lessons WHERE lessons.course_id = courses.id
    );
END $$;