# AI Sidebar

> Navigates folders, projects and files in an AI workspace.

Page: https://paneui.dev/docs/ai-sidebar/

## Installation

```bash
npx shadcn@latest add @paneui/ai-sidebar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/ai-sidebar.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/tooltip`.

## Usage

```tsx
import { AISidebar } from "@/components/ui/ai-sidebar"
```

```tsx
<AISidebar
  defaultItems={[{ id: "trips", label: "Trips", kind: "folder", children: [{ id: "kyoto", label: "Kyoto", kind: "file" }] }]}
  defaultExpandedIds={["trips"]}
/>
```

## Examples

### Collapsed Rail

```tsx
import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"

const ITEMS: SidebarResource[] = [
  {
    id: "travel",
    label: "Travel",
    kind: "project",
    children: [
      { id: "kyoto", label: "Kyoto long weekend", kind: "file" },
      { id: "visa", label: "Japan visa checklist", kind: "file" },
    ],
  },
  {
    id: "home",
    label: "Home",
    kind: "folder",
    children: [
      { id: "lease", label: "Lease renewal", kind: "file" },
      { id: "movers", label: "Movers quotes", kind: "file" },
    ],
  },
]

export default function AISidebarCollapsedRail() {
  return (
    <div className="h-96 w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar defaultItems={ITEMS} defaultOpen={false} defaultActiveId="kyoto" searchHotkey={null} />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

const ITEMS: SidebarResource[] = [
  {
    id: "travel",
    label: "Travel",
    kind: "project",
    children: [
      { id: "kyoto", label: "Kyoto long weekend", kind: "file" },
      { id: "visa", label: "Japan visa checklist", kind: "file" },
    ],
  },
  {
    id: "home",
    label: "Home",
    kind: "folder",
    children: [
      { id: "lease", label: "Lease renewal", kind: "file" },
      { id: "movers", label: "Movers quotes", kind: "file" },
    ],
  },
]

export default function AISidebarControlled() {
  const [open, setOpen] = React.useState(true)
  const [active, setActive] = React.useState<string | null>("lease")
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Open: {active ?? "nothing"}</span>
        <Button size="sm" variant="secondary" onClick={() => setOpen((o) => !o)}>
          {open ? "Collapse" : "Expand"}
        </Button>
      </div>
      <div className="h-96 overflow-hidden rounded-3xl bg-background shadow-surface">
        <AISidebar
          defaultItems={ITEMS}
          defaultExpandedIds={["home"]}
          open={open}
          onOpenChange={setOpen}
          activeId={active}
          onActiveChange={(id) => setActive(id)}
          searchHotkey={null}
        />
      </div>
    </div>
  )
}
```

### With Footer

```tsx
"use client"

import { PlusIcon, SettingsIcon } from "@/components/icons"
import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"
import { Button } from "@/registry/base-nova/ui/button"

const ITEMS: SidebarResource[] = [
  {
    id: "travel",
    label: "Travel",
    kind: "project",
    children: [
      { id: "kyoto", label: "Kyoto long weekend", kind: "file" },
      { id: "visa", label: "Japan visa checklist", kind: "file" },
    ],
  },
  {
    id: "home",
    label: "Home",
    kind: "folder",
    children: [
      { id: "lease", label: "Lease renewal", kind: "file" },
      { id: "movers", label: "Movers quotes", kind: "file" },
    ],
  },
]

export default function AISidebarWithFooter() {
  return (
    <div className="h-96 w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar
        defaultItems={ITEMS}
        defaultExpandedIds={["travel"]}
        title="Hark"
        searchHotkey={null}
        actions={(open) =>
          open ? (
            <Button variant="secondary" size="sm" className="w-full justify-start">
              <PlusIcon data-icon="inline-start" />
              New chat
            </Button>
          ) : (
            <Button variant="secondary" size="icon-sm" aria-label="New chat">
              <PlusIcon />
            </Button>
          )
        }
        footer={(open) =>
          open ? (
            <div className="flex items-center gap-2 px-1">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">QW</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">Qinyang Wang</span>
              <Button variant="ghost" size="icon-sm" aria-label="Settings">
                <SettingsIcon />
              </Button>
            </div>
          ) : (
            <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">QW</span>
          )
        }
      />
    </div>
  )
}
```

### Minimal

```tsx
import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"

const ITEMS: SidebarResource[] = [
  { id: "inbox", label: "Inbox summary", kind: "file", meta: "12" },
  { id: "q3", label: "Q3 report draft", kind: "file", meta: "2d" },
  { id: "archive", label: "Archived chats", kind: "folder", disabled: true, children: [] },
]

export default function AISidebarMinimal() {
  return (
    <div className="h-72 w-full max-w-sm overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar defaultItems={ITEMS} defaultActiveId="inbox" title="Recent" searchable={false} width="14rem" />
    </div>
  )
}
```

