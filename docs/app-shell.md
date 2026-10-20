# App Shell

> App frame with a collapsible sidebar and an inset content panel.

Page: https://paneui.dev/docs/app-shell/

## Installation

```bash
npx shadcn@latest add @paneui/app-shell
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/app-shell.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/animated-sidebar`, `@paneui/drawer`, `@paneui/menu`, `@paneui/separator`.

## Usage

```tsx
import { AppShell, AppShellInsetHeader, AppShellMain, AppShellSidebar, AppShellSwitcher } from "@/components/ui/app-shell"
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarMenu } from "@/components/ui/animated-sidebar"
```

```tsx
<AppShell>
  <AppShellSidebar>
    <SidebarHeader>
      <AppShellSwitcher name="Acme" description="Business" avatar={<Avatar shape="rounded">…</Avatar>}>
        <MenuItem>New team</MenuItem>
      </AppShellSwitcher>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarItem icon={<HomeIcon />} label="Home" isActive />
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <UserMenu name="Dana Chen" email="dana@acme.dev">…</UserMenu>
    </SidebarFooter>
  </AppShellSidebar>
  <AppShellMain>
    <AppShellInsetHeader>
      <Breadcrumb>…</Breadcrumb>
    </AppShellInsetHeader>
    <div className="p-4">…</div>
  </AppShellMain>
</AppShell>
```

## Composition

```text
AppShell
├── AppShellHeader (optional, header-first)
│   └── AppShellTrigger
├── AppShellSidebar
│   ├── SidebarHeader → AppShellSwitcher
│   ├── SidebarContent
│   └── SidebarFooter → UserMenu
└── AppShellMain
    └── AppShellInsetHeader
        └── AppShellTrigger, Separator, your breadcrumb
```

## Examples

### Header First

```tsx
"use client"

import * as React from "react"

import { CalendarDaysIcon, ChartIcon, FolderIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
} from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

type NavItem = { id: string; label: string; icon: React.ComponentType; badge?: number }

const MAIN: NavItem[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon, badge: 8 },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
]
const WORKSPACE: NavItem[] = [
  { id: "projects", label: "Projects", icon: FolderIcon },
  { id: "reports", label: "Reports", icon: ChartIcon },
]
const ALL: NavItem[] = [...MAIN, ...WORKSPACE, { id: "settings", label: "Settings", icon: SettingsIcon }]

export default function AppShellHeaderFirst() {
  const [active, setActive] = React.useState("inbox")
  const item = (i: NavItem) => (
    <SidebarItem
      key={i.id}
      icon={<i.icon />}
      label={i.label}
      badge={i.badge}
      isActive={active === i.id}
      onClick={() => setActive(i.id)}
    />
  )

  return (
    <AppShell variant="window" shortcut={null} className="h-104 w-full max-w-3xl">
      <AppShellHeader>
        <IconChip tone="solid" size="sm">
          <span className="text-ui-2xs font-semibold">N</span>
        </IconChip>
        <span className="text-ui font-semibold">Northwind</span>
        <Button variant="ghost" size="icon-sm" aria-label="Search" className="ml-auto">
          <SearchIcon />
        </Button>
      </AppShellHeader>
      <AppShellSidebar aria-label="Workspace" mobileTitle="Northwind">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>{MAIN.map(item)}</SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>{WORKSPACE.map(item)}</SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>{item(ALL[ALL.length - 1])}</SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-balance text-lg font-semibold">{ALL.find((i) => i.id === active)?.label}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-xl bg-secondary" />
            <div className="h-24 rounded-xl bg-secondary" />
            <div className="col-span-2 h-40 rounded-xl bg-secondary" />
          </div>
        </div>
      </AppShellMain>
    </AppShell>
  )
}
```

### Sidebar

```tsx
"use client"

import * as React from "react"

import { CalendarDaysIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarMenu } from "@/registry/base-nova/ui/animated-sidebar"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

const NAV = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
]

export default function AppShellSidebarLayout() {
  const [active, setActive] = React.useState("inbox")
  return (
    <AppShell variant="window" layout="sidebar" shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader>
        <IconChip tone="solid" size="sm">
          <span className="text-ui-2xs font-semibold">N</span>
        </IconChip>
        <span className="text-ui font-semibold">Northwind</span>
      </AppShellHeader>
      <AppShellSidebar aria-label="Workspace">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {NAV.map((n) => (
                <SidebarItem key={n.id} icon={<n.icon />} label={n.label} isActive={active === n.id} onClick={() => setActive(n.id)} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" isActive={active === "settings"} onClick={() => setActive("settings")} />
          </SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="grid grid-cols-2 gap-3 p-6">
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="col-span-2 h-32 rounded-xl bg-secondary" />
        </div>
      </AppShellMain>
    </AppShell>
  )
}
```

### Floating

