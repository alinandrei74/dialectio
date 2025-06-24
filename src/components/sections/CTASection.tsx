import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Translation } from '../../translations';

interface CTASectionProps {
  t: Translation;
}

function CTASection({ t }: CTASectionProps) {
  return (
    <section className="py-21 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-4 bg-black/40 transform rotate-45 opacity-40 shadow-lg"></div>
        <div className="absolute bottom-10 right-10 w-4 h-32 bg-black/40 transform -rotate-30 opacity-40 shadow-md"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-black/30 transform rotate-45 opacity-30 shadow-xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-9 tracking-tight">
          {t.ctaTitle}
        </h2>
        <div className="bg-white/25 backdrop-blur-md p-7 max-w-4xl mx-auto mb-10 border-4 border-black transform rotate-1 shadow-2xl"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <p className="text-lg text-white font-bold">
            {t.ctaDescription}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
          <button className="bg-white text-green-800 px-10 py-5 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-4 border-black shadow-2xl hover:shadow-3xl hover:scale-105"
                  style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
            <span>{t.createAccount}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-4 border-white text-white px-10 py-5 hover:bg-white hover:text-green-800 transition-all duration-300 text-lg font-black shadow-2xl hover:shadow-3xl hover:scale-105"
                  style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
            {t.learnMore}
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;