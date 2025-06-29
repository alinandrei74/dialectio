-- Script de datos de muestra para Dialectio
-- Ejecutar después de las migraciones principales
-- Este script crea cursos completos con estructura de Parts -> Phases -> Units -> Exercises

BEGIN;

-- Verificar que las tablas existen antes de insertar datos
DO $$ 
BEGIN
    -- Verificar que todas las tablas necesarias existen
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'courses') THEN
        RAISE EXCEPTION 'La tabla courses no existe. Ejecuta primero las migraciones principales.';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'parts') THEN
        RAISE EXCEPTION 'La tabla parts no existe. Ejecuta primero las migraciones principales.';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'exercises') THEN
        RAISE EXCEPTION 'La tabla exercises no existe. Ejecuta primero las migraciones principales.';
    END IF;
END $$;

-------------------------------------------------------------
-- 1. CURSOS DE MUESTRA                                   ---
-------------------------------------------------------------

-- Español para francófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) 
VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Español Básico para Francófonos', 'Aprende español aprovechando tu conocimiento del francés. Curso diseñado específicamente para hablantes nativos de francés.', 'es', 'fr', 'beginner', 15, 8, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', false),
('550e8400-e29b-41d4-a716-446655440002', 'Español Intermedio para Francófonos', 'Profundiza tu español con estructuras más complejas y vocabulario avanzado.', 'es', 'fr', 'intermediate', 20, 12, 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg', true)
ON CONFLICT (id) DO NOTHING;

-- Francés para hispanohablantes  
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) 
VALUES 
('550e8400-e29b-41d4-a716-446655440003', 'Français Débutant pour Hispanophones', 'Découvre le français en utilisant tes connaissances de l''espagnol. Méthode adaptée aux hispanophones.', 'fr', 'es', 'beginner', 18, 10, 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg', false),
('550e8400-e29b-41d4-a716-446655440004', 'Français Intermédiaire pour Hispanophones', 'Perfectionne ton français avec des structures avancées et un vocabulaire riche.', 'fr', 'es', 'intermediate', 22, 14, 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg', true)
ON CONFLICT (id) DO NOTHING;

-- Portugués para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) 
VALUES 
('550e8400-e29b-41d4-a716-446655440005', 'Português Básico para Hispanohablantes', 'Aprende portugués de forma rápida aprovechando las similitudes con el español.', 'pt', 'es', 'beginner', 16, 9, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', false),
('550e8400-e29b-41d4-a716-446655440006', 'Português Intermedio para Hispanohablantes', 'Domina las diferencias sutiles entre español y portugués.', 'pt', 'es', 'intermediate', 20, 12, 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg', true)
ON CONFLICT (id) DO NOTHING;

-- Italiano para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) 
VALUES 
('550e8400-e29b-41d4-a716-446655440007', 'Italiano Básico para Hispanohablantes', 'Descubre la belleza del italiano usando tu base de español.', 'it', 'es', 'beginner', 17, 9, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg', false),
('550e8400-e29b-41d4-a716-446655440008', 'Italiano Intermedio para Hispanohablantes', 'Perfecciona tu italiano con expresiones auténticas y cultura italiana.', 'it', 'es', 'intermediate', 21, 13, 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg', true)
ON CONFLICT (id) DO NOTHING;

-- Inglés para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) 
VALUES 
('550e8400-e29b-41d4-a716-446655440009', 'English Basics for Spanish Speakers', 'Learn English efficiently using your Spanish knowledge as a foundation.', 'en', 'es', 'beginner', 20, 12, 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg', false)
ON CONFLICT (id) DO NOTHING;

-------------------------------------------------------------
-- 2. ESTRUCTURA PARA ESPAÑOL BÁSICO PARA FRANCÓFONOS     ---
-------------------------------------------------------------

-- Parts
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
VALUES 
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Parte 1: Primeros Pasos', 1, 'Saludos, presentaciones y expresiones básicas de cortesía.'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Parte 2: Vida Cotidiana', 2, 'Vocabulario y situaciones del día a día: familia, trabajo, tiempo libre.'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Parte 3: En la Ciudad', 3, 'Orientación, transporte, compras y servicios urbanos.')
ON CONFLICT (id) DO NOTHING;

-- Phases para Parte 1 y 2
INSERT INTO phases (id, part_id, kind, phase_order) 
VALUES 
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'conversation', 2),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

-- Units para Parte 1 - Preparation
INSERT INTO units (id, phase_id, kind, title, unit_order) 
VALUES 
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Saludos y Despedidas', 1),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Presentaciones Personales', 2),
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Números y Fechas', 3),
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Expresiones de Cortesía', 4),
('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Países y Nacionalidades', 5)
ON CONFLICT (id) DO NOTHING;

-- Units para Parte 1 - Conversation  
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) 
VALUES 
('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440002', 'situation', 'Encuentro Casual', 1, 'María', 'Eres María, una española amigable que conoce a alguien por primera vez en un café. Ayuda al estudiante a practicar saludos y presentaciones de forma natural.'),
('850e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440002', 'situation', 'En la Recepción', 2, 'Carlos', 'Eres Carlos, recepcionista de un hotel en Madrid. Ayuda al estudiante a practicar el registro y preguntas básicas de cortesía.')
ON CONFLICT (id) DO NOTHING;

-- Units para Parte 2 - Preparation
INSERT INTO units (id, phase_id, kind, title, unit_order) 
VALUES 
('850e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'La Familia', 1),
('850e8400-e29b-41d4-a716-446655440009', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'Profesiones y Trabajo', 2),
('850e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'Tiempo Libre y Hobbies', 3)
ON CONFLICT (id) DO NOTHING;

-------------------------------------------------------------
-- 3. EJERCICIOS - Verificar estructura de tabla primero  ---
-------------------------------------------------------------

-- Verificar qué columnas existen en la tabla exercises e insertar según corresponda
DO $$ 
DECLARE
    has_old_lesson_id boolean;
    has_lesson_id boolean;
BEGIN
    -- Verificar si existe old_lesson_id
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'exercises' AND column_name = 'old_lesson_id'
    ) INTO has_old_lesson_id;
    
    -- Verificar si existe lesson_id
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'exercises' AND column_name = 'lesson_id'
    ) INTO has_lesson_id;
    
    -- Insertar ejercicios según la estructura de la tabla
    IF has_old_lesson_id AND has_lesson_id THEN
        -- Estructura después de migración: tiene old_lesson_id (NOT NULL) y lesson_id (unit_id)
        
        -- Ejercicios para Saludos y Despedidas
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '¿Cómo saludar?', 'Selecciona el saludo más apropiado para cada momento del día.', 'multiple_choice', 
         '{"question":"¿Cómo saludas por la mañana en español?","options":["Buenas noches","Buenos días","Buenas tardes","Hasta luego"],"correct_answer":"Buenos días","explanation":"Buenos días se usa desde la mañana hasta el mediodía."}'::jsonb, 
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'Completa el saludo', 'Escribe la palabra que falta en cada saludo.', 'fill_blank',
         '{"question":"Completa: ¡____ tardes! ¿Cómo está usted?","correct_answer":"Buenas","acceptable_answers":["buenas"],"explanation":"Buenas tardes es el saludo apropiado desde el mediodía hasta la noche."}'::jsonb,
         15, 2),
        ('950e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'Traduce el saludo', 'Traduce esta expresión del francés al español.', 'translation',
         '{"question":"Bonsoir, comment allez-vous?","correct_answer":"Buenas noches, ¿cómo está usted?","acceptable_answers":["Buenas noches, como esta usted","Buenas noches como esta"],"source_language":"fr","target_language":"es","explanation":"Traducción formal de un saludo nocturno."}'::jsonb,
         20, 3)
        ON CONFLICT (id) DO NOTHING;
        
        -- Ejercicios para Presentaciones Personales
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', 'Me llamo...', 'Elige la forma correcta de presentarse.', 'multiple_choice',
         '{"question":"¿Cuál es la forma más común de decir tu nombre?","options":["Yo soy llamado Juan","Me llamo Juan","Mi nombre es siendo Juan","Soy de nombre Juan"],"correct_answer":"Me llamo Juan","explanation":"Me llamo es la forma más natural y común de presentarse."}'::jsonb,
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', '¿De dónde eres?', 'Completa la pregunta sobre origen.', 'fill_blank',
         '{"question":"¿De ____ eres? - Soy de Francia.","correct_answer":"dónde","acceptable_answers":["donde"],"explanation":"¿De dónde eres? es la pregunta estándar para preguntar el origen."}'::jsonb,
         15, 2),
        ('950e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', 'Presentación completa', 'Traduce esta presentación completa.', 'translation',
         '{"question":"Je m''appelle Pierre, j''ai 25 ans et je suis de Lyon.","correct_answer":"Me llamo Pierre, tengo 25 años y soy de Lyon.","acceptable_answers":["Me llamo Pierre tengo 25 años y soy de Lyon","Soy Pierre, tengo 25 años y soy de Lyon"],"source_language":"fr","target_language":"es","explanation":"Presentación completa con nombre, edad y origen."}'::jsonb,
         20, 3)
        ON CONFLICT (id) DO NOTHING;
        
        -- Ejercicios para Números y Fechas
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440007', '850e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440003', 'Números básicos', 'Selecciona el número correcto.', 'multiple_choice',
         '{"question":"¿Cómo se dice ''quinze'' en español?","options":["Catorce","Quince","Dieciséis","Cincuenta"],"correct_answer":"Quince","explanation":"Quinze en francés es quince en español."}'::jsonb,
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440008', '850e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440003', 'Fecha de hoy', 'Completa la fecha.', 'fill_blank',
         '{"question":"Hoy es ____ de enero.","correct_answer":"veintinueve","acceptable_answers":["29","veinticinco","treinta","uno"],"explanation":"Ejemplo de cómo expresar fechas en español."}'::jsonb,
         15, 2)
        ON CONFLICT (id) DO NOTHING;
        
    ELSIF has_lesson_id THEN
        -- Estructura original: solo lesson_id
        
        -- Ejercicios para Saludos y Despedidas
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '¿Cómo saludar?', 'Selecciona el saludo más apropiado para cada momento del día.', 'multiple_choice', 
         '{"question":"¿Cómo saludas por la mañana en español?","options":["Buenas noches","Buenos días","Buenas tardes","Hasta luego"],"correct_answer":"Buenos días","explanation":"Buenos días se usa desde la mañana hasta el mediodía."}'::jsonb, 
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', 'Completa el saludo', 'Escribe la palabra que falta en cada saludo.', 'fill_blank',
         '{"question":"Completa: ¡____ tardes! ¿Cómo está usted?","correct_answer":"Buenas","acceptable_answers":["buenas"],"explanation":"Buenas tardes es el saludo apropiado desde el mediodía hasta la noche."}'::jsonb,
         15, 2),
        ('950e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 'Traduce el saludo', 'Traduce esta expresión del francés al español.', 'translation',
         '{"question":"Bonsoir, comment allez-vous?","correct_answer":"Buenas noches, ¿cómo está usted?","acceptable_answers":["Buenas noches, como esta usted","Buenas noches como esta"],"source_language":"fr","target_language":"es","explanation":"Traducción formal de un saludo nocturno."}'::jsonb,
         20, 3)
        ON CONFLICT (id) DO NOTHING;
        
        -- Ejercicios para Presentaciones Personales
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440002', 'Me llamo...', 'Elige la forma correcta de presentarse.', 'multiple_choice',
         '{"question":"¿Cuál es la forma más común de decir tu nombre?","options":["Yo soy llamado Juan","Me llamo Juan","Mi nombre es siendo Juan","Soy de nombre Juan"],"correct_answer":"Me llamo Juan","explanation":"Me llamo es la forma más natural y común de presentarse."}'::jsonb,
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440002', '¿De dónde eres?', 'Completa la pregunta sobre origen.', 'fill_blank',
         '{"question":"¿De ____ eres? - Soy de Francia.","correct_answer":"dónde","acceptable_answers":["donde"],"explanation":"¿De dónde eres? es la pregunta estándar para preguntar el origen."}'::jsonb,
         15, 2),
        ('950e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440002', 'Presentación completa', 'Traduce esta presentación completa.', 'translation',
         '{"question":"Je m''appelle Pierre, j''ai 25 ans et je suis de Lyon.","correct_answer":"Me llamo Pierre, tengo 25 años y soy de Lyon.","acceptable_answers":["Me llamo Pierre tengo 25 años y soy de Lyon","Soy Pierre, tengo 25 años y soy de Lyon"],"source_language":"fr","target_language":"es","explanation":"Presentación completa con nombre, edad y origen."}'::jsonb,
         20, 3)
        ON CONFLICT (id) DO NOTHING;
        
        -- Ejercicios para Números y Fechas
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440007', '850e8400-e29b-41d4-a716-446655440003', 'Números básicos', 'Selecciona el número correcto.', 'multiple_choice',
         '{"question":"¿Cómo se dice ''quinze'' en español?","options":["Catorce","Quince","Dieciséis","Cincuenta"],"correct_answer":"Quince","explanation":"Quinze en francés es quince en español."}'::jsonb,
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440008', '850e8400-e29b-41d4-a716-446655440003', 'Fecha de hoy', 'Completa la fecha.', 'fill_blank',
         '{"question":"Hoy es ____ de enero.","correct_answer":"veintinueve","acceptable_answers":["29","veinticinco","treinta","uno"],"explanation":"Ejemplo de cómo expresar fechas en español."}'::jsonb,
         15, 2)
        ON CONFLICT (id) DO NOTHING;
    ELSE
        RAISE EXCEPTION 'La tabla exercises no tiene la estructura esperada';
    END IF;
