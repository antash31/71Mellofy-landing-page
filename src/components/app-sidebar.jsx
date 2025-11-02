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
  const [mounted, setMounted] = React.useState(false);

 React.useEffect(() => {
    setMounted(true);
  }, []);

   const filteredProjects = mounted ? data.projects.filter((project) => {
    if (project.name === "Dashboard") return true;
    if (project.name === "Leads") return doesCampaignExist;
    if (project.name === "Email Accounts") return hasEmailAccounts;
    return true;
  }) : data.projects;

  const userDetails = useSelector(state => state.auth.userDetails);
  return (
    (<Sidebar className="bg-accent" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher activeTeam={userDetails} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={filteredProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userDetails={userDetails}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
