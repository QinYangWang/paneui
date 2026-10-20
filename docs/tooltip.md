# Tooltip

> Labels a control with a short hint on hover or focus.

Page: https://paneui.dev/docs/tooltip/

## Installation

```bash
npx shadcn@latest add @paneui/tooltip
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/tooltip.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/kbd`.

## Usage

```tsx
import { Tooltip, TooltipContent, TooltipKbd, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
```

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label="Copy" />}>
      <CopyIcon />
    </TooltipTrigger>
    <TooltipContent>
      Copy <TooltipKbd>⌘C</TooltipKbd>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Composition

```text
TooltipProvider
└── Tooltip
    ├── TooltipTrigger
    └── TooltipContent
        └── TooltipKbd
```

## Examples

### Sides

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

const sides = ["top", "right", "bottom", "left"] as const

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="secondary" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>Opens on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
```

### Align

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

const aligns = ["start", "center", "end"] as const

export default function TooltipAlign() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {aligns.map((align) => (
        <Tooltip key={align}>
          <TooltipTrigger render={<Button variant="secondary" />}>Align {align}</TooltipTrigger>
          <TooltipContent side="bottom" align={align}>
            Lined up with the {align} edge
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
```

### With Icon

```tsx
import { InfoIcon, LockIcon } from "@/components/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

export default function TooltipWithIcon() {
  return (
    <p className="max-w-sm text-center text-sm text-pretty text-muted-foreground">
      Your API key is stored{" "}
      <Tooltip>
        <TooltipTrigger render={<span tabIndex={0} />}>
          <span className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4">
            encrypted
            <InfoIcon size={14} className="text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <LockIcon size={14} />
          AES-256 at rest, never logged
        </TooltipContent>
      </Tooltip>{" "}
      and only used for requests you start.
    </p>
  )
}
```

### Delay

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary" />}>Instant</TooltipTrigger>
          <TooltipContent>Shows with no delay</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delay={1000}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary" />}>Patient</TooltipTrigger>
          <TooltipContent>Shows after one second</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
```

## Motion

The tooltip scales from 90% and nudges 4px toward the trigger over 150ms. Moving between triggers in the same provider shows the next one instantly.

## Accessibility

Tooltips open on hover and keyboard focus, and close with `Esc`. Keep essential information out of tooltips, since touch users can't hover.

## API Reference

Built on [the Tooltip primitive](https://base-ui.com/react/components/tooltip#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### TooltipProvider

Shares the open delay between tooltips. The docs app wraps everything in one. Also accepts every prop of [Tooltip.Provider](https://base-ui.com/react/components/tooltip#provider).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | `300` | Milliseconds before a tooltip opens. |
| `closeDelay` | `number` | — | Milliseconds before it closes. |

### Tooltip

Re-export of the primitive root. Also accepts every prop of [Tooltip.Root](https://base-ui.com/react/components/tooltip#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. |
| `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Called when the tooltip opens or closes. |

### TooltipTrigger

Re-export. Use `render` to make a Button the trigger. Also accepts every prop of [Tooltip.Trigger](https://base-ui.com/react/components/tooltip#trigger).

### TooltipContent

Portal, positioner and popup in one. Also accepts every prop of [Tooltip.Popup](https://base-ui.com/react/components/tooltip#popup).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left" \| "inline-start" \| "inline-end"` | `"top"` | Side of the trigger to open on. Passed to the positioner. |
| `sideOffset` | `number` | `8` | Gap from the trigger in px. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the trigger. |

| Data attribute | Description |
| --- | --- |
| `data-side` | The side it actually opened on, after collision handling. |
| `data-instant` | Present when it opens without animation (moving between triggers). |

### TooltipKbd

Small keycap for a shortcut, pulled to the trailing edge. Also accepts every prop of `kbd`.
