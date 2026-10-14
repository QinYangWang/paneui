"use client"

import * as React from "react"

import {
  BellIcon,
  BookmarkIcon,
  ChartIcon,
  FolderIcon,
  HomeIcon,
  KeyIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  ServerIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { SidebarTrigger } from "@/registry/base-nova/ui/animated-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuShortcut, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { Avatar } from "./avatar"

export function TopBar({
  section,
  page,
  onNavigate,
  onOpenNav,
  onOpenSettings,
}: {
  section: string
  page: string
  onNavigate: (id: string) => void
  onOpenNav: () => void
  onOpenSettings: () => void
}) {
  const [searchOpen, setSearchOpen] = React.useState(false)

  const items = React.useMemo<CommandPaletteItem[]>(
    () => [
      { id: "new-project", label: "New project", group: "Actions", icon: PlusIcon, shortcut: ["⌘", "N"] },
      { id: "invite", label: "Invite teammates", group: "Actions", icon: UsersIcon },
      { id: "key", label: "Create API key", group: "Actions", icon: KeyIcon, keywords: ["token", "secret"] },
      { id: "overview", label: "Overview", group: "Go to", icon: HomeIcon, shortcut: ["G", "O"], onSelect: () => onNavigate("overview") },
      { id: "usage", label: "Usage", group: "Go to", icon: ChartIcon, shortcut: ["G", "U"], onSelect: () => onNavigate("usage") },
      { id: "runs", label: "Agent runs", group: "Go to", icon: ServerIcon, description: "38 running", onSelect: () => onNavigate("agents:runs") },
      { id: "projects", label: "Projects", group: "Go to", icon: FolderIcon, onSelect: () => onNavigate("projects") },
      { id: "docs", label: "API reference", group: "Help", icon: BookmarkIcon, keywords: ["docs"] },
      { id: "settings", label: "Workspace settings", group: "Help", icon: SettingsIcon, shortcut: ["⌘", ","], onSelect: onOpenSettings },
    ],
    [onNavigate, onOpenSettings]
  )

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur sm:px-4">
      <Tooltip>
        <TooltipTrigger render={<SidebarTrigger className="max-lg:hidden" />} />
        <TooltipContent side="bottom">Toggle sidebar · ⌘B</TooltipContent>
      </Tooltip>
      <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open navigation" onClick={onOpenNav}>
        <MenuIcon />
      </Button>
      <Breadcrumb className="min-w-0 max-sm:hidden">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">acme-prod</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{section}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <span className="truncate text-sm font-medium sm:hidden">{page}</span>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          aria-keyshortcuts="Meta+K"
          // eslint-disable-next-line shadcn/no-restyle -- header search morphs from an icon button (below md) to a 256px field (md+)
          className="w-8 px-0 text-muted-foreground md:w-64 md:justify-start md:px-3"
        >
          <SearchIcon />
          <span className="hidden md:inline">Search or run a command…</span>
          <kbd className="ml-auto hidden rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground shadow-chip md:inline">⌘K</kbd>
        </Button>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Notifications" />}>
            <BellIcon />
          </TooltipTrigger>
          <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Workspace settings" onClick={onOpenSettings} />}>
            <SettingsIcon />
          </TooltipTrigger>
          <TooltipContent side="bottom">Workspace settings</TooltipContent>
        </Tooltip>
        <ThemeToggle className="size-8" />
        <Menu>
          <MenuTrigger
            render={<Button variant="ghost" size="icon-sm" aria-label="Account menu" />}
          >
            <Avatar name="Dana Chen" size="sm" />
          </MenuTrigger>
          <MenuContent align="end" className="w-56">
            <MenuGroup>
              <MenuLabel>dana@acme.dev</MenuLabel>
              <MenuItem>
                <UserIcon />
                Profile
                <MenuShortcut>⌘P</MenuShortcut>
              </MenuItem>
              <MenuItem onClick={onOpenSettings}>
                <SettingsIcon />
                Settings
                <MenuShortcut>⌘,</MenuShortcut>
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem>
              <LogOutIcon />
              Sign out
            </MenuItem>
          </MenuContent>
        </Menu>
      </div>

      <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search projects, runs, settings…" />
    </header>
  )
}
