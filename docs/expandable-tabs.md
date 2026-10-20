# Expandable Tabs

> Icon tab bar for switching panels in tight spaces.

Page: https://paneui.dev/docs/expandable-tabs/

## Installation

```bash
npx shadcn@latest add @paneui/expandable-tabs
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/expandable-tabs.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { BellIcon, CalendarDaysIcon, HomeIcon, SettingsIcon } from "@/components/icons"
import { ExpandableTabs } from "@/registry/base-nova/blocks/expandable-tabs/expandable-tabs"

function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="truncate">{title}</span>
      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{meta}</span>
    </div>
  )
}

const items = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon />,
    content: (
      <div>
        <p className="text-sm font-medium">Good afternoon</p>
        <p className="mt-1 text-sm text-muted-foreground">Three tasks are waiting for review and your inbox is clear.</p>
      </div>
    ),
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <CalendarDaysIcon />,
    content: (
      <div className="divide-y divide-border/60">
        <Row title="Design review" meta="14:00" />
        <Row title="1:1 with Mei" meta="15:30" />
        <Row title="Ship notes due" meta="17:00" />
      </div>
    ),
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: <BellIcon />,
    content: (
      <div className="divide-y divide-border/60">
        <Row title="Deploy finished on prod" meta="2m" />
        <Row title="New comment on Pricing v3" meta="18m" />
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    content: <p className="text-sm text-muted-foreground">Notifications, appearance and connected accounts.</p>,
  },
]

export default function ExpandableTabsDemo() {
  return (
    <div className="flex min-h-72 w-full items-end justify-center">
      <ExpandableTabs items={items} defaultValue="calendar" aria-label="App sections" />
    </div>
  )
}
```
