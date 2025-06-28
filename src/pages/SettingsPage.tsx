import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, User, Lock, Mail, Globe, Palette, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLearning } from '../hooks/useLearning';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';
import { supabase } from '../lib/supabase';

function SettingsPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, updateProfile, updatePassword, updateEmail } = useAuth();
  const { refreshProgress } = useLearning();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [activeSection, setActiveSection] = useState<string>('profile');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    initialLanguage: ''
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Email form state
  const [emailData, setEmailData] = useState({
    newEmail: '',
    password: ''
  });
  
  // UI state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<Record<string, string>>({});

  const t: Translation = translations[currentLang];

  const languageOptions = [
    { code: 'es', name: t.spanish, flag: '🇪🇸' },
    { code: 'fr', name: t.french, flag: '🇫🇷' },
    { code: 'pt', name: t.portuguese, flag: '🇵🇹' },
    { code: 'it', name: t.italian, flag: '🇮🇹' },
    { code: 'en', name: t.english, flag: '🇺🇸' }
  ];

  // Load user profile data on mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('username, full_name, initial_language')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error loading profile:', error);
            // Fallback to default values
            setProfileData({
              username: user.email?.split('@')?.[0] || '',
              fullName: user.email?.split('@')?.[0] || '',
              initialLanguage: 'es'
            });
          } else {
            setProfileData({
              username: profile.username || user.email?.split('@')?.[0] || '',
              fullName: profile.full_name || profile.username || '',
              initialLanguage: profile.initial_language || 'es'
            });
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          // Fallback to default values
          setProfileData({
            username: user.email?.split('@')?.[0] || '',
            fullName: user.email?.split('@')?.[0] || '',
            initialLanguage: 'es'
          });
        }
      }
    };

    loadUserProfile();
  }, [user]);

  const clearMessages = (section: string) => {
    setErrors(prev => ({ ...prev, [section]: '' }));
    setSuccess(prev => ({ ...prev, [section]: '' }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, profile: true }));
    clearMessages('profile');

    try {
      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profileData.username.toLowerCase(),
          full_name: profileData.fullName || profileData.username,
          initial_language: profileData.initialLanguage,
          updated_at: new Date().toISOString()
        })
        .eq('id', user!.id);

      if (error) {
        console.error('Error updating profile:', error);
        
        if (error.code === '23505') {
          if (error.message.includes('profiles_username_key')) {
            setErrors(prev => ({ ...prev, profile: 'Username already exists' }));
          } else {
            setErrors(prev => ({ ...prev, profile: t.settingsProfileError }));
          }
        } else {
          setErrors(prev => ({ ...prev, profile: t.settingsProfileError }));
        }
      } else {
        setSuccess(prev => ({ ...prev, profile: t.settingsProfileSuccess }));
        
        // Refresh learning data to update available courses
        if (refreshProgress) {
          await refreshProgress();
        }
        
        // Force a page refresh after a short delay to ensure all data is updated
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrors(prev => ({ ...prev, profile: t.settingsProfileError }));
    }

    setLoading(prev => ({ ...prev, profile: false }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, password: true }));
    clearMessages('password');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors(prev => ({ ...prev, password: t.passwordsDoNotMatch }));
      setLoading(prev => ({ ...prev, password: false }));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrors(prev => ({ ...prev, password: t.passwordTooShort }));
      setLoading(prev => ({ ...prev, password: false }));
      return;
    }

    try {
      await updatePassword(passwordData.newPassword);
      setSuccess(prev => ({ ...prev, password: t.settingsPasswordSuccess }));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setErrors(prev => ({ ...prev, password: t.settingsPasswordError }));
    }

    setLoading(prev => ({ ...prev, password: false }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));
    clearMessages('email');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData.newEmail)) {
      setErrors(prev => ({ ...prev, email: t.emailInvalid }));
      setLoading(prev => ({ ...prev, email: false }));
      return;
    }

    try {
      await updateEmail(emailData.newEmail, emailData.password);
      setSuccess(prev => ({ ...prev, email: t.settingsEmailSuccess }));
      setEmailData({ newEmail: '', password: '' });
    } catch (err) {
      setErrors(prev => ({ ...prev, email: t.settingsEmailError }));
    }

    setLoading(prev => ({ ...prev, email: false }));
  };

