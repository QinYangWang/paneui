# Timeline

> Lists entries in time order along a line.

Page: https://paneui.dev/docs/timeline/

## Installation

```bash
npx shadcn@latest add @paneui/timeline
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/timeline.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Timeline, TimelineDescription, TimelineItem, TimelineTitle } from "@/components/ui/timeline"
```

```tsx
<Timeline>
  <TimelineItem time="08:00" action={<Button variant="ghost" size="icon-xs" aria-label="Delete"><TrashIcon /></Button>}>
    <TimelineTitle>Morning brief</TimelineTitle>
    <TimelineDescription>Weather, calendar and headlines</TimelineDescription>
  </TimelineItem>
</Timeline>
```

## Composition

```text
Timeline
└── TimelineItem
    ├── TimelineTitle
    └── TimelineDescription
```

## Examples

### Cards

Use cards when each entry carries more than two lines.

```tsx
"use client"

import { Card, CardContent } from "@/registry/base-nova/ui/card"
import { Timeline, TimelineDescription, TimelineItem, TimelineTitle } from "@/registry/base-nova/ui/timeline"

export default function TimelineCards() {
  return (
    <Timeline className="w-full max-w-md">
      <TimelineItem time="Mon" timeDetail="Oct 12" tone="success">
        <Card size="sm">
          <CardContent>
            <TimelineTitle>Deployed v2.4</TimelineTitle>
            <TimelineDescription>All checks passed.</TimelineDescription>
          </CardContent>
        </Card>
      </TimelineItem>
      <TimelineItem time="Wed" timeDetail="Oct 14" tone="destructive">
        <Card size="sm">
          <CardContent>
            <TimelineTitle>Rollback</TimelineTitle>
            <TimelineDescription>Login errors on Safari.</TimelineDescription>
          </CardContent>
        </Card>
      </TimelineItem>
      <TimelineItem time="Fri" timeDetail="Oct 16" tone="primary">
        <Card size="sm">
          <CardContent>
            <TimelineTitle>Deploy v2.5</TimelineTitle>
            <TimelineDescription>Scheduled for 10:00.</TimelineDescription>
          </CardContent>
        </Card>
      </TimelineItem>
    </Timeline>
  )
}
```

## Time column

The column is 3.5rem wide; set `--timeline-time` on the `Timeline` for longer labels. Leave `time` out on every item to drop the column.

## Hairline

The line starts at the first dot and ends at the last, so a single entry shows a dot alone.

## API Reference

### Timeline

Also accepts every prop of `ol`.

### TimelineItem

Also accepts every prop of `li`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time` | `ReactNode` | — | Text in the time column. |
| `timeDetail` | `ReactNode` | — | Quieter second line under the time, such as a date. |
| `tone` | `"default" \| "primary" \| "success" \| "warning" \| "destructive"` | `"default"` | Dot colour; `primary` marks the current or next entry. |
| `action` | `ReactNode` | — | Trailing control aligned with the first line. |

| Data attribute | Description |
| --- | --- |
| `data-tone` | The item's tone. |

### TimelineTitle

Also accepts every prop of `div`.

### TimelineDescription

Also accepts every prop of `div`.
