# Expandable Control

> Button or chip that expands on click to reveal a label.

Page: https://paneui.dev/docs/expandable-control/

## Installation

```bash
npx shadcn@latest add @paneui/expandable-control
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/expandable-control.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ExpandableButton, ExpandableChip } from "@/components/ui/expandable-control"
```

```tsx
<ExpandableButton icon={<BellIcon />} label="Notify me" />
```

## Examples

### Controlled

```tsx
"use client"

import * as React from "react"

import { MicIcon, MonitorIcon, UsersIcon } from "@/components/icons"
import { ExpandableButton } from "@/registry/base-nova/ui/expandable-control"

const TOOLS = [
  { id: "mic", icon: <MicIcon />, label: "Microphone on" },
  { id: "screen", icon: <MonitorIcon />, label: "Sharing screen" },
  { id: "people", icon: <UsersIcon />, label: "4 participants" },
]

export default function ExpandableControlControlled() {
  const [active, setActive] = React.useState<string | null>("mic")
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {TOOLS.map((tool) => (
          <ExpandableButton
            key={tool.id}
            icon={tool.icon}
            label={tool.label}
            expanded={active === tool.id}
            onExpandedChange={(open) => setActive(open ? tool.id : null)}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Only one control stays open at a time.</p>
    </div>
  )
}
```

### Chip Actions

```tsx
"use client"

import * as React from "react"

import { CopyIcon, EditIcon } from "@/components/icons"
import { ExpandableChip } from "@/registry/base-nova/ui/expandable-control"

export default function ExpandableControlChipActions() {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <ExpandableChip
          label="INV-2048"
          actionIcon={<CopyIcon />}
          actionLabel="Copy invoice number"
          onAction={() => setCopied(true)}
        />
        <ExpandableChip
          label="Due Oct 31"
          actionIcon={<EditIcon />}
          actionLabel="Edit due date"
          collapseOnAction={false}
          defaultExpanded
        />
        <ExpandableChip label="Archived" actionIcon={<EditIcon />} actionLabel="Edit status" disabled />
      </div>
      <p className="text-xs text-muted-foreground">{copied ? "Invoice number copied." : "Click a chip to reveal its action."}</p>
    </div>
  )
}
```

### Prevent Toggle

```tsx
"use client"

import * as React from "react"

import { BellIcon } from "@/components/icons"
import { ExpandableButton } from "@/registry/base-nova/ui/expandable-control"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function ExpandableControlPreventToggle() {
  const [allowed, setAllowed] = React.useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <ExpandableButton
        icon={<BellIcon />}
        label="Alerts paused"
        onClick={(event) => {
          if (!allowed) event.preventDefault()
        }}
      />
      <label className="flex items-center gap-2 text-sm">
        <Switch checked={allowed} onCheckedChange={setAllowed} />
        Allow pausing alerts
      </label>
    </div>
  )
}
```

## Keyboard

Both parts expose `aria-expanded`. In a chip, `Escape` tucks the action away and returns focus to the chip; after an action runs, focus also returns to the chip.

## Motion

The width springs between natural sizes (300 / 24 / 0.8). With reduced motion the width changes instantly and the revealed part only fades.

## API Reference

Built on [the Button primitive](https://base-ui.com/react/components/button#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ExpandableButton

Icon button that grows to reveal its label on click. Also accepts every prop of [Button](https://base-ui.com/react/components/button#api-reference).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` (required) | `ReactNode` | — | Always visible. |
| `label` (required) | `ReactNode` | — | Revealed beside the icon when expanded. |
| `expanded` | `boolean` | — | Controlled expanded state. |
| `defaultExpanded` | `boolean` | `false` | Initial expanded state. |
| `onExpandedChange` | `(expanded: boolean) => void` | — | Called when it toggles. |
| `aria-label` | `string` | `label, if a string` | Accessible name (the label itself is `aria-hidden`). |

| Data attribute | Description |
| --- | --- |
| `data-expanded` | Present while expanded (primary fill). |

### ExpandableChip

Chip that reveals a trailing action button when clicked.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `ReactNode` | — | The chip's text; clicking it toggles the action. |
| `actionIcon` (required) | `ReactNode` | — | Icon in the revealed action button. |
| `actionLabel` (required) | `string` | — | Accessible name for the action, e.g. "Remove Design". |
| `onAction` | `() => void` | — | Called when the action is clicked. |
| `collapseOnAction` | `boolean` | `true` | Collapse (and return focus to the chip) after the action runs. |
| `actionTone` | `"default" \| "destructive"` | `"default"` | Visual tone of the action. |
| `expanded` | `boolean` | — | Controlled expanded state. |
| `defaultExpanded` | `boolean` | `false` | Initial expanded state. |
| `onExpandedChange` | `(expanded: boolean) => void` | — | Called when it toggles. |
| `disabled` | `boolean` | `false` | Disable the chip and its action. |
| `className` | `string` | — | Classes for the chip. |

| Data attribute | Description |
| --- | --- |
| `data-expanded` | Present while the action is shown. |
| `data-disabled` | Present when disabled. |
