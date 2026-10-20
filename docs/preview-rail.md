# Preview Rail

> Compact section navigation that previews each destination.

Page: https://paneui.dev/docs/preview-rail/

## Installation

```bash
npx shadcn@latest add @paneui/preview-rail
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/preview-rail.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icon-chip`.

## Usage

```tsx
import { PreviewRail } from "@/components/ui/preview-rail"
```

```tsx
<PreviewRail
  items={[
    { id: "intro", label: "Introduction", description: "What it is and who it is for." },
    { id: "install", label: "Installation" },
  ]}
  label="On this page"
/>
```

## Examples

### Horizontal

```tsx
import { PreviewRail } from "@/registry/base-nova/ui/preview-rail"

const chapters = [
  { id: "c1", label: "Chapter 1 — Arrival", description: "The ferry, the fog, the first night at the inn." },
  { id: "c2", label: "Chapter 2 — The Market", description: "Haggling over peaches and an unexpected letter." },
  { id: "c3", label: "Chapter 3 — The Ridge", description: "A four-hour climb and a storm on the way down." },
  { id: "c4", label: "Chapter 4 — Lanterns", description: "The festival, and who was missing from it." },
  { id: "c5", label: "Chapter 5 — Departure", description: "Loose ends, and the ferry back." },
  { id: "c6", label: "Afterword", description: "Notes on the places that inspired the book." },
]

export default function PreviewRailHorizontal() {
  return (
    <div className="flex h-64 w-full max-w-md items-end justify-center pb-4">
      <PreviewRail items={chapters} orientation="horizontal" side="start" defaultValue="c3" label="Chapters" />
    </div>
  )
}
```

### Icons and Custom Preview

Use when the preview needs icons or your own contents.

```tsx
"use client"

import { CalendarDaysIcon, ChartIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { PreviewRail, type PreviewRailItem } from "@/registry/base-nova/ui/preview-rail"

const items: PreviewRailItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon />, description: "Today at a glance." },
  { id: "inbox", label: "Inbox", icon: <InboxIcon />, description: "12 unread · 3 need a reply" },
  { id: "calendar", label: "Calendar", icon: <CalendarDaysIcon />, description: "Next: design review at 3pm" },
  { id: "reports", label: "Reports", icon: <ChartIcon />, description: "Spending is down 8% this month" },
  { id: "settings", label: "Settings", icon: <SettingsIcon />, description: "Account, notifications, billing" },
  { id: "archive", label: "Archive", description: "Older than 90 days", disabled: true },
]

export default function PreviewRailRenderPreview() {
  return (
    <div className="flex w-full max-w-md gap-10">
      <PreviewRail items={items} defaultValue="inbox" label="Default preview" />
      <PreviewRail
        items={items}
        defaultValue="inbox"
        label="Custom preview"
        renderPreview={(item) =>
          item.id === "settings" ? null : (
            <p className="text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground"> — {item.description}</span>
            </p>
          )
        }
      />
    </div>
  )
}
```

### Compact, Preview on Start

Use when the rail sits on the right edge and space is tight.

```tsx
import { PreviewRail } from "@/registry/base-nova/ui/preview-rail"

const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"].map((y) => ({
  id: y,
  label: y,
  description: `Photos and notes from ${y}.`,
}))

export default function PreviewRailSideStart() {
  return (
    <div className="flex w-full max-w-md justify-end">
      <PreviewRail
        items={years}
        side="start"
        showActive={false}
        itemSize={16}
        tickLength={28}
        label="Years"
      />
    </div>
  )
}
```

## Accessibility

Each tick is a button (or a link with `href`) named by its `label`; the selected one gets `aria-current`. Keyboard focus drives the same highlight and preview as hover. On touch, the first tap on a link reveals its preview and the second follows it.

## Motion

Under reduced motion the ticks change without animating and the card only fades.

## API Reference

### PreviewRail

A rail of ticks with a preview card for the pointed or focused item. Children render beside the rail. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` (required) | `PreviewRailItem[]` | — | The destinations, in order. |
| `value` | `string` | — | Controlled selected id. |
| `defaultValue` | `string` | `items[0].id` | Initial selection when uncontrolled. |
| `onValueChange` | `(id: string, item: PreviewRailItem) => void` | — | Called when a tick is clicked. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Rail direction. |
| `side` | `"start" \| "end"` | `"end"` | Which side of the rail the preview appears on. |
| `renderPreview` | `(item: PreviewRailItem) => ReactNode` | — | Custom preview contents; return `null` to show nothing for an item. |
| `preview` | `boolean` | `true` | Show the preview card at all (ticks still form the pyramid). |
| `showActive` | `boolean` | `true` | Keep the selected tick tall and tinted while nothing is pointed at. |
| `itemSize` | `number` | `22` | Pitch between ticks, px. |
| `tickLength` | `number` | `40` | Length of a fully grown tick, px. |
| `label` | `string` | `"Sections"` | Accessible name of the nav. |
| `railClassName` | `string` | — | Class for the rail `nav`. |
| `previewClassName` | `string` | — | Class for the preview card. |

| Data attribute | Description |
| --- | --- |
| `data-orientation` | `vertical` or `horizontal`, on the root. |
| `data-highlighted` | On the tick that is pointed at, focused, or selected at rest. |

### PreviewRailItem

Type of each entry in `items`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (required) | `string` | — | Unique id. |
| `label` (required) | `string` | — | Accessible name and preview title. |
| `description` | `ReactNode` | — | Preview body text. |
| `icon` | `ReactNode` | — | Leading icon, shown in an `IconChip` in the default preview. |
| `href` | `string` | — | Render the tick as a link. |
| `target` | `HTMLAttributeAnchorTarget` | — | Link target. |
| `rel` | `string` | — | Link rel. Defaults to `noreferrer noopener` for `_blank`. |
| `disabled` | `boolean` | — | Dim the tick and ignore it. |
