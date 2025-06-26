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

  const checkUsernameAvailability = async (username: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username.toLowerCase())
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows returned, username is available
      return { available: true, error: null };
    }

    if (data) {
      // Username exists
      return { available: false, error: 'Username already exists' };
    }

    // Other error occurred
    return { available: false, error: error?.message || 'Error checking username' };
  };

  const checkEmailAvailability = async (email: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows returned, email is available
      return { available: true, error: null };
    }

    if (data) {
      // Email exists
      return { available: false, error: 'Email already exists' };
    }

    // Other error occurred
    return { available: false, error: error?.message || 'Error checking email' };
  };

  const signUp = async (email: string, password: string, username?: string, fullName?: string, initialLanguage?: string) => {
    // Pre-check for duplicates before attempting signup
    if (username) {
      const usernameCheck = await checkUsernameAvailability(username);
      if (!usernameCheck.available) {
        return { 
          data: null, 
          error: { 
            message: 'duplicate key value violates unique constraint "profiles_username_key"',
            code: '23505'
          } 
        };
      }
    }

    const emailCheck = await checkEmailAvailability(email);
    if (!emailCheck.available) {
      return { 
        data: null, 
        error: { 
          message: 'duplicate key value violates unique constraint "profiles_email_key"',
          code: '23505'
        } 
      };
    }

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
          username: username.toLowerCase(),
          full_name: username, // Usar username como full_name
          initial_language: initialLanguage,
          email: email.toLowerCase()
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
        .eq('username', emailOrUsername.toLowerCase())
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

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    if (!user) throw new Error('No user logged in');

    // Update password directly (user is already authenticated)
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
    return { error: null };
  };

  const updateProfile = async (username: string, initialLanguage: string) => {
    if (!user) throw new Error('No user logged in');

    // Check if username is available (excluding current user)
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.toLowerCase())
      .neq('id', user.id)
      .single();

    if (existingProfile) {
      throw new Error('Username already exists');
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        username: username.toLowerCase(),
        full_name: username, // Usar username como full_name
        initial_language: initialLanguage,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;
    return { error: null };
  };

  const updateEmail = async (newEmail: string, password: string) => {
    if (!user) throw new Error('No user logged in');

    // Check if email is available
    const emailCheck = await checkEmailAvailability(newEmail);
    if (!emailCheck.available) {
      throw new Error('Email already exists');
    }

    // First verify password by attempting to sign in
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: password,
    });

    if (verifyError) throw new Error('Contraseña incorrecta');

    // Update email
    const { error } = await supabase.auth.updateUser({
      email: newEmail
    });

    if (error) throw error;

    // Also update email in profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        email: newEmail.toLowerCase(),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (profileError) throw profileError;
    return { error: null };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    updatePassword,
    updateEmail,
    checkUsernameAvailability,
    checkEmailAvailability,
  };
}