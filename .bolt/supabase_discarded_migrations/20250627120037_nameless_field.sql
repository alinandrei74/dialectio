/*
  # Add lesson navigation and progress tracking improvements

  1. New Functions
    - Function to get next lesson in a course
    - Function to get previous lesson in a course
    - Function to calculate course completion percentage

  2. Improvements
    - Better lesson ordering
    - Enhanced progress tracking
*/

-- Function to get the next lesson in a course
CREATE OR REPLACE FUNCTION get_next_lesson(
  p_course_id uuid,
  p_current_lesson_order integer
)
RETURNS TABLE (
  id uuid,
  title text,
  lesson_order integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.lesson_order
  FROM lessons l
  WHERE l.course_id = p_course_id
    AND l.lesson_order > p_current_lesson_order
  ORDER BY l.lesson_order ASC
  LIMIT 1;
END;
$$;

-- Function to get the previous lesson in a course
CREATE OR REPLACE FUNCTION get_previous_lesson(
  p_course_id uuid,
  p_current_lesson_order integer
)
RETURNS TABLE (
  id uuid,
  title text,
  lesson_order integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT l.id, l.title, l.lesson_order
  FROM lessons l
  WHERE l.course_id = p_course_id
    AND l.lesson_order < p_current_lesson_order
  ORDER BY l.lesson_order DESC
  LIMIT 1;
END;
$$;

-- Function to calculate accurate course completion percentage
CREATE OR REPLACE FUNCTION calculate_course_completion(
  p_user_id uuid,
  p_course_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  total_lessons integer;
  completed_lessons integer;
  completion_percentage integer;
BEGIN
  -- Get total lessons in the course
  SELECT COUNT(*)
  INTO total_lessons
  FROM lessons
  WHERE course_id = p_course_id;

  -- Get completed lessons count
  SELECT array_length(up.completed_lessons, 1)
  INTO completed_lessons
  FROM user_progress up
  WHERE up.user_id = p_user_id
    AND up.course_id = p_course_id;

  -- Handle null case
  IF completed_lessons IS NULL THEN
    completed_lessons := 0;
  END IF;

  -- Calculate percentage
  IF total_lessons > 0 THEN
    completion_percentage := ROUND((completed_lessons::decimal / total_lessons::decimal) * 100);
  ELSE
    completion_percentage := 0;
  END IF;

  -- Update the user_progress table
  UPDATE user_progress
  SET completion_percentage = completion_percentage
  WHERE user_id = p_user_id
    AND course_id = p_course_id;

  RETURN completion_percentage;
END;
$$;

-- Trigger to automatically update completion percentage when lessons are completed
CREATE OR REPLACE FUNCTION update_completion_percentage()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Calculate and update completion percentage
  PERFORM calculate_course_completion(NEW.user_id, NEW.course_id);
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic completion percentage updates
DROP TRIGGER IF EXISTS trigger_update_completion_percentage ON user_progress;
CREATE TRIGGER trigger_update_completion_percentage
  AFTER UPDATE OF completed_lessons ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_completion_percentage();

-- Add comments to document the new functions
COMMENT ON FUNCTION get_next_lesson(uuid, integer) IS 'Returns the next lesson in a course based on lesson order';
COMMENT ON FUNCTION get_previous_lesson(uuid, integer) IS 'Returns the previous lesson in a course based on lesson order';
COMMENT ON FUNCTION calculate_course_completion(uuid, uuid) IS 'Calculates and updates the completion percentage for a user course';
COMMENT ON FUNCTION update_completion_percentage() IS 'Trigger function to automatically update completion percentage when lessons are completed';