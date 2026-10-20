"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  BellIcon,
  BookmarkIcon,
  ChartIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  HomeIcon,
  LogOutIcon,
  MoonIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "@paneui/ui/icons"
import { CommandPalette, type CommandPaletteItem } from "@paneui/ui/blocks/command-palette/command-palette"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
} from "@paneui/ui/components/animated-sidebar"
import { AppShell as Frame, AppShellHeader, AppShellMain, AppShellSidebar } from "@paneui/ui/components/app-shell"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@paneui/ui/components/breadcrumb"
import { Button } from "@paneui/ui/components/button"
import { IconChip } from "@paneui/ui/components/icon-chip"
import { Kbd } from "@paneui/ui/components/kbd"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@paneui/ui/components/menu"
import { ThemeToggle, useThemeToggle } from "@paneui/ui/components/theme-toggle"
import { useToast } from "@paneui/ui/components/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@paneui/ui/components/tooltip"
import { UserMenu } from "@paneui/ui/components/user-menu"

import { REQUIRE_AUTH, signOut, useSession } from "../../lib/auth"
import { workspaces } from "../../lib/data"
import { AppLink, routes, useHref, useRoute } from "../../lib/routes"
import { BrandMark, initials, SaasProviders } from "../providers"

/* ───────────────────────── Navigation model ───────────────────────── */

const settingsPages = [
  { href: routes.settings, label: "Profile" },
  { href: routes.settingsAccount, label: "Account" },
  { href: routes.settingsBilling, label: "Billing" },
  { href: routes.settingsTeam, label: "Team" },
  { href: routes.settingsIntegrations, label: "Integrations" },
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
  const out: { href: string; label: string }[] = []
  if (route.startsWith(routes.settings)) out.push({ href: routes.settings, label: "Settings" })
  out.push({ href: route, label: titles[route] ?? "Page" })
  return out
}

/* ───────────────────────── Shell ───────────────────────── */

/**
 * Dashboard chrome on the app shell: a header band with the workspace menu, breadcrumb and
 * ⌘K search, a collapsible sidebar (⌘B; a drawer below lg) and the page in an inset panel.
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SaasProviders>
      <AuthGate>
        <Frame>
          <TopBar />
          <AppShellSidebar aria-label="App" mobileTitle={<BrandMark href={routes.dashboard} />}>
            <AppNav />
          </AppShellSidebar>
          <AppShellMain>
            <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-6 px-4 pt-6 pb-10 sm:px-6 lg:px-8 lg:pt-8">{children}</div>
          </AppShellMain>
        </Frame>
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

/* ───────────────────────── Sidebar ───────────────────────── */

function AppNav() {
  const route = useRoute()
  const link = (href: string) => <AppLink href={href} />
  const inSettings = route.startsWith(routes.settings)

  return (
    <>
      <SidebarContent className="scrollbar-hover">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarItem icon={<HomeIcon />} label="Overview" isActive={route === routes.dashboard} render={link(routes.dashboard)} />
            <SidebarItem icon={<ChartIcon />} label="Analytics" isActive={route === routes.analytics} render={link(routes.analytics)} />
            <SidebarItem icon={<UsersIcon />} label="Customers" badge={64} isActive={route === routes.customers} render={link(routes.customers)} />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" isActive={inSettings} render={link(routes.settings)} />
            <SidebarItem icon={<BookmarkIcon />} label="Pricing page" render={link(routes.pricing)} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </>
  )
}

/* ───────────────────────── Header ───────────────────────── */

/** The current workspace by name; the menu lists the others and "New workspace". */
function WorkspaceMenu() {
  const toast = useToast()
  const [value, setValue] = React.useState(workspaces[0].id)
  const current = workspaces.find((w) => w.id === value) ?? workspaces[0]
  return (
    <Menu>
      <MenuTrigger render={<Button variant="ghost" size="sm" className="-ms-2.5 min-w-0" />}>
        <IconChip tone="solid" size="sm" data-icon="inline-start">
          <span className="text-ui-2xs font-semibold">{initials(current.name)}</span>
        </IconChip>
        <span className="truncate font-semibold">{current.name}</span>
        <ChevronsUpDownIcon data-icon="inline-end" className="text-muted-foreground" />
      </MenuTrigger>
      <MenuContent align="start" className="min-w-56">
        <MenuGroup>
          <MenuLabel>Workspaces</MenuLabel>
          {workspaces.map((w) => (
            <MenuItem
              key={w.id}
              onClick={() => {
                setValue(w.id)
                if (w.id !== value) toast.add({ title: `Switched to ${w.name}`, type: "success" })
              }}
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate">{w.name}</span>
                <span className="truncate text-ui-xs text-muted-foreground">{w.plan}</span>
              </span>
              {w.id === value && <CheckIcon />}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuSeparator />
        <MenuItem onClick={() => toast.add({ title: "New workspace", description: "Hook this up to your create-workspace flow." })}>
          <PlusIcon />
          New workspace
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

/** Avatar in the header: profile, billing, appearance, sign out. */
function AccountMenu() {
  const { user } = useSession()
  const router = useRouter()
  const href = useHref()
  if (!user) return null
  return (
    <UserMenu name={user.name} email={user.email} variant="compact" side="bottom" align="end">
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
      </MenuGroup>
      <MenuSeparator />
      <MenuItem
        variant="destructive"
        onClick={async () => {
          await signOut()
          router.push(href(routes.login))
        }}
      >
        <LogOutIcon className="rtl:-scale-x-100" />
        Sign out
      </MenuItem>
    </UserMenu>
  )
}

function TopBar() {
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
    <AppShellHeader>
      <WorkspaceMenu />
      <span aria-hidden className="text-ui text-fg-tertiary max-sm:hidden">
        /
      </span>
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

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          aria-keyshortcuts="Meta+K"
          // eslint-disable-next-line shadcn/no-restyle -- header search morphs from an icon button (below md) to a 256px field (md+)
          className="me-1 w-7 px-0 text-muted-foreground md:w-60 md:justify-start md:px-2.5"
        >
          <SearchIcon />
          <span className="hidden md:inline">Search or run a command…</span>
          <Kbd className="ml-auto max-md:hidden">⌘K</Kbd>
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
        <ThemeToggle variant="ghost" modes="tri" />
        <AccountMenu />
      </div>

      <CommandPalette items={items} open={searchOpen} onOpenChange={setSearchOpen} placeholder="Search pages, customers, settings…" />
    </AppShellHeader>
  )
}

