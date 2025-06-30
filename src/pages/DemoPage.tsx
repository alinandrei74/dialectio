import React, { useState } from 'react';
import { ArrowLeft, Languages, Play, Mail, Bell, CheckCircle } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const t: Translation = translations[currentLang];

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validación básica
    if (!email.trim()) {
      setError(t.fieldRequired);
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.emailInvalid);
      setLoading(false);
      return;
    }

    if (!acceptPrivacy) {
      setError('Debes aceptar el consentimiento para el tratamiento de datos');
      setLoading(false);
      return;
    }

    try {
      // Aquí se implementará la lógica de suscripción cuando esté lista
      // Por ahora simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(t.demoNotifySuccess);
      setEmail('');
      setAcceptPrivacy(false);
    } catch (err) {
      setError(t.demoNotifyError);
    }

    setLoading(false);
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            {t.demoTitle}
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-4xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.demoSubtitle}
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {/* Video Header */}
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black text-center">
                {t.demoVideoTitle}
              </h2>
            </div>

            {/* Video Placeholder */}
            <div className="p-8">
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 border-4 border-black dark:border-gray-300 shadow-xl overflow-hidden"
                   style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                
                {/* Video Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-16 h-16 bg-white transform rotate-45"></div>
                  <div className="absolute top-20 right-20 w-8 h-8 bg-blue-300 transform -rotate-30"></div>
                  <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 transform rotate-12"></div>
                  <div className="absolute bottom-10 right-10 w-6 h-6 bg-white transform -rotate-45"></div>
                </div>

                {/* Play Button and Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center mx-auto mb-6 transform rotate-45 shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer">
                      <Play className="w-12 h-12 text-white transform -rotate-45 ml-1" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">
                      {t.demoVideoPlaceholder}
                    </h3>
                    <p className="text-white/80 font-bold text-lg max-w-md mx-auto">
                      {t.demoVideoDescription}
                    </p>
                  </div>
                </div>

                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-500 text-black px-4 py-2 font-black text-sm border-2 border-black shadow-lg"
                       style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                    {t.comingSoon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            
            {/* Notification Header */}
           

            {/* Notification Form */}
            

                {/* Privacy Consent */}
                <div className="bg-gray-50/90 dark:bg-gray-700/90 p-4 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                     style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptPrivacy"
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-2 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <div>
                      <label htmlFor="acceptPrivacy" className="text-xs font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                        Acepto que mi email sea utilizado para notificarme sobre el lanzamiento de la plataforma
                      </label>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-bold mt-1">
                        Al proporcionar tu email, aceptas que lo usemos únicamente para notificarte cuando dialectio.xyz esté disponible. Consulta nuestra{' '}
                        <a href="/privacy-policy" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                          política de privacidad
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-800 hover:to-black dark:hover:from-green-700 dark:hover:to-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  <Bell className="w-5 h-5" />
                  <span>{loading ? t.demoNotifyProcessing : t.demoNotifyButton}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {t.demoFeaturesTitle}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-bold max-w-2xl mx-auto">
              {t.demoFeaturesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <Languages className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-3">
                {t.demoFeature1Title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                {t.demoFeature1Description}
              </p>
            </div>

            <div className="bg-green-50/90 dark:bg-gray-700/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <Play className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-3">
                {t.demoFeature2Title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                {t.demoFeature2Description}
              </p>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 border-4 border-black dark:border-gray-300 shadow-xl text-center"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black dark:from-gray-600 dark:to-gray-900 flex items-center justify-center mx-auto mb-4 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl">
                <CheckCircle className="w-8 h-8 text-white transform -rotate-45" />
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-3">
                {t.demoFeature3Title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                {t.demoFeature3Description}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default DemoPage;