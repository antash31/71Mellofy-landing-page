"use client"

import * as React from "react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ROUTES } from "@/constants/routes.constants"
import { useSelector } from "react-redux"

const data = ROUTES;

export function AppSidebar({
  ...props
}) {
  const hasEmailAccounts = useSelector((state) => state.auth.hasEmailAccounts);
  const doesCampaignExist = useSelector((state) => state.auth.doesCampaignExist);

  console.log({doesCampaignExist});

  // Filter projects based on conditions
  const filteredProjects = data.projects.filter((project) => {
    // Always show Dashboard
    if (project.name === "Dashboard") {
      return true;
    }
    // Show Leads only if campaign exists
    if (project.name === "Leads") {
      return doesCampaignExist;
    }
    // Show Email Accounts only if email accounts exist
    if (project.name === "Email Accounts") {
      return hasEmailAccounts;
    }
    // Show other projects by default
    return true;
  });

  return (
    (<Sidebar className="bg-accent" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={filteredProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
