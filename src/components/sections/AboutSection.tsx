import React from 'react';
import { BookOpen, Target, Eye, Heart } from 'lucide-react';
import { Translation } from '../../types/translations';
import '../../styles/components/AboutSection.css';

interface AboutSectionProps {
  t: Translation;
}

function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="nosotros" className="about-section">
      <div className="about-section__background">
        <div className="about-section__bg-element-1"></div>
        <div className="about-section__bg-element-2"></div>
      </div>
      <div className="about-section__container">
        <div className="about-section__header">
          <h2 className="about-section__title">
            {t.aboutTitle}
          </h2>
          <div className="about-section__subtitle-container">
            <p className="about-section__subtitle">
              {t.aboutSubtitle}
            </p>
          </div>
        </div>

        <div className="about-section__descriptions">
          <div className="about-section__description-1">
            <p className="about-section__description-text">
              {t.aboutDescription1}
            </p>
          </div>
          <div className="about-section__description-2">
            <p className="about-section__description-text">
              {t.aboutDescription2}
            </p>
          </div>
          <div className="about-section__description-3">
            <p className="about-section__description-text">
              {t.aboutDescription3}
            </p>
          </div>
        </div>

        <div className="about-section__stats">
          <div className="about-section__stats-container">
            <div className="about-section__stats-header">
              <div className="about-section__stats-icon">
                <Heart className="about-section__stats-icon-inner" />
              </div>
              <div>
                <h3 className="about-section__stats-title">Pasión por las lenguas</h3>
                <p className="about-section__stats-subtitle">Conectando culturas a través del idioma</p>
              </div>
            </div>
            <div className="about-section__stats-grid">
              <div className="about-section__stat-item-1">
                <div className="about-section__stat-number about-section__stat-number--green">500M+</div>
                <div className="about-section__stat-label">Hablantes conectados</div>
              </div>
              <div className="about-section__stat-item-2">
                <div className="about-section__stat-number about-section__stat-number--gray">4</div>
                <div className="about-section__stat-label">Lenguas hermanas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section__cards">
          <div className="about-section__card about-section__card-1">
            <div className="about-section__card-icon about-section__card-icon--green">
              <BookOpen className="about-section__card-icon-inner" />
            </div>
            <h3 className="about-section__card-title">{t.ourStoryTitle}</h3>
            <p className="about-section__card-description">{t.ourStoryDescription}</p>
          </div>

          <div className="about-section__card about-section__card-2">
            <div className="about-section__card-icon about-section__card-icon--black">
              <Target className="about-section__card-icon-inner" />
            </div>
            <h3 className="about-section__card-title">{t.ourMissionTitle}</h3>
            <p className="about-section__card-description">{t.ourMissionDescription}</p>
          </div>

          <div className="about-section__card about-section__card-3">
            <div className="about-section__card-icon about-section__card-icon--green-black">
              <Eye className="about-section__card-icon-inner" />
            </div>
            <h3 className="about-section__card-title">{t.ourVisionTitle}</h3>
            <p className="about-section__card-description">{t.ourVisionDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;