"use client"

import * as React from "react"

import {
  BookmarkIcon,
  BotIcon,
  ChartIcon,
  CheckIcon,
  FolderIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  TerminalSquareIcon,
  UserIcon,
} from "@/components/icons"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
  SidebarSub,
  SidebarSubItem,
} from "@/registry/base-nova/ui/animated-sidebar"
import { AppShell, AppShellInsetHeader, AppShellMain, AppShellSidebar, AppShellSwitcher } from "@/registry/base-nova/ui/app-shell"
import { Avatar, AvatarFallback } from "@/registry/base-nova/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { MenuGroup, MenuItem, MenuLabel, MenuSeparator } from "@/registry/base-nova/ui/menu"
import { UserMenu } from "@/registry/base-nova/ui/user-menu"

const TEAMS = [
  { id: "northwind", name: "Northwind", plan: "Business" },
  { id: "halcyon", name: "Halcyon Labs", plan: "Team" },
  { id: "fernhill", name: "Fernhill", plan: "Free" },
]

const PLATFORM = [
  { id: "playground", label: "Playground", icon: TerminalSquareIcon, pages: ["History", "Starred", "Settings"] },
  { id: "agents", label: "Agents", icon: BotIcon, pages: ["Reviewer", "Triage", "Release notes"] },
  { id: "guides", label: "Guides", icon: BookmarkIcon, pages: ["Introduction", "Get started", "Changelog"] },
  { id: "settings", label: "Settings", icon: SettingsIcon, pages: ["General", "Team", "Billing"] },
]

const PROJECTS = [
  { id: "design", label: "Design system", icon: FolderIcon },
  { id: "growth", label: "Growth", icon: ChartIcon },
]

export default function AppShellDemo() {
  const [team, setTeam] = React.useState(TEAMS[0])
  const [page, setPage] = React.useState({ section: "Playground", title: "History" })

  return (
    <AppShell variant="window" shortcut={null} className="h-120 w-full max-w-3xl">
      <AppShellSidebar aria-label="Workspace" mobileTitle={team.name}>
        <SidebarHeader>
          <AppShellSwitcher
            name={team.name}
            description={team.plan}
            avatar={
              <Avatar shape="rounded">
                <AvatarFallback>{team.name[0]}</AvatarFallback>
              </Avatar>
            }
          >
            <MenuGroup>
              <MenuLabel>Teams</MenuLabel>
              {TEAMS.map((t) => (
                <MenuItem key={t.id} onClick={() => setTeam(t)}>
                  <span className="min-w-0 flex-1 truncate">{t.name}</span>
                  {t.id === team.id && <CheckIcon />}
                </MenuItem>
              ))}
            </MenuGroup>
            <MenuSeparator />
            <MenuItem>
              <PlusIcon />
              New team
            </MenuItem>
          </AppShellSwitcher>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {PLATFORM.map((s) => (
                <SidebarItem key={s.id} icon={<s.icon />} label={s.label} defaultOpen={s.id === "playground"}>
                  <SidebarSub>
                    {s.pages.map((p) => (
                      <SidebarSubItem
                        key={p}
                        isActive={page.section === s.label && page.title === p}
                        onClick={() => setPage({ section: s.label, title: p })}
                      >
                        {p}
                      </SidebarSubItem>
                    ))}
                  </SidebarSub>
                </SidebarItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {PROJECTS.map((p) => (
                <SidebarItem
                  key={p.id}
                  icon={<p.icon />}
                  label={p.label}
                  isActive={page.section === "Projects" && page.title === p.label}
                  onClick={() => setPage({ section: "Projects", title: p.label })}
                />
              ))}
              <SidebarItem icon={<MoreHorizontalIcon />} label="More" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <UserMenu name="Dana Chen" email="dana@northwind.dev" side="top">
            <MenuGroup>
              <MenuItem>
                <UserIcon />
                Profile
              </MenuItem>
              <MenuItem>
                <SettingsIcon />
                Settings
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem variant="destructive">
              <LogOutIcon className="rtl:-scale-x-100" />
              Sign out
            </MenuItem>
          </UserMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellInsetHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="max-md:hidden">
                <BreadcrumbLink href="#">{page.section}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="max-md:hidden" />
              <BreadcrumbItem>
                <BreadcrumbPage>{page.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AppShellInsetHeader>
        <div className="flex flex-col gap-3 px-3 pb-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-video rounded-xl bg-secondary" />
            <div className="aspect-video rounded-xl bg-secondary" />
            <div className="aspect-video rounded-xl bg-secondary" />
          </div>
          <div className="h-56 rounded-xl bg-secondary" />
        </div>
      </AppShellMain>
    </AppShell>
  )
}
