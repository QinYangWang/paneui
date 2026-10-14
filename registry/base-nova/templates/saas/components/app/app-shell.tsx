"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  BellIcon,
  BookmarkIcon,
  ChartIcon,
  CreditCardIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  UsersIcon,
} from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarSub,
  SidebarSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/registry/base-nova/ui/animated-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerContent, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { MenuGroup, MenuItem, MenuSeparator } from "@/registry/base-nova/ui/menu"
import { useToast } from "@/registry/base-nova/ui/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"
import { useThemeToggle } from "@/registry/base-nova/ui/theme-toggle"
import { UserMenu } from "@/registry/base-nova/ui/user-menu"
import { WorkspaceSwitcher } from "@/registry/base-nova/ui/workspace-switcher"

import { REQUIRE_AUTH, signOut, useSession } from "../../lib/auth"
import { workspaces } from "../../lib/data"
import { AppLink, routes, useHref, useRoute } from "../../lib/routes"
import { SaasProviders } from "../providers"

/* ───────────────────────── Navigation model ───────────────────────── */

const settingsPages = [
  { href: routes.settings, label: "Profile" },
  { href: routes.settingsAccount, label: "Account" },
  { href: routes.settingsBilling, label: "Billing" },
  { href: routes.settingsTeam, label: "Team" },
  { href: routes.settingsNotifications, label: "Notifications" },
  { href: routes.settingsAppearance, label: "Appearance" },
]

/** Crumb titles for every app route. */
const titles: Record<string, string> = {
  [routes.dashboard]: "Overview",
  [routes.analytics]: "Analytics",
  [routes.customers]: "Customers",
  ...Object.fromEntries(settingsPages.map((p) => [p.href, p.label])),
}

function crumbsFor(route: string) {
  const out: { href: string; label: string }[] = [{ href: routes.dashboard, label: "Dashboard" }]
  if (route.startsWith(routes.settings)) out.push({ href: routes.settings, label: "Settings" })
  if (route !== routes.dashboard) out.push({ href: route, label: titles[route] ?? "Page" })
  else out.push({ href: route, label: "Overview" })
  return out
}

/* ───────────────────────── Shell ───────────────────────── */

/** Dashboard chrome: collapsible sidebar, top bar with breadcrumb and ⌘K search, mobile drawer. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SaasProviders>
      <AuthGate>
        <SidebarProvider className="min-h-svh bg-background text-foreground">
          <Sidebar variant="sidebar" aria-label="App" className="sticky top-0 h-svh self-start max-lg:hidden">
            <AppNav />
          </Sidebar>
          <Shell>{children}</Shell>
        </SidebarProvider>
      </AuthGate>
    </SaasProviders>
  )
}

/** With REQUIRE_AUTH, signed-out visitors go to /login. */
function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const href = useHref()
  React.useEffect(() => {
    if (REQUIRE_AUTH && status === "unauthenticated") router.replace(href(routes.login))
  }, [status, router, href])
  if (REQUIRE_AUTH && status !== "authenticated") return null
  return children
}

function Shell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = React.useState(false)
  const route = useRoute()
  // close the mobile drawer after navigating
  React.useEffect(() => setNavOpen(false), [route])
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <TopBar onOpenNav={() => setNavOpen(true)} />
      <main className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      <Drawer side="left" open={navOpen} onOpenChange={setNavOpen}>
        <DrawerContent className="w-72">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <SidebarProvider shortcut={null} className="min-h-0 flex-1 [--sidebar-width:100%]">
            <Sidebar variant="sidebar" collapsible="none" aria-label="App" panelClassName="border-r-0 bg-transparent">
              <AppNav />
            </Sidebar>
          </SidebarProvider>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

/* ───────────────────────── Sidebar ───────────────────────── */

