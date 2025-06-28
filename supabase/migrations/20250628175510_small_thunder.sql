/*
  # Crear ejercicios detallados para todos los cursos

  1. Ejercicios para cursos de italiano desde español
  2. Ejercicios para cursos de francés desde español  
  3. Ejercicios para cursos de portugués desde español
  4. Ejercicios variados por tipo (multiple_choice, fill_blank, translation, conversation)
*/

-- ============================================================================
-- EJERCICIOS PARA ITALIANO DESDE ESPAÑOL - LECCIÓN 1
-- ============================================================================

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order, created_at, updated_at) VALUES
-- Ejercicio 1: Saludos básicos
('ex-es-it-001-01', 'lesson-es-it-001', 'Saludos Italianos', 'Selecciona el saludo italiano correcto para cada situación.', 'multiple_choice', 
jsonb_build_object(
  'question', '¿Cómo saludas a un amigo de manera informal en italiano?',
  'options', ARRAY['Buongiorno', 'Ciao', 'Buonasera', 'Arrivederci'],
  'correct_answer', 'Ciao',
  'explanation', '"Ciao" es el saludo informal más común en italiano, similar a "hola" en español.'
), 10, 1, now(), now()),

-- Ejercicio 2: Palabras similares
('ex-es-it-001-02', 'lesson-es-it-001', 'Palabras Hermanas', 'Completa con la palabra italiana que es similar al español.', 'fill_blank',
jsonb_build_object(
  'question', 'En italiano, "problema" se dice ______.',
  'correct_answer', 'problema',
  'explanation', 'Muchas palabras son idénticas entre español e italiano debido a su origen latino común.'
), 15, 2, now(), now()),

-- Ejercicio 3: Traducción básica
('ex-es-it-001-03', 'lesson-es-it-001', 'Primeras Traducciones', 'Traduce la siguiente frase al italiano.', 'translation',
jsonb_build_object(
  'question', 'Buenos días',
  'correct_answer', 'Buongiorno',
  'explanation', '"Buongiorno" se usa desde la mañana hasta aproximadamente las 2 PM.'
), 20, 3, now(), now()),

-- ============================================================================
-- EJERCICIOS PARA ITALIANO DESDE ESPAÑOL - LECCIÓN 2
-- ============================================================================

-- Ejercicio 1: Presentaciones
('ex-es-it-002-01', 'lesson-es-it-002', 'Mi chiamo...', 'Completa la presentación en italiano.', 'fill_blank',
jsonb_build_object(
  'question', 'Mi ______ Marco. (Me llamo Marco)',
  'correct_answer', 'chiamo',
  'explanation', '"Mi chiamo" es la forma estándar de decir "me llamo" en italiano.'
), 15, 1, now(), now()),

-- Ejercicio 2: Preguntas personales
('ex-es-it-002-02', 'lesson-es-it-002', 'Información Personal', 'Selecciona la pregunta correcta en italiano.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo preguntas "¿De dónde eres?" en italiano?',
  'options', ARRAY['Come ti chiami?', 'Di dove sei?', 'Quanti anni hai?', 'Che lavoro fai?'],
  'correct_answer', 'Di dove sei?',
  'explanation', '"Di dove sei?" es la forma informal de preguntar el origen de alguien.'
), 10, 2, now(), now()),

-- Ejercicio 3: Nacionalidades
('ex-es-it-002-03', 'lesson-es-it-002', 'Nacionalidades', 'Traduce la nacionalidad al italiano.', 'translation',
jsonb_build_object(
  'question', 'Soy español',
  'correct_answer', 'Sono spagnolo',
  'explanation', 'Las nacionalidades en italiano concuerdan en género: spagnolo (m), spagnola (f).'
), 20, 3, now(), now()),

-- ============================================================================
-- EJERCICIOS PARA FRANCÉS DESDE ESPAÑOL - LECCIÓN 1
-- ============================================================================

