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
      <div className="border-t-2 border-blue-300 pt-5">
        <p className="text-gray-700 font-bold mb-3 text-base">Idioma:</p>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLang(lang.code)}
              className={`px-3 py-2 transition-all duration-300 font-black border-2 text-xs shadow-md ${
                currentLang === lang.code
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-black shadow-lg'
                  : 'hover:bg-blue-200 text-gray-900 border-blue-400 hover:shadow-lg'
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
    <div className="flex items-center space-x-2 border-l-2 border-blue-300 pl-7">
      {languageOptions.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setCurrentLang(lang.code)}
          className={`px-3 py-2 transition-all duration-300 transform font-black border-2 text-xs shadow-lg ${
            currentLang === lang.code
              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-black scale-110 shadow-xl'
              : 'hover:bg-blue-200 text-gray-900 border-blue-400 hover:border-black hover:scale-105 hover:shadow-md'
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