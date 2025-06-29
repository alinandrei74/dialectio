-- Actualizar datos de muestra para eliminar niveles y asegurar un curso por idioma
-- Esta migración actualiza los cursos existentes y elimina duplicados

BEGIN;

-- 1. Eliminar cursos duplicados manteniendo solo uno por combinación de idiomas
-- Primero, identificar y eliminar cursos intermedios y avanzados
DELETE FROM courses 
WHERE title LIKE '%Intermedio%' OR title LIKE '%Intermédiaire%' OR title LIKE '%Intermediate%';

-- 2. Actualizar títulos de cursos para eliminar referencias a niveles
UPDATE courses 
SET title = CASE 
    WHEN target_language = 'es' AND source_language = 'fr' THEN 'Español para Francófonos'
    WHEN target_language = 'fr' AND source_language = 'es' THEN 'Français pour Hispanophones'
    WHEN target_language = 'pt' AND source_language = 'es' THEN 'Português para Hispanohablantes'
    WHEN target_language = 'it' AND source_language = 'es' THEN 'Italiano para Hispanohablantes'
    WHEN target_language = 'en' AND source_language = 'es' THEN 'English for Spanish Speakers'
    ELSE title
END,
description = CASE 
    WHEN target_language = 'es' AND source_language = 'fr' THEN 'Aprende español aprovechando tu conocimiento del francés. Curso completo desde principiante hasta avanzado.'
    WHEN target_language = 'fr' AND source_language = 'es' THEN 'Découvre le français en utilisant tes connaissances de l''espagnol. Cours complet du débutant à l''avancé.'
    WHEN target_language = 'pt' AND source_language = 'es' THEN 'Aprende portugués de forma rápida aprovechando las similitudes con el español. Curso completo.'
    WHEN target_language = 'it' AND source_language = 'es' THEN 'Descubre la belleza del italiano usando tu base de español. Curso completo.'
    WHEN target_language = 'en' AND source_language = 'es' THEN 'Learn English efficiently using your Spanish knowledge as a foundation. Complete course.'
    ELSE description
END,
total_lessons = CASE 
    WHEN target_language = 'es' AND source_language = 'fr' THEN 25
    WHEN target_language = 'fr' AND source_language = 'es' THEN 28
    WHEN target_language = 'pt' AND source_language = 'es' THEN 24
    WHEN target_language = 'it' AND source_language = 'es' THEN 26
    WHEN target_language = 'en' AND source_language = 'es' THEN 30
    ELSE total_lessons
END,
estimated_hours = CASE 
    WHEN target_language = 'es' AND source_language = 'fr' THEN 15
    WHEN target_language = 'fr' AND source_language = 'es' THEN 18
    WHEN target_language = 'pt' AND source_language = 'es' THEN 16
    WHEN target_language = 'it' AND source_language = 'es' THEN 17
    WHEN target_language = 'en' AND source_language = 'es' THEN 20
    ELSE estimated_hours
END
WHERE title LIKE '%Básico%' OR title LIKE '%Débutant%' OR title LIKE '%Basics%';

