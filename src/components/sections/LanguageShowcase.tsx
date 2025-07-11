import React from 'react';
import { Translation } from '../../types/translations';

interface LanguageShowcaseProps {
  t: Translation;
  activeLanguage: number;
  setActiveLanguage: (index: number) => void;
}

function LanguageShowcase({ t, activeLanguage, setActiveLanguage }: LanguageShowcaseProps) {
  const languages = [
    { 
      name: 'Español', 
      code: 'ES', 
      color: 'from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700',
      bgColor: 'bg-blue-50/90 dark:bg-gray-800/90',
      borderColor: 'border-blue-600 dark:border-blue-500',
      description: 'spanishDescription'
    },
    { 
      name: 'Français', 
      code: 'FR', 
      color: 'from-purple-600 to-blue-700 dark:from-purple-500 dark:to-blue-600',
      bgColor: 'bg-purple-50/90 dark:bg-gray-800/90',
      borderColor: 'border-purple-600 dark:border-purple-500',
      description: 'frenchDescription'
    },
    { 
      name: 'Português', 
      code: 'PT', 
      color: 'from-green-700 to-green-900 dark:from-green-600 dark:to-green-800',
      bgColor: 'bg-green-50/90 dark:bg-gray-800/90',
      borderColor: 'border-green-700 dark:border-green-600',
      description: 'portugueseDescription'
    },
    { 
      name: 'Italiano', 
      code: 'IT', 
      color: 'from-green-800 to-black dark:from-green-700 dark:to-gray-900',
      bgColor: 'bg-green-50/90 dark:bg-gray-800/90',
      borderColor: 'border-green-800 dark:border-green-700',
      description: 'italianDescription'
    }
  ];

  return (
    <section id="idiomas" className="py-21 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-2 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 transform rotate-45 opacity-35 shadow-lg"></div>
        <div className="absolute bottom-10 right-1/4 w-2 h-32 bg-black dark:bg-gray-300 transform -rotate-12 opacity-35 shadow-md"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-18">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-7 tracking-tight">
            {t.languagesSectionTitle}
          </h2>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.languagesSectionSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {languages.map((language, index) => (
            <div
              key={language.code}
              className={`relative p-9 cursor-pointer transform transition-all duration-500 border-4 border-black dark:border-gray-300 shadow-xl ${
                activeLanguage === index 
                  ? 'scale-110 shadow-2xl' 
                  : 'hover:scale-105 hover:shadow-2xl'
              } ${language.bgColor} backdrop-blur-md`}
              style={{ 
                clipPath: activeLanguage === index 
                  ? 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                  : 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
              }}
              onMouseEnter={() => setActiveLanguage(index)}
            >
              <div className="relative z-10">
                <div className={`w-21 h-21 bg-gradient-to-br ${language.color} flex items-center justify-center mb-7 mx-auto border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl`}>
                  <span className="text-white font-black text-xl transform -rotate-45">{language.code}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-5 text-center">{language.name}</h3>
                <p className="text-gray-800 dark:text-gray-200 text-center leading-relaxed font-bold text-sm">
                  {t[language.description as keyof Translation] as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LanguageShowcase;