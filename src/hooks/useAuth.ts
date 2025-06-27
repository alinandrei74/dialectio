import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session with error handling for invalid refresh tokens
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        
        // If the error is related to refresh token, clear the session
        if (error.message?.includes('Refresh Token Not Found') || 
            error.message?.includes('Invalid Refresh Token')) {
          console.log('Invalid refresh token detected, clearing session...');
          supabase.auth.signOut().then(() => {
            setSession(null);
            setUser(null);
            setLoading(false);
          });
          return;
        }
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((err) => {
      console.error('Unexpected error getting session:', err);
      // Clear session on any unexpected error
      supabase.auth.signOut().then(() => {
        setSession(null);
        setUser(null);
        setLoading(false);
      });
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
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase())
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" which is what we want
        console.error('Error checking username availability:', error);
        return { available: false, error: error.message || 'Error checking username' };
      }

      if (data) {
        // Username exists
        return { available: false, error: 'Username already exists' };
      }

      // No rows returned, username is available
      return { available: true, error: null };
    } catch (err) {
      console.error('Unexpected error checking username:', err);
      return { available: false, error: 'Error checking username availability' };
    }
  };

  const checkEmailAvailability = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" which is what we want
        console.error('Error checking email availability:', error);
        return { available: false, error: error.message || 'Error checking email' };
      }

      if (data) {
        // Email exists
        return { available: false, error: 'Email already exists' };
      }

      // No rows returned, email is available
      return { available: true, error: null };
    } catch (err) {
      console.error('Unexpected error checking email:', err);
      return { available: false, error: 'Error checking email availability' };
    }
  };

  const signUp = async (email: string, password: string, username?: string, fullName?: string, initialLanguage?: string) => {
    try {
      // Pre-check for duplicates before attempting signup
      if (username) {
        const usernameCheck = await checkUsernameAvailability(username);
        if (!usernameCheck.available) {
          return { 
            data: null, 
            error: { 
              message: 'Username already exists',
              code: 'username_taken'
            } 
          };
        }
      }

      const emailCheck = await checkEmailAvailability(email);
      if (!emailCheck.available) {
        return { 
          data: null, 
          error: { 
            message: 'Email already exists',
            code: 'email_taken'
          } 
        };
      }

      // Proceed with Supabase auth signup
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
      });

      // If signup is successful and we have user data, create profile
      if (!error && data.user && username && initialLanguage) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              username: username.toLowerCase(),
              full_name: fullName || username, // Use fullName if provided, otherwise username
              initial_language: initialLanguage,
              email: email.toLowerCase()
            });

          if (profileError) {
            console.error('Error creating profile:', profileError);
            
            // Handle specific database constraint violations
            if (profileError.code === '23505') {
              if (profileError.message.includes('profiles_username_key')) {
                return { data, error: { message: 'Username already exists', code: 'username_taken' } };
              } else if (profileError.message.includes('profiles_email_key')) {
                return { data, error: { message: 'Email already exists', code: 'email_taken' } };
              }
            }
            
            return { data, error: profileError };
          }
        } catch (profileErr) {
          console.error('Unexpected error creating profile:', profileErr);
          return { data, error: { message: 'Error creating user profile', code: 'profile_creation_failed' } };
        }
      }

      return { data, error };
    } catch (err) {
      console.error('Unexpected error during signup:', err);
      return { data: null, error: { message: 'Unexpected error during registration', code: 'unexpected_error' } };
    }
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    try {
      // Check if input is email or username
      const isEmail = emailOrUsername.includes('@');
      
      if (isEmail) {
        // Sign in with email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailOrUsername.toLowerCase(),
          password,
        });
        return { data, error };
      } else {
        // Sign in with username - first get email from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', emailOrUsername.toLowerCase())
          .maybeSingle();

        if (profileError) {
          console.error('Error finding user by username:', profileError);
          return { data: null, error: { message: 'Error finding user' } };
        }

        if (!profileData) {
          return { data: null, error: { message: 'Usuario no encontrado' } };
        }

        // Now sign in with the email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: profileData.email,
          password,
        });
        return { data, error };
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      return { data: null, error: { message: 'Unexpected error during sign in' } };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    if (!user) throw new Error('No user logged in');

    try {
      // Update password directly (user is already authenticated)
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return { error: null };
    } catch (err) {
      console.error('Error updating password:', err);
      throw err;
    }
  };

  const updateProfile = async (username: string, initialLanguage: string) => {
    if (!user) throw new Error('No user logged in');

    try {
      // Check if username is available (excluding current user)
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())
        .neq('id', user.id)
        .maybeSingle();

      if (existingProfile) {
        throw new Error('Username already exists');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: username.toLowerCase(),
          full_name: username, // Use username as full_name
          initial_language: initialLanguage,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        
        // Handle specific database constraint violations
        if (error.code === '23505') {
          if (error.message.includes('profiles_username_key')) {
            throw new Error('Username already exists');
          }
        }
        
        throw error;
      }
      
      return { error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateEmail = async (newEmail: string, password: string) => {
    if (!user) throw new Error('No user logged in');

    try {
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

      // Update email in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        email: newEmail.toLowerCase()
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

      if (profileError) {
        console.error('Error updating email in profiles:', profileError);
        
        // Handle specific database constraint violations
        if (profileError.code === '23505') {
          if (profileError.message.includes('profiles_email_key')) {
            throw new Error('Email already exists');
          }
        }
        
        throw profileError;
      }
      
      return { error: null };
    } catch (err) {
      console.error('Error updating email:', err);
      throw err;
    }
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