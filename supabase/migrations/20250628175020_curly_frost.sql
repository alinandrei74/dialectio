/*
  # Crear contenido detallado para cursos específicos

  1. Limpiar datos existentes
  2. Crear cursos con contenido específico y detallado
  3. Añadir lecciones estructuradas para cada curso
  4. Crear ejercicios variados y apropiados para cada idioma
*/

-- Limpiar datos existentes
DELETE FROM user_exercise_results;
DELETE FROM exercises;
DELETE FROM user_progress;
DELETE FROM lessons;
DELETE FROM courses;

-- ============================================================================
-- CURSOS DESDE ESPAÑOL
-- ============================================================================

-- Italiano para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-es-it-001', 'Descubre Italia: Italiano para Hispanohablantes', 'Sumérgete en la bella lengua italiana aprovechando tu español. Desde las similitudes hasta las diferencias únicas, este curso te llevará desde "Ciao" hasta conversaciones fluidas sobre arte, comida y cultura italiana.', 'it', 'es', 'beginner', 20, 25, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Francés para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-es-fr-001', 'Découvre la France: Francés para Hispanohablantes', 'Explora la elegancia del francés utilizando tu conocimiento del español. Desde los cafés parisinos hasta los châteaux del Loira, aprende el idioma del amor y la cultura.', 'fr', 'es', 'beginner', 22, 28, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Portugués para hispanohablantes
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-es-pt-001', 'Descobre o Brasil: Portugués para Hispanohablantes', 'Conecta con 260 millones de hablantes de portugués. Desde las playas de Río hasta las calles de Lisboa, domina este idioma hermano del español con facilidad sorprendente.', 'pt', 'es', 'beginner', 18, 23, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- ============================================================================
-- CURSOS DESDE FRANCÉS
-- ============================================================================

-- Español para francófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-fr-es-001', 'Descubre España: Español para Francófonos', 'Desde tu francés hacia el vibrante mundo hispanohablante. Explora desde las tapas españolas hasta el tango argentino, conectando con más de 500 millones de personas.', 'es', 'fr', 'beginner', 24, 30, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Italiano para francófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-fr-it-001', 'Scopri l\'Italia: Italiano para Francófonos', 'Del francés al italiano: un viaje entre lenguas hermanas. Descubre la pasión italiana, desde la ópera hasta la cucina, aprovechando las similitudes románicas.', 'it', 'fr', 'beginner', 21, 26, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Portugués para francófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-fr-pt-001', 'Descobre o Mundo Lusófono: Portugués para Francófonos', 'Desde el francés hacia el portugués: explora Brasil, Portugal y el mundo lusófono. Una aventura lingüística que te conectará con culturas fascinantes.', 'pt', 'fr', 'beginner', 23, 29, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- ============================================================================
-- CURSOS DESDE ITALIANO
-- ============================================================================

-- Español para italófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-it-es-001', 'Descubre el Mundo Hispano: Español para Italófonos', 'Dal italiano allo spagnolo: un ponte tra culture latine. Explora desde Andalucía hasta Patagonia, aprovechando las similitudes fonéticas únicas.', 'es', 'it', 'beginner', 19, 24, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Francés para italófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-it-fr-001', 'Découvre la France: Francés para Italófonos', 'Dall\'italiano al francese: eleganza y sofisticación. Desde la Riviera hasta los Alpes, domina la langue de Molière con tu base italiana.', 'fr', 'it', 'beginner', 25, 31, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Portugués para italófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-it-pt-001', 'Descobre o Brasil: Portugués para Italófonos', 'Dal italiano al portoghese: ritmo y melodía. Conecta con la alegría brasileña y la elegancia portuguesa usando tu italiano como puente.', 'pt', 'it', 'beginner', 22, 27, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- ============================================================================
-- CURSOS DESDE PORTUGUÉS
-- ============================================================================

-- Español para lusófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-pt-es-001', 'Descubre España: Español para Lusófonos', 'Do português ao espanhol: irmãos ibéricos unidos. Explora las sutiles diferencias y sorprendentes similitudes entre estas lenguas vecinas.', 'es', 'pt', 'beginner', 16, 20, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Francés para lusófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-pt-fr-001', 'Découvre la France: Francés para Lusófonos', 'Do português ao francês: elegância e refinamento. Desde o português melódico até a sofisticação francesa, uma jornada linguística única.', 'fr', 'pt', 'beginner', 26, 33, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Italiano para lusófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-pt-it-001', 'Scopri l\'Italia: Italiano para Lusófonos', 'Do português ao italiano: paixão e expressividade. Descobre a bella lingua italiana aproveitando a musicalidade do português.', 'it', 'pt', 'beginner', 20, 25, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- ============================================================================
-- CURSOS DESDE INGLÉS
-- ============================================================================

-- Español para anglófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-en-es-001', 'Discover the Spanish World: Español para Anglófonos', 'From English to Spanish: unlock a world of 500+ million speakers. From Mexican mariachi to Argentine tango, master the language of passion and culture.', 'es', 'en', 'beginner', 30, 38, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Francés para anglófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-en-fr-001', 'Discover France: Francés para Anglófonos', 'From English to French: embrace elegance and sophistication. Master the language of diplomacy, cuisine, and romance with structured, engaging lessons.', 'fr', 'en', 'beginner', 32, 40, 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Italiano para anglófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-en-it-001', 'Discover Italy: Italiano para Anglófonos', 'From English to Italian: art, culture, and la dolce vita. Learn the language of Renaissance masters and modern Italian creativity.', 'it', 'en', 'beginner', 28, 35, 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());

-- Portugués para anglófonos
INSERT INTO courses (id, title, description, target_language, source_language, level, total_lessons, estimated_hours, image_url, is_premium, created_at, updated_at) VALUES
('course-en-pt-001', 'Discover the Portuguese World: Portugués para Anglófonos', 'From English to Portuguese: connect with Brazil, Portugal, and beyond. Master this melodic language spoken by 260+ million people worldwide.', 'pt', 'en', 'beginner', 29, 36, 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800', false, now(), now());