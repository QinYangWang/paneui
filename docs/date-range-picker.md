# Date Range Picker

> Picks a start and end date from a calendar.

Page: https://paneui.dev/docs/date-range-picker/

## Installation

```bash
npx shadcn@latest add @paneui/date-range-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/date-range-picker.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/popover`, `@paneui/locale-provider`.

## Usage

```tsx
import { DateRangePicker, DateRangePickerCalendar, DateRangePickerContent, DateRangePickerTrigger } from "@/components/ui/date-range-picker"
```

```tsx
<DateRangePicker>
  <DateRangePickerTrigger />
  <DateRangePickerContent>
    <DateRangePickerCalendar />
  </DateRangePickerContent>
</DateRangePicker>
```

## Composition

```text
DateRangePicker
├── DateRangePickerTrigger
└── DateRangePickerContent
    ├── DateRangePickerPresets
    │   └── DateRangePickerPreset
    ├── DateRangePickerCalendar
    │   └── DateRangePickerGrid (one per month)
    └── DateRangePickerFooter
        ├── DateRangePickerSummary
        └── DateRangePickerClear
```

## Examples

### Inline

Leave out the trigger and content when the calendar should sit in the page instead of a popup.

```tsx
import {
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerClear,
  DateRangePickerFooter,
  DateRangePickerSummary,
} from "@/registry/base-nova/ui/date-range-picker"

export default function DateRangePickerInline() {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-raised">
      <DateRangePicker>
        <DateRangePickerCalendar />
        <DateRangePickerFooter>
          <DateRangePickerSummary unit={["day", "days"]} />
          <DateRangePickerClear />
        </DateRangePickerFooter>
      </DateRangePicker>
    </div>
  )
}
```

### Unavailable Dates

```tsx
"use client"

import {
  addDays,
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerSummary,
  DateRangePickerTrigger,
  startOfDay,
} from "@/registry/base-nova/ui/date-range-picker"

const today = startOfDay(new Date())
// Pretend these nights are already booked.
const booked = new Set([3, 4, 10, 17, 18].map((n) => addDays(today, n).toDateString()))

export default function DateRangePickerUnavailableDates() {
  return (
    <DateRangePicker min={today} isDateDisabled={(d) => booked.has(d.toDateString())} closeOnComplete>
      <DateRangePickerTrigger placeholder="Choose your stay" />
      <DateRangePickerContent>
        <DateRangePickerCalendar />
        <DateRangePickerFooter>
          <DateRangePickerSummary />
        </DateRangePickerFooter>
      </DateRangePickerContent>
    </DateRangePicker>
  )
}
```

### Locale

```tsx
import {
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerSummary,
  DateRangePickerTrigger,
} from "@/registry/base-nova/ui/date-range-picker"

export default function DateRangePickerLocale() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <DateRangePicker locale="ja-JP" weekStartsOn={1}>
        <DateRangePickerTrigger placeholder="日付を選択" formatOptions={{ month: "long", day: "numeric" }} />
        <DateRangePickerContent>
          <DateRangePickerCalendar />
          <DateRangePickerFooter>
            <DateRangePickerSummary unit={["泊", "泊"]} />
          </DateRangePickerFooter>
        </DateRangePickerContent>
      </DateRangePicker>
      <DateRangePicker locale="de-DE">
        <DateRangePickerTrigger placeholder="Zeitraum wählen" />
        <DateRangePickerContent>
          <DateRangePickerCalendar />
          <DateRangePickerFooter>
            <DateRangePickerSummary unit={null} />
          </DateRangePickerFooter>
        </DateRangePickerContent>
      </DateRangePicker>
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  addDays,
  DateRangePicker,
  DateRangePickerCalendar,
  DateRangePickerContent,
  DateRangePickerFooter,
  DateRangePickerSummary,
  DateRangePickerTrigger,
  startOfDay,
  type DateRange,
} from "@/registry/base-nova/ui/date-range-picker"

const today = startOfDay(new Date())

export default function DateRangePickerControlled() {
  const [range, setRange] = React.useState<DateRange>({ from: addDays(today, -6), to: today })
  const [open, setOpen] = React.useState(false)

  return (
    <DateRangePicker
      value={range}
      onValueChange={setRange}
      open={open}
      onOpenChange={setOpen}
      max={today}
      min={addDays(today, -90)}
    >
      <DateRangePickerTrigger formatOptions={{ month: "short", day: "numeric" }} />
      <DateRangePickerContent>
        <DateRangePickerCalendar />
        <DateRangePickerFooter>
          <DateRangePickerSummary unit={["day", "days"]} />
          <Button size="sm" disabled={!range.to} onClick={() => setOpen(false)}>
            Apply
          </Button>
        </DateRangePickerFooter>
      </DateRangePickerContent>
    </DateRangePicker>
  )
}
```

