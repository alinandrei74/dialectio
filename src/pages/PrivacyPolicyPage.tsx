import React, { useState } from 'react';
import { ArrowLeft, Languages, Shield, Eye, Database, Lock, Mail, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';

function PrivacyPolicyPage() {
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
            {t.privacyPolicy}
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.privacyPolicySubtitle}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
             style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
          
          {/* Header */}
          <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-white/20 flex items-center justify-center transform rotate-45 border-2 border-white shadow-lg">
                <Shield className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <h2 className="text-2xl font-black">
                {t.privacyPolicy}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Demo Notice */}
            <div className="bg-yellow-50/90 dark:bg-yellow-900/30 border-3 border-yellow-500 p-6 mb-8 shadow-lg"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <p className="text-yellow-800 dark:text-yellow-200 font-bold text-center">
                {t.privacyPolicyPlaceholder}
              </p>
            </div>

            {/* Basic Privacy Information for Demo */}
            <div className="space-y-8">
              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Database className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    1. Información que Recopilamos (Demo)
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Datos de cuenta:</strong> Email, nombre de usuario y preferencias de idioma</p>
                  <p>• <strong>Progreso de aprendizaje:</strong> Lecciones completadas, puntuaciones y estadísticas</p>
                  <p>• <strong>Interacciones:</strong> Conversaciones con IA para mejorar la experiencia</p>
                  <p>• <strong>Datos técnicos:</strong> Información del navegador para funcionalidad básica</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(0% 0%, 99% 0%, 100% 100%, 1% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Eye className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    2. Cómo Utilizamos la Información
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Personalización:</strong> Adaptar lecciones a tu nivel y progreso</p>
                  <p>• <strong>Funcionalidad:</strong> Proporcionar características de la aplicación</p>
                  <p>• <strong>Mejoras:</strong> Analizar uso para mejorar la experiencia (solo en demo)</p>
                  <p>• <strong>Comunicación:</strong> Enviar actualizaciones importantes del servicio</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Globe className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    3. Compartir Información
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Servicios de IA:</strong> OpenAI y ElevenLabs para funcionalidad de chat y audio</p>
                  <p>• <strong>Infraestructura:</strong> Supabase para almacenamiento seguro de datos</p>
                  <p>• <strong>No vendemos datos:</strong> Nunca vendemos información personal a terceros</p>
                  <p>• <strong>Solo demo:</strong> Los datos se usan únicamente para demostración técnica</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(0% 0%, 99% 0%, 100% 100%, 1% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Lock className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    4. Seguridad de Datos
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Encriptación:</strong> Todos los datos se transmiten de forma segura</p>
                  <p>• <strong>Acceso limitado:</strong> Solo personal autorizado puede acceder a los datos</p>
                  <p>• <strong>Contraseñas:</strong> Se almacenan de forma encriptada y segura</p>
                  <p>• <strong>Monitoreo:</strong> Supervisión continua de la seguridad del sistema</p>
                </div>
              </div>

              <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center transform rotate-45 border-2 border-black shadow-lg">
                    <Mail className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    5. Contacto y Derechos
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                  <p>• <strong>Acceso:</strong> Puedes solicitar una copia de tus datos personales</p>
                  <p>• <strong>Corrección:</strong> Puedes actualizar información incorrecta</p>
                  <p>• <strong>Eliminación:</strong> Puedes solicitar la eliminación de tu cuenta</p>
                  <p>• <strong>Contacto:</strong> Para consultas sobre privacidad, contacta al equipo de desarrollo</p>
                </div>
              </div>

              {/* Demo Specific Notice */}
              <div className="bg-blue-50/90 dark:bg-blue-900/30 border-3 border-blue-500 p-6 shadow-lg"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                <h4 className="text-lg font-black text-blue-800 dark:text-blue-200 mb-3">
                  Aviso Importante - Demo Técnica
                </h4>
                <div className="text-blue-700 dark:text-blue-300 font-bold text-sm space-y-2">
                  <p>Esta aplicación es una demostración técnica desarrollada para una hackathon. En una versión de producción:</p>
                  <p>• Se implementarían políticas de privacidad más detalladas</p>
                  <p>• Se añadirían controles de privacidad adicionales</p>
                  <p>• Se establecerían procedimientos formales de manejo de datos</p>
                  <p>• Se cumplirían todas las regulaciones aplicables (GDPR, CCPA, etc.)</p>
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

export default PrivacyPolicyPage;