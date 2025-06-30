import React from 'react';
import { Menu, X, Languages, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Translation } from '../../types/translations';
import LanguageSelector from '../ui/LanguageSelector';
import DarkModeToggle from '../ui/DarkModeToggle';
import AuthModal from '../auth/AuthModal';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: Translation;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

function Navigation({
  isMenuOpen,
  setIsMenuOpen,
  currentLang,
  setCurrentLang,
  t,
  isDarkMode,
  toggleDarkMode,
  isAuthModalOpen,
  setIsAuthModalOpen
}: NavigationProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (user) {
      navigate('/learning');
    } else {
      setIsAuthModalOpen(true);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl">
              <Languages className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              dialectio.xyz
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/demo')}
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-black text-lg transition-colors duration-300"
            >
              {t.demo}
            </button>
            
            <button
              onClick={() => handleNavigation('/blog')}
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-black text-lg transition-colors duration-300"
            >
              Blog
            </button>

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

            <button
              onClick={handleAuthClick}
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
            >
              <LogIn className="w-5 h-5" />
              <span>{user ? t.dashboard : t.login}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-gray-100 transform -rotate-45" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-gray-100 transform -rotate-45" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl mx-6 mt-4"
               style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <div className="p-6 space-y-6">
              <button
                onClick={() => handleNavigation('/demo')}
                className="block w-full text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-black text-lg transition-colors duration-300"
              >
                {t.demo}
              </button>
              
              <button
                onClick={() => handleNavigation('/blog')}
                className="block w-full text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-black text-lg transition-colors duration-300"
              >
                Blog
              </button>

              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-gray-100 font-black text-sm">
                  {t.language}:
                </span>
                <LanguageSelector 
                  currentLang={currentLang}
                  setCurrentLang={setCurrentLang}
                  isMobile={true}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-gray-100 font-black text-sm">
                  {t.theme}:
                </span>
                <DarkModeToggle 
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  isMobile={true}
                />
              </div>

              <button
                onClick={handleAuthClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <LogIn className="w-5 h-5" />
                <span>{user ? t.dashboard : t.login}</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        t={t}
      />
    </>
  );
}

export default Navigation;