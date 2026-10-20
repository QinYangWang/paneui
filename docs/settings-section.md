# Settings Section

> Layout for grouped settings pages.

Page: https://paneui.dev/docs/settings-section/

## Installation

```bash
npx shadcn@latest add @paneui/settings-section
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/settings-section.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import {
  SettingsGroup,
  SettingsRow,
  SettingsRowDescription,
  SettingsRowLink,
  SettingsRowText,
  SettingsRowTitle,
  SettingsSection,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@/components/ui/settings-section"
```

```tsx
<SettingsSection>
  <SettingsSectionHeader>
    <SettingsSectionTitle>Notifications</SettingsSectionTitle>
  </SettingsSectionHeader>
  <SettingsGroup>
    <SettingsRow render={<label />}>
      <SettingsRowText>
        <SettingsRowTitle>Weekly digest</SettingsRowTitle>
        <SettingsRowDescription>Every Monday at 9:00.</SettingsRowDescription>
      </SettingsRowText>
      <Switch />
    </SettingsRow>
  </SettingsGroup>
</SettingsSection>
```

## Composition

```text
SettingsNav
└── SettingsNavItem
SettingsSection
├── SettingsSectionHeader
│   ├── SettingsSectionTitle
│   └── SettingsSectionDescription
└── SettingsGroup
    ├── SettingsRow (or SettingsRowLink)
    │   ├── SettingsRowText (Title, Description)
    │   └── SettingsRowControl or any control
    └── SettingsGroupFooter
        └── SettingsFooterNote
```

## Examples

### Danger Zone

Use for actions that delete data or can't be undone.

```tsx
import { Button } from "@/registry/base-nova/ui/button"
import {
  SettingsGroup,
  SettingsRow,
  SettingsRowDescription,
  SettingsRowText,
  SettingsRowTitle,
  SettingsSection,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@/registry/base-nova/ui/settings-section"

export default function SettingsDangerZone() {
  return (
    <SettingsSection className="w-full max-w-xl">
      <SettingsSectionHeader>
        <SettingsSectionTitle>Danger zone</SettingsSectionTitle>
      </SettingsSectionHeader>
      <SettingsGroup tone="destructive">
        <SettingsRow>
          <SettingsRowText>
            <SettingsRowTitle>Delete workspace</SettingsRowTitle>
            <SettingsRowDescription>Removes every session, repo link and invoice. This can&apos;t be undone.</SettingsRowDescription>
          </SettingsRowText>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </SettingsRow>
      </SettingsGroup>
    </SettingsSection>
  )
}
```

### Interactive Rows

Use when a row opens a page, a dialog or a link.

```tsx
"use client"

import { SettingsGroup, SettingsRow, SettingsRowDescription, SettingsRowLink, SettingsRowText, SettingsRowTitle } from "@/registry/base-nova/ui/settings-section"

export default function SettingsSectionInteractiveRows() {
  return (
    <SettingsGroup className="w-full max-w-md">
      <SettingsRow interactive detail="English">
        <SettingsRowText>
          <SettingsRowTitle>Language</SettingsRowTitle>
        </SettingsRowText>
      </SettingsRow>
      <SettingsRow interactive detail="3 connected">
        <SettingsRowText>
          <SettingsRowTitle>Chat apps</SettingsRowTitle>
          <SettingsRowDescription>Where the agent answers you.</SettingsRowDescription>
        </SettingsRowText>
      </SettingsRow>
      <SettingsRowLink href="#source">
        <SettingsRowText>
          <SettingsRowTitle>Source code</SettingsRowTitle>
        </SettingsRowText>
      </SettingsRowLink>
      <SettingsRowLink href="https://github.com/QinYangWang/ui" target="_blank" external>
        <SettingsRowText>
          <SettingsRowTitle>Report an issue</SettingsRowTitle>
        </SettingsRowText>
      </SettingsRowLink>
    </SettingsGroup>
  )
}
```

### Settings Nav

```tsx
"use client"

import * as React from "react"

import { BellIcon, CreditCardIcon, PaletteIcon, UserIcon } from "@/components/icons"
import { SettingsNav, SettingsNavItem } from "@/registry/base-nova/ui/settings-section"

const pages = [
  { id: "profile", label: "Profile", icon: <UserIcon /> },
  { id: "billing", label: "Billing", icon: <CreditCardIcon /> },
  { id: "notifications", label: "Notifications", icon: <BellIcon /> },
  { id: "appearance", label: "Appearance", icon: <PaletteIcon /> },
]

export default function SettingsNavExample() {
  const [active, setActive] = React.useState("billing")
  return (
    <SettingsNav aria-label="Settings" className="w-48">
      {pages.map((p) => (
        <SettingsNavItem
          key={p.id}
          icon={p.icon}
          isActive={active === p.id}
          href={`#${p.id}`}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            setActive(p.id)
          }}
        >
          {p.label}
        </SettingsNavItem>
      ))}
    </SettingsNav>
  )
}
```

## Rows

A row wraps its control under the text on narrow screens. Render it as a `<label>` (`render={<label />}`) so clicking anywhere toggles its switch.

## Nav

Below `md` the settings nav becomes a horizontally scrolling strip.

## Interactive rows

An `interactive` row is one `<button>` (or the element `render` gives): it takes the hover and press fill, an inset focus ring and a trailing chevron that flips in right-to-left layouts. Keep other controls out of it.

## API Reference

### SettingsGroup

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"default" \| "destructive"` | `"default"` | Destructive ring for a danger zone. |

### SettingsRow

Min 56px row with a hairline between rows. Also accepts every prop of `div (useRender)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `ReactElement` | — | Render as another element, e.g. `<label />` or a router link. |
| `interactive` | `boolean` | `false` | The row is the control: a `<button>` by default, with hover and press fill, focus ring and chevron. |
| `detail` | `ReactNode` | — | Muted trailing text before the chevron, such as the current value. |
| `chevron` | `boolean` | `true` | Show the chevron on an interactive row. |

| Data attribute | Description |
| --- | --- |
| `data-interactive` | Present on an interactive row. |

### SettingsRowLink

Interactive row that renders an `<a>` and takes every anchor attribute; pass `render` for a router link. Also accepts every prop of `a`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `string` | — | `_blank` without `rel` adds `rel="noopener noreferrer"`. |
| `external` | `boolean` | `false` | An external-link icon instead of the chevron. |
| `detail` | `React.ReactNode` | — | Same as `SettingsRow`. |
| `chevron` | `boolean` | `true` | Same as `SettingsRow`. |

### SettingsGroupFooter

Muted band for Save / Cancel; with a `SettingsFooterNote` the note sits left. Also accepts every prop of `div`.

### SettingsNavItem

Also accepts every prop of `a (useRender)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isActive` | `boolean` | — | Current page. |
| `icon` | `ReactNode` | — | 16px solid icon. |
| `render` | `ReactElement` | — | Your router link. |