-- Ejercicio 1: Saludos franceses
('ex-es-fr-001-01', 'lesson-es-fr-001', 'Saludos Franceses', 'Selecciona el saludo francés apropiado.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo saludas formalmente por la mañana en francés?',
  'options', ARRAY['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
  'correct_answer', 'Bonjour',
  'explanation', '"Bonjour" se usa formalmente desde la mañana hasta aproximadamente las 6 PM.'
), 10, 1, now(), now()),

-- Ejercicio 2: Cortesía
('ex-es-fr-001-02', 'lesson-es-fr-001', 'Expresiones de Cortesía', 'Completa la expresión de cortesía.', 'fill_blank',
jsonb_build_object(
  'question', 'S''il vous ______ (Por favor - formal)',
  'correct_answer', 'plaît',
  'explanation', '"S''il vous plaît" es la forma formal de "por favor" en francés.'
), 15, 2, now(), now()),

-- Ejercicio 3: Pronunciación
('ex-es-fr-001-03', 'lesson-es-fr-001', 'Sonidos Franceses', 'Identifica la palabra con el sonido nasal francés.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cuál de estas palabras tiene un sonido nasal típicamente francés?',
  'options', ARRAY['Merci', 'Bonjour', 'Bon', 'Au revoir'],
  'correct_answer', 'Bon',
  'explanation', '"Bon" contiene el sonido nasal [ɔ̃] que no existe en español.'
), 20, 3, now(), now()),

-- ============================================================================
-- EJERCICIOS PARA PORTUGUÉS DESDE ESPAÑOL - LECCIÓN 1
-- ============================================================================

-- Ejercicio 1: Saludos portugueses
('ex-es-pt-001-01', 'lesson-es-pt-001', 'Cumprimentos', 'Selecciona el saludo portugués correcto.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo dices "hola" de manera informal en portugués?',
  'options', ARRAY['Olá', 'Oi', 'Bom dia', 'Tchau'],
  'correct_answer', 'Oi',
  'explanation', '"Oi" es el saludo informal más común en portugués brasileño.'
), 10, 1, now(), now()),

-- Ejercicio 2: Falsos amigos
('ex-es-pt-001-02', 'lesson-es-pt-001', 'Falsos Amigos', 'Identifica el significado correcto en portugués.', 'multiple_choice',
jsonb_build_object(
  'question', 'En portugués, "rato" significa:',
  'options', ARRAY['ratón', 'momento/rato', 'plato', 'gato'],
  'correct_answer', 'momento/rato',
  'explanation', '"Rato" en portugués significa "momento" o "rato de tiempo", no "ratón" como en español.'
), 15, 2, now(), now()),

-- Ejercicio 3: Pronunciación portuguesa
('ex-es-pt-001-03', 'lesson-es-pt-001', 'Sons do Português', 'Completa con la terminación portuguesa correcta.', 'fill_blank',
jsonb_build_object(
  'question', 'Coraç_____ (corazón)',
  'correct_answer', 'ão',
  'explanation', 'La terminación "-ão" es muy común en portugués y se pronuncia como un sonido nasal.'
), 20, 3, now(), now()),

-- ============================================================================
-- EJERCICIOS PARA ITALIANO - LECCIÓN 3 (NÚMEROS)
-- ============================================================================

('ex-es-it-003-01', 'lesson-es-it-003', 'Numeri Italiani', 'Selecciona el número correcto en italiano.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo se dice "cinco" en italiano?',
  'options', ARRAY['quattro', 'cinque', 'sei', 'sette'],
  'correct_answer', 'cinque',
  'explanation', '"Cinque" es cinco en italiano, similar al español "cinco".'
), 10, 1, now(), now()),

('ex-es-it-003-02', 'lesson-es-it-003', 'Età', 'Completa la frase sobre la edad.', 'fill_blank',
jsonb_build_object(
  'question', 'Ho ______ anni. (Tengo veinte años)',
  'correct_answer', 'venti',
  'explanation', '"Venti" significa veinte en italiano.'
), 15, 2, now(), now()),

-- ============================================================================
-- EJERCICIOS PARA FRANCÉS - LECCIÓN 2 (PRESENTACIONES)
-- ============================================================================

