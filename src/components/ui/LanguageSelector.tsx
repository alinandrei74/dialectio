import React from 'react';

interface LanguageSelectorProps {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  isMobile: boolean;
}

function LanguageSelector({ currentLang, setCurrentLang, isMobile }: LanguageSelectorProps) {
  const languageOptions = [
    { code: 'es', name: 'ES' },
    { code: 'fr', name: 'FR' },
    { code: 'pt', name: 'PT' },
    { code: 'it', name: 'IT' },
    { code: 'en', name: 'EN' }
  ];

  if (isMobile) {
    return (
      <div className="border-t-2 border-blue-300 dark:border-blue-600 pt-5">
        <p className="text-gray-700 dark:text-gray-300 font-bold mb-3 text-base">Idioma:</p>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLang(lang.code)}
              className={`px-3 py-2 transition-all duration-300 font-black border-2 text-xs shadow-md ${
                currentLang === lang.code
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-lg'
                  : 'hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 border-blue-400 dark:border-blue-500 hover:shadow-lg bg-white dark:bg-gray-700'
              }`}
              style={{
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 border-l-2 border-blue-300 dark:border-blue-600 pl-7">
      {languageOptions.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setCurrentLang(lang.code)}
          className={`px-3 py-2 transition-all duration-300 transform font-black border-2 text-xs shadow-lg ${
            currentLang === lang.code
              ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 scale-110 shadow-xl'
              : 'hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 border-blue-400 dark:border-blue-500 hover:border-black dark:hover:border-gray-300 hover:scale-105 hover:shadow-md bg-white dark:bg-gray-700'
          }`}
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
          }}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;