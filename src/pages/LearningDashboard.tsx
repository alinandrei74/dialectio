import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Trophy, Clock, Play, Star, Globe, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLearning } from '../hooks/useLearning';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import UserMenu from '../components/auth/UserMenu';
import Footer from '../components/layout/Footer';
import { Course } from '../types/learning';
import { supabase } from '../lib/supabase';

function LearningDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { courses, userProgress, learningStats, startCourse, loading } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [startingCourse, setStartingCourse] = useState<string | null>(null);
  const [userInitialLanguage, setUserInitialLanguage] = useState<string>('es');

  const t: Translation = translations[currentLang];

  // Debug logs
  useEffect(() => {
    console.log('LearningDashboard mounted');
    console.log('User:', user);
    console.log('Auth loading:', authLoading);
  }, [user, authLoading]);

  // Load user's initial language from profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('initial_language')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error loading user profile:', error);
            setUserInitialLanguage('es'); // fallback
          } else {
            setUserInitialLanguage(profile.initial_language || 'es');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUserInitialLanguage('es'); // fallback
        }
      }
    };

    loadUserProfile();
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('User not authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  // Don't render anything while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Cargando...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (after loading is complete)
  if (!user) {
    return null;
  }

  const handleCourseAction = async (courseId: string) => {
    // Navigate to course overview page instead of directly to course page
    navigate(`/course-overview/${courseId}`);
  };

  const isStarted = (courseId: string) => {
    return userProgress.some(p => p.course_id === courseId);
  };

  const getCourseProgress = (courseId: string) => {
    const progress = userProgress.find(p => p.course_id === courseId);
    return progress?.completion_percentage || 0;
  };

  // Filter courses based on user's initial language
  const getAvailableCourses = () => {
    let availableCourses = courses;

    // Filter by user's source language (show courses they can take)
    if (userInitialLanguage) {
      availableCourses = courses.filter(course => course.source_language === userInitialLanguage);
    }

    return availableCourses;
  };

  const filteredCourses = getAvailableCourses();

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

  const getUserSourceLanguageInfo = () => {
    return getLanguageInfo(userInitialLanguage);
  };

  // Get button text based on target language and whether course has been started
  const getButtonText = (course: Course, hasStarted: boolean, progress: number) => {
    const targetLang = course.target_language;
    
    if (hasStarted) {
      // "Continue" in the target language
      const continueTexts = {
        'es': 'Continuar',
        'fr': 'Continuer', 
        'pt': 'Continuar',
        'it': 'Continuare',
        'en': 'Continue'
      };
      return continueTexts[targetLang as keyof typeof continueTexts] || 'Continuar';
    } else {
      // "Discover/Explore [Country]" in the target language
      const exploreTexts = {
        'es': 'Descubre España',
        'fr': 'Découvre la France',
        'pt': 'Descobre Portugal', 
        'it': 'Scopri l\'Italia',
        'en': 'Discover America'
      };
      return exploreTexts[targetLang as keyof typeof exploreTexts] || 'Explorar';
    }
  };

  const completedLessons = learningStats?.completed_lessons || 0;
  const totalLessons = learningStats?.total_lessons || 0;

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
              onClick={() => navigate('/')}
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
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            Tu Aprendizaje
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-4xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              ¡Bienvenido de vuelta! Continúa tu viaje hacia el dominio de las lenguas romances.
            </p>
          </div>
        </div>

        {/* User Language Info */}
        <div className="mb-12">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-6"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getUserSourceLanguageInfo().color} flex items-center justify-center border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl`}>
                <span className="text-2xl transform -rotate-45">{getUserSourceLanguageInfo().flag}</span>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                  Aprendiendo desde {getUserSourceLanguageInfo().name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 font-bold">
                  Aprovecha tu conocimiento previo para acelerar tu aprendizaje
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        {learningStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <BookOpen className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {learningStats.completed_courses}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                Idiomas Dominados
              </p>
            </div>

            <div className="bg-green-50/90 dark:bg-gray-700/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <Trophy className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {learningStats.total_points}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                Puntos Totales
              </p>
            </div>

            <div className="bg-yellow-50/90 dark:bg-gray-700/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <Languages className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {learningStats.completed_lessons}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                Lecciones Completadas
              </p>
            </div>

            <div className="bg-purple-50/90 dark:bg-gray-700/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <Clock className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {Math.round(learningStats.time_spent_minutes / 60)}h
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                Tiempo de Estudio
              </p>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl animate-pulse"
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md mx-auto"
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">
                  No hay cursos disponibles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-bold">
                  Pronto añadiremos más cursos para tu idioma base.
                </p>
              </div>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const hasStarted = isStarted(course.id);
              const progress = getCourseProgress(course.id);
              const targetLangInfo = getLanguageInfo(course.target_language);
              const buttonText = getButtonText(course, hasStarted, progress);
              
              return (
                <div key={course.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 overflow-hidden">
                    {course.image_url ? (
                      <img 
                        src={course.image_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Languages className="w-16 h-16 text-white opacity-50" />
                      </div>
                    )}
                    
                    {/* Language Badge */}
                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${targetLangInfo.color} text-white px-3 py-1 font-black text-xs border-2 border-black shadow-lg flex items-center space-x-1`}
                         style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                      <span className="text-sm">{targetLangInfo.flag}</span>
                      <span>{targetLangInfo.name}</span>
                    </div>

                    {/* Premium Badge */}
                    {course.is_premium && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 font-black text-xs border-2 border-black shadow-lg flex items-center space-x-1"
                           style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
                        <Star className="w-3 h-3" />
                        <span>PRO</span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {hasStarted && progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                        <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-white text-xs font-bold mt-1">
                          {progress}% completado
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-3">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-700 dark:text-gray-300 font-bold text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between mb-4 text-xs font-bold text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.total_lessons} lecciones</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.estimated_hours}h</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flag className="w-4 h-4" />
                        <span>{targetLangInfo.name}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleCourseAction(course.id)}
                      disabled={startingCourse === course.id}
                      className={`w-full py-3 font-black text-sm border-3 border-black dark:border-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                        hasStarted 
                          ? 'bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800'
                          : 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800'
                      }`}
                      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                    >
                      {startingCourse === course.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>{buttonText}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Call to Action for More Languages */}
        {filteredCourses.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-2xl mx-auto"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
                ¿Quieres aprender desde otro idioma?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
                Cambia tu idioma base en configuración para acceder a más cursos y acelerar tu aprendizaje.
              </p>
              <button
                onClick={() => navigate('/settings')}
                className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-purple-700 hover:to-purple-900 dark:hover:from-purple-600 dark:hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Ir a Configuración
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}

export default LearningDashboard;