function AppNav() {
  const route = useRoute()
  const { state } = useSidebar()
  const toast = useToast()
  const [workspace, setWorkspace] = React.useState(workspaces[0].id)
  const link = (href: string) => <AppLink href={href} />
  const inSettings = route.startsWith(routes.settings)

  return (
    <>
      <SidebarHeader>
        <WorkspaceSwitcher
          workspaces={workspaces}
          value={workspace}
          onValueChange={(id) => {
            setWorkspace(id)
            toast.add({ title: `Switched to ${workspaces.find((w) => w.id === id)?.name}`, type: "success" })
          }}
          onCreate={() => toast.add({ title: "New workspace", description: "Hook this up to your create-workspace flow." })}
          collapsed={state === "collapsed"}
        />
      </SidebarHeader>
      <SidebarContent className="scrollbar-hover">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarItem icon={<HomeIcon />} label="Overview" isActive={route === routes.dashboard} render={link(routes.dashboard)} />
            <SidebarItem icon={<ChartIcon />} label="Analytics" isActive={route === routes.analytics} render={link(routes.analytics)} />
            <SidebarItem icon={<UsersIcon />} label="Customers" badge={64} isActive={route === routes.customers} render={link(routes.customers)} />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" defaultOpen={inSettings}>
              <SidebarSub>
                {settingsPages.map((p) => (
                  <SidebarSubItem key={p.href} isActive={route === p.href} render={link(p.href)}>
                    {p.label}
                  </SidebarSubItem>
                ))}
              </SidebarSub>
            </SidebarItem>
            <SidebarItem icon={<BookmarkIcon />} label="Pricing page" render={link(routes.pricing)} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AccountMenu collapsed={state === "collapsed"} />
      </SidebarFooter>
    </>
  )
}

/** Avatar + name at the foot of the sidebar: profile, billing, theme, sign out. */
function AccountMenu({ collapsed }: { collapsed: boolean }) {
  const { user } = useSession()
  const router = useRouter()
  const href = useHref()
  const { theme, toggle } = useThemeToggle()
  if (!user) return null
  return (
    <UserMenu name={user.name} email={user.email} collapsed={collapsed}>
      <MenuGroup>
        <MenuItem render={<AppLink href={routes.settings} />}>
          <UserIcon />
          Profile
        </MenuItem>
        <MenuItem render={<AppLink href={routes.settingsBilling} />}>
          <CreditCardIcon />
          Billing
        </MenuItem>
        <MenuItem render={<AppLink href={routes.settingsAppearance} />}>
          <PaletteIcon />
          Appearance
        </MenuItem>
        <MenuItem closeOnClick={false} onClick={() => toggle()}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuItem
        variant="destructive"
        onClick={async () => {
          await signOut()
          router.push(href(routes.login))
        }}
      >
        <LogOutIcon />
        Sign out
      </MenuItem>
    </UserMenu>
  )
}

/* ───────────────────────── Top bar ───────────────────────── */

function TopBar({ onOpenNav }: { onOpenNav: () => void }) {
  const route = useRoute()
  const router = useRouter()
  const href = useHref()
  const toast = useToast()
  const { toggle } = useThemeToggle()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const crumbs = crumbsFor(route)

  const items = React.useMemo<CommandPaletteItem[]>(() => {
    const go = (to: string) => () => router.push(href(to))
    return [
      { id: "invite", label: "Invite teammates", group: "Actions", icon: UsersIcon, onSelect: go(routes.settingsTeam) },
      { id: "add-customer", label: "Add customer", group: "Actions", icon: PlusIcon, onSelect: () => toast.add({ title: "Add customer", description: "Wire this to your create flow." }) },
      { id: "theme", label: "Toggle dark mode", group: "Actions", icon: MoonIcon, keywords: ["theme", "light", "dark"], onSelect: () => toggle() },
      { id: "overview", label: "Overview", group: "Go to", icon: HomeIcon, shortcut: ["G", "O"], onSelect: go(routes.dashboard) },
      { id: "analytics", label: "Analytics", group: "Go to", icon: ChartIcon, shortcut: ["G", "A"], onSelect: go(routes.analytics) },
      { id: "customers", label: "Customers", group: "Go to", icon: UsersIcon, shortcut: ["G", "C"], onSelect: go(routes.customers) },
      ...settingsPages.map((p) => ({
        id: `settings-${p.label}`,
        label: `Settings: ${p.label}`,
        group: "Settings",
        icon: SettingsIcon,
        onSelect: go(p.href),
      })),
      { id: "home", label: "Marketing site", group: "Help", icon: BookmarkIcon, onSelect: go(routes.home) },
    ]
  }, [router, href, toast, toggle])

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
          {crumbs.map((c, i) => (
            <React.Fragment key={c.href + i}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {i === crumbs.length - 1 ? (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<AppLink href={c.href} />}>{c.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <span className="truncate text-sm font-medium sm:hidden">{crumbs[crumbs.length - 1].label}</span>

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
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Notifications"
                onClick={() => toast.add({ title: "You're all caught up", description: "No new notifications." })}
              />
            }
          >
            <BellIcon />
          </TooltipTrigger>
          <TooltipContent side="bottom">Notifications</TooltipContent>
        </Tooltip>
      </div>

      <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search pages, customers, settings…" />
    </header>
  )
}
