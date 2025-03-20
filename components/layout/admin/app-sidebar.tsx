"use client"

import * as React from "react"

import {NavMain} from "@/components/layout/admin/nav-main"
import {NavProjects} from "@/components/layout/admin/nav-projects"
import {NavUser} from "@/components/layout/admin/nav-user"
import {TeamSwitcher} from "@/components/layout/admin/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {SidebarMenuList} from "@/utils/sidebarMenuUtils";


// This is sample data.
const data = SidebarMenuList;


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
