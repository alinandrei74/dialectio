import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Clock, Target, Award, Play, Users, Globe, Star, CheckCircle } from 'lucide-react';
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
import { Course, Lesson } from '../types/learning';

function CourseOverviewPage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { user, loading: authLoading } = useAuth();
  const { courses, userProgress, fetchLessons, startCourse, loading } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [startingCourse, setStartingCourse] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const t: Translation = translations[currentLang];

  const course = courses.find(c => c.id === courseId);
  const progress = userProgress.find(p => p.course_id === courseId);

  useEffect(() => {
    // Handle authentication and course loading
    const initializePage = async () => {
      if (authLoading) return; // Wait for auth to complete

      if (!user) {
        navigate('/');
        return;
      }

      if (!courseId) {
        navigate('/learning');
        return;
      }

      // Wait for courses to load if they haven't yet
      if (loading) return;

      // Check if course exists
      if (courses.length > 0 && !course) {
        // Courses have loaded but course not found
        navigate('/learning');
        return;
      }

      // If we have the course, load lessons
      if (course) {
        setLoadingLessons(true);
        try {
          const courseLessons = await fetchLessons(courseId);
          setLessons(courseLessons);
        } catch (error) {
          console.error('Error loading lessons:', error);
        }
        setLoadingLessons(false);
      }

      setPageLoading(false);
    };

    initializePage();
  }, [courseId, user, navigate, fetchLessons, authLoading, loading, courses, course]);

  // Show loading screen while initializing
  if (authLoading || pageLoading || (loading && courses.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Cargando curso...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if course not found
  if (!course) {
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
                onClick={() => navigate('/learning')}
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

        {/* Error Content */}
        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex items-center justify-center min-h-[60vh]">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full text-center"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Curso No Encontrado
            </h2>
            <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
              El curso que buscas no existe o no está disponible.
            </p>
            <button
              onClick={() => navigate('/learning')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              Volver a Cursos
            </button>
          </div>
        </main>

        <Footer t={t} />
      </div>
    );
  }

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

  const targetLangInfo = getLanguageInfo(course.target_language);
  const sourceLangInfo = getLanguageInfo(course.source_language);

  const hasStarted = progress !== undefined;
  const completionPercentage = progress?.completion_percentage || 0;

  const handleStartCourse = async () => {
    if (!courseId) return;

    setStartingCourse(true);
    try {
      if (!hasStarted) {
        await startCourse(courseId);
      }
      navigate(`/learning/course/${courseId}`);
    } catch (error) {
      console.error('Error starting course:', error);
    }
    setStartingCourse(false);
  };

  const getLessonTypeStats = () => {
    const stats = {
      vocabulary: 0,
      grammar: 0,
      conversation: 0,
      culture: 0,
      practice: 0
    };

    lessons.forEach(lesson => {
      if (stats.hasOwnProperty(lesson.lesson_type)) {
        stats[lesson.lesson_type as keyof typeof stats]++;
      }
    });

    return stats;
  };

  const lessonTypeStats = getLessonTypeStats();

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

  const getLessonTypeName = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'Vocabulario';
      case 'grammar': return 'Gramática';
      case 'conversation': return 'Conversación';
      case 'culture': return 'Cultura';
      case 'practice': return 'Práctica';
      default: return type;
    }
  };

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
              onClick={() => navigate('/learning')}
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
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Course Hero Section */}
        <div className="mb-12">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {/* Course Image/Header */}
            <div className="relative h-64 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 overflow-hidden">
              {course.image_url ? (
                <img 
                  src={course.image_url} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Languages className="w-24 h-24 text-white opacity-50" />
                </div>
              )}
              
              {/* Language Badges */}
              <div className="absolute top-6 left-6 flex items-center space-x-3">
                <div className={`bg-gradient-to-r ${sourceLangInfo.color} text-white px-4 py-2 font-black text-sm border-2 border-black shadow-lg flex items-center space-x-2`}
                     style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                  <span className="text-lg">{sourceLangInfo.flag}</span>
                  <span>Desde {sourceLangInfo.name}</span>
                </div>
                <div className="text-white text-2xl font-black">→</div>
                <div className={`bg-gradient-to-r ${targetLangInfo.color} text-white px-4 py-2 font-black text-sm border-2 border-black shadow-lg flex items-center space-x-2`}
                     style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
                  <span className="text-lg">{targetLangInfo.flag}</span>
                  <span>Hacia {targetLangInfo.name}</span>
                </div>
              </div>

              {/* Premium Badge */}
              {course.is_premium && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 font-black text-sm border-2 border-black shadow-lg flex items-center space-x-2"
                     style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
                  <Star className="w-4 h-4" />
                  <span>PRO</span>
                </div>
              )}

              {/* Progress Indicator */}
              {hasStarted && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/50 backdrop-blur-md p-4 border-2 border-white shadow-lg"
                       style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-black text-sm">Tu Progreso</span>
                      <span className="text-white font-black text-lg">{completionPercentage}%</span>
                    </div>
                    <div className="bg-gray-300 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    {course.total_lessons}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Lecciones
                  </div>
                </div>

                <div className="bg-green-50/90 dark:bg-gray-700/90 p-4 border-2 border-green-300 dark:border-green-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                  <Clock className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    {course.estimated_hours}h
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Duración
                  </div>
                </div>

                <div className="bg-purple-50/90 dark:bg-gray-700/90 p-4 border-2 border-purple-300 dark:border-purple-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-gray-100 capitalize">
                    {course.level}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Nivel
                  </div>
                </div>

                <div className="bg-orange-50/90 dark:bg-gray-700/90 p-4 border-2 border-orange-300 dark:border-orange-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
                  <Users className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    1.2k
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Estudiantes
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={handleStartCourse}
                  disabled={startingCourse}
                  className={`px-12 py-4 font-black text-xl border-3 border-black dark:border-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center space-x-4 mx-auto ${
                    hasStarted 
                      ? 'bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800'
                      : 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800'
                  }`}
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  {startingCourse ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : hasStarted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                  <span>
                    {startingCourse ? 'Preparando...' : 
                     hasStarted ? 'Continuar Curso' : 
                     'Comenzar Curso'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lesson Types Breakdown */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black">
                Tipos de Lecciones
              </h2>
            </div>

            <div className="p-6">
              {loadingLessons ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="bg-gray-200 dark:bg-gray-600 h-16 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(lessonTypeStats).map(([type, count]) => (
                    count > 0 && (
                      <div key={type} className="flex items-center justify-between p-4 bg-gray-50/90 dark:bg-gray-700/90 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getLessonTypeIcon(type)}</span>
                          <div>
                            <h3 className="font-black text-gray-900 dark:text-gray-100">
                              {getLessonTypeName(type)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                              {count} lección{count !== 1 ? 'es' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="bg-blue-600 text-white px-3 py-1 font-black text-sm border-2 border-black shadow-lg"
                             style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                          {count}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black">
                Lo que Aprenderás
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 flex items-center justify-center border-2 border-black shadow-lg mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-gray-100">
                      Vocabulario Esencial
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Aprende las palabras y frases más importantes para comunicarte efectivamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 flex items-center justify-center border-2 border-black shadow-lg mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-gray-100">
                      Gramática Práctica
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Domina las estructuras gramaticales fundamentales con ejemplos reales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 flex items-center justify-center border-2 border-black shadow-lg mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-gray-100">
                      Conversación Real
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Practica diálogos auténticos para situaciones cotidianas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 flex items-center justify-center border-2 border-black shadow-lg mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-gray-100">
                      Contexto Cultural
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                      Comprende la cultura y costumbres del idioma que estás aprendiendo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Requirements */}
        <div className="mt-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black">
                Requisitos y Recomendaciones
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4">
                    Requisitos Previos
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 border border-black"></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Conocimiento básico de {sourceLangInfo.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 border border-black"></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Motivación para aprender un nuevo idioma
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 border border-black"></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        15-30 minutos diarios de práctica
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4">
                    Recomendaciones
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 border border-black"></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Practica regularmente para mejores resultados
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 border border-black"></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Toma notas durante las lecciones
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 border border-black"></div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        Practica con hablantes nativos cuando sea posible
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default CourseOverviewPage;