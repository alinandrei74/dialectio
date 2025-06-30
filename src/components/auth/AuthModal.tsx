import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, resetPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(formData.emailOrUsername, formData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email/username or password');
        } else {
          setError(error.message || 'Login error');
        }
      } else {
        onClose();
      }
    } catch (err) {
      setError('Unexpected error during login');
    }

    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await resetPassword(resetEmail);
      
      if (error) {
        setError(error.message || 'Error sending reset email');
      } else {
        setSuccess('Password reset email sent! Check your inbox.');
        setResetEmail('');
        setTimeout(() => {
          setShowForgotPassword(false);
          setSuccess('');
        }, 3000);
      }
    } catch (err) {
      setError('Unexpected error sending reset email');
    }

    setResetLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl max-w-md w-full"
           style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
        
        {/* Header */}
        <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
             style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">
              {showForgotPassword ? 'Reset Password' : 'Sign In'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-all duration-300 border-2 border-white transform rotate-45 shadow-lg flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white transform -rotate-45" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm flex items-center space-x-3"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm flex items-center space-x-3"
                 style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
              <CheckCircle className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}

          {!showForgotPassword ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Username */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.emailOrUsername}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailOrUsername: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                    placeholder="your@email.com or username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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
                style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Judge Credentials Message */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-bold italic">
                  If you are a judge, please use the credentials I provided :)
                </p>
              </div>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          ) : (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-700 dark:text-gray-300 font-bold">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-red-700 hover:to-red-900 dark:hover:from-red-600 dark:hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
              >
                {resetLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black text-sm underline transition-colors duration-300"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;