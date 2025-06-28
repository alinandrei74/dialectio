/*
  # Crear ejercicios para todos los cursos existentes

  1. Nuevos ejercicios
    - Ejercicios variados para cada lección existente
    - Diferentes tipos: multiple_choice, fill_blank, translation, conversation
    - Contenido educativo contextualizado por idioma
    - Progresión lógica de dificultad

  2. Características
    - UUIDs válidos generados automáticamente
    - Contenido JSONB estructurado
    - Puntuación variable según dificultad
    - Explicaciones educativas detalladas
*/

-- Función auxiliar para crear ejercicios de manera dinámica
DO $$
DECLARE
    lesson_record RECORD;
    course_record RECORD;
    exercise_count INTEGER := 0;
BEGIN
    -- Iterar sobre todas las lecciones existentes
    FOR lesson_record IN 
        SELECT l.id as lesson_id, l.title as lesson_title, l.lesson_order, l.lesson_type,
               c.target_language, c.source_language, c.title as course_title
        FROM lessons l
        JOIN courses c ON l.course_id = c.id
        ORDER BY c.target_language, l.lesson_order
    LOOP
        -- Crear ejercicios basados en el tipo de lección y idiomas
        
        -- EJERCICIOS PARA LECCIONES DE SALUDOS (lesson_order = 1)
        IF lesson_record.lesson_order = 1 THEN
            -- Ejercicio 1: Multiple choice - Saludos básicos
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Saludos Italianos'
                    WHEN 'fr' THEN 'Salutations Françaises'
                    WHEN 'pt' THEN 'Cumprimentos Portugueses'
                    WHEN 'en' THEN 'English Greetings'
                    ELSE 'Saludos Básicos'
                END,
                'Selecciona el saludo correcto para cada situación.',
                'multiple_choice',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', '¿Cómo saludas de manera informal en italiano?',
                        'options', ARRAY['Buongiorno', 'Ciao', 'Buonasera', 'Arrivederci'],
                        'correct_answer', 'Ciao',
                        'explanation', '"Ciao" es el saludo informal más común en italiano.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', '¿Cómo saludas formalmente por la mañana en francés?',
                        'options', ARRAY['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
                        'correct_answer', 'Bonjour',
                        'explanation', '"Bonjour" se usa formalmente desde la mañana hasta las 6 PM.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', '¿Cómo dices "hola" informalmente en portugués?',
                        'options', ARRAY['Olá', 'Oi', 'Bom dia', 'Tchau'],
                        'correct_answer', 'Oi',
                        'explanation', '"Oi" es el saludo informal más común en portugués brasileño.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'How do you greet someone informally in English?',
                        'options', ARRAY['Good morning', 'Hi', 'Good evening', 'Goodbye'],
                        'correct_answer', 'Hi',
                        'explanation', '"Hi" is the most common informal greeting in English.'
                    )
                    ELSE jsonb_build_object(
                        'question', '¿Cuál es un saludo común en español?',
                        'options', ARRAY['Hola', 'Adiós', 'Gracias', 'Por favor'],
                        'correct_answer', 'Hola',
                        'explanation', '"Hola" es el saludo más común en español.'
                    )
                END,
                10,
                1
            );

            -- Ejercicio 2: Fill blank - Expresiones básicas
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Completare i Saluti'
                    WHEN 'fr' THEN 'Compléter les Salutations'
                    WHEN 'pt' THEN 'Completar Cumprimentos'
                    WHEN 'en' THEN 'Complete the Greetings'
                    ELSE 'Completar Saludos'
                END,
                'Completa la expresión con la palabra correcta.',
                'fill_blank',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', 'Buon ______! (Buenos días)',
                        'correct_answer', 'giorno',
                        'explanation', '"Buongiorno" se usa desde la mañana hasta las 2 PM aproximadamente.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', 'Bon ______! (Buenos días)',
                        'correct_answer', 'jour',
                        'explanation', '"Bonjour" es el saludo estándar durante el día en francés.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', 'Bom ______! (Buenos días)',
                        'correct_answer', 'dia',
                        'explanation', '"Bom dia" se usa desde la mañana hasta el mediodía.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'Good ______! (Buenos días)',
                        'correct_answer', 'morning',
                        'explanation', '"Good morning" is used from early morning until noon.'
                    )
                    ELSE jsonb_build_object(
                        'question', 'Buenos ______!',
                        'correct_answer', 'días',
                        'explanation', '"Buenos días" se usa desde la mañana hasta el mediodía.'
                    )
                END,
                15,
                2
            );

            -- Ejercicio 3: Translation - Traducción básica
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Traduzione Italiana'
                    WHEN 'fr' THEN 'Traduction Française'
                    WHEN 'pt' THEN 'Tradução Portuguesa'
                    WHEN 'en' THEN 'English Translation'
                    ELSE 'Traducción Española'
                END,
                'Traduce la siguiente expresión.',
                'translation',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', 'Gracias',
                        'correct_answer', 'Grazie',
                        'explanation', '"Grazie" es la forma estándar de agradecer en italiano.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', 'Gracias',
                        'correct_answer', 'Merci',
                        'explanation', '"Merci" es la forma estándar de agradecer en francés.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', 'Gracias',
                        'correct_answer', 'Obrigado',
                        'explanation', '"Obrigado" (hombre) u "Obrigada" (mujer) para agradecer en portugués.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'Gracias',
                        'correct_answer', 'Thank you',
                        'explanation', '"Thank you" is the standard way to express gratitude in English.'
                    )
                    ELSE jsonb_build_object(
                        'question', 'Thank you',
                        'correct_answer', 'Gracias',
                        'explanation', '"Gracias" es la forma estándar de agradecer en español.'
                    )
                END,
                20,
                3
            );
        END IF;

        -- EJERCICIOS PARA LECCIONES DE PRESENTACIONES (lesson_order = 2)
        IF lesson_record.lesson_order = 2 THEN
            -- Ejercicio 1: Fill blank - Presentarse
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Presentarsi'
                    WHEN 'fr' THEN 'Se Présenter'
                    WHEN 'pt' THEN 'Apresentar-se'
                    WHEN 'en' THEN 'Introducing Yourself'
                    ELSE 'Presentarse'
                END,
                'Completa la presentación personal.',
                'fill_blank',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', 'Mi ______ Marco. (Me llamo Marco)',
                        'correct_answer', 'chiamo',
                        'explanation', '"Mi chiamo" es la forma estándar de decir "me llamo" en italiano.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', 'Je m''______ Pierre. (Me llamo Pierre)',
                        'correct_answer', 'appelle',
                        'explanation', '"Je m''appelle" es la forma estándar de presentarse en francés.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', 'Meu nome __ João. (Mi nombre es João)',
                        'correct_answer', 'é',
                        'explanation', '"Meu nome é" es una forma común de presentarse en portugués.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'My name __ John. (Mi nombre es John)',
                        'correct_answer', 'is',
                        'explanation', '"My name is" is the standard way to introduce yourself in English.'
                    )
                    ELSE jsonb_build_object(
                        'question', 'Me ______ María.',
                        'correct_answer', 'llamo',
                        'explanation', '"Me llamo" es la forma más común de presentarse en español.'
                    )
                END,
                15,
                1
            );

            -- Ejercicio 2: Multiple choice - Preguntas personales
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Domande Personali'
                    WHEN 'fr' THEN 'Questions Personnelles'
                    WHEN 'pt' THEN 'Perguntas Pessoais'
                    WHEN 'en' THEN 'Personal Questions'
                    ELSE 'Preguntas Personales'
                END,
                'Selecciona la pregunta correcta.',
                'multiple_choice',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', '¿Cómo preguntas "¿De dónde eres?" en italiano?',
                        'options', ARRAY['Come ti chiami?', 'Di dove sei?', 'Quanti anni hai?', 'Che lavoro fai?'],
                        'correct_answer', 'Di dove sei?',
                        'explanation', '"Di dove sei?" es la forma informal de preguntar el origen.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', '¿Cómo preguntas "¿Cómo te llamas?" en francés?',
                        'options', ARRAY['Comment tu t''appelles?', 'D''où viens-tu?', 'Quel âge as-tu?', 'Que fais-tu?'],
                        'correct_answer', 'Comment tu t''appelles?',
                        'explanation', '"Comment tu t''appelles?" es la forma informal de preguntar el nombre.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', '¿Cómo preguntas "¿Cuántos años tienes?" en portugués?',
                        'options', ARRAY['Qual é seu nome?', 'De onde você é?', 'Quantos anos você tem?', 'O que você faz?'],
                        'correct_answer', 'Quantos anos você tem?',
                        'explanation', '"Quantos anos você tem?" es la forma de preguntar la edad en portugués brasileño.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'How do you ask "What''s your name?" in English?',
                        'options', ARRAY['What''s your name?', 'Where are you from?', 'How old are you?', 'What do you do?'],
                        'correct_answer', 'What''s your name?',
                        'explanation', '"What''s your name?" is the standard way to ask someone''s name.'
                    )
                    ELSE jsonb_build_object(
                        'question', '¿Cómo preguntas el nombre de alguien?',
                        'options', ARRAY['¿Cómo te llamas?', '¿De dónde eres?', '¿Cuántos años tienes?', '¿A qué te dedicas?'],
                        'correct_answer', '¿Cómo te llamas?',
                        'explanation', '"¿Cómo te llamas?" es la forma estándar de preguntar el nombre.'
                    )
                END,
                10,
                2
            );
        END IF;

        -- EJERCICIOS PARA LECCIONES DE NÚMEROS (lesson_order = 3)
        IF lesson_record.lesson_order = 3 THEN
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Numeri Italiani'
                    WHEN 'fr' THEN 'Nombres Français'
                    WHEN 'pt' THEN 'Números Portugueses'
                    WHEN 'en' THEN 'English Numbers'
                    ELSE 'Números Españoles'
                END,
                'Selecciona el número correcto.',
                'multiple_choice',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', '¿Cómo se dice "cinco" en italiano?',
                        'options', ARRAY['quattro', 'cinque', 'sei', 'sette'],
                        'correct_answer', 'cinque',
                        'explanation', '"Cinque" es cinco en italiano.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', '¿Cómo se dice "diez" en francés?',
                        'options', ARRAY['huit', 'neuf', 'dix', 'onze'],
                        'correct_answer', 'dix',
                        'explanation', '"Dix" es diez en francés.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', '¿Cómo se dice "siete" en portugués?',
                        'options', ARRAY['cinco', 'seis', 'sete', 'oito'],
                        'correct_answer', 'sete',
                        'explanation', '"Sete" es siete en portugués.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'How do you say "eight" in English?',
                        'options', ARRAY['six', 'seven', 'eight', 'nine'],
                        'correct_answer', 'eight',
                        'explanation', '"Eight" is the number 8 in English.'
                    )
                    ELSE jsonb_build_object(
                        'question', '¿Cuál es el número tres?',
                        'options', ARRAY['dos', 'tres', 'cuatro', 'cinco'],
                        'correct_answer', 'tres',
                        'explanation', '"Tres" es el número 3 en español.'
                    )
                END,
                10,
                1
            );
        END IF;

        -- EJERCICIOS PARA LECCIONES DE FAMILIA (lesson_order = 4)
        IF lesson_record.lesson_order = 4 THEN
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'La Famiglia'
                    WHEN 'fr' THEN 'La Famille'
                    WHEN 'pt' THEN 'A Família'
                    WHEN 'en' THEN 'The Family'
                    ELSE 'La Familia'
                END,
                'Selecciona el término familiar correcto.',
                'multiple_choice',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', '¿Cómo se dice "hermana" en italiano?',
                        'options', ARRAY['madre', 'sorella', 'figlia', 'nonna'],
                        'correct_answer', 'sorella',
                        'explanation', '"Sorella" significa hermana en italiano.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', '¿Cómo se dice "hermano" en francés?',
                        'options', ARRAY['père', 'frère', 'fils', 'oncle'],
                        'correct_answer', 'frère',
                        'explanation', '"Frère" significa hermano en francés.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', '¿Cómo se dice "madre" en portugués?',
                        'options', ARRAY['pai', 'mãe', 'filha', 'avó'],
                        'correct_answer', 'mãe',
                        'explanation', '"Mãe" significa madre en portugués.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'How do you say "father" in English?',
                        'options', ARRAY['mother', 'father', 'brother', 'sister'],
                        'correct_answer', 'father',
                        'explanation', '"Father" means padre in English.'
                    )
                    ELSE jsonb_build_object(
                        'question', '¿Cuál es el término para "padre"?',
                        'options', ARRAY['madre', 'padre', 'hermano', 'hermana'],
                        'correct_answer', 'padre',
                        'explanation', '"Padre" es el término para el progenitor masculino.'
                    )
                END,
                10,
                1
            );
        END IF;

        -- EJERCICIOS PARA LECCIONES DE RESTAURANTE (lesson_order = 5)
        IF lesson_record.lesson_order = 5 THEN
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Al Ristorante'
                    WHEN 'fr' THEN 'Au Restaurant'
                    WHEN 'pt' THEN 'No Restaurante'
                    WHEN 'en' THEN 'At the Restaurant'
                    ELSE 'En el Restaurante'
                END,
                'Completa la conversación en el restaurante.',
                'conversation',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', 'Quieres pedir una pizza margherita. ¿Qué dices?',
                        'correct_answer', 'Vorrei una pizza margherita, per favore',
                        'explanation', '"Vorrei" es más educado que "voglio" en contextos formales.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', 'Quieres pedir el menú del día. ¿Qué dices?',
                        'correct_answer', 'Je voudrais le menu du jour, s''il vous plaît',
                        'explanation', '"Je voudrais" es la forma educada de pedir en francés.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', 'Quieres pedir una caipirinha. ¿Qué dices?',
                        'correct_answer', 'Eu gostaria de uma caipirinha, por favor',
                        'explanation', '"Eu gostaria de" es una forma educada de pedir en portugués.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'You want to order a hamburger. What do you say?',
                        'correct_answer', 'I would like a hamburger, please',
                        'explanation', '"I would like" is a polite way to order in English.'
                    )
                    ELSE jsonb_build_object(
                        'question', 'Quieres pedir una paella. ¿Qué dices?',
                        'correct_answer', 'Quisiera una paella, por favor',
                        'explanation', '"Quisiera" es una forma educada de pedir en español.'
                    )
                END,
                25,
                1
            );
        END IF;

        -- EJERCICIOS PARA LECCIONES DE GRAMÁTICA (lesson_order = 6)
        IF lesson_record.lesson_order = 6 THEN
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Verbo Essere'
                    WHEN 'fr' THEN 'Verbe Être'
                    WHEN 'pt' THEN 'Verbo Ser'
                    WHEN 'en' THEN 'Verb To Be'
                    ELSE 'Verbo Ser'
                END,
                'Conjuga el verbo correctamente.',
                'fill_blank',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', 'Noi ______ italiani. (Nosotros somos italianos)',
                        'correct_answer', 'siamo',
                        'explanation', 'La primera persona del plural de "essere" es "siamo".'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', 'Nous ______ français. (Nosotros somos franceses)',
                        'correct_answer', 'sommes',
                        'explanation', 'La primera persona del plural de "être" es "sommes".'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', 'Nós ______ brasileiros. (Nosotros somos brasileños)',
                        'correct_answer', 'somos',
                        'explanation', 'La primera persona del plural de "ser" es "somos".'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'We ______ American. (Nosotros somos americanos)',
                        'correct_answer', 'are',
                        'explanation', 'The first person plural of "to be" is "are".'
                    )
                    ELSE jsonb_build_object(
                        'question', 'Nosotros ______ españoles.',
                        'correct_answer', 'somos',
                        'explanation', 'La primera persona del plural de "ser" es "somos".'
                    )
                END,
                20,
                1
            );
        END IF;

        -- EJERCICIOS CULTURALES (lesson_order >= 10)
        IF lesson_record.lesson_order >= 10 AND lesson_record.lesson_type = 'culture' THEN
            INSERT INTO exercises (lesson_id, title, instructions, exercise_type, content, points, exercise_order)
            VALUES (
                lesson_record.lesson_id,
                CASE lesson_record.target_language
                    WHEN 'it' THEN 'Cultura Italiana'
                    WHEN 'fr' THEN 'Culture Française'
                    WHEN 'pt' THEN 'Cultura Brasileira'
                    WHEN 'en' THEN 'American Culture'
                    ELSE 'Cultura Española'
                END,
                'Identifica el elemento cultural correcto.',
                'multiple_choice',
                CASE lesson_record.target_language
                    WHEN 'it' THEN jsonb_build_object(
                        'question', '¿Cuál es la bebida italiana más famosa?',
                        'options', ARRAY['Té', 'Café', 'Cerveza', 'Vino'],
                        'correct_answer', 'Café',
                        'explanation', 'Italia es famosa mundialmente por su cultura del café.'
                    )
                    WHEN 'fr' THEN jsonb_build_object(
                        'question', '¿Cuál es el símbolo más representativo de París?',
                        'options', ARRAY['Notre-Dame', 'Torre Eiffel', 'Louvre', 'Arco del Triunfo'],
                        'correct_answer', 'Torre Eiffel',
                        'explanation', 'La Torre Eiffel es el símbolo más reconocido de París.'
                    )
                    WHEN 'pt' THEN jsonb_build_object(
                        'question', '¿Cuál es el género musical más famoso de Brasil?',
                        'options', ARRAY['Tango', 'Samba', 'Flamenco', 'Fado'],
                        'correct_answer', 'Samba',
                        'explanation', 'El samba es el género musical más representativo de Brasil.'
                    )
                    WHEN 'en' THEN jsonb_build_object(
                        'question', 'What is the most popular sport in the United States?',
                        'options', ARRAY['Soccer', 'Basketball', 'American Football', 'Baseball'],
                        'correct_answer', 'American Football',
                        'explanation', 'American Football is the most watched sport in the US.'
                    )
                    ELSE jsonb_build_object(
                        'question', '¿Cuál es el baile más representativo de España?',
                        'options', ARRAY['Tango', 'Samba', 'Flamenco', 'Salsa'],
                        'correct_answer', 'Flamenco',
                        'explanation', 'El flamenco es el baile más representativo de España.'
                    )
                END,
                15,
                1
            );
        END IF;

        exercise_count := exercise_count + 1;
    END LOOP;

    RAISE NOTICE 'Se crearon ejercicios para % lecciones', exercise_count;
END $$;