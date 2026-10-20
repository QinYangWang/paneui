# Customize

Page: https://paneui.dev/docs/colors/

Choose an accent and corner radius.

## One accent, every control

Every accented control reads eight variables, `--primary` and its variants plus `--ring`, and a preset swaps all eight per mode. Pick a preset or a brand colour below to try it, then copy the overrides. A custom colour is darkened or lifted only if it would fall under 3:1 contrast against the page.

The web page has a live accent picker here: choose a preset or a brand colour to see it on real controls. The CSS below is for the default accent.

Paste these overrides after the theme variables to keep this accent in your project.

```css title="globals.css"
/* paneui accent: blue */
/* Paste after the theme variables in globals.css. */
:root {
  --primary: #0090ff;
  --primary-hover: #0588f0;
  --primary-active: #0d74ce;
  --primary-foreground: #fff;
  --primary-subtle: #008ff519;
  --primary-subtle-hover: #009eff2a;
  --primary-border: #0088f653;
  --ring: #0084e6a1;
}

.dark {
  --primary: #0090ff;
  --primary-hover: #3b9eff;
  --primary-active: #70b8ff;
  --primary-foreground: #fff;
  --primary-subtle: #0077ff3a;
  --primary-subtle-hover: #0075ff57;
  --primary-border: #0f89fd7f;
  --ring: #0090ff;
}
```

## One radius, every corner

Every radius token multiplies `--radius`, and nested surfaces subtract their padding from it, so corners stay concentric at any value up to the 16px cap. Pick a preset or drag for your own, then copy the override, or install a preset with `theme-radius-none`, `-sm`, `-lg` or `-xl`.

The web page has a live radius picker here: choose a preset or drag for your own value to see it on real controls. The CSS below is for the default radius.

Every radius token is a multiple of this one value and stops at 16px, so the override is a single line.

```css title="globals.css"
/* paneui radius: default */
:root {
  --radius: 0.5rem;
}
```

## Background

Use these for anything that must be opaque, and sunken for wells inside a surface.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--background` `bg-background` | #fff | oklch(15% 0 0) |
| `--card` `bg-card` | #fff | #111 |
| `--popover` `bg-popover` | #fff | oklch(25.2% 0 0) |
| `--surface-sunken` `bg-surface-sunken` | #0000000d | #0006 |
| `--surface-standout` `bg-surface-standout` | #202020 | #222 |
| `--shell` `bg-shell` | oklch(97.3% 0 0) | #000 |
| `--code` `bg-code` | #f9f9f9 | #191919 |

## Fill

Use primary for the main action and secondary, muted or accent for hover, selected and track states. The last three are translucent, so never use them as surfaces.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--primary` accent `bg-primary` | #0090ff | #0090ff |
| `--secondary` `bg-secondary` | #0000000f | #ffffff12 |
| `--muted` `bg-muted` | #0000000f | #ffffff12 |
| `--accent` `bg-accent` | #00000017 | #ffffff1b |

## Accent roles

Use hover and active for pressed solids, and subtle for selected rows and tinted chips.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--primary-hover` accent `bg-primary-hover` | #0588f0 | #3b9eff |
| `--primary-active` accent `bg-primary-active` | #0d74ce | #70b8ff |
| `--primary-subtle` accent `bg-primary-subtle` | #008ff519 | #0077ff3a |
| `--primary-subtle-hover` accent `bg-primary-subtle-hover` | #009eff2a | #0075ff57 |
| `--primary-border` accent `border-primary-border` | #0088f653 | #0f89fd7f |

## Text

Use foreground for primary text, muted-foreground for captions and nav icons, and fg-tertiary only for placeholders and hints.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--foreground` `text-foreground` | #000000df | #ffffffed |
| `--muted-foreground` `text-muted-foreground` | #0000009b | #ffffffaf |
| `--fg-tertiary` `text-fg-tertiary` | #00000072 | #ffffff64 |
| `--fg-disabled` `text-fg-disabled` | #0004 | #fff5 |
| `--card-foreground` `text-card-foreground` | #000000df | #ffffffed |
| `--popover-foreground` `text-popover-foreground` | #000000df | #ffffffed |
| `--primary-foreground` accent `text-primary-foreground` | #fff | #fff |
| `--standout-foreground` `text-standout-foreground` | #fff | #ffffffed |
| `--secondary-foreground` `text-secondary-foreground` | #000000df | #ffffffed |
| `--accent-foreground` `text-accent-foreground` | #000000df | #ffffffed |

## Border

Use border for dividers, border-strong or input for field outlines, and ring at /50 for focus.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--border` `border-border` | #00000017 | #ffffff1b |
| `--border-subtle` `border-border-subtle` | #00000006 | #ffffff09 |
| `--border-strong` `border-border-strong` | #00000026 | #ffffff2c |
| `--input` `border-input` | #00000017 | #ffffff1b |
| `--shell-border` `border-shell-border` | oklch(0% 0 0 / 10%) | oklch(100% 0 0 / 9%) |
| `--ring` accent `ring-ring/50` | #0084e6a1 | #0090ff |
| `--scrollbar` `var(--scrollbar)` | #00000026 | #ffffff2c |
| `--scrollbar-hover` `var(--scrollbar-hover)` | #0004 | #fff5 |

## State

These keep their meaning under every accent. Use subtle for alert and badge washes, and the solid for icons and text.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--destructive` `bg-destructive` | #e54d2e | #e54d2e |
| `--destructive-hover` `bg-destructive-hover` | #dd4425 | #ec6142 |
| `--destructive-subtle` `bg-destructive-subtle` | #f52b0018 | #ff35232b |
| `--destructive-border` `border-destructive-border` | #f92d0050 | #ff4f3864 |
| `--destructive-foreground` `text-destructive-foreground` | #fffcfc | #fff |
| `--success` `bg-success` | #30a46c | #30a46c |
| `--success-hover` `bg-success-hover` | #2b9a66 | #33b074 |
| `--success-subtle` `bg-success-subtle` | #00a43319 | #22ff991e |
| `--success-border` `border-success-border` | #00963c52 | #44ffaa4b |
| `--success-foreground` `text-success-foreground` | #fbfefc | #fff |
| `--warning` `bg-warning` | #f76b15 | #f76b15 |
| `--warning-hover` `bg-warning-hover` | #ef5f00 | #ff801f |
| `--warning-subtle` `bg-warning-subtle` | #ff9c0029 | #fb6a0025 |
| `--warning-border` `border-warning-border` | #ff81007d | #fd75045c |
| `--warning-foreground` `text-warning-foreground` | #fefcfb | #fff |

## Chart

Charts never read primary, so data keeps its colours under every accent. Use them as classes, or as var(--chart-n) in SVG.

| Token / class | Light | Dark |
| --- | --- | --- |
| `--chart-1` `bg-chart-1` | #0090ff | #0090ff |
| `--chart-2` `bg-chart-2` | #ef5f00 | #f76b15 |
| `--chart-3` `bg-chart-3` | #6e56cf | #6e56cf |
| `--chart-4` `bg-chart-4` | #30a46c | #30a46c |
| `--chart-5` `bg-chart-5` | #d6409f | #d6409f |
| `--chart-6` `bg-chart-6` | #ab6400 | #ffc53d |
| `--chart-7` `bg-chart-7` | #00a2c7 | #00a2c7 |
| `--chart-8` `bg-chart-8` | #8d8d8d | #6e6e6e |
