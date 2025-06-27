import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, Play, CheckCircle, ArrowRight, Clock, Target, Award, Volume2, RotateCcw } from 'lucide-react';
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
import { Lesson, Exercise } from '../types/learning';

function LessonPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useAuth();
  const { courses, userProgress, fetchLessons, fetchExercises, completeLesson, submitExerciseResult, loading } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(true);

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

    setLoadingExercises(true);
    try {
      // Find lesson in all courses
      let foundLesson: Lesson | null = null;
      for (const course of courses) {
        const courseLessons = await fetchLessons(course.id);
        foundLesson = courseLessons.find(l => l.id === lessonId) || null;
        if (foundLesson) break;
      }

      if (!foundLesson) {
        navigate('/learning');
        return;
      }

      setLesson(foundLesson);

      // Load exercises for this lesson
      const lessonExercises = await fetchExercises(lessonId);
      setExercises(lessonExercises);
    } catch (error) {
      console.error('Error loading lesson data:', error);
    }
    setLoadingExercises(false);
  };

  const handleAnswerChange = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const handleSubmitExercise = async () => {
    const currentExercise = exercises[currentExerciseIndex];
    if (!currentExercise) return;

    const userAnswer = userAnswers[currentExercise.id] || '';
    const correctAnswer = currentExercise.content.correct_answer;
    
    let isCorrect = false;
    if (typeof correctAnswer === 'number') {
      isCorrect = parseInt(userAnswer) === correctAnswer;
    } else {
      isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toString().toLowerCase().trim();
    }

    const pointsEarned = isCorrect ? currentExercise.points : 0;

    try {
      await submitExerciseResult(currentExercise.id, userAnswer, isCorrect, pointsEarned);
      setExerciseResults(prev => ({ ...prev, [currentExercise.id]: isCorrect }));
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting exercise result:', error);
    }
  };

  const handleNextExercise = () => {
    setShowResults(false);
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      handleCompleteLesson();
    }
  };

  const handleCompleteLesson = async () => {
    if (!lesson) return;

    try {
      await completeLesson(lesson.course_id, lesson.id);
      setLessonCompleted(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const handleRetryExercise = () => {
    const currentExercise = exercises[currentExerciseIndex];
    if (currentExercise) {
      setUserAnswers(prev => ({ ...prev, [currentExercise.id]: '' }));
      setShowResults(false);
    }
  };

  const renderExercise = (exercise: Exercise) => {
    const userAnswer = userAnswers[exercise.id] || '';
    const hasResult = exercise.id in exerciseResults;
    const isCorrect = exerciseResults[exercise.id];

    switch (exercise.exercise_type) {
      case 'multiple_choice':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {exercise.content.question}
            </h3>
            <div className="space-y-3">
              {exercise.content.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResults && handleAnswerChange(exercise.id, index.toString())}
                  disabled={showResults}
                  className={`w-full p-4 text-left border-3 transition-all duration-300 font-bold ${
                    userAnswer === index.toString()
                      ? showResults
                        ? isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-200'
                      : showResults && index === exercise.content.correct_answer
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      userAnswer === index.toString() ? 'border-current' : 'border-gray-400'
                    }`}>
                      {userAnswer === index.toString() && (
                        <div className="w-3 h-3 rounded-full bg-current"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'fill_blank':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {exercise.content.question}
            </h3>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => !showResults && handleAnswerChange(exercise.id, e.target.value)}
              disabled={showResults}
              className={`w-full px-4 py-3 border-3 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showResults
                  ? isCorrect
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200'
                  : 'bg-white dark:bg-gray-700 border-black dark:border-gray-300 text-gray-900 dark:text-gray-100'
              }`}
              style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              placeholder="Escribe tu respuesta aquí..."
            />
            {showResults && !isCorrect && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-600 p-3 rounded">
                <p className="text-green-800 dark:text-green-200 font-bold text-sm">
                  Respuesta correcta: {exercise.content.correct_answer}
                </p>
              </div>
            )}
          </div>
        );

      case 'translation':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Traduce: "{exercise.content.question}"
            </h3>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => !showResults && handleAnswerChange(exercise.id, e.target.value)}
              disabled={showResults}
              className={`w-full px-4 py-3 border-3 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showResults
                  ? isCorrect
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200'
                  : 'bg-white dark:bg-gray-700 border-black dark:border-gray-300 text-gray-900 dark:text-gray-100'
              }`}
              style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              placeholder="Escribe la traducción..."
            />
            {showResults && !isCorrect && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-600 p-3 rounded">
                <p className="text-green-800 dark:text-green-200 font-bold text-sm">
                  Respuesta correcta: {exercise.content.correct_answer}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 font-bold">
              Tipo de ejercicio no soportado: {exercise.exercise_type}
            </p>
          </div>
        );
    }
  };

  if (!user) {
    return null;
  }

  if (!lesson) {
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

  const currentExercise = exercises[currentExerciseIndex];
  const progress = exercises.length > 0 ? ((currentExerciseIndex + 1) / exercises.length) * 100 : 0;

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
              onClick={() => navigate(-1)}
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
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h1 className="text-2xl font-black mb-2">
                {lesson.title}
              </h1>
              <p className="text-blue-100 font-bold">
                {lesson.description}
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      {lesson.estimated_minutes} min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      {exercises.length} ejercicios
                    </span>
                  </div>
                </div>
                
                {!lessonCompleted && exercises.length > 0 && (
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">
                      Progreso: {Math.round(progress)}%
                    </div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-2 w-32 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Content */}
              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4">
                  Contenido de la Lección
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-bold text-sm leading-relaxed">
                  {lesson.content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Section */}
        {loadingExercises ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Cargando ejercicios...
            </p>
          </div>
        ) : exercises.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md mx-auto"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <Award className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
                ¡Lección Completada!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-6">
                Esta lección no tiene ejercicios. Has completado el contenido teórico.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Volver al Curso
              </button>
            </div>
          </div>
        ) : lessonCompleted ? (
          <div className="text-center py-12">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md mx-auto"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <Award className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
                ¡Lección Completada!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-6">
                Has completado todos los ejercicios de esta lección. ¡Excelente trabajo!
              </p>
              <button
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Continuar Aprendiendo
              </button>
            </div>
          </div>
        ) : currentExercise ? (
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">
                  Ejercicio {currentExerciseIndex + 1} de {exercises.length}
                </h2>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="font-bold">{currentExercise.points} pts</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {currentExercise.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-bold mb-6">
                {currentExercise.instructions}
              </p>

              {renderExercise(currentExercise)}

              {showResults && (
                <div className="mt-6">
                  <div className={`p-4 border-2 shadow-md ${
                    exerciseResults[currentExercise.id]
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                      : 'bg-red-100 dark:bg-red-900/30 border-red-500'
                  }`}
                       style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                    <div className="flex items-center space-x-3 mb-3">
                      {exerciseResults[currentExercise.id] ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✗</span>
                        </div>
                      )}
                      <h4 className={`text-lg font-black ${
                        exerciseResults[currentExercise.id]
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-red-800 dark:text-red-200'
                      }`}>
                        {exerciseResults[currentExercise.id] ? '¡Correcto!' : 'Incorrecto'}
                      </h4>
                    </div>
                    
                    {currentExercise.content.explanation && (
                      <p className={`font-bold text-sm ${
                        exerciseResults[currentExercise.id]
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                      }`}>
                        {currentExercise.content.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {!showResults ? (
                  <button
                    onClick={handleSubmitExercise}
                    disabled={!userAnswers[currentExercise.id]}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    Comprobar Respuesta
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    {!exerciseResults[currentExercise.id] && (
                      <button
                        onClick={handleRetryExercise}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
                        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                      >
                        <RotateCcw className="w-5 h-5" />
                        <span>Reintentar</span>
                      </button>
                    )}
                    
                    <button
                      onClick={handleNextExercise}
                      className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
                      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                    >
                      <span>
                        {currentExerciseIndex < exercises.length - 1 ? 'Siguiente' : 'Finalizar Lección'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <Footer t={t} />
    </div>
  );
}

export default LessonPage;