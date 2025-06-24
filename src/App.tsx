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
  Sparkles,
  Crown,
  Diamond
} from 'lucide-react';
import { translations, Translation } from './translations';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const languages = [
    { 
      name: 'Español', 
      code: 'ES', 
      color: 'from-blue-600 via-blue-700 to-blue-900',
      bgColor: 'bg-gradient-to-br from-blue-50/80 to-blue-100/60',
      borderColor: 'border-blue-600',
      description: 'spanishDescription',
      accent: 'text-blue-700'
    },
    { 
      name: 'Français', 
      code: 'FR', 
      color: 'from-purple-600 via-purple-700 to-blue-800',
      bgColor: 'bg-gradient-to-br from-purple-50/80 to-blue-50/60',
      borderColor: 'border-purple-600',
      description: 'frenchDescription',
      accent: 'text-purple-700'
    },
    { 
      name: 'Português', 
      code: 'PT', 
      color: 'from-emerald-600 via-green-700 to-green-900',
      bgColor: 'bg-gradient-to-br from-emerald-50/80 to-green-100/60',
      borderColor: 'border-emerald-600',
      description: 'portugueseDescription',
      accent: 'text-emerald-700'
    },
    { 
      name: 'Italiano', 
      code: 'IT', 
      color: 'from-green-700 via-green-800 to-gray-900',
      bgColor: 'bg-gradient-to-br from-green-50/80 to-gray-100/60',
      borderColor: 'border-green-700',
      description: 'italianDescription',
      accent: 'text-green-700'
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
      color: 'from-amber-500 via-yellow-600 to-orange-600',
      bgColor: 'bg-gradient-to-br from-amber-50/90 to-orange-50/70',
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500'
    },
    {
      icon: Target,
      title: 'contrastiveMethodTitle',
      description: 'contrastiveMethodDescription',
      color: 'from-blue-600 via-indigo-600 to-purple-700',
      bgColor: 'bg-gradient-to-br from-blue-50/90 to-purple-50/70',
      iconBg: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'activeCommunityTitle',
      description: 'activeCommunityDescription',
      color: 'from-emerald-600 via-green-600 to-teal-700',
      bgColor: 'bg-gradient-to-br from-emerald-50/90 to-teal-50/70',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    {
      icon: Award,
      title: 'certificationTitle',
      description: 'certificationDescription',
      color: 'from-purple-600 via-violet-600 to-indigo-700',
      bgColor: 'bg-gradient-to-br from-purple-50/90 to-indigo-50/70',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    }
  ];

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % languages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 via-slate-700 via-emerald-800 to-black relative overflow-hidden">
      {/* Luxury animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating luxury particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-gradient-to-r from-gold-400 to-amber-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-1/3 w-1 h-1 bg-gradient-to-r from-blue-300 to-cyan-200 rounded-full animate-pulse delay-1000 opacity-70"></div>
        <div className="absolute top-60 left-1/2 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full animate-pulse delay-500 opacity-50"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full animate-pulse delay-700 opacity-60"></div>
        
        {/* Luxury geometric elements */}
        <div className="absolute top-32 right-20 w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-0.5 h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-pulse delay-1000"></div>
        
        {/* Floating orbs with glassmorphism */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full backdrop-blur-sm border border-white/10 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full backdrop-blur-sm border border-white/10 animate-pulse delay-500"></div>
      </div>

      {/* Premium Navigation */}
      <nav className="relative bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-sm group-hover:scale-110 transition-all duration-500">
                  <Crown className="w-7 h-7 text-white drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-emerald-500 rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-500"></div>
              </div>
              <div className="relative">
                <span className="text-3xl font-black text-white tracking-wider">
                  dialectio
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">.xyz</span>
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 opacity-60"></div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#idiomas" className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 relative group">
                {t.languages}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#nosotros" className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 relative group">
                {t.about}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#metodo" className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 relative group">
                {t.method}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a href="#comunidad" className="text-white/90 hover:text-white transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 relative group">
                {t.community}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              
              {/* Premium Language Selector */}
              <div className="flex items-center space-x-2 border-l border-white/20 pl-8">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`relative px-4 py-2 transition-all duration-500 font-bold text-sm tracking-wider overflow-hidden group ${
                      currentLang === lang.code
                        ? 'text-white scale-110'
                        : 'text-white/70 hover:text-white hover:scale-105'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-emerald-500 transition-all duration-500 ${
                      currentLang === lang.code ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                    }`}></div>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"></div>
                    <span className="relative z-10">{lang.name}</span>
                    {currentLang === lang.code && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <button className="relative px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-bold text-lg tracking-wide rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span className="relative z-10">{t.start}</span>
                <Sparkles className="inline-block w-5 h-5 ml-2 relative z-10" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-xl border border-white/10 rounded-b-2xl shadow-2xl">
              <div className="px-6 py-6 space-y-6">
                <a href="#idiomas" className="block text-white/90 hover:text-white py-3 font-semibold text-lg">{t.languages}</a>
                <a href="#nosotros" className="block text-white/90 hover:text-white py-3 font-semibold text-lg">{t.about}</a>
                <a href="#metodo" className="block text-white/90 hover:text-white py-3 font-semibold text-lg">{t.method}</a>
                <a href="#comunidad" className="block text-white/90 hover:text-white py-3 font-semibold text-lg">{t.community}</a>
                
                <div className="border-t border-white/20 pt-6">
                  <p className="text-white/70 font-semibold mb-4">Idioma:</p>
                  <div className="flex flex-wrap gap-3">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className={`px-4 py-2 transition-all duration-300 font-bold text-sm rounded-lg border ${
                          currentLang === lang.code
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-white/30'
                            : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white px-6 py-4 font-bold text-lg rounded-xl shadow-xl">
                  {t.start}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Luxury Hero Section */}
      <section 
        className="relative overflow-hidden py-24 lg:py-32 min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-blue-900/40 to-slate-800/70"></div>
        
        {/* Luxury floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent animate-pulse"></div>
          <div className="absolute top-40 right-20 w-0.5 h-32 bg-gradient-to-b from-transparent via-blue-400/60 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full backdrop-blur-sm border border-white/10 animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full backdrop-blur-sm border border-white/10 animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
                <Diamond className="w-5 h-5 text-gold-400" />
                <span className="text-white/90 font-semibold tracking-wide">Experiencia Premium</span>
                <Sparkles className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-12 tracking-tight leading-none">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                {t.heroTitle}
              </span>
              <span className="block text-white/95 drop-shadow-2xl">
                {t.heroSubtitle}
              </span>
            </h1>
            
            <div className="relative max-w-5xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-3xl"></div>
                <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed tracking-wide relative z-10">
                  {t.heroDescription}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-bold text-xl tracking-wide rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="flex items-center space-x-3 relative z-10">
                  <span>{t.startJourney}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button className="group relative px-12 py-5 bg-white/10 backdrop-blur-xl text-white font-bold text-xl tracking-wide rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <span className="relative z-10">{t.viewDemo}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Language Showcase */}
      <section id="idiomas" className="py-24 bg-gradient-to-b from-slate-800/50 to-slate-700/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <Languages className="w-5 h-5 text-blue-400" />
              <span className="text-white/90 font-semibold tracking-wide">Familia Lingüística</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              {t.languagesSectionTitle}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                <p className="text-xl text-white/90 font-medium leading-relaxed">
                  {t.languagesSectionSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {languages.map((language, index) => (
              <div
                key={language.code}
                className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-105 ${
                  activeLanguage === index ? 'scale-110 z-10' : ''
                }`}
                onMouseEnter={() => setActiveLanguage(index)}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${language.color} rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-500`}></div>
                <div className={`relative ${language.bgColor} backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl h-full`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${language.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl border border-white/30 group-hover:scale-110 transition-all duration-500`}>
                      <span className="text-white font-black text-2xl tracking-wider drop-shadow-lg">{language.code}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    </div>
                    
                    <h3 className={`text-2xl font-black mb-4 ${language.accent} tracking-wide`}>
                      {language.name}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {t[language.description as keyof Translation] as string}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium About Section */}
      <section id="nosotros" className="py-24 bg-gradient-to-b from-slate-700/50 to-emerald-900/30 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-emerald-900/20 to-slate-800/30"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <Heart className="w-5 h-5 text-emerald-400" />
              <span className="text-white/90 font-semibold tracking-wide">Nuestra Esencia</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              {t.aboutTitle}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                <p className="text-xl text-white/90 font-medium leading-relaxed">
                  {t.aboutSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              {[t.aboutDescription1, t.aboutDescription2, t.aboutDescription3].map((description, index) => (
                <div key={index} className="group">
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                    <p className="text-lg text-white/90 leading-relaxed font-medium relative z-10">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                
                <div className="flex items-center space-x-6 mb-8 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
                    <Heart className="w-8 h-8 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-wide">Pasión por las lenguas</h3>
                    <p className="text-white/80 font-medium">Conectando culturas a través del idioma</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="text-center p-6 bg-emerald-500/20 backdrop-blur-sm rounded-2xl border border-emerald-400/30">
                    <div className="text-4xl font-black text-emerald-400 mb-2">500M+</div>
                    <div className="text-sm text-white/80 font-medium">Hablantes conectados</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/20 backdrop-blur-sm rounded-2xl border border-blue-400/30">
                    <div className="text-4xl font-black text-blue-400 mb-2">4</div>
                    <div className="text-sm text-white/80 font-medium">Lenguas hermanas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: t.ourStoryTitle, description: t.ourStoryDescription, color: 'from-blue-500 to-purple-600' },
              { icon: Target, title: t.ourMissionTitle, description: t.ourMissionDescription, color: 'from-purple-500 to-pink-600' },
              { icon: Eye, title: t.ourVisionTitle, description: t.ourVisionDescription, color: 'from-emerald-500 to-teal-600' }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-500`}></div>
                <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl text-center h-full group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/30 relative z-10`}>
                    <item.icon className="w-10 h-10 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-4 tracking-wide relative z-10">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed font-medium relative z-10">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="metodo" className="py-24 bg-gradient-to-b from-emerald-900/30 to-slate-900/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-slate-800/20 to-emerald-900/20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-white/90 font-semibold tracking-wide">Metodología Exclusiva</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              {t.methodTitle}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                <p className="text-xl text-white/90 font-medium leading-relaxed">
                  {t.methodSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-500`}></div>
                <div className={`relative ${feature.bgColor} backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 h-full`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                  
                  <div className="flex items-start space-x-8 relative z-10">
                    <div className={`${feature.iconBg} p-5 rounded-2xl shadow-2xl border border-white/30 group-hover:scale-110 transition-all duration-500`}>
                      <feature.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-wide">
                        {t[feature.title as keyof Translation] as string}
                      </h3>
                      <p className="text-gray-800 leading-relaxed font-medium text-lg">
                        {t[feature.description as keyof Translation] as string}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-black/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-slate-800/20 to-emerald-900/20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '80%', title: t.fasterStat, description: t.fasterDescription, color: 'from-emerald-400 to-teal-500' },
              { number: '4', title: t.languagesStat, description: t.languagesDescription, color: 'from-blue-400 to-purple-500' },
              { number: '10k+', title: t.studentsStat, description: t.studentsDescription, color: 'from-purple-400 to-pink-500' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-500`}></div>
                <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4 tracking-tight`}>
                      {stat.number}
                    </div>
                    <p className="text-2xl font-black text-white mb-4 tracking-wide">{stat.title}</p>
                    <p className="text-white/80 font-medium leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-slate-800/20 to-emerald-600/20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <Crown className="w-5 h-5 text-gold-400" />
              <span className="text-white/90 font-semibold tracking-wide">Únete a la Elite</span>
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            {t.ctaTitle}
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
              <p className="text-xl text-white/90 font-medium leading-relaxed">
                {t.ctaDescription}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-12 py-5 bg-white text-emerald-900 font-black text-xl tracking-wide rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 group-hover:from-gray-100 group-hover:to-white transition-all duration-500"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <span>{t.createAccount}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            <button className="group relative px-12 py-5 bg-white/10 backdrop-blur-xl text-white font-black text-xl tracking-wide rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <span className="relative z-10">{t.learnMore}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-black text-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-slate-800/10 to-emerald-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl border border-white/20">
                  <Crown className="w-7 h-7 text-white drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                </div>
                <span className="text-3xl font-black tracking-wider">
                  dialectio
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">.xyz</span>
                </span>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 mb-8">
                <p className="text-white/80 font-medium leading-relaxed">
                  {t.footerDescription}
                </p>
              </div>
              
              <div className="flex space-x-4">
                {[Globe, BookOpen, Users].map((Icon, index) => (
                  <div key={index} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-emerald-600/50 transition-all duration-300 cursor-pointer border border-white/20 group hover:scale-110">
                    <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-black mb-6 tracking-wide text-white">{t.languages}</h3>
              <ul className="space-y-4 text-white/70">
                {['Español', 'Français', 'Português', 'Italiano'].map((lang, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-all duration-300 font-medium hover:translate-x-2 inline-block">
                      {lang}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-black mb-6 tracking-wide text-white">{t.resources}</h3>
              <ul className="space-y-4 text-white/70">
                {[t.blog, t.help, t.community, t.contact].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-white transition-all duration-300 font-medium hover:translate-x-2 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 inline-block">
              <p className="text-white/70 font-medium">{t.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;