import React from 'react';
import { Translation } from '../../types/translations';
import '../../styles/components/StatsSection.css';

interface StatsSectionProps {
  t: Translation;
}

function StatsSection({ t }: StatsSectionProps) {
  return (
    <section className="stats-section">
      <div className="stats-section__background">
        <div className="stats-section__bg-element-1"></div>
        <div className="stats-section__bg-element-2"></div>
      </div>
      <div className="stats-section__container">
        <div className="stats-section__grid">
          <div className="stats-section__card stats-section__card-1">
            <div className="stats-section__number stats-section__number--green">
              80%
            </div>
            <p className="stats-section__title">{t.fasterStat}</p>
            <p className="stats-section__description">{t.fasterDescription}</p>
          </div>
          
          <div className="stats-section__card stats-section__card-2">
            <div className="stats-section__number stats-section__number--gray">
              4
            </div>
            <p className="stats-section__title">{t.languagesStat}</p>
            <p className="stats-section__description">{t.languagesDescription}</p>
          </div>
          
          <div className="stats-section__card stats-section__card-3">
            <div className="stats-section__number stats-section__number--green-dark">
              10k+
            </div>
            <p className="stats-section__title">{t.studentsStat}</p>
            <p className="stats-section__description">{t.studentsDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;