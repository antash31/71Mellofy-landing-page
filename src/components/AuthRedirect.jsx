"use client";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthRedirect({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  const isLoadingUser = useSelector((state) => state.auth.isLoadingUser);
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated and not loading, redirect to dashboard
    // if (!isLoadingUser && (isAuthenticated || userLoggedIn)) {
    //   router.push('/dashboard');
    // }
  }, [isAuthenticated, userLoggedIn, isLoadingUser, router]);

//   if (isLoadingUser) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

  // If authenticated, don't render auth pages (redirect is happening)
//   if (isAuthenticated || userLoggedIn) {
//     return null;
//   }

  return children;
}
