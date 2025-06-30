import React, { useState } from 'react';
import { Languages, Menu, X, User, LogOut, Settings, BookOpen, Trophy } from 'lucide-react';
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
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleUserMenuClick = (path: string) => {
    navigate(path);
    setShowUserMenu(false);
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
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#about" 
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              {t.about}
            </a>
            <a 
              href="#features" 
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              {t.features}
            </a>
            <a 
              href="#faq" 
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              {t.faq}
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              {t.contact}
            </button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <User className="w-6 h-6 text-white transform -rotate-45" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl z-50"
                       style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                    <div className="p-4 border-b-2 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-1 mt-1"
                         style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}>
                      <p className="font-black text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => handleUserMenuClick('/learning')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold transition-colors duration-300 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500"
                        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>Mi Aprendizaje</span>
                      </button>
                      <button
                        onClick={() => handleUserMenuClick('/settings')}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold transition-colors duration-300 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500"
                        style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Configuración</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-bold transition-colors duration-300 border-2 border-transparent hover:border-red-300 dark:hover:border-red-500"
                        style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
              >
                {t.login}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl"
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl mx-6 mt-4"
               style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <div className="p-6 space-y-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                <a 
                  href="#about" 
                  className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.about}
                </a>
                <a 
                  href="#features" 
                  className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.features}
                </a>
                <a 
                  href="#faq" 
                  className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.faq}
                </a>
                <button
                  onClick={() => {
                    navigate('/contact');
                    setIsMenuOpen(false);
                  }}
                  className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                >
                  {t.contact}
                </button>
              </div>

              {/* Mobile Controls */}
              <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-gray-100 font-bold">{t.language}</span>
                  <LanguageSelector 
                    currentLang={currentLang}
                    setCurrentLang={setCurrentLang}
                    isMobile={true}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-gray-100 font-bold">{t.theme}</span>
                  <DarkModeToggle 
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    isMobile={true}
                  />
                </div>
              </div>

              {/* Mobile User Section */}
              {user ? (
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6 space-y-4">
                  <div className="bg-green-50/90 dark:bg-green-900/30 p-4 border-2 border-green-300 dark:border-green-500 shadow-md"
                       style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                    <p className="text-green-800 dark:text-green-200 font-bold text-sm truncate">
                      {user.email}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigate('/learning');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 font-bold border-2 border-blue-300 dark:border-blue-500 shadow-md"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Mi Aprendizaje</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold border-2 border-gray-300 dark:border-gray-500 shadow-md"
                    style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Configuración</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 font-bold border-2 border-red-300 dark:border-red-500 shadow-md"
                    style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6">
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 shadow-xl"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    {t.login}
                  </button>
                </div>
              )}
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