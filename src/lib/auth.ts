import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  profile?: {
    full_name?: string;
    company_name?: string;
  };
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  companyName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData) => {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          company_name: data.companyName || ''
        }
      }
    });

    if (error) throw error;

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error: error.message };
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) throw error;

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name, company_name')
      .eq('id', user.id)
      .single();

    return {
      ...user,
      profile
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const updateUserProfile = async (updates: { full_name?: string; company_name?: string }) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { error: error.message };
  }
};