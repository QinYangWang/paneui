# Scroll Area

> Scroll container with thin scrollbars that stay inside its frame.

Page: https://paneui.dev/docs/scroll-area/

## Installation

```bash
npx shadcn@latest add @paneui/scroll-area
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/scroll-area.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
```

```tsx
<ScrollArea className="h-72 rounded-2xl bg-card">
  <List />
</ScrollArea>
```

## Composition

```text
ScrollArea
├── Viewport
├── ScrollBar (vertical)
└── ScrollBar (horizontal)
```

## Examples

### Both Axes

Use for grids and schedules wider and taller than their frame.

```tsx
import { ScrollArea } from "@/registry/base-nova/ui/scroll-area"

const HOURS = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`)
const ROOMS = ["Atlas", "Birch", "Cedar", "Delta", "Elm", "Fjord", "Grove", "Harbor"]

export default function ScrollAreaBoth() {
  return (
    <ScrollArea orientation="both" className="h-72 w-full max-w-md rounded-xl bg-card shadow-raised">
      <div className="grid w-max grid-cols-[4rem_repeat(8,8rem)] text-sm">
        <div />
        {ROOMS.map((room) => (
          <div key={room} className="px-3 py-2 font-medium text-foreground">
            {room}
          </div>
        ))}
        {HOURS.map((hour, h) => (
          <div key={hour} className="contents">
            <div className="px-3 py-2 text-xs text-muted-foreground tabular-nums">{hour}</div>
            {ROOMS.map((room, r) => (
              <div key={room} className="px-3 py-2 text-muted-foreground">
                {(h + r) % 5 === 0 ? "Booked" : "Free"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

### Sticky Header

```tsx
import { ScrollArea } from "@/registry/base-nova/ui/scroll-area"

const MEMBERS = [
  ["Mina Park", "Design"],
  ["Leo Chen", "Engineering"],
  ["Ava Ruiz", "Product"],
  ["Sam Okafor", "Engineering"],
  ["Noor Haddad", "Research"],
  ["Kai Tanaka", "Design"],
  ["Iris Novak", "Support"],
  ["Omar Said", "Engineering"],
  ["Lena Vogel", "Marketing"],
  ["Ravi Shah", "Finance"],
]

export default function ScrollAreaStickyHeader() {
  return (
    <ScrollArea scrollbarMargin={{ top: 40 }} className="h-72 w-full max-w-sm rounded-xl bg-card shadow-raised">
      <div className="sticky top-0 z-10 flex h-10 items-center border-b border-border bg-card px-4 text-sm font-medium text-foreground">
        Team · {MEMBERS.length}
      </div>
      <ul>
        {MEMBERS.map(([name, team]) => (
          <li key={name} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <span className="text-foreground">{name}</span>
            <span className="text-muted-foreground">{team}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
```

## Track placement

Each track sits inside the frame, `scrollbarInset` (4px) from its edges, so it never runs past a rounded corner. Where a corner's radius would still clip the thumb's cap, that end moves in until the cap clears the curve by 1px (7px on an 18px corner). Where both bars show, each stops 8px short of the other. The thumb always covers the whole scroll range.

## Visibility

The 6px bars overlay the content and take no width. They show while the pointer is over the area or it is scrolling, and fade out 300ms after. The hit area is 4px wider on each side than the track.

## Height

Give the root a fixed height (`h-72`), or leave it auto and put `max-h-*` on `viewportClassName`. A `max-h-*` on the root alone never scrolls.

## Accessibility

The viewport joins the tab order only while it can scroll, so keyboard users can scroll it with the arrow keys; it shows the focus ring inset.

## Overlays

The root publishes `--scroll-area-inset`, `--scroll-area-radius-top` and `--scroll-area-radius-bottom`, so content inside can follow the frame's edge. [Scroll Progress](https://paneui.dev/docs/scroll-progress) uses them for its sticky bar.

## API Reference

Built on [the Scroll Area primitive](https://base-ui.com/react/components/scroll-area#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ScrollArea

Root and viewport in one, with its own scrollbars. Also accepts every prop of [ScrollArea.Root](https://base-ui.com/react/components/scroll-area#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Which scrollbars to show. The other axis is clipped. |
| `scrollbarInset` | `number` | `4` | Gap in px between each track and the frame edges. |
| `scrollbarMargin` | `{ top?: number; bottom?: number; start?: number; end?: number }` | — | Extra px on one side, added to the inset, such as a sticky header's height on `top`. |
| `fade` | `boolean` | `false` | Fades content over 24px at an edge while there is more to scroll there. |
| `viewportRef` | `Ref<HTMLDivElement>` | — | The element that scrolls, for scroll listeners, virtualizers and `scrollTo`. |
| `viewportClassName` | `string` | — | Classes for the element that scrolls. |
| `viewportProps` | `ComponentProps<"div">` | — | Props for the element that scrolls, such as `role`, `aria-*`, `onScroll` or `style`. |

| Data attribute | Description |
| --- | --- |
| `data-scrolling` | Present while the area is scrolling. |
| `data-has-overflow-x / -y` | Present while the content overflows on that axis. |
| `data-overflow-y-start / -end` | Present while there is more to scroll towards that edge (also `-x-`). |

### ScrollBar

One overlay scrollbar, placed from the root's inset variables. `ScrollArea` renders its own; use this only when composing the primitive parts yourself. Also accepts every prop of [ScrollArea.Scrollbar](https://base-ui.com/react/components/scroll-area#scrollbar).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Axis the bar scrolls. |

| Data attribute | Description |
| --- | --- |
| `data-hovering` | Present while the pointer is over the area. |
