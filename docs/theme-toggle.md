# Theme Toggle

> Switches the page between light and dark themes.

Page: https://paneui.dev/docs/theme-toggle/

## Installation

```bash
npx shadcn@latest add @paneui/theme-toggle
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/theme-toggle.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/locale-provider`.

## Usage

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle"
```

```tsx
<ThemeToggle />
```

## Examples

### Light, Dark and System

```tsx
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleTriState() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle modes="tri" />
      <ThemeToggle modes="tri" variant="ghost" />
    </div>
  )
}
```

### useTheme

Use the hook for a menu or segmented control of your own.

```tsx
"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { useTheme, type ThemeMode } from "@/registry/base-nova/ui/theme-toggle"

const modes = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
] as const

export default function ThemeToggleUseTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl value={theme ?? "system"} onValueChange={(v) => setTheme(v as ThemeMode)} aria-label="Theme">
        {modes.map(({ value, label, icon: Icon }) => (
          <SegmentedControlItem key={value} value={value}>
            <Icon />
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p className="text-sm text-muted-foreground">Showing {resolvedTheme ?? "…"}</p>
    </div>
  )
}
```

### Sizes

```tsx
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleSizes() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle iconSize={14} className="size-8" />
      <ThemeToggle />
      <ThemeToggle iconSize={20} className="size-11" />
    </div>
  )
}
```

### Reveal Duration

```tsx
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleSlowReveal() {
  return (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        <ThemeToggle duration={300} />
        300ms
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle duration={1200} />
        1200ms
      </div>
    </div>
  )
}
```

### useThemeToggle

```tsx
"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { useThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

export default function ThemeToggleUseThemeToggle() {
  const { theme, setTheme } = useThemeToggle()
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <Button
          variant={theme === "light" ? "default" : "secondary"}
          onClick={(event) => setTheme("light", { origin: { x: event.clientX, y: event.clientY } })}
        >
          <SunIcon data-icon="inline-start" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "secondary"}
          onClick={(event) => setTheme("dark", { origin: { x: event.clientX, y: event.clientY } })}
        >
          <MoonIcon data-icon="inline-start" />
          Dark
        </Button>
      </div>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MonitorIcon size={14} />
        Current theme: {theme ?? "…"}
      </p>
    </div>
  )
}
```

## Motion

The reveal uses the View Transition API and starts at the click point, or at the button's centre for keyboard presses. With reduced motion, or without the API, the theme swaps instantly and the icon only cross-fades.

## Persistence

The choice is saved to `localStorage` under `storageKey` (`"light"` or `"dark"`); choosing System removes the key, and no key means the page follows the OS, including OS changes while it is open. A `theme-change` window event (`THEME_CHANGE_EVENT`) fires, so several toggles stay in sync, and other tabs follow through the storage event.

## Labels

The button is named by the locale: `switchToLightTheme` or `switchToDarkTheme`, `themeCycle(current, next)` with `themeLight`, `themeDark` and `themeSystem` in the tri-state mode, and `toggleTheme` before the theme is known. An `aria-label` prop wins.

## Pre-paint script

Inline `getThemeScript()` in a `<script>` at the top of `<head>` so the first paint has the right theme: `<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />` (pass your `storageKey` if you changed it). It sets the `.dark` class and `color-scheme`, and with no stored value keeps following OS changes even before the page hydrates.

## API Reference

### ThemeToggle

Round 32px button that flips the `.dark` class on `<html>`. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `iconSize` | `number` | `16` | Sun / moon icon size in px. |
| `variant` | `"raised" \| "ghost"` | `"raised"` | Round raised button, or a 28px ghost toolbar button that matches `size="icon-sm"` ghost Buttons. |
| `storageKey` | `string` | `"theme"` | `localStorage` key for the saved theme. |
| `duration` | `number` | `560` | Reveal duration in ms. |
| `onThemeChange` | `(theme: "light" \| "dark") => void` | — | Called after the theme changes. |
| `modes` | `"binary" \| "tri"` | `"binary"` | `binary` flips light and dark. `tri` cycles light, dark and system and shows the stored choice (a monitor icon for system). |

| Data attribute | Description |
| --- | --- |
| `data-mode` | The current mode when `modes="tri"`. |

### useTheme

Returns `{ theme, resolvedTheme, systemTheme, setTheme }`. `theme` is the stored choice (`"system"` when nothing is stored), `resolvedTheme` the theme on the page. All are `null` until mounted.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `storageKey` | `string` | `"theme"` | `localStorage` key. |
| `duration` | `number` | `560` | Reveal duration in ms. |
| `onThemeChange` | `(theme: "light" \| "dark") => void` | — | Called after the theme on the page changes. |
| `setTheme` | `(theme: "light" \| "dark" \| "system", options?: { origin?: { x: number; y: number } }) => void` | — | Returned. Store a choice and reveal the result from `origin`; `"system"` removes the key. |

### getThemeScript

`(storageKey?: string) => string`. Source of the pre-paint script.

### useThemeToggle

Returns `{ theme, setTheme, toggle }`. `theme` is `null` until mounted, then follows the `.dark` class.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `storageKey` | `string` | `"theme"` | `localStorage` key. |
| `duration` | `number` | `560` | Reveal duration in ms. |
| `onThemeChange` | `(theme: "light" \| "dark") => void` | — | Called after the theme changes. |
| `setTheme` | `(theme: "light" \| "dark", options?: { origin?: { x: number; y: number } }) => void` | — | Returned. Switch to a theme, revealing from `origin` (defaults to the viewport centre). |
| `toggle` | `(options?: { origin?: { x: number; y: number } }) => void` | — | Returned. Switch to the other theme. |
