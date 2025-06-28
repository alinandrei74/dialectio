import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Course, Lesson, Exercise, UserProgress, LearningStats } from '../types/learning';

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
      // This would be implemented with a more complex query or stored procedure
      // For now, we'll calculate basic stats
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressData) {
        const stats: LearningStats = {
          total_courses: courses.length,
          completed_courses: progressData.filter(p => p.completion_percentage === 100).length,
          total_lessons: progressData.reduce((sum, p) => sum + (p.completed_lessons?.length || 0), 0),
          completed_lessons: progressData.reduce((sum, p) => sum + (p.completed_lessons?.length || 0), 0),
          total_points: progressData.reduce((sum, p) => sum + p.total_points, 0),
          current_streak: 0, // Would be calculated based on daily activity
          longest_streak: 0, // Would be calculated based on historical data
          time_spent_minutes: 0 // Would be tracked separately
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

  // Get lessons for a course
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

  // Get exercises for a lesson
  const fetchExercises = async (lessonId: string): Promise<Exercise[]> => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('lesson_id', lessonId)
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

        // Get total lessons for the course
        const { data: course } = await supabase
          .from('courses')
          .select('total_lessons')
          .eq('id', courseId)
          .single();

        const completionPercentage = course 
          ? Math.round((completedLessons.length / course.total_lessons) * 100)
          : 0;

        const { error } = await supabase
          .from('user_progress')
          .update({
            completed_lessons: completedLessons,
            completion_percentage: completionPercentage,
            last_accessed: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (error) throw error;
        
        // Refresh user progress
        await fetchUserProgress();
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    }
  };

  // Submit exercise result
  const submitExerciseResult = async (exerciseId: string, userAnswer: string, isCorrect: boolean, pointsEarned: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('user_exercise_results')
        .insert({
          user_id: user.id,
          exercise_id: exerciseId,
          user_answer: userAnswer,
          is_correct: isCorrect,
          points_earned: pointsEarned,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error submitting exercise result:', error);
      throw error;
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