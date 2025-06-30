import React, { useState } from 'react';
import { ArrowLeft, Languages, Play, BookOpen, MessageCircle, Award, Globe, Star, CheckCircle, Users, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';

function DemoPage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [activeDemo, setActiveDemo] = useState<string>('overview');

  const t: Translation = translations[currentLang];

  const demoSections = [
    { id: 'overview', name: 'Visión General', icon: Globe },
    { id: 'exercises', name: 'Ejercicios', icon: BookOpen },
    { id: 'conversation', name: 'Conversación IA', icon: MessageCircle },
    { id: 'progress', name: 'Progreso', icon: Award }
  ];

  const languageExamples = [
    { from: 'es', to: 'it', example: 'La casa → La casa', description: 'Español a Italiano' },
    { from: 'es', to: 'fr', example: 'El libro → Le livre', description: 'Español a Francés' },
    { from: 'es', to: 'pt', example: 'La música → A música', description: 'Español a Portugués' },
    { from: 'fr', to: 'it', example: 'La maison → La casa', description: 'Francés a Italiano' }
  ];

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            Demo Interactiva
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-4xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              Explora cómo Dialectio revoluciona el aprendizaje de lenguas romances aprovechando tus conocimientos previos.
            </p>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="mb-12">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black text-center">
                Funcionalidades Principales
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {demoSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveDemo(section.id)}
                    className={`p-4 border-3 transition-all duration-300 font-bold text-sm ${
                      activeDemo === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                        : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 hover:shadow-lg bg-white dark:bg-gray-800'
                    }`}
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <section.icon className="w-8 h-8" />
                      <span>{section.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Demo Content */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {activeDemo === 'overview' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">
                    Aprendizaje Inteligente
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-green-50/90 dark:bg-gray-700/90 p-4 border-2 border-green-300 dark:border-green-500 shadow-md"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <h4 className="font-black text-green-800 dark:text-green-200 mb-2">
                        🧠 Transferencia Positiva
                      </h4>
                      <p className="text-green-700 dark:text-green-300 font-bold text-sm">
                        Aprovecha las similitudes entre lenguas romances para acelerar tu aprendizaje.
                      </p>
                    </div>

                    <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md"
                         style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                      <h4 className="font-black text-blue-800 dark:text-blue-200 mb-2">
                        🎯 Adaptación Inteligente
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 font-bold text-sm">
                        El sistema se adapta a tu nivel y progreso, ofreciendo contenido personalizado.
                      </p>
                    </div>

                    <div className="bg-purple-50/90 dark:bg-gray-700/90 p-4 border-2 border-purple-300 dark:border-purple-500 shadow-md"
                         style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                      <h4 className="font-black text-purple-800 dark:text-purple-200 mb-2">
                        🤖 IA Conversacional
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 font-bold text-sm">
                        Practica conversaciones reales con tutores de IA especializados en cada idioma.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDemo === 'exercises' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">
                    Ejercicios Interactivos
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50/90 dark:bg-gray-700/90 p-4 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <h4 className="font-black text-gray-900 dark:text-gray-100 mb-3">
                        📝 Ejemplo: Traducción Inteligente
                      </h4>
                      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600 mb-3">
                        <p className="text-gray-800 dark:text-gray-200 font-bold">
                          ES: "La casa es muy luminosa"
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 font-bold">
                          IT: "La casa è molto luminosa"
                        </p>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                        Nota las similitudes y diferencias sutiles entre idiomas.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-100/90 dark:bg-green-900/30 p-3 border border-green-400 text-center">
                        <div className="text-green-800 dark:text-green-200 font-black text-sm">Opción múltiple</div>
                      </div>
                      <div className="bg-blue-100/90 dark:bg-blue-900/30 p-3 border border-blue-400 text-center">
                        <div className="text-blue-800 dark:text-blue-200 font-black text-sm">Completar</div>
                      </div>
                      <div className="bg-purple-100/90 dark:bg-purple-900/30 p-3 border border-purple-400 text-center">
                        <div className="text-purple-800 dark:text-purple-200 font-black text-sm">Traducción</div>
                      </div>
                      <div className="bg-orange-100/90 dark:bg-orange-900/30 p-3 border border-orange-400 text-center">
                        <div className="text-orange-800 dark:text-orange-200 font-black text-sm">Audio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDemo === 'conversation' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">
                    Conversación con IA
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-100/90 dark:bg-gray-700/90 p-4 border-2 border-gray-400 dark:border-gray-500 shadow-md"
                         style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                      <div className="flex items-center space-x-3 mb-2">
                        <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="font-black text-gray-900 dark:text-gray-100 text-sm">Tutor IA</span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 font-bold text-sm">
                        "Ciao! Come stai oggi? Parliamo del tempo in Italia."
                      </p>
                    </div>

                    <div className="bg-blue-100/90 dark:bg-blue-900/30 p-4 border-2 border-blue-400 dark:border-blue-500 shadow-md"
                         style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-black text-blue-900 dark:text-blue-100 text-sm">Estudiante</span>
                      </div>
                      <p className="text-blue-800 dark:text-blue-200 font-bold text-sm">
                        "Ciao! Sto bene, grazie. Oggi fa bel tempo qui."
                      </p>
                    </div>

                    <div className="bg-green-50/90 dark:bg-green-900/30 p-3 border-2 border-green-400 dark:border-green-500 shadow-md"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <h4 className="font-black text-green-800 dark:text-green-200 mb-2 text-sm">
                        ✨ Análisis en tiempo real:
                      </h4>
                      <ul className="text-green-700 dark:text-green-300 font-bold text-xs space-y-1">
                        <li>• Pronunciación: Excelente</li>
                        <li>• Gramática: Correcta</li>
                        <li>• Fluidez: 85/100</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeDemo === 'progress' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">
                    Seguimiento de Progreso
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 text-center shadow-md"
                           style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                        <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-black text-blue-900 dark:text-blue-100">47h</div>
                        <div className="text-blue-700 dark:text-blue-300 font-bold text-xs">Tiempo estudiado</div>
                      </div>

                      <div className="bg-green-50/90 dark:bg-gray-700/90 p-4 border-2 border-green-300 dark:border-green-500 text-center shadow-md"
                           style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                        <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-black text-green-900 dark:text-green-100">1,250</div>
                        <div className="text-green-700 dark:text-green-300 font-bold text-xs">Puntos ganados</div>
                      </div>
                    </div>

                    <div className="bg-purple-50/90 dark:bg-gray-700/90 p-4 border-2 border-purple-300 dark:border-purple-500 shadow-md"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <h4 className="font-black text-purple-800 dark:text-purple-200 mb-3">
                        📊 Progreso por idioma:
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-700 dark:text-purple-300 font-bold text-sm">🇮🇹 Italiano</span>
                          <span className="text-purple-900 dark:text-purple-100 font-black">78%</span>
                        </div>
                        <div className="bg-purple-200 dark:bg-purple-800 h-2 rounded-full">
                          <div className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50/90 dark:bg-gray-700/90 p-3 border-2 border-yellow-400 dark:border-yellow-500 shadow-md"
                         style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <span className="font-black text-yellow-800 dark:text-yellow-200 text-sm">
                          Racha actual: 12 días
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Panel - Language Examples */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h3 className="text-xl font-black">
                Conexiones Lingüísticas
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {languageExamples.map((example, index) => (
                  <div key={index} className="bg-gray-50/90 dark:bg-gray-700/90 p-4 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                       style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-gray-900 dark:text-gray-100 text-sm">
                        {example.description}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{example.from === 'es' ? '🇪🇸' : example.from === 'fr' ? '🇫🇷' : '🇮🇹'}</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-lg">{example.to === 'it' ? '🇮🇹' : example.to === 'fr' ? '🇫🇷' : '🇵🇹'}</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600">
                      <p className="text-gray-800 dark:text-gray-200 font-bold text-center">
                        {example.example}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md"
                     style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                  <h4 className="font-black text-blue-800 dark:text-blue-200 mb-2">
                    🔗 Ventajas del método:
                  </h4>
                  <ul className="text-blue-700 dark:text-blue-300 font-bold text-sm space-y-1">
                    <li>• Aprendizaje 3x más rápido</li>
                    <li>• Mayor retención de vocabulario</li>
                    <li>• Comprensión intuitiva de gramática</li>
                    <li>• Confianza desde el primer día</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-2xl mx-auto"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
              ¿Listo para Comenzar?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
              Experimenta el futuro del aprendizaje de idiomas con Dialectio.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default DemoPage;