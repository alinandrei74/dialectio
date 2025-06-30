import React, { useState } from 'react';
import { Menu, X, Languages, User, LogIn, UserPlus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const { user } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      // User is logged in, go to learning dashboard
      window.location.href = '/learning';
    } else {
      // User is not logged in, open auth modal
      setIsAuthModalOpen(true);
    }
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
            <Link
              to="/blog"
              className="flex items-center space-x-2 px-4 py-2 font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </Link>

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
              className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
            >
              {user ? (
                <>
                  <User className="w-4 h-4" />
                  <span>{t.dashboard}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{t.login}</span>
                </>
              )}
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
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="p-6 space-y-6">
              <Link
                to="/blog"
                className="flex items-center space-x-3 p-3 font-bold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span>Blog</span>
              </Link>

              <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Settings</span>
                </div>
                
                <div className="space-y-4">
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
                </div>
              </div>

              <button
                onClick={() => {
                  handleAuthClick();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                {user ? (
                  <>
                    <User className="w-5 h-5" />
                    <span>{t.dashboard}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>{t.login}</span>
                  </>
                )}
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