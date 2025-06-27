import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Translation } from '../../types/translations';
import { useAuth } from '../../hooks/useAuth';

interface CTASectionProps {
  t: Translation;
  onStartClick: () => void;
}

function CTASection({ t, onStartClick }: CTASectionProps) {
  const { user, loading } = useAuth();

  const handleCreateAccountClick = () => {
    if (user) {
      // Usuario logueado - ir a dashboard
      console.log('Ir a dashboard');
    } else {
      // Usuario no logueado - abrir modal de auth
      onStartClick();
    }
  };

  return (
    <section className="py-21 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-4 bg-black/40 dark:bg-gray-300/30 transform rotate-45 opacity-40 shadow-lg"></div>
        <div className="absolute bottom-10 right-10 w-4 h-32 bg-black/40 dark:bg-gray-300/30 transform -rotate-30 opacity-40 shadow-md"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-black/30 dark:bg-gray-300/20 transform rotate-45 opacity-30 shadow-xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-9 tracking-tight">
          {t.ctaTitle}
        </h2>
        <div className="bg-white/25 dark:bg-gray-800/40 backdrop-blur-md p-7 max-w-4xl mx-auto mb-10 border-4 border-black dark:border-gray-300 shadow-2xl"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <p className="text-lg text-white font-bold">
            {t.ctaDescription}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
          {!loading && (
            <button 
              onClick={handleCreateAccountClick}
              className="bg-white dark:bg-gray-200 text-green-800 dark:text-gray-900 px-10 py-5 hover:bg-gray-100 dark:hover:bg-gray-300 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-4 border-black dark:border-gray-600 shadow-2xl hover:shadow-3xl hover:scale-105"
              style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
            >
              <span>{user ? 'Ir a aprendizaje' : t.createAccount}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
          <button className="border-4 border-white dark:border-gray-300 text-white px-10 py-5 hover:bg-white hover:text-green-800 dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-all duration-300 text-lg font-black shadow-2xl hover:shadow-3xl hover:scale-105"
                  style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
            {t.learnMore}
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;