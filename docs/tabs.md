# Tabs

> Switches between related panels of content in one place.

Page: https://paneui.dev/docs/tabs/

## Installation

```bash
npx shadcn@latest add @paneui/tabs
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/tabs.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
```

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="billing">Billing</TabsTab>
  </TabsList>
  <TabsPanel value="account">Your profile and sign-in.</TabsPanel>
  <TabsPanel value="billing">Invoices and payment.</TabsPanel>
</Tabs>
```

## Composition

```text
Tabs
├── TabsList
│   └── TabsTab
└── TabsPanel
```

## Examples

### Controlled

Use when the URL or other UI decides which tab is open.

```tsx
"use client"

import * as React from "react"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

const ranges = [
  { value: "day", label: "Day", total: "$412" },
  { value: "week", label: "Week", total: "$2,870" },
  { value: "month", label: "Month", total: "$11,940" },
]

export default function TabsControlled() {
  const [range, setRange] = React.useState("week")
  return (
    <Tabs value={range} onValueChange={(value) => setRange(String(value))} className="items-center">
      <TabsList>
        {ranges.map((r) => (
          <TabsTab key={r.value} value={r.value}>
            {r.label}
          </TabsTab>
        ))}
      </TabsList>
      {ranges.map((r) => (
        <TabsPanel key={r.value} value={r.value} className="flex flex-col items-center gap-1">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">{r.total}</span>
          <span className="text-sm text-muted-foreground">Revenue this {r.value}</span>
        </TabsPanel>
      ))}
    </Tabs>
  )
}
```

### Disabled

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="overview" className="items-center">
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
        <TabsTab value="audit" disabled>
          Audit log
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="text-sm text-muted-foreground">
        Members, storage and recent activity.
      </TabsPanel>
      <TabsPanel value="billing" className="text-sm text-muted-foreground">
        Invoices and the card on file.
      </TabsPanel>
      <TabsPanel value="audit" className="text-sm text-muted-foreground">
        Available on the Business plan.
      </TabsPanel>
    </Tabs>
  )
}
```

### Full Width

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsFullWidth() {
  return (
    <Tabs defaultValue="sign-in" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTab value="sign-in" className="flex-1">
          Sign in
        </TabsTab>
        <TabsTab value="create" className="flex-1">
          Create account
        </TabsTab>
      </TabsList>
      <TabsPanel value="sign-in" className="text-sm text-muted-foreground">
        Welcome back. Use the email you signed up with.
      </TabsPanel>
      <TabsPanel value="create" className="text-sm text-muted-foreground">
        It takes under a minute, and no card is needed.
      </TabsPanel>
    </Tabs>
  )
}
```

### Vertical

Use for settings pages with many sections.

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsVertical() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="w-full max-w-md gap-4">
      <TabsList>
        <TabsTab value="general">General</TabsTab>
        <TabsTab value="notifications">Notifications</TabsTab>
        <TabsTab value="security">Security</TabsTab>
      </TabsList>
      <TabsPanel value="general" className="text-sm text-pretty text-muted-foreground">
        Your name, language and time zone.
      </TabsPanel>
      <TabsPanel value="notifications" className="text-sm text-pretty text-muted-foreground">
        Choose which updates reach your inbox.
      </TabsPanel>
      <TabsPanel value="security" className="text-sm text-pretty text-muted-foreground">
        Passwords, passkeys and signed-in devices.
      </TabsPanel>
    </Tabs>
  )
}
```

### Icon Only

```tsx
import { GridIcon, ListIcon } from "@/components/icons"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsIconOnly() {
  return (
    <Tabs defaultValue="grid" className="items-center">
      <TabsList>
        <TabsTab value="grid" aria-label="Grid view">
          <GridIcon />
        </TabsTab>
        <TabsTab value="list" aria-label="List view">
          <ListIcon />
        </TabsTab>
      </TabsList>
      <TabsPanel value="grid" className="text-sm text-muted-foreground">
        12 photos shown as tiles.
      </TabsPanel>
      <TabsPanel value="list" className="text-sm text-muted-foreground">
        12 photos shown with names and sizes.
      </TabsPanel>
    </Tabs>
  )
}
```

### Sizes

