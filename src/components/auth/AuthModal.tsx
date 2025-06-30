import React, { useState } from 'react';
import { X, User, Lock, Eye, EyeOff, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, resetPassword } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else {
            setError(error.message || 'Login failed');
          }
        } else {
          onClose();
        }
      } else {
        // Password reset
        const { error } = await resetPassword(formData.email);
        if (error) {
          setError(error.message || 'Failed to send reset email');
        } else {
          setSuccess('Password reset email sent! Check your inbox.');
          setFormData({ email: '', password: '' });
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setError('');
    setSuccess('');
    setIsLogin(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl max-w-md w-full"
           style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
        
        {/* Header */}
        <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
             style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">
              {isLogin ? 'Sign In' : 'Reset Password'}
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-all duration-300 border-2 border-white transform rotate-45 shadow-lg flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white transform -rotate-45" />
            </button>
          </div>
        </div>

        {/* Test Version Notice */}
        <div className="mx-6 mt-6 mb-4 p-4 bg-blue-50/90 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-500 shadow-md"
             style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-black text-blue-800 dark:text-blue-200 mb-1">
                Test Version
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300 font-bold">
                This is a test version for demonstration purposes. New registrations are currently not accepted.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm flex items-center space-x-2"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
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
            {/* Email */}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password (only for login) */}
            {isLogin && (
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Password
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
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl"
              style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Send Reset Email')}
            </button>
          </form>

          {/* Judge Credentials Message */}
          {isLogin && (
            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-400 font-bold text-sm italic">
                If you are a judge, please use the credentials I provided :)
              </p>
            </div>
          )}

          {/* Toggle between login and reset */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
                setFormData({ email: '', password: '' });
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
            >
              {isLogin ? 'Forgot your password?' : 'Back to Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;