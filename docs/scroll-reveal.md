# Scroll Reveal

> Brings content into view as it scrolls onscreen.

Page: https://paneui.dev/docs/scroll-reveal/

## Installation

```bash
npx shadcn@latest add @paneui/scroll-reveal
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/scroll-reveal.json
```

Packages: `motion`, `lenis`.

Registry items it builds on: `@paneui/theme`, `@paneui/smooth-scroll`.

## Usage

```tsx
import { ScrollReveal } from "@/components/ui/scroll-reveal"
```

```tsx
<ScrollReveal>
  <FeatureCard />
</ScrollReveal>
```

## Examples

### Directions

```tsx
import { ScrollReveal } from "@/registry/base-nova/ui/scroll-reveal"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const FROM = ["bottom", "top", "left", "right"] as const

export default function ScrollRevealDirections() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-col gap-4 px-4 pt-72 pb-10">
        {FROM.map((from) => (
          <ScrollReveal key={from} from={from} distance={40} once={false}>
            <div className="rounded-xl bg-card p-4 text-sm font-medium text-foreground shadow-raised">
              from=&quot;{from}&quot;
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SmoothScroll>
  )
}
```

### Stagger

Use for lists and grids so items arrive one after another.

```tsx
import { ScrollReveal } from "@/registry/base-nova/ui/scroll-reveal"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const PLANS = [
  { name: "Solo", price: "Free", note: "One person, the essentials." },
  { name: "Household", price: "$8/mo", note: "Up to five people, shared lists." },
  { name: "Family office", price: "$40/mo", note: "Assistants, approvals and audit log." },
]

export default function ScrollRevealStagger() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="grid grid-cols-3 gap-3 px-4 pt-80 pb-10">
        {PLANS.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.1} distance={12} blur={4} amount="all">
            <div className="flex h-full flex-col gap-1 rounded-xl bg-card p-3 shadow-raised">
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <p className="text-base font-semibold tabular-nums">{p.price}</p>
              <p className="text-xs text-pretty text-muted-foreground">{p.note}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SmoothScroll>
  )
}
```

## Motion

Under reduced motion it only fades in, over 200 ms.

## Related

Uses the container from [Smooth Scroll](https://paneui.dev/docs/smooth-scroll). See also [Scroll Progress](https://paneui.dev/docs/scroll-progress), [Scroll To](https://paneui.dev/docs/scroll-to).

## API Reference

### ScrollReveal

Fades, slides and unblurs its content in when it enters the nearest contained `SmoothScroll` or the viewport. Also accepts every prop of [motion.div](https://motion.dev/docs/react-motion-component).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `from` | `"bottom" \| "top" \| "left" \| "right"` | `"bottom"` | Edge the content slides in from. |
| `distance` | `number` | `24` | Slide distance in px. |
| `blur` | `number` | `8` | Starting blur in px. |
| `delay` | `number` | `0` | Delay in seconds, for staggering siblings. |
| `once` | `boolean` | `true` | Reveal once, or every time it re-enters view. |
| `amount` | `"some" \| "all" \| number` | `0.3` | How much must be visible to trigger. |
| `root` | `RefObject<Element \| null>` | — | Scroll root. Defaults to the nearest contained SmoothScroll, then the viewport. |

| Data attribute | Description |
| --- | --- |
| `data-revealed` | Present while the content is in view. |