END $$;

-------------------------------------------------------------
-- 4. ESTRUCTURA BÁSICA PARA OTROS CURSOS                 ---
-------------------------------------------------------------

-- Francés para hispanohablantes - Estructura básica
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
VALUES 
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'Partie 1: Premiers Pas', 1, 'Salutations, présentations et expressions de politesse.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) 
VALUES 
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440004', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440004', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order) 
VALUES 
('850e8400-e29b-41d4-a716-446655440011', '750e8400-e29b-41d4-a716-446655440005', 'exercise', 'Salutations et Politesse', 1),
('850e8400-e29b-41d4-a716-446655440012', '750e8400-e29b-41d4-a716-446655440005', 'exercise', 'Se Présenter', 2)
ON CONFLICT (id) DO NOTHING;

-- Ejercicios para francés (usando la misma lógica condicional)
DO $$ 
DECLARE
    has_old_lesson_id boolean;
    has_lesson_id boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'exercises' AND column_name = 'old_lesson_id'
    ) INTO has_old_lesson_id;
    
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'exercises' AND column_name = 'lesson_id'
    ) INTO has_lesson_id;
    
    IF has_old_lesson_id AND has_lesson_id THEN
        INSERT INTO exercises (id, old_lesson_id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440009', '850e8400-e29b-41d4-a716-446655440011', '850e8400-e29b-41d4-a716-446655440011', 'Comment saluer?', 'Choisissez la salutation appropriée.', 'multiple_choice',
         '{"question":"Comment dit-on ''Hola'' en français?","options":["Au revoir","Bonjour","Bonsoir","Salut"],"correct_answer":"Bonjour","explanation":"Bonjour est la salutation standard en français."}'::jsonb,
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440010', '850e8400-e29b-41d4-a716-446655440012', '850e8400-e29b-41d4-a716-446655440012', 'Je m''appelle...', 'Complétez la présentation.', 'fill_blank',
         '{"question":"Je _______ Marie et je suis espagnole.","correct_answer":"m''appelle","acceptable_answers":["mappelle","me appelle"],"explanation":"Je m''appelle est la façon de dire son nom en français."}'::jsonb,
         15, 1)
        ON CONFLICT (id) DO NOTHING;
    ELSIF has_lesson_id THEN
        INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) 
        VALUES 
        ('950e8400-e29b-41d4-a716-446655440009', '850e8400-e29b-41d4-a716-446655440011', 'Comment saluer?', 'Choisissez la salutation appropriée.', 'multiple_choice',
         '{"question":"Comment dit-on ''Hola'' en français?","options":["Au revoir","Bonjour","Bonsoir","Salut"],"correct_answer":"Bonjour","explanation":"Bonjour est la salutation standard en français."}'::jsonb,
         10, 1),
        ('950e8400-e29b-41d4-a716-446655440010', '850e8400-e29b-41d4-a716-446655440012', 'Je m''appelle...', 'Complétez la présentation.', 'fill_blank',
         '{"question":"Je _______ Marie et je suis espagnole.","correct_answer":"m''appelle","acceptable_answers":["mappelle","me appelle"],"explanation":"Je m''appelle est la façon de dire son nom en français."}'::jsonb,
         15, 1)
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- Portugués para hispanohablantes
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
VALUES 
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Parte 1: Primeiros Passos', 1, 'Cumprimentos, apresentações e expressões básicas de cortesia.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) 
VALUES 
('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440005', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440005', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order) 
VALUES 
('850e8400-e29b-41d4-a716-446655440013', '750e8400-e29b-41d4-a716-446655440007', 'exercise', 'Cumprimentos Básicos', 1),
('850e8400-e29b-41d4-a716-446655440014', '750e8400-e29b-41d4-a716-446655440007', 'exercise', 'Apresentações', 2)
ON CONFLICT (id) DO NOTHING;

-- Italiano para hispanohablantes
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
VALUES 
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007', 'Parte 1: Primi Passi', 1, 'Saluti, presentazioni ed espressioni di cortesia.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) 
VALUES 
('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440006', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440006', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order) 
VALUES 
('850e8400-e29b-41d4-a716-446655440015', '750e8400-e29b-41d4-a716-446655440009', 'exercise', 'Saluti e Cortesia', 1),
('850e8400-e29b-41d4-a716-446655440016', '750e8400-e29b-41d4-a716-446655440009', 'exercise', 'Presentazioni', 2)
ON CONFLICT (id) DO NOTHING;

-- Inglés para hispanohablantes
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
VALUES 
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440009', 'Part 1: First Steps', 1, 'Greetings, introductions and basic courtesy expressions.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order) 
VALUES 
('750e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440007', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440007', 'conversation', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO units (id, phase_id, kind, title, unit_order) 
VALUES 
('850e8400-e29b-41d4-a716-446655440017', '750e8400-e29b-41d4-a716-446655440011', 'exercise', 'Basic Greetings', 1),
('850e8400-e29b-41d4-a716-446655440018', '750e8400-e29b-41d4-a716-446655440011', 'exercise', 'Introductions', 2)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- Mensaje de confirmación
SELECT 'Datos de muestra creados exitosamente' as resultado,
       (SELECT COUNT(*) FROM courses) as total_cursos,
       (SELECT COUNT(*) FROM parts) as total_partes,
       (SELECT COUNT(*) FROM phases) as total_fases,
       (SELECT COUNT(*) FROM units) as total_unidades,
       (SELECT COUNT(*) FROM exercises) as total_ejercicios;