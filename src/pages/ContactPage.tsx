import React, { useState } from 'react';
import { ArrowLeft, Languages, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';

function ContactPage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const t: Translation = translations[currentLang];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validación básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(t.fieldRequired);
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t.emailInvalid);
      setLoading(false);
      return;
    }

    try {
      // Get Supabase URL from environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Supabase URL not configured');
      }

      // Call the Edge Function
      const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || undefined,
          message: formData.message.trim()
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error sending email');
      }

      setSuccess(t.contactSuccess);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error sending contact email:', err);
      setError(t.contactError);
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
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            {t.contactTitle}
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-3xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              {t.contactSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-6">
                {t.contactInfoTitle}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50/90 dark:bg-gray-700/90 p-4 border-2 border-blue-300 dark:border-blue-500 shadow-md"
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-2 border-black dark:border-gray-300 shadow-lg">
                      <Mail className="w-6 h-6 text-white transform -rotate-45" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                        {t.emailLabel}
                      </h3>
                      <div className="bg-white/80 dark:bg-gray-600/80 border border-gray-300 dark:border-gray-500 p-2 mt-2 rounded">
                        <p className="text-gray-800 dark:text-gray-200 font-bold text-sm">
                          team@dialectio.xyz
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50/90 dark:bg-gray-700/90 p-4 border-2 border-green-300 dark:border-green-500 shadow-md"
                     style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 dark:from-green-600 dark:to-green-800 flex items-center justify-center transform rotate-45 border-2 border-black dark:border-gray-300 shadow-lg">
                      <Phone className="w-6 h-6 text-white transform -rotate-45" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                        {t.phoneLabel}
                      </h3>
                      <div className="bg-gray-200/50 dark:bg-gray-600/50 border border-gray-300 dark:border-gray-500 p-2 mt-2">
                        <p className="text-gray-600 dark:text-gray-400 font-bold text-sm">
                          [Disponible próximamente]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/90 dark:bg-gray-700/90 p-4 border-2 border-gray-300 dark:border-gray-500 shadow-md"
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black dark:from-gray-600 dark:to-gray-900 flex items-center justify-center transform rotate-45 border-2 border-black dark:border-gray-300 shadow-lg">
                      <MapPin className="w-6 h-6 text-white transform -rotate-45" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                        {t.addressLabel}
                      </h3>
                      <div className="bg-gray-200/50 dark:bg-gray-600/50 border border-gray-300 dark:border-gray-500 p-2 mt-2">
                        <p className="text-gray-600 dark:text-gray-400 font-bold text-sm">
                          España
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-blue-50/90 dark:bg-blue-900/30 border-3 border-blue-500 p-6 shadow-lg"
                 style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
              <p className="text-blue-800 dark:text-blue-200 font-bold text-center text-sm">
                📧 Respondemos a todos los mensajes en un plazo máximo de 24 horas
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            {/* Form Header */}
            <div className="p-6 border-b-3 border-black dark:border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white mx-2 mt-2"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h2 className="text-2xl font-black text-center">
                {t.contactFormTitle}
              </h2>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-300 font-bold text-sm"
                     style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold text-sm"
                     style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 2% 100%)' }}
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.subjectLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}
                    placeholder={t.subjectPlaceholder}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t.messageLabel}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    style={{ clipPath: 'polygon(0% 0%, 99% 0%, 100% 100%, 1% 100%)' }}
                    placeholder={t.messagePlaceholder}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-4 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-xl flex items-center justify-center space-x-3"
                  style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? t.sendingMessage : t.sendMessage}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default ContactPage;