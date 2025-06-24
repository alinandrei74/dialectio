import React from 'react';
import { Translation } from '../../types/translations';
import '../../styles/components/LanguageShowcase.css';

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
      className: 'spanish',
      description: 'spanishDescription'
    },
    { 
      name: 'Français', 
      code: 'FR', 
      className: 'french',
      description: 'frenchDescription'
    },
    { 
      name: 'Português', 
      code: 'PT', 
      className: 'portuguese',
      description: 'portugueseDescription'
    },
    { 
      name: 'Italiano', 
      code: 'IT', 
      className: 'italian',
      description: 'italianDescription'
    }
  ];

  return (
    <section id="idiomas" className="language-showcase">
      <div className="language-showcase__background">
        <div className="language-showcase__bg-element-1"></div>
        <div className="language-showcase__bg-element-2"></div>
      </div>
      <div className="language-showcase__container">
        <div className="language-showcase__header">
          <h2 className="language-showcase__title">
            {t.languagesSectionTitle}
          </h2>
          <div className="language-showcase__subtitle-container">
            <p className="language-showcase__subtitle">
              {t.languagesSectionSubtitle}
            </p>
          </div>
        </div>

        <div className="language-showcase__grid">
          {languages.map((language, index) => (
            <div
              key={language.code}
              className={`language-showcase__card language-showcase__card--${language.className} ${
                activeLanguage === index 
                  ? 'language-showcase__card--active' 
                  : 'language-showcase__card--inactive'
              }`}
              onMouseEnter={() => setActiveLanguage(index)}
            >
              <div className="language-showcase__card-content">
                <div className="language-showcase__card-icon">
                  <span className="language-showcase__card-icon-text">{language.code}</span>
                </div>
                <h3 className="language-showcase__card-title">{language.name}</h3>
                <p className="language-showcase__card-description">
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