import React, { useState } from 'react';
import { ArrowLeft, Languages, FileText, Users, Shield, AlertTriangle, Scale, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';

function TermsAndConditionsPage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');

  const t: Translation = translations[currentLang];

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
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            {t.termsAndConditions}
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.termsAndConditionsSubtitle}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
             style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
          
          {/* Header */}
          <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-white/20 flex items-center justify-center transform rotate-45 border-2 border-white shadow-lg">
                <FileText className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <h2 className="text-2xl font-black">
                {t.termsAndConditions}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Demo Notice */}
            <div className="bg-yellow-50/90 dark:bg-yellow-900/30 border-3 border-yellow-500 p-6 mb-8 shadow-lg"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <p className="text-yellow-800 dark:text-yellow-200 font-bold text-center">
                {t.termsAndConditionsPlaceholder}
              </p>
            </div>

            {/* Basic Terms for Demo */}
            <div className="space-y-8">
              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Users className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    1. Aceptación de Términos (Demo)
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• Al usar esta demostración técnica, aceptas estos términos básicos</p>
                  <p>• Esta aplicación es solo para fines de evaluación y demostración</p>
                  <p>• No se garantiza disponibilidad continua del servicio durante la demo</p>
                  <p>• Los términos completos se desarrollarían para una versión de producción</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(0% 0%, 99% 0%, 100% 100%, 1% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Shield className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    2. Uso Permitido
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Evaluación:</strong> Usar la demo para evaluar funcionalidades</p>
                  <p>• <strong>Pruebas:</strong> Probar características de aprendizaje de idiomas</p>
                  <p>• <strong>Feedback:</strong> Proporcionar comentarios sobre la experiencia</p>
                  <p>• <strong>No comercial:</strong> No usar para fines comerciales o de producción</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <AlertTriangle className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    3. Restricciones
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>No redistribuir:</strong> No compartir o redistribuir el código</p>
                  <p>• <strong>No modificar:</strong> No intentar modificar o hackear la aplicación</p>
                  <p>• <strong>No abusar:</strong> No sobrecargar el sistema con uso excesivo</p>
                  <p>• <strong>Respeto:</strong> Usar la plataforma de manera respetuosa</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(0% 0%, 99% 0%, 100% 100%, 1% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Scale className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    4. Limitación de Responsabilidad
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Demo únicamente:</strong> Esta es una demostración técnica, no un producto final</p>
                  <p>• <strong>Sin garantías:</strong> No se garantiza precisión o disponibilidad</p>
                  <p>• <strong>Uso bajo riesgo:</strong> El uso es bajo tu propio riesgo</p>
                  <p>• <strong>No responsabilidad:</strong> No somos responsables por pérdidas o daños</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Globe className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    5. Servicios de Terceros
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>OpenAI:</strong> Servicios de IA conversacional sujetos a sus términos</p>
                  <p>• <strong>ElevenLabs:</strong> Servicios de texto a voz sujetos a sus términos</p>
                  <p>• <strong>Supabase:</strong> Infraestructura de base de datos sujeta a sus términos</p>
                  <p>• <strong>Responsabilidad:</strong> No somos responsables por servicios de terceros</p>
                </div>
              </div>

              {/* Demo Specific Notice */}
              <div className="bg-blue-50/90 dark:bg-blue-900/30 border-3 border-blue-500 p-6 shadow-lg"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                <h4 className="text-lg font-black text-blue-800 dark:text-blue-200 mb-3">
                  Aviso Importante - Demo Técnica para Hackathon
                </h4>
                <div className="text-blue-700 dark:text-blue-300 font-bold text-sm space-y-2">
                  <p>Esta aplicación es una demostración técnica desarrollada específicamente para una hackathon. En una versión de producción:</p>
                  <p>• Se desarrollarían términos y condiciones completos y legalmente vinculantes</p>
                  <p>• Se establecerían políticas de uso detalladas</p>
                  <p>• Se implementarían procedimientos de resolución de disputas</p>
                  <p>• Se cumplirían todas las regulaciones legales aplicables</p>
                  <p>• Se proporcionaría soporte al cliente y garantías apropiadas</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-green-50/90 dark:bg-green-900/30 border-3 border-green-500 p-6 shadow-lg"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <h4 className="text-lg font-black text-green-800 dark:text-green-200 mb-3">
                  Contacto para la Demo
                </h4>
                <div className="text-green-700 dark:text-green-300 font-bold text-sm">
                  <p>Para preguntas sobre esta demostración técnica o para proporcionar feedback, contacta al equipo de desarrollo a través de los canales oficiales de la hackathon.</p>
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

export default TermsAndConditionsPage;