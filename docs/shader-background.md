# Shader Background

> Animated backdrop for hero sections and empty states.

Page: https://paneui.dev/docs/shader-background/

## Installation

```bash
npx shadcn@latest add @paneui/shader-background
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/shader-background.json
```

Packages: `@paper-design/shaders-react`, `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { ShaderBackground } from "@/components/ui/shader-background"
```

```tsx
<ShaderBackground className="h-64 rounded-3xl p-6">
  <h2>Your week, handled</h2>
</ShaderBackground>
```

## Examples

### Custom Colors

Use to match a brand palette instead of the theme.

```tsx
import { ShaderBackground } from "@/registry/base-nova/ui/shader-background"

export default function ShaderBackgroundCustomColors() {
  return (
    <ShaderBackground
      colors={["var(--success)", "color-mix(in oklch, var(--success), var(--background) 60%)", "var(--background)", "var(--warning)"]}
      className="flex h-56 w-full max-w-lg items-end rounded-3xl p-6 shadow-surface"
    >
      <div className="rounded-2xl bg-card/80 p-4 shadow-raised backdrop-blur-md">
        <p className="text-sm font-semibold">All systems normal</p>
        <p className="mt-1 text-sm text-muted-foreground">Every check passed in the last 24 hours.</p>
      </div>
    </ShaderBackground>
  )
}
```

### Speed and Paused

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ShaderBackground } from "@/registry/base-nova/ui/shader-background"

export default function ShaderBackgroundPaused() {
  const [paused, setPaused] = React.useState(false)
  return (
    <ShaderBackground
      variant="warp"
      speed={1.2}
      paused={paused}
      className="flex h-56 w-full max-w-lg items-end justify-between gap-3 rounded-3xl p-6 shadow-surface"
    >
      <p className="rounded-full bg-card/80 px-3 py-1 text-xs font-medium shadow-chip backdrop-blur-md">
        speed 1.2 {paused ? "· paused" : ""}
      </p>
      <Button size="sm" variant="secondary" onClick={() => setPaused((p) => !p)}>
        {paused ? "Play" : "Pause"}
      </Button>
    </ShaderBackground>
  )
}
```

### Shader Props

Use to tune a shader beyond the built-in props.

```tsx
import { ShaderBackground } from "@/registry/base-nova/ui/shader-background"

export default function ShaderBackgroundShaderProps() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      <ShaderBackground
        variant="grain-gradient"
        shaderProps={{ shape: "ripple", intensity: 0.5 }}
        className="flex h-40 items-end rounded-2xl p-3 shadow-surface"
      >
        <span className="rounded-full bg-card/80 px-2.5 py-0.5 text-xs font-medium shadow-chip">shape: ripple</span>
      </ShaderBackground>
      <ShaderBackground
        variant="dot-orbit"
        shaderProps={{ size: 0.5, spreading: 0.6 }}
        shaderClassName="opacity-60"
        className="flex h-40 items-end rounded-2xl p-3 shadow-surface"
      >
        <span className="rounded-full bg-card/80 px-2.5 py-0.5 text-xs font-medium shadow-chip">opacity-60 layer</span>
      </ShaderBackground>
    </div>
  )
}
```

## Motion

The animation stops under reduced motion and whenever the element is off screen. `waves` is a static pattern and ignores `speed`.

## API Reference

### ShaderBackground

A WebGL shader layer behind its children, coloured from your theme tokens by default. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"mesh-gradient" \| "grain-gradient" \| "warp" \| "waves" \| "dot-orbit"` | `"mesh-gradient"` | Which shader to render. |
| `colors` | `string[]` | — | Any CSS colours, including `var(--token)` and `color-mix(...)`, re-read when the theme changes. Defaults to tints of `--primary` and `--background`; `waves` uses only the first colour. |
| `colorBack` | `string` | `"var(--background)"` | Base colour behind the pattern (grain, waves, dot orbit). |
| `speed` | `number` | `0.6` | Animation speed. `0` freezes the current frame. |
| `paused` | `boolean` | `false` | Freeze the animation. |
| `shaderProps` | `Partial<MeshGradientProps \| GrainGradientProps \| WarpProps \| WavesProps \| DotOrbitProps>` | — | Extra props for the chosen shader, matched to `variant`. `speed` is always controlled by the component. |
| `shaderClassName` | `string` | — | Class for the shader layer (e.g. opacity or blend mode). |

| Data attribute | Description |
| --- | --- |
| `data-variant` | The active variant. |
| `data-paused` | Present while the animation is frozen (paused, off screen or reduced motion). |
