import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Translation } from '../../types/translations';
import '../../styles/components/HeroSection.css';

interface HeroSectionProps {
  t: Translation;
}

function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      
      <div className="hero__geometric-overlays">
        <div className="hero__geometric-element-1"></div>
        <div className="hero__geometric-element-2"></div>
        <div className="hero__geometric-element-3"></div>
        <div className="hero__geometric-element-4"></div>
        <div className="hero__geometric-element-5"></div>
        <div className="hero__geometric-element-6"></div>
        <div className="hero__geometric-element-7"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            {t.heroTitle}
            <span className="hero__subtitle">
              {t.heroSubtitle}
            </span>
          </h1>
          <div className="hero__description-container">
            <p className="hero__description">
              {t.heroDescription}
            </p>
          </div>
          <div className="hero__buttons">
            <button className="hero__primary-button">
              <span>{t.startJourney}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="hero__secondary-button">
              {t.viewDemo}
            </button>
          </div>
        </div>
      </div>

      <div className="hero__floating-elements">
        <div className="hero__floating-element-1"></div>
        <div className="hero__floating-element-2"></div>
        <div className="hero__floating-element-3"></div>
      </div>
    </section>
  );
}

export default HeroSection;