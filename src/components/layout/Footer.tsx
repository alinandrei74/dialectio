import React from 'react';
import { Globe, BookOpen, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';

interface FooterProps {
  t: Translation;
}

function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-black dark:bg-gray-900 text-white relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-5 left-1/4 w-8 h-8 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 transform rotate-45 opacity-35 shadow-lg"></div>
        <div className="absolute bottom-5 right-1/4 w-4 h-16 bg-gradient-to-b from-green-800 to-black dark:from-green-700 dark:to-gray-900 transform -rotate-30 opacity-35 shadow-md"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-14">
        {/* Contenido principal del footer en disposición horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-7">
              <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center transform rotate-45 border-3 border-white dark:border-gray-300 shadow-xl">
                <Languages className="w-7 h-7 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black">dialectio.xyz</span>
            </div>
            <div className="bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-md p-6 mb-7 border-3 border-gray-700 dark:border-gray-600 transform rotate-1 shadow-xl"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <p className="text-gray-300 dark:text-gray-200 font-bold text-sm leading-relaxed">
                {t.footerDescription}
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 cursor-pointer border-2 border-gray-600 dark:border-gray-500 transform hover:rotate-45 shadow-lg hover:shadow-xl">
                <Globe className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 cursor-pointer border-2 border-gray-600 dark:border-gray-500 transform hover:rotate-45 shadow-lg hover:shadow-xl">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          {/* Enlaces en disposición horizontal */}
          <div className="flex flex-col">
            <h3 className="text-lg font-black mb-5">{t.languages}</h3>
            <div className="space-y-3 text-gray-400 dark:text-gray-300">
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">Español</a>
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">Français</a>
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">Português</a>
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">Italiano</a>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-black mb-5">{t.resources}</h3>
            <div className="space-y-3 text-gray-400 dark:text-gray-300">
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">{t.blog}</a>
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">{t.help}</a>
              <a href="#" className="block hover:text-white transition-all duration-300 font-bold text-sm">{t.contact}</a>
            </div>
          </div>
        </div>
        
        <div className="border-t-4 border-gray-700 dark:border-gray-600 mt-10 pt-9 text-center">
          <div className="bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-md p-5 border-3 border-gray-700 dark:border-gray-600 inline-block transform -rotate-1 shadow-xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-gray-400 dark:text-gray-300 font-bold text-sm">{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;