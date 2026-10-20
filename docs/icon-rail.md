# Icon Rail

> Narrow bar of icon buttons for switching between app sections.

Page: https://paneui.dev/docs/icon-rail/

## Installation

```bash
npx shadcn@latest add @paneui/icon-rail
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/icon-rail.json
```

Registry items it builds on: `@paneui/theme`, `@paneui/tooltip`, `@paneui/locale-provider`.

## Usage

```tsx
import { IconRail, IconRailItem, IconRailSpacer } from "@/components/ui/icon-rail"
```

```tsx
<IconRail aria-label="App">
  <IconRailItem label="Home" icon={<HomeIcon />} shortcut="⌘1" active />
  <IconRailItem label="Inbox" icon={<InboxIcon />} badge={3} />
  <IconRailSpacer />
  <IconRailItem label="Settings" icon={<SettingsIcon />} />
</IconRail>
```

## Composition

```text
IconRail
├── IconRailGroup
│   └── IconRailItem
├── IconRailSeparator
├── IconRailSpacer
└── IconRailAvatar
```

## Examples

### Badges

```tsx
import { InboxIcon, BellIcon, ChatIcon } from "@/components/icons"
import { IconRail, IconRailItem, IconRailSeparator } from "@/registry/base-nova/ui/icon-rail"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

export default function IconRailBadges() {
  return (
    <TooltipProvider>
      <div className="overflow-hidden frame-2xl frame-inset-2 bg-shell shadow-raised">
        <IconRail aria-label="Notifications" className="h-auto">
          <IconRailItem label="Inbox" icon={<InboxIcon />} badge={12} />
          <IconRailItem label="Messages" icon={<ChatIcon />} badge />
          <IconRailSeparator />
          <IconRailItem label="Alerts" icon={<BellIcon />} badge={140} active />
        </IconRail>
      </div>
    </TooltipProvider>
  )
}
```

### Horizontal

```tsx
import { BellIcon, FolderIcon, HomeIcon, InboxIcon, SettingsIcon } from "@/components/icons"
import { IconRail, IconRailGroup, IconRailItem, IconRailSpacer } from "@/registry/base-nova/ui/icon-rail"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

export default function IconRailHorizontal() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-xs overflow-hidden frame-2xl frame-inset-2 bg-shell shadow-raised">
        <IconRail aria-label="App" orientation="horizontal">
          <IconRailGroup>
            <IconRailItem label="Home" icon={<HomeIcon />} active />
            <IconRailItem label="Inbox" icon={<InboxIcon />} badge={3} />
            <IconRailItem label="Projects" icon={<FolderIcon />} />
          </IconRailGroup>
          <IconRailSpacer />
          <IconRailGroup>
            <IconRailItem label="Alerts" icon={<BellIcon />} badge />
            <IconRailItem label="Settings" icon={<SettingsIcon />} />
          </IconRailGroup>
        </IconRail>
      </div>
    </TooltipProvider>
  )
}
```

## Icons

Use solid icons at 18px, as the icon usage rules ask. Each item's tooltip shows its `label` and shortcut, so make the label clear.

## Tooltips

Wrap the app (or the rail) in `TooltipProvider` so moving along the rail opens tooltips instantly after the first one.

## API Reference

### IconRail

Also accepts every prop of `nav`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | A 48px column, or a 48px row (groups, separators and the spacer follow). |
| `tooltipSide` | `"right" \| "left" \| "top" \| "bottom"` | `"right" / "top"` | Side tooltips open on. Defaults to `right` for a vertical rail and `top` for a horizontal one; use `left` for a rail on the right edge. |

| Data attribute | Description |
| --- | --- |
| `data-orientation` | `vertical` or `horizontal`. |

### IconRailItem

Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `string` | — | Accessible name and tooltip text. |
| `icon` (required) | `ReactNode` | — | The glyph. |
| `shortcut` | `string` | — | Shown as a key chip in the tooltip. |
| `active` | `boolean` | `false` | Selected state; sets `aria-current="page"`. |
| `badge` | `number \| boolean` | — | Count or dot. |
| `render` | `ReactElement` | — | Render as another element, e.g. a `Link`. |

| Data attribute | Description |
| --- | --- |
| `data-active` | Present when active. |

### IconRailAvatar

Round button for accounts or agent providers at the bottom of the rail. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `string` | — | Accessible name and tooltip. |
| `status` | `"online" \| "busy" \| "error" \| "offline"` | `"offline"` | Ring colour. `online` is success, `busy` warning, `error` destructive and `offline` has none. |
| `hint` | `string` | — | Extra tooltip text, e.g. the connection state. |

### IconRailGroup

Also accepts every prop of `div`.

### IconRailSeparator

Also accepts every prop of `div`.

### IconRailSpacer

Pushes what follows to the bottom. Also accepts every prop of `div`.
