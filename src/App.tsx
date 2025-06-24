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
  Eye,
  Crown,
  Shield,
  Gem
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
      color: 'from-slate-700 via-slate-800 to-slate-900',
      bgColor: 'bg-gradient-to-br from-slate-50 to-stone-100',
      borderColor: 'border-slate-800',
      description: 'spanishDescription'
    },
    { 
      name: 'Français', 
      code: 'FR', 
      color: 'from-slate-600 via-slate-700 to-black',
      bgColor: 'bg-gradient-to-br from-slate-50 to-zinc-100',
      borderColor: 'border-slate-700',
      description: 'frenchDescription'
    },
    { 
      name: 'Português', 
      code: 'PT', 
      color: 'from-emerald-800 via-slate-800 to-black',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-slate-100',
      borderColor: 'border-emerald-800',
      description: 'portugueseDescription'
    },
    { 
      name: 'Italiano', 
      code: 'IT', 
      color: 'from-emerald-900 via-slate-900 to-black',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-stone-100',
      borderColor: 'border-emerald-900',
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
      icon: Crown,
      title: 'acceleratedLearningTitle',
      description: 'acceleratedLearningDescription',
      color: 'from-amber-600 via-yellow-700 to-amber-800',
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50'
    },
    {
      icon: Shield,
      title: 'contrastiveMethodTitle',
      description: 'contrastiveMethodDescription',
      color: 'from-slate-700 via-slate-800 to-black',
      bgColor: 'bg-gradient-to-br from-slate-50 to-stone-100'
    },
    {
      icon: Gem,
      title: 'activeCommunityTitle',
      description: 'activeCommunityDescription',
      color: 'from-emerald-700 via-emerald-800 to-slate-900',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-slate-100'
    },
    {
      icon: Award,
      title: 'certificationTitle',
      description: 'certificationDescription',
      color: 'from-slate-800 via-slate-900 to-black',
      bgColor: 'bg-gradient-to-br from-slate-50 to-zinc-100'
    }
  ];

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % languages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 via-stone-100 via-slate-200 via-emerald-100 to-slate-900 relative overflow-hidden">
      {/* Elegant geometric background elements inspired by luxury design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Upper section - refined blues and grays */}
        <div className="absolute top-32 -right-24 w-80 h-2 bg-slate-700 opacity-15 shadow-2xl"></div>
        <div className="absolute top-20 left-1/3 w-24 h-24 border-4 border-slate-600 opacity-20 transform rotate-45"></div>
        
        {/* Middle section - neutral luxury tones */}
        <div className="absolute top-1/2 left-16 w-1 h-64 bg-slate-800 opacity-30 shadow-lg"></div>
        <div className="absolute top-1/2 right-32 w-32 h-32 border-2 border-stone-600 opacity-25 transform rotate-45"></div>
        
        {/* Lower section - deep emerald and black */}
        <div className="absolute bottom-48 left-1/4 w-64 h-4 bg-emerald-800 opacity-30 shadow-xl"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-emerald-900 opacity-35 transform rotate-45 shadow-2xl"></div>
        
        {/* Accent elements */}
        <div className="absolute top-72 left-1/2 w-8 h-8 bg-amber-600 opacity-40 transform rotate-45 shadow-lg"></div>
        <div className="absolute bottom-96 left-1/5 w-6 h-6 bg-slate-900 opacity-50 shadow-xl"></div>
        <div className="absolute top-96 right-1/4 w-2 h-48 bg-slate-900 opacity-40 shadow-lg"></div>
      </div>

      {/* Navigation - Sophisticated header */}
      <nav className="relative bg-white/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-xl border border-slate-300">
                <Languages className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-light text-slate-900 tracking-wider">
                  dialectio
                </span>
                <span className="text-xs font-medium text-slate-600 tracking-[0.2em] uppercase">
                  .xyz
                </span>
              </div>
            </div>

            {/* Desktop Navigation with refined styling */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#idiomas" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-lg tracking-wide hover:tracking-wider">{t.languages}</a>
              <a href="#nosotros" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-lg tracking-wide hover:tracking-wider">{t.about}</a>
              <a href="#metodo" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-lg tracking-wide hover:tracking-wider">{t.method}</a>
              <a href="#comunidad" className="text-slate-700 hover:text-slate-900 transition-all duration-300 font-medium text-lg tracking-wide hover:tracking-wider">{t.community}</a>
              
              {/* Refined Language Selector */}
              <div className="flex items-center space-x-1 border-l border-slate-300 pl-8">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`px-4 py-2 transition-all duration-500 font-medium text-sm tracking-wider border shadow-sm ${
                      currentLang === lang.code
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                        : 'hover:bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400 hover:shadow-md'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
              <button className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-3 hover:from-slate-700 hover:to-slate-800 transition-all duration-300 font-medium text-lg tracking-wide shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 border border-slate-700">
                {t.start}
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 hover:bg-slate-100 transition-colors border border-slate-300 shadow-md"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 right-0 bg-white shadow-2xl border-t border-slate-200">
              <div className="px-6 py-6 space-y-6">
                <a href="#idiomas" className="block text-slate-700 hover:text-slate-900 py-3 font-medium text-lg tracking-wide">{t.languages}</a>
                <a href="#nosotros" className="block text-slate-700 hover:text-slate-900 py-3 font-medium text-lg tracking-wide">{t.about}</a>
                <a href="#metodo" className="block text-slate-700 hover:text-slate-900 py-3 font-medium text-lg tracking-wide">{t.method}</a>
                <a href="#comunidad" className="block text-slate-700 hover:text-slate-900 py-3 font-medium text-lg tracking-wide">{t.community}</a>
                
                {/* Mobile Language Selector */}
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-slate-600 font-medium mb-4 tracking-wide">Idioma:</p>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className={`px-4 py-2 transition-all duration-300 font-medium text-sm tracking-wider border ${
                          currentLang === lang.code
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'hover:bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 font-medium text-lg tracking-wide shadow-xl mt-6">
                  {t.start}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Luxury aesthetic with sea background */}
      <section 
        className="relative overflow-hidden py-24 lg:py-40 min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-900/70"></div>
        
        {/* Refined geometric overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-48 h-1 bg-white/30 shadow-2xl"></div>
          <div className="absolute top-48 right-24 w-1 h-48 bg-slate-300/40 shadow-xl"></div>
          <div className="absolute bottom-48 left-1/3 w-24 h-24 border border-white/20 transform rotate-45 shadow-2xl"></div>
          <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-white/15 shadow-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-64 bg-white/25 shadow-lg"></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-1 bg-slate-200/30 shadow-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-12 tracking-wider leading-none">
              <span className="block">{t.heroTitle}</span>
              <span className="block text-slate-300 font-extralight italic tracking-[0.1em]">
                {t.heroSubtitle}
              </span>
            </h1>
            <div className="bg-white/95 backdrop-blur-md p-10 max-w-5xl mx-auto mb-12 shadow-2xl border border-slate-200">
              <p className="text-xl md:text-2xl text-slate-800 font-light leading-relaxed tracking-wide">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-12 py-5 hover:from-slate-700 hover:to-slate-800 transition-all duration-500 flex items-center space-x-4 text-xl font-light tracking-wider shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 border border-slate-700">
                <span>{t.startJourney}</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="border-2 border-white text-white px-12 py-5 hover:bg-white/10 transition-all duration-500 text-xl font-light tracking-wider bg-white/5 backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
                {t.viewDemo}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Language Showcase - Refined neutral section */}
      <section id="idiomas" className="py-24 bg-gradient-to-b from-white to-slate-50 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-1/4 w-48 h-1 bg-slate-400 opacity-30 shadow-lg"></div>
          <div className="absolute bottom-16 right-1/4 w-1 h-48 bg-slate-600 opacity-30 shadow-lg"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 tracking-wider">
              {t.languagesSectionTitle}
            </h2>
            <div className="bg-white p-8 max-w-4xl mx-auto shadow-xl border border-slate-200">
              <p className="text-xl text-slate-700 font-light tracking-wide">
                {t.languagesSectionSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {languages.map((language, index) => (
              <div
                key={language.code}
                className={`relative p-10 cursor-pointer transform transition-all duration-700 shadow-xl hover:shadow-2xl border border-slate-200 ${
                  activeLanguage === index 
                    ? 'scale-105 -translate-y-2' 
                    : 'hover:scale-102 hover:-translate-y-1'
                } ${language.bgColor} backdrop-blur-sm`}
                onMouseEnter={() => setActiveLanguage(index)}
              >
                <div className="relative z-10">
                  <div className={`w-24 h-24 bg-gradient-to-br ${language.color} flex items-center justify-center mb-8 mx-auto shadow-xl border border-slate-300`}>
                    <span className="text-white font-light text-2xl tracking-wider">{language.code}</span>
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-6 text-center tracking-wider">{language.name}</h3>
                  <p className="text-slate-700 text-center leading-relaxed font-light tracking-wide">
                    {t[language.description as keyof Translation] as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Transitioning to deeper tones */}
      <section id="nosotros" className="py-24 bg-gradient-to-b from-slate-50 to-emerald-50 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-24 right-16 w-20 h-20 border border-emerald-700 opacity-20 transform rotate-45 shadow-lg"></div>
          <div className="absolute bottom-24 left-16 w-2 h-64 bg-slate-800 opacity-20 shadow-lg"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 tracking-wider">
              {t.aboutTitle}
            </h2>
            <div className="bg-white p-8 max-w-4xl mx-auto shadow-xl border border-slate-200">
              <p className="text-xl text-slate-700 font-light tracking-wide">
                {t.aboutSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-10">
              <div className="bg-white p-8 shadow-xl border border-slate-200">
                <p className="text-lg text-slate-700 leading-relaxed font-light tracking-wide">
                  {t.aboutDescription1}
                </p>
              </div>
              <div className="bg-emerald-50 p-8 shadow-xl border border-emerald-200">
                <p className="text-lg text-slate-700 leading-relaxed font-light tracking-wide">
                  {t.aboutDescription2}
                </p>
              </div>
              <div className="bg-white p-8 shadow-xl border border-slate-200">
                <p className="text-lg text-slate-700 leading-relaxed font-light tracking-wide">
                  {t.aboutDescription3}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-10 shadow-2xl border border-slate-200">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shadow-xl border border-emerald-300">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-slate-900 tracking-wide">Pasión por las lenguas</h3>
                    <p className="text-slate-600 font-light tracking-wide">Conectando culturas a través del idioma</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-emerald-50 border border-emerald-200 shadow-lg">
                    <div className="text-3xl font-light text-emerald-800 tracking-wider">500M+</div>
                    <div className="text-sm text-slate-600 font-light tracking-wide">Hablantes conectados</div>
                  </div>
                  <div className="text-center p-6 bg-slate-50 border border-slate-200 shadow-lg">
                    <div className="text-3xl font-light text-slate-800 tracking-wider">4</div>
                    <div className="text-sm text-slate-600 font-light tracking-wide">Lenguas hermanas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-10 shadow-xl text-center border border-slate-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center mx-auto mb-8 shadow-xl border border-emerald-300">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-6 tracking-wider">{t.ourStoryTitle}</h3>
              <p className="text-slate-600 leading-relaxed font-light tracking-wide">{t.ourStoryDescription}</p>
            </div>

            <div className="bg-emerald-50 p-10 shadow-xl text-center border border-emerald-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-300">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-6 tracking-wider">{t.ourMissionTitle}</h3>
              <p className="text-slate-600 leading-relaxed font-light tracking-wide">{t.ourMissionDescription}</p>
            </div>

            <div className="bg-white p-10 shadow-xl text-center border border-slate-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-800 to-slate-900 flex items-center justify-center mx-auto mb-8 shadow-xl border border-emerald-300">
                <Eye className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-6 tracking-wider">{t.ourVisionTitle}</h3>
              <p className="text-slate-600 leading-relaxed font-light tracking-wide">{t.ourVisionDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Deeper emerald tones */}
      <section id="metodo" className="py-24 bg-gradient-to-b from-emerald-50 to-emerald-100 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-16 w-32 h-1 bg-emerald-800 opacity-30 shadow-lg"></div>
          <div className="absolute bottom-1/4 right-16 w-1 h-32 bg-slate-800 opacity-30 shadow-lg"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 tracking-wider">
              {t.methodTitle}
            </h2>
            <div className="bg-white p-8 max-w-4xl mx-auto shadow-xl border border-slate-200">
              <p className="text-xl text-slate-700 font-light tracking-wide">
                {t.methodSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:-translate-y-1`}>
                <div className="flex items-start space-x-8">
                  <div className={`bg-gradient-to-r ${feature.color} p-5 shadow-xl border border-slate-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wider">
                      {t[feature.title as keyof Translation] as string}
                    </h3>
                    <p className="text-slate-700 leading-relaxed font-light tracking-wide">
                      {t[feature.description as keyof Translation] as string}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Transitioning to darker tones */}
      <section className="py-24 bg-gradient-to-b from-emerald-100 to-slate-200 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-1/3 w-16 h-16 border border-emerald-800 opacity-20 transform rotate-45 shadow-lg"></div>
          <div className="absolute bottom-16 right-1/3 w-12 h-12 bg-slate-800 opacity-30 shadow-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-12 shadow-2xl border border-slate-200 hover:shadow-3xl transition-shadow duration-500">
              <div className="text-6xl md:text-7xl font-extralight text-emerald-800 mb-6 tracking-wider">
                80%
              </div>
              <p className="text-xl font-light text-slate-900 mb-4 tracking-wide">{t.fasterStat}</p>
              <p className="text-slate-600 font-light tracking-wide">{t.fasterDescription}</p>
            </div>
            <div className="bg-slate-50 p-12 shadow-2xl border border-slate-200 hover:shadow-3xl transition-shadow duration-500">
              <div className="text-6xl md:text-7xl font-extralight text-slate-800 mb-6 tracking-wider">
                4
              </div>
              <p className="text-xl font-light text-slate-900 mb-4 tracking-wide">{t.languagesStat}</p>
              <p className="text-slate-600 font-light tracking-wide">{t.languagesDescription}</p>
            </div>
            <div className="bg-emerald-50 p-12 shadow-2xl border border-emerald-200 hover:shadow-3xl transition-shadow duration-500">
              <div className="text-6xl md:text-7xl font-extralight text-emerald-800 mb-6 tracking-wider">
                10k+
              </div>
              <p className="text-xl font-light text-slate-900 mb-4 tracking-wide">{t.studentsStat}</p>
              <p className="text-slate-600 font-light tracking-wide">{t.studentsDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Deep emerald luxury */}
      <section className="py-24 bg-gradient-to-b from-emerald-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-16 w-48 h-2 bg-slate-900 opacity-30 shadow-2xl"></div>
          <div className="absolute bottom-16 right-16 w-2 h-48 bg-slate-900 opacity-30 shadow-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-slate-800 opacity-20 transform rotate-45 shadow-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-10 tracking-wider">
            {t.ctaTitle}
          </h2>
          <div className="bg-white/10 backdrop-blur-md p-8 max-w-4xl mx-auto mb-12 shadow-2xl border border-white/20">
            <p className="text-xl text-white font-light tracking-wide">
              {t.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="bg-white text-emerald-900 px-12 py-5 hover:bg-slate-50 transition-all duration-500 flex items-center space-x-4 text-xl font-light tracking-wider shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 border border-slate-200">
              <span>{t.createAccount}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="border-2 border-white text-white px-12 py-5 hover:bg-white hover:text-emerald-900 transition-all duration-500 text-xl font-light tracking-wider shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
              {t.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Sophisticated black */}
      <footer className="bg-slate-900 text-white py-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-8 left-1/4 w-12 h-12 bg-emerald-700 opacity-30 transform rotate-45 shadow-xl"></div>
          <div className="absolute bottom-8 right-1/4 w-2 h-24 bg-emerald-800 opacity-30 shadow-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shadow-xl border border-emerald-300">
                  <Languages className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-light tracking-wider">dialectio</span>
                  <span className="text-sm font-light text-slate-400 tracking-[0.2em] uppercase">.xyz</span>
                </div>
              </div>
              <div className="bg-slate-800 p-8 mb-8 shadow-xl border border-slate-700">
                <p className="text-slate-300 font-light tracking-wide leading-relaxed">
                  {t.footerDescription}
                </p>
              </div>
              <div className="flex space-x-6">
                <div className="w-14 h-14 bg-slate-800 flex items-center justify-center hover:bg-emerald-700 transition-all duration-300 cursor-pointer shadow-lg border border-slate-600 hover:border-emerald-600">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="w-14 h-14 bg-slate-800 flex items-center justify-center hover:bg-emerald-700 transition-all duration-300 cursor-pointer shadow-lg border border-slate-600 hover:border-emerald-600">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="w-14 h-14 bg-slate-800 flex items-center justify-center hover:bg-emerald-700 transition-all duration-300 cursor-pointer shadow-lg border border-slate-600 hover:border-emerald-600">
                  <Users className="w-7 h-7" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-light mb-6 tracking-wider">{t.languages}</h3>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">Español</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">Français</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">Português</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">Italiano</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-light mb-6 tracking-wider">{t.resources}</h3>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">{t.blog}</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">{t.help}</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">{t.community}</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light tracking-wide hover:tracking-wider">{t.contact}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <div className="bg-slate-800 p-6 shadow-xl border border-slate-700 inline-block">
              <p className="text-slate-400 font-light tracking-wide">{t.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;