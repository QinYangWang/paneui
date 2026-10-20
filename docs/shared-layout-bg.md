# Shared Layout Background

> Hover highlight that follows the pointer across a group.

Page: https://paneui.dev/docs/shared-layout-bg/

## Installation

```bash
npx shadcn@latest add @paneui/shared-layout-bg
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/shared-layout-bg.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { SharedLayoutBg, SharedLayoutBgItem } from "@/components/ui/shared-layout-bg"
```

```tsx
<SharedLayoutBg>
  <SharedLayoutBgItem render={<a href="/overview" />}>Overview</SharedLayoutBgItem>
  <SharedLayoutBgItem render={<a href="/settings" />}>Settings</SharedLayoutBgItem>
</SharedLayoutBg>
```

## Composition

```text
SharedLayoutBg
└── SharedLayoutBgItem
```

## Examples

### Horizontal

Use for nav bars laid out in a row.

```tsx
import { SharedLayoutBg, SharedLayoutBgItem } from "@/registry/base-nova/ui/shared-layout-bg"

const tabs = ["Overview", "Deployments", "Analytics", "Logs", "Settings"]

export default function SharedLayoutBgHorizontal() {
  return (
    <nav aria-label="Project">
      <SharedLayoutBg orientation="horizontal" className="gap-1">
        {tabs.map((tab) => (
          <SharedLayoutBgItem
            key={tab}
            render={<a href="#" />}
            className="h-8 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            {tab}
          </SharedLayoutBgItem>
        ))}
      </SharedLayoutBg>
    </nav>
  )
}
```

### Pill Style

Use when the highlight should match a different surface or reach past each item.

```tsx
import { SharedLayoutBg, SharedLayoutBgItem } from "@/registry/base-nova/ui/shared-layout-bg"

const people = [
  { name: "Mei Lin", role: "Design lead" },
  { name: "Kenji Sato", role: "Frontend" },
  { name: "Ana Ruiz", role: "Product" },
  { name: "Omar Haddad", role: "Infrastructure" },
]

export default function SharedLayoutBgPillStyle() {
  return (
    <SharedLayoutBg pillClassName="rounded-lg bg-primary/10 shadow-none" inset={8} className="w-full max-w-xs px-2">
      {people.map((p) => (
        <SharedLayoutBgItem
          key={p.name}
          render={<button type="button" />}
          className="h-11 justify-between gap-3 text-start text-sm outline-none"
        >
          <span className="font-medium">{p.name}</span>
          <span className="text-muted-foreground">{p.role}</span>
        </SharedLayoutBgItem>
      ))}
    </SharedLayoutBg>
  )
}
```

### Disabled

```tsx
import { CopyIcon, EditIcon, LinkIcon, TrashIcon } from "@/components/icons"
import { SharedLayoutBg, SharedLayoutBgItem } from "@/registry/base-nova/ui/shared-layout-bg"

const actions = [
  { label: "Rename", icon: EditIcon },
  { label: "Duplicate", icon: CopyIcon },
  { label: "Copy link", icon: LinkIcon, disabled: true },
  { label: "Delete", icon: TrashIcon },
]

export default function SharedLayoutBgDisabled() {
  return (
    <div role="menu" aria-label="File actions" className="w-full max-w-52 frame-xl frame-p-1 bg-popover shadow-surface">
      <SharedLayoutBg pillClassName="rounded-inner">
        {actions.map(({ label, icon: Icon, disabled }) => (
          <SharedLayoutBgItem
            key={label}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            className="h-8 gap-2 px-2.5 text-sm outline-none"
          >
            <Icon size={16} className="text-muted-foreground" />
            {label}
          </SharedLayoutBgItem>
        ))}
      </SharedLayoutBg>
    </div>
  )
}
```

## Motion

With reduced motion the pill jumps between items and only fades.

## Keyboard

The highlight follows focus as well as hover, so tabbing through links moves it. It only adds the highlight; give items real roles and focusability (links, buttons).

## API Reference

### SharedLayoutBg

The group that owns the shared highlight. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Stack items in a column or a row. |
| `pillClassName` | `string` | — | Classes for the gliding pill (colour, radius, shadow). Defaults to `rounded-xl bg-secondary shadow-raised`. |
| `inset` | `number` | `0` | How far (px) the pill reaches past each item horizontally. |

| Data attribute | Description |
| --- | --- |
| `data-orientation` | `vertical` or `horizontal`. |

### SharedLayoutBgItem

One item. Renders a `div` unless you pass `render`. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `ReactElement \| (props, state) => ReactElement` | — | Replace the rendered element, e.g. `<a />` or `<button />`. |
| `disabled` | `boolean` | `false` | Dim the item, skip it for the pointer and keep the highlight off it. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present while the item holds the highlight. |