### Search Hotkey

```tsx
import { AISidebar, type SidebarResource } from "@/registry/base-nova/ui/ai-sidebar"

const ITEMS: SidebarResource[] = [
  {
    id: "travel",
    label: "Travel",
    kind: "project",
    children: [
      { id: "kyoto", label: "Kyoto long weekend", kind: "file" },
      { id: "visa", label: "Japan visa checklist", kind: "file" },
    ],
  },
  {
    id: "home",
    label: "Home",
    kind: "folder",
    children: [
      { id: "lease", label: "Lease renewal", kind: "file" },
      { id: "movers", label: "Movers quotes", kind: "file" },
    ],
  },
]

export default function AISidebarSearchHotkey() {
  return (
    <div className="h-96 w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-surface">
      <AISidebar defaultItems={ITEMS} defaultOpen={false} searchHotkey="j" />
    </div>
  )
}
```

## Keyboard

The tree follows the WAI-ARIA tree pattern. `ArrowUp` / `ArrowDown` move, `ArrowRight` / `ArrowLeft` open, close or go to the parent, `Home` / `End` jump, `Enter` / `Space` activate, typing jumps by label, and `F2` renames when `renamable`. `Escape` clears search. The search shortcut (⌘K on Mac, Ctrl+K elsewhere) is shared, so with several sidebars on a page, only the most recently mounted, focused or clicked one responds.

## Related

See also [Animated Sidebar](https://paneui.dev/docs/animated-sidebar).

## API Reference

### AISidebar

Workspace sidebar with bookmarks, a searchable resource tree and a collapsible icon rail. Also accepts every prop of `motion.nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `SidebarResource[]` | — | Controlled workspace tree; folders and projects hold `children`, files are leaves. |
| `defaultItems` | `SidebarResource[]` | `[]` | Initial tree when uncontrolled. |
| `onItemsChange` | `(items: SidebarResource[]) => void` | — | Called with the renamed tree. |
| `bookmarks` | `SidebarResource[]` | `[]` | Pinned shortcuts in their own section. |
| `activeId` | `string \| null` | — | Controlled active item. |
| `defaultActiveId` | `string \| null` | `null` | Initial active item. |
| `onActiveChange` | `(id: string, item: SidebarResource) => void` | — | Called when a leaf is activated. |
| `defaultExpandedIds` | `string[]` | `[]` | Containers open on first render. |
| `open` | `boolean` | — | Controlled state, expanded (`true`) or icon rail (`false`). |
| `defaultOpen` | `boolean` | `true` | Initial state when uncontrolled. Closed, the sidebar is a 56px icon rail with tooltips, and clicking a folder or project expands it. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the sidebar expands or collapses. |
| `title` | `ReactNode` | `the locale's` | Title row content. |
| `actions` | `(open: boolean) => ReactNode` | — | Rendered under the title, e.g. a New chat button. |
| `footer` | `(open: boolean) => ReactNode` | — | Pinned to the bottom, e.g. the account row. |
| `searchable` | `boolean` | `true` | Show the search field. |
| `searchHotkey` | `string \| null` | `"k"` | ⌘ (Mac) / Ctrl + this key opens the sidebar and focuses search; the hint shows the platform modifier. Only the most recently mounted, focused or clicked sidebar responds. `null` disables it. |
| `renamable` | `boolean` | `false` | Allow inline rename (F2, double-click or the pencil). |
| `onRename` | `(item: SidebarResource, label: string) => void` | — | Called after a rename, including bookmarks. |
| `width` | `string` | `"16rem"` | Expanded width as a CSS length. |

| Data attribute | Description |
| --- | --- |
| `data-state` | `open` or `collapsed`. |
| `data-active` | On the active tree item. |
| `data-kind` | On each tree item, its `kind`. |

### SidebarResource

One tree node.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (required) | `string` | — | Stable id. |
| `label` (required) | `string` | — | Shown text; also used by search and typeahead. |
| `kind` (required) | `"folder" \| "project" \| "file" \| "bookmark"` | — | Icon and tint; folders and projects with `children` expand. |
| `children` | `SidebarResource[]` | — | Nested nodes. |
| `meta` | `ReactNode` | — | Trailing hint, e.g. a count or time. |
| `disabled` | `boolean` | — | Dim and skip activation. |

### ResourceIcon

The 16px icon for a resource kind.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` (required) | `"folder" \| "project" \| "file" \| "bookmark"` | — | Which icon. |
| `className` | `string` | — | Merged onto the icon. |