if (authLoading) {
   return null; 
 } 
 
 // Una vez cargado: si no hay usuario, redirigimos 
 useEffect(() => { 
   if (!user) { 
     navigate('/'); 
   } 
 }, [user, navigate]);

  const sections = [
    { id: 'profile', name: t.settingsProfileSection, icon: User },
    { id: 'password', name: t.settingsPasswordSection, icon: Lock },
    { id: 'email', name: t.settingsEmailSection, icon: Mail },
    { id: 'preferences', name: t.settingsPreferencesSection, icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-4 bg-white/40 dark:bg-gray-300/30 transform rotate-45 opacity-40 animate-pulse shadow-lg"></div>
        <div className="absolute top-40 left-20 w-4 h-32 bg-blue-300/50 dark:bg-blue-400/40 transform -rotate-30 opacity-50 animate-pulse delay-1000 shadow-md"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-white/35 dark:bg-gray-300/25 transform rotate-45 opacity-35 animate-pulse delay-500 shadow-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-8 h-8 bg-blue-200/45 dark:bg-blue-300/35 transform -rotate-45 opacity-45 animate-pulse delay-700 shadow-lg"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/learning')}
              className="w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100 transform -rotate-45" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl">
                <Languages className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                dialectio.xyz
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector 
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              isMobile={false}
            />
            
            <DarkModeToggle 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              isMobile={false}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            {t.settingsTitle}
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.settingsSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              
              <div className="p-4 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 text-white mx-1 mt-1"
                   style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
                <h2 className="text-lg font-black text-center">
                  {t.settingsNavigation}
                </h2>
              </div>

              <div className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-300 font-bold text-sm border-2 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-lg scale-105'
                          : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 bg-white dark:bg-gray-800'
                      }`}
                      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                    >
                      <section.icon className="w-5 h-5" />
                      <span>{section.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <>
                  <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                       style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                    <h2 className="text-2xl font-black">
                      {t.settingsProfileSection}
                    </h2>
                  </div>

                  <div className="p-8">
                    {errors.profile && (
                      <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                        {errors.profile}
                      </div>
                    )}

                    {success.profile && (
                      <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm flex items-center space-x-3"
                           style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                        <CheckCircle className="w-5 h-5" />
                        <span>{success.profile}</span>
                      </div>
                    )}

                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      {/* Current Info Display */}
                      <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                        <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4">
                          {t.settingsCurrentInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                              {t.emailLabel}
                            </label>
                            <div className="bg-gray-200/50 dark:bg-gray-600/50 border border-gray-300 dark:border-gray-500 p-3 font-bold text-sm">
                              {user.email || 'N/A'}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                              Idioma actual
                            </label>
                            <div className="bg-gray-200/50 dark:bg-gray-600/50 border border-gray-300 dark:border-gray-500 p-3 font-bold text-sm">
                              {languageOptions.find(lang => lang.code === profileData.initialLanguage)?.name || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Editable Fields */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.usernameLabel}
                        </label>
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                          placeholder={t.usernamePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.fullNameLabel}
                        </label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                          placeholder={t.fullNamePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                          {t.initialLanguageLabel}
                        </label>
                        <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md mb-4"
                             style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                          <p className="text-blue-800 dark:text-blue-200 font-bold text-sm">
                            ⚠️ Cambiar tu idioma base actualizará los cursos disponibles y puede afectar tu progreso actual.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {languageOptions.map((lang) => (
                            <button
                              key={lang.code}
                              type="button"
                              onClick={() => setProfileData(prev => ({ ...prev, initialLanguage: lang.code }))}
                              className={`p-4 border-3 transition-all duration-300 font-bold text-sm ${
                                profileData.initialLanguage === lang.code
                                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                                  : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 hover:shadow-lg bg-white dark:bg-gray-800'
                              }`}
                              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{lang.flag}</span>
                                <span>{lang.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading.profile}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                        style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
                      >
                        <Save className="w-5 h-5" />
                        <span>{loading.profile ? t.settingsSaving : t.settingsSaveChanges}</span>
                      </button>
                    </form>
                  </div>
                </>
              )}

              {/* Password Section */}
              {activeSection === 'password' && (
                <>
                  <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white mx-2 mt-2"
                       style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                    <h2 className="text-2xl font-black">
                      {t.settingsPasswordSection}
                    </h2>
                  </div>

                  <div className="p-8">
                    {errors.password && (
                      <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                        {errors.password}
                      </div>
                    )}

                    {success.password && (
                      <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm flex items-center space-x-3"
                           style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                        <CheckCircle className="w-5 h-5" />
                        <span>{success.password}</span>
                      </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.settingsCurrentPassword}
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.settingsNewPassword}
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.confirmPasswordLabel}
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading.password}
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-red-700 hover:to-red-900 dark:hover:from-red-600 dark:hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                        style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
                      >
                        <Lock className="w-5 h-5" />
                        <span>{loading.password ? t.settingsSaving : t.settingsChangePassword}</span>
                      </button>
                    </form>
                  </div>
                </>
              )}

              {/* Email Section */}
              {activeSection === 'email' && (
                <>
                  <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white mx-2 mt-2"
                       style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                    <h2 className="text-2xl font-black">
                      {t.settingsEmailSection}
                    </h2>
                  </div>

                  <div className="p-8">
                    {errors.email && (
                      <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                           style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                        {errors.email}
                      </div>
                    )}

                    {success.email && (
                      <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm flex items-center space-x-3"
                           style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                        <CheckCircle className="w-5 h-5" />
                        <span>{success.email}</span>
                      </div>
                    )}

                    <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-2 border-gray-300 dark:border-gray-500 shadow-md mb-6"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2">
                        {t.settingsCurrentEmail}
                      </h3>
                      <div className="bg-gray-200/50 dark:bg-gray-600/50 border border-gray-300 dark:border-gray-500 p-3 font-bold text-sm">
                        {user.email || 'N/A'}
                      </div>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.settingsNewEmail}
                        </label>
                        <input
                          type="email"
                          value={emailData.newEmail}
                          onChange={(e) => setEmailData(prev => ({ ...prev, newEmail: e.target.value }))}
                          className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                          placeholder="nuevo@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {t.settingsConfirmPassword}
                        </label>
                        <div className="relative">
                          <input
                            type={showEmailPassword ? 'text' : 'password'}
                            value={emailData.password}
                            onChange={(e) => setEmailData(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowEmailPassword(!showEmailPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showEmailPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading.email}
                        className="w-full bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                        style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
                      >
                        <Mail className="w-5 h-5" />
                        <span>{loading.email ? t.settingsSaving : t.settingsChangeEmail}</span>
                      </button>
                    </form>
                  </div>
                </>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <>
                  <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 text-white mx-2 mt-2"
                       style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                    <h2 className="text-2xl font-black">
                      {t.settingsPreferencesSection}
                    </h2>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Language Preference */}
                    <div className="bg-blue-50/90 dark:bg-gray-700/90 p-6 border-3 border-blue-300 dark:border-blue-500 shadow-lg"
                         style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-2 border-black dark:border-gray-300 shadow-lg">
                          <Globe className="w-6 h-6 text-white transform -rotate-45" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                            {t.settingsLanguagePreference}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                            {t.settingsLanguageDescription}
                          </p>
                        </div>
                      </div>
                      
                      <LanguageSelector 
                        currentLang={currentLang}
                        setCurrentLang={setCurrentLang}
                        isMobile={false}
                      />
                    </div>

                    {/* Theme Preference */}
                    <div className="bg-gray-50/90 dark:bg-gray-700/90 p-6 border-3 border-gray-300 dark:border-gray-500 shadow-lg"
                         style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black dark:from-gray-600 dark:to-gray-900 flex items-center justify-center transform rotate-45 border-2 border-black dark:border-gray-300 shadow-lg">
                          <Palette className="w-6 h-6 text-white transform -rotate-45" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                            {t.settingsThemePreference}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                            {t.settingsThemeDescription}
                          </p>
                        </div>
                      </div>
                      
                      <DarkModeToggle 
                        isDarkMode={isDarkMode}
                        toggleDarkMode={toggleDarkMode}
                        isMobile={false}
                      />
                    </div>

                    {/* Additional Preferences Placeholder */}
                    <div className="bg-yellow-50/90 dark:bg-yellow-900/30 border-3 border-yellow-500 p-6 shadow-lg"
                         style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
                      <p className="text-yellow-800 dark:text-yellow-200 font-bold text-center">
                        {t.settingsMorePreferences}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default SettingsPage;