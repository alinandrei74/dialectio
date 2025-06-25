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
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-bold border-2 border-gray-400 dark:border-gray-500 text-sm shadow-md hover:shadow-lg"
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-900 dark:text-gray-100">Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-blue-600" />
              <span className="text-gray-900 dark:text-gray-100">Oscuro</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform font-bold border-2 border-gray-400 dark:border-gray-500 text-sm shadow-lg hover:scale-105 hover:shadow-xl"
      style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-900 dark:text-gray-100">Claro</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-blue-600" />
          <span className="text-gray-900 dark:text-gray-100">Oscuro</span>
        </>
      )}
    </button>
  );
}

export default DarkModeToggle;