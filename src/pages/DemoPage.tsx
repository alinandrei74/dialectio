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
  const [activeDemo, setActiveDemo] = useState<string>('exercise');

  const t: Translation = translations[currentLang];

  const demoSections = [
    {
      id: 'exercise',
      title: 'Ejercicios Interactivos',
      icon: BookOpen,
      description: 'Practica con ejercicios adaptativos que se ajustan a tu nivel'
    },
    {
      id: 'conversation',
      title: 'Conversación con IA',
      icon: MessageCircle,
      description: 'Habla con tutores virtuales en tiempo real'
    },
    {
      id: 'progress',
      title: 'Seguimiento de Progreso',
      icon: Award,
      description: 'Visualiza tu avance y logros conseguidos'
    }
  ];

  const languageExamples = [
    {
      from: 'es',
      to: 'it',
      fromText: 'Hola, ¿cómo estás?',
      toText: 'Ciao, come stai?',
      fromFlag: '🇪🇸',
      toFlag: '🇮🇹'
    },
    {
      from: 'es',
      to: 'fr',
      fromText: 'Me gusta mucho la música',
      toText: 'J\'aime beaucoup la musique',
      fromFlag: '🇪🇸',
      toFlag: '🇫🇷'
    },
    {
      from: 'es',
      to: 'pt',
      fromText: 'Vamos a la playa',
      toText: 'Vamos à praia',
      fromFlag: '🇪🇸',
      toFlag: '🇵🇹'
    }
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
              Explora las características principales de Dialectio y descubre cómo revolucionamos el aprendizaje de lenguas romances.
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
                Características Principales
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {demoSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveDemo(section.id)}
                    className={`p-6 border-3 transition-all duration-300 font-bold text-left ${
                      activeDemo === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                        : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 hover:shadow-lg bg-white dark:bg-gray-800'
                    }`}
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <section.icon className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-black mb-2">{section.title}</h3>
                    <p className="text-sm opacity-90">{section.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Panel - Demo Showcase */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {activeDemo === 'exercise' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">Ejercicio de Traducción</h3>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md mb-4"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <p className="text-blue-800 dark:text-blue-200 font-bold">
                        🇪🇸 Español: "Me gusta mucho la música clásica"
                      </p>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 font-bold mb-4">
                      Traduce esta frase al italiano:
                    </p>
                    
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                      placeholder="Escribe tu traducción aquí..."
                    />
                  </div>

                  <div className="bg-green-50/90 dark:bg-green-900/30 border-2 border-green-500 p-4 shadow-md"
                       style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-800 dark:text-green-200 font-bold">¡Correcto!</span>
                    </div>
                    <p className="text-green-700 dark:text-green-300 font-bold text-sm">
                      🇮🇹 "Mi piace molto la musica classica"
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeDemo === 'conversation' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">Conversación con Marco (IA)</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-200 dark:bg-gray-700 p-3 max-w-xs border-2 border-black dark:border-gray-300 shadow-lg"
                         style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                      <p className="text-gray-900 dark:text-gray-100 font-bold text-sm">
                        🤖 Ciao! Come stai oggi?
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white p-3 max-w-xs border-2 border-black shadow-lg"
                         style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                      <p className="font-bold text-sm">
                        Ciao Marco! Sto bene, grazie.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gray-200 dark:bg-gray-700 p-3 max-w-xs border-2 border-black dark:border-gray-300 shadow-lg"
                         style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                      <p className="text-gray-900 dark:text-gray-100 font-bold text-sm">
                        🤖 Perfetto! Cosa hai fatto oggi?
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50/90 dark:bg-yellow-900/30 border-2 border-yellow-500 p-3 shadow-md"
                       style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                    <p className="text-yellow-800 dark:text-yellow-200 font-bold text-xs">
                      💡 La IA analiza tu pronunciación y gramática en tiempo real
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeDemo === 'progress' && (
              <>
                <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700 text-white mx-2 mt-2"
                     style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <h3 className="text-xl font-black">Tu Progreso</h3>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md text-center"
                         style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                      <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-black text-gray-900 dark:text-gray-100">85%</div>
                      <div className="text-xs font-bold text-gray-600 dark:text-gray-400">Italiano</div>
                    </div>

                    <div className="bg-green-50/90 dark:bg-gray-700/90 p-4 border-2 border-green-300 dark:border-green-500 shadow-md text-center"
                         style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                      <Award className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-black text-gray-900 dark:text-gray-100">1,250</div>
                      <div className="text-xs font-bold text-gray-600 dark:text-gray-400">Puntos</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Progreso semanal</span>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400">7/7 días</span>
                    </div>
                    <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded-full overflow-hidden border-2 border-black dark:border-gray-300">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-full w-full"></div>
                    </div>
                  </div>

                  <div className="bg-purple-50/90 dark:bg-purple-900/30 border-2 border-purple-500 p-4 shadow-md"
                       style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-purple-800 dark:text-purple-200 font-bold">¡Racha de 7 días!</span>
                    </div>
                    <p className="text-purple-700 dark:text-purple-300 font-bold text-sm">
                      Mantén tu constancia para desbloquear más logros
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Panel - Language Examples */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-500 dark:to-teal-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h3 className="text-xl font-black">Conexiones Lingüísticas</h3>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                Descubre cómo las lenguas romances se conectan entre sí:
              </p>

              {languageExamples.map((example, index) => (
                <div key={index} className="bg-gray-50/90 dark:bg-gray-700/90 p-4 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{example.fromFlag}</span>
                    <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-400 dark:border-gray-500"></div>
                    <span className="text-2xl">{example.toFlag}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-900 dark:text-gray-100 font-bold text-sm">
                      "{example.fromText}"
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                      "{example.toText}"
                    </p>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50/90 dark:bg-blue-900/30 border-2 border-blue-500 p-4 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <p className="text-blue-800 dark:text-blue-200 font-bold text-sm">
                  💡 Dialectio aprovecha estas similitudes para acelerar tu aprendizaje hasta 3x más rápido
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black text-center">
                ¿Por qué Dialectio es Diferente?
              </h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                    <Globe className="w-8 h-8 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-3">
                    Método Científico
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                    Basado en investigación neurocientífica sobre transferencia lingüística positiva
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                    <MessageCircle className="w-8 h-8 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-3">
                    IA Conversacional
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                    Practica con tutores virtuales que se adaptan a tu nivel y estilo de aprendizaje
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                    <Users className="w-8 h-8 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-3">
                    Comunidad Activa
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                    Conecta con otros estudiantes y hablantes nativos de todo el mundo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-2xl mx-auto"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
              ¿Listo para Comenzar?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
              Únete a miles de estudiantes que ya están dominando nuevas lenguas con Dialectio.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3 mx-auto"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <Play className="w-6 h-6" />
              <span>Comenzar Ahora</span>
            </button>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default DemoPage;