import React, { useState } from 'react';
import { User, LogOut, Settings, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <User className="w-6 h-6 text-white transform -rotate-45" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl z-50"
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
            <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 font-bold text-sm text-gray-900 dark:text-gray-100">
              <BookOpen className="w-4 h-4" />
              <span>Aprendizaje</span>
            </button>
            
            <button 
              onClick={handleSettingsClick}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 font-bold text-sm text-gray-900 dark:text-gray-100"
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            
            <hr className="my-2 border-gray-300 dark:border-gray-600" />
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300 font-bold text-sm text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;