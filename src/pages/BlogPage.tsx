import React, { useState, useEffect } from 'react';
import { ArrowLeft, Languages, BookOpen, Calendar, User, Clock, Search, Tag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBlog } from '../hooks/useBlog';
import { translations } from '../translations';
import { Translation } from '../types/translations';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSelector from '../components/ui/LanguageSelector';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import UserMenu from '../components/auth/UserMenu';
import Footer from '../components/layout/Footer';

function BlogPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { blogPosts, loading, fetchBlogPosts, formatDate, getReadingTime } = useBlog();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentLang, setCurrentLang] = useState<string>('en'); // Default to English for blog
  const [searchTerm, setSearchTerm] = useState('');

  const t: Translation = translations[currentLang];

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

            {user && <UserMenu />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            Language Learning Blog
          </h1>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 max-w-4xl mx-auto border-4 border-black dark:border-gray-300 shadow-2xl"
               style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
            <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
              Discover insights, tips, and stories about mastering Romance languages. 
              Learn from experts and fellow language enthusiasts.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-6"
               style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
                  placeholder="Search blog posts..."
                />
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{filteredPosts.length} posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl animate-pulse"
                   style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-md mx-auto"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {searchTerm ? 'No posts found' : 'No blog posts yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-bold">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all posts.'
                  : 'Check back soon for exciting content about language learning!'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white px-6 py-2 font-black text-sm border-3 border-black dark:border-gray-300 hover:from-blue-700 hover:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}
              >
                {/* Featured Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 overflow-hidden">
                  {post.image_url ? (
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 font-black text-xs border-2 border-white shadow-lg flex items-center space-x-1"
                       style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}>
                    <Clock className="w-3 h-3" />
                    <span>{getReadingTime(post.excerpt || '')} min read</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300 font-bold text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author?.full_name || post.author?.username}</span>
                      </div>
                      {post.published_at && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-4 border-black dark:border-gray-300 shadow-2xl p-8 max-w-2xl mx-auto"
                 style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
                Ready to Start Learning?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-bold mb-6">
                Join thousands of learners mastering Romance languages with our innovative approach.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 text-white px-8 py-3 font-black text-lg border-3 border-black dark:border-gray-300 hover:from-green-700 hover:to-green-900 dark:hover:from-green-600 dark:hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                Start Learning Today
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}

export default BlogPage;