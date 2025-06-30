import React, { useState } from 'react';
import { Languages, Menu, X, User, LogIn, UserPlus, BookOpen, MessageCircle, Mail, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl">
              <Languages className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              dialectio.xyz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/demo"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              {t.demo}
            </Link>
            <Link
              to="/blog"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
            >
              {t.contact}
            </Link>
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
                  onClick={handleUserMenuClick}
                  className="w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                >
                  <User className="w-6 h-6 text-gray-900 dark:text-gray-100 transform -rotate-45" />
                </button>

                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={closeUserMenu}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl z-20"
                         style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                      <div className="p-4 border-b-2 border-black dark:border-gray-300">
                        <p className="font-black text-gray-900 dark:text-gray-100 text-sm">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/learning"
                          onClick={closeUserMenu}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <BookOpen className="w-5 h-5" />
                          <span>Mi Aprendizaje</span>
                        </Link>
                        <Link
                          to="/settings"
                          onClick={closeUserMenu}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <Settings className="w-5 h-5" />
                          <span>Configuración</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-left font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </>
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
            className="md:hidden w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
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
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="p-6 space-y-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                <Link
                  to="/demo"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.demo}</span>
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Blog</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t.contact}</span>
                </Link>
              </div>

              {/* Mobile Controls */}
              <div className="border-t-2 border-black dark:border-gray-300 pt-6 space-y-4">
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

                {user ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50/90 dark:bg-gray-700/90 border-2 border-gray-300 dark:border-gray-500"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <p className="font-black text-gray-900 dark:text-gray-100 text-sm">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/learning"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Mi Aprendizaje</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors duration-300"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Configuración</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-red-600 dark:text-red-400 font-bold transition-colors duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                    style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                  >
                    {t.login}
                  </button>
                )}
              </div>
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