('ex-es-fr-002-01', 'lesson-es-fr-002', 'Se Présenter', 'Completa la presentación en francés.', 'fill_blank',
jsonb_build_object(
  'question', 'Je m''______ Pierre. (Me llamo Pierre)',
  'correct_answer', 'appelle',
  'explanation', '"Je m''appelle" es la forma estándar de presentarse en francés.'
), 15, 1, now(), now()),

('ex-es-fr-002-02', 'lesson-es-fr-002', 'Nationalités', 'Selecciona la nacionalidad correcta en francés.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo dices "Soy español" en francés?',
  'options', ARRAY['Je suis espagnol', 'Je suis français', 'Je suis italien', 'Je suis allemand'],
  'correct_answer', 'Je suis espagnol',
  'explanation', '"Je suis espagnol" significa "Soy español" en francés.'
), 10, 2, now(), now()),

-- ============================================================================
-- EJERCICIOS PARA PORTUGUÉS - LECCIÓN 2 (PRESENTACIONES)
-- ============================================================================

('ex-es-pt-002-01', 'lesson-es-pt-002', 'Apresentações', 'Completa la presentación en portugués.', 'fill_blank',
jsonb_build_object(
  'question', 'Meu nome __ João. (Mi nombre es João)',
  'correct_answer', 'é',
  'explanation', '"Meu nome é" es una forma común de presentarse en portugués.'
), 15, 1, now(), now()),

('ex-es-pt-002-02', 'lesson-es-pt-002', 'Profissões', 'Selecciona la profesión correcta en portugués.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo dices "Soy profesor" en portugués?',
  'options', ARRAY['Sou médico', 'Sou professor', 'Sou engenheiro', 'Sou estudante'],
  'correct_answer', 'Sou professor',
  'explanation', '"Sou professor" significa "Soy profesor" en portugués.'
), 10, 2, now(), now()),

-- ============================================================================
-- EJERCICIOS DE CONVERSACIÓN
-- ============================================================================

-- Ejercicio de conversación para italiano
('ex-es-it-005-01', 'lesson-es-it-005', 'Al Ristorante', 'Ordena en un restaurante italiano.', 'conversation',
jsonb_build_object(
  'question', 'Quieres pedir una pizza margherita. ¿Qué dices?',
  'correct_answer', 'Vorrei una pizza margherita, per favore',
  'explanation', '"Vorrei" (quisiera) es más educado que "voglio" (quiero) en contextos formales.'
), 25, 1, now(), now()),

-- Ejercicio de conversación para francés
('ex-es-fr-005-01', 'lesson-es-fr-005', 'Au Restaurant', 'Pide en un restaurante francés.', 'conversation',
jsonb_build_object(
  'question', 'Quieres pedir el menú del día. ¿Qué dices?',
  'correct_answer', 'Je voudrais le menu du jour, s''il vous plaît',
  'explanation', '"Je voudrais" es la forma educada de pedir algo en francés.'
), 25, 1, now(), now()),

-- Ejercicio de conversación para portugués
('ex-es-pt-005-01', 'lesson-es-pt-005', 'No Restaurante', 'Pide en un restaurante brasileño.', 'conversation',
jsonb_build_object(
  'question', 'Quieres pedir una caipirinha. ¿Qué dices?',
  'correct_answer', 'Eu gostaria de uma caipirinha, por favor',
  'explanation', '"Eu gostaria de" es una forma educada de pedir algo en portugués.'
), 25, 1, now(), now()),

-- ============================================================================
-- EJERCICIOS DE GRAMÁTICA
-- ============================================================================

-- Ejercicio de gramática para italiano
('ex-es-it-006-01', 'lesson-es-it-006', 'Verbo Essere', 'Conjuga el verbo essere correctamente.', 'fill_blank',
jsonb_build_object(
  'question', 'Noi ______ italiani. (Nosotros somos italianos)',
  'correct_answer', 'siamo',
  'explanation', 'La primera persona del plural de "essere" es "siamo".'
), 20, 1, now(), now()),

