-- Script de datos de muestra para Dialectio
-- Ejecutar después de las migraciones principales
-- Este script crea cursos completos con estructura de Parts -> Phases -> Units -> Exercises

BEGIN;

-- Limpiar datos existentes (opcional, comentar si quieres mantener datos)
-- DELETE FROM exercises;
-- DELETE FROM units;
-- DELETE FROM phases;
-- DELETE FROM parts;
-- DELETE FROM courses WHERE title LIKE '%para %';

-------------------------------------------------------------
-- 1. CURSOS DE MUESTRA                                   ---
-------------------------------------------------------------

-- Español para francófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Español Básico para Francófonos', 'Aprende español aprovechando tu conocimiento del francés. Curso diseñado específicamente para hablantes nativos de francés.', 'es', 'fr', 'beginner', 15, 8, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', false),
('550e8400-e29b-41d4-a716-446655440002', 'Español Intermedio para Francófonos', 'Profundiza tu español con estructuras más complejas y vocabulario avanzado.', 'es', 'fr', 'intermediate', 20, 12, 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg', true);

-- Francés para hispanohablantes  
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'Français Débutant pour Hispanophones', 'Découvre le français en utilisant tes connaissances de l''espagnol. Méthode adaptée aux hispanophones.', 'fr', 'es', 'beginner', 18, 10, 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg', false),
('550e8400-e29b-41d4-a716-446655440004', 'Français Intermédiaire pour Hispanophones', 'Perfectionne ton français avec des structures avancées et un vocabulaire riche.', 'fr', 'es', 'intermediate', 22, 14, 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg', true);

-- Portugués para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440005', 'Português Básico para Hispanohablantes', 'Aprende portugués de forma rápida aprovechando las similitudes con el español.', 'pt', 'es', 'beginner', 16, 9, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', false),
('550e8400-e29b-41d4-a716-446655440006', 'Português Intermedio para Hispanohablantes', 'Domina las diferencias sutiles entre español y portugués.', 'pt', 'es', 'intermediate', 20, 12, 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg', true);

-- Italiano para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440007', 'Italiano Básico para Hispanohablantes', 'Descubre la belleza del italiano usando tu base de español.', 'it', 'es', 'beginner', 17, 9, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg', false),
('550e8400-e29b-41d4-a716-446655440008', 'Italiano Intermedio para Hispanohablantes', 'Perfecciona tu italiano con expresiones auténticas y cultura italiana.', 'it', 'es', 'intermediate', 21, 13, 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg', true);

-- Inglés para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium) VALUES
('550e8400-e29b-41d4-a716-446655440009', 'English Basics for Spanish Speakers', 'Learn English efficiently using your Spanish knowledge as a foundation.', 'en', 'es', 'beginner', 20, 12, 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg', false);

-------------------------------------------------------------
-- 2. ESTRUCTURA PARA ESPAÑOL BÁSICO PARA FRANCÓFONOS     ---
-------------------------------------------------------------

-- Parts
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Parte 1: Primeros Pasos', 1, 'Saludos, presentaciones y expresiones básicas de cortesía.'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Parte 2: Vida Cotidiana', 2, 'Vocabulario y situaciones del día a día: familia, trabajo, tiempo libre.'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Parte 3: En la Ciudad', 3, 'Orientación, transporte, compras y servicios urbanos.');

-- Phases para Parte 1
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'conversation', 2);

-- Phases para Parte 2
INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', 'conversation', 2);

-- Units para Parte 1 - Preparation
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Saludos y Despedidas', 1),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Presentaciones Personales', 2),
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Números y Fechas', 3),
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Expresiones de Cortesía', 4),
('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440001', 'exercise', 'Países y Nacionalidades', 5);

-- Units para Parte 1 - Conversation  
INSERT INTO units (id, phase_id, kind, title, unit_order, agent_name, agent_prompt) VALUES
('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440002', 'situation', 'Encuentro Casual', 1, 'María', 'Eres María, una española amigable que conoce a alguien por primera vez en un café. Ayuda al estudiante a practicar saludos y presentaciones de forma natural.'),
('850e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440002', 'situation', 'En la Recepción', 2, 'Carlos', 'Eres Carlos, recepcionista de un hotel en Madrid. Ayuda al estudiante a practicar el registro y preguntas básicas de cortesía.');

-- Units para Parte 2 - Preparation
INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('850e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'La Familia', 1),
('850e8400-e29b-41d4-a716-446655440009', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'Profesiones y Trabajo', 2),
('850e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440003', 'exercise', 'Tiempo Libre y Hobbies', 3);

-------------------------------------------------------------
-- 3. EJERCICIOS PARA SALUDOS Y DESPEDIDAS                ---
-------------------------------------------------------------

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', '¿Cómo saludar?', 'Selecciona el saludo más apropiado para cada momento del día.', 'multiple_choice', 
 '{"question":"¿Cómo saludas por la mañana en español?","options":["Buenas noches","Buenos días","Buenas tardes","Hasta luego"],"correct_answer":"Buenos días","explanation":"Buenos días se usa desde la mañana hasta el mediodía."}', 
 10, 1),

