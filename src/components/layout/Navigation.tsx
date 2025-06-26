import React, { useEffect, useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';
import { useAuth } from '../../hooks/useAuth';
import LanguageSelector from '../ui/LanguageSelector';
import DarkModeToggle from '../ui/DarkModeToggle';
import UserMenu from '../auth/UserMenu';
import AuthModal from '../auth/AuthModal';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: Translation;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Navigation({ isMenuOpen, setIsMenuOpen, currentLang, setCurrentLang, t, isDarkMode, toggleDarkMode }: NavigationProps) {
  const [navBackground, setNavBackground] = useState('bg-white/40 dark:bg-gray-900/95');
  const [textColor, setTextColor] = useState('text-gray-900 dark:text-gray-100');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular el progreso del scroll (0 a 1)
      const scrollProgress = scrollY / (documentHeight - windowHeight);
      
      // Definir los puntos de cambio con tonos aún más claros
      if (scrollProgress < 0.15) {
        // Hero section - blanco muy transparente
        setNavBackground('bg-white/40 dark:bg-gray-900/90');
        setTextColor('text-gray-900 dark:text-gray-100');
      } else if (scrollProgress < 0.35) {
        // Language showcase - blanco casi transparente
        setNavBackground('bg-white/50 dark:bg-gray-800/90');
        setTextColor('text-gray-900 dark:text-gray-100');
      } else if (scrollProgress < 0.55) {
        // About section - blanco muy suave
        setNavBackground('bg-white/60 dark:bg-gray-700/90');
        setTextColor('text-gray-900 dark:text-gray-100');
      } else if (scrollProgress < 0.75) {
        // Features section - blanco con toque verde muy sutil
        setNavBackground('bg-green-50/40 dark:bg-gray-600/90');
        setTextColor('text-gray-900 dark:text-gray-100');
      } else if (scrollProgress < 0.9) {
        // FAQ section - verde muy muy claro
        setNavBackground('bg-green-50/50 dark:bg-gray-500/90');
        setTextColor('text-gray-900 dark:text-gray-100');
      } else {
        // CTA y Footer - verde oscuro
        setNavBackground('bg-green-800/90 dark:bg-black/95');
        setTextColor('text-white dark:text-gray-100');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartClick = () => {
    if (user) {
      // Usuario logueado - ir a dashboard o cursos
      console.log('Ir a dashboard');
    } else {
      // Usuario no logueado - abrir dropdown de auth
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${navBackground} backdrop-blur-md shadow-2xl border-b-4 border-blue-800 dark:border-gray-600 transition-all duration-500 ease-in-out`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl">
                <Languages className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className={`text-2xl font-black tracking-tight transition-colors duration-500 ${textColor}`}>
                dialectio.xyz
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-7">
              <a href="#idiomas" className={`hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 font-bold text-base hover:scale-105 ${textColor}`}>{t.languages}</a>
              <a href="#nosotros" className={`hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 font-bold text-base hover:scale-105 ${textColor}`}>{t.about}</a>
              <a href="#metodo" className={`hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 font-bold text-base hover:scale-105 ${textColor}`}>{t.method}</a>
              <a href="#faq" className={`hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 font-bold text-base hover:scale-105 ${textColor}`}>{t.faq}</a>
              
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
              
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <div className="relative">
                    <button 
                      onClick={handleStartClick}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-3 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 font-black text-base border-3 border-black dark:border-gray-300 shadow-xl hover:shadow-2xl hover:scale-105"
                      style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
                    >
                      {t.start}
                    </button>
                    
                    {/* Auth Dropdown */}
                    <AuthModal 
                      isOpen={isAuthModalOpen}
                      onClose={() => setIsAuthModalOpen(false)}
                      t={t}
                      isDropdown={true}
                    />
                  </div>
                )
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 hover:bg-blue-200 dark:hover:bg-gray-600 border-2 border-black dark:border-gray-300 transform rotate-45 shadow-lg transition-all duration-300"
            >
              {isMenuOpen ? <X className={`w-5 h-5 transform -rotate-45 ${textColor}`} /> : <Menu className={`w-5 h-5 transform -rotate-45 ${textColor}`} />}
            </button>
          </div>

          {/* Mobile Navigation - Más opaco */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-18 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-4 border-black dark:border-gray-600 border-t-0 transition-all duration-300">
              <div className="px-5 py-5 space-y-5">
                <a href="#idiomas" className="block text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 py-2 font-bold text-base transition-all duration-300">{t.languages}</a>
                <a href="#nosotros" className="block text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 py-2 font-bold text-base transition-all duration-300">{t.about}</a>
                <a href="#metodo" className="block text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 py-2 font-bold text-base transition-all duration-300">{t.method}</a>
                <a href="#faq" className="block text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 py-2 font-bold text-base transition-all duration-300">{t.faq}</a>
                
                <LanguageSelector 
                  currentLang={currentLang}
                  setCurrentLang={setCurrentLang}
                  isMobile={true}
                />
                
                <DarkModeToggle 
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  isMobile={true}
                />
                
                {!loading && (
                  user ? (
                    <div className="pt-3">
                      <UserMenu />
                    </div>
                  ) : (
                    <button 
                      onClick={handleStartClick}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-7 py-3 font-black text-base border-3 border-black dark:border-gray-300 mt-5 shadow-xl"
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                    >
                      {t.start}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;