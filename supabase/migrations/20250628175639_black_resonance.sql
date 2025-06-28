/*
  # Añadir ejercicios de ejemplo para las lecciones existentes

  1. Ejercicios variados por idioma
    - Italiano desde español
    - Francés desde español  
    - Portugués desde español
    - Y otros idiomas base

  2. Tipos de ejercicios
    - Multiple choice
    - Fill in the blank
    - Translation
    - Conversation
*/

-- Primero, obtener las lecciones existentes y crear ejercicios para ellas
DO $$
DECLARE
    lesson_record RECORD;
    course_record RECORD;
    exercise_count INTEGER;
    target_lang TEXT;
    source_lang TEXT;
    lesson_title TEXT;
    lesson_order INTEGER;
BEGIN
    -- Iterar sobre todas las lecciones existentes
    FOR lesson_record IN 
        SELECT l.id, l.title, l.lesson_order, l.lesson_type, c.target_language, c.source_language 
        FROM lessons l 
        JOIN courses c ON l.course_id = c.id 
        ORDER BY c.target_language, c.source_language, l.lesson_order
    LOOP
        target_lang := lesson_record.target_language;
        source_lang := lesson_record.source_language;
        lesson_title := lesson_record.title;
        lesson_order := lesson_record.lesson_order;
        
        -- Crear ejercicios específicos según el idioma objetivo y la lección
        
        -- ============================================================================
        -- EJERCICIOS PARA ITALIANO
        -- ============================================================================
        IF target_lang = 'it' THEN
            IF lesson_order = 1 THEN
                -- Lección 1: Introducción y primeras palabras
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Saludos Italianos', 'Selecciona el saludo italiano correcto.', 'multiple_choice', 
                jsonb_build_object(
                  'question', '¿Cómo saludas a un amigo de manera informal en italiano?',
                  'options', ARRAY['Buongiorno', 'Ciao', 'Buonasera', 'Arrivederci'],
                  'correct_answer', 'Ciao',
                  'explanation', '"Ciao" es el saludo informal más común en italiano, similar a "hola" en español.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Palabras Hermanas', 'Completa con la palabra italiana similar al español.', 'fill_blank',
                jsonb_build_object(
                  'question', 'En italiano, "problema" se dice ______.',
                  'correct_answer', 'problema',
                  'explanation', 'Muchas palabras son idénticas entre español e italiano debido a su origen latino común.'
                ), 15, 2, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Primeras Traducciones', 'Traduce la siguiente frase al italiano.', 'translation',
                jsonb_build_object(
                  'question', 'Buenos días',
                  'correct_answer', 'Buongiorno',
                  'explanation', '"Buongiorno" se usa desde la mañana hasta aproximadamente las 2 PM.'
                ), 20, 3, now(), now());
                
            ELSIF lesson_order = 2 THEN
                -- Lección 2: Saludos y presentaciones
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Mi chiamo...', 'Completa la presentación en italiano.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Mi ______ Marco. (Me llamo Marco)',
                  'correct_answer', 'chiamo',
                  'explanation', '"Mi chiamo" es la forma estándar de decir "me llamo" en italiano.'
                ), 15, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Información Personal', 'Selecciona la pregunta correcta en italiano.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo preguntas "¿De dónde eres?" en italiano?',
                  'options', ARRAY['Come ti chiami?', 'Di dove sei?', 'Quanti anni hai?', 'Che lavoro fai?'],
                  'correct_answer', 'Di dove sei?',
                  'explanation', '"Di dove sei?" es la forma informal de preguntar el origen de alguien.'
                ), 10, 2, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Nacionalidades', 'Traduce la nacionalidad al italiano.', 'translation',
                jsonb_build_object(
                  'question', 'Soy español',
                  'correct_answer', 'Sono spagnolo',
                  'explanation', 'Las nacionalidades en italiano concuerdan en género: spagnolo (m), spagnola (f).'
                ), 20, 3, now(), now());
                
            ELSIF lesson_order = 3 THEN
                -- Lección 3: Números y tiempo
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Numeri Italiani', 'Selecciona el número correcto en italiano.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo se dice "cinco" en italiano?',
                  'options', ARRAY['quattro', 'cinque', 'sei', 'sette'],
                  'correct_answer', 'cinque',
                  'explanation', '"Cinque" es cinco en italiano, similar al español "cinco".'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Età', 'Completa la frase sobre la edad.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Ho ______ anni. (Tengo veinte años)',
                  'correct_answer', 'venti',
                  'explanation', '"Venti" significa veinte en italiano.'
                ), 15, 2, now(), now());
                
            ELSIF lesson_order = 4 THEN
                -- Lección 4: Familia y relaciones
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'La Famiglia', 'Selecciona el término familiar correcto.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo se dice "hermana" en italiano?',
                  'options', ARRAY['madre', 'sorella', 'figlia', 'nonna'],
                  'correct_answer', 'sorella',
                  'explanation', '"Sorella" significa hermana en italiano.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Verbo Essere', 'Conjuga el verbo essere correctamente.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Noi ______ italiani. (Nosotros somos italianos)',
                  'correct_answer', 'siamo',
                  'explanation', 'La primera persona del plural de "essere" es "siamo".'
                ), 20, 2, now(), now());
                
            ELSIF lesson_order = 5 THEN
                -- Lección 5: Comida y restaurantes
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Al Ristorante', 'Ordena en un restaurante italiano.', 'conversation',
                jsonb_build_object(
                  'question', 'Quieres pedir una pizza margherita. ¿Qué dices?',
                  'correct_answer', 'Vorrei una pizza margherita, per favore',
                  'explanation', '"Vorrei" (quisiera) es más educado que "voglio" (quiero) en contextos formales.'
                ), 25, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Cultura Italiana', 'Identifica la tradición italiana.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cuál es la bebida italiana más famosa después del café?',
                  'options', ARRAY['Vino', 'Grappa', 'Limoncello', 'Aperol'],
                  'correct_answer', 'Vino',
                  'explanation', 'Italia es famosa mundialmente por sus vinos, con regiones como Toscana y Piamonte.'
                ), 15, 2, now(), now());
            END IF;
            
        -- ============================================================================
        -- EJERCICIOS PARA FRANCÉS
        -- ============================================================================
        ELSIF target_lang = 'fr' THEN
            IF lesson_order = 1 THEN
                -- Lección 1: Introducción y primeras palabras
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Saludos Franceses', 'Selecciona el saludo francés apropiado.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo saludas formalmente por la mañana en francés?',
                  'options', ARRAY['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
                  'correct_answer', 'Bonjour',
                  'explanation', '"Bonjour" se usa formalmente desde la mañana hasta aproximadamente las 6 PM.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Expresiones de Cortesía', 'Completa la expresión de cortesía.', 'fill_blank',
                jsonb_build_object(
                  'question', 'S''il vous ______ (Por favor - formal)',
                  'correct_answer', 'plaît',
                  'explanation', '"S''il vous plaît" es la forma formal de "por favor" en francés.'
                ), 15, 2, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Sonidos Franceses', 'Identifica la palabra con el sonido nasal francés.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cuál de estas palabras tiene un sonido nasal típicamente francés?',
                  'options', ARRAY['Merci', 'Bonjour', 'Bon', 'Au revoir'],
                  'correct_answer', 'Bon',
                  'explanation', '"Bon" contiene el sonido nasal [ɔ̃] que no existe en español.'
                ), 20, 3, now(), now());
                
            ELSIF lesson_order = 2 THEN
                -- Lección 2: Saludos y presentaciones
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Se Présenter', 'Completa la presentación en francés.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Je m''______ Pierre. (Me llamo Pierre)',
                  'correct_answer', 'appelle',
                  'explanation', '"Je m''appelle" es la forma estándar de presentarse en francés.'
                ), 15, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Nationalités', 'Selecciona la nacionalidad correcta en francés.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo dices "Soy español" en francés?',
                  'options', ARRAY['Je suis espagnol', 'Je suis français', 'Je suis italien', 'Je suis allemand'],
                  'correct_answer', 'Je suis espagnol',
                  'explanation', '"Je suis espagnol" significa "Soy español" en francés.'
                ), 10, 2, now(), now());
                
            ELSIF lesson_order = 4 THEN
                -- Lección 4: Familia y relaciones
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'La Famille', 'Selecciona el término familiar correcto.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo se dice "hermano" en francés?',
                  'options', ARRAY['père', 'frère', 'fils', 'oncle'],
                  'correct_answer', 'frère',
                  'explanation', '"Frère" significa hermano en francés.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Verbo Être', 'Conjuga el verbo être correctamente.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Nous ______ français. (Nosotros somos franceses)',
                  'correct_answer', 'sommes',
                  'explanation', 'La primera persona del plural de "être" es "sommes".'
                ), 20, 2, now(), now());
                
            ELSIF lesson_order = 5 THEN
                -- Lección 5: Comida y restaurantes
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Au Restaurant', 'Pide en un restaurante francés.', 'conversation',
                jsonb_build_object(
                  'question', 'Quieres pedir el menú del día. ¿Qué dices?',
                  'correct_answer', 'Je voudrais le menu du jour, s''il vous plaît',
                  'explanation', '"Je voudrais" es la forma educada de pedir algo en francés.'
                ), 25, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Culture Française', 'Identifica el símbolo francés.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cuál es el símbolo más representativo de París?',
                  'options', ARRAY['Notre-Dame', 'Torre Eiffel', 'Louvre', 'Arco del Triunfo'],
                  'correct_answer', 'Torre Eiffel',
                  'explanation', 'La Torre Eiffel es el símbolo más reconocido de París y Francia en todo el mundo.'
                ), 15, 2, now(), now());
            END IF;
            
        -- ============================================================================
        -- EJERCICIOS PARA PORTUGUÉS
        -- ============================================================================
        ELSIF target_lang = 'pt' THEN
            IF lesson_order = 1 THEN
                -- Lección 1: Introducción y primeras palabras
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Cumprimentos', 'Selecciona el saludo portugués correcto.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo dices "hola" de manera informal en portugués?',
                  'options', ARRAY['Olá', 'Oi', 'Bom dia', 'Tchau'],
                  'correct_answer', 'Oi',
                  'explanation', '"Oi" es el saludo informal más común en portugués brasileño.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Falsos Amigos', 'Identifica el significado correcto en portugués.', 'multiple_choice',
                jsonb_build_object(
                  'question', 'En portugués, "rato" significa:',
                  'options', ARRAY['ratón', 'momento/rato', 'plato', 'gato'],
                  'correct_answer', 'momento/rato',
                  'explanation', '"Rato" en portugués significa "momento" o "rato de tiempo", no "ratón" como en español.'
                ), 15, 2, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Sons do Português', 'Completa con la terminación portuguesa correcta.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Coraç_____ (corazón)',
                  'correct_answer', 'ão',
                  'explanation', 'La terminación "-ão" es muy común en portugués y se pronuncia como un sonido nasal.'
                ), 20, 3, now(), now());
                
            ELSIF lesson_order = 2 THEN
                -- Lección 2: Saludos y presentaciones
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Apresentações', 'Completa la presentación en portugués.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Meu nome __ João. (Mi nombre es João)',
                  'correct_answer', 'é',
                  'explanation', '"Meu nome é" es una forma común de presentarse en portugués.'
                ), 15, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Profissões', 'Selecciona la profesión correcta en portugués.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo dices "Soy profesor" en portugués?',
                  'options', ARRAY['Sou médico', 'Sou professor', 'Sou engenheiro', 'Sou estudante'],
                  'correct_answer', 'Sou professor',
                  'explanation', '"Sou professor" significa "Soy profesor" en portugués.'
                ), 10, 2, now(), now());
                
            ELSIF lesson_order = 4 THEN
                -- Lección 4: Familia y relaciones
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'A Família', 'Selecciona el término familiar correcto.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo se dice "madre" en portugués?',
                  'options', ARRAY['pai', 'mãe', 'filha', 'avó'],
                  'correct_answer', 'mãe',
                  'explanation', '"Mãe" significa madre en portugués.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Verbo Ser', 'Conjuga el verbo ser correctamente.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Nós ______ brasileiros. (Nosotros somos brasileños)',
                  'correct_answer', 'somos',
                  'explanation', 'La primera persona del plural de "ser" es "somos" en portugués.'
                ), 20, 2, now(), now());
                
            ELSIF lesson_order = 5 THEN
                -- Lección 5: Comida y restaurantes
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'No Restaurante', 'Pide en un restaurante brasileño.', 'conversation',
                jsonb_build_object(
                  'question', 'Quieres pedir una caipirinha. ¿Qué dices?',
                  'correct_answer', 'Eu gostaria de uma caipirinha, por favor',
                  'explanation', '"Eu gostaria de" es una forma educada de pedir algo en portugués.'
                ), 25, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Música Brasileira', 'Identifica el género musical brasileño.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cuál es el género musical más famoso de Brasil?',
                  'options', ARRAY['Tango', 'Samba', 'Flamenco', 'Fado'],
                  'correct_answer', 'Samba',
                  'explanation', 'El samba es el género musical más representativo de Brasil, especialmente en el Carnaval.'
                ), 15, 2, now(), now());
            END IF;
            
        -- ============================================================================
        -- EJERCICIOS PARA ESPAÑOL (cuando es idioma objetivo)
        -- ============================================================================
        ELSIF target_lang = 'es' THEN
            IF lesson_order = 1 THEN
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Saludos Españoles', 'Selecciona el saludo español apropiado.', 'multiple_choice',
                jsonb_build_object(
                  'question', '¿Cómo saludas por la tarde en español?',
                  'options', ARRAY['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hasta luego'],
                  'correct_answer', 'Buenas tardes',
                  'explanation', '"Buenas tardes" se usa desde el mediodía hasta el anochecer.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Palabras Básicas', 'Completa la palabra en español.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Muchas ______ (gracias)',
                  'correct_answer', 'gracias',
                  'explanation', '"Muchas gracias" es una forma educada de agradecer en español.'
                ), 15, 2, now(), now());
                
            ELSIF lesson_order = 2 THEN
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Presentaciones', 'Completa la presentación en español.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Me ______ María. (My name is María)',
                  'correct_answer', 'llamo',
                  'explanation', '"Me llamo" es la forma estándar de presentarse en español.'
                ), 15, 1, now(), now());
            END IF;
            
        -- ============================================================================
        -- EJERCICIOS PARA INGLÉS (cuando es idioma objetivo)
        -- ============================================================================
        ELSIF target_lang = 'en' THEN
            IF lesson_order = 1 THEN
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'English Greetings', 'Select the appropriate English greeting.', 'multiple_choice',
                jsonb_build_object(
                  'question', 'How do you greet someone formally in the morning?',
                  'options', ARRAY['Hi', 'Good morning', 'Good evening', 'Bye'],
                  'correct_answer', 'Good morning',
                  'explanation', '"Good morning" is the formal way to greet someone before noon.'
                ), 10, 1, now(), now()),
                
                (gen_random_uuid(), lesson_record.id, 'Basic Words', 'Complete the English phrase.', 'fill_blank',
                jsonb_build_object(
                  'question', 'Thank ______ (gracias)',
                  'correct_answer', 'you',
                  'explanation', '"Thank you" is the standard way to express gratitude in English.'
                ), 15, 2, now(), now());
                
            ELSIF lesson_order = 2 THEN
                INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at)
                VALUES 
                (gen_random_uuid(), lesson_record.id, 'Introductions', 'Complete the introduction in English.', 'fill_blank',
                jsonb_build_object(
                  'question', 'My ______ is John.',
                  'correct_answer', 'name',
                  'explanation', '"My name is" is how you introduce yourself in English.'
                ), 15, 1, now(), now());
            END IF;
        END IF;
        
    END LOOP;
END $$;