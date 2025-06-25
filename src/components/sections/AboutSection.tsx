import React from 'react';
import { BookOpen, Target, Eye, Heart } from 'lucide-react';
import { Translation } from '../../types/translations';

interface AboutSectionProps {
  t: Translation;
}

function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="nosotros" className="py-21 bg-white/10 backdrop-blur-md relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 transform rotate-45 opacity-25 shadow-xl"></div>
        <div className="absolute bottom-20 left-10 w-4 h-48 bg-black transform -rotate-30 opacity-25 shadow-lg"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-18">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-7 tracking-tight drop-shadow-2xl">
            {t.aboutTitle}
          </h2>
          <div className="bg-white/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black transform rotate-1 shadow-2xl"
               style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
            <p className="text-lg text-gray-900 font-bold">
              {t.aboutSubtitle}
            </p>
          </div>
        </div>

        {/* Contenedores de texto en disposición horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 mb-21">
          <div className="bg-white/90 backdrop-blur-md p-6 border-4 border-black transform rotate-1 shadow-xl"
               style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <p className="text-sm text-gray-900 leading-relaxed font-bold">
              {t.aboutDescription1}
            </p>
          </div>
          <div className="bg-green-50/90 backdrop-blur-md p-6 border-4 border-black transform -rotate-1 shadow-xl"
               style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
            <p className="text-sm text-gray-900 leading-relaxed font-bold">
              {t.aboutDescription2}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 border-4 border-black transform rotate-1 shadow-xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-sm text-gray-900 leading-relaxed font-bold">
              {t.aboutDescription3}
            </p>
          </div>
        </div>

        {/* Sección de estadísticas mejorada */}
        <div className="mb-21">
          <div className="bg-white/95 backdrop-blur-md p-9 shadow-2xl border-4 border-black transform -rotate-1 max-w-4xl mx-auto"
               style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}>
            <div className="flex items-center space-x-5 mb-7">
              <div className="w-18 h-18 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center border-3 border-black transform rotate-45 shadow-xl">
                <Heart className="w-9 h-9 text-white transform -rotate-45" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Pasión por las lenguas</h3>
                <p className="text-gray-700 font-bold text-sm">Conectando culturas a través del idioma</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="text-center p-5 bg-green-50/90 border-3 border-black transform rotate-1 shadow-lg">
                <div className="text-2xl font-black text-green-700">500M+</div>
                <div className="text-xs text-gray-700 font-bold">Hablantes conectados</div>
              </div>
              <div className="text-center p-5 bg-gray-50/90 border-3 border-black transform -rotate-1 shadow-lg">
                <div className="text-2xl font-black text-gray-900">4</div>
                <div className="text-xs text-gray-700 font-bold">Lenguas hermanas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de información en disposición horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
          <div className="bg-white/90 backdrop-blur-md p-8 shadow-xl text-center border-4 border-black transform rotate-1"
               style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center mx-auto mb-6 border-3 border-black transform rotate-45 shadow-xl">
              <BookOpen className="w-10 h-10 text-white transform -rotate-45" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-4">{t.ourStoryTitle}</h3>
            <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourStoryDescription}</p>
          </div>

          <div className="bg-green-50/90 backdrop-blur-md p-8 shadow-xl text-center border-4 border-black transform -rotate-1"
               style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
            <div className="w-20 h-20 bg-black flex items-center justify-center mx-auto mb-6 border-3 border-black transform rotate-45 shadow-xl">
              <Target className="w-10 h-10 text-white transform -rotate-45" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-4">{t.ourMissionTitle}</h3>
            <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourMissionDescription}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-8 shadow-xl text-center border-4 border-black transform rotate-1"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-green-800 to-black flex items-center justify-center mx-auto mb-6 border-3 border-black transform rotate-45 shadow-xl">
              <Eye className="w-10 h-10 text-white transform -rotate-45" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-4">{t.ourVisionTitle}</h3>
            <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourVisionDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;