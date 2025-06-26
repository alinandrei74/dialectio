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
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Función dummy para manejar clicks de "comenzar" desde otras secciones
  const handleStartClick = () => {
    // Esta función se puede usar desde otras secciones si es necesario
    console.log('Start clicked from section');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans">
      <BackgroundElements />
      
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        t={t}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
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