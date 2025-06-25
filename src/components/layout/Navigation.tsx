import React from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { Translation } from '../../types/translations';
import LanguageSelector from '../ui/LanguageSelector';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: Translation;
}

function Navigation({ isMenuOpen, setIsMenuOpen, currentLang, setCurrentLang, t }: NavigationProps) {
  return (
    <nav className="relative bg-blue-50/95 backdrop-blur-md shadow-2xl sticky top-0 z-40 border-b-4 border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transform rotate-45 border-3 border-black shadow-xl">
              <Languages className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              dialectio.xyz
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            <a href="#idiomas" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.languages}</a>
            <a href="#nosotros" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.about}</a>
            <a href="#metodo" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.method}</a>
            
            <LanguageSelector 
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              isMobile={false}
            />
            
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-black text-base border-3 border-black shadow-xl hover:shadow-2xl hover:scale-105"
                    style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
              {t.start}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 hover:bg-blue-200 border-2 border-black transform rotate-45 shadow-lg transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-5 h-5 transform -rotate-45" /> : <Menu className="w-5 h-5 transform -rotate-45" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-18 left-0 right-0 bg-blue-50/98 backdrop-blur-md shadow-2xl border-4 border-black border-t-0">
            <div className="px-5 py-5 space-y-5">
              <a href="#idiomas" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.languages}</a>
              <a href="#nosotros" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.about}</a>
              <a href="#metodo" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.method}</a>
              
              <LanguageSelector 
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                isMobile={true}
              />
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-7 py-3 font-black text-base border-3 border-black mt-5 shadow-xl"
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                {t.start}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;