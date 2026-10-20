# Status Bar

> Shows a service's status history and uptime.

Page: https://paneui.dev/docs/status-bar/

## Installation

```bash
npx shadcn@latest add @paneui/status-bar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/status-bar.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { StatusBar } from "@/components/ui/status-bar"
```

```tsx
<StatusBar
  title="API"
  label="API status, last 3 days"
  data={[
    { id: "d1", label: "Oct 11", status: "operational" },
    { id: "d2", label: "Oct 12", status: "degraded", description: "Slow p95" },
    { id: "d3", label: "Oct 13", status: "operational" },
  ]}
/>
```

## Examples

### Custom Statuses

Use when your states differ from the defaults.

```tsx
"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { StatusBar, type StatusBarDatum, type StatusBarStatus } from "@/registry/base-nova/ui/status-bar"

const statuses: Record<string, StatusBarStatus> = {
  passed: { label: "Passed", color: "var(--success)", weight: 1 },
  failed: { label: "Failed", color: "var(--destructive)", weight: 0 },
  cancelled: { label: "Cancelled", color: "var(--muted-foreground)", weight: null },
}

function builds(): StatusBarDatum[] {
  const r = seededRandom(21)
  return Array.from({ length: 40 }, (_, i) => {
    const x = r()
    const status = x > 0.9 ? "failed" : x > 0.84 ? "cancelled" : "passed"
    const minutes = Math.round(4 + r() * 6)
    return {
      id: `build-${1460 + i}`,
      label: `Build #${1460 + i}`,
      status,
      description: status === "passed" ? `Finished in ${minutes} min` : status === "failed" ? "Unit tests failed" : "Superseded by a newer push",
    }
  })
}

const data = builds()

export default function StatusBarCustomStatuses() {
  return (
    <div className="w-full max-w-xl">
      <StatusBar
        title={<code className="font-mono">main</code>}
        label="CI runs on main"
        data={data}
        statuses={statuses}
        startLabel="40 builds ago"
        endLabel="Latest"
      />
    </div>
  )
}
```

### Hourly

Use for short windows such as the last 24 hours.

```tsx
"use client"

import { StatusBar, type StatusBarDatum } from "@/registry/base-nova/ui/status-bar"

const incidents: Record<number, { status: string; description: string }> = {
  3: { status: "maintenance", description: "Certificate rotation" },
  14: { status: "degraded", description: "Queue backlog, jobs delayed up to 6 min" },
  15: { status: "outage", description: "Webhook delivery failed for 22 min" },
  16: { status: "degraded", description: "Retrying failed deliveries" },
}

const data: StatusBarDatum[] = Array.from({ length: 24 }, (_, hour) => ({
  id: `h${hour}`,
  label: `${String(hour).padStart(2, "0")}:00–${String(hour + 1).padStart(2, "0")}:00`,
  status: incidents[hour]?.status ?? "operational",
  description: incidents[hour]?.description ?? "All checks passing",
}))

export default function StatusBarHourly() {
  return (
    <div className="w-full max-w-xl">
      <StatusBar
        title="Webhooks"
        label="Webhooks status, last 24 hours"
        data={data}
        height={48}
        gap={6}
        startLabel="00:00"
        endLabel="Now"
      />
    </div>
  )
}
```

### Compact

Use when stacking several services in one view.

```tsx
"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { StatusBar, type StatusBarDatum } from "@/registry/base-nova/ui/status-bar"

function history(seed: number): StatusBarDatum[] {
  const r = seededRandom(seed)
  return Array.from({ length: 90 }, (_, i) => {
    const x = r()
    return { id: `d${i}`, label: `${90 - i} days ago`, status: x > 0.97 ? "outage" : x > 0.92 ? "degraded" : "operational" }
  })
}

const services = [
  { name: "Auth", data: history(2) },
  { name: "Storage", data: history(5) },
  { name: "Search", data: history(8) },
]

export default function StatusBarCompact() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      {services.map((s) => (
        <div key={s.name} className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">{s.name}</span>
          <StatusBar
            label={`${s.name} status, last 90 days`}
            data={s.data}
            showHeader={false}
            showLegend={false}
            height={24}
            gap={2}
            startLabel="90 days ago"
          />
        </div>
      ))}
    </div>
  )
}
```

### No Data

Use for periods before monitoring started.

```tsx
"use client"

import { StatusBar, type StatusBarDatum } from "@/registry/base-nova/ui/status-bar"

const data: StatusBarDatum[] = Array.from({ length: 30 }, (_, i) => {
  const day = `Oct ${i + 1}`
  if (i < 9) return { id: `d${i}`, label: day, status: "nodata", description: "Monitor not set up yet" }
  if (i === 17) return { id: `d${i}`, label: day, status: "degraded", description: "Slow image uploads in EU" }
  return { id: `d${i}`, label: day, status: "operational", description: "No incidents reported" }
})

export default function StatusBarNoData() {
  return (
    <div className="w-full max-w-xl">
      <StatusBar title="Media CDN" label="Media CDN status, October" data={data} startLabel="Oct 1" endLabel="Oct 30" />
    </div>
  )
}
```

## Keyboard

Focus the bars, then `ArrowLeft` / `ArrowRight` move between periods, `Home` / `End` jump to the ends and `Esc` clears. On touch, tapping a bar shows its tooltip.

## Motion

With reduced motion the bars don't stagger in and the status dot doesn't pulse.

## API Reference

### StatusBar

Also accepts every prop of `section`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `{ id: string; label: string; status: string; description?: string }[]` | — | One bar per period, oldest first. `status` is a key of `statuses`. |
| `statuses` | `Record<string, { label: string; color: string; weight?: number \| null }>` | `STATUS_BAR_STATUSES` | Status definitions. Each `weight` feeds the uptime figure (1 up, 0 down, `null` not counted); `nodata` is left out of uptime. Defaults to `STATUS_BAR_STATUSES`. |
| `label` | `string` | `"Status history"` | Accessible name; also the header title fallback. |
| `title` | `React.ReactNode` | — | Service name in the header row; any node (e.g. name plus a badge). Replaces the HTML `title` tooltip attribute. |
| `height` | `number` | `36` | Bar height in px. |
| `gap` | `number` | `3` | Gap between bars in px. |
| `showHeader` | `boolean` | `true` | Show the status dot, title, current status and uptime. |
| `showLegend` | `boolean` | `true` | Show counts per status that appears. |
| `startLabel` | `string` | `${n} periods ago` | Caption under the left end. |
| `endLabel` | `string` | `"Today"` | Caption under the right end. |
| `activeId` | `string \| null` | — | Controlled inspected period. |
| `defaultActiveId` | `string \| null` | — | Initially inspected period. |
| `onActiveChange` | `(id: string \| null) => void` | — | Called when the inspected period changes. |

### STATUS_BAR_STATUSES

The default `statuses` map. Spread it to add your own: `{ ...STATUS_BAR_STATUSES, partial: { … } }`.
