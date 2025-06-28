import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Play, CheckCircle, Clock, Target, Award, Volume2, RotateCcw, ArrowRight, Home, Settings } from 'lucide-react';
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
import { Course, Lesson, Exercise } from '../types/learning';

function CourseLearningPage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { courses, userProgress, fetchLessons, fetchExercises, completeLesson, submitExerciseResult, startCourse } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const t: Translation = translations[currentLang];

  const progress = userProgress.find(p => p.course_id === courseId);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!courseId) {
      navigate('/learning');
      return;
    }

    loadCourseData();
  }, [courseId, user, navigate]);

  const loadCourseData = async () => {
    if (!courseId) return;

    setLoading(true);
    try {
      // Find the course
      const foundCourse = courses.find(c => c.id === courseId);
      if (!foundCourse) {
        navigate('/learning');
        return;
      }

      setCourse(foundCourse);

      // Start course if not started
      if (!progress) {
        await startCourse(courseId);
      }

      // Load lessons for this course
      const courseLessons = await fetchLessons(courseId);
      setLessons(courseLessons);

      // Load first lesson's exercises
      if (courseLessons.length > 0) {
        const firstLesson = courseLessons[0];
        const lessonExercises = await fetchExercises(firstLesson.id);
        setExercises(lessonExercises);
      }

    } catch (error) {
      console.error('Error loading course data:', error);
      navigate('/learning');
    }
    setLoading(false);
  };

  const loadLessonExercises = async (lessonIndex: number) => {
    if (lessons[lessonIndex]) {
      const lessonExercises = await fetchExercises(lessons[lessonIndex].id);
      setExercises(lessonExercises);
      setCurrentExerciseIndex(0);
      setUserAnswers({});
      setCompletedExercises(new Set());
      setShowResults(false);
      setLessonCompleted(false);
    }
  };

  const handleAnswerChange = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };

  const handleSubmitExercise = async () => {
    if (!course || exercises.length === 0) return;

    const currentExercise = exercises[currentExerciseIndex];
    const userAnswer = userAnswers[currentExercise.id] || '';

    setSubmitting(true);

    try {
      // Check if answer is correct (simplified logic)
      const isCorrect = userAnswer.toLowerCase().trim() === 
        String(currentExercise.content.correct_answer).toLowerCase().trim();
      
      const pointsEarned = isCorrect ? currentExercise.points : 0;

      // Submit exercise result
      await submitExerciseResult(
        currentExercise.id,
        userAnswer,
        isCorrect,
        pointsEarned
      );

      // Mark exercise as completed
      setCompletedExercises(prev => new Set([...prev, currentExercise.id]));

      // Move to next exercise or show results
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      } else {
        // All exercises completed
        setShowResults(true);
        setLessonCompleted(true);
        
        // Mark lesson as completed
        const currentLesson = lessons[currentLessonIndex];
        if (currentLesson) {
          await completeLesson(course.id, currentLesson.id);
        }
      }

    } catch (error) {
      console.error('Error submitting exercise:', error);
    }

    setSubmitting(false);
  };

  const handleNextLesson = async () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLessonIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(nextLessonIndex);
      await loadLessonExercises(nextLessonIndex);
    } else {
      // Course completed
      navigate(`/learning/course/${courseId}`);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Preparando tu curso...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!course || lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">
              Curso no disponible
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-bold mb-6">
              Este curso no está disponible o no tiene lecciones.
            </p>
            <button
              onClick={() => navigate('/learning')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex];
  const currentExercise = exercises[currentExerciseIndex];
  const isExerciseCompleted = currentExercise && completedExercises.has(currentExercise.id);
  const userAnswer = currentExercise ? userAnswers[currentExercise.id] || '' : '';
  const targetLangInfo = getLanguageInfo(course.target_language);

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
      <header className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/learning/course/${courseId}`)}
              className="w-10 h-10 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-2 border-black dark:border-gray-300 transform rotate-45 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-gray-100 transform -rotate-45" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-2 border-black dark:border-gray-300 shadow-lg">
                <Languages className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                dialectio.xyz
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
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

      {/* Progress Bar */}
      <div className="relative z-10 px-4 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-3 border-black dark:border-gray-300 shadow-lg p-4"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-black text-gray-900 dark:text-gray-100">
                  {course.title}
                </span>
                <div className="flex items-center space-x-1 text-sm font-bold text-gray-600 dark:text-gray-400">
                  <span>{targetLangInfo.flag}</span>
                  <span>{targetLangInfo.name}</span>
                </div>
              </div>
              <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Lección {currentLessonIndex + 1} de {lessons.length}
              </div>
            </div>
            
            <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded-full overflow-hidden border-2 border-black dark:border-gray-300">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                style={{ width: `${((currentLessonIndex + (showResults ? 1 : 0)) / lessons.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pb-12">
        {/* Lesson Header */}
        {currentLesson && (
          <div className="mb-8">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              
              <div className={`p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r ${getLessonTypeColor(currentLesson.lesson_type)} text-white mx-2 mt-2`}
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {getLessonTypeIcon(currentLesson.lesson_type)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-black mb-1">
                        {currentLesson.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm font-bold opacity-90">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{currentLesson.estimated_minutes} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>Lección {currentLessonIndex + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {exercises.length > 0 && !showResults && (
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
                  {currentLesson.description}
                </p>
              </div>
            </div>
          </div>
        )}

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
                  
                  {/* Audio button if available */}
                  {currentExercise.content.audio_url && (
                    <button className="bg-blue-600 text-white px-4 py-2 font-bold text-sm border-2 border-black hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 mb-4">
                      <Volume2 className="w-4 h-4" />
                      <span>Escuchar</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Answer Input */}
              <div className="mb-8">
                {currentExercise.exercise_type === 'multiple_choice' && currentExercise.content.options ? (
                  <div className="space-y-3">
                    {currentExercise.content.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerChange(currentExercise.id, option)}
                        disabled={isExerciseCompleted}
                        className={`w-full p-4 text-left border-3 transition-all duration-300 font-bold ${
                          userAnswer === option
                            ? 'bg-blue-600 text-white border-black dark:border-gray-300'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300'
                        } ${isExerciseCompleted ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}`}
                        style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
                    disabled={isExerciseCompleted}
                    className="w-full px-6 py-4 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg disabled:opacity-60"
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                    placeholder="Escribe tu respuesta aquí..."
                  />
                )}
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
              {isExerciseCompleted && currentExercise.content.explanation && (
                <div className="mt-6 bg-green-50/90 dark:bg-green-900/30 border-3 border-green-500 p-6 shadow-lg"
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  <h4 className="text-lg font-black text-green-800 dark:text-green-200 mb-2">
                    Explicación
                  </h4>
                  <p className="text-green-700 dark:text-green-300 font-bold">
                    {currentExercise.content.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : showResults ? (
          /* Lesson Results Screen */
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
                Has completado exitosamente "{currentLesson?.title}".
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
                    {exercises.reduce((sum, ex) => sum + ex.points, 0)}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Puntos Ganados
                  </div>
                </div>

                <div className="bg-purple-50/90 dark:bg-gray-700/90 p-6 border-2 border-purple-300 dark:border-purple-500 shadow-md text-center">
                  <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {currentLesson?.estimated_minutes}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Minutos de Estudio
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentLessonIndex < lessons.length - 1 ? (
                  <button
                    onClick={handleNextLesson}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <Play className="w-5 h-5" />
                    <span>Siguiente Lección</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/learning/course/${courseId}`)}
                    className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <Award className="w-5 h-5" />
                    <span>¡Curso Completado!</span>
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/learning')}
                  className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 text-white px-8 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-gray-700 hover:to-gray-900 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
              </div>
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
              onClick={() => navigate(`/learning/course/${courseId}`)}
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

export default CourseLearningPage;