# Date Picker

> Field that opens a calendar to pick one date.

Page: https://paneui.dev/docs/date-picker/

## Installation

```bash
npx shadcn@latest add @paneui/date-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/date-picker.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/control-size`, `@paneui/calendar`, `@paneui/popover`, `@paneui/select`, `@paneui/locale-provider`.

## Usage

```tsx
import { DatePicker } from "@/components/ui/date-picker"
```

```tsx
const [date, setDate] = React.useState<Date | null>(null)

<DatePicker value={date} onValueChange={setDate} />
```

## Examples

### Sizes

```tsx
import { DatePicker } from "@/registry/base-nova/ui/date-picker"

export default function DatePickerSizes() {
  return (
    <div className="flex flex-col items-start gap-3">
      <DatePicker size="sm" aria-label="Start date" />
      <DatePicker aria-label="Due date" />
      <DatePicker size="lg" aria-label="Launch date" formatOptions={{ dateStyle: "full" }} />
    </div>
  )
}
```

## Behaviour

Picking a date closes the popup and returns focus to the trigger; pass `keepOpen` to leave it open. Inside a sized `Field` the trigger follows the field's size.

## API Reference

### DatePicker

Every `Calendar` prop except `mode` passes through to the calendar. Also accepts every prop of [Calendar](/docs/calendar#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| null` | — | Controlled date. |
| `onValueChange` | `(date: Date \| null) => void` | — | Called when a date is picked. |
| `placeholder` | `string` | `"Pick a date"` | Trigger text with no date. |
| `formatOptions` | `Intl.DateTimeFormatOptions` | `{ dateStyle: "medium" }` | How the date reads on the trigger. |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Trigger height (24 / 28 / 32 / 36px). |
| `keepOpen` | `boolean` | `false` | Stay open after a pick. |
