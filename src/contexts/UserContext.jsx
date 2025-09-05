"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

const UserContext = createContext(null);

export const useUser = () => {
  try {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  } catch (error) {
    console.error('Error in useUser hook:', error);
    // Return a fallback context to prevent app crashes
    return {
      user: null,
      isLoading: false,
      error: 'Context error: ' + error.message,
      logout: async () => {
        console.log('Fallback logout - redirecting to login');
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      },
      refreshUser: () => Promise.resolve()
    };
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Get user initials for avatar fallback
  const getUserInitials = (name, email) => {
    if (name) {
      const names = name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Fetch user data from Supabase
  const fetchUser = async () => {
    try {
      console.log('🔄 UserContext: Starting fetchUser...');
      setIsLoading(true);
      setError(null);

      console.log('🔍 UserContext: Getting session from Supabase...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('❌ UserContext: Session error:', sessionError);
        throw sessionError;
      }

      if (!session?.user) {
        console.log('⚠️ UserContext: No session or user found');
        setUser(null);
        return;
      }

      console.log('✅ UserContext: Session found, user ID:', session.user.id);

      const supabaseUser = session.user;
      
      // Extract user information
      const userData = {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.full_name || 
              supabaseUser.user_metadata?.name || 
              supabaseUser.email?.split('@')[0] || 
              'User',
        email: supabaseUser.email,
        avatar: supabaseUser.user_metadata?.avatar_url || 
                supabaseUser.user_metadata?.picture || 
                null,
        initials: getUserInitials(
          supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
          supabaseUser.email
        ),
        provider: supabaseUser.app_metadata?.provider || 'email',
        lastSignIn: supabaseUser.last_sign_in_at,
        createdAt: supabaseUser.created_at
      };

      console.log('👤 UserContext: User data set:', userData.email);
      setUser(userData);
    } catch (err) {
      console.error('❌ UserContext: Error fetching user:', err);
      setError(err.message || 'Failed to fetch user data');
      setUser(null);
    } finally {
      console.log('🏁 UserContext: fetchUser completed');
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('Starting logout process...');
      setError(null);
      
      // Clear user state immediately
      console.log('Clearing user state...');
      setUser(null);
      setIsLoading(false);
      
      console.log('Calling supabase.auth.signOut()...');
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all sessions
      });
      
      if (error) {
        console.error('Supabase signOut error:', error);
        // Don't throw error, continue with logout process
      } else {
        console.log('Supabase signOut successful');
      }

      // Clear any stored tokens from localStorage
      console.log('Clearing localStorage...');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token');
        // Clear all supabase related items
        Object.keys(localStorage).forEach(key => {
          if (key.includes('supabase') || key.includes('sb-')) {
            localStorage.removeItem(key);
          }
        });
      }
      
      console.log('Redirecting to login page...');
      // Use window.location for a hard redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      } else {
        router.replace('/auth/login');
      }
      
      console.log('Logout process completed successfully');
    } catch (err) {
      console.error('Error during logout:', err);
      setError(err.message || 'Failed to logout');
      // Even if logout fails on server, clear local state and redirect
      console.log('Logout failed, but clearing local state anyway...');
      setUser(null);
      setIsLoading(false);
      
      // Force redirect even on error
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      } else {
        router.replace('/auth/login');
      }
    }
  };

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!isClient) return; // Wait for hydration
    
    console.log('🚀 UserContext: useEffect triggered');
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('⚠️ UserContext: Timeout reached, forcing loading to false');
      setIsLoading(false);
      setError('Authentication check timed out. Please refresh the page.');
    }, 10000); // 10 second timeout

    // Initial fetch
    fetchUser().finally(() => {
      clearTimeout(timeoutId);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 UserContext: Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('✅ UserContext: User signed in or token refreshed, fetching user data...');
          await fetchUser();
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 UserContext: User signed out, clearing user state...');
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [isClient]);

  const value = {
    user,
    isLoading,
    error,
    logout,
    refreshUser: fetchUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
