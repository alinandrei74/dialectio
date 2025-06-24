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
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-blue-300 via-gray-200 via-green-200 to-black relative overflow-hidden">
      {/* Suprematist geometric background elements - straight and smaller */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue/purple elements in upper section */}
        <div className="absolute top-20 -right-20 w-64 h-32 bg-gradient-to-br from-blue-600 to-blue-800 opacity-15 shadow-lg"></div>
        <div className="absolute top-10 left-1/4 w-24 h-4 bg-gradient-to-r from-purple-600 to-purple-800 opacity-20 shadow-md"></div>
        
        {/* Neutral elements in middle */}
        <div className="absolute top-1/2 left-10 w-1 h-48 bg-gradient-to-b from-gray-700 to-gray-900 opacity-25 shadow-sm"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 opacity-20 shadow-md"></div>
        
        {/* Green elements in lower section */}
        <div className="absolute bottom-40 left-1/3 w-32 h-4 bg-gradient-to-r from-green-700 to-green-900 opacity-25 shadow-md"></div>
        <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-gradient-to-br from-green-800 to-black opacity-30 shadow-lg"></div>
        
        {/* Black elements throughout */}
        <div className="absolute top-60 left-1/3 w-6 h-6 bg-black opacity-40 shadow-sm"></div>
        <div className="absolute bottom-80 left-1/4 w-4 h-4 bg-black opacity-50 shadow-sm"></div>
        <div className="absolute top-80 right-1/3 w-2 h-24 bg-black opacity-35 shadow-sm"></div>
        <div className="absolute bottom-60 right-10 w-1 h-32 bg-black opacity-30 shadow-sm"></div>
      </div>

      {/* Navigation - straight and compact */}
      <nav className="relative bg-blue-50/95 backdrop-blur-md shadow-xl sticky top-0 z-40 border-b-3 border-blue-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border-2 border-black shadow-lg">
                <Languages className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                dialectio.xyz
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#idiomas" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-base">{t.languages}</a>
              <a href="#nosotros" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-base">{t.about}</a>
              <a href="#metodo" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-base">{t.method}</a>
              <a href="#comunidad" className="text-gray-900 hover:text-blue-700 transition-colors font-bold text-base">{t.community}</a>
              
              {/* Language Selector */}
              <div className="flex items-center space-x-2 border-l-2 border-blue-300 pl-4">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`px-3 py-2 transition-all duration-300 font-black border-2 text-sm shadow-md ${
                      currentLang === lang.code
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-black scale-105'
                        : 'hover:bg-blue-200 text-gray-900 border-blue-400 hover:border-black'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-black text-base border-2 border-black shadow-lg hover:shadow-xl">
                {t.start}
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-200 border-2 border-black shadow-md transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-50/98 backdrop-blur-md shadow-xl border-3 border-black border-t-0">
              <div className="px-4 py-4 space-y-3">
                <a href="#idiomas" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base">{t.languages}</a>
                <a href="#nosotros" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base">{t.about}</a>
                <a href="#metodo" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base">{t.method}</a>
                <a href="#comunidad" className="block text-gray-900 hover:text-blue-700 py-2 font-bold text-base">{t.community}</a>
                
                {/* Mobile Language Selector */}
                <div className="border-t-2 border-blue-300 pt-3">
                  <p className="text-gray-700 font-bold mb-2">Idioma:</p>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className={`px-3 py-2 transition-all duration-300 font-black border-2 text-sm shadow-md ${
                          currentLang === lang.code
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-black'
                            : 'hover:bg-blue-200 text-gray-900 border-blue-400'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 font-black text-base border-2 border-black mt-3 shadow-lg">
                  {t.start}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - straight and compact */}
      <section 
        className="relative overflow-hidden py-16 lg:py-24 min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-blue-700/60"></div>
        
        {/* Geometric overlays - straight and smaller */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-24 h-2 bg-white/40 opacity-40 animate-pulse shadow-md"></div>
          <div className="absolute top-40 right-20 w-2 h-24 bg-blue-300/50 opacity-50 animate-pulse delay-1000 shadow-sm"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-white/35 opacity-35 animate-pulse delay-500 shadow-lg"></div>
          <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-blue-200/45 opacity-45 animate-pulse delay-700 shadow-md"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-32 bg-white/30 opacity-30 animate-pulse delay-300 shadow-sm"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-1 bg-blue-100/40 opacity-40 animate-pulse delay-900 shadow-sm"></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/50 opacity-50 animate-pulse delay-1200 shadow-sm"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 drop-shadow-2xl">
              {t.heroTitle}
              <span className="text-blue-200 block drop-shadow-2xl">
                {t.heroSubtitle}
              </span>
            </h1>
            <div className="bg-white/95 backdrop-blur-md p-6 max-w-4xl mx-auto mb-8 border-3 border-black shadow-2xl">
              <p className="text-lg md:text-xl text-gray-900 font-bold leading-relaxed">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-3 border-black shadow-xl hover:shadow-2xl">
                <span>{t.startJourney}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-3 border-white text-white px-8 py-3 hover:bg-white/30 transition-all duration-300 text-lg font-black bg-white/20 backdrop-blur-md shadow-xl hover:shadow-2xl">
                {t.viewDemo}
              </button>
            </div>
          </div>
        </div>

        {/* Floating geometric elements - straight and smaller */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/40 animate-pulse shadow-sm"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-200/50 animate-pulse delay-1000 shadow-sm"></div>
          <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-white/30 animate-pulse delay-500 shadow-md"></div>
        </div>
      </section>

      {/* Language Showcase - straight and compact */}
      <section id="idiomas" className="py-16 bg-gray-100/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 opacity-35 shadow-sm"></div>
          <div className="absolute bottom-10 right-1/4 w-1 h-24 bg-black opacity-35 shadow-sm"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t.languagesSectionTitle}
            </h2>
            <div className="bg-white/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-3 border-black shadow-xl">
              <p className="text-lg text-gray-900 font-bold">
                {t.languagesSectionSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((language, index) => (
              <div
                key={language.code}
                className={`relative p-6 cursor-pointer transition-all duration-500 border-3 border-black shadow-lg ${
                  activeLanguage === index 
                    ? 'scale-105 shadow-xl' 
                    : 'hover:scale-102 hover:shadow-xl'
                } ${language.bgColor} backdrop-blur-md`}
                onMouseEnter={() => setActiveLanguage(index)}
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${language.color} flex items-center justify-center mb-4 mx-auto border-2 border-black shadow-lg`}>
                    <span className="text-white font-black text-lg">{language.code}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3 text-center">{language.name}</h3>
                  <p className="text-gray-800 text-center leading-relaxed font-bold text-sm">
                    {t[language.description as keyof Translation] as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - straight and compact */}
      <section id="nosotros" className="py-16 bg-gradient-to-b from-gray-200/90 to-green-100/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 opacity-25 shadow-lg"></div>
          <div className="absolute bottom-20 left-10 w-2 h-32 bg-black opacity-25 shadow-sm"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t.aboutTitle}
            </h2>
            <div className="bg-white/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-3 border-black shadow-xl">
              <p className="text-lg text-gray-900 font-bold">
                {t.aboutSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-md p-6 border-3 border-black shadow-lg">
                <p className="text-base text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription1}
                </p>
              </div>
              <div className="bg-green-50/90 backdrop-blur-md p-6 border-3 border-black shadow-lg">
                <p className="text-base text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription2}
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-6 border-3 border-black shadow-lg">
                <p className="text-base text-gray-900 leading-relaxed font-bold">
                  {t.aboutDescription3}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-md p-6 shadow-xl border-3 border-black">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center border-2 border-black shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Pasión por las lenguas</h3>
                    <p className="text-gray-700 font-bold text-sm">Conectando culturas a través del idioma</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 border-2 border-black shadow-md">
                    <div className="text-2xl font-black text-green-700">500M+</div>
                    <div className="text-xs text-gray-700 font-bold">Hablantes conectados</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 border-2 border-black shadow-md">
                    <div className="text-2xl font-black text-gray-900">4</div>
                    <div className="text-xs text-gray-700 font-bold">Lenguas hermanas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur-md p-6 shadow-lg text-center border-3 border-black">
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{t.ourStoryTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourStoryDescription}</p>
            </div>

            <div className="bg-green-50/90 backdrop-blur-md p-6 shadow-lg text-center border-3 border-black">
              <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{t.ourMissionTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourMissionDescription}</p>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-6 shadow-lg text-center border-3 border-black">
              <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-black flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{t.ourVisionTitle}</h3>
              <p className="text-gray-700 leading-relaxed font-bold text-sm">{t.ourVisionDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - straight and compact */}
      <section id="metodo" className="py-16 bg-green-100/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-16 h-1 bg-gradient-to-r from-green-800 to-black opacity-35 shadow-sm"></div>
          <div className="absolute bottom-1/4 right-10 w-1 h-16 bg-black opacity-35 shadow-sm"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t.methodTitle}
            </h2>
            <div className="bg-white/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-3 border-black shadow-xl">
              <p className="text-lg text-gray-900 font-bold">
                {t.methodSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} backdrop-blur-md p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-3 border-black hover:scale-102`}>
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${feature.color} p-3 border-2 border-black shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-3">
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

      {/* Stats Section - straight and compact */}
      <section className="py-16 bg-gradient-to-b from-green-200/90 to-gray-800/90 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/3 w-8 h-8 bg-gradient-to-br from-green-800 to-black opacity-25 shadow-lg"></div>
          <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-black opacity-35 shadow-md"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-green-50/95 backdrop-blur-md p-6 border-3 border-black shadow-xl">
              <div className="text-4xl md:text-5xl font-black text-green-700 mb-3">
                80%
              </div>
              <p className="text-lg font-black text-gray-900 mb-2">{t.fasterStat}</p>
              <p className="text-gray-700 font-bold text-sm">{t.fasterDescription}</p>
            </div>
            <div className="bg-gray-100/95 backdrop-blur-md p-6 border-3 border-black shadow-xl">
              <div className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                4
              </div>
              <p className="text-lg font-black text-gray-900 mb-2">{t.languagesStat}</p>
              <p className="text-gray-700 font-bold text-sm">{t.languagesDescription}</p>
            </div>
            <div className="bg-green-50/95 backdrop-blur-md p-6 border-3 border-black shadow-xl">
              <div className="text-4xl md:text-5xl font-black text-green-800 mb-3">
                10k+
              </div>
              <p className="text-lg font-black text-gray-900 mb-2">{t.studentsStat}</p>
              <p className="text-gray-700 font-bold text-sm">{t.studentsDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - straight and compact */}
      <section className="py-16 bg-gradient-to-br from-green-800 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-2 bg-black/40 opacity-40 shadow-sm"></div>
          <div className="absolute bottom-10 right-10 w-2 h-24 bg-black/40 opacity-40 shadow-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-black/30 opacity-30 shadow-md"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            {t.ctaTitle}
          </h2>
          <div className="bg-white/25 backdrop-blur-md p-6 max-w-3xl mx-auto mb-8 border-3 border-black shadow-xl">
            <p className="text-lg text-white font-bold">
              {t.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-green-800 px-8 py-3 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 text-lg font-black border-3 border-black shadow-xl hover:shadow-2xl">
              <span>{t.createAccount}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-3 border-white text-white px-8 py-3 hover:bg-white hover:text-green-800 transition-all duration-300 text-lg font-black shadow-xl hover:shadow-2xl">
              {t.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Footer - straight and compact */}
      <footer className="bg-black text-white py-12 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-5 left-1/4 w-6 h-6 bg-gradient-to-br from-green-700 to-green-900 opacity-35 shadow-md"></div>
          <div className="absolute bottom-5 right-1/4 w-2 h-12 bg-gradient-to-b from-green-800 to-black opacity-35 shadow-sm"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center border-2 border-white shadow-lg">
                  <Languages className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black">dialectio.xyz</span>
              </div>
              <div className="bg-gray-900/90 backdrop-blur-md p-6 mb-6 border-2 border-gray-700 shadow-lg">
                <p className="text-gray-300 font-bold text-sm">
                  {t.footerDescription}
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer border-2 border-gray-600 shadow-md hover:shadow-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer border-2 border-gray-600 shadow-md hover:shadow-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-all duration-300 cursor-pointer border-2 border-gray-600 shadow-md hover:shadow-lg">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-black mb-4">{t.languages}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Español</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Français</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Português</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">Italiano</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-black mb-4">{t.resources}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.blog}</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.help}</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.community}</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 font-bold text-sm">{t.contact}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-3 border-gray-700 mt-8 pt-6 text-center">
            <div className="bg-gray-900/90 backdrop-blur-md p-4 border-2 border-gray-700 inline-block shadow-lg">
              <p className="text-gray-400 font-bold text-sm">{t.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;