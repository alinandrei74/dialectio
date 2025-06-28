/*
  # Añadir ejercicios de ejemplo para las lecciones

  1. Ejercicios de ejemplo
    - Crear ejercicios para las primeras lecciones de cada curso
    - Diferentes tipos de ejercicios (multiple choice, fill blank, translation)
    - Contenido apropiado para cada idioma objetivo

  2. Estructura de contenido
    - Preguntas en el idioma objetivo
    - Respuestas correctas
    - Explicaciones útiles
*/

-- Insertar ejercicios de ejemplo para las lecciones existentes
DO $$
DECLARE
    lesson_record RECORD;
    exercise_count INTEGER;
    target_lang TEXT;
    lesson_title TEXT;
BEGIN
    FOR lesson_record IN 
        SELECT l.id, l.title, l.lesson_order, c.target_language 
        FROM lessons l 
        JOIN courses c ON l.course_id = c.id 
        ORDER BY c.target_language, l.lesson_order
    LOOP
        target_lang := lesson_record.target_language;
        lesson_title := lesson_record.title;
        
        -- Ejercicio 1: Multiple choice básico
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            lesson_record.id,
            CASE target_lang
                WHEN 'es' THEN 'Selecciona la respuesta correcta'
                WHEN 'fr' THEN 'Sélectionne la bonne réponse'
                WHEN 'pt' THEN 'Seleciona a resposta correta'
                WHEN 'it' THEN 'Seleziona la risposta corretta'
                WHEN 'en' THEN 'Select the correct answer'
            END,
            CASE target_lang
                WHEN 'es' THEN 'Elige la opción que mejor complete la frase.'
                WHEN 'fr' THEN 'Choisis l''option qui complète le mieux la phrase.'
                WHEN 'pt' THEN 'Escolhe a opção que melhor completa a frase.'
                WHEN 'it' THEN 'Scegli l''opzione che completa meglio la frase.'
                WHEN 'en' THEN 'Choose the option that best completes the sentence.'
            END,
            'multiple_choice',
            CASE target_lang
                WHEN 'es' THEN jsonb_build_object(
                    'question', '¿Cómo se dice "hello" en español?',
                    'options', ARRAY['Hola', 'Adiós', 'Gracias', 'Por favor'],
                    'correct_answer', 'Hola',
                    'explanation', '"Hola" es la forma más común de saludar en español.'
                )
                WHEN 'fr' THEN jsonb_build_object(
                    'question', 'Comment dit-on "hello" en français?',
                    'options', ARRAY['Bonjour', 'Au revoir', 'Merci', 'S''il vous plaît'],
                    'correct_answer', 'Bonjour',
                    'explanation', '"Bonjour" est la façon la plus courante de saluer en français.'
                )
                WHEN 'pt' THEN jsonb_build_object(
                    'question', 'Como se diz "hello" em português?',
                    'options', ARRAY['Olá', 'Tchau', 'Obrigado', 'Por favor'],
                    'correct_answer', 'Olá',
                    'explanation', '"Olá" é a forma mais comum de cumprimentar em português.'
                )
                WHEN 'it' THEN jsonb_build_object(
                    'question', 'Come si dice "hello" in italiano?',
                    'options', ARRAY['Ciao', 'Arrivederci', 'Grazie', 'Prego'],
                    'correct_answer', 'Ciao',
                    'explanation', '"Ciao" è il modo più comune di salutare in italiano.'
                )
                WHEN 'en' THEN jsonb_build_object(
                    'question', 'How do you say "hello" in English?',
                    'options', ARRAY['Hello', 'Goodbye', 'Thank you', 'Please'],
                    'correct_answer', 'Hello',
                    'explanation', '"Hello" is the most common way to greet someone in English.'
                )
            END,
            10,
            1,
            now(),
            now()
        );

        -- Ejercicio 2: Fill in the blank
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            lesson_record.id,
            CASE target_lang
                WHEN 'es' THEN 'Completa la frase'
                WHEN 'fr' THEN 'Complète la phrase'
                WHEN 'pt' THEN 'Completa a frase'
                WHEN 'it' THEN 'Completa la frase'
                WHEN 'en' THEN 'Complete the sentence'
            END,
            CASE target_lang
                WHEN 'es' THEN 'Escribe la palabra que falta en la frase.'
                WHEN 'fr' THEN 'Écris le mot qui manque dans la phrase.'
                WHEN 'pt' THEN 'Escreve a palavra que falta na frase.'
                WHEN 'it' THEN 'Scrivi la parola mancante nella frase.'
                WHEN 'en' THEN 'Write the missing word in the sentence.'
            END,
            'fill_blank',
            CASE target_lang
                WHEN 'es' THEN jsonb_build_object(
                    'question', 'Me _____ Juan. (My name is Juan)',
                    'correct_answer', 'llamo',
                    'explanation', '"Me llamo" significa "my name is" en español.'
                )
                WHEN 'fr' THEN jsonb_build_object(
                    'question', 'Je _____ Pierre. (My name is Pierre)',
                    'correct_answer', 'm''appelle',
                    'explanation', '"Je m''appelle" signifie "my name is" en français.'
                )
                WHEN 'pt' THEN jsonb_build_object(
                    'question', 'Eu me _____ João. (My name is João)',
                    'correct_answer', 'chamo',
                    'explanation', '"Eu me chamo" significa "my name is" em português.'
                )
                WHEN 'it' THEN jsonb_build_object(
                    'question', 'Mi _____ Giovanni. (My name is Giovanni)',
                    'correct_answer', 'chiamo',
                    'explanation', '"Mi chiamo" significa "my name is" in italiano.'
                )
                WHEN 'en' THEN jsonb_build_object(
                    'question', 'My _____ is John.',
                    'correct_answer', 'name',
                    'explanation', '"My name is" is how you introduce yourself in English.'
                )
            END,
            15,
            2,
            now(),
            now()
        );

        -- Ejercicio 3: Translation
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            lesson_record.id,
            CASE target_lang
                WHEN 'es' THEN 'Traduce la frase'
                WHEN 'fr' THEN 'Traduis la phrase'
                WHEN 'pt' THEN 'Traduz a frase'
                WHEN 'it' THEN 'Traduci la frase'
                WHEN 'en' THEN 'Translate the sentence'
            END,
            CASE target_lang
                WHEN 'es' THEN 'Traduce la siguiente frase al español.'
                WHEN 'fr' THEN 'Traduis la phrase suivante en français.'
                WHEN 'pt' THEN 'Traduz a seguinte frase para português.'
                WHEN 'it' THEN 'Traduci la seguente frase in italiano.'
                WHEN 'en' THEN 'Translate the following sentence to English.'
            END,
            'translation',
            CASE target_lang
                WHEN 'es' THEN jsonb_build_object(
                    'question', 'Good morning',
                    'correct_answer', 'Buenos días',
                    'explanation', '"Buenos días" es la traducción de "Good morning" en español.'
                )
                WHEN 'fr' THEN jsonb_build_object(
                    'question', 'Good morning',
                    'correct_answer', 'Bonjour',
                    'explanation', '"Bonjour" est la traduction de "Good morning" en français.'
                )
                WHEN 'pt' THEN jsonb_build_object(
                    'question', 'Good morning',
                    'correct_answer', 'Bom dia',
                    'explanation', '"Bom dia" é a tradução de "Good morning" em português.'
                )
                WHEN 'it' THEN jsonb_build_object(
                    'question', 'Good morning',
                    'correct_answer', 'Buongiorno',
                    'explanation', '"Buongiorno" è la traduzione di "Good morning" in italiano.'
                )
                WHEN 'en' THEN jsonb_build_object(
                    'question', 'Buenos días',
                    'correct_answer', 'Good morning',
                    'explanation', '"Good morning" is the translation of "Buenos días" in English.'
                )
            END,
            20,
            3,
            now(),
            now()
        );

    END LOOP;
END $$;