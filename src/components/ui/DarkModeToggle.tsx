import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobile?: boolean;
}

function DarkModeToggle({ isDarkMode, toggleDarkMode, isMobile = false }: DarkModeToggleProps) {
  if (isMobile) {
    return (
      <div className="border-t-2 border-blue-300 dark:border-blue-600 pt-5">
        <p className="text-gray-700 dark:text-gray-300 font-bold mb-3 text-base">Tema:</p>
        <button
          onClick={toggleDarkMode}
          className="w-12 h-12 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-bold border-2 border-gray-400 dark:border-gray-500 shadow-md hover:shadow-lg flex items-center justify-center transform rotate-45"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500 transform -rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-blue-600 transform -rotate-45" />
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-12 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform font-bold border-2 border-gray-400 dark:border-gray-500 shadow-lg hover:scale-105 hover:shadow-xl flex items-center justify-center rotate-45"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500 transform -rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600 transform -rotate-45" />
      )}
    </button>
  );
}

export default DarkModeToggle;