-- 3. Insertar cursos adicionales si no existen (para completar todas las combinaciones principales)
INSERT INTO courses (id, title, description, target_language, source_language, total_lessons, estimated_hours, image_url, is_premium) 
VALUES 
-- Español desde otros idiomas
('550e8400-e29b-41d4-a716-446655440010', 'Español para Lusófonos', 'Aprende español aprovechando tu conocimiento del portugués. Curso adaptado para hablantes de portugués.', 'es', 'pt', 22, 14, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', false),
('550e8400-e29b-41d4-a716-446655440011', 'Español para Italófonos', 'Aprende español aprovechando tu conocimiento del italiano. Curso adaptado para hablantes de italiano.', 'es', 'it', 23, 15, 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg', false),

-- Francés desde otros idiomas
('550e8400-e29b-41d4-a716-446655440012', 'Français pour Lusophones', 'Apprenez le français en utilisant vos connaissances du portugais. Cours adapté aux locuteurs portugais.', 'fr', 'pt', 26, 16, 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg', false),
('550e8400-e29b-41d4-a716-446655440013', 'Français pour Italophones', 'Apprenez le français en utilisant vos connaissances de l''italien. Cours adapté aux locuteurs italiens.', 'fr', 'it', 24, 15, 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg', false),

-- Portugués desde otros idiomas
('550e8400-e29b-41d4-a716-446655440014', 'Português para Francófonos', 'Aprenda português usando seu conhecimento do francês. Curso adaptado para falantes de francês.', 'pt', 'fr', 25, 16, 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', false),
('550e8400-e29b-41d4-a716-446655440015', 'Português para Italófonos', 'Aprenda português usando seu conhecimento do italiano. Curso adaptado para falantes de italiano.', 'pt', 'it', 24, 15, 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg', false),

-- Italiano desde otros idiomas
('550e8400-e29b-41d4-a716-446655440016', 'Italiano para Francófonos', 'Scopri l''italiano usando la tua conoscenza del francese. Corso adattato per i francofoni.', 'it', 'fr', 25, 16, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg', false),
('550e8400-e29b-41d4-a716-446655440017', 'Italiano para Lusófonos', 'Scopri l''italiano usando la tua conoscenza del portoghese. Corso adattato per i lusofoni.', 'it', 'pt', 24, 15, 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg', false)

ON CONFLICT (target_language, source_language) DO NOTHING;

-- 4. Crear estructura básica para los nuevos cursos (una parte por curso)
INSERT INTO parts (id, course_id, title, part_order, synopsis) 
SELECT 
    gen_random_uuid(),
    c.id,
    CASE 
        WHEN c.target_language = 'es' THEN 'Parte 1: Fundamentos del Español'
        WHEN c.target_language = 'fr' THEN 'Partie 1: Fondements du Français'
        WHEN c.target_language = 'pt' THEN 'Parte 1: Fundamentos do Português'
        WHEN c.target_language = 'it' THEN 'Parte 1: Fondamenti dell''Italiano'
        WHEN c.target_language = 'en' THEN 'Part 1: English Fundamentals'
        ELSE 'Parte 1: Fundamentos'
    END,
    1,
    CASE 
        WHEN c.target_language = 'es' THEN 'Introducción al español: saludos, presentaciones y vocabulario esencial.'
        WHEN c.target_language = 'fr' THEN 'Introduction au français: salutations, présentations et vocabulaire essentiel.'
        WHEN c.target_language = 'pt' THEN 'Introdução ao português: cumprimentos, apresentações e vocabulário essencial.'
        WHEN c.target_language = 'it' THEN 'Introduzione all''italiano: saluti, presentazioni e vocabolario essenziale.'
        WHEN c.target_language = 'en' THEN 'Introduction to English: greetings, introductions and essential vocabulary.'
        ELSE 'Introducción al idioma: conceptos fundamentales.'
    END
FROM courses c
WHERE c.id IN (
    '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440015',
    '550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440017'
)
ON CONFLICT DO NOTHING;

-- 5. Crear fases para las nuevas partes
INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
    gen_random_uuid(),
    p.id,
    'preparation',
    1
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.id IN (
    '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440015',
    '550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440017'
)
ON CONFLICT DO NOTHING;

INSERT INTO phases (id, part_id, kind, phase_order)
SELECT 
    gen_random_uuid(),
    p.id,
    'conversation',
    2
FROM parts p
JOIN courses c ON c.id = p.course_id
WHERE c.id IN (
    '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440015',
    '550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440017'
)
ON CONFLICT DO NOTHING;

-- 6. Crear unidades básicas para las nuevas fases
INSERT INTO units (id, phase_id, kind, title, unit_order)
SELECT 
    gen_random_uuid(),
    ph.id,
    'exercise',
    CASE 
        WHEN c.target_language = 'es' THEN 'Saludos y Presentaciones'
        WHEN c.target_language = 'fr' THEN 'Salutations et Présentations'
        WHEN c.target_language = 'pt' THEN 'Cumprimentos e Apresentações'
        WHEN c.target_language = 'it' THEN 'Saluti e Presentazioni'
        WHEN c.target_language = 'en' THEN 'Greetings and Introductions'
        ELSE 'Saludos y Presentaciones'
    END,
    1
FROM phases ph
JOIN parts p ON p.id = ph.part_id
JOIN courses c ON c.id = p.course_id
WHERE ph.kind = 'preparation'
AND c.id IN (
    '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011',
    '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440013',
    '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440015',
    '550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440017'
)
ON CONFLICT DO NOTHING;

COMMIT;

-- Mensaje de confirmación
SELECT 'Datos de muestra actualizados - niveles eliminados' as resultado,
       (SELECT COUNT(*) FROM courses) as total_cursos,
       (SELECT COUNT(DISTINCT target_language || '-' || source_language) FROM courses) as combinaciones_idiomas;