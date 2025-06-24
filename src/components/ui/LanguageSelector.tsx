import React from 'react';
import '../../styles/components/LanguageSelector.css';

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
      <div className="language-selector__mobile">
        <p className="language-selector__mobile-label">Idioma:</p>
        <div className="language-selector__mobile-buttons">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setCurrentLang(lang.code)}
              className={`language-selector__mobile-button ${
                currentLang === lang.code
                  ? 'language-selector__mobile-button--active'
                  : 'language-selector__mobile-button--inactive'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="language-selector__desktop">
      {languageOptions.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setCurrentLang(lang.code)}
          className={`language-selector__desktop-button ${
            currentLang === lang.code
              ? 'language-selector__desktop-button--active'
              : 'language-selector__desktop-button--inactive'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;