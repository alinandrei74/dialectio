import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Translation } from '../../types/translations';

interface HeroSectionProps {
  t: Translation;
}

function HeroSection({ t }: HeroSectionProps) {
  return (
    <section 
      className="relative overflow-hidden py-18 lg:py-28 min-h-screen flex items-center pt-24"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced overlay with premium gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-blue-700/60 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-gray-700/80"></div>
      
      {/* Enhanced Suprematist geometric overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-4 bg-white/40 dark:bg-gray-300/30 transform rotate-45 opacity-40 animate-pulse shadow-lg"></div>
        <div className="absolute top-40 right-20 w-4 h-32 bg-blue-300/50 dark:bg-blue-400/40 transform -rotate-30 opacity-50 animate-pulse delay-1000 shadow-md"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-white/35 dark:bg-gray-300/25 transform rotate-45 opacity-35 animate-pulse delay-500 shadow-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-blue-200/45 dark:bg-blue-300/35 transform -rotate-45 opacity-45 animate-pulse delay-700 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-48 bg-white/30 dark:bg-gray-300/20 transform rotate-12 opacity-30 animate-pulse delay-300 shadow-md"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-2 bg-blue-100/40 dark:bg-blue-200/30 transform rotate-60 opacity-40 animate-pulse delay-900 shadow-lg"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-white/50 dark:bg-gray-300/40 transform -rotate-30 opacity-50 animate-pulse delay-1200 shadow-md"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-9 drop-shadow-2xl tracking-tight">
            {t.heroTitle}
            <span className="text-blue-200 dark:text-blue-300 drop-shadow-2xl">
              {' '}{t.heroSubtitle}
            </span>
            <span className="text-white drop-shadow-2xl">
              {t.heroTitle2}
            </span>
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-9 max-w-5xl mx-auto mb-10 border-4 border-black dark:border-gray-300 transform rotate-1 shadow-2xl"
               style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 font-bold leading-relaxed">
              {t.heroDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-10 py-5 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-4 border-black dark:border-gray-300 shadow-2xl hover:shadow-3xl hover:scale-105"
                    style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
              <span>{t.startJourney}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-4 border-white dark:border-gray-300 text-white px-10 py-5 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 text-lg font-black bg-white/20 dark:bg-gray-800/30 backdrop-blur-md shadow-2xl hover:shadow-3xl hover:scale-105"
                    style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
              {t.viewDemo}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/40 dark:bg-gray-300/30 transform rotate-45 animate-pulse shadow-lg"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-blue-200/50 dark:bg-blue-300/40 transform -rotate-45 animate-pulse delay-1000 shadow-md"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/30 dark:bg-gray-300/20 transform rotate-45 animate-pulse delay-500 shadow-lg"></div>
      </div>
    </section>
  );
}

export default HeroSection;