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

  const initializeAuth = async () => {
    const token = getCookie('access_token');

    if (token) {
      dispatch(setToken(token));

      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (user && !error) {
          dispatch(logIn(user));
        } else {
          dispatch(clearUser());
          deleteCookie('access_token');
          localStorage.removeItem('access_token');
        }
      } catch (error) {

        console.warn('Token verification failed:', error);
        dispatch(clearUser());
        deleteCookie('access_token');
        localStorage.removeItem('access_token');
      }
    } else {
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'access_token' && e.newValue === null) {
        dispatch(clearUser());
      }
    };

    const handleCookieChange = () => {
      const token = getCookie('access_token');
      const currentToken = localStorage.getItem('access_token');
      if (!token && currentToken) {
        dispatch(clearUser());
        localStorage.removeItem('access_token');
      }
    };

    window.addEventListener('storage', handleStorageChange);
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
