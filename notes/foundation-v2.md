# Foundation v2 (2026-10-16)

The default fonts, colours, radius and shadows, replacing the 2026-10-14 values. The 13px UI scale,
control densities and shell layout from `notes/native-style.md` are unchanged. Licence notices are in
`THIRD_PARTY_NOTICES.md`.

## Source of the values

- Colour values are steps of 12-step scales (gray, blue, green, orange, tomato, crimson, violet, black and
  white alpha), sRGB hex plus display-p3. The raw scales extracted for this round live outside the repo
  (`/workspace/work/round16/gen/radix.json`); `/workspace/work/round16/gen/build_globals.py` writes the token
  section of `app/globals.css` from them, and `/workspace/work/regen-theme.py` regenerates `theme-accents.css`,
  `components/docs/accent-presets.generated.ts`, the accent picker's preset CSS and the registry items.
- Alpha values stay alpha, as authored: text, fills and borders read on any surface.

## Token mapping

| Token | Light | Dark | Scale step |
| --- | --- | --- | --- |
| `background` | `#fff` | `oklch(15% 0 0)` | page |
| `card` | `#fff` | `#111` | container (gray 1 in dark) |
| `popover` | `#fff` | `oklch(25.2% 0 0)` (#222) | modal |
| `surface-sunken` | `#0000000d` | `#00000066` | black a1 / a6 |
| `surface-standout` / `standout-foreground` | `#202020` / `#fff` | `#222` / `#ffffffed` | gray 12 / gray 3 |
| `shell` | `oklch(97.3% 0 0)` (#f6f6f6) | `#000` | shell |
| `foreground` (+ card/popover/secondary/accent fg) | `#000000df` | `#ffffffed` | gray a12 |
| `muted-foreground` | `#0000009b` | `#ffffffaf` | gray a11 |
| `fg-tertiary` | `#00000072` | `#ffffff64` | gray a9 |
| `fg-disabled` | `#00000044` | `#ffffff55` | gray a8 |
| `secondary`, `muted` | `#0000000f` | `#ffffff12` | gray a3 (component default) |
| `accent` | `#00000017` | `#ffffff1b` | gray a4 (component hover) |
| `border` | `#0000000f` | `#ffffff12` | gray a3 |
| `border-subtle` | `#00000006` | `#ffffff09` | gray a2 |
| `border-strong`, `input` | `#00000026` | `#ffffff2c` | gray a6 |
| `primary` / `-hover` / `-active` | `#0090ff` / `#0588f0` / `#0d74ce` | `#0090ff` / `#3b9eff` / `#70b8ff` | blue 9 / 10 / 11 |
| `primary-foreground` | `#fff` | `#fff` | on solid |
| `primary-subtle` / `-subtle-hover` | `#008ff519` / `#009eff2a` | `#0077ff3a` / `#0075ff57` | blue a3 / a4 |
| `primary-border` | `#0088f653` | `#0f89fd7f` | blue a6 |
| `ring` | `#0084e6a1` | `#0090ff` | blue a8 / a9 (used at /50) |
| `destructive` / `-hover` | `#e54d2e` / `#dd4425` | `#e54d2e` / `#ec6142` | tomato 9 / 10 |
| `destructive-foreground` | `#fffcfc` | `#fff` | tomato 1 / white |
| `destructive-subtle` / `-border` | `#f52b0018` / `#f92d0050` | `#ff35232b` / `#ff4f3864` | tomato a3 / a6 |
| `success` / `-hover` | `#30a46c` / `#2b9a66` | `#30a46c` / `#33b074` | green 9 / 10 |
| `success-subtle` / `-border` | `#00a43319` / `#00963c52` | `#22ff991e` / `#44ffaa4b` | green a3 / a6 |
| `warning` / `-hover` | `#f76b15` / `#ef5f00` | `#f76b15` / `#ff801f` | orange 9 / 10 |
| `warning-subtle` / `-border` | `#ff9c0029` / `#ff81007d` | `#fb6a0025` / `#fd75045c` | orange a3 / a6 |
| `code` | `#f9f9f9` | `#191919` | gray 2 |
| `scrollbar` / `-hover` | gray a6 / a8 | gray a6 / a8 | |
| `chart-1…8`, `shell-border`, `image-outline` | unchanged | unchanged | |

Accent presets swap the eight `primary*` + `ring` roles on the same steps: green, orange, rose (crimson
scale) and violet; neutral uses the inverted solid (black a12 / a10 / a9 with white text, white a12 / a10 / a9
with black text in dark) and gray a3 / a4 / a6 / a8 for subtle, border and ring. White text on a step-9 solid
is below 4.5:1 for blue (3.3:1), green (3.2:1) and orange (2.9:1); that is the reference behaviour and was kept
on purpose (bold 13px labels on filled buttons).

## Radius

`--radius: 0.5rem`; `xs` 0.25x (2px), `sm` 0.5x (4), `md` 0.75x (6), `lg` 1x (8), `xl` 1.25x (10),
`2xl` 1.5x (12), `3xl` 2x (16), `4xl` 2.5x (20), `5xl` 3x (24), `shell` 1.5x (12). `2xs` is now an alias of
`xs`. Presets: none 0, sm 0.375rem, default 0.5rem, lg 0.625rem (the old default), xl 0.875rem.

## Shadows

| Level | Tailwind | Light | Dark |
| --- | --- | --- | --- |
| `--shadow-border` | `shadow-xs` | 1px ring black 7% | 1px ring white 7% |
| `--shadow-default` | `shadow-sm` | 0.5px ring 6% + two tiny drops | 0.5px inset white 7% |
| `--shadow-lg` | `shadow-md`, `shadow-lg` | 0.5px ring (color-mix toward gray 3) + three soft drops | 1px ring (mix toward gray 6) + three deep drops |
| `--shadow-xl` | `shadow-xl` | 0.5px ring 6% + 40px / 32px drops | inset hairline + the same drops |

Named elevation: `raised` = default, `surface` = lg, `chip` and `pressed` = border, `well` = inset 1px `input`.

## Fonts

Inter Variable (ss03) → Noto Sans SC Variable → system; JetBrains Mono Variable → system mono;
Newsreader Variable → Noto Serif SC Variable → system serif (reading preset only). Self-hosted from
`@fontsource-variable/*` via `app/fonts.css` (registry item `fonts`, hidden). Weights 400 / 450
(`font-semimedium`) / 500 / 600 / 700. Sizes unchanged: Inter at 13px is a little wider than the system UI
fonts; no control needed a size change.

## Component changes in this round

- Button: default hovers to `primary-hover`, presses to `primary-active`; destructive uses
  `destructive-foreground` and `destructive-hover`.
- Badge, IconChip: tinted tones use `*-subtle` + `inset-ring-*-border`. Alert: washes use `*-subtle`.
- Dialog, alert dialog, drawer, bottom sheet, morphing modal, command palette: `shadow-xl`.
- Menu, context menu, select and combobox popups: `rounded-xl` → `rounded-2xl` (12 − 4 = 8px rows).
- Containers that hold controls 8px in moved `rounded-2xl` → `rounded-3xl` (12 − 8 would be 4px): prompt bar,
  agent composer, animated sidebar panel, app shell frame, donut chart legend, tool result, tool approval,
  todo list, and the icon rail / tab strip / thread list / user menu / workspace switcher / model picker /
  icon chip demos. File diff card `rounded-xl` → `rounded-2xl`.
- Checkbox: sm 3px, default `rounded-sm` (4px), lg 5px (they would have dropped to 2px). Chart swatches
  `rounded-xs` → `rounded-sm`.
- The custom accent format in localStorage is now `{ v: 2, hex, light, dark }` with the eight roles; older
  saved custom accents are ignored (the page falls back to blue).
