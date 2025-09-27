"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  const isLoadingUser = useSelector((state) => state.auth.isLoadingUser);
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated && !userLoggedIn) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, userLoggedIn, isLoadingUser, router]);

//   if (isLoadingUser) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated && !userLoggedIn) {
//     return null; // Router.push will handle redirect
//   }

  return children;
}
