import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, Calendar, User, Clock, Share2, BookOpen, Tag } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBlog } from '../hooks/useBlog';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import UserMenu from '../components/auth/UserMenu';
import Footer from '../components/layout/Footer';

function BlogPostPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { user, loading: authLoading } = useAuth();
  const { currentPost, loading, fetchBlogPostBySlug, formatDate, getReadingTime } = useBlog();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('en'); // Default to English for blog
  const [pageLoading, setPageLoading] = useState(true);

  const t: Translation = translations[currentLang];

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        navigate('/blog');
        return;
      }

      setPageLoading(true);
      const post = await fetchBlogPostBySlug(slug);
      
      if (!post) {
        // Post not found, redirect to blog page
        navigate('/blog');
        return;
      }
      
      setPageLoading(false);
    };

    loadPost();
  }, [slug, navigate, fetchBlogPostBySlug]);

  const handleShare = async () => {
    if (navigator.share && currentPost) {
      try {
        await navigator.share({
          title: currentPost.title,
          text: currentPost.excerpt || 'Check out this blog post from Dialectio',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to copying URL
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could add a toast notification here
      console.log('URL copied to clipboard');
    });
  };

  // Show loading screen while fetching post
  if (pageLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-300 via-gray-200 via-green-200 to-black dark:from-gray-900 dark:via-gray-800 dark:via-gray-700 dark:via-gray-600 dark:to-black relative overflow-hidden font-sans flex items-center justify-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md w-full mx-4"
             style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Loading blog post...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // This should not happen due to the redirect logic above, but just in case
  if (!currentPost) {
    return null;
  }

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
              onClick={() => navigate('/blog')}
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
            <button
              onClick={handleShare}
              className="w-12 h-12 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300 border-3 border-black dark:border-gray-300 transform rotate-45 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
              title="Share this post"
            >
              <Share2 className="w-6 h-6 text-gray-900 dark:text-gray-100 transform -rotate-45" />
            </button>

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

            {user && <UserMenu />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm font-bold text-gray-600 dark:text-gray-400">
            <Link 
              to="/blog" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Blog
            </Link>
            <span>→</span>
            <span className="text-gray-900 dark:text-gray-100">{currentPost.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <article className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl"
                 style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
          
          {/* Featured Image */}
          {currentPost.image_url && (
            <div className="relative h-64 md:h-96 overflow-hidden mx-2 mt-2"
                 style={{ clipPath: 'polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)' }}>
              <img 
                src={currentPost.image_url} 
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {currentPost.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b-2 border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span>By {currentPost.author?.full_name || currentPost.author?.username}</span>
              </div>
              
              {currentPost.published_at && (
                <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(currentPost.published_at)}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{getReadingTime(currentPost.content)} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            {currentPost.excerpt && (
              <div className="bg-blue-50/90 dark:bg-gray-700/90 p-6 border-3 border-blue-300 dark:border-blue-500 shadow-lg mb-8"
                   style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100 italic">
                  {currentPost.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-900 dark:text-gray-100 font-medium leading-relaxed"
                style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                  fontWeight: '500'
                }}
                dangerouslySetInnerHTML={{ __html: currentPost.content.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t-2 border-gray-300 dark:border-gray-600">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center transform rotate-45 border-3 border-black dark:border-gray-300 shadow-xl">
                    <User className="w-6 h-6 text-white transform -rotate-45" />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 dark:text-gray-100">
                      {currentPost.author?.full_name || currentPost.author?.username}
                    </div>
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      Language Learning Expert
                    </div>
                  </div>
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-3 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-16">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 text-center"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
              Ready to Start Your Language Journey?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
              Join thousands of learners mastering Romance languages with our innovative approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Start Learning
              </button>
              <Link
                to="/blog"
                className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <BookOpen className="w-5 h-5" />
                <span>More Articles</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}

export default BlogPostPage;