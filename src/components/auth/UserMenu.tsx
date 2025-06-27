import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
      >
        <div className="transform -rotate-45 flex items-center space-x-1">
          <User className="w-5 h-5 text-gray-900 dark:text-gray-100" />
          <ChevronDown className={`w-3 h-3 text-gray-900 dark:text-gray-100 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl z-50"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          
          {/* User Info Header */}
          <div className="p-4 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
               style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white transform rotate-45 shadow-lg">
                <User className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <p className="font-black text-sm">
                  {user.email}
                </p>
                <p className="text-blue-100 text-xs font-bold">
                  Usuario activo
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={handleSettings}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50/80 dark:hover:bg-gray-700/80 transition-all duration-200 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500 mb-2"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 flex items-center justify-center border-2 border-black dark:border-gray-300 transform rotate-45 shadow-md">
                <Settings className="w-4 h-4 text-white transform -rotate-45" />
              </div>
              <div>
                <span className="font-black text-gray-900 dark:text-gray-100 text-sm">
                  Configuración
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">
                  Ajusta tu perfil y preferencias
                </p>
              </div>
            </button>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-all duration-200 border-2 border-transparent hover:border-red-300 dark:hover:border-red-500"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 flex items-center justify-center border-2 border-black dark:border-gray-300 transform rotate-45 shadow-md">
                <LogOut className="w-4 h-4 text-white transform -rotate-45" />
              </div>
              <div>
                <span className="font-black text-gray-900 dark:text-gray-100 text-sm">
                  Cerrar Sesión
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">
                  Salir de tu cuenta
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;