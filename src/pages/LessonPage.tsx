import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Play, CheckCircle, Clock, Target, Award, RotateCcw, ArrowRight, X } from 'lucide-react';
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
import ChatbotPanel from '../components/learning/ChatbotPanel';
import ExerciseRenderer from '../components/learning/ExerciseRenderer';
import { Course, Exercise, Unit, Part, ExerciseValidationResult } from '../types/learning';

function LessonPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>(); // Este es realmente un unitId
  const { user, loading: authLoading } = useAuth(); // Import authLoading
  const { 
    courses, 
    fetchExercises, 
    completeLesson, 
    submitExerciseResult,
    fetchUnitStructure,
    fetchAllUnitsInPart,
    loading: dataLoading
  } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  
  // Estados principales
  const [course, setCourse] = useState<Course | null>(null);
  const [part, setPart] = useState<Part | null>(null);
  const [preparationUnits, setPreparationUnits] = useState<Unit[]>([]);
  const [conversationUnits, setConversationUnits] = useState<Unit[]>([]);
  const [activeExerciseUnit, setActiveExerciseUnit] = useState<Unit | null>(null);
  const [activeSituationUnit, setActiveSituationUnit] = useState<Unit | null>(null);
  
  // Estados de ejercicios
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [exerciseResults, setExerciseResults] = useState<Record<string, ExerciseValidationResult>>({});
  const [showResults, setShowResults] = useState(false);
  const [showHints, setShowHints] = useState(false);
  
  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);

  // NEW: Estado para el idioma del curso
  const [courseTargetLanguage, setCourseTargetLanguage] = useState<string>('es');

  const t: Translation = translations[currentLang];

  useEffect(() => {
    console.log('🔍 LessonPage: useEffect triggered');
    console.log('- Auth Loading:', authLoading);
    console.log('- User:', user?.id || 'No user');
    console.log('- Lesson ID:', lessonId);
    console.log('- Data Loading:', dataLoading);

    // Wait for authentication to complete before making any decisions
    if (authLoading) {
      console.log('🔄 LessonPage: Waiting for authentication to complete...');
      return;
    }

    // Now we can safely check authentication
    if (!user) {
      console.log('🚫 LessonPage: User not authenticated, redirecting to home');
      navigate('/');
      return;
    }

    if (!lessonId) {
      console.log('🚫 LessonPage: No lessonId provided, redirecting to learning dashboard');
      navigate('/learning');
      return;
    }

    // If we have user and lessonId, proceed with loading lesson data
    console.log('✅ LessonPage: User authenticated, loading lesson data...');
    loadLessonData();
  }, [lessonId, user, navigate, authLoading]);

  const loadLessonData = async () => {
    if (!lessonId) return;

    setLoading(true);
    try {
      console.log('🔍 LessonPage: Fetching unit structure for:', lessonId);
      
      // Obtener la estructura completa de la unidad
      const unitStructure = await fetchUnitStructure(lessonId);
      
      if (!unitStructure) {
        console.log('❌ LessonPage: Unit structure not found, redirecting to learning dashboard');
        navigate('/learning');
        return;
      }

      console.log('✅ LessonPage: Unit structure loaded:', unitStructure);

      // Extraer datos de la estructura
      const currentUnit = unitStructure;
      const currentPart = unitStructure.phases.parts;
      const currentCourse = unitStructure.phases.parts.courses;

      setCourse(currentCourse);
      setPart(currentPart);

      // NEW: Establecer el idioma del curso
      setCourseTargetLanguage(currentCourse.target_language);
      console.log('🌍 LessonPage: Course target language set to:', currentCourse.target_language);

      console.log('📚 LessonPage: Course:', currentCourse.title);
      console.log('📖 LessonPage: Part:', currentPart.title);
      console.log('🎯 LessonPage: Unit:', currentUnit.title, '(', currentUnit.kind, ')');

      // Obtener todas las unidades de esta parte
      const { preparationUnits: prepUnits, conversationUnits: convUnits } = 
        await fetchAllUnitsInPart(currentPart.id);

      console.log('📝 LessonPage: Preparation units:', prepUnits.length);
      console.log('💬 LessonPage: Conversation units:', convUnits.length);

      setPreparationUnits(prepUnits);
      setConversationUnits(convUnits);

      // Establecer unidades activas
      if (currentUnit.kind === 'exercise') {
        console.log('🎯 LessonPage: Setting active exercise unit:', currentUnit.title);
        setActiveExerciseUnit(currentUnit);
        // Si hay unidades de conversación, seleccionar la primera
        if (convUnits.length > 0) {
          console.log('💬 LessonPage: Setting active situation unit:', convUnits[0].title);
          setActiveSituationUnit(convUnits[0]);
        }
      } else if (currentUnit.kind === 'situation') {
        console.log('💬 LessonPage: Setting active situation unit:', currentUnit.title);
        setActiveSituationUnit(currentUnit);
        // Si hay unidades de ejercicio, seleccionar la primera
        if (prepUnits.length > 0) {
          console.log('🎯 LessonPage: Setting active exercise unit:', prepUnits[0].title);
          setActiveExerciseUnit(prepUnits[0]);
        }
      }

      // Cargar ejercicios para la unidad de ejercicios activa
      if (currentUnit.kind === 'exercise') {
        console.log('📝 LessonPage: Loading exercises for current unit...');
        const unitExercises = await fetchExercises(currentUnit.id);
        console.log('✅ LessonPage: Loaded', unitExercises.length, 'exercises');
        setExercises(unitExercises);
      } else if (prepUnits.length > 0) {
        console.log('📝 LessonPage: Loading exercises for first preparation unit...');
        const unitExercises = await fetchExercises(prepUnits[0].id);
        console.log('✅ LessonPage: Loaded', unitExercises.length, 'exercises');
        setExercises(unitExercises);
      }

      setPageInitialized(true);
      console.log('✅ LessonPage: Page initialization complete');

    } catch (error) {
      console.error('💥 LessonPage: Error loading lesson data:', error);
      navigate('/learning');
    }
    setLoading(false);
  };

  const handleUnitChange = async (unit: Unit, type: 'exercise' | 'situation') => {
    console.log('🔄 LessonPage: Changing unit:', unit.title, 'type:', type);
    
    if (type === 'exercise') {
      setActiveExerciseUnit(unit);
      // Cargar ejercicios para esta unidad
      console.log('📝 LessonPage: Loading exercises for unit:', unit.title);
      const unitExercises = await fetchExercises(unit.id);
      setExercises(unitExercises);
      // Resetear estado de ejercicios
      setCurrentExerciseIndex(0);
      setUserAnswers({});
      setCompletedExercises(new Set());
      setExerciseResults({});
      setShowResults(false);
      console.log('✅ LessonPage: Unit changed and exercises loaded');
    } else {
      setActiveSituationUnit(unit);
      console.log('✅ LessonPage: Situation unit changed');
    }
  };

  const handleAnswerChange = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };

  const handleSubmitExercise = async () => {
    if (!activeExerciseUnit || exercises.length === 0) return;

    const currentExercise = exercises[currentExerciseIndex];
    const userAnswer = userAnswers[currentExercise.id] || '';

    if (!userAnswer.trim()) return;

    console.log('📝 LessonPage: Submitting exercise:', currentExercise.title);
    setSubmitting(true);

    try {
      // Use the new intelligent validation system
      const result = await submitExerciseResult(
        currentExercise.id,
        userAnswer,
        currentExercise
      );

      console.log('✅ LessonPage: Exercise result:', result);

      // Store the result
      setExerciseResults(prev => ({
        ...prev,
        [currentExercise.id]: result
      }));

      // Mark exercise as completed
      setCompletedExercises(prev => new Set([...prev, currentExercise.id]));

      // Move to next exercise or show results
      if (currentExerciseIndex < exercises.length - 1) {
        setTimeout(() => {
          setCurrentExerciseIndex(prev => prev + 1);
        }, 2000); // Show result for 2 seconds before moving to next
      } else {
        // All exercises completed
        setShowResults(true);
        
        // Mark lesson as completed
        if (course) {
          console.log('🎉 LessonPage: Completing lesson for course:', course.title);
          await completeLesson(course.id, activeExerciseUnit.id);
        }
      }

    } catch (error) {
      console.error('💥 LessonPage: Error submitting exercise:', error);
    }

    setSubmitting(false);
  };

  const handleRetryExercise = () => {
    const currentExercise = exercises[currentExerciseIndex];
    console.log('🔄 LessonPage: Retrying exercise:', currentExercise.title);
    
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
    console.log('🔙 LessonPage: Going back to course');
    if (course) {
      navigate(`/learning/course/${course.id}`);
    } else {
      navigate('/learning');
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      console.log('➡️ LessonPage: Moving to next exercise');
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      console.log('⬅️ LessonPage: Moving to previous exercise');
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  // Show loading screen while authentication is being determined or while initializing
  if (authLoading || loading || !pageInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {authLoading ? 'Verificando autenticación...' : 
               loading ? 'Cargando lección...' : 
               'Inicializando interfaz...'}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 font-mono">
                <div>Auth Loading: {authLoading ? 'true' : 'false'}</div>
                <div>Data Loading: {loading ? 'true' : 'false'}</div>
                <div>Page Initialized: {pageInitialized ? 'true' : 'false'}</div>
                <div>Lesson ID: {lessonId || 'none'}</div>
                <div>User: {user ? 'authenticated' : 'not authenticated'}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If we reach here, authentication is complete and user is authenticated
  if (!part || !course) {
    return null; // This should not happen due to the loadLessonData logic above
  }

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
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Part Header */}
        <div className="mb-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black mb-1">
                    {part.title}
                  </h1>
                  <p className="text-purple-100 font-bold">
                    {part.synopsis || 'Practica ejercicios y conversaciones'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black">
                    {course.title}
                  </div>
                  <div className="text-purple-100 font-bold text-sm">
                    Curso completo • {courseTargetLanguage.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exercise Units Navigation */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Ejercicios</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {preparationUnits.map((unit, index) => (
                      <button
                        key={unit.id}
                        onClick={() => handleUnitChange(unit, 'exercise')}
                        className={`px-4 py-2 font-bold text-sm border-3 transition-all duration-300 ${
                          activeExerciseUnit?.id === unit.id
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                            : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 hover:shadow-lg bg-white dark:bg-gray-800'
                        }`}
                        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                      >
                        {index + 1}. {unit.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation Units Navigation */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                    <Languages className="w-5 h-5" />
                    <span>Conversaciones</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {conversationUnits.map((unit, index) => (
                      <button
                        key={unit.id}
                        onClick={() => handleUnitChange(unit, 'situation')}
                        className={`px-4 py-2 font-bold text-sm border-3 transition-all duration-300 ${
                          activeSituationUnit?.id === unit.id
                            ? 'bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                            : 'hover:bg-green-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 hover:shadow-lg bg-white dark:bg-gray-800'
                        }`}
                        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                      >
                        {index + 1}. {unit.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Split View Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
          {/* Left Panel - Exercises */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {activeExerciseUnit ? (
              <>
                <div className="p-4 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black">
                        {activeExerciseUnit.title}
                      </h2>
                      {exercises.length > 0 && (
                        <p className="text-blue-100 font-bold text-sm">
                          Ejercicio {currentExerciseIndex + 1} de {exercises.length}
                        </p>
                      )}
                    </div>
                    
                    {exercises.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowHints(!showHints)}
                          className="px-3 py-1 bg-white/20 text-white font-bold text-xs border-2 border-white hover:bg-white/30 transition-all duration-300"
                          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                        >
                          {showHints ? 'Ocultar' : 'Mostrar'} Pistas
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 h-[500px] overflow-y-auto">
                  {exercises.length > 0 && !showResults ? (
                    <>
                      {/* Exercise Instructions */}
                      <div className="mb-6">
                        <p className="text-gray-700 dark:text-gray-300 font-bold text-lg mb-4">
                          {currentExercise.instructions}
                        </p>
                      </div>

                      {/* Exercise Content */}
                      <div className="mb-8">
                        <ExerciseRenderer
                          exercise={currentExercise}
                          userAnswer={userAnswer}
                          onAnswerChange={(answer) => handleAnswerChange(currentExercise.id, answer)}
                          isCompleted={isExerciseCompleted}
                          showHints={showHints}
                        />
                      </div>

                      {/* Navigation and Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {/* Previous Exercise */}
                          <button
                            onClick={handlePreviousExercise}
                            disabled={currentExerciseIndex === 0}
                            className="bg-gray-600 text-white px-4 py-2 font-black text-sm border-3 border-black dark:border-gray-300 hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg flex items-center space-x-2"
                            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Anterior</span>
                          </button>

                          {/* Next Exercise */}
                          <button
                            onClick={handleNextExercise}
                            disabled={currentExerciseIndex === exercises.length - 1}
                            className="bg-gray-600 text-white px-4 py-2 font-black text-sm border-3 border-black dark:border-gray-300 hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg flex items-center space-x-2"
                            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                          >
                            <span>Siguiente</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          {/* Retry Exercise */}
                          {isExerciseCompleted && (
                            <button
                              onClick={handleRetryExercise}
                              className="bg-orange-600 text-white px-4 py-2 font-black text-sm border-3 border-black dark:border-gray-300 hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Reintentar</span>
                            </button>
                          )}
                        </div>

                        {/* Submit Button */}
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
                            <Play className="w-5 h-5" />
                          )}
                          <span>
                            {submitting ? 'Enviando...' : 
                             isExerciseCompleted ? 'Completado' : 
                             'Comprobar'}
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
                    </>
                  ) : showResults ? (
                    /* Results Screen */
                    <div className="text-center py-8">
                      <Award className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
                      <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
                        ¡Ejercicios Completados!
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
                        Has completado todos los ejercicios de "{activeExerciseUnit.title}".
                      </p>
                      <div className="bg-green-50/90 dark:bg-green-900/30 border-3 border-green-500 p-6 shadow-lg mb-6"
                           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                        <div className="text-2xl font-black text-green-800 dark:text-green-200">
                          {Object.values(exerciseResults).reduce((sum, result) => sum + (result?.score || 0), 0)} puntos
                        </div>
                        <div className="text-green-700 dark:text-green-300 font-bold">
                          Puntos ganados
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* No Exercises Available */
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
                        Contenido en Desarrollo
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-bold">
                        Los ejercicios para esta unidad se están preparando. ¡Vuelve pronto!
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6 text-center h-full flex items-center justify-center">
                <div>
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
                    Selecciona una Unidad de Ejercicios
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-bold">
                    Elige una unidad de ejercicios de la navegación superior para comenzar.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Chatbot */}
          <div>
            {activeSituationUnit ? (
              <ChatbotPanel 
                unit={activeSituationUnit}
                targetLanguage={courseTargetLanguage}
                onComplete={() => {
                  console.log('💬 LessonPage: Conversation completed');
                }}
              />
            ) : (
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-6 text-center h-full flex items-center justify-center"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                <div>
                  <Languages className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-4">
                    Selecciona una Situación de Conversación
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-bold">
                    Elige una situación de conversación de la navegación superior para practicar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default LessonPage;