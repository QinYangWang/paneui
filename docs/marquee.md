# Marquee

> Scrolls content past in an endless loop.

Page: https://paneui.dev/docs/marquee/

## Installation

```bash
npx shadcn@latest add @paneui/marquee
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/marquee.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Marquee } from "@/components/ui/marquee"
```

```tsx
<Marquee>
  <span>Dinner booked for Friday</span>
  <span>Flight to Tokyo held</span>
</Marquee>
```

## Examples

### Vertical

```tsx
import { Marquee } from "@/registry/base-nova/ui/marquee"

const QUOTES = [
  { name: "Mei", text: "It booked the dentist before I remembered to." },
  { name: "Daniel", text: "Our team offsite planned in one afternoon." },
  { name: "Aiko", text: "I finally cancelled three subscriptions I forgot about." },
  { name: "Lucas", text: "Flight delayed? It had a new connection waiting." },
]

export default function MarqueeVertical() {
  return (
    <div className="grid h-72 w-full max-w-lg grid-cols-2 gap-3">
      {(["up", "down"] as const).map((direction) => (
        <Marquee key={direction} direction={direction} duration={22} gap="0.75rem">
          {QUOTES.map((q) => (
            <figure key={q.name} className="flex flex-col gap-2 rounded-xl bg-card p-4 text-sm shadow-raised">
              <blockquote className="text-pretty">“{q.text}”</blockquote>
              <figcaption className="text-xs text-muted-foreground">{q.name}</figcaption>
            </figure>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
```

### Without Fade

```tsx
import { Marquee } from "@/registry/base-nova/ui/marquee"

const TICKERS = [
  { symbol: "AAPL", change: "+1.24%", up: true },
  { symbol: "MSFT", change: "+0.58%", up: true },
  { symbol: "TSLA", change: "−2.10%", up: false },
  { symbol: "NVDA", change: "+3.02%", up: true },
  { symbol: "AMZN", change: "−0.34%", up: false },
]

export default function MarqueeNoFade() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-lg bg-muted py-2 shadow-well">
      <Marquee fade={false} pauseOnHover={false} duration={18} gap="2rem">
        {TICKERS.map((t) => (
          <span key={t.symbol} className="flex items-center gap-2 font-mono text-sm whitespace-nowrap tabular-nums">
            <span className="font-medium">{t.symbol}</span>
            <span className={t.up ? "text-success" : "text-destructive"}>{t.change}</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
```

### Repeat

```tsx
import { Marquee } from "@/registry/base-nova/ui/marquee"

const TAGS = ["Flights", "Hotels", "Dinner"]

export default function MarqueeRepeat() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">repeat 2 (default): gaps appear</span>
        <Marquee duration={12} gap="0.5rem">
          {TAGS.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-3 py-1 text-sm shadow-raised">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">repeat 6: the track stays full</span>
        <Marquee duration={12} gap="0.5rem" repeat={6}>
          {TAGS.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-3 py-1 text-sm shadow-raised">
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
```

## Accessibility

Only the first copy of the content is exposed; the repeats are `aria-hidden` and `inert`. By default the loop pauses on hover and while anything inside has keyboard focus.

## Motion

Under `prefers-reduced-motion: reduce` the track is paused in place.

## API Reference

### Marquee

Loops its children endlessly along one axis with a CSS animation. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Scroll direction. |
| `duration` | `number` | `30` | Seconds for one full loop of the content. |
| `gap` | `string` | `"1rem"` | Space between items (any CSS length). |
| `pauseOnHover` | `boolean` | `true` | Pause while hovered or while something inside has focus. |
| `fade` | `boolean` | `true` | Fade the leading and trailing edges with a mask. |
| `repeat` | `number` | `2` | Copies of the content in the track (minimum 2). |

| Data attribute | Description |
| --- | --- |
| `data-orientation` | "horizontal" or "vertical", from `direction`. |
| `data-slot` | "marquee" on the root (unclipped, so a border or ring on it stays visible), "marquee-viewport" on the inner element that clips and fades, "marquee-track" on each copy. |
