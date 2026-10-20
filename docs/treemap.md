# Treemap

> Compares parts of a total as sized tiles.

Page: https://paneui.dev/docs/treemap/

## Installation

```bash
npx shadcn@latest add @paneui/treemap
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/treemap.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { Treemap } from "@/components/ui/treemap"
```

```tsx
<Treemap
  label="Spend by category"
  data={[
    { id: "rent", label: "Rent", value: 1800 },
    { id: "food", label: "Food", value: 620 },
  ]}
/>
```

## Examples

### Flat

Use when the data has no natural groups.

```tsx
"use client"

import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const DATA: TreemapNode[] = [
  { id: "rent", label: "Rent", value: 18000 },
  { id: "groceries", label: "Groceries", value: 4200 },
  { id: "dining", label: "Dining out", value: 3100 },
  { id: "transport", label: "Transport", value: 1400 },
  { id: "utilities", label: "Utilities", value: 1100 },
  { id: "fun", label: "Fun", value: 900 },
]

const hkd = (v: number) => `HK$${v.toLocaleString("en-US")}`

export default function TreemapFlat() {
  return <Treemap data={DATA} label="October spending" formatValue={hkd} height={260} className="max-w-xl" />
}
```

### Custom Colors

```tsx
import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const DATA: TreemapNode[] = [
  {
    id: "passing",
    label: "Passing",
    color: "var(--success)",
    children: [
      { id: "unit", label: "Unit", value: 412 },
      { id: "integration", label: "Integration", value: 96 },
      { id: "e2e", label: "End-to-end", value: 38 },
    ],
  },
  { id: "flaky", label: "Flaky", color: "var(--warning)", value: 14, description: "Passed on retry" },
  { id: "failing", label: "Failing", color: "var(--destructive)", value: 6 },
]

export default function TreemapCustomColors() {
  return <Treemap data={DATA} label="Test results" height={260} className="max-w-xl" />
}
```

### Gap, Padding and Radius

```tsx
"use client"

import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const DATA: TreemapNode[] = [
  {
    id: "apps",
    label: "Apps",
    children: [
      { id: "photos", label: "Photos", value: 48 },
      { id: "messages", label: "Messages", value: 21 },
      { id: "music", label: "Music", value: 12 },
    ],
  },
  {
    id: "system",
    label: "System",
    children: [
      { id: "ios", label: "iOS", value: 14 },
      { id: "cache", label: "Cache", value: 6 },
    ],
  },
  { id: "free", label: "Free", value: 27 },
]

const gb = (v: number) => `${v} GB`

export default function TreemapSpacing() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Treemap data={DATA} label="Storage, tight" formatValue={gb} gap={1} groupPadding={0} radius={4} height={200} showLegend={false} />
      <Treemap data={DATA} label="Storage, airy" formatValue={gb} gap={6} groupPadding={6} radius={14} height={200} />
    </div>
  )
}
```

### Controlled Active Tile

Use when a list outside the chart should highlight the same tile.

```tsx
"use client"

import * as React from "react"

import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const DATA: TreemapNode[] = [
  { id: "tokyo", label: "Tokyo", value: 9 },
  { id: "osaka", label: "Osaka", value: 4 },
  { id: "kyoto", label: "Kyoto", value: 3 },
  { id: "sapporo", label: "Sapporo", value: 2 },
  { id: "fukuoka", label: "Fukuoka", value: 2 },
]

const nights = (v: number) => `${v} nights`

export default function TreemapControlled() {
  const [active, setActive] = React.useState<string | null>("kyoto")
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {DATA.map((d) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={active === d.id}
            onClick={() => setActive(active === d.id ? null : d.id)}
            className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground shadow-chip transition-[color,background-color] duration-150 ease-out hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            {d.label}
          </button>
        ))}
      </div>
      <Treemap data={DATA} label="Nights by city" formatValue={nights} activeId={active} onActiveChange={setActive} height={240} showLegend={false} />
    </div>
  )
}
```

### Compact

```tsx
"use client"

import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const DATA: TreemapNode[] = [
  { id: "ts", label: "TypeScript", value: 62 },
  { id: "css", label: "CSS", value: 18 },
  { id: "md", label: "Markdown", value: 11 },
  { id: "json", label: "JSON", value: 6 },
  { id: "sh", label: "Shell", value: 2 },
  { id: "other", label: "Other", value: 1 },
]

export default function TreemapCompact() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-2xl bg-card p-4 shadow-raised">
      <div className="text-sm font-medium">Languages</div>
      <Treemap data={DATA} label="Repository languages" formatValue={(v) => `${v}%`} height={140} gap={2} radius={6} showLegend={false} />
    </div>
  )
}
```

## Keyboard

Each tile is focusable. `Tab` in, then `ArrowRight` / `ArrowDown` and `ArrowLeft` / `ArrowUp` move between tiles and `Home` / `End` jump to the ends. Focus shows the tooltip.

## Accessibility

Every tile has an `aria-label` with its group, value and share, and a visually hidden data table lists all tiles for screen readers. Labels hide on tiles too small to hold them.

## API Reference

### Treemap

Squarified treemap with one level of grouping, tooltip and legend. Also accepts every prop of `section`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `readonly TreemapNode[]` | — | Top-level nodes; nodes with `children` become groups. |
| `label` | `string` | `"Treemap"` | Accessible name for the chart, legend and data table. |
| `height` | `number` | `320` | Chart height in px; width fills the container. |
| `formatValue` | `(value: number) => string` | `formatNumber` | Formats values in the tooltip, labels and table. |
| `gap` | `number` | `3` | Space between tiles in px. |
| `groupPadding` | `number` | `3` | Inset of child tiles inside a group, in px. |
| `radius` | `number` | `10` | Tile corner radius in px. |
| `showLegend` | `boolean` | `true` | Show the legend of top-level nodes. |
| `activeId` | `string \| null` | — | Controlled highlighted tile. |
| `defaultActiveId` | `string \| null` | — | Initially highlighted tile. |
| `onActiveChange` | `(id: string \| null) => void` | — | Called on hover, focus and leave. |

### TreemapNode

One node of `data`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (required) | `string` | — | Stable id. |
| `label` (required) | `string` | — | Tile and legend label. |
| `value` | `number` | — | Leaf value. Ignored when `children` is given (the group sums them). |
| `children` | `TreemapNode[]` | — | Child leaves (one level is drawn). |
| `color` | `string` | — | Overrides the palette colour; groups pass theirs down and shade each child a step darker. |
| `description` | `string` | — | Extra line in the tooltip. |

### squarify

`(values: readonly number[], rect: { x, y, w, h }) => Rect[]`. The squarified layout algorithm, exported for custom treemaps.
