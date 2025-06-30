import React from 'react';
import { Mail, MapPin, Phone, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';

interface FooterProps {
  t: Translation;
}

function Footer({ t }: FooterProps) {
  return (
    <footer className="relative z-10 bg-black/90 dark:bg-black/95 backdrop-blur-md border-t-4 border-white dark:border-gray-300 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transform rotate-45 border-3 border-white shadow-xl">
                <Languages className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                dialectio.xyz
              </span>
            </div>
            <p className="text-gray-300 font-bold text-lg mb-6 leading-relaxed">
              {t.footerDescription}
            </p>
            <div className="bg-white/10 backdrop-blur-md p-4 border-2 border-white/30 shadow-lg"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <p className="text-white font-bold text-sm">
                {t.footerTagline}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6">{t.footerQuickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/demo" className="text-gray-300 hover:text-white font-bold transition-colors duration-300 hover:underline">
                  {t.demo}
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white font-bold transition-colors duration-300 hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="/learning" className="text-gray-300 hover:text-white font-bold transition-colors duration-300 hover:underline">
                  {t.footerLearning}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black mb-6">{t.footerContact}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 flex items-center justify-center transform rotate-45 border border-white/50">
                  <Mail className="w-4 h-4 transform -rotate-45" />
                </div>
                <div>
                  <p className="text-gray-300 font-bold text-sm">{t.footerEmail}</p>
                  <p className="text-white font-black">alindev95 [@] gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 flex items-center justify-center transform rotate-45 border border-white/50">
                  <MapPin className="w-4 h-4 transform -rotate-45" />
                </div>
                <div>
                  <p className="text-gray-300 font-bold text-sm">{t.footerLocation}</p>
                  <p className="text-white font-black">España</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 font-bold text-sm">
              © 2025 Dialectio. {t.footerRights}
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-bold text-sm">
                {t.footerMadeWith} ❤️ {t.footerForHackathon}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;