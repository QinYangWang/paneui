# Sidebar Nav

> Compact text navigation for docs and settings sidebars.

Page: https://paneui.dev/docs/sidebar-nav/

## Installation

```bash
npx shadcn@latest add @paneui/sidebar-nav
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/sidebar-nav.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/kbd`, `@paneui/locale-provider`.

## Usage

```tsx
import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSearch,
  SidebarNavSection,
} from "@/components/ui/sidebar-nav"
```

```tsx
<SidebarNav>
  <SidebarNavSearch shortcut="⌘K" onClick={openSearch} />
  <SidebarNavContent aria-label="Docs">
    <SidebarNavSection label="Getting started">
      <SidebarNavList>
        <SidebarNavLink href="/docs" active>Introduction</SidebarNavLink>
        <SidebarNavLink href="/docs/installation">Installation</SidebarNavLink>
      </SidebarNavList>
    </SidebarNavSection>
  </SidebarNavContent>
</SidebarNav>
```

## Composition

```text
SidebarNav
├── SidebarNavSearch
├── SidebarNavContent
│   └── SidebarNavSection            label, count, href, active, icon
│       ├── SidebarNavList
│       │   └── SidebarNavLink       active, icon, badge
│       └── SidebarNavSection level="group"
└── SidebarNavFooter
```

## Examples

### Icons

```tsx
import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

const pages = [
  { label: "Overview", icon: <HomeIcon /> },
  { label: "Inbox", icon: <InboxIcon />, active: true },
  { label: "Calendar", icon: <CalendarDaysIcon /> },
  { label: "Reports", icon: <ChartIcon /> },
]

export default function SidebarNavIcons() {
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Workspace" className="pt-3">
          <SidebarNavSection label="Workspace" collapsible={false}>
            <SidebarNavList>
              {pages.map((p) => (
                <SidebarNavLink key={p.label} href="#" icon={p.icon} active={p.active}>
                  {p.label}
                </SidebarNavLink>
              ))}
            </SidebarNavList>
          </SidebarNavSection>
          <SidebarNavSection label="Account" collapsible={false}>
            <SidebarNavList>
              <SidebarNavLink href="#" icon={<SettingsIcon />}>
                Settings
              </SidebarNavLink>
            </SidebarNavList>
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
```

### Icons and Groups

```tsx
"use client"

import * as React from "react"

import { BracesIcon, FileIcon, TerminalIcon } from "@/components/icons"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

/** Rows and group labels without an icon start where the icon rows' text starts. */
export default function SidebarNavIconGroups() {
  const [current, setCurrent] = React.useState("#api-client")
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrent(href)
  }
  const link = (href: string, label: string, icon?: React.ReactNode) => (
    <SidebarNavLink href={href} icon={icon} onClick={go(href)} active={current === href}>
      {label}
    </SidebarNavLink>
  )
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Reference" className="pt-3">
          <SidebarNavSection label="Reference">
            <SidebarNavList>{link("#cli", "CLI", <TerminalIcon />)}</SidebarNavList>
            <SidebarNavSection
              level="group"
              label="API"
              icon={<BracesIcon />}
              labelRender={<a href="#api" onClick={go("#api")} />}
              active={current === "#api"}
            >
              <SidebarNavList>
                {link("#api-client", "Client")}
                {link("#api-server", "Server")}
              </SidebarNavList>
            </SidebarNavSection>
            <SidebarNavSection level="group" label="Guides" labelRender={<a href="#guides" onClick={go("#guides")} />} active={current === "#guides"}>
              <SidebarNavList>{link("#guides-deploy", "Deploy")}</SidebarNavList>
            </SidebarNavSection>
            <SidebarNavList>{link("#output", "Output", <FileIcon />)}</SidebarNavList>
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
```

### Linked Groups

```tsx
"use client"

import * as React from "react"

import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

const groups = [
  { label: "Forms", href: "#forms", pages: ["Button", "Input", "Select"] },
  { label: "Overlays", href: "#overlays", pages: ["Dialog", "Menu", "Popover"] },
]

/** Group labels open their own overview page; the chevron beside them still folds the rows. */
export default function SidebarNavLinkedGroups() {
  const [current, setCurrent] = React.useState("#forms")
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrent(href)
  }
  return (
    <div className="flex h-80 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Components" className="pt-3">
          <SidebarNavSection label="Components" labelRender={<a href="#components" onClick={go("#components")} />} active={current === "#components"}>
            {groups.map((g) => (
              <SidebarNavSection
                key={g.href}
                level="group"
                label={g.label}
                labelRender={<a href={g.href} onClick={go(g.href)} />}
                active={current === g.href}
              >
                <SidebarNavList>
                  {g.pages.map((p) => {
                    const href = `${g.href}-${p.toLowerCase()}`
                    return (
                      <SidebarNavLink key={p} href={href} onClick={go(href)} active={current === href}>
                        {p}
                      </SidebarNavLink>
                    )
                  })}
                </SidebarNavList>
              </SidebarNavSection>
            ))}
          </SidebarNavSection>
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
```

### Remembered Sections