('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', 'Completa el saludo', 'Escribe la palabra que falta en cada saludo.', 'fill_blank',
 '{"question":"Completa: ¡____ tardes! ¿Cómo está usted?","correct_answer":"Buenas","acceptable_answers":["buenas"],"explanation":"Buenas tardes es el saludo apropiado desde el mediodía hasta la noche."}',
 15, 2),

('950e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 'Traduce el saludo', 'Traduce esta expresión del francés al español.', 'translation',
 '{"question":"Bonsoir, comment allez-vous?","correct_answer":"Buenas noches, ¿cómo está usted?","acceptable_answers":["Buenas noches, como esta usted","Buenas noches como esta"],"source_language":"fr","target_language":"es","explanation":"Traducción formal de un saludo nocturno."}',
 20, 3);

-------------------------------------------------------------
-- 4. EJERCICIOS PARA PRESENTACIONES PERSONALES           ---
-------------------------------------------------------------

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440002', 'Me llamo...', 'Elige la forma correcta de presentarse.', 'multiple_choice',
 '{"question":"¿Cuál es la forma más común de decir tu nombre?","options":["Yo soy llamado Juan","Me llamo Juan","Mi nombre es siendo Juan","Soy de nombre Juan"],"correct_answer":"Me llamo Juan","explanation":"Me llamo es la forma más natural y común de presentarse."}',
 10, 1),

('950e8400-e29b-41d4-a716-446655440005', '850e8400-e29b-41d4-a716-446655440002', '¿De dónde eres?', 'Completa la pregunta sobre origen.', 'fill_blank',
 '{"question":"¿De ____ eres? - Soy de Francia.","correct_answer":"dónde","acceptable_answers":["donde"],"explanation":"¿De dónde eres? es la pregunta estándar para preguntar el origen."}',
 15, 2),

('950e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440002', 'Presentación completa', 'Traduce esta presentación completa.', 'translation',
 '{"question":"Je m''appelle Pierre, j''ai 25 ans et je suis de Lyon.","correct_answer":"Me llamo Pierre, tengo 25 años y soy de Lyon.","acceptable_answers":["Me llamo Pierre tengo 25 años y soy de Lyon","Soy Pierre, tengo 25 años y soy de Lyon"],"source_language":"fr","target_language":"es","explanation":"Presentación completa con nombre, edad y origen."}',
 20, 3);

-------------------------------------------------------------
-- 5. EJERCICIOS PARA NÚMEROS Y FECHAS                    ---
-------------------------------------------------------------

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440007', '850e8400-e29b-41d4-a716-446655440003', 'Números básicos', 'Selecciona el número correcto.', 'multiple_choice',
 '{"question":"¿Cómo se dice ''quinze'' en español?","options":["Catorce","Quince","Dieciséis","Cincuenta"],"correct_answer":"Quince","explanation":"Quinze en francés es quince en español."}',
 10, 1),

('950e8400-e29b-41d4-a716-446655440008', '850e8400-e29b-41d4-a716-446655440003', 'Fecha de hoy', 'Completa la fecha.', 'fill_blank',
 '{"question":"Hoy es ____ de enero.","correct_answer":"veintinueve","acceptable_answers":["29","veinticinco","treinta","uno"],"explanation":"Ejemplo de cómo expresar fechas en español."}',
 15, 2);

-------------------------------------------------------------
-- 6. ESTRUCTURA BÁSICA PARA OTROS CURSOS                 ---
-------------------------------------------------------------

-- Francés para hispanohablantes - Estructura básica
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'Partie 1: Premiers Pas', 1, 'Salutations, présentations et expressions de politesse.');

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440004', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440004', 'conversation', 2);

INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('850e8400-e29b-41d4-a716-446655440011', '750e8400-e29b-41d4-a716-446655440005', 'exercise', 'Salutations et Politesse', 1),
('850e8400-e29b-41d4-a716-446655440012', '750e8400-e29b-41d4-a716-446655440005', 'exercise', 'Se Présenter', 2);

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440009', '850e8400-e29b-41d4-a716-446655440011', 'Comment saluer?', 'Choisissez la salutation appropriée.', 'multiple_choice',
 '{"question":"Comment dit-on ''Hola'' en français?","options":["Au revoir","Bonjour","Bonsoir","Salut"],"correct_answer":"Bonjour","explanation":"Bonjour est la salutation standard en français."}',
 10, 1),

('950e8400-e29b-41d4-a716-446655440010', '850e8400-e29b-41d4-a716-446655440012', 'Je m''appelle...', 'Complétez la présentation.', 'fill_blank',
 '{"question":"Je _______ Marie et je suis espagnole.","correct_answer":"m''appelle","acceptable_answers":["mappelle","me appelle"],"explanation":"Je m''appelle est la façon de dire son nom en français."}',
 15, 1);

