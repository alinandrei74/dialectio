import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Play, CheckCircle, Lock, Clock, Target, Award } from 'lucide-react';
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

function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { courses, userProgress, fetchLessons, loading } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);

  const t: Translation = translations[currentLang];

  const course = courses.find(c => c.id === courseId);
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

    // Check if user is enrolled in this course
    if (course && !progress) {
      navigate('/learning');
      return;
    }

    // Fetch lessons for this course
    const loadLessons = async () => {
      if (courseId) {
        setLoadingLessons(true);
        const courseLessons = await fetchLessons(courseId);
        setLessons(courseLessons);
        setLoadingLessons(false);
      }
    };

    loadLessons();
  }, [courseId, course, progress, user, navigate, fetchLessons]);

  if (!user || !course || !progress) {
    return null;
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.completed_lessons?.includes(lessonId) || false;
  };

  const isLessonUnlocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    return isLessonCompleted(lessons[lessonIndex - 1]?.id);
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/learning/lesson/${lessonId}`);
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

  const completedLessons = progress.completed_lessons?.length || 0;
  const totalLessons = lessons.length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

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
        {/* Course Header */}
        <div className="mb-12">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {/* Course Info Header */}
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black mb-2">
                    {course.title}
                  </h1>
                  <p className="text-blue-100 font-bold">
                    {course.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black mb-1">
                    {completionPercentage}%
                  </div>
                  <div className="text-blue-100 font-bold text-sm">
                    Completado
                  </div>
                </div>
              </div>
            </div>

            {/* Progress and Stats */}
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    Progreso del curso
                  </span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {completedLessons} de {totalLessons} lecciones
                  </span>
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded-full overflow-hidden border-2 border-black dark:border-gray-300">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {totalLessons}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Lecciones Totales
                  </div>
                </div>

                <div className="bg-green-50/90 dark:bg-gray-700/90 p-4 border-2 border-green-300 dark:border-green-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {completedLessons}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Completadas
                  </div>
                </div>

                <div className="bg-yellow-50/90 dark:bg-gray-700/90 p-4 border-2 border-yellow-300 dark:border-yellow-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {course.estimated_hours}h
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Duración Estimada
                  </div>
                </div>

                <div className="bg-purple-50/90 dark:bg-gray-700/90 p-4 border-2 border-purple-300 dark:border-purple-500 shadow-md text-center"
                     style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
                  <Award className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {progress.total_points}
                  </div>
                  <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Puntos Ganados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-6">
            Lecciones del Curso
          </h2>

          {loadingLessons ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl animate-pulse"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                <div className="p-6 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                  <div className="w-24 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))
          ) : lessons.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md mx-auto"
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">
                  No hay lecciones disponibles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-bold">
                  Las lecciones se añadirán pronto.
                </p>
              </div>
            </div>
          ) : (
            lessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(lesson.id);
              const isUnlocked = isLessonUnlocked(index);
              
              return (
                <div key={lesson.id} className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl transition-all duration-300 ${
                  isUnlocked ? 'hover:shadow-2xl hover:scale-105' : 'opacity-60'
                }`}
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-6">
                      {/* Lesson Number and Type */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 bg-gradient-to-r ${getLessonTypeColor(lesson.lesson_type)} flex items-center justify-center border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl`}>
                          <div className="transform -rotate-45 text-center">
                            <div className="text-white font-black text-lg">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                            {lesson.title}
                          </h3>
                          <div className={`bg-gradient-to-r ${getLessonTypeColor(lesson.lesson_type)} text-white px-3 py-1 font-black text-xs border-2 border-black shadow-lg flex items-center space-x-1`}
                               style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                            <span>{getLessonTypeIcon(lesson.lesson_type)}</span>
                            <span>{getLessonTypeName(lesson.lesson_type)}</span>
                          </div>
                          {isCompleted && (
                            <div className="bg-green-500 text-white p-1 rounded-full">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 font-bold text-sm mb-3">
                          {lesson.description}
                        </p>

                        <div className="flex items-center space-x-4 text-xs font-bold text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.estimated_minutes} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>Lección {index + 1} de {totalLessons}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        {isUnlocked ? (
                          <button
                            onClick={() => handleStartLesson(lesson.id)}
                            className={`px-6 py-3 font-black text-sm border-3 border-black dark:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 ${
                              isCompleted 
                                ? 'bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800'
                                : 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800'
                            }`}
                            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Revisar</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Comenzar</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="px-6 py-3 bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 font-black text-sm border-3 border-gray-500 dark:border-gray-500 shadow-lg flex items-center space-x-2"
                               style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                            <Lock className="w-4 h-4" />
                            <span>Bloqueada</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Course Completion */}
        {completionPercentage === 100 && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-2xl mx-auto"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-4">
                ¡Felicitaciones!
              </h3>
              <p className="font-bold mb-6">
                Has completado exitosamente el curso "{course.title}". 
                ¡Continúa tu aprendizaje con más cursos!
              </p>
              <button
                onClick={() => navigate('/learning')}
                className="bg-white text-green-800 px-8 py-3 font-black text-lg border-3 border-black hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Explorar Más Cursos
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}

export default CoursePage;