# Scroll To

> Button that scrolls to a section or position.

Page: https://paneui.dev/docs/scroll-to/

## Installation

```bash
npx shadcn@latest add @paneui/scroll-to
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/scroll-to.json
```

Packages: `@base-ui/react`, `lenis`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/button`, `@paneui/smooth-scroll`.

## Usage

```tsx
import { ScrollTo } from "@/components/ui/scroll-to"
```

```tsx
<ScrollTo to="#pricing" offset={-64}>See pricing</ScrollTo>
```

## Examples

### Variants and Sizes

```tsx
import { ArrowDownIcon } from "@/components/icons"
import { ScrollTo } from "@/registry/base-nova/ui/scroll-to"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

export default function ScrollToVariants() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-wrap items-center gap-2 p-4">
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16}>
          Secondary
        </ScrollTo>
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16} variant="default">
          See pricing
        </ScrollTo>
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16} variant="ghost" size="sm">
          Ghost <ArrowDownIcon data-icon="inline-end" />
        </ScrollTo>
        <ScrollTo to="#scroll-to-variants-pricing" offset={-16} variant="outline" size="icon" aria-label="Jump to pricing">
          <ArrowDownIcon />
        </ScrollTo>
      </div>
      <div className="h-96" />
      <section id="scroll-to-variants-pricing" className="m-4 rounded-xl bg-card p-5 shadow-raised">
        <h3 className="text-balance text-base font-semibold">Pricing</h3>
        <p className="mt-1 text-sm text-muted-foreground">Free for one person. $8 a month for households of up to five.</p>
      </section>
    </SmoothScroll>
  )
}
```

### Duration

```tsx
import { ScrollTo } from "@/registry/base-nova/ui/scroll-to"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

export default function ScrollToDuration() {
  return (
    <SmoothScroll className="h-72 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="sticky top-0 z-10 flex gap-2 bg-muted p-3">
        <ScrollTo to="#scroll-to-duration-day-31" size="sm">
          Default ease
        </ScrollTo>
        <ScrollTo to="#scroll-to-duration-day-31" duration={2} size="sm">
          2 s glide
        </ScrollTo>
        <ScrollTo to={0} duration={0.4} size="sm" variant="ghost">
          Back to the 1st
        </ScrollTo>
      </div>
      <ol className="flex flex-col gap-2 px-3 pb-3">
        {DAYS.map((d) => (
          <li
            key={d}
            id={`scroll-to-duration-day-${d}`}
            className="rounded-lg bg-card px-3 py-2 text-sm text-foreground shadow-raised tabular-nums"
          >
            October {d}
          </li>
        ))}
      </ol>
    </SmoothScroll>
  )
}
```

### Outside a Provider

```tsx
import { ArrowUpIcon } from "@/components/icons"
import { ScrollTo } from "@/registry/base-nova/ui/scroll-to"

export default function ScrollToWindow() {
  return (
    <ScrollTo to={0} variant="ghost" size="sm">
      <ArrowUpIcon data-icon="inline-start" />
      Back to top of page
    </ScrollTo>
  )
}
```

## Accessibility

Set `focusTarget` to move keyboard focus to a selector or element target after scrolling (it adds `tabindex="-1"` if needed). Under reduced motion the scroll jumps instead of easing.

## Related

Scrolls through [Smooth Scroll](https://paneui.dev/docs/smooth-scroll). See also [Scroll Progress](https://paneui.dev/docs/scroll-progress), [Scroll Reveal](https://paneui.dev/docs/scroll-reveal).

## API Reference

### ScrollTo

Button that eases to a target through the nearest `SmoothScroll`, or the window. Also accepts every prop of [Button](/docs/button).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `to` (required) | `number \| string \| HTMLElement` | — | A px offset, a CSS selector or an element. |
| `offset` | `number` | — | Extra px from the target, e.g. `-64` to clear a sticky header. |
| `duration` | `number` | — | Ease duration in seconds, only inside a `SmoothScroll` that is easing. |
| `focusTarget` | `boolean` | `false` | Move keyboard focus to a selector or element target after scrolling. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | — | Runs before scrolling; call `event.preventDefault()` to cancel the scroll. |
| `variant` | `Button variant` | `"secondary"` | Visual style. |