Match the toolbar the tabs sit in.

```tsx
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Tabs key={size} defaultValue="overview">
          <TabsList size={size}>
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="activity">Activity</TabsTab>
            <TabsTab value="settings">Settings</TabsTab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  )
}
```

### Underline

Use for page-level sections, where a filled track would compete with the content.

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="underline">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="text-sm text-muted-foreground">
        Three deploys and one open incident this week.
      </TabsPanel>
      <TabsPanel value="activity" className="text-sm text-muted-foreground">
        Mia merged two pull requests an hour ago.
      </TabsPanel>
      <TabsPanel value="settings" className="text-sm text-muted-foreground">
        Notifications go to the team channel.
      </TabsPanel>
    </Tabs>
  )
}
```

### RTL

```tsx
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { ChartIcon, ChatIcon, ListIcon } from "@/components/icons"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

export default function TabsRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Tabs defaultValue="chat" className="items-center">
          <TabsList>
            <TabsTab value="chat">
              <ChatIcon />
              المحادثة
            </TabsTab>
            <TabsTab value="tasks">
              <ListIcon />
              المهام
            </TabsTab>
            <TabsTab value="stats">
              <ChartIcon />
              الإحصاءات
            </TabsTab>
          </TabsList>
          <TabsPanel value="chat" className="text-sm text-muted-foreground">محادثاتك مع المساعد.</TabsPanel>
          <TabsPanel value="tasks" className="text-sm text-muted-foreground">كل ما يعمل في الخلفية.</TabsPanel>
          <TabsPanel value="stats" className="text-sm text-muted-foreground">الاستخدام هذا الأسبوع.</TabsPanel>
        </Tabs>
      </div>
    </DirectionProvider>
  )
}
```

## Motion

The indicator slides over 300ms ease-out. Under `prefers-reduced-motion: reduce` it jumps without sliding.

## Keyboard

`ArrowLeft` / `ArrowRight` (or `ArrowUp` / `ArrowDown` when vertical) move focus between tabs (looping), `Home` / `End` jump to the ends, and `Enter` or `Space` activates the focused tab.

## API Reference

Built on [the Tabs primitive](https://base-ui.com/react/components/tabs#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### Tabs

Column wrapper with a 12px gap between list and panels; a row when vertical. Also accepts every prop of [Tabs.Root](https://base-ui.com/react/components/tabs#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultValue` | `any` | `0` | Tab selected on first render. |
| `value` | `any` | — | Controlled selected tab. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Lays the list out as a row or a column; the indicator and arrow keys follow it. |
| `onValueChange` | `(value: any, eventDetails) => void` | — | Called when the selected tab changes. |

### TabsList

Segmented track. Renders the sliding indicator after its children. Also accepts every prop of [Tabs.List](https://base-ui.com/react/components/tabs#list).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Height 24 / 28 / 32 / 36px for the list, the Button heights. Applies to every tab. |
| `variant` | `"default" \| "underline"` | `"default"` | `default` is a raised indicator on a well; `underline` is a 2px bar on a hairline. |
| `activateOnFocus` | `boolean` | `false` | Select a tab as soon as it receives keyboard focus. |
| `loopFocus` | `boolean` | `true` | Wrap arrow-key focus at the ends. |

| Data attribute | Description |
| --- | --- |
| `data-size` | The `size` value. |
| `data-variant` | The `variant` value. |

### TabsTab

Sizes its icons to 16px. Also accepts every prop of [Tabs.Tab](https://base-ui.com/react/components/tabs#tab).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `any` | — | Matches the `TabsPanel` it shows. |
| `disabled` | `boolean` | `false` | Dim the tab, block selection and skip it in the keyboard order. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present on the selected tab. |
| `data-disabled` | Present when disabled. |
| `data-orientation` | `horizontal` or `vertical`, from the root. |

### TabsPanel

Also accepts every prop of [Tabs.Panel](https://base-ui.com/react/components/tabs#panel).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `any` | — | The `TabsTab` value that shows this panel. |
| `keepMounted` | `boolean` | `false` | Keep the panel in the DOM while hidden. |
| `typeset` | `boolean \| "docs" \| "reading" \| "chat"` | `false` | Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone. |
