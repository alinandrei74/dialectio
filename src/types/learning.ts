// Tipos actualizados para el nuevo esquema de base de datos

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

export interface Part {
  id: string;
  course_id: string;
  title: string;
  part_order: number;
  synopsis?: string;
  created_at: string;
  updated_at: string;
}

export interface Phase {
  id: string;
  part_id: string;
  kind: 'preparation' | 'conversation';
  phase_order: number;
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  phase_id: string;
  kind: 'exercise' | 'situation';
  title: string;
  unit_order: number;
  agent_name?: string;
  agent_prompt?: string;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  unit_id: string;
  title: string;
  instructions?: string;
  exercise_type: 'multiple_choice' | 'fill_blank' | 'translation' | 'audio' | 'conversation';
  content: ExerciseContent;
  points: number;
  exercise_order: number;
  created_at: string;
  updated_at: string;
}

interface ExerciseContent {
  question: string;
  correct_answer: string | number;
  explanation?: string;
  options?: string[]; // Para multiple_choice
  audio_url?: string; // Para audio
  hints?: string[];
}

export interface Attempt {
  id: string;
  user_id: string;
  unit_id: string;
  answer?: any;
  score?: number;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  unit_id: string;
  error_vector: Array<[number, number]>; // [error_id, weight]
  started_at: string;
  finished_at?: string;
}

export interface ChatTurn {
  id: string;
  session_id: string;
  speaker: 'student' | 'agent';
  utterance?: string;
  analysis?: any;
  suggestions?: any;
  created_at: string;
}

export interface ErrorCatalog {
  id: number;
  label: string;
  description?: string;
}

export interface SuggestionRule {
  id: number;
  error_id: number;
  template?: string;
  weight?: number;
}

// Tipos para el progreso del usuario (mantenemos compatibilidad)
export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  current_unit_id?: string;
  completed_units: string[];
  total_points: number;
  completion_percentage: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
}

export interface LearningStats {
  total_courses: number;
  completed_courses: number;
  total_units: number;
  completed_units: number;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  time_spent_minutes: number;
}

// Tipos extendidos para la nueva estructura
export interface CourseStructure {
  course: Course;
  parts: Array<{
    part: Part;
    phases: Array<{
      phase: Phase;
      units: Array<{
        unit: Unit;
        exercises?: Exercise[];
      }>;
    }>;
  }>;
}

export interface LearningPath {
  course_id: string;
  current_part: number;
  current_phase: number;
  current_unit: number;
  progress_percentage: number;
  completed_units: string[];
}