import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Course, Lesson, Exercise, UserProgress, LearningStats, validateExerciseAnswer } from '../types/learning';

export function useLearning() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [learningStats, setLearningStats] = useState<LearningStats | null>(null);

  // Fetch available courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setLoading(false);
  };

  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Fetch learning statistics
  const fetchLearningStats = async () => {
    if (!user) return;

    try {
      // Obtener estadísticas básicas del progreso
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      // Obtener total de cursos disponibles
      const { data: coursesData } = await supabase
        .from('courses')
        .select('id, total_lessons');

      if (progressData && coursesData) {
        const totalCourses = coursesData.length;
        const completedCourses = progressData.filter(p => p.completion_percentage === 100).length;
        const totalPoints = progressData.reduce((sum, p) => sum + (p.total_points || 0), 0);
        const completedLessons = progressData.reduce((sum, p) => sum + (p.completed_lessons?.length || 0), 0);
        
        // Calcular total de lecciones disponibles
        const totalLessons = coursesData.reduce((sum, c) => sum + c.total_lessons, 0);

        const stats: LearningStats = {
          total_courses: totalCourses,
          completed_courses: completedCourses,
          total_lessons: totalLessons,
          completed_lessons: completedLessons,
          total_points: totalPoints,
          current_streak: 0, // TODO: Implementar cálculo de racha
          longest_streak: 0, // TODO: Implementar cálculo de racha más larga
          time_spent_minutes: 0 // TODO: Implementar seguimiento de tiempo
        };
        setLearningStats(stats);
      }
    } catch (error) {
      console.error('Error fetching learning stats:', error);
    }
  };

  // Start a course (create progress entry if it doesn't exist)
  const startCourse = async (courseId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Check if progress already exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (!existingProgress) {
        // Create new progress entry
        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            completed_lessons: [],
            total_points: 0,
            completion_percentage: 0,
            last_accessed: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        
        // Refresh user progress
        await fetchUserProgress();
        return data;
      } else {
        // Update last accessed time
        const { error } = await supabase
          .from('user_progress')
          .update({
            last_accessed: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (error) throw error;
        
        // Refresh user progress
        await fetchUserProgress();
        return existingProgress;
      }
    } catch (error) {
      console.error('Error starting course:', error);
      throw error;
    }
  };

  // Get lessons for a course (usando la vista lessons que mapea a units)
  const fetchLessons = async (courseId: string): Promise<Lesson[]> => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('lesson_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  };

  // Get exercises for a lesson (ahora usando unit_id)
  const fetchExercises = async (lessonId: string): Promise<Exercise[]> => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('lesson_id', lessonId) // lesson_id ahora apunta a unit_id
        .order('exercise_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
  };

  // Complete a lesson
  const completeLesson = async (courseId: string, lessonId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Get current progress
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (currentProgress) {
        const completedLessons = currentProgress.completed_lessons || [];
        if (!completedLessons.includes(lessonId)) {
          completedLessons.push(lessonId);
        }

        // Get total lessons for the course usando la vista lessons
        const { data: lessons } = await supabase
          .from('lessons')
          .select('id')
          .eq('course_id', courseId);

        const totalLessons = lessons?.length || 0;
        const completionPercentage = totalLessons > 0 
          ? Math.round((completedLessons.length / totalLessons) * 100)
          : 0;

        const { error } = await supabase
          .from('user_progress')
          .update({
            completed_lessons: completedLessons,
            completion_percentage: completionPercentage,
            current_lesson_id: lessonId,
            last_accessed: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (error) throw error;
        
        // Refresh user progress and stats
        await fetchUserProgress();
        await fetchLearningStats();
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    }
  };

  // Submit exercise result with intelligent validation
  const submitExerciseResult = async (
    exerciseId: string, 
    userAnswer: string, 
    exercise: Exercise
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Use intelligent validation
      const validationResult = validateExerciseAnswer(exercise, userAnswer);

      // Submit to user_exercise_results if the table exists
      const { error: exerciseError } = await supabase
        .from('user_exercise_results')
        .insert({
          user_id: user.id,
          exercise_id: exerciseId,
          user_answer: userAnswer,
          is_correct: validationResult.isCorrect,
          points_earned: validationResult.score,
          completed_at: new Date().toISOString()
        });

      if (exerciseError) {
        console.warn('Could not save to user_exercise_results:', exerciseError);
      }

      // Also submit to attempts table (new structure)
      const { error: attemptError } = await supabase
        .from('attempts')
        .insert({
          user_id: user.id,
          unit_id: exercise.lesson_id, // lesson_id ahora es unit_id
          answer: {
            exercise_id: exerciseId,
            user_answer: userAnswer,
            normalized_answer: validationResult.normalizedAnswer
          },
          score: validationResult.score
        });

      if (attemptError) {
        console.error('Error saving attempt:', attemptError);
      }

      // Update user progress points if correct
      if (validationResult.isCorrect) {
        await updateUserPoints(exercise.lesson_id, validationResult.score);
      }

      return validationResult;
    } catch (error) {
      console.error('Error submitting exercise result:', error);
      throw error;
    }
  };

  // Update user points for a course
  const updateUserPoints = async (unitId: string, points: number) => {
    if (!user) return;

    try {
      // Get course_id from unit
      const { data: unitData } = await supabase
        .from('units')
        .select(`
          phase_id,
          phases!inner(
            part_id,
            parts!inner(
              course_id
            )
          )
        `)
        .eq('id', unitId)
        .single();

      if (unitData) {
        const courseId = unitData.phases.parts.course_id;

        // Update total points in user progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            total_points: supabase.sql`total_points + ${points}`
          })
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (error) {
          console.error('Error updating user points:', error);
        }
      }
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchLearningStats();
    }
  }, [user, courses]);

  return {
    loading,
    courses,
    userProgress,
    learningStats,
    startCourse,
    fetchLessons,
    fetchExercises,
    completeLesson,
    submitExerciseResult,
    refreshProgress: fetchUserProgress,
    refreshStats: fetchLearningStats
  };
}