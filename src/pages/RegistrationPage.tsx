import React, { useState } from 'react';
import { ArrowLeft, Languages, AlertTriangle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';

function RegistrationPage() {
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
            Registro Deshabilitado
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              Esta es una demostración técnica para la hackathon
            </p>
          </div>
        </div>

        {/* Registration Disabled Notice */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl max-w-2xl mx-auto"
             style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
          
          {/* Header */}
          <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700 text-white mx-2 mt-2"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-white/20 flex items-center justify-center transform rotate-45 border-2 border-white shadow-lg">
                <AlertTriangle className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <h2 className="text-2xl font-black">
                Demo Técnica
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <div className="mb-8">
              <Lock className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
                Creación de Cuentas Deshabilitada
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-lg mb-6">
                Esta aplicación es una demostración técnica desarrollada para la hackathon. 
                La creación de nuevas cuentas está temporalmente deshabilitada.
              </p>
            </div>

            <div className="bg-blue-50/90 dark:bg-gray-700/90 p-6 border-3 border-blue-300 dark:border-blue-500 shadow-lg mb-8"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <h4 className="text-lg font-black text-blue-800 dark:text-blue-200 mb-3">
                ¿Eres juez de la hackathon?
              </h4>
              <p className="text-blue-700 dark:text-blue-300 font-bold text-sm mb-4">
                Si tienes credenciales de acceso para evaluar esta demo, puedes iniciar sesión desde la página principal.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Ir a Inicio de Sesión
              </button>
            </div>

            <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                 style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
              <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-3">
                Sobre esta Demo
              </h4>
              <div className="text-gray-700 dark:text-gray-300 font-bold text-sm space-y-2">
                <p>• Aplicación de aprendizaje de lenguas romances</p>
                <p>• Utiliza IA conversacional para práctica interactiva</p>
                <p>• Diseñada con React, TypeScript y Supabase</p>
                <p>• Integra OpenAI y ElevenLabs para experiencias inmersivas</p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;