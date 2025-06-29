/*
  # Renombrar tablas existentes como legacy

  1. Renombrar tablas existentes
    - lessons → legacy_lessons
    - exercises → legacy_exercises
    - user_progress → legacy_user_progress
    - user_exercise_results → legacy_user_exercise_results

  2. Mantener courses y profiles intactas
*/

-- Renombrar tablas existentes
ALTER TABLE IF EXISTS lessons RENAME TO legacy_lessons;
ALTER TABLE IF EXISTS exercises RENAME TO legacy_exercises;
ALTER TABLE IF EXISTS user_progress RENAME TO legacy_user_progress;
ALTER TABLE IF EXISTS user_exercise_results RENAME TO legacy_user_exercise_results;