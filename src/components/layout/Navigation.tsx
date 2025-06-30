import React from 'react';
import { Menu, X, Languages, User, LogOut, Settings, BookOpen, MessageCircle, Mail, HelpCircle, Target } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigateToPage = (path: string) => {
    navigate(path);
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
          <div className="hidden lg:flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>{t.method}</span>
              </button>
              
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{t.faq}</span>
              </button>

              <button
                onClick={() => navigateToPage('/blog')}
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.blog}</span>
              </button>

              <button
                onClick={() => navigateToPage('/contact')}
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>{t.contact}</span>
              </button>
            </div>

            {/* Controls */}
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

              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/learning')}
                    className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-4 py-2 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                    style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t.dashboard}</span>
                  </button>

                  <button
                    onClick={() => navigate('/settings')}
                    className="w-10 h-10 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                  >
                    <Settings className="w-5 h-5 text-gray-900 dark:text-gray-100 transform -rotate-45" />
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-10 h-10 bg-red-600/20 dark:bg-red-800/30 backdrop-blur-md hover:bg-red-600/30 dark:hover:bg-red-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                  >
                    <LogOut className="w-5 h-5 text-red-600 dark:text-red-400 transform -rotate-45" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  <User className="w-5 h-5" />
                  <span>{t.login}</span>
                </button>
              )}
            </div>
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
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="p-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                <button
                  onClick={() => scrollToSection('about')}
                  className="w-full text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-3 p-3 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
                >
                  <Target className="w-5 h-5" />
                  <span>{t.method}</span>
                </button>

                <button
                  onClick={() => scrollToSection('faq')}
                  className="w-full text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-3 p-3 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>{t.faq}</span>
                </button>

                <button
                  onClick={() => navigateToPage('/blog')}
                  className="w-full text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-3 p-3 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{t.blog}</span>
                </button>

                <button
                  onClick={() => navigateToPage('/contact')}
                  className="w-full text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300 flex items-center space-x-3 p-3 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t.contact}</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-300 dark:border-gray-600 my-4"></div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.language}</span>
                  <LanguageSelector 
                    currentLang={currentLang}
                    setCurrentLang={setCurrentLang}
                    isMobile={true}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.theme}</span>
                  <DarkModeToggle 
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    isMobile={true}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-300 dark:border-gray-600 my-4"></div>

              {/* User Actions */}
              {user ? (
                <div className="space-y-3">
                  <button
                    onClick={() => navigateToPage('/learning')}
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>{t.dashboard}</span>
                  </button>

                  <button
                    onClick={() => navigateToPage('/settings')}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-gray-700 hover:to-gray-900 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <Settings className="w-5 h-5" />
                    <span>{t.settings}</span>
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-red-700 hover:to-red-900 dark:hover:from-red-600 dark:hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t.logout}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  <User className="w-5 h-5" />
                  <span>{t.login}</span>
                </button>
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