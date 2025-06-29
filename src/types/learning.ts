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
  // Relaciones anidadas para consultas complejas
  phases?: Phase & {
    parts?: Part & {
      courses?: Course;
    };
  };
}

// Definición específica y robusta para el contenido de ejercicios
export interface BaseExerciseContent {
  question: string;
  explanation?: string;
  hints?: string[];
}

export interface MultipleChoiceContent extends BaseExerciseContent {
  options: string[];
  correct_answer: string;
}

export interface FillBlankContent extends BaseExerciseContent {
  correct_answer: string;
  acceptable_answers?: string[]; // Respuestas alternativas aceptables
  case_sensitive?: boolean;
}

export interface TranslationContent extends BaseExerciseContent {
  correct_answer: string;
  acceptable_answers?: string[]; // Traducciones alternativas aceptables
  source_language: string;
  target_language: string;
}

export interface AudioContent extends BaseExerciseContent {
  audio_url: string;
  correct_answer: string;
  acceptable_answers?: string[];
  transcript?: string;
}

export interface ConversationContent extends BaseExerciseContent {
  scenario: string;
  agent_prompt: string;
  expected_responses: string[];
  conversation_turns?: number;
}

export type ExerciseContent = 
  | MultipleChoiceContent 
  | FillBlankContent 
  | TranslationContent 
  | AudioContent 
  | ConversationContent;

export interface Exercise {
  id: string;
  lesson_id: string; // Esto ahora apunta a unit_id en la nueva estructura
  title: string;
  instructions: string;
  exercise_type: 'multiple_choice' | 'fill_blank' | 'translation' | 'audio' | 'conversation';
  content: ExerciseContent;
  points: number;
  exercise_order: number;
  created_at: string;
  updated_at: string;
}

export interface Attempt {
  id: string;
  user_id: string;
  unit_id: string;
  answer: any;
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

// Tipos para el progreso del usuario (actualizados para nueva estructura)
export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  current_lesson_id?: string; // Ahora apunta a unit_id
  completed_lessons: string[]; // Array de unit_ids completados
  total_points: number;
  completion_percentage: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
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

// Tipos para la vista lessons (compatibilidad)
export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  content?: string;
  lesson_order: number;
  lesson_type: string;
  estimated_minutes: number;
  created_at: string;
  updated_at: string;
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

// Utilidades para validación de ejercicios
export interface ExerciseValidationResult {
  isCorrect: boolean;
  score: number;
  feedback?: string;
  normalizedAnswer?: string;
}

// Funciones de utilidad para validación
export const validateExerciseAnswer = (
  exercise: Exercise,
  userAnswer: string
): ExerciseValidationResult => {
  const content = exercise.content;
  
  // Normalizar respuesta del usuario
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  
  switch (exercise.exercise_type) {
    case 'multiple_choice':
      const mcContent = content as MultipleChoiceContent;
      const isCorrect = normalizedUserAnswer === normalizeAnswer(mcContent.correct_answer);
      return {
        isCorrect,
        score: isCorrect ? exercise.points : 0,
        normalizedAnswer: normalizedUserAnswer
      };
      
    case 'fill_blank':
    case 'translation':
      const fbContent = content as FillBlankContent | TranslationContent;
      const correctAnswers = [
        fbContent.correct_answer,
        ...(fbContent.acceptable_answers || [])
      ].map(normalizeAnswer);
      
      const isMatch = correctAnswers.includes(normalizedUserAnswer);
      return {
        isCorrect: isMatch,
        score: isMatch ? exercise.points : 0,
        normalizedAnswer: normalizedUserAnswer
      };
      
    case 'audio':
      const audioContent = content as AudioContent;
      const audioCorrectAnswers = [
        audioContent.correct_answer,
        ...(audioContent.acceptable_answers || [])
      ].map(normalizeAnswer);
      
      const isAudioMatch = audioCorrectAnswers.includes(normalizedUserAnswer);
      return {
        isCorrect: isAudioMatch,
        score: isAudioMatch ? exercise.points : 0,
        normalizedAnswer: normalizedUserAnswer
      };
      
    default:
      return {
        isCorrect: false,
        score: 0,
        normalizedAnswer: normalizedUserAnswer
      };
  }
};

// Función para normalizar respuestas (maneja acentos, espacios, mayúsculas)
const normalizeAnswer = (answer: string): string => {
  return answer
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s]/g, '') // Remover puntuación
    .replace(/\s+/g, ' '); // Normalizar espacios
};