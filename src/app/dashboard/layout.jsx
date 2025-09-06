"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { EmailAccountsProvider } from "@/contexts/EmailAccountsContext"
import { UserProvider } from "@/contexts/UserContext"

function DashboardContent({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // useEffect(() => {
  //   if (!isClient) return; // Wait for hydration
    
  //   console.log('🔐 Dashboard: Starting auth check...');
    
  //   const ensureAuth = async () => {
  //     try {
  //       console.log('🔍 Dashboard: Getting session...');
  //       const { data: { session } } = await supabase.auth.getSession();
  //       console.log('📋 Dashboard: Session check result:', !!session?.access_token);
        
  //       if (!session?.access_token) {
  //         console.log('❌ Dashboard: No access token, redirecting to login');
  //         router.replace("/auth/login");
  //         return;
  //       }
  //       console.log('✅ Dashboard: Auth successful, setting authorized');
  //       setIsAuthorized(true);
  //     } catch (e) {
  //       console.error('❌ Dashboard: Auth error:', e);
  //       router.replace("/auth/login");
  //     }
  //   };
    
  //   // Add timeout for auth check
  //   const authTimeout = setTimeout(() => {
  //     console.log('⚠️ Dashboard: Auth check timeout, forcing authorized state');
  //     setIsAuthorized(true);
  //   }, 8000);
    
  //   ensureAuth().finally(() => {
  //     clearTimeout(authTimeout);
  //   });
  // }, [router, isClient]);

  // Show loading during hydration
  // if (!isClient) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center gap-4">
  //       <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
  //       <div className="text-muted-foreground text-sm">Loading...</div>
  //     </div>
  //   );
  // }

  // if (!isAuthorized) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center gap-4">
  //       <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
  //       <div className="text-muted-foreground text-sm">Checking authentication...</div>
  //       <div className="text-xs text-muted-foreground">If this takes too long, please refresh the page</div>
  //     </div>
  //   );
  // }

  return (
    <EmailAccountsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header
            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </EmailAccountsProvider>
  );
}

export default function Layout({ children }) {
  return (
    <UserProvider>
      <DashboardContent>
        {children}
      </DashboardContent>
    </UserProvider>
  );
}