```tsx
"use client"

import * as React from "react"

import { CalendarDaysIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarMenu } from "@/registry/base-nova/ui/animated-sidebar"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

const NAV = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "calendar", label: "Calendar", icon: CalendarDaysIcon },
]

export default function AppShellFloatingLayout() {
  const [active, setActive] = React.useState("inbox")
  return (
    <AppShell variant="window" layout="floating" shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader>
        <IconChip tone="solid" size="sm">
          <span className="text-ui-2xs font-semibold">N</span>
        </IconChip>
        <span className="text-ui font-semibold">Northwind</span>
      </AppShellHeader>
      <AppShellSidebar aria-label="Workspace">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {NAV.map((n) => (
                <SidebarItem key={n.id} icon={<n.icon />} label={n.label} isActive={active === n.id} onClick={() => setActive(n.id)} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" isActive={active === "settings"} onClick={() => setActive("settings")} />
          </SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="grid grid-cols-2 gap-3 p-6">
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="col-span-2 h-32 rounded-xl bg-secondary" />
        </div>
      </AppShellMain>
    </AppShell>
  )
}
```

### Top Nav

```tsx
"use client"

import * as React from "react"

import { AppShell, AppShellHeader, AppShellMain } from "@/registry/base-nova/ui/app-shell"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/registry/base-nova/ui/navigation-menu"

const TABS = ["Overview", "Projects", "Reports"]

export default function AppShellTopNav() {
  const [active, setActive] = React.useState("Overview")
  return (
    <AppShell variant="window" shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader
        leading={
          <IconChip tone="solid" size="sm">
            <span className="text-ui-2xs font-semibold">N</span>
          </IconChip>
        }
      >
        <span className="text-ui font-semibold">Northwind</span>
        <NavigationMenu className="ms-4">
          <NavigationMenuList>
            {TABS.map((t) => (
              <NavigationMenuItem key={t}>
                <NavigationMenuLink
                  variant="tab"
                  active={active === t}
                  aria-current={active === t ? "page" : undefined}
                  href={`#${t.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(t)
                  }}
                >
                  {t}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </AppShellHeader>
      <AppShellMain>
        <div className="grid grid-cols-3 gap-3 p-6">
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="h-20 rounded-xl bg-secondary" />
          <div className="col-span-3 h-32 rounded-xl bg-secondary" />
        </div>
      </AppShellMain>
    </AppShell>
  )
}
```

### Icon Rail

```tsx
import { CalendarDaysIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarMenu } from "@/registry/base-nova/ui/animated-sidebar"

export default function AppShellIconRail() {
  return (
    <AppShell variant="window" defaultOpen={false} shortcut={null} className="h-80 w-full max-w-xl">
      <AppShellHeader>
        <span className="text-ui font-semibold">Inbox</span>
      </AppShellHeader>
      <AppShellSidebar aria-label="Mail">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" />
              <SidebarItem icon={<InboxIcon />} label="Inbox" isActive />
              <SidebarItem icon={<CalendarDaysIcon />} label="Calendar" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" />
          </SidebarMenu>
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col gap-2 p-6">
          {["Quarterly review", "Design sync notes", "Invoice 0142"].map((t) => (
            <div key={t} className="flex h-10 items-center rounded-lg px-3 text-ui hover:bg-secondary">
              {t}
            </div>
          ))}
        </div>
      </AppShellMain>
    </AppShell>
  )
}
```

### Header Actions

```tsx
"use client"

import * as React from "react"

import { BellIcon, FolderIcon, HomeIcon, SearchIcon } from "@/components/icons"
import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/registry/base-nova/ui/app-shell"
import { SidebarContent, SidebarGroup, SidebarItem, SidebarMenu } from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

const TABS = ["Overview", "Activity", "Settings"]

