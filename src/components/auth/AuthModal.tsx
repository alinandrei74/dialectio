import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Translation } from '../../types/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translation;
  isDropdown?: boolean;
}

function AuthModal({ isOpen, onClose, t, isDropdown = false }: AuthModalProps) {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalBackground, setModalBackground] = useState('bg-white/95 dark:bg-gray-800/95');
  const [textColor, setTextColor] = useState('text-gray-900 dark:text-gray-100');

  const { signIn } = useAuth();

  useEffect(() => {
    if (isDropdown) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calcular el progreso del scroll (0 a 1)
        const scrollProgress = scrollY / (documentHeight - windowHeight);
        
        // Definir los puntos de cambio con tonos aún más claros
        if (scrollProgress < 0.15) {
          // Hero section - blanco muy transparente
          setModalBackground('bg-white/95 dark:bg-gray-900/95');
          setTextColor('text-gray-900 dark:text-gray-100');
        } else if (scrollProgress < 0.35) {
          // Language showcase - blanco casi transparente
          setModalBackground('bg-white/95 dark:bg-gray-800/95');
          setTextColor('text-gray-900 dark:text-gray-100');
        } else if (scrollProgress < 0.55) {
          // About section - blanco muy suave
          setModalBackground('bg-white/95 dark:bg-gray-700/95');
          setTextColor('text-gray-900 dark:text-gray-100');
        } else if (scrollProgress < 0.75) {
          // Features section - blanco con toque verde muy sutil
          setModalBackground('bg-green-50/95 dark:bg-gray-600/95');
          setTextColor('text-gray-900 dark:text-gray-100');
        } else if (scrollProgress < 0.9) {
          // FAQ section - verde muy muy claro
          setModalBackground('bg-green-50/95 dark:bg-gray-500/95');
          setTextColor('text-gray-900 dark:text-gray-100');
        } else {
          // CTA y Footer - verde oscuro
          setModalBackground('bg-green-800/95 dark:bg-black/95');
          setTextColor('text-white dark:text-gray-100');
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Ejecutar una vez al montar

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isDropdown]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError(t.passwordTooShort);
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn(emailOrUsername, password);
      if (error) {
        setError(t.invalidCredentials);
      } else {
        setSuccess(t.welcomeBack);
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      }
    } catch (err) {
      setError(t.connectionError);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setEmailOrUsername('');
    setPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleRegisterClick = () => {
    onClose();
    navigate('/registro');
  };

  // Renderizado como dropdown
  if (isDropdown) {
    return (
      <div className="absolute top-full right-0 mt-2 w-96 z-50">
        <div className={`${modalBackground} backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl transition-all duration-500`}
             style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)' }}>
          
          {/* Header */}
          <div className="p-4 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-1 mt-1"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">
                {t.login}
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-all duration-300 border-2 border-white transform rotate-45 flex items-center justify-center"
              >
                <X className="w-4 h-4 transform -rotate-45" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-4">
            {error && (
              <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-xs"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                {error}
              </div>
            )}

            {success && (
              <div className="mb-3 p-2 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-xs"
                   style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email or Username Field */}
              <div>
                <label className={`block text-xs font-bold ${textColor} mb-1`}>
                  email / user
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border-2 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                    placeholder="email / user"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-xs font-bold ${textColor} mb-1`}>
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-10 py-2 border-2 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-2 font-black text-sm border-2 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                {loading ? 'Procesando...' : t.loginButton}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-3 text-center">
              <p className={`${textColor} font-bold text-xs`}>
                {t.dontHaveAccount}
              </p>
              <button
                onClick={handleRegisterClick}
                className="mt-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-xs underline transition-colors duration-300"
              >
                {t.createNewAccount}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado como modal completo (para casos donde se necesite)
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md max-w-md w-full border-4 border-black dark:border-gray-300 shadow-2xl"
           style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
        
        {/* Header */}
        <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
             style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">
              {t.login}
            </h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 transition-all duration-300 border-2 border-white transform rotate-45 flex items-center justify-center"
            >
              <X className="w-5 h-5 transform -rotate-45" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm"
                 style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Username Field */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                email / user
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                  placeholder="email / user"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                  placeholder="••••••••"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              {loading ? 'Procesando...' : t.loginButton}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 font-bold text-sm">
              {t.dontHaveAccount}
            </p>
            <button
              onClick={handleRegisterClick}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
            >
              {t.createNewAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;