-- Ejercicio de gramática para francés
('ex-es-fr-006-01', 'lesson-es-fr-006', 'Verbo Être', 'Conjuga el verbo être correctamente.', 'fill_blank',
jsonb_build_object(
  'question', 'Nous ______ français. (Nosotros somos franceses)',
  'correct_answer', 'sommes',
  'explanation', 'La primera persona del plural de "être" es "sommes".'
), 20, 1, now(), now()),

-- Ejercicio de gramática para portugués
('ex-es-pt-006-01', 'lesson-es-pt-006', 'Verbo Ser', 'Conjuga el verbo ser correctamente.', 'fill_blank',
jsonb_build_object(
  'question', 'Nós ______ brasileiros. (Nosotros somos brasileños)',
  'correct_answer', 'somos',
  'explanation', 'La primera persona del plural de "ser" es "somos" en portugués.'
), 20, 1, now(), now()),

-- ============================================================================
-- EJERCICIOS CULTURALES
-- ============================================================================

-- Ejercicio cultural para italiano
('ex-es-it-014-01', 'lesson-es-it-014', 'Cultura Italiana', 'Identifica la tradición italiana.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cuál es la bebida italiana más famosa después del café?',
  'options', ARRAY['Vino', 'Grappa', 'Limoncello', 'Aperol'],
  'correct_answer', 'Vino',
  'explanation', 'Italia es famosa mundialmente por sus vinos, con regiones como Toscana y Piamonte.'
), 15, 1, now(), now()),

-- Ejercicio cultural para francés
('ex-es-fr-014-01', 'lesson-es-fr-014', 'Culture Française', 'Identifica el símbolo francés.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cuál es el símbolo más representativo de París?',
  'options', ARRAY['Notre-Dame', 'Torre Eiffel', 'Louvre', 'Arco del Triunfo'],
  'correct_answer', 'Torre Eiffel',
  'explanation', 'La Torre Eiffel es el símbolo más reconocido de París y Francia en todo el mundo.'
), 15, 1, now(), now()),

-- Ejercicio cultural para portugués
('ex-es-pt-014-01', 'lesson-es-pt-014', 'Música Brasileira', 'Identifica el género musical brasileño.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cuál es el género musical más famoso de Brasil?',
  'options', ARRAY['Tango', 'Samba', 'Flamenco', 'Fado'],
  'correct_answer', 'Samba',
  'explanation', 'El samba es el género musical más representativo de Brasil, especialmente en el Carnaval.'
), 15, 1, now(), now()),

-- ============================================================================
-- EJERCICIOS ADICIONALES DE VOCABULARIO
-- ============================================================================

-- Vocabulario de familia en italiano
('ex-es-it-004-01', 'lesson-es-it-004', 'La Famiglia', 'Selecciona el término familiar correcto.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo se dice "hermana" en italiano?',
  'options', ARRAY['madre', 'sorella', 'figlia', 'nonna'],
  'correct_answer', 'sorella',
  'explanation', '"Sorella" significa hermana en italiano.'
), 10, 1, now(), now()),

-- Vocabulario de familia en francés
('ex-es-fr-004-01', 'lesson-es-fr-004', 'La Famille', 'Selecciona el término familiar correcto.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo se dice "hermano" en francés?',
  'options', ARRAY['père', 'frère', 'fils', 'oncle'],
  'correct_answer', 'frère',
  'explanation', '"Frère" significa hermano en francés.'
), 10, 1, now(), now()),

-- Vocabulario de familia en portugués
('ex-es-pt-004-01', 'lesson-es-pt-004', 'A Família', 'Selecciona el término familiar correcto.', 'multiple_choice',
jsonb_build_object(
  'question', '¿Cómo se dice "madre" en portugués?',
  'options', ARRAY['pai', 'mãe', 'filha', 'avó'],
  'correct_answer', 'mãe',
  'explanation', '"Mãe" significa madre en portugués.'
), 10, 1, now(), now());