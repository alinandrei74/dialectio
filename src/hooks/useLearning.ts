import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Course, Lesson, Exercise, UserProgress, LearningStats, validateExerciseAnswer, Part, Phase, Unit } from '../types/learning';

export function useLearning() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [learningStats, setLearningStats] = useState<LearningStats | null>(null);

  // Fetch available courses with better error handling
  const fetchCourses = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching courses...');
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Error fetching courses:', error);
        throw error;
      }
      
      console.log('✅ Courses fetched successfully:', data?.length || 0, 'courses');
      console.log('📋 Courses data:', data);
      setCourses(data || []);
    } catch (error) {
      console.error('💥 Critical error fetching courses:', error);
      // Set empty array on error to prevent infinite loading
      setCourses([]);
    }
    setLoading(false);
  };

  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      console.log('🔍 Fetching user progress for user:', user.id);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('❌ Error fetching user progress:', error);
        throw error;
      }
      
      console.log('✅ User progress fetched:', data?.length || 0, 'records');
      setUserProgress(data || []);
    } catch (error) {
      console.error('💥 Error fetching user progress:', error);
      setUserProgress([]);
    }
  };

  // Fetch learning statistics
  const fetchLearningStats = async () => {
    if (!user) return;

    try {
      console.log('🔍 Fetching learning stats for user:', user.id);
      
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
        
        console.log('✅ Learning stats calculated:', stats);
        setLearningStats(stats);
      }
    } catch (error) {
      console.error('💥 Error fetching learning stats:', error);
    }
  };

  // Start a course (create progress entry if it doesn't exist)
  const startCourse = async (courseId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('🚀 Starting course:', courseId);
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
        
        console.log('✅ Course progress created:', data);
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
        
        console.log('✅ Course progress updated');
        // Refresh user progress
        await fetchUserProgress();
        return existingProgress;
      }
    } catch (error) {
      console.error('💥 Error starting course:', error);
      throw error;
    }
  };

  // Get lessons for a course (usando la vista lessons que mapea a units)
  const fetchLessons = async (courseId: string): Promise<Lesson[]> => {
    try {
      console.log('🔍 Fetching lessons for course:', courseId);
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('lesson_order', { ascending: true });

      if (error) {
        console.error('❌ Error fetching lessons:', error);
        throw error;
      }
      
      console.log('✅ Lessons fetched:', data?.length || 0, 'lessons');
      console.log('📋 Lessons data:', data);
      return data || [];
    } catch (error) {
      console.error('💥 Error fetching lessons:', error);
      return [];
    }
  };

  // Get exercises for a lesson (ahora usando unit_id)
  const fetchExercises = async (unitId: string): Promise<Exercise[]> => {
    try {
      console.log('🔍 Fetching exercises for unit:', unitId);
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('lesson_id', unitId) // lesson_id ahora apunta a unit_id
        .order('exercise_order', { ascending: true });

      if (error) {
        console.error('❌ Error fetching exercises:', error);
        throw error;
      }
      
      console.log('✅ Exercises fetched:', data?.length || 0, 'exercises');
      console.log('📋 Exercises data:', data);
      return data || [];
    } catch (error) {
      console.error('💥 Error fetching exercises:', error);
      return [];
    }
  };

  // NEW: Fetch unit by ID
  const fetchUnitById = async (unitId: string): Promise<Unit | null> => {
    try {
      console.log('🔍 Fetching unit by ID:', unitId);
      const { data, error } = await supabase
        .from('units')
        .select('*')
        .eq('id', unitId)
        .single();

      if (error) {
        console.error('❌ Error fetching unit:', error);
        throw error;
      }
      
      console.log('✅ Unit fetched:', data);
      return data;
    } catch (error) {
      console.error('💥 Error fetching unit:', error);
      return null;
    }
  };

  // NEW: Fetch phase by ID
  const fetchPhaseById = async (phaseId: string): Promise<Phase | null> => {
    try {
      console.log('🔍 Fetching phase by ID:', phaseId);
      const { data, error } = await supabase
        .from('phases')
        .select('*')
        .eq('id', phaseId)
        .single();

      if (error) {
        console.error('❌ Error fetching phase:', error);
        throw error;
      }
      
      console.log('✅ Phase fetched:', data);
      return data;
    } catch (error) {
      console.error('💥 Error fetching phase:', error);
      return null;
    }
  };

  // NEW: Fetch part by ID
  const fetchPartById = async (partId: string): Promise<Part | null> => {
    try {
      console.log('🔍 Fetching part by ID:', partId);
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .eq('id', partId)
        .single();

      if (error) {
        console.error('❌ Error fetching part:', error);
        throw error;
      }
      
      console.log('✅ Part fetched:', data);
      return data;
    } catch (error) {
      console.error('💥 Error fetching part:', error);
      return null;
    }
  };

  // NEW: Fetch all units in a part
  const fetchAllUnitsInPart = async (partId: string): Promise<{ preparationUnits: Unit[], conversationUnits: Unit[] }> => {
    try {
      console.log('🔍 Fetching all units in part:', partId);
      const { data, error } = await supabase
        .from('units')
        .select(`
          *,
          phases!inner(
            id,
            kind,
            phase_order,
            part_id
          )
        `)
        .eq('phases.part_id', partId)
        .order('phase_order', { foreignTable: 'phases', ascending: true })
        .order('unit_order', { ascending: true });

      if (error) {
        console.error('❌ Error fetching units in part:', error);
        throw error;
      }

      const units = data || [];
      const preparationUnits = units.filter(u => u.phases.kind === 'preparation');
      const conversationUnits = units.filter(u => u.phases.kind === 'conversation');

      console.log('✅ Units fetched - Preparation:', preparationUnits.length, 'Conversation:', conversationUnits.length);
      return { preparationUnits, conversationUnits };
    } catch (error) {
      console.error('💥 Error fetching units in part:', error);
      return { preparationUnits: [], conversationUnits: [] };
    }
  };

  // NEW: Get complete unit structure (unit -> phase -> part -> course)
  const fetchUnitStructure = async (unitId: string) => {
    try {
      console.log('🔍 Fetching unit structure for:', unitId);
      const { data, error } = await supabase
        .from('units')
        .select(`
          *,
          phases!inner(
            *,
            parts!inner(
              *,
              courses!inner(*)
            )
          )
        `)
        .eq('id', unitId)
        .single();

      if (error) {
        console.error('❌ Error fetching unit structure:', error);
        throw error;
      }
      
      console.log('✅ Unit structure fetched:', data);
      return data;
    } catch (error) {
      console.error('💥 Error fetching unit structure:', error);
      return null;
    }
  };

  // Complete a lesson
  const completeLesson = async (courseId: string, unitId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('🎯 Completing lesson - Course:', courseId, 'Unit:', unitId);
      
      // Get current progress
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (currentProgress) {
        const completedLessons = currentProgress.completed_lessons || [];
        if (!completedLessons.includes(unitId)) {
          completedLessons.push(unitId);
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
            current_lesson_id: unitId,
            last_accessed: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (error) throw error;
        
        console.log('✅ Lesson completed successfully');
        // Refresh user progress and stats
        await fetchUserProgress();
        await fetchLearningStats();
      }
    } catch (error) {
      console.error('💥 Error completing lesson:', error);
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
      console.log('📝 Submitting exercise result:', exerciseId);
      
      // Use intelligent validation
      const validationResult = validateExerciseAnswer(exercise, userAnswer);
      console.log('✅ Validation result:', validationResult);

      // Submit to attempts table (new structure)
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
        console.error('❌ Error saving attempt:', attemptError);
      } else {
        console.log('✅ Attempt saved successfully');
      }

      // Update user points if correct
      if (validationResult.isCorrect) {
        await updateUserPoints(exercise.lesson_id, validationResult.score);
      }

      return validationResult;
    } catch (error) {
      console.error('💥 Error submitting exercise result:', error);
      throw error;
    }
  };

  // Update user points for a course
  const updateUserPoints = async (unitId: string, points: number) => {
    if (!user) return;

    try {
      console.log('🎯 Updating user points:', points, 'for unit:', unitId);
      
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
        console.log('🎯 Found course ID:', courseId);

        // Direct update approach since RPC might not exist
        const { data: currentProgress } = await supabase
          .from('user_progress')
          .select('total_points')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();

        if (currentProgress) {
          const newTotalPoints = (currentProgress.total_points || 0) + points;
          
          const { error } = await supabase
            .from('user_progress')
            .update({
              total_points: newTotalPoints
            })
            .eq('user_id', user.id)
            .eq('course_id', courseId);

          if (error) {
            console.error('❌ Error updating user points:', error);
          } else {
            console.log('✅ User points updated successfully');
          }
        }
      }
    } catch (error) {
      console.error('💥 Error updating user points:', error);
    }
  };

  // Initialize data loading
  useEffect(() => {
    console.log('🚀 useLearning: Initializing...');
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('👤 useLearning: User authenticated, fetching user data...');
      fetchUserProgress();
      fetchLearningStats();
    } else {
      console.log('🚫 useLearning: No user, clearing user data...');
      setUserProgress([]);
      setLearningStats(null);
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
    refreshStats: fetchLearningStats,
    // New functions for the split view
    fetchUnitById,
    fetchPhaseById,
    fetchPartById,
    fetchAllUnitsInPart,
    fetchUnitStructure
  };
}