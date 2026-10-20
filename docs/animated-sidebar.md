# Animated Sidebar

> App navigation sidebar that folds into an icon rail.

Page: https://paneui.dev/docs/animated-sidebar/

## Installation

```bash
npx shadcn@latest add @paneui/animated-sidebar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/animated-sidebar.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/tooltip`.

## Usage

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/animated-sidebar"
```

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarItem icon={<HomeIcon />} label="Home" isActive />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>
```

## Composition

```text
SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   │   └── SidebarHideCollapsed
│   ├── SidebarContent
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel
│   │       └── SidebarMenu
│   │           └── SidebarItem
│   │               └── SidebarSub
│   │                   └── SidebarSubItem
│   └── SidebarFooter
└── SidebarInset
    └── SidebarTrigger
```

## Examples

### Icon Rail

```tsx
import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/base-nova/ui/animated-sidebar"

export default function AnimatedSidebarCollapsed() {
  return (
    <SidebarProvider defaultOpen={false} shortcut={null} className="h-80 w-full max-w-xl gap-3">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" />
              <SidebarItem icon={<InboxIcon />} label="Inbox" badge={4} isActive />
              <SidebarItem icon={<CalendarDaysIcon />} label="Calendar" />
              <SidebarItem icon={<ChartIcon />} label="Reports" tooltip="Weekly reports" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarItem icon={<SettingsIcon />} label="Settings" />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="items-start gap-2 rounded-2xl bg-muted/50 p-3 shadow-well">
        <SidebarTrigger />
        <p className="text-sm text-muted-foreground">Starts as an icon rail. Hover an icon for its tooltip.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Flush, Right Side

```tsx
import { BellIcon, ChatIcon, FileIcon, UsersIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/base-nova/ui/animated-sidebar"

export default function AnimatedSidebarFlushRight() {
  return (
    <SidebarProvider shortcut={null} className="h-80 w-full max-w-xl overflow-hidden rounded-2xl bg-background shadow-raised">
      <Sidebar side="right" variant="sidebar">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Details</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarItem icon={<UsersIcon />} label="People" badge={6} isActive />
              <SidebarItem icon={<ChatIcon />} label="Comments" badge={12} />
              <SidebarItem icon={<FileIcon />} label="Files" />
              <SidebarItem icon={<BellIcon />} label="Activity" />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Q4 launch plan</span>
          <SidebarTrigger />
        </div>
        <p className="text-sm text-pretty text-muted-foreground">
          The panel sits on the right, flush with a hairline edge instead of a floating card.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { FolderIcon, HomeIcon, SearchIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarSub,
  SidebarSubItem,
} from "@/registry/base-nova/ui/animated-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

const FOLDERS = ["Receipts", "Contracts", "Travel"]

export default function AnimatedSidebarControlled() {
  const [open, setOpen] = React.useState(true)
  const [foldersOpen, setFoldersOpen] = React.useState(true)
  const [active, setActive] = React.useState("Contracts")

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} shortcut={null} className="h-80 w-full max-w-xl gap-3">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} label="Home" isActive={active === "home"} onClick={() => setActive("home")} />
              <SidebarItem icon={<SearchIcon />} label="Search" isActive={active === "search"} onClick={() => setActive("search")} />
              <SidebarItem icon={<FolderIcon />} label="Documents" open={foldersOpen} onOpenChange={setFoldersOpen}>
                <SidebarSub>
                  {FOLDERS.map((f) => (
                    <SidebarSubItem key={f} isActive={active === f} onClick={() => setActive(f)}>
                      {f}
                    </SidebarSubItem>
                  ))}
                </SidebarSub>
              </SidebarItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="gap-2 rounded-2xl bg-muted/50 p-3 shadow-well">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => setOpen(!open)}>
            {open ? "Collapse to rail" : "Expand sidebar"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setFoldersOpen(!foldersOpen)}>
            {foldersOpen ? "Fold Documents" : "Unfold Documents"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Fold Documents and the active pill moves onto its parent row.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

### Non-collapsible Links

```tsx
import { BookmarkIcon, FileIcon, GlobeIcon, LockIcon, StarIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
} from "@/registry/base-nova/ui/animated-sidebar"

export default function AnimatedSidebarStatic() {
  return (
    <SidebarProvider shortcut={null} className="h-72 w-auto">
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarItem icon={<FileIcon />} label="All notes" href="#all-notes" isActive />
              <SidebarItem icon={<StarIcon />} label="Starred" href="#starred" badge={5} />
              <SidebarItem icon={<BookmarkIcon />} label="Reading list" href="#reading-list" />
              <SidebarItem icon={<GlobeIcon />} label="Published" href="#published" />
              <SidebarItem icon={<LockIcon />} label="Private vault" href="#vault" disabled />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

### RTL

```tsx
"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ChartIcon, FolderIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarSub,
  SidebarSubItem,
  SidebarTrigger,
} from "@/registry/base-nova/ui/animated-sidebar"

const projects = ["أطلس", "منارة", "مذنّب"]

export default function AnimatedSidebarRtl() {
  const [active, setActive] = React.useState("project:منارة")
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-2xl">
        {/* `side="left"` is the start side, so in right-to-left the sidebar sits on the right. */}
        <SidebarProvider shortcut={null} className="h-96 w-full gap-3">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarItem icon={<HomeIcon />} label="الرئيسية" isActive={active === "home"} onClick={() => setActive("home")} />
                  <SidebarItem icon={<InboxIcon />} label="الوارد" badge={8} isActive={active === "inbox"} onClick={() => setActive("inbox")} />
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>مساحة العمل</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarItem icon={<FolderIcon />} label="المشاريع" defaultOpen>
                    <SidebarSub>
                      {projects.map((p) => (
                        <SidebarSubItem key={p} isActive={active === `project:${p}`} onClick={() => setActive(`project:${p}`)}>
                          {p}
                        </SidebarSubItem>
                      ))}
                    </SidebarSub>
                  </SidebarItem>
                  <SidebarItem icon={<ChartIcon />} label="التحليلات" isActive={active === "insights"} onClick={() => setActive("insights")} />
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarItem icon={<SettingsIcon />} label="الإعدادات" isActive={active === "settings"} onClick={() => setActive("settings")} />
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="gap-3 rounded-2xl bg-muted/50 p-3 shadow-well">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-medium">{active.startsWith("project:") ? active.slice(8) : "لوحة التحكم"}</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3">
              <div className="rounded-xs bg-card shadow-raised" />
              <div className="rounded-xs bg-card shadow-raised" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </DirectionProvider>
  )
}
```

## Keyboard

⌘/Ctrl + B toggles the sidebar; change the key with `shortcut` or pass `null` to turn it off. All sidebars share one listener, so with several on a page, only the most recently mounted, focused or clicked one toggles. Disclosure items set `aria-expanded` and `aria-controls`.

## Related

See also [AI Sidebar](https://paneui.dev/docs/ai-sidebar).

## API Reference

### SidebarProvider

Holds the open state and lays out the sidebar and inset in a row. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled expanded state. |
| `defaultOpen` | `boolean` | `true` | Initial expanded state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the sidebar expands or collapses. |
| `shortcut` | `string \| null` | `"b"` | Key that toggles with ⌘/Ctrl. Only the most recently mounted, focused or clicked sidebar responds. `null` disables the shortcut. |

| Data attribute | Description |
| --- | --- |
| `data-state` | `expanded` or `collapsed`. |

### Sidebar

The panel. Its width springs between `--sidebar-width` (15rem) and `--sidebar-width-icon` (3.75rem). Also accepts every prop of [motion.aside](https://motion.dev/docs/react-motion-component).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"left" \| "right"` | `"left"` | Which side of the inset it sits on. |
| `variant` | `"floating" \| "sidebar"` | `"floating"` | `floating` is a raised rounded card; `sidebar` sits flush with a hairline edge. |
| `collapsible` | `"icon" \| "none"` | `"icon"` | `icon` folds into an icon rail; `none` never collapses. |
| `panelClassName` | `string` | — | Class for the inner panel surface. |
| `aria-label` | `string` | `"Sidebar"` | Accessible name of the aside. |

