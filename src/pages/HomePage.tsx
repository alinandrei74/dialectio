import React, { useState, useEffect } from 'react';
import { translations, Translation } from '../translations';
import Navigation from '../components/layout/Navigation';
import HeroSection from '../components/sections/HeroSection';
import LanguageShowcase from '../components/sections/LanguageShowcase';
import AboutSection from '../components/sections/AboutSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import StatsSection from '../components/sections/StatsSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/layout/Footer';
import BackgroundElements from '../components/ui/BackgroundElements';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>('es');

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-blue-300 via-gray-200 via-green-200 to-black relative overflow-hidden font-sans">
      <BackgroundElements />
      
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        t={t}
      />
      
      <HeroSection t={t} />
      
      <LanguageShowcase 
        t={t}
        activeLanguage={activeLanguage}
        setActiveLanguage={setActiveLanguage}
      />
      
      <AboutSection t={t} />
      
      <FeaturesSection t={t} />
      
      <StatsSection t={t} />
      
      <CTASection t={t} />
      
      <Footer t={t} />
    </div>
  );
}

export default HomePage;