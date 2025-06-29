-- ============================================================================
-- MIGRACIÓN SIMPLE: ACTUALIZAR IMÁGENES TEMÁTICAS PARA CURSOS EXISTENTES
-- ============================================================================

/*
  # Actualización de imágenes temáticas para cursos

  1. Cambios
    - Actualizar image_url para cursos existentes con imágenes temáticas de cada país
    - Solo actualiza cursos que ya existen en la base de datos
    - No crea nuevos cursos ni estructura adicional

  2. Imágenes por idioma
    - Español: Plaza Mayor de Madrid
    - Francés: Torre Eiffel de París  
    - Portugués: Cristo Redentor de Río
    - Italiano: Coliseo Romano
*/

-- Actualizar imagen para cursos de español (desde cualquier idioma fuente)
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg'
WHERE target_language = 'es' AND (image_url IS NULL OR image_url = '');

-- Actualizar imagen para cursos de francés (desde cualquier idioma fuente)
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg'
WHERE target_language = 'fr' AND (image_url IS NULL OR image_url = '');

-- Actualizar imagen para cursos de portugués (desde cualquier idioma fuente)
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg'
WHERE target_language = 'pt' AND (image_url IS NULL OR image_url = '');

-- Actualizar imagen para cursos de italiano (desde cualquier idioma fuente)
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg'
WHERE target_language = 'it' AND (image_url IS NULL OR image_url = '');

-- Actualizar imagen para cursos de inglés (desde cualquier idioma fuente)
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg'
WHERE target_language = 'en' AND (image_url IS NULL OR image_url = '');