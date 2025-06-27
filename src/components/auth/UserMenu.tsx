import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, BookOpen, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Move the conditional return after all hooks
  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  const handleLearningClick = () => {
    navigate('/learning');
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <User className="w-6 h-6 text-white transform -rotate-45" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white/98 dark:bg-gray-800/98 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl z-50"
               style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
            
            {/* User Info */}
            <div className="p-4 border-b-3 border-black dark:border-gray-300 bg-green-50/90 dark:bg-gray-700/90">
              <p className="font-black text-gray-900 dark:text-gray-100 text-sm truncate">
                {user.email}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">
                Usuario registrado
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button 
                onClick={handleHomeClick}
                className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 font-bold text-sm text-gray-900 dark:text-gray-100 rounded-sm"
              >
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </button>

              <button 
                onClick={handleLearningClick}
                className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 font-bold text-sm text-gray-900 dark:text-gray-100 rounded-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Aprendizaje</span>
              </button>
              
              <button 
                onClick={handleSettingsClick}
                className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 font-bold text-sm text-gray-900 dark:text-gray-100 rounded-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Configuración</span>
              </button>
              
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300 font-bold text-sm text-red-600 dark:text-red-400 rounded-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserMenu;