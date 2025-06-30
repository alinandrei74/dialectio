import React from 'react';
import { Languages, Heart, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Translation } from '../../types/translations';

interface FooterProps {
  t: Translation;
}

function Footer({ t }: FooterProps) {
  return (
    <footer className="relative z-10 bg-black/80 dark:bg-black/90 backdrop-blur-md border-t-4 border-white dark:border-gray-300 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transform rotate-45 border-3 border-white shadow-xl">
                <Languages className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                dialectio.xyz
              </span>
            </div>
            <p className="text-gray-300 font-bold text-lg mb-4 leading-relaxed">
              {t.footerDescription}
            </p>
            <p className="text-gray-400 font-bold text-sm">
              {t.footerTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-4 text-white">
              {t.footerQuickLinks}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/demo" 
                  className="text-gray-300 hover:text-white font-bold transition-colors duration-300 hover:underline"
                >
                  {t.demo}
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-300 hover:text-white font-bold transition-colors duration-300 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white font-bold transition-colors duration-300 hover:underline"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-black mb-4 text-white">
              {t.footerConnect}
            </h3>
            <div className="space-y-3">
              <a 
                href="mailto:hello@dialectio.xyz" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white font-bold transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>hello@dialectio.xyz</span>
              </a>
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://github.com/dialectio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white transform rotate-45 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
                >
                  <Github className="w-5 h-5 text-white transform -rotate-45" />
                </a>
                <a 
                  href="https://twitter.com/dialectio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white transform rotate-45 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
                >
                  <Twitter className="w-5 h-5 text-white transform -rotate-45" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 font-bold text-sm mb-4 md:mb-0">
              <span>© 2025 Dialectio</span>
              <span>•</span>
              <span>{t.footerMadeWith}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t.footerForLanguageLearners}</span>
            </div>
            
            <div className="text-gray-400 font-bold text-sm">
              <span>{t.footerVersion} 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;