-- Portugués para hispanohablantes - Estructura básica
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Parte 1: Primeiros Passos', 1, 'Cumprimentos, apresentações e expressões básicas de cortesia.');

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440005', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440005', 'conversation', 2);

INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('850e8400-e29b-41d4-a716-446655440013', '750e8400-e29b-41d4-a716-446655440007', 'exercise', 'Cumprimentos Básicos', 1),
('850e8400-e29b-41d4-a716-446655440014', '750e8400-e29b-41d4-a716-446655440007', 'exercise', 'Apresentações', 2);

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440011', '850e8400-e29b-41d4-a716-446655440013', 'Como cumprimentar?', 'Escolha o cumprimento apropriado.', 'multiple_choice',
 '{"question":"Como se diz ''Hola'' em português?","options":["Tchau","Olá","Boa noite","Até logo"],"correct_answer":"Olá","explanation":"Olá é o cumprimento padrão em português."}',
 10, 1),

('950e8400-e29b-41d4-a716-446655440012', '850e8400-e29b-41d4-a716-446655440014', 'Eu me chamo...', 'Complete a apresentação.', 'fill_blank',
 '{"question":"Eu me _____ Ana e sou do Brasil.","correct_answer":"chamo","acceptable_answers":["llamo"],"explanation":"Eu me chamo é a forma de dizer o nome em português."}',
 15, 1);

-- Italiano para hispanohablantes - Estructura básica
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007', 'Parte 1: Primi Passi', 1, 'Saluti, presentazioni ed espressioni di cortesia.');

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440006', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440006', 'conversation', 2);

INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('850e8400-e29b-41d4-a716-446655440015', '750e8400-e29b-41d4-a716-446655440009', 'exercise', 'Saluti e Cortesia', 1),
('850e8400-e29b-41d4-a716-446655440016', '750e8400-e29b-41d4-a716-446655440009', 'exercise', 'Presentazioni', 2);

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440013', '850e8400-e29b-41d4-a716-446655440015', 'Come salutare?', 'Scegli il saluto appropriato.', 'multiple_choice',
 '{"question":"Come si dice ''Hola'' in italiano?","options":["Arrivederci","Ciao","Buonasera","A presto"],"correct_answer":"Ciao","explanation":"Ciao è il saluto standard informale in italiano."}',
 10, 1),

('950e8400-e29b-41d4-a716-446655440014', '850e8400-e29b-41d4-a716-446655440016', 'Mi chiamo...', 'Completa la presentazione.', 'fill_blank',
 '{"question":"Mi _____ Marco e sono di Roma.","correct_answer":"chiamo","acceptable_answers":["llamo"],"explanation":"Mi chiamo è il modo di dire il proprio nome in italiano."}',
 15, 1);

-- Inglés para hispanohablantes - Estructura básica
INSERT INTO parts (id, course_id, title, part_order, synopsis) VALUES
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440009', 'Part 1: First Steps', 1, 'Greetings, introductions and basic courtesy expressions.');

INSERT INTO phases (id, part_id, kind, phase_order) VALUES
('750e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440007', 'preparation', 1),
('750e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440007', 'conversation', 2);

INSERT INTO units (id, phase_id, kind, title, unit_order) VALUES
('850e8400-e29b-41d4-a716-446655440017', '750e8400-e29b-41d4-a716-446655440011', 'exercise', 'Basic Greetings', 1),
('850e8400-e29b-41d4-a716-446655440018', '750e8400-e29b-41d4-a716-446655440011', 'exercise', 'Introductions', 2);

INSERT INTO exercises (id, lesson_id, title, instructions, exercise_type, content, points, exercise_order) VALUES
('950e8400-e29b-41d4-a716-446655440015', '850e8400-e29b-41d4-a716-446655440017', 'How to greet?', 'Choose the appropriate greeting.', 'multiple_choice',
 '{"question":"How do you say ''Hola'' in English?","options":["Goodbye","Hello","Good night","See you later"],"correct_answer":"Hello","explanation":"Hello is the standard greeting in English."}',
 10, 1),

('950e8400-e29b-41d4-a716-446655440016', '850e8400-e29b-41d4-a716-446655440018', 'My name is...', 'Complete the introduction.', 'fill_blank',
 '{"question":"My _____ is John and I am from Spain.","correct_answer":"name","acceptable_answers":["nombre"],"explanation":"My name is the way to say your name in English."}',
 15, 1);

COMMIT;

-- Mensaje de confirmación
SELECT 'Datos de muestra creados exitosamente' as resultado,
       (SELECT COUNT(*) FROM courses) as total_cursos,
       (SELECT COUNT(*) FROM parts) as total_partes,
       (SELECT COUNT(*) FROM phases) as total_fases,
       (SELECT COUNT(*) FROM units) as total_unidades,
       (SELECT COUNT(*) FROM exercises) as total_ejercicios;