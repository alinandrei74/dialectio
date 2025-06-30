import React, { useState } from 'react';
import { X, User, Lock, Eye, EyeOff, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    resetEmail: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.emailOrUsername, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Credenciales incorrectas. Verifica tu email/usuario y contraseña.');
          } else {
            setError(error.message || 'Error al iniciar sesión');
          }
        } else {
          onClose();
          navigate('/learning');
        }
      } else {
        const { error } = await resetPassword(formData.resetEmail);
        if (error) {
          setError(error.message || 'Error al enviar email de recuperación');
        } else {
          setSuccess('Se ha enviado un enlace de recuperación a tu email');
        }
      }
    } catch (err) {
      setError('Error inesperado. Inténtalo de nuevo.');
    }

    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl max-w-md w-full"
           style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
        
        {/* Header */}
        <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
             style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">
              {mode === 'login' ? 'Iniciar Sesión' : 'Recuperar Contraseña'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-all duration-300 border-2 border-white transform rotate-45 shadow-lg flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white transform -rotate-45" />
            </button>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="p-4 bg-orange-50/90 dark:bg-orange-900/30 border-b-2 border-orange-300 dark:border-orange-500 mx-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <p className="text-orange-800 dark:text-orange-200 font-bold text-sm">
              Demo técnica para hackathon - Solo inicio de sesión disponible
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm flex items-center space-x-2"
                 style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
              <CheckCircle className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'login' ? (
              <>
                {/* Email/Username */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Email o Usuario
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.emailOrUsername}
                      onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                      placeholder="tu@email.com o usuario"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
              </>
            ) : (
              /* Reset Password Mode */
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.resetEmail}
                    onChange={(e) => handleInputChange('resetEmail', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              {loading ? 'Procesando...' : 
               mode === 'login' ? 'Iniciar Sesión' : 
               'Enviar Enlace'}
            </button>
          </form>

          {/* Mode Toggle */}
          <div className="mt-4 text-center">
            {mode === 'login' ? (
              <button
                onClick={() => setMode('reset')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            ) : (
              <button
                onClick={() => setMode('login')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
              >
                Volver al inicio de sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;