## Keyboard

Each month is a `grid` with one tab stop. Arrows move by day and week, Home/End to the week's edges, PageUp/PageDown by month (with Shift, by year). Enter or Space picks the start, then the end; while choosing the end the range previews.

## Motion

With reduced motion, month changes cross-fade instead of sliding.

## Related

See also [Wheel Picker](https://paneui.dev/docs/wheel-picker) and [Color Picker](https://paneui.dev/docs/color-picker).

## API Reference

Built on [the Popover primitive](https://base-ui.com/react/components/popover#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### DateRangePicker

Range state plus the popover root. Dates are local-midnight `Date`s. Also accepts every prop of [Popover.Root](https://base-ui.com/react/components/popover#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `{ from?: Date; to?: Date }` | — | Controlled range. |
| `defaultValue` | `{ from?: Date; to?: Date }` | `{}` | Initial range when uncontrolled. |
| `onValueChange` | `(range: DateRange) => void` | — | Called on every pick, clear or preset. |
| `locale` | `string` | `the browser's` | BCP 47 locale for names and formatting. |
| `weekStartsOn` | `number` | `the locale's` | First column: `0` Sunday … `6` Saturday. |
| `numberOfMonths` | `1 \| 2` | `1` | Months shown side by side. |
| `min` | `Date` | — | Earliest selectable day. |
| `max` | `Date` | — | Latest selectable day. |
| `isDateDisabled` | `(date: Date) => boolean` | — | Extra rule for unavailable days. |
| `closeOnComplete` | `boolean` | `false` | Close the popover once both ends are picked. |

### DateRangePickerTrigger

Button that shows the formatted range (`Intl.formatRange`). Also accepts every prop of [Popover.Trigger](https://base-ui.com/react/components/popover#trigger).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | `"Pick dates"` | Shown while nothing is selected. |
| `formatOptions` | `Intl.DateTimeFormatOptions` | `{ month: "short", day: "numeric", year: "numeric" }` | How the range is formatted. |

| Data attribute | Description |
| --- | --- |
| `data-placeholder` | Present while showing the placeholder. |

### DateRangePickerContent

The library `PopoverContent` with tighter padding and auto width. Also accepts every prop of [PopoverContent](/docs/popover).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Trigger edge the panel lines up with. |

### DateRangePickerCalendar

Month titles, previous/next buttons and one grid per visible month. Also accepts every prop of `div`.

### DateRangePickerGrid

One month's day grid with roving focus. Used by the calendar; render it yourself for custom layouts. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `month` (required) | `Date` | — | Any day in the month to show. |
| `hideOutsideDays` | `boolean` | `false` | Leave days of neighbouring months blank. |

| Data attribute | Description |
| --- | --- |
| `data-selected` | On a day button that is the start or end. |
| `data-in-range` | On days between start and end. |
| `data-preview-end` | On the hovered or focused end while choosing. |
| `data-outside` | On days from a neighbouring month. |

### DateRangePickerSummary

The range and its length ("Mar 3 – 9 · 6 nights"), or a prompt for the next pick, announced in a polite live region. Also accepts every prop of `p`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `unit` | `[string, string] \| null` | `["night", "nights"]` | Singular and plural for the length; `null` hides it. |
| `formatOptions` | `Intl.DateTimeFormatOptions` | `{ month: "short", day: "numeric" }` | How the range is formatted. |

### DateRangePickerFooter

Row under the calendar, separated by a hairline. Also accepts every prop of `div`.

### DateRangePickerClear

Clears the range. Disabled while nothing is selected. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `"Clear"` | Button label. |

### DateRangePickerPresets

Vertical group of presets, labelled `Presets`. Also accepts every prop of `div`.

### DateRangePickerPreset

Quick range button; `aria-pressed` when it matches the selection. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `range` (required) | `DateRange \| (() => DateRange)` | — | The range to apply. A function is evaluated at click time, e.g. for "Last 7 days". |

### useDateRangePicker

Picker state and actions for custom parts. Use inside `DateRangePicker`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `range` | `DateRange` | — | Current range. |
| `setRange` | `(next: DateRange) => void` | — | Replace the range. |
| `selectDate` | `(date: Date) => void` | — | Pick a day as if clicked. |
| `clear` | `() => void` | — | Clear the range. |
| `month` | `Date` | — | First visible month. |
| `setMonth` | `(month: Date) => void` | — | Page to a month. |
| `isDisabled` | `(date: Date) => boolean` | — | Whether a day is unavailable. |
| `close` | `() => void` | — | Close the popover (no-op inline). |
