import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Translation } from '../../types/translations';
import '../../styles/components/CTASection.css';

interface CTASectionProps {
  t: Translation;
}

function CTASection({ t }: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-section__background">
        <div className="cta-section__bg-element-1"></div>
        <div className="cta-section__bg-element-2"></div>
        <div className="cta-section__bg-element-3"></div>
      </div>
      <div className="cta-section__container">
        <h2 className="cta-section__title">
          {t.ctaTitle}
        </h2>
        <div className="cta-section__description-container">
          <p className="cta-section__description">
            {t.ctaDescription}
          </p>
        </div>
        <div className="cta-section__buttons">
          <button className="cta-section__primary-button">
            <span>{t.createAccount}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="cta-section__secondary-button">
            {t.learnMore}
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;