/*
  # Actualizar estructura de cursos para organización por idiomas

  1. Cambios en la tabla courses
    - Modificar la estructura para que cada curso represente un idioma específico
    - Actualizar datos existentes para reflejar la nueva organización
    - Añadir campos adicionales para mejor organización

  2. Datos de ejemplo
    - Crear cursos específicos por idioma
    - Configurar niveles dentro de cada idioma
    - Establecer relaciones apropiadas entre idiomas
*/

-- Primero, limpiar datos existentes para la nueva estructura
DELETE FROM user_progress;
DELETE FROM lessons;
DELETE FROM exercises;
DELETE FROM courses;

-- Insertar cursos organizados por idiomas
-- Cursos para usuarios que vienen del español
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
-- Italiano desde español
(gen_random_uuid(), 'Italiano para hispanohablantes', 'Aprende italiano aprovechando tu conocimiento del español. Descubre las similitudes y diferencias entre estas dos lenguas hermanas.', 'it', 'es', 'beginner', 24, 30, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Francés desde español
(gen_random_uuid(), 'Francés para hispanohablantes', 'Domina el francés utilizando las bases del español. Explora las conexiones latinas entre ambos idiomas.', 'fr', 'es', 'beginner', 28, 35, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Portugués desde español
(gen_random_uuid(), 'Portugués para hispanohablantes', 'Aprende portugués de forma natural aprovechando tu español. Descubre por qué son tan similares y dónde difieren.', 'pt', 'es', 'beginner', 22, 28, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Cursos para usuarios que vienen del francés
-- Español desde francés
(gen_random_uuid(), 'Español para francófonos', 'Aprende español utilizando tu conocimiento del francés. Aprovecha las raíces latinas compartidas.', 'es', 'fr', 'beginner', 26, 32, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Italiano desde francés
(gen_random_uuid(), 'Italiano para francófonos', 'Domina el italiano desde el francés. Explora las similitudes románicas entre estas lenguas.', 'it', 'fr', 'beginner', 25, 31, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Portugués desde francés
(gen_random_uuid(), 'Portugués para francófonos', 'Aprende portugués aprovechando tu francés. Descubre las conexiones entre estas lenguas romances.', 'pt', 'fr', 'beginner', 24, 30, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Cursos para usuarios que vienen del italiano
-- Español desde italiano
(gen_random_uuid(), 'Español para italófonos', 'Aprende español desde el italiano. Aprovecha las similitudes fonéticas y léxicas.', 'es', 'it', 'beginner', 23, 29, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Francés desde italiano
(gen_random_uuid(), 'Francés para italófonos', 'Domina el francés utilizando tu italiano. Explora las raíces latinas compartidas.', 'fr', 'it', 'beginner', 27, 34, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Portugués desde italiano
(gen_random_uuid(), 'Portugués para italófonos', 'Aprende portugués aprovechando tu conocimiento del italiano.', 'pt', 'it', 'beginner', 25, 31, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Cursos para usuarios que vienen del portugués
-- Español desde portugués
(gen_random_uuid(), 'Español para lusófonos', 'Aprende español desde el portugués. Aprovecha las similitudes ibéricas.', 'es', 'pt', 'beginner', 20, 25, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Francés desde portugués
(gen_random_uuid(), 'Francés para lusófonos', 'Domina el francés utilizando tu portugués. Explora las conexiones románicas.', 'fr', 'pt', 'beginner', 29, 36, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Italiano desde portugués
(gen_random_uuid(), 'Italiano para lusófonos', 'Aprende italiano aprovechando tu conocimiento del portugués.', 'it', 'pt', 'beginner', 26, 32, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Cursos para usuarios que vienen del inglés
-- Español desde inglés
(gen_random_uuid(), 'Español para anglófonos', 'Aprende español desde cero con un enfoque especial para hablantes de inglés.', 'es', 'en', 'beginner', 32, 40, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Francés desde inglés
(gen_random_uuid(), 'Francés para anglófonos', 'Domina el francés desde el inglés. Aprende una de las lenguas más elegantes del mundo.', 'fr', 'en', 'beginner', 35, 44, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Italiano desde inglés
(gen_random_uuid(), 'Italiano para anglófonos', 'Aprende italiano desde el inglés. Descubre la lengua de la cultura y el arte.', 'it', 'en', 'beginner', 30, 38, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now()),

-- Portugués desde inglés
(gen_random_uuid(), 'Portugués para anglófonos', 'Aprende portugués desde el inglés. Conecta con 260 millones de hablantes.', 'pt', 'en', 'beginner', 33, 41, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Añadir algunas lecciones de ejemplo para cada curso
DO $$
DECLARE
    course_record RECORD;
    lesson_count INTEGER;
BEGIN
    FOR course_record IN SELECT id, target_language, total_lessons FROM courses LOOP
        FOR lesson_count IN 1..LEAST(course_record.total_lessons, 5) LOOP
            INSERT INTO lessons (id, course_id, title, description, content, lesson_order, lesson_type, estimated_minutes, created_at, updated_at)
            VALUES (
                gen_random_uuid(),
                course_record.id,
                CASE 
                    WHEN lesson_count = 1 THEN 'Introducción y primeras palabras'
                    WHEN lesson_count = 2 THEN 'Saludos y presentaciones'
                    WHEN lesson_count = 3 THEN 'Números y tiempo'
                    WHEN lesson_count = 4 THEN 'Familia y relaciones'
                    WHEN lesson_count = 5 THEN 'Comida y restaurantes'
                END,
                CASE 
                    WHEN lesson_count = 1 THEN 'Aprende las palabras más importantes y útiles para comenzar tu viaje.'
                    WHEN lesson_count = 2 THEN 'Domina los saludos básicos y aprende a presentarte.'
                    WHEN lesson_count = 3 THEN 'Números, días de la semana y expresiones de tiempo.'
                    WHEN lesson_count = 4 THEN 'Vocabulario sobre familia y relaciones personales.'
                    WHEN lesson_count = 5 THEN 'Aprende a pedir comida y desenvolverte en restaurantes.'
                END,
                'Contenido de la lección ' || lesson_count || ' para ' || course_record.target_language,
                lesson_count,
                CASE 
                    WHEN lesson_count = 1 THEN 'vocabulary'
                    WHEN lesson_count = 2 THEN 'conversation'
                    WHEN lesson_count = 3 THEN 'vocabulary'
                    WHEN lesson_count = 4 THEN 'vocabulary'
                    WHEN lesson_count = 5 THEN 'conversation'
                END,
                15,
                now(),
                now()
            );
        END LOOP;
    END LOOP;
END $$;