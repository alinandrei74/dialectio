import React from 'react';
import { Translation } from '../../types/translations';

interface StatsSectionProps {
  t: Translation;
}

function StatsSection({ t }: StatsSectionProps) {
  return (
    <section className="py-21 bg-gradient-to-b from-green-200/90 to-gray-800/90 backdrop-blur-md relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/3 w-12 h-12 bg-gradient-to-br from-green-800 to-black transform rotate-45 opacity-25 shadow-xl"></div>
        <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-black transform -rotate-45 opacity-35 shadow-lg"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Estadísticas en disposición horizontal con espaciado uniforme - sin rotación */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 xl:gap-10 text-center justify-center items-stretch">
          <div className="flex-1 max-w-sm bg-green-50/95 backdrop-blur-md p-8 border-4 border-black shadow-2xl">
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-green-700 mb-4">
              80%
            </div>
            <p className="text-lg font-black text-gray-900 mb-2">{t.fasterStat}</p>
            <p className="text-gray-700 font-bold text-sm leading-relaxed">{t.fasterDescription}</p>
          </div>
          
          <div className="flex-1 max-w-sm bg-gray-100/95 backdrop-blur-md p-8 border-4 border-black shadow-2xl">
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
              4
            </div>
            <p className="text-lg font-black text-gray-900 mb-2">{t.languagesStat}</p>
            <p className="text-gray-700 font-bold text-sm leading-relaxed">{t.languagesDescription}</p>
          </div>
          
          <div className="flex-1 max-w-sm bg-green-50/95 backdrop-blur-md p-8 border-4 border-black shadow-2xl">
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-green-800 mb-4">
              10k+
            </div>
            <p className="text-lg font-black text-gray-900 mb-2">{t.studentsStat}</p>
            <p className="text-gray-700 font-bold text-sm leading-relaxed">{t.studentsDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;