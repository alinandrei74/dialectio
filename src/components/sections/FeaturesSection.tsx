import React from 'react';
import { Zap, Target, Users, Award } from 'lucide-react';
import { Translation } from '../../types/translations';
import '../../styles/components/FeaturesSection.css';

interface FeaturesSectionProps {
  t: Translation;
}

function FeaturesSection({ t }: FeaturesSectionProps) {
  const features = [
    {
      icon: Zap,
      title: 'acceleratedLearningTitle',
      description: 'acceleratedLearningDescription',
      className: 'green'
    },
    {
      icon: Target,
      title: 'contrastiveMethodTitle',
      description: 'contrastiveMethodDescription',
      className: 'gray'
    },
    {
      icon: Users,
      title: 'activeCommunityTitle',
      description: 'activeCommunityDescription',
      className: 'green-black'
    },
    {
      icon: Award,
      title: 'certificationTitle',
      description: 'certificationDescription',
      className: 'dark'
    }
  ];

  return (
    <section id="metodo" className="features-section">
      <div className="features-section__background">
        <div className="features-section__bg-element-1"></div>
        <div className="features-section__bg-element-2"></div>
      </div>
      <div className="features-section__container">
        <div className="features-section__header">
          <h2 className="features-section__title">
            {t.methodTitle}
          </h2>
          <div className="features-section__subtitle-container">
            <p className="features-section__subtitle">
              {t.methodSubtitle}
            </p>
          </div>
        </div>

        <div className="features-section__grid">
          {features.map((feature, index) => (
            <div key={index} className={`features-section__card features-section__card--${feature.className} ${index % 2 === 0 ? 'features-section__card--even' : 'features-section__card--odd'}`}>
              <div className="features-section__card-content">
                <div className="features-section__card-icon">
                  <feature.icon className="features-section__card-icon-inner" />
                </div>
                <h3 className="features-section__card-title">
                  {t[feature.title as keyof Translation] as string}
                </h3>
                <p className="features-section__card-description">
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