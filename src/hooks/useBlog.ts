import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost, BlogPostSummary } from '../types/blog';

export function useBlog() {
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPostSummary[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // Fetch all published blog posts for the blog listing page
  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching published blog posts...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          image_url,
          published_at,
          profiles!inner(
            username,
            full_name
          )
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching blog posts:', error);
        throw error;
      }

      // Transform the data to match our BlogPostSummary interface
      const transformedPosts: BlogPostSummary[] = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        image_url: post.image_url,
        published_at: post.published_at,
        author: {
          username: post.profiles.username,
          full_name: post.profiles.full_name
        }
      }));

      console.log('✅ Blog posts fetched successfully:', transformedPosts.length, 'posts');
      setBlogPosts(transformedPosts);
    } catch (error) {
      console.error('💥 Error fetching blog posts:', error);
      setBlogPosts([]);
    }
    setLoading(false);
  };

  // Fetch a specific blog post by slug
  const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    setLoading(true);
    try {
      console.log('🔍 Fetching blog post by slug:', slug);
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!inner(
            username,
            full_name
          )
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          console.log('📝 Blog post not found:', slug);
          setCurrentPost(null);
          return null;
        }
        console.error('❌ Error fetching blog post:', error);
        throw error;
      }

      // Transform the data to match our BlogPost interface
      const transformedPost: BlogPost = {
        ...data,
        author: {
          username: data.profiles.username,
          full_name: data.profiles.full_name
        }
      };

      console.log('✅ Blog post fetched successfully:', transformedPost.title);
      setCurrentPost(transformedPost);
      return transformedPost;
    } catch (error) {
      console.error('💥 Error fetching blog post:', error);
      setCurrentPost(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get reading time estimate (words per minute = 200)
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    loading,
    blogPosts,
    currentPost,
    fetchBlogPosts,
    fetchBlogPostBySlug,
    getReadingTime,
    formatDate
  };
}