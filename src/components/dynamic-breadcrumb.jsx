"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Route mapping for breadcrumb display
const routeMap = {
  '/dashboard': 'Dashboard',
  '/dashboard/leads': 'Leads',
  '/dashboard/leads/Agent': 'Agent Management',
  '/dashboard/email-accounts': 'Email Accounts',
  '/dashboard/pricing': 'Pricing',
  '/dashboard/contact': 'Contact',
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  
  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Build breadcrumb items
  const breadcrumbItems = [];
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const displayName = routeMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbItems.push({
      path: currentPath,
      name: displayName,
      isLast: index === pathSegments.length - 1
    });
  });

  // Don't show breadcrumb if we're at root or only have one segment
  if (breadcrumbItems.length <= 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator className="mx-2" />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.path}>
                  {item.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
