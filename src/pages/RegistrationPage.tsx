import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Globe, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';

function RegistrationPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    initialLanguage: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  const t: Translation = translations[currentLang];

  const languageOptions = [
    { code: 'es', name: t.spanish, flag: '🇪🇸' },
    { code: 'fr', name: t.french, flag: '🇫🇷' },
    { code: 'pt', name: t.portuguese, flag: '🇵🇹' },
    { code: 'it', name: t.italian, flag: '🇮🇹' },
    { code: 'en', name: t.english, flag: '🇺🇸' }
  ];

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'username':
        if (!value.trim()) return t.fieldRequired;
        if (value.length < 3) return t.usernameTooShort;
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return t.usernameInvalidChars;
        return null;
      
      case 'email':
        if (!value.trim()) return t.fieldRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.emailInvalid;
        return null;
      
      case 'password':
        if (!value) return t.fieldRequired;
        if (value.length < 6) return t.passwordTooShort;
        if (!/[a-zA-Z]/.test(value)) return t.passwordMustContainLetter;
        if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return t.passwordMustContainNumberOrSpecial;
        return null;
      
      case 'confirmPassword':
        if (!value) return t.fieldRequired;
        if (value !== formData.password) return t.passwordsDoNotMatch;
        return null;
      
      case 'initialLanguage':
        if (!value) return t.fieldRequired;
        return null;
      
      default:
        return null;
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess('');

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Usar el username como fullName también
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        formData.username,
        formData.username, // Usar username como fullName
        formData.initialLanguage
      );

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: t.emailAlreadyExists });
        } else if (error.message.includes('username')) {
          setErrors({ username: t.usernameAlreadyExists });
        } else {
          setErrors({ general: t.registrationError });
        }
      } else {
        setSuccess(t.registrationSuccess);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setErrors({ general: t.connectionError });
    }

    setLoading(false);
  };

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
              onClick={() => navigate('/')}
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
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            {t.registrationTitle}
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.registrationSubtitle}
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl max-w-2xl mx-auto"
             style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
          
          {/* Form Header */}
          <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <h2 className="text-2xl font-black text-center">
              {t.register}
            </h2>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                {errors.general}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm"
                   style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Account Information Section */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">
                    {t.personalInfoTitle}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                    {t.personalInfoDescription}
                  </p>
                </div>

                {/* Username */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.usernameLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value.toLowerCase())}
                      className={`w-full pl-10 pr-4 py-3 border-3 ${
                        errors.username ? 'border-red-500' : 'border-black dark:border-gray-300'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                      placeholder={t.usernamePlaceholder}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 font-bold">
                    {t.usernameDescription}
                  </p>
                  {errors.username && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-bold">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-3 ${
                        errors.email ? 'border-red-500' : 'border-black dark:border-gray-300'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-bold">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {t.passwordLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border-3 ${
                          errors.password ? 'border-red-500' : 'border-black dark:border-gray-300'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                        placeholder={t.passwordPlaceholder}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-bold">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {t.confirmPasswordLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border-3 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-black dark:border-gray-300'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                        placeholder={t.confirmPasswordPlaceholder}
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
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-bold">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Language Information Section */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">
                    {t.languageInfoTitle}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                    {t.languageInfoDescription}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {t.initialLanguageLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleInputChange('initialLanguage', lang.code)}
                        className={`p-4 border-3 transition-all duration-300 font-bold text-sm ${
                          formData.initialLanguage === lang.code
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white border-black dark:border-gray-300 shadow-xl scale-105'
                            : 'hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:border-black dark:hover:border-gray-300 hover:shadow-lg bg-white dark:bg-gray-800'
                        }`}
                        style={{
                          clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 font-bold">
                    {t.initialLanguageDescription}
                  </p>
                  {errors.initialLanguage && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-bold">
                      {errors.initialLanguage}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
              >
                {loading ? 'Procesando...' : t.completeRegistration}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                {t.alreadyHaveAccount}
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
              >
                {t.backToLogin}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;