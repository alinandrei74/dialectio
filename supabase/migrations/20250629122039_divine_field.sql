/*
  # Migración de datos existentes

  1. Migrar datos de legacy_lessons a la nueva estructura
  2. Migrar datos de legacy_exercises
  3. Crear estructura básica de parts/phases/units
*/

-- Función para migrar datos legacy
DO $$
DECLARE
  course_record RECORD;
  lesson_record RECORD;
  exercise_record RECORD;
  part_id uuid;
  prep_phase_id uuid;
  conv_phase_id uuid;
  unit_id uuid;
BEGIN
  -- Solo ejecutar si existen las tablas legacy
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'legacy_lessons') THEN
    
    -- Para cada curso, crear su estructura de parts/phases
    FOR course_record IN SELECT * FROM courses LOOP
      
      -- Crear una parte por defecto para este curso
      INSERT INTO parts (course_id, title, part_order, synopsis)
      VALUES (
        course_record.id,
        'Parte 1: ' || course_record.title,
        1,
        'Contenido principal del curso ' || course_record.title
      )
      RETURNING id INTO part_id;
      
      -- Crear las dos fases obligatorias
      INSERT INTO phases (part_id, kind, phase_order)
      VALUES (part_id, 'preparation', 1)
      RETURNING id INTO prep_phase_id;
      
      INSERT INTO phases (part_id, kind, phase_order)
      VALUES (part_id, 'conversation', 2)
      RETURNING id INTO conv_phase_id;
      
      -- Migrar lecciones como units de tipo exercise en la fase de preparación
      FOR lesson_record IN 
        SELECT * FROM legacy_lessons 
        WHERE course_id = course_record.id 
        ORDER BY lesson_order 
      LOOP
        
        INSERT INTO units (
          phase_id, 
          kind, 
          title, 
          unit_order
        )
        VALUES (
          prep_phase_id,
          'exercise',
          lesson_record.title,
          lesson_record.lesson_order
        )
        RETURNING id INTO unit_id;
        
        -- Migrar ejercicios de esta lección
        FOR exercise_record IN 
          SELECT * FROM legacy_exercises 
          WHERE lesson_id = lesson_record.id 
          ORDER BY exercise_order 
        LOOP
          
          INSERT INTO exercises (
            unit_id,
            title,
            instructions,
            exercise_type,
            content,
            points,
            exercise_order
          )
          VALUES (
            unit_id,
            exercise_record.title,
            exercise_record.instructions,
            exercise_record.exercise_type,
            exercise_record.content,
            exercise_record.points,
            exercise_record.exercise_order
          );
          
        END LOOP;
        
      END LOOP;
      
    END LOOP;
    
    RAISE NOTICE 'Migración de datos legacy completada exitosamente';
    
  ELSE
    RAISE NOTICE 'No se encontraron tablas legacy para migrar';
  END IF;
  
END $$;