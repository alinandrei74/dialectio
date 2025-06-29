import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Play, CheckCircle, Clock, Target, Award, Volume2, RotateCcw, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLearning } from '../hooks/useLearning';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import UserMenu from '../components/auth/UserMenu';
import Footer from '../components/layout/Footer';
import { Lesson, Exercise, Course, MultipleChoiceContent, FillBlankContent, TranslationContent, AudioContent } from '../types/learning';

function LessonPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useAuth();
  const { courses, fetchLessons, fetchExercises, completeLesson, submitExerciseResult } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [exerciseResults, setExerciseResults] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const t: Translation = translations[currentLang];

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!lessonId) {
      navigate('/learning');
      return;
    }

    loadLessonData();
  }, [lessonId, user, navigate]);

  const loadLessonData = async () => {
    if (!lessonId) return;

    setLoading(true);
    try {
      // Find the lesson and its course
      let foundLesson: Lesson | null = null;
      let foundCourse: Course | null = null;

      for (const courseItem of courses) {
        const courseLessons = await fetchLessons(courseItem.id);
        const lessonMatch = courseLessons.find(l => l.id === lessonId);
        if (lessonMatch) {
          foundLesson = lessonMatch;
          foundCourse = courseItem;
          break;
        }
      }

      if (!foundLesson || !foundCourse) {
        navigate('/learning');
        return;
      }

      setLesson(foundLesson);
      setCourse(foundCourse);

      // Load exercises for this lesson
      const lessonExercises = await fetchExercises(lessonId);
      setExercises(lessonExercises);

    } catch (error) {
      console.error('Error loading lesson data:', error);
      navigate('/learning');
    }
    setLoading(false);
  };

  const handleAnswerChange = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };

  const handleSubmitExercise = async () => {
    if (!lesson || exercises.length === 0) return;

    const currentExercise = exercises[currentExerciseIndex];
    const userAnswer = userAnswers[currentExercise.id] || '';

    if (!userAnswer.trim()) return;

    setSubmitting(true);

    try {
      // Use the new intelligent validation system
      const result = await submitExerciseResult(
        currentExercise.id,
        userAnswer,
        currentExercise
      );

      // Store the result
      setExerciseResults(prev => ({
        ...prev,
        [currentExercise.id]: result
      }));

      // Mark exercise as completed
      setCompletedExercises(prev => new Set([...prev, currentExercise.id]));

      // Move to next exercise or show results
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      } else {
        // All exercises completed
        setShowResults(true);
        
        // Mark lesson as completed
        if (course) {
          await completeLesson(course.id, lesson.id);
        }
      }

    } catch (error) {
      console.error('Error submitting exercise:', error);
    }

    setSubmitting(false);
  };

  const handleRetryExercise = () => {
    const currentExercise = exercises[currentExerciseIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentExercise.id]: ''
    }));
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentExercise.id);
      return newSet;
    });
    setExerciseResults(prev => {
      const newResults = { ...prev };
      delete newResults[currentExercise.id];
      return newResults;
    });
  };

  const handleBackToCourse = () => {
    if (course) {
      navigate(`/learning/course/${course.id}`);
    } else {
      navigate('/learning');
    }
  };

  const getLanguageInfo = (langCode: string) => {
    const languageMap = {
      'es': { name: 'Español', flag: '🇪🇸', color: 'from-red-600 to-red-800' },
      'fr': { name: 'Français', flag: '🇫🇷', color: 'from-blue-600 to-blue-800' },
      'pt': { name: 'Português', flag: '🇵🇹', color: 'from-green-600 to-green-800' },
      'it': { name: 'Italiano', flag: '🇮🇹', color: 'from-green-700 to-green-900' },
      'en': { name: 'English', flag: '🇺🇸', color: 'from-blue-700 to-blue-900' }
    };
    return languageMap[langCode as keyof typeof languageMap] || { name: langCode, flag: '🌐', color: 'from-gray-600 to-gray-800' };
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return '📚';
      case 'grammar': return '📝';
      case 'conversation': return '💬';
      case 'culture': return '🎭';
      case 'practice': return '🎯';
      default: return '📖';
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'from-blue-600 to-blue-800';
      case 'grammar': return 'from-purple-600 to-purple-800';
      case 'conversation': return 'from-green-600 to-green-800';
      case 'culture': return 'from-orange-600 to-orange-800';
      case 'practice': return 'from-red-600 to-red-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const renderExerciseContent = (exercise: Exercise) => {
    const userAnswer = userAnswers[exercise.id] || '';
    const isCompleted = completedExercises.has(exercise.id);
    const result = exerciseResults[exercise.id];

    switch (exercise.exercise_type) {
      case 'multiple_choice':
        const mcContent = exercise.content as MultipleChoiceContent;
        return (
          <div className="space-y-3">
            {mcContent.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerChange(exercise.id, option)}
                disabled={isCompleted}
                className={`w-full p-4 text-left border-3 transition-all duration-300 font-bold ${
                  userAnswer === option
                    ? 'bg-blue-600 text-white border-black dark:border-gray-300'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300'
                } ${isCompleted ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}`}
                style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'fill_blank':
      case 'translation':
        return (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
            disabled={isCompleted}
            className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg disabled:opacity-60"
            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
            placeholder="Escribe tu respuesta aquí..."
          />
        );

      case 'audio':
        const audioContent = exercise.content as AudioContent;
        return (
          <div className="space-y-4">
            {audioContent.audio_url && (
              <div className="flex items-center space-x-4">
                <button 
                  className="bg-blue-600 text-white px-4 py-2 font-bold text-sm border-2 border-black hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
                  onClick={() => {
                    const audio = new Audio(audioContent.audio_url);
                    audio.play().catch(console.error);
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Escuchar</span>
                </button>
                {audioContent.transcript && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                    Transcripción disponible después de responder
                  </span>
                )}
              </div>
            )}
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
              disabled={isCompleted}
              className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg disabled:opacity-60"
              style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              placeholder="Escribe lo que escuchaste..."
            />
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
            disabled={isCompleted}
            className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg disabled:opacity-60"
            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
            placeholder="Escribe tu respuesta aquí..."
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Cargando lección...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return null;
  }

  const targetLangInfo = getLanguageInfo(course.target_language);
  const currentExercise = exercises[currentExerciseIndex];
  const isExerciseCompleted = currentExercise && completedExercises.has(currentExercise.id);
  const userAnswer = currentExercise ? userAnswers[currentExercise.id] || '' : '';
  const exerciseResult = currentExercise ? exerciseResults[currentExercise.id] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-4 bg-white/40 dark:bg-gray-300/30 transform rotate-45 opacity-40 animate-pulse shadow-lg"></div>
        <div className="absolute top-40 left-20 w-4 h-32 bg-blue-300/50 dark:bg-blue-400/40 transform -rotate-30 opacity-50 animate-pulse delay-1000 shadow-md"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-white/35 dark:bg-gray-300/25 transform rotate-45 opacity-35 animate-pulse delay-500 shadow-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-8 h-8 bg-blue-200/45 dark:bg-blue-300/35 transform -rotate-45 opacity-45 animate-pulse delay-700 shadow-lg"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToCourse}
              className="w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100 transform -rotate-45" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl">
                <Languages className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                dialectio.xyz
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector 
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              isMobile={false}
            />
            
            <DarkModeToggle 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isMobile={false}
            />

            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className={`p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r ${getLessonTypeColor(lesson.lesson_type)} text-white mx-2 mt-2`}
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    {getLessonTypeIcon(lesson.lesson_type)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-black mb-1">
                      {lesson.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm font-bold opacity-90">
                      <div className="flex items-center space-x-1">
                        <span>{targetLangInfo.flag}</span>
                        <span>{targetLangInfo.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.estimated_minutes} min</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {exercises.length > 0 && (
                  <div className="text-right">
                    <div className="text-lg font-black">
                      {currentExerciseIndex + 1} / {exercises.length}
                    </div>
                    <div className="text-sm font-bold opacity-90">
                      Ejercicios
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 font-bold text-lg">
                {lesson.description || 'Practica y mejora tus habilidades con estos ejercicios.'}
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        {exercises.length > 0 && !showResults ? (
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-xl font-black">
                {currentExercise.title}
              </h2>
            </div>

            <div className="p-8">
              {/* Exercise Instructions */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 font-bold text-lg mb-4">
                  {currentExercise.instructions}
                </p>
              </div>

              {/* Exercise Question */}
              <div className="mb-8">
                <div className="bg-blue-50/90 dark:bg-gray-700/90 p-6 border-3 border-blue-300 dark:border-blue-500 shadow-lg"
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
                    {currentExercise.content.question}
                  </h3>
                </div>
              </div>

              {/* Answer Input */}
              <div className="mb-8">
                {renderExerciseContent(currentExercise)}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isExerciseCompleted && (
                    <button
                      onClick={handleRetryExercise}
                      className="bg-gray-600 text-white px-6 py-3 font-black text-sm border-3 border-black dark:border-gray-300 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reintentar</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={handleSubmitExercise}
                  disabled={!userAnswer.trim() || submitting || isExerciseCompleted}
                  className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center space-x-3"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isExerciseCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                  <span>
                    {submitting ? 'Enviando...' : 
                     isExerciseCompleted ? 'Completado' : 
                     currentExerciseIndex === exercises.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </span>
                </button>
              </div>

              {/* Exercise Feedback */}
              {isExerciseCompleted && exerciseResult && (
                <div className={`mt-6 border-3 p-6 shadow-lg ${
                  exerciseResult.isCorrect 
                    ? 'bg-green-50/90 dark:bg-green-900/30 border-green-500' 
                    : 'bg-red-50/90 dark:bg-red-900/30 border-red-500'
                }`}
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  <div className="flex items-center space-x-3 mb-3">
                    {exerciseResult.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                    )}
                    <h4 className={`text-lg font-black ${
                      exerciseResult.isCorrect 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {exerciseResult.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h4>
                    <span className={`px-3 py-1 font-black text-sm border-2 border-black ${
                      exerciseResult.isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      +{exerciseResult.score} puntos
                    </span>
                  </div>
                  
                  {currentExercise.content.explanation && (
                    <p className={`font-bold ${
                      exerciseResult.isCorrect 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {currentExercise.content.explanation}
                    </p>
                  )}
                  
                  {!exerciseResult.isCorrect && (
                    <p className="text-red-700 dark:text-red-300 font-bold mt-2">
                      Respuesta correcta: <span className="font-black">{
                        (currentExercise.content as any).correct_answer
                      }</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : showResults ? (
          /* Results Screen */
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-black">
                  ¡Lección Completada!
                </h2>
              </div>
            </div>

            <div className="p-8 text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Has completado exitosamente la lección "{lesson.title}".
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50/90 dark:bg-gray-700/90 p-6 border-2 border-blue-300 dark:border-blue-500 shadow-md text-center">
                  <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {exercises.length}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Ejercicios Completados
                  </div>
                </div>

                <div className="bg-green-50/90 dark:bg-gray-700/90 p-6 border-2 border-green-300 dark:border-green-500 shadow-md text-center">
                  <Award className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {Object.values(exerciseResults).reduce((sum, result) => sum + (result?.score || 0), 0)}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Puntos Ganados
                  </div>
                </div>

                <div className="bg-purple-50/90 dark:bg-gray-700/90 p-6 border-2 border-purple-300 dark:border-purple-500 shadow-md text-center">
                  <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {lesson.estimated_minutes}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Minutos de Estudio
                  </div>
                </div>
              </div>

              <button
                onClick={handleBackToCourse}
                className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Volver al Curso
              </button>
            </div>
          </div>
        ) : (
          /* No Exercises Available */
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl text-center p-12"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Contenido en Desarrollo
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-bold text-lg mb-8">
              Los ejercicios para esta lección se están preparando. ¡Vuelve pronto!
            </p>
            <button
              onClick={handleBackToCourse}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              Volver al Curso
            </button>
          </div>
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}

export default LessonPage;