import React from 'react';
import { Zap, Target } from 'lucide-react';
import { Translation } from '../../types/translations';

interface FeaturesSectionProps {
  t: Translation;
}

function FeaturesSection({ t }: FeaturesSectionProps) {
  const features = [
    {
      icon: Zap,
      title: 'acceleratedLearningTitle',
      description: 'acceleratedLearningDescription',
      color: 'from-green-700 to-green-900',
      bgColor: 'bg-green-50/90'
    },
    {
      icon: Target,
      title: 'contrastiveMethodTitle',
      description: 'contrastiveMethodDescription',
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-50/90'
    }
  ];

  return (
    <section id="metodo" className="py-21 bg-white/10 backdrop-blur-md relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-24 h-2 bg-gradient-to-r from-green-800 to-black transform rotate-30 opacity-35 shadow-lg"></div>
        <div className="absolute bottom-1/4 right-10 w-2 h-24 bg-black transform -rotate-45 opacity-35 shadow-md"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-18">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-7 tracking-tight">
            {t.methodTitle}
          </h2>
          <div className="bg-white/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black transform -rotate-1 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 font-bold">
              {t.methodSubtitle}
            </p>
          </div>
        </div>

        {/* Características en disposición horizontal responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className={`${feature.bgColor} backdrop-blur-md p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-black transform hover:scale-105 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                 style={{ 
                   clipPath: index % 2 === 0 
                     ? 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                     : 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)'
                 }}>
              <div className="text-center">
                <div className={`bg-gradient-to-r ${feature.color} p-5 border-3 border-black transform rotate-45 shadow-xl mx-auto mb-6 w-20 h-20 flex items-center justify-center`}>
                  <feature.icon className="w-10 h-10 text-white transform -rotate-45" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-5">
                  {t[feature.title as keyof Translation] as string}
                </h3>
                <p className="text-gray-900 leading-relaxed font-bold text-base">
                  {t[feature.description as keyof Translation] as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;