| Data attribute | Description |
| --- | --- |
| `data-state` | `expanded` or `collapsed`. |
| `data-variant` | `floating` or `sidebar`. |
| `data-side` | `left` or `right`. |

### SidebarHeader

Also accepts every prop of `div`.

### SidebarContent

Scrolling middle section. Also accepts every prop of `div`.

### SidebarFooter

Bottom section with a hairline divider. Also accepts every prop of `div`.

### SidebarGroup

Also accepts every prop of `div`.

### SidebarGroupLabel

Small caps heading; folds into a short rule in the icon rail. Also accepts every prop of `div`.

### SidebarMenu

Also accepts every prop of `ul`.

### SidebarItem

A row. With a `SidebarSub` child it becomes a disclosure. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `ReactNode` | — | Row text; fades out in the rail. |
| `icon` | `ReactNode` | — | Leading icon, 16px. |
| `tooltip` | `string` | — | Tooltip in the icon rail. Defaults to `label` when it is a string. |
| `badge` | `ReactNode` | — | Trailing count pill. |
| `isActive` | `boolean` | `false` | Show the active pill and set `aria-current="page"`. |
| `href` | `string` | — | Render as a link. |
| `disabled` | `boolean` | — | Dim and ignore clicks. |
| `open` | `boolean` | — | Controlled disclosure state. |
| `defaultOpen` | `boolean` | `false` | Initial disclosure state. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the disclosure opens or closes. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the rendered element, e.g. a router `Link`. |
| `itemClassName` | `string` | — | Class for the wrapping `li`. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present while the pill sits on this row (itself active, or a hidden active child). |

### SidebarSub

Nested list of a disclosure item; folds away in the rail. Also accepts every prop of [motion.ul](https://motion.dev/docs/react-motion-component).

| Data attribute | Description |
| --- | --- |
| `data-state` | `open` or `closed`. |

### SidebarSubItem

Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isActive` | `boolean` | `false` | Show the active pill. |
| `href` | `string` | — | Render as a link. |
| `disabled` | `boolean` | — | Dim and ignore clicks. |
| `icon` | `ReactNode` | — | Leading icon. |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the rendered element. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present when active. |

### SidebarTrigger

Round button that toggles the sidebar. Shows `SidebarIcon` unless you pass children. Also accepts every prop of `button`.

| Data attribute | Description |
| --- | --- |
| `data-state` | `expanded` or `collapsed`. |

### SidebarInset

The main content area beside the sidebar. Also accepts every prop of `main`.

### SidebarHideCollapsed

Wrapper for header or footer content that hides in the icon rail. Also accepts every prop of `div`.

### useSidebar

Read the sidebar state inside `SidebarProvider`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Whether it is expanded. |
| `setOpen` | `(open: boolean) => void` | — | Set the state. |
| `toggle` | `() => void` | — | Flip the state. |
| `state` | `"expanded" \| "collapsed"` | — | Same as `open`, as a string. |
| `reduce` | `boolean` | — | Whether reduced motion is on. |
| `pillId` | `string` | — | Shared layout id of the active pill. |
