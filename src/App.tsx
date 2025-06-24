import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Star, 
  CheckCircle,
  Menu,
  X,
  Languages,
  Zap,
  Target,
  Award,
  Heart,
  Lightbulb,
  Eye
} from 'lucide-react';
import { translations, Translation } from './translations';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>('es');

  const languages = [
    { 
      name: 'Español', 
      code: 'ES', 
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-50/90',
      borderColor: 'border-blue-600',
      description: 'spanishDescription'
    },
    { 
      name: 'Français', 
      code: 'FR', 
      color: 'from-purple-600 to-blue-700',
      bgColor: 'bg-purple-50/90',
      borderColor: 'border-purple-600',
      description: 'frenchDescription'
    },
    { 
      name: 'Português', 
      code: 'PT', 
      color: 'from-green-700 to-green-900',
      bgColor: 'bg-green-50/90',
      borderColor: 'border-green-700',
      description: 'portugueseDescription'
    },
    { 
      name: 'Italiano', 
      code: 'IT', 
      color: 'from-green-800 to-black',
      bgColor: 'bg-green-50/90',
      borderColor: 'border-green-800',
      description: 'italianDescription'
    }
  ];

  const languageOptions = [
    { code: 'es', name: 'ES' },
    { code: 'fr', name: 'FR' },
    { code: 'pt', name: 'PT' },
    { code: 'it', name: 'IT' },
    { code: 'en', name: 'EN' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'acceleratedLearningTitle',
      description: 'acceleratedLearningDescription',
      color: 'from-green-700 to-green-900',
      bgColor: 'bg-green-50/90'
    },
    {
      icon: Target,
      title: 'contrastiveMethodTitle',
      description: 'contrastiveMethodDescription',
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-50/90'
    },
    {
      icon: Users,
      title: 'activeCommunityTitle',
      description: 'activeCommunityDescription',
      color: 'from-green-800 to-black',
      bgColor: 'bg-green-50/90'
    },
    {
      icon: Award,
      title: 'certificationTitle',
      description: 'certificationDescription',
      color: 'from-gray-900 to-black',
      bgColor: 'bg-gray-50/90'
    }
  ];

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-blue-300 via-gray-200 via-green-200 to-black relative overflow-hidden font-sans">
      {/* Enhanced Suprematist geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue/purple elements in upper section with enhanced shadows */}
        <div className="absolute top-20 -right-32 w-96 h-64 bg-gradient-to-br from-blue-600 to-blue-800 transform rotate-45 opacity-20 shadow-2xl"></div>
        <div className="absolute top-10 left-1/4 w-32 h-8 bg-gradient-to-r from-purple-600 to-purple-800 transform rotate-30 opacity-25 shadow-xl"></div>
        
        {/* Neutral elements in middle with refined gradients */}
        <div className="absolute top-1/2 left-10 w-2 h-80 bg-gradient-to-b from-gray-700 to-gray-900 transform rotate-12 opacity-30 shadow-lg"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 transform -rotate-45 opacity-25 shadow-xl"></div>
        
        {/* Green elements in lower section with depth */}
        <div className="absolute bottom-40 left-1/3 w-48 h-8 bg-gradient-to-r from-green-700 to-green-900 transform rotate-15 opacity-30 shadow-xl"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-gradient-to-br from-green-800 to-black transform rotate-45 opacity-35 shadow-2xl"></div>
        
        {/* Black elements throughout with subtle variations */}
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-black transform rotate-45 opacity-50 shadow-lg"></div>
        <div className="absolute bottom-80 left-1/4 w-6 h-6 bg-black transform rotate-12 opacity-60 shadow-md"></div>
        <div className="absolute top-80 right-1/3 w-4 h-32 bg-black transform -rotate-30 opacity-45 shadow-lg"></div>
        <div className="absolute bottom-60 right-10 w-2 h-60 bg-black transform -rotate-45 opacity-40 shadow-md"></div>
      </div>

      {/* Navigation - Enhanced with premium styling */}
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

            {/* Desktop Navigation with enhanced Language Selector */}
            <div className="hidden md:flex items-center space-x-7">
              <a href="#idiomas" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.languages}</a>
              <a href="#nosotros" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.about}</a>
              <a href="#metodo" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.method}</a>
              <a href="#comunidad" className="text-gray-900 hover:text-blue-700 transition-all duration-300 font-bold text-base hover:scale-105">{t.community}</a>
              
              {/* Enhanced Language Selector */}
              <div className="flex items-center space-x-2 border-l-2 border-blue-300 pl-7">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`px-3 py-2 transition-all duration-300 transform font-black border-2 text-xs shadow-lg ${
                      currentLang === lang.code
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-black scale-110 shadow-xl'
                        : 'hover:bg-blue-200 text-gray-900 border-blue-400 hover:border-black hover:scale-105 hover:shadow-md'
                    }`}
                    style={{
                      clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
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

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-18 left-0 right-0 bg-blue-50/98 backdrop-blur-md shadow-2xl border-4 border-black border-t-0">
              <div className="px-5 py-5 space-y-5">
                <a href="#idiomas" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.languages}</a>
                <a href="#nosotros" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.about}</a>
                <a href="#metodo" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.method}</a>
                <a href="#comunidad" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base transition-all duration-300">{t.community}</a>
                
                {/* Enhanced Mobile Language Selector */}
                <div className="border-t-2 border-blue-300 pt-5">
                  <p className="text-gray-700 font-bold mb-3 text-base">Idioma:</p>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className={`px-3 py-2 transition-all duration-300 font-black border-2 text-xs shadow-md ${
                          currentLang === lang.code
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-black shadow-lg'
                            : 'hover:bg-blue-200 text-gray-900 border-blue-400 hover:shadow-lg'
                        }`}
                        style={{
                          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                        }}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-7 py-3 font-black text-base border-3 border-black mt-5 shadow-xl"
                        style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                  {t.start}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Enhanced with premium styling */}
      <section 
        className="relative overflow-hidden py-18 lg:py-28 min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced overlay with premium gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-blue-700/60"></div>
        
        {/* Enhanced Suprematist geometric overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-4 bg-white/40 transform rotate-45 opacity-40 animate-pulse shadow-lg"></div>
          <div className="absolute top-40 right-20 w-4 h-32 bg-blue-300/50 transform -rotate-30 opacity-50 animate-pulse delay-1000 shadow-md"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-white/35 transform rotate-45 opacity-35 animate-pulse delay-500 shadow-xl"></div>
          <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-blue-200/45 transform -rotate-45 opacity-45 animate-pulse delay-700 shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-48 bg-white/30 transform rotate-12 opacity-30 animate-pulse delay-300 shadow-md"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-2 bg-blue-100/40 transform rotate-60 opacity-40 animate-pulse delay-900 shadow-lg"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-white/50 transform -rotate-30 opacity-50 animate-pulse delay-1200 shadow-md"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-9 drop-shadow-2xl tracking-tight">
              {t.heroTitle}
              <span className="text-blue-200 block drop-shadow-2xl">
                {t.heroSubtitle}
              </span>
            </h1>
            <div className="bg-white/95 backdrop-blur-md p-9 max-w-5xl mx-auto mb-10 border-4 border-black transform rotate-1 shadow-2xl"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-5 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-4 border-black shadow-2xl hover:shadow-3xl hover:scale-105"
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                <span>{t.startJourney}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-4 border-white text-white px-10 py-5 hover:bg-white/30 transition-all duration-300 text-lg font-black bg-white/20 backdrop-blur-md shadow-2xl hover:shadow-3xl hover:scale-105"
                      style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
                {t.viewDemo}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced floating geometric elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/40 transform rotate-45 animate-pulse shadow-lg"></div>
          <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-blue-200/50 transform -rotate-45 animate-pulse delay-1000 shadow-md"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/30 transform rotate-45 animate-pulse delay-500 shadow-lg"></div>
        </div>
      </section>

      {/* Language Showcase - Enhanced neutral tones */}
      <section id="idiomas" className="py-21 bg-gray-100/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-32 h-2 bg-gradient-to-r from-gray-600 to-gray-800 transform rotate-45 opacity-35 shadow-lg"></div>
          <div className="absolute bottom-10 right-1/4 w-2 h-32 bg-black transform -rotate-12 opacity-35 shadow-md"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-18">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-7 tracking-tight">
              {t.languagesSectionTitle}
            </h2>
            <div className="bg-white/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black transform -rotate-1 shadow-2xl"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <p className="text-lg text-gray-900 font-bold">
                {t.languagesSectionSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
            {languages.map((language, index) => (
              <div
                key={language.code}
                className={`relative p-9 cursor-pointer transform transition-all duration-500 border-4 border-black shadow-xl ${
                  activeLanguage === index 
                    ? 'scale-110 rotate-3 shadow-2xl' 
                    : 'hover:scale-105 hover:-rotate-1 hover:shadow-2xl'
                } ${language.bgColor} backdrop-blur-md`}
                style={{ 
                  clipPath: activeLanguage === index 
                    ? 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                    : 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                }}
                onMouseEnter={() => setActiveLanguage(index)}
              >
                <div className="relative z-10">
                  <div className={`w-21 h-21 bg-gradient-to-br ${language.color} flex items-center justify-center mb-7 mx-auto border-3 border-black transform rotate-45 shadow-xl`}>
                    <span className="text-white font-black text-xl transform -rotate-45">{language.code}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-5 text-center">{language.name}</h3>
                  <p className="text-gray-800 text-center leading-relaxed font-bold text-sm">
                    {t[language.description as keyof Translation] as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Enhanced neutral to green transition */}
      <section id="nosotros" className="py-21 bg-gradient-to-b from-gray-200/90 to-green-100/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 transform rotate-45 opacity-25 shadow-xl"></div>
          <div className="absolute bottom-20 left-10 w-4 h-48 bg-black transform -rotate-30 opacity-25 shadow-lg"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-18">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-7 tracking-tight">
              {t.aboutTitle}
            </h2>
            <div className="bg-white/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black transform rotate-1 shadow-2xl"
                 style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
              <p className="text-lg text-gray-900 font-bold">
                {t.aboutSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-21">
            <div className="space-y-9">
              <div className="bg-white/90 backdrop-blur-md p-7 border-4 border-black transform rotate-1 shadow-xl"
                   style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                <p className="text-base text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription1}
                </p>
              </div>
              <div className="bg-green-50/90 backdrop-blur-md p-7 border-4 border-black transform -rotate-1 shadow-xl"
                   style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                <p className="text-base text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription2}
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-7 border-4 border-black transform rotate-1 shadow-xl"
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <p className="text-base text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription3}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-md p-9 shadow-2xl border-4 border-black transform -rotate-2"
                   style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-5 mb-7">
                  <div className="w-18 h-18 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center border-3 border-black transform rotate-45 shadow-xl">
                    <Heart className="w-9 h-9 text-white transform -rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Pasión por las lenguas</h3>
                    <p className="text-gray-700 font-bold text-sm">Conectando culturas a través del idioma</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="text-center p-5 bg-green-50/90 border-3 border-black transform rotate-1 shadow-lg">
                    <div className="text-2xl font-black text-green-700">500M+</div>
                    <div className="text-xs text-gray-700 font-bold">Hablantes conectados</div>
                  </div>
                  <div className="text-center p-5 bg-gray-50/90 border-3 border-black transform -rotate-1 shadow-lg">
                    <div className="text-2xl font-black text-gray-900">4</div>
                    <div className="text-xs text-gray-700 font-bold">Lenguas hermanas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            <div className="bg-white/90 backdrop-blur-md p-9 shadow-xl text-center border-4 border-black transform rotate-1"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="w-21 h-21 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center mx-auto mb-7 border-3 border-black transform rotate-45 shadow-xl">
                <BookOpen className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-5">{t.ourStoryTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourStoryDescription}</p>
            </div>

            <div className="bg-green-50/90 backdrop-blur-md p-9 shadow-xl text-center border-4 border-black transform -rotate-1"
                 style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
              <div className="w-21 h-21 bg-black flex items-center justify-center mx-auto mb-7 border-3 border-black transform rotate-45 shadow-xl">
                <Target className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-5">{t.ourMissionTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourMissionDescription}</p>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-9 shadow-xl text-center border-4 border-black transform rotate-1"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="w-21 h-21 bg-gradient-to-br from-green-800 to-black flex items-center justify-center mx-auto mb-7 border-3 border-black transform rotate-45 shadow-xl">
                <Eye className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-5">{t.ourVisionTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourVisionDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced green tones */}
      <section id="metodo" className="py-21 bg-green-100/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-24 h-2 bg-gradient-to-r from-green-800 to-black transform rotate-30 opacity-35 shadow-lg"></div>
          <div className="absolute bottom-1/4 right-10 w-2 h-24 bg-black transform -rotate-45 opacity-35 shadow-md"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-18">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-7 tracking-tight">
              {t.methodTitle}
            </h2>
            <div className="bg-white/95 backdrop-blur-md p-7 max-w-4xl mx-auto border-4 border-black transform -rotate-1 shadow-2xl"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <p className="text-lg text-gray-900 font-bold">
                {t.methodSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} backdrop-blur-md p-9 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-black transform hover:scale-105 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                   style={{ 
                     clipPath: index % 2 === 0 
                       ? 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                       : 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)'
                   }}>
                <div className="flex items-start space-x-7">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 border-3 border-black transform ${index % 2 === 0 ? 'rotate-45' : '-rotate-45'} shadow-xl`}>
                    <feature.icon className={`w-9 h-9 text-white transform ${index % 2 === 0 ? '-rotate-45' : 'rotate-45'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5">
                      {t[feature.title as keyof Translation] as string}
                    </h3>
                    <p className="text-gray-900 leading-relaxed font-bold text-sm">
                      {t[feature.description as keyof Translation] as string}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced green to black transition */}
      <section className="py-21 bg-gradient-to-b from-green-200/90 to-gray-800/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-12 h-12 bg-gradient-to-br from-green-800 to-black transform rotate-45 opacity-25 shadow-xl"></div>
          <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-black transform -rotate-45 opacity-35 shadow-lg"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9 text-center">
            <div className="bg-green-50/95 backdrop-blur-md p-9 border-4 border-black transform rotate-2 shadow-2xl"
                 style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}>
              <div className="text-4xl md:text-6xl font-black text-green-700 mb-5">
                80%
              </div>
              <p className="text-lg font-black text-gray-900 mb-2">{t.fasterStat}</p>
              <p className="text-gray-700 font-bold text-sm">{t.fasterDescription}</p>
            </div>
            <div className="bg-gray-100/95 backdrop-blur-md p-9 border-4 border-black transform -rotate-2 shadow-2xl"
                 style={{ clipPath: 'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)' }}>
              <div className="text-4xl md:text-6xl font-black text-gray-900 mb-5">
                4
              </div>
              <p className="text-lg font-black text-gray-900 mb-2">{t.languagesStat}</p>
              <p className="text-gray-700 font-bold text-sm">{t.languagesDescription}</p>
            </div>
            <div className="bg-green-50/95 backdrop-blur-md p-9 border-4 border-black transform rotate-2 shadow-2xl"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="text-4xl md:text-6xl font-black text-green-800 mb-5">
                10k+
              </div>
              <p className="text-lg font-black text-gray-900 mb-2">{t.studentsStat}</p>
              <p className="text-gray-700 font-bold text-sm">{t.studentsDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Dark Green */}
      <section className="py-21 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-4 bg-black/40 transform rotate-45 opacity-40 shadow-lg"></div>
          <div className="absolute bottom-10 right-10 w-4 h-32 bg-black/40 transform -rotate-30 opacity-40 shadow-md"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-black/30 transform rotate-45 opacity-30 shadow-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-9 tracking-tight">
            {t.ctaTitle}
          </h2>
          <div className="bg-white/25 backdrop-blur-md p-7 max-w-4xl mx-auto mb-10 border-4 border-black transform rotate-1 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-white font-bold">
              {t.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
            <button className="bg-white text-green-800 px-10 py-5 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-4 border-black shadow-2xl hover:shadow-3xl hover:scale-105"
                    style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
              <span>{t.createAccount}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-4 border-white text-white px-10 py-5 hover:bg-white hover:text-green-800 transition-all duration-300 text-lg font-black shadow-2xl hover:shadow-3xl hover:scale-105"
                    style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
              {t.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced Black */}
      <footer className="bg-black text-white py-14 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-5 left-1/4 w-8 h-8 bg-gradient-to-br from-green-700 to-green-900 transform rotate-45 opacity-35 shadow-lg"></div>
          <div className="absolute bottom-5 right-1/4 w-4 h-16 bg-gradient-to-b from-green-800 to-black transform -rotate-30 opacity-35 shadow-md"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-9">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-7">
                <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center transform rotate-45 border-3 border-white shadow-xl">
                  <Languages className="w-7 h-7 text-white transform -rotate-45" />
                </div>
                <span className="text-2xl font-black">dialectio.xyz</span>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-md p-7 mb-7 border-3 border-gray-700 transform rotate-1 shadow-xl"
                   style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                <p className="text-gray-300 font-bold text-sm">
                  {t.footerDescription}
                </p>
              </div>
              <div className="flex space-x-5">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer border-2 border-gray-600 transform hover:rotate-45 shadow-lg hover:shadow-xl">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer border-2 border-gray-600 transform hover:rotate-45 shadow-lg hover:shadow-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer border-2 border-gray-600 transform hover:rotate-45 shadow-lg hover:shadow-xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-black mb-5">{t.languages}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Español</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Français</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Português</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Italiano</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-black mb-5">{t.resources}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.blog}</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.help}</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.community}</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.contact}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-4 border-gray-700 mt-10 pt-9 text-center">
            <div className="bg-gray-900/90 backdrop-blur-md p-5 border-3 border-gray-700 inline-block transform -rotate-1 shadow-xl"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <p className="text-gray-400 font-bold text-sm">{t.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;