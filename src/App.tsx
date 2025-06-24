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
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-600',
      description: 'spanishDescription'
    },
    { 
      name: 'Français', 
      code: 'FR', 
      color: 'from-purple-600 to-blue-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-600',
      description: 'frenchDescription'
    },
    { 
      name: 'Português', 
      code: 'PT', 
      color: 'from-green-700 to-green-900',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-700',
      description: 'portugueseDescription'
    },
    { 
      name: 'Italiano', 
      code: 'IT', 
      color: 'from-green-800 to-black',
      bgColor: 'bg-green-50',
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
      bgColor: 'bg-green-50'
    },
    {
      icon: Target,
      title: 'contrastiveMethodTitle',
      description: 'contrastiveMethodDescription',
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-50'
    },
    {
      icon: Users,
      title: 'activeCommunityTitle',
      description: 'activeCommunityDescription',
      color: 'from-green-800 to-black',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      title: 'certificationTitle',
      description: 'certificationDescription',
      color: 'from-gray-900 to-black',
      bgColor: 'bg-gray-50'
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
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-blue-300 via-gray-200 via-green-200 to-black relative overflow-hidden">
      {/* Suprematist geometric background elements inspired by Malevich */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue/purple elements in upper section */}
        <div className="absolute top-20 -right-32 w-96 h-64 bg-blue-600 transform rotate-45 opacity-15"></div>
        <div className="absolute top-10 left-1/4 w-32 h-8 bg-purple-600 transform rotate-30 opacity-20"></div>
        
        {/* Neutral elements in middle */}
        <div className="absolute top-1/2 left-10 w-2 h-80 bg-gray-700 transform rotate-12 opacity-25"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-gray-600 transform -rotate-45 opacity-20"></div>
        
        {/* Green elements in lower section */}
        <div className="absolute bottom-40 left-1/3 w-48 h-8 bg-green-700 transform rotate-15 opacity-25"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-green-800 transform rotate-45 opacity-30"></div>
        
        {/* Black elements throughout */}
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-black transform rotate-45 opacity-40"></div>
        <div className="absolute bottom-80 left-1/4 w-6 h-6 bg-black transform rotate-12 opacity-50"></div>
        <div className="absolute top-80 right-1/3 w-4 h-32 bg-black transform -rotate-30 opacity-35"></div>
        <div className="absolute bottom-60 right-10 w-2 h-60 bg-black transform -rotate-45 opacity-30"></div>
      </div>

      {/* Navigation - Blue tones with integrated language selector */}
      <nav className="relative bg-blue-50/90 backdrop-blur-sm shadow-lg sticky top-0 z-40 border-b-4 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 flex items-center justify-center transform rotate-45 border-2 border-black">
                <Languages className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className="text-3xl font-black text-gray-900 transform skew-x-12">
                dialectio.xyz
              </span>
            </div>

            {/* Desktop Navigation with Language Selector */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#idiomas" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-lg transform hover:skew-x-12">{t.languages}</a>
              <a href="#nosotros" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-lg transform hover:skew-x-12">{t.about}</a>
              <a href="#metodo" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-lg transform hover:skew-x-12">{t.method}</a>
              <a href="#comunidad" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-lg transform hover:skew-x-12">{t.community}</a>
              
              {/* Language Selector */}
              <div className="flex items-center space-x-2 border-l-2 border-blue-300 pl-6">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`px-3 py-2 transition-all duration-300 transform font-black border-2 text-sm ${
                      currentLang === lang.code
                        ? 'bg-blue-600 text-white border-black scale-110'
                        : 'hover:bg-blue-200 text-gray-900 border-blue-400 hover:border-black'
                    }`}
                    style={{
                      clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
              <button className="bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transform hover:skew-x-12 transition-all duration-200 font-black text-lg border-2 border-black"
                      style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)' }}>
                {t.start}
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 hover:bg-blue-200 border-2 border-black transform rotate-45"
            >
              {isMenuOpen ? <X className="w-6 h-6 transform -rotate-45" /> : <Menu className="w-6 h-6 transform -rotate-45" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-blue-50 shadow-xl border-4 border-black border-t-0">
              <div className="px-6 py-4 space-y-4">
                <a href="#idiomas" className="block text-gray-900 hover:text-blue-700 py-3 font-bold text-lg">{t.languages}</a>
                <a href="#nosotros" className="block text-gray-900 hover:text-blue-700 py-3 font-bold text-lg">{t.about}</a>
                <a href="#metodo" className="block text-gray-900 hover:text-blue-700 py-3 font-bold text-lg">{t.method}</a>
                <a href="#comunidad" className="block text-gray-900 hover:text-blue-700 py-3 font-bold text-lg">{t.community}</a>
                
                {/* Mobile Language Selector */}
                <div className="border-t-2 border-blue-300 pt-4">
                  <p className="text-gray-700 font-bold mb-3">Idioma:</p>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className={`px-3 py-2 transition-all duration-300 font-black border-2 text-sm ${
                          currentLang === lang.code
                            ? 'bg-blue-600 text-white border-black'
                            : 'hover:bg-blue-200 text-gray-900 border-blue-400'
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
                
                <button className="w-full bg-blue-600 text-white px-6 py-3 font-black text-lg border-2 border-black mt-4"
                        style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                  {t.start}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Blue/Purple tones with Sea Background */}
      <section 
        className="relative overflow-hidden py-20 lg:py-32 min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay with Malevich-inspired geometric elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/30 to-blue-700/50"></div>
        
        {/* Suprematist geometric overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-4 bg-white transform rotate-45 opacity-30"></div>
          <div className="absolute top-40 right-20 w-4 h-32 bg-blue-300 transform -rotate-30 opacity-40"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-white transform rotate-45 opacity-25"></div>
          <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-blue-200 transform -rotate-45 opacity-35"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-48 bg-white transform rotate-12 opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 transform skew-y-3 drop-shadow-2xl">
              {t.heroTitle}
              <span className="text-blue-200 block transform -skew-y-3 drop-shadow-2xl">
                {t.heroSubtitle}
              </span>
            </h1>
            <div className="bg-white/90 backdrop-blur-sm p-8 max-w-5xl mx-auto mb-10 border-4 border-black transform rotate-1 shadow-2xl"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <p className="text-xl md:text-2xl text-gray-900 font-bold leading-relaxed">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-blue-600 text-white px-10 py-5 hover:bg-blue-700 transform hover:skew-x-12 transition-all duration-300 flex items-center space-x-3 text-xl font-black border-4 border-black shadow-2xl"
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                <span>{t.startJourney}</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="border-4 border-white text-white px-10 py-5 hover:bg-white/20 transition-all duration-300 text-xl font-black bg-white/10 backdrop-blur-sm transform hover:skew-x-12 shadow-2xl"
                      style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
                {t.viewDemo}
              </button>
            </div>
          </div>
        </div>

        {/* Floating geometric elements that move with scroll */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-blue-200/40 transform -rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/20 transform rotate-45 animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Language Showcase - Neutral tones */}
      <section id="idiomas" className="py-20 bg-gray-100/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-32 h-2 bg-gray-600 transform rotate-45 opacity-30"></div>
          <div className="absolute bottom-10 right-1/4 w-2 h-32 bg-black transform -rotate-12 opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 transform skew-x-6">
              {t.languagesSectionTitle}
            </h2>
            <div className="bg-white/90 backdrop-blur-sm p-6 max-w-4xl mx-auto border-4 border-black transform -rotate-1"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <p className="text-xl text-gray-900 font-bold">
                {t.languagesSectionSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {languages.map((language, index) => (
              <div
                key={language.code}
                className={`relative p-8 cursor-pointer transform transition-all duration-500 border-4 border-black ${
                  activeLanguage === index 
                    ? 'scale-110 rotate-3' 
                    : 'hover:scale-105 hover:-rotate-1'
                } ${language.bgColor} backdrop-blur-sm`}
                style={{ 
                  clipPath: activeLanguage === index 
                    ? 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                    : 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                }}
                onMouseEnter={() => setActiveLanguage(index)}
              >
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${language.color} flex items-center justify-center mb-6 mx-auto border-2 border-black transform rotate-45`}>
                    <span className="text-white font-black text-2xl transform -rotate-45">{language.code}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 text-center transform skew-x-3">{language.name}</h3>
                  <p className="text-gray-800 text-center leading-relaxed font-bold">
                    {t[language.description as keyof Translation] as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Neutral to Green transition */}
      <section id="nosotros" className="py-20 bg-gradient-to-b from-gray-200/80 to-green-100/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-16 h-16 bg-green-700 transform rotate-45 opacity-20"></div>
          <div className="absolute bottom-20 left-10 w-4 h-48 bg-black transform -rotate-30 opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 transform -skew-x-3">
              {t.aboutTitle}
            </h2>
            <div className="bg-white/90 backdrop-blur-sm p-6 max-w-4xl mx-auto border-4 border-black transform rotate-1"
                 style={{ clipPath: 'polygon(0% 0%, 97% 0%, 100% 100%, 3% 100%)' }}>
              <p className="text-xl text-gray-900 font-bold">
                {t.aboutSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 border-4 border-black transform rotate-1"
                   style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                <p className="text-lg text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription1}
                </p>
              </div>
              <div className="bg-green-50/80 backdrop-blur-sm p-6 border-4 border-black transform -rotate-1"
                   style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
                <p className="text-lg text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription2}
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 border-4 border-black transform rotate-1"
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <p className="text-lg text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription3}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-sm p-8 shadow-xl border-4 border-black transform -rotate-2"
                   style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-700 flex items-center justify-center border-2 border-black transform rotate-45">
                    <Heart className="w-8 h-8 text-white transform -rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 transform skew-x-3">Pasión por las lenguas</h3>
                    <p className="text-gray-700 font-bold">Conectando culturas a través del idioma</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 border-2 border-black transform rotate-1">
                    <div className="text-3xl font-black text-green-700">500M+</div>
                    <div className="text-sm text-gray-700 font-bold">Hablantes conectados</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 border-2 border-black transform -rotate-1">
                    <div className="text-3xl font-black text-gray-900">4</div>
                    <div className="text-sm text-gray-700 font-bold">Lenguas hermanas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 shadow-lg text-center border-4 border-black transform rotate-1"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="w-20 h-20 bg-green-700 flex items-center justify-center mx-auto mb-6 border-2 border-black transform rotate-45">
                <BookOpen className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 transform skew-x-3">{t.ourStoryTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold">{t.ourStoryDescription}</p>
            </div>

            <div className="bg-green-50/80 backdrop-blur-sm p-8 shadow-lg text-center border-4 border-black transform -rotate-1"
                 style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
              <div className="w-20 h-20 bg-black flex items-center justify-center mx-auto mb-6 border-2 border-black transform rotate-45">
                <Target className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 transform -skew-x-3">{t.ourMissionTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold">{t.ourMissionDescription}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 shadow-lg text-center border-4 border-black transform rotate-1"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <div className="w-20 h-20 bg-green-800 flex items-center justify-center mx-auto mb-6 border-2 border-black transform rotate-45">
                <Eye className="w-10 h-10 text-white transform -rotate-45" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 transform skew-x-3">{t.ourVisionTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold">{t.ourVisionDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Green tones */}
      <section id="metodo" className="py-20 bg-green-100/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-24 h-2 bg-green-800 transform rotate-30 opacity-30"></div>
          <div className="absolute bottom-1/4 right-10 w-2 h-24 bg-black transform -rotate-45 opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 transform skew-y-2">
              {t.methodTitle}
            </h2>
            <div className="bg-white/90 backdrop-blur-sm p-6 max-w-4xl mx-auto border-4 border-black transform -rotate-1"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <p className="text-xl text-gray-900 font-bold">
                {t.methodSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-black transform hover:scale-105 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                   style={{ 
                     clipPath: index % 2 === 0 
                       ? 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                       : 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)'
                   }}>
                <div className="flex items-start space-x-6">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 border-2 border-black transform ${index % 2 === 0 ? 'rotate-45' : '-rotate-45'}`}>
                    <feature.icon className={`w-8 h-8 text-white transform ${index % 2 === 0 ? '-rotate-45' : 'rotate-45'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 transform skew-x-3">
                      {t[feature.title as keyof Translation] as string}
                    </h3>
                    <p className="text-gray-900 leading-relaxed font-bold">
                      {t[feature.description as keyof Translation] as string}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Green to Black transition */}
      <section className="py-20 bg-gradient-to-b from-green-200/80 to-gray-800/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-12 h-12 bg-green-800 transform rotate-45 opacity-20"></div>
          <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-black transform -rotate-45 opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-green-50/90 backdrop-blur-sm p-8 border-4 border-black transform rotate-2"
                 style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}>
              <div className="text-5xl md:text-6xl font-black text-green-700 mb-4 transform skew-x-12">
                80%
              </div>
              <p className="text-xl font-black text-gray-900 mb-2">{t.fasterStat}</p>
              <p className="text-gray-700 font-bold">{t.fasterDescription}</p>
            </div>
            <div className="bg-gray-100/90 backdrop-blur-sm p-8 border-4 border-black transform -rotate-2"
                 style={{ clipPath: 'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)' }}>
              <div className="text-5xl md:text-6xl font-black text-gray-900 mb-4 transform -skew-x-12">
                4
              </div>
              <p className="text-xl font-black text-gray-900 mb-2">{t.languagesStat}</p>
              <p className="text-gray-700 font-bold">{t.languagesDescription}</p>
            </div>
            <div className="bg-green-50/90 backdrop-blur-sm p-8 border-4 border-black transform rotate-2"
                 style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
              <div className="text-5xl md:text-6xl font-black text-green-800 mb-4 transform skew-x-12">
                10k+
              </div>
              <p className="text-xl font-black text-gray-900 mb-2">{t.studentsStat}</p>
              <p className="text-gray-700 font-bold">{t.studentsDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Green */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-4 bg-black transform rotate-45 opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-4 h-32 bg-black transform -rotate-30 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-black transform rotate-45 opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 transform -skew-y-2">
            {t.ctaTitle}
          </h2>
          <div className="bg-white/20 backdrop-blur-sm p-6 max-w-4xl mx-auto mb-10 border-4 border-black transform rotate-1"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-xl text-white font-bold">
              {t.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-green-800 px-10 py-5 hover:bg-gray-100 transform hover:skew-x-12 transition-all duration-300 flex items-center space-x-3 text-xl font-black border-4 border-black"
                    style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
              <span>{t.createAccount}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="border-4 border-white text-white px-10 py-5 hover:bg-white hover:text-green-800 transition-all duration-300 text-xl font-black transform hover:skew-x-12"
                    style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)' }}>
              {t.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Black */}
      <footer className="bg-black text-white py-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-5 left-1/4 w-8 h-8 bg-green-700 transform rotate-45 opacity-30"></div>
          <div className="absolute bottom-5 right-1/4 w-4 h-16 bg-green-800 transform -rotate-30 opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-700 flex items-center justify-center transform rotate-45 border-2 border-white">
                  <Languages className="w-6 h-6 text-white transform -rotate-45" />
                </div>
                <span className="text-3xl font-black transform skew-x-12">dialectio.xyz</span>
              </div>
              <div className="bg-gray-900 p-6 mb-6 border-2 border-gray-700 transform rotate-1"
                   style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                <p className="text-gray-300 font-bold">
                  {t.footerDescription}
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer border-2 border-gray-600 transform hover:rotate-45">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer border-2 border-gray-600 transform hover:rotate-45">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer border-2 border-gray-600 transform hover:rotate-45">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-black mb-4 transform skew-x-3">{t.languages}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">Español</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">Français</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">Português</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">Italiano</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-black mb-4 transform -skew-x-3">{t.resources}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">{t.blog}</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">{t.help}</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">{t.community}</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-bold hover:skew-x-12 transform inline-block">{t.contact}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-4 border-gray-700 mt-8 pt-8 text-center">
            <div className="bg-gray-900 p-4 border-2 border-gray-700 inline-block transform -rotate-1"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <p className="text-gray-400 font-bold">{t.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;