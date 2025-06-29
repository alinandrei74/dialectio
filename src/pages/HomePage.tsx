import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import Navigation from '../components/layout/Navigation';
import HeroSection from '../components/sections/HeroSection';
import LanguageShowcase from '../components/sections/LanguageShowcase';
import AboutSection from '../components/sections/AboutSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/layout/Footer';
import BackgroundElements from '../components/ui/BackgroundElements';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans">
      <BackgroundElements />
      
      {/* Bolt Badge */}
      <div className="fixed top-40 left-4 z-50">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-110 duration-300"
        >
          <img 
            src="/white_circle_360x360.svg" 
            alt="Made with Bolt" 
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </a>
      </div>
      
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        t={t}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />
      
      <HeroSection t={t} onStartClick={handleStartClick} />
      
      <LanguageShowcase 
        t={t}
        activeLanguage={activeLanguage}
        setActiveLanguage={setActiveLanguage}
      />
      
      <AboutSection t={t} />
      
      <FeaturesSection t={t} />
      
      <FAQSection t={t} />
      
      <CTASection t={t} onStartClick={handleStartClick} />
      
      <Footer t={t} />
    </div>
  );
}

export default HomePage;