```tsx
"use client"

import * as React from "react"

import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

const KEY = "sidebar-nav-example-collapsed"
const groups = [
  { label: "Guides", pages: ["Quickstart", "Deploy", "Domains"] },
  { label: "Reference", pages: ["CLI", "Config file", "API"] },
]

/** Sections stay folded across visits: the open state lives in localStorage. */
export default function SidebarNavPersisted() {
  const [collapsed, setCollapsed] = React.useState<string[]>([])
  React.useEffect(() => {
    try {
      setCollapsed(JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[])
    } catch {
      // storage can be unavailable
    }
  }, [])
  const setOpen = (label: string, open: boolean) => {
    const next = open ? collapsed.filter((l) => l !== label) : [...collapsed, label]
    setCollapsed(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      // storage can be unavailable
    }
  }
  return (
    <div className="flex h-72 w-60 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <SidebarNav>
        <SidebarNavContent aria-label="Docs" className="pt-3">
          {groups.map((g) => (
            <SidebarNavSection key={g.label} label={g.label} open={!collapsed.includes(g.label)} onOpenChange={(o) => setOpen(g.label, o)}>
              <SidebarNavList>
                {g.pages.map((p) => (
                  <SidebarNavLink key={p} href="#" active={p === "Deploy"}>
                    {p}
                  </SidebarNavLink>
                ))}
              </SidebarNavList>
            </SidebarNavSection>
          ))}
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
```

### RTL

```tsx
"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"

import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSearch, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

export default function SidebarNavRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex h-80 w-64 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
        <SidebarNav>
          <SidebarNavSearch shortcut="⌘K">بحث</SidebarNavSearch>
          <SidebarNavContent aria-label="التوثيق">
            <SidebarNavSection label="البداية">
              <SidebarNavList>
                <SidebarNavLink href="#">مقدمة</SidebarNavLink>
                <SidebarNavLink href="#" active>
                  التثبيت
                </SidebarNavLink>
              </SidebarNavList>
            </SidebarNavSection>
            <SidebarNavSection label="المكونات" count={2}>
              <SidebarNavSection level="group" label="النماذج" count={2}>
                <SidebarNavList>
                  <SidebarNavLink href="#">زر</SidebarNavLink>
                  <SidebarNavLink href="#">حقل إدخال</SidebarNavLink>
                </SidebarNavList>
              </SidebarNavSection>
            </SidebarNavSection>
          </SidebarNavContent>
        </SidebarNav>
      </div>
    </DirectionProvider>
  )
}
```

## When to use

For long page trees in docs, settings and admin sidebars. For an app rail with icons that folds to a strip, use [Animated Sidebar](https://paneui.dev/docs/animated-sidebar).

## Icon alignment

When a list, or the rows of a section, holds a row or group label with an `icon`, the rows and group labels beside it that have none start at the icon rows' text, and so do the rows inside those groups. This happens on its own. To force or cancel it, set `--sidebar-nav-inset` (for example `[--sidebar-nav-inset:1.5rem]` or `[--sidebar-nav-inset:0px]`) on a wrapper.

## Keyboard

Section headings are buttons with `aria-expanded`. A linked heading is a link plus a separate chevron button named by the locale’s `toggleNamed(label)` (“Toggle Guides”), or `toggleSection` when the label is not text; `toggleLabel` overrides it. The current row has `aria-current="page"`, and on mount the list scrolls it into view when it would start below the fold.

## API Reference

### SidebarNav

Column that fills its container. Also accepts every prop of `div`.

### SidebarNavSearch

A field-shaped button that opens your search. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shortcut` | `React.ReactNode` | — | Key cap at the end, such as `⌘K`. |
| `children` | `React.ReactNode` | `labels.searchPlaceholder` | The field text. The default comes from the locale. |

### SidebarNavContent

The scrolling list. Give it an `aria-label`. Also accepts every prop of `nav`.

### SidebarNavSection

Also accepts every prop of [Collapsible.Root](https://base-ui.com/react/components/collapsible#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `React.ReactNode` | — | Heading text. |
| `count` | `number` | — | Muted count after the label. |
| `level` | `"section" \| "group"` | `"section"` | `group` is a smaller muted heading inside a section. |
| `collapsible` | `boolean` | `true` | `false` drops the toggle and keeps it open. |
| `href` | `string` | — | Makes the label a link to the section's own page; the chevron beside it still folds the rows. |
| `labelRender` | `React.ReactElement \| (props) => React.ReactElement` | — | Renders the label link with your router's link, such as `<Link href="…" />`. |
| `active` | `boolean` | `false` | Marks the label's page as current with the fill, the bar and `aria-current="page"`. |
| `icon` | `React.ReactNode` | — | Leading icon in the same 16px slot as `SidebarNavLink`, muted until the label is hovered or current. |
| `toggleLabel` | `string` | — | Name of the chevron button beside a linked label. Defaults to the locale's `toggleNamed(label)`. |

### SidebarNavList

Also accepts every prop of `ul`.

### SidebarNavLink

A row inside its own `li`. Use `render` for your router's link. Also accepts every prop of `a`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | `false` | Marks the current page with a fill, a bar in the gutter and `aria-current="page"`. |
| `icon` | `React.ReactNode` | — | Leading icon in a 16px slot, muted until the row is hovered or current. |
| `badge` | `React.ReactNode` | — | Trailing content, such as a New badge. |

### SidebarNavFooter

Pinned under the list, above a hairline. Also accepts every prop of `div`.
