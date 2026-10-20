# Calendar

> Month grid for picking a date or a range.

Page: https://paneui.dev/docs/calendar/

## Installation

```bash
npx shadcn@latest add @paneui/calendar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/calendar.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { Calendar } from "@/components/ui/calendar"
```

```tsx
const [date, setDate] = React.useState<Date | null>(new Date())

<Calendar value={date} onValueChange={setDate} />
```

## Examples

### Range

```tsx
"use client"

import * as React from "react"

import { Calendar, type DateRange } from "@/registry/base-nova/ui/calendar"
import { Card } from "@/registry/base-nova/ui/card"

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange>(() => {
    const from = new Date()
    return { from, to: new Date(from.getFullYear(), from.getMonth(), from.getDate() + 5) }
  })
  return (
    <Card className="w-fit p-3">
      <Calendar mode="range" numberOfMonths={2} value={range} onValueChange={setRange} />
    </Card>
  )
}
```

### Disabled Days

Use when only some days can be booked.

```tsx
import { Calendar } from "@/registry/base-nova/ui/calendar"
import { Card } from "@/registry/base-nova/ui/card"

const weekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6

export default function CalendarDisabledDays() {
  return (
    <Card className="w-fit p-3">
      <Calendar min={new Date()} disabled={weekend} weekStartsOn={1} />
    </Card>
  )
}
```

### RTL

```tsx
"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Calendar } from "@/registry/base-nova/ui/calendar"
import { Card } from "@/registry/base-nova/ui/card"

export default function CalendarRtl() {
  const [date, setDate] = React.useState<Date | null>(() => new Date())
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Card className="w-fit p-3">
          <Calendar value={date} onValueChange={setDate} locale="ar" />
        </Card>
      </div>
    </DirectionProvider>
  )
}
```

## Keyboard

Arrow keys move by day and week, Home/End to the edges of the week, PageUp/PageDown by month and Shift+PageUp/PageDown by year. One day in the grid is tabbable.

## Locale

Month names, weekday initials and the first day of the week follow `locale` (the browser's by default). Set `weekStartsOn` to override the week.

## API Reference

### Calendar

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `"single" \| "range"` | `"single"` | Pick one date or a range. |
| `value` | `Date \| null  ·  { from?: Date; to?: Date }` | — | Controlled selection (shape follows `mode`). |
| `defaultValue` | `same as value` | — | Initial selection when uncontrolled. |
| `onValueChange` | `(value) => void` | — | Called with the new date or range. Clicking the selected date clears a single selection. |
| `month` | `Date` | — | Controlled first visible month. |
| `defaultMonth` | `Date` | `the selection's month or today` | First visible month when uncontrolled. |
| `onMonthChange` | `(month: Date) => void` | — | Called when the visible month changes. |
| `numberOfMonths` | `number` | `1` | Months side by side. |
| `min` | `Date` | — | Earliest selectable day. |
| `max` | `Date` | — | Latest selectable day. |
| `disabled` | `(date: Date) => boolean` | — | Extra unavailable days. |
| `weekStartsOn` | `0–6` | `the locale's` | First weekday (0 = Sunday). |
| `locale` | `string` | — | BCP 47 locale for names and week start. |
| `showOutsideDays` | `boolean` | `true` | Show neighbouring months' days (one month only). |
