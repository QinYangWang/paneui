# Accent Picker

> Chooses and remembers an accent colour.

Page: https://paneui.dev/docs/accent-picker/

## Installation

```bash
npx shadcn@latest add @paneui/accent-picker
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/accent-picker.json
```

Packages: `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { AccentPicker, AccentPresets } from "@/components/ui/accent-picker"
```

```tsx
// once, near the top of your root layout's <body>
<AccentPresets />

// in your appearance settings
<AccentPicker showLabels />
```

## How it works

It sets `data-accent` on `<html>` (blue, the default, has no attribute) and stores the pick in `localStorage["accent"]`. The preset roles ship inside the component as CSS and are injected once, so it works in any app with `@paneui/theme`. `AccentPresets` renders that CSS plus a pre-paint script so a reload never flashes the default.

## Custom control

`useAccent()` returns `[accent, setAccent]` for a menu or select of your own.

## API Reference

Built on [the Radio Group primitive](https://base-ui.com/react/components/radio#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### AccentPicker

Also accepts every prop of `RadioGroup`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `accents` | `Accent[]` | `all six` | Presets to offer, from `blue`, `neutral`, `green`, `orange`, `rose` and `violet`. |
| `showLabels` | `boolean` | `false` | Names under the swatches. |

### useAccent

Returns `[accent, setAccent]`, kept in sync across pickers and tabs.

### AccentPresets

`<style>` with the presets plus a pre-paint script.
