"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setToken, logIn, clearUser } from '@/store/slices/authSlice';
import { getCookie, deleteCookie } from '@/utils/helper';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const isLoadingUser = useSelector((state) => state.auth.isLoadingUser);
    const router = useRouter();
  useEffect(() => {
    const initializeAuth = async () => {
      // Check for token in cookie
      const token = getCookie('access_token');
      
      if (token) {
        // Set token in Redux store
        dispatch(setToken(token));
        
        // Verify token with Supabase

        console.log("WE ARE HERE")
        try {
          const { data: { user }, error } = await supabase.auth.getUser(token);
          if (user && !error) {
            dispatch(logIn(user));
            router.push('/dashboard');
          } else {
            // Token is invalid, clear everything
            dispatch(clearUser());
            deleteCookie('access_token');
            localStorage.removeItem('access_token');
          }
        } catch (error) {
          // Token verification failed
          console.warn('Token verification failed:', error);
          dispatch(clearUser());
          deleteCookie('access_token');
          localStorage.removeItem('access_token');
        }
      } else {
        // No token found
        dispatch(clearUser());
      }
    };

    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'access_token' && e.newValue === null) {
        // Token was removed in another tab
        dispatch(clearUser());
      }
    };

    // Listen for cookie changes (for cross-tab logout sync)
    const handleCookieChange = () => {
      const token = getCookie('access_token');
      const currentToken = localStorage.getItem('access_token');
      
      // If cookie is deleted but localStorage still has token, clear everything
      if (!token && currentToken) {
        dispatch(clearUser());
        localStorage.removeItem('access_token');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for cookie changes periodically (fallback for cross-tab sync)
    const cookieCheckInterval = setInterval(handleCookieChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(cookieCheckInterval);
    };
  }, [dispatch]);

  // Show loading spinner while checking authentication
//   if (isLoadingUser) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

  return children;
}
