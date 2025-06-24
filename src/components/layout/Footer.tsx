import React from 'react';
import { Globe, BookOpen, Users, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';
import '../../styles/components/Footer.css';

interface FooterProps {
  t: Translation;
}

function Footer({ t }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__background">
        <div className="footer__bg-element-1"></div>
        <div className="footer__bg-element-2"></div>
      </div>
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand-section">
            <div className="footer__brand">
              <div className="footer__logo">
                <Languages className="footer__logo-icon" />
              </div>
              <span className="footer__brand-text">dialectio.xyz</span>
            </div>
            <div className="footer__description-container">
              <p className="footer__description">
                {t.footerDescription}
              </p>
            </div>
            <div className="footer__social">
              <div className="footer__social-icon">
                <Globe className="footer__social-icon-inner" />
              </div>
              <div className="footer__social-icon">
                <BookOpen className="footer__social-icon-inner" />
              </div>
              <div className="footer__social-icon">
                <Users className="footer__social-icon-inner" />
              </div>
            </div>
          </div>
          
          <div className="footer__links-section">
            <h3 className="footer__links-title">{t.languages}</h3>
            <div className="footer__links">
              <a href="#" className="footer__link">Español</a>
              <a href="#" className="footer__link">Français</a>
              <a href="#" className="footer__link">Português</a>
              <a href="#" className="footer__link">Italiano</a>
            </div>
          </div>
          
          <div className="footer__links-section">
            <h3 className="footer__links-title">{t.resources}</h3>
            <div className="footer__links">
              <a href="#" className="footer__link">{t.blog}</a>
              <a href="#" className="footer__link">{t.help}</a>
              <a href="#" className="footer__link">{t.community}</a>
              <a href="#" className="footer__link">{t.contact}</a>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__copyright-container">
            <p className="footer__copyright">{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;