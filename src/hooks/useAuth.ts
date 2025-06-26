import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username?: string, fullName?: string, initialLanguage?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // If signup is successful and we have user data, create profile
    if (!error && data.user && username && initialLanguage) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username,
          full_name: username, // Usar username como full_name
          initial_language: initialLanguage,
          email: email
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        return { data, error: profileError };
      }
    }

    return { data, error };
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    // Check if input is email or username
    const isEmail = emailOrUsername.includes('@');
    
    if (isEmail) {
      // Sign in with email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      });
      return { data, error };
    } else {
      // Sign in with username - first get email from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', emailOrUsername)
        .single();

      if (profileError || !profileData) {
        return { data: null, error: { message: 'Usuario no encontrado' } };
      }

      // Now sign in with the email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: profileData.email,
        password,
      });
      return { data, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };
}