export default function AppShellHeaderActions() {
  const [open, setOpen] = React.useState(true)
  const [tab, setTab] = React.useState("Overview")

  return (
    <AppShell variant="window" open={open} onOpenChange={setOpen} shortcut={null} className="h-80 w-full max-w-2xl">
      <AppShellHeader>
        <span className="text-ui font-semibold">Atlas</span>
        <nav aria-label="Project" className="ml-2 flex items-center gap-0.5 max-sm:hidden">
          {TABS.map((t) => (
            <Button key={t} variant={tab === t ? "secondary" : "ghost"} size="sm" aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)}>
              {t}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon-sm" aria-label="Search">
            <SearchIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Notifications">
            <BellIcon />
          </Button>
        </div>
      </AppShellHeader>
      <AppShellSidebar aria-label="Projects">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" />
              <SidebarItem icon={<FolderIcon />} label="Atlas" isActive />
              <SidebarItem icon={<FolderIcon />} label="Beacon" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </AppShellSidebar>
      <AppShellMain>
        <div className="flex flex-col items-start gap-3 p-6">
          <h2 className="text-balance text-lg font-semibold">{tab}</h2>
          <Button variant="secondary" size="sm" onClick={() => setOpen(!open)}>
            {open ? "Collapse to rail" : "Expand sidebar"}
          </Button>
        </div>
      </AppShellMain>
    </AppShell>
  )
}
```

## Sidebar first or header first

Without a direct `AppShellHeader` child the sidebar runs the full height and the panel sits 3px below the top, with `AppShellInsetHeader` as its first row. With one, the header spans the top and the sidebar and panel start below it. The choice is made in CSS from the children, so it renders right on the server.

## Alignment

The header's leading column is exactly `--sidebar-width-icon` wide, so the trigger sits on the rail's icon column whether the sidebar is expanded or folded. Header content starts on the sidebar's label column (`--app-shell-label-inset`), so a title or logo lines up with the nav labels. Change the rail width on `AppShell` with `style={{ "--sidebar-width-icon": "4rem" }}` and both follow. The floating rail grows by its 3px gutter and the trigger moves with it, so the icons stay on the trigger's column. `AppShellSwitcher` puts a 32px avatar on the same column.

## Page and window

`variant="page"` fills the viewport: the header and the rail stick, the panel scrolls with the page and a sticky cap keeps its rounded top under the header, so start your content at least 1rem below the panel's top. `variant="window"` is a bounded frame (give it a height) whose panel scrolls on its own; the panel's radius is the frame's radius minus its 3px gap.

## Mobile

Below the `lg` breakpoint the sidebar's children move into a left drawer and `AppShellTrigger` opens it. Following a link inside the drawer closes it; disclosure rows stay open. Lead `mobileTitle` with an 18px mark so it lines up with the nav icons.

## Keyboard

⌘/Ctrl + B toggles the rail; change the key with `shortcut` or pass `null` to turn it off. The trigger sets `aria-expanded` for the rail on desktop and for the drawer on mobile.

## Related

The sidebar parts come from [Animated Sidebar](https://paneui.dev/docs/animated-sidebar).

## API Reference

### AppShell

The band. Holds the sidebar state and lays out the header, sidebar and panel on one grid. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"page" \| "window"` | `"page"` | `page` fills the viewport and sticks to it; `window` is a rounded frame whose panel scrolls inside. |
| `layout` | `"inset" \| "sidebar" \| "floating"` | `"inset"` | `inset` puts the page in a rounded panel on the band; `sidebar` is flush, with hairlines under the header and beside the rail; `floating` makes the rail a rounded panel of its own. |
| `open` | `boolean` | — | Controlled expanded state of the rail. |
| `defaultOpen` | `boolean` | `true` | Initial expanded state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the rail expands or collapses. |
| `shortcut` | `string \| null` | `"b"` | Key that toggles the rail with ⌘/Ctrl. `null` disables it. |

| Data attribute | Description |
| --- | --- |
| `data-state` | `expanded` or `collapsed`. |
| `data-variant` | `page` or `window`. |
| `data-layout` | `inset`, `sidebar` or `floating`. |

### AppShellHeader

The top row. Children start on the sidebar's label column. Also accepts every prop of `header`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `leading` | `ReactNode` | `<AppShellTrigger />` | Content of the rail-wide leading column. `null` leaves it empty. |

### AppShellTrigger

Toggles the rail on desktop and opens the drawer below `lg`. Also accepts every prop of `button`.

| Data attribute | Description |
| --- | --- |
| `data-state` | `expanded` or `collapsed`. |

### AppShellSidebar

The rail sidebar on desktop, a left drawer below `lg`. Takes the animated sidebar's parts as children. Also accepts every prop of [Sidebar](/docs/animated-sidebar).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mobileTitle` | `ReactNode` | `"Navigation"` | Title of the mobile drawer. |
| `aria-label` | `string` | `"Sidebar"` | Accessible name of the sidebar and the drawer's sidebar. |

### AppShellMain

The inset content panel. Bring your own padding. Also accepts every prop of `main`.

### AppShellInsetHeader

The panel's first row in a sidebar-first shell. Sticks to the panel's top. Also accepts every prop of `header`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `boolean` | `true` | Lead with `AppShellTrigger` and a vertical divider. |

### AppShellSwitcher

The team or workspace at the top of the sidebar, opening a menu of the others. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` (required) | `ReactNode` | — | The current team. |
| `description` | `ReactNode` | — | Second line, such as the plan. |
| `avatar` (required) | `ReactNode` | — | A 32px `Avatar shape="rounded"`; it stays visible in the icon rail. |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Menu side. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Menu alignment. |
| `children` | `ReactNode` | — | Menu contents. |

### useAppShell

Read the shell state inside `AppShell`. Also returns everything `useSidebar` does.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"page" \| "window"` | — | The shell variant. |
| `isMobile` | `boolean` | — | Whether the viewport is below `lg` (the sidebar is a drawer). |
| `mobileOpen` | `boolean` | — | Whether the drawer is open. |
| `setMobileOpen` | `(open: boolean) => void` | — | Open or close the drawer. |
