import React from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';
import LanguageSelector from '../ui/LanguageSelector';
import '../../styles/components/Navigation.css';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: Translation;
}

function Navigation({ isMenuOpen, setIsMenuOpen, currentLang, setCurrentLang, t }: NavigationProps) {
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__content">
          <div className="navigation__brand">
            <div className="navigation__logo">
              <Languages className="navigation__logo-icon" />
            </div>
            <span className="navigation__brand-text">
              dialectio.xyz
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="navigation__desktop">
            <a href="#idiomas" className="navigation__link">{t.languages}</a>
            <a href="#nosotros" className="navigation__link">{t.about}</a>
            <a href="#metodo" className="navigation__link">{t.method}</a>
            <a href="#comunidad" className="navigation__link">{t.community}</a>
            
            <LanguageSelector 
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              isMobile={false}
            />
            
            <button className="navigation__start-button">
              {t.start}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navigation__mobile-button"
          >
            {isMenuOpen ? <X className="navigation__mobile-icon" /> : <Menu className="navigation__mobile-icon" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="navigation__mobile-menu">
            <div className="navigation__mobile-content">
              <a href="#idiomas" className="navigation__mobile-link">{t.languages}</a>
              <a href="#nosotros" className="navigation__mobile-link">{t.about}</a>
              <a href="#metodo" className="navigation__mobile-link">{t.method}</a>
              <a href="#comunidad" className="navigation__mobile-link">{t.community}</a>
              
              <LanguageSelector 
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                isMobile={true}
              />
              
              <button className="navigation__mobile-start-button">
                {t.start}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;