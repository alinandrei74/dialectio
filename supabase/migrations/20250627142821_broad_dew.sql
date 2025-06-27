/*
  # Actualizar imagen del curso de portugués

  1. Cambios
    - Actualizar la imagen de todos los cursos de portugués para usar una foto de la Plaza del Comercio en Lisboa
    - Mantener todas las demás propiedades del curso
*/

-- Actualizar la imagen de todos los cursos de portugués (target_language = 'pt')
UPDATE courses 
SET image_url = 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
    updated_at = now()
WHERE target_language = 'pt';