# Heat Calendar

> Shows daily activity on a calendar.

Page: https://paneui.dev/docs/heat-calendar/

## Installation

```bash
npx shadcn@latest add @paneui/heat-calendar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/heat-calendar.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { HeatCalendar } from "@/components/ui/heat-calendar"
```

```tsx
<HeatCalendar
  label="Commit activity"
  unit="commits"
  weeks={12}
  data={[
    { date: "2026-10-12", count: 4 },
    { date: "2026-10-13", count: 9 },
  ]}
/>
```

## Composition

```text
HeatCalendar
├── HeatCalendarGrid
│   └── HeatCalendarTooltip
├── HeatCalendarSummary
└── HeatCalendarLegend
```

## Examples

### Monday Start

```tsx
"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(41), { endDate: "2026-10-13", days: 120, intensity: 3 })

export default function HeatCalendarMondayStart() {
  return (
    <div className="w-full max-w-md">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={16}
        weekStartsOn={1}
        cellSize={16}
        gap={4}
        color="var(--chart-1)"
        unit="workouts"
        label="Workouts, last 16 weeks"
      />
    </div>
  )
}
```

### Full Year

```tsx
"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(7), { endDate: "2026-10-13", days: 371, intensity: 14 })

export default function HeatCalendarFullYear() {
  return (
    <div className="w-full max-w-3xl">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={53}
        cellSize={10}
        gap={2}
        maxCount={10}
        unit="pull requests"
        label="Pull requests reviewed, last year"
      />
    </div>
  )
}
```

### Custom Composition

Arrange the parts yourself when you need another layout or your own tooltip body.

```tsx
"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import {
  generateHeatCalendarData,
  HeatCalendar,
  HeatCalendarGrid,
  HeatCalendarLegend,
  HeatCalendarSummary,
  HeatCalendarTooltip,
} from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(88), { endDate: "2026-10-13", days: 200, intensity: 40 })

const longDate = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" })

export default function HeatCalendarCustomComposition() {
  return (
    <div className="w-full max-w-2xl">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={26}
        color="var(--chart-2)"
        unit="minutes"
        label="Reading time, last 26 weeks"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Reading time</span>
          <HeatCalendarLegend />
        </div>
        <HeatCalendarGrid>
          <HeatCalendarTooltip>
            {(day) => (
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{longDate.format(day.time)}</span>
                <span className="text-muted-foreground">
                  {day.count ? `${day.count} minutes read` : "No reading logged"}
                </span>
              </div>
            )}
          </HeatCalendarTooltip>
        </HeatCalendarGrid>
        <HeatCalendarSummary />
      </HeatCalendar>
    </div>
  )
}
```

### Default Selection

```tsx
"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { generateHeatCalendarData, HeatCalendar } from "@/registry/base-nova/ui/heat-calendar"

const data = generateHeatCalendarData(seededRandom(5), { endDate: "2026-10-13", days: 180, intensity: 6 })

export default function HeatCalendarDefaultSelection() {
  return (
    <div className="w-full max-w-2xl">
      <HeatCalendar
        data={data}
        endDate="2026-10-13"
        weeks={20}
        unit="deploys"
        defaultSelection={{ start: "2026-08-03", end: "2026-08-16" }}
        label="Deploys, last 20 weeks"
      />
    </div>
  )
}
```

## Selecting ranges

Drag across days with the pointer. With the keyboard, the arrow keys move between days, `Enter` or `Space` starts and then ends a range, `Shift` + arrows extend it and `Esc` clears.

## Dates

All dates are UTC `YYYY-MM-DD` strings. Days after `endDate` render as empty placeholders, and the grid starts scrolled to the latest week.

## API Reference

### HeatCalendar

Root and context. Without children it renders the grid with tooltip, then summary and legend. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` (required) | `{ date: string; count: number }[]` | — | Daily counts; duplicates are summed. |
| `endDate` | `string` | `latest date in data` | Last UTC day shown. |
| `weeks` | `number` | `26` | Number of week columns. |
| `weekStartsOn` | `0 \| 1` | `0` | 0 = Sunday, 1 = Monday. |
| `unit` | `string` | `the locale's` | Noun after every count. |
| `color` | `string` | `"var(--chart-4, var(--success))"` | The single hue; strength maps to count. |
| `maxCount` | `number` | `visible maximum` | Count that maps to the strongest level. |
| `cellSize` | `number` | `12` | Cell size in px. |
| `gap` | `number` | `3` | Gap between cells in px. |
| `label` | `string` | `the locale's` | Accessible name. |
| `selection` | `{ start: string; end?: string } \| null` | — | Controlled selected range. |
| `defaultSelection` | `{ start: string; end?: string } \| null` | `null` | Initially selected range. |
| `onSelectionChange` | `(selection) => void` | — | Called when a range is started, finished or cleared. |
| `children` | `ReactNode` | — | Custom composition of parts. |

### HeatCalendarGrid

The scrollable day grid with month and weekday labels.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `<HeatCalendarTooltip />` | Overlay rendered over the grid. |
| `className` | `string` | — | Classes for the outer element. |

| Data attribute | Description |
| --- | --- |
| `data-level` | On each cell: 0 (empty) to 4 (strongest). |
| `data-selected` | On cells inside the selected range. |

### HeatCalendarTooltip

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `(day: { date: string; time: number; count: number; level: number }) => ReactNode` | — | Custom body for the hovered or focused day. |
| `className` | `string` | — | Classes for the tooltip. |

### HeatCalendarSummary

Total for the period, or for the selected range with active days and Clear. Also accepts every prop of `div`.

### HeatCalendarLegend

Less-to-more swatch scale. Also accepts every prop of `div`.

### useHeatCalendar

Reads the root context (days, totals, selection, colours) to build your own parts.

### generateHeatCalendarData

Deterministic demo data with quieter weekends, called as `generateHeatCalendarData(rand, options)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rand` (required) | `() => number` | — | Random source (first argument). |
| `endDate` | `string` | `"2026-10-13"` | Last day generated. |
| `days` | `number` | `371` | Number of days. |
| `intensity` | `number` | `9` | Rough maximum daily count. |
