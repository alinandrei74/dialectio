import React, { useEffect, useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';
import LanguageSelector from '../ui/LanguageSelector';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: Translation;
}

function Navigation({ isMenuOpen, setIsMenuOpen, currentLang, setCurrentLang, t }: NavigationProps) {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const sections = [
      { id: 'hero', element: document.querySelector('section') },
      { id: 'idiomas', element: document.querySelector('#idiomas') },
      { id: 'nosotros', element: document.querySelector('#nosotros') },
      { id: 'metodo', element: document.querySelector('#metodo') },
      { id: 'faq', element: document.querySelector('#faq') },
      { id: 'cta', element: document.querySelector('.py-21.bg-white\\/10.backdrop-blur-md.relative.overflow-hidden') },
      { id: 'footer', element: document.querySelector('footer') }
    ].filter(section => section.element);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || 
              (entry.target.tagName === 'SECTION' && !entry.target.id ? 'hero' : 
               entry.target.tagName === 'FOOTER' ? 'footer' : 
               entry.target.classList.contains('overflow-hidden') ? 'cta' : 'unknown');
            setCurrentSection(sectionId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sections.forEach(section => {
      if (section.element) {
        observer.observe(section.element);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section.element) {
          observer.unobserve(section.element);
        }
      });
    };
  }, []);

  // Define colors for each section based on the background gradient
  const getSectionColors = () => {
    switch (currentSection) {
      case 'hero':
        return {
          bg: 'bg-blue-600/95',
          text: 'text-white',
          hoverText: 'hover:text-blue-200',
          buttonBg: 'from-blue-700 to-blue-900',
          buttonHover: 'hover:from-blue-800 hover:to-blue-950',
          iconBg: 'from-blue-700 to-blue-900',
          border: 'border-blue-800'
        };
      case 'idiomas':
        return {
          bg: 'bg-blue-300/95',
          text: 'text-gray-900',
          hoverText: 'hover:text-blue-700',
          buttonBg: 'from-blue-600 to-blue-800',
          buttonHover: 'hover:from-blue-700 hover:to-blue-900',
          iconBg: 'from-blue-600 to-blue-800',
          border: 'border-blue-600'
        };
      case 'nosotros':
        return {
          bg: 'bg-gray-200/95',
          text: 'text-gray-900',
          hoverText: 'hover:text-gray-700',
          buttonBg: 'from-gray-600 to-gray-800',
          buttonHover: 'hover:from-gray-700 hover:to-gray-900',
          iconBg: 'from-gray-600 to-gray-800',
          border: 'border-gray-600'
        };
      case 'metodo':
        return {
          bg: 'bg-green-200/95',
          text: 'text-gray-900',
          hoverText: 'hover:text-green-700',
          buttonBg: 'from-green-600 to-green-800',
          buttonHover: 'hover:from-green-700 hover:to-green-900',
          iconBg: 'from-green-600 to-green-800',
          border: 'border-green-600'
        };
      case 'faq':
        return {
          bg: 'bg-green-400/95',
          text: 'text-gray-900',
          hoverText: 'hover:text-green-800',
          buttonBg: 'from-green-700 to-green-900',
          buttonHover: 'hover:from-green-800 hover:to-green-950',
          iconBg: 'from-green-700 to-green-900',
          border: 'border-green-700'
        };
      case 'cta':
        return {
          bg: 'bg-green-600/95',
          text: 'text-white',
          hoverText: 'hover:text-green-200',
          buttonBg: 'from-green-700 to-green-900',
          buttonHover: 'hover:from-green-800 hover:to-green-950',
          iconBg: 'from-green-700 to-green-900',
          border: 'border-green-800'
        };
      case 'footer':
        return {
          bg: 'bg-black/95',
          text: 'text-white',
          hoverText: 'hover:text-gray-300',
          buttonBg: 'from-gray-700 to-gray-900',
          buttonHover: 'hover:from-gray-800 hover:to-gray-950',
          iconBg: 'from-gray-700 to-gray-900',
          border: 'border-gray-700'
        };
      default:
        return {
          bg: 'bg-blue-50/95',
          text: 'text-gray-900',
          hoverText: 'hover:text-blue-700',
          buttonBg: 'from-blue-600 to-blue-800',
          buttonHover: 'hover:from-blue-700 hover:to-blue-900',
          iconBg: 'from-blue-600 to-blue-800',
          border: 'border-blue-800'
        };
    }
  };

  const colors = getSectionColors();

  return (
    <nav className={`relative ${colors.bg} backdrop-blur-md shadow-2xl transition-all duration-500 ease-in-out border-b-4 ${colors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${colors.iconBg} flex items-center justify-center transform rotate-45 border-3 border-black shadow-xl transition-all duration-500`}>
              <Languages className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <span className={`text-2xl font-black ${colors.text} tracking-tight transition-all duration-500`}>
              dialectio.xyz
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            <a href="#idiomas" className={`${colors.text} ${colors.hoverText} transition-all duration-300 font-bold text-base hover:scale-105`}>{t.languages}</a>
            <a href="#nosotros" className={`${colors.text} ${colors.hoverText} transition-all duration-300 font-bold text-base hover:scale-105`}>{t.about}</a>
            <a href="#metodo" className={`${colors.text} ${colors.hoverText} transition-all duration-300 font-bold text-base hover:scale-105`}>{t.method}</a>
            <a href="#faq" className={`${colors.text} ${colors.hoverText} transition-all duration-300 font-bold text-base hover:scale-105`}>{t.faq}</a>
            
            <LanguageSelector 
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              isMobile={false}
            />
            
            <button className={`bg-gradient-to-r ${colors.buttonBg} text-white px-8 py-3 ${colors.buttonHover} transition-all duration-300 font-black text-base border-3 border-black shadow-xl hover:shadow-2xl hover:scale-105`}
                    style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
              {t.start}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-3 ${colors.hoverText.replace('hover:', '')} border-2 border-black transform rotate-45 shadow-lg transition-all duration-300`}
          >
            {isMenuOpen ? <X className="w-5 h-5 transform -rotate-45" /> : <Menu className="w-5 h-5 transform -rotate-45" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-18 left-0 right-0 ${colors.bg} backdrop-blur-md shadow-2xl border-4 border-black border-t-0 transition-all duration-500`}>
            <div className="px-5 py-5 space-y-5">
              <a href="#idiomas" className={`block ${colors.text} ${colors.hoverText} py-2 font-bold text-base transition-all duration-300`}>{t.languages}</a>
              <a href="#nosotros" className={`block ${colors.text} ${colors.hoverText} py-2 font-bold text-base transition-all duration-300`}>{t.about}</a>
              <a href="#metodo" className={`block ${colors.text} ${colors.hoverText} py-2 font-bold text-base transition-all duration-300`}>{t.method}</a>
              <a href="#faq" className={`block ${colors.text} ${colors.hoverText} py-2 font-bold text-base transition-all duration-300`}>{t.faq}</a>
              
              <LanguageSelector 
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                isMobile={true}
              />
              
              <button className={`w-full bg-gradient-to-r ${colors.buttonBg} text-white px-7 py-3 font-black text-base border-3 border-black mt-5 shadow-xl transition-all duration-500`}
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
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