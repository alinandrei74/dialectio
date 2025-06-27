export interface Course {
  id: string;
  title: string;
  description: string;
  target_language: string;
  source_language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  total_lessons: number;
  estimated_hours: number;
  image_url?: string;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  content: string;
  lesson_order: number;
  lesson_type: 'vocabulary' | 'grammar' | 'conversation' | 'culture' | 'practice';
  estimated_minutes: number;
  is_completed?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  title: string;
  instructions: string;
  exercise_type: 'multiple_choice' | 'fill_blank' | 'translation' | 'audio' | 'conversation';
  content: ExerciseContent;
  points: number;
  exercise_order: number;
  created_at: string;
  updated_at: string;
}

interface ExerciseContent {
  question: string;
  options?: string[];
  correct_answer: string | number;
  explanation?: string;
  audio_url?: string;
  image_url?: string;
  hints?: string[];
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  current_lesson_id?: string;
  completed_lessons: string[];
  total_points: number;
  completion_percentage: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
}

interface UserExerciseResult {
  id: string;
  user_id: string;
  exercise_id: string;
  is_correct: boolean;
  user_answer: string;
  points_earned: number;
  completed_at: string;
}

export interface LearningStats {
  total_courses: number;
  completed_courses: number;
  total_lessons: number;
  completed_lessons: number;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  time_spent_minutes: number;
}