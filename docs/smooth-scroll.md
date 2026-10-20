# Smooth Scroll

> Eases scrolling for a page or a scroll container.

Page: https://paneui.dev/docs/smooth-scroll/

## Installation

```bash
npx shadcn@latest add @paneui/smooth-scroll
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/smooth-scroll.json
```

Packages: `lenis`, `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/scroll-area`.

## Usage

```tsx
import { SmoothScroll } from "@/components/ui/smooth-scroll"
```

```tsx
<SmoothScroll className="h-80">
  <Article />
</SmoothScroll>
```

## Examples

### Horizontal

Use for galleries and timelines that scroll sideways.

```tsx
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const STOPS = [
  { city: "Lisbon", days: "3 nights" },
  { city: "Porto", days: "2 nights" },
  { city: "Madrid", days: "4 nights" },
  { city: "Barcelona", days: "3 nights" },
  { city: "Valencia", days: "2 nights" },
  { city: "Seville", days: "3 nights" },
]

export default function SmoothScrollHorizontal() {
  return (
    <SmoothScroll
      orientation="horizontal"
      className="w-full max-w-md rounded-2xl bg-muted shadow-well"
      contentClassName="gap-3 p-4"
    >
      {STOPS.map((s) => (
        <div key={s.city} className="flex w-40 shrink-0 flex-col gap-1 rounded-xl bg-card p-4 shadow-raised">
          <p className="text-sm font-medium text-foreground">{s.city}</p>
          <p className="text-xs text-muted-foreground">{s.days}</p>
        </div>
      ))}
    </SmoothScroll>
  )
}
```

### Lerp vs Duration

```tsx
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const LINES = [
  "Wake at 6:30, no phone until coffee.",
  "Twenty minutes of stretching.",
  "Inbox to zero before 9.",
  "Deep work block until lunch.",
  "Walk after lunch, no podcasts.",
  "Meetings only in the afternoon.",
  "Write tomorrow's top three before logging off.",
  "Dinner with the screens away.",
]

function List() {
  return (
    <ul className="flex flex-col gap-2 p-1">
      {LINES.map((l) => (
        <li key={l} className="rounded-lg bg-card px-3 py-2 text-sm text-foreground shadow-raised">
          {l}
        </li>
      ))}
    </ul>
  )
}

export default function SmoothScrollEasing() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">lerp 0.04 — heavy</p>
        <SmoothScroll lerp={0.04} className="h-56 rounded-2xl bg-muted shadow-well">
          <List />
        </SmoothScroll>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">duration 0.6s — fixed</p>
        <SmoothScroll duration={0.6} wheelMultiplier={1.4} className="h-56 rounded-2xl bg-muted shadow-well">
          <List />
        </SmoothScroll>
      </div>
    </div>
  )
}
```

### Scroll to Section

```tsx
"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { SmoothScroll, useSmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const SECTIONS = [
  { id: "overview", title: "Overview", body: "A four-day offsite in Kyoto for the product team, 12 people in total." },
  { id: "travel", title: "Travel", body: "Flights land at KIX on Tuesday morning; the train to Kyoto takes 75 minutes." },
  { id: "stay", title: "Stay", body: "Two machiya townhouses in Higashiyama, a ten-minute walk apart." },
  { id: "agenda", title: "Agenda", body: "Mornings for planning, afternoons free, one shared dinner each night." },
]

function Nav() {
  const { scrollTo } = useSmoothScroll()
  return (
    <div className="sticky top-0 z-10 flex gap-1 bg-muted p-1">
      {SECTIONS.map((s) => (
        <Button key={s.id} size="sm" variant="ghost" onClick={() => scrollTo(`#ss-${s.id}`, { offset: -48 })}>
          {s.title}
        </Button>
      ))}
    </div>
  )
}

export default function SmoothScrollScrollToSection() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-muted shadow-well" contentClassName="pb-40">
      <Nav />
      <div className="flex flex-col gap-3 px-3">
        {SECTIONS.map((s) => (
          <section key={s.id} id={`ss-${s.id}`} className="rounded-xl bg-card p-4 shadow-raised">
            <h3 className="text-balance text-sm font-semibold text-foreground">{s.title}</h3>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </SmoothScroll>
  )
}
```

## Scrollbars

Contained mode scrolls in a [Scroll Area](https://paneui.dev/docs/scroll-area): thin overlay bars inside the frame that follow the eased position. `container` points at its viewport.

## Motion

Under reduced motion nothing is eased, so scrolling is native and `scrollTo` jumps instead of animating. Touch scrolling stays native unless you set `touch`.

## Related

[Scroll Progress](https://paneui.dev/docs/scroll-progress), [Scroll To](https://paneui.dev/docs/scroll-to) and [Scroll Reveal](https://paneui.dev/docs/scroll-reveal) read this provider.

## API Reference

### SmoothScroll

Eased scroll container (or, with `root`, a provider that eases the window). Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | `boolean` | `false` | `true` eases the whole page and renders only the provider. `false` renders its own scroll container; give it a height. |
| `lerp` | `number` | `0.1` | Smoothing per frame, 0–1. Lower is heavier. Ignored when `duration` is set. |
| `duration` | `number` | — | Fixed ease duration in seconds for wheel and programmatic scrolls. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Scroll axis. |
| `wheelMultiplier` | `number` | `1` | Multiplies wheel deltas. |
| `touch` | `boolean` | `false` | Ease touch scrolling too. Off by default so phones keep native momentum. |
| `contentClassName` | `string` | — | Class for the inner content element (contained mode only). |

| Data attribute | Description |
| --- | --- |
| `data-smooth` | Present on the container while it is eased. |

### useSmoothScroll

Scroll state for the nearest `SmoothScroll`. Outside a provider it falls back to the window's native scroll.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `lenis` | `Lenis \| null` | — | The easing instance, or `null` on the native or reduced-motion path. |
| `smooth` | `boolean` | — | Whether scrolling is currently eased. |
| `container` | `RefObject<HTMLElement \| null> \| null` | — | The scroll container, or `null` for the window. |
| `offset` | `MotionValue<number>` | — | Current scroll offset in px. |
| `progress` | `MotionValue<number>` | — | Scroll position from 0 (start) to 1 (end). |
| `velocity` | `MotionValue<number>` | — | Signed scroll velocity in px per frame. |
| `scrollTo` | `(target: number \| string \| HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void` | — | Scroll to a px offset, selector or element. Jumps under reduced motion. |

### useSmoothScrollContainer

The nearest `SmoothScroll`'s container ref, or `null` for the window or no provider. Pass it to motion's `useScroll({ container })`.
