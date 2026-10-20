# Theming

Page: https://paneui.dev/docs/theming/

Change the theme tokens.

## How the system works

The theme has two layers. **Values** are CSS variables in `globals.css`, named for what a colour is for, such as `--card`. **Utilities** map each variable to a class in `@theme inline`, so `--card` becomes `bg-card`. Components use only the utilities, so changing a value restyles every component without touching its file.

| Variable | Utility | Read by |
| --- | --- | --- |
| `--background` #fff | `bg-background` | Page canvas |
| `--primary` #0090ff | `bg-primary` `text-primary-foreground` | Filled buttons, switches, checks, selection |
| `--border` #00000017 | `border-border` | Every divider and edge |
| `--radius` 0.5rem | `rounded-sm … rounded-3xl` | All corners |
| `--shadow-default` hairline + 1px drop | `shadow-raised` | Resting cards and controls |
| `--text-ui` 0.8125rem | `text-ui` | Buttons, inputs, menus, nav |

Dark mode works the same way. `.dark` on `<html>` points the same variables at dark values, so a component written once is right in both modes. The accent is eight of those variables, `--primary` to `--ring`, which a preset swaps together.

1. **Map each mode**

   Put light values on `:root` and dark values on `.dark`, under the same names.
2. **Use semantic utilities**

   Write `bg-card` or `text-muted-foreground`, never palette colours or hex.
3. **Keep it central**

   Skip `dark:` colour overrides in components, so a theme change stays one edit in one file.

The same file also holds these tokens.

- `--radius`: One base that every corner multiplies, so nested corners stay concentric.
- `text-ui-*`: The type scale for text inside components.
- `--shadow-*`: Four shadow levels behind shadow-xs to shadow-xl and the named elevation.
- `--font-*`: The UI, code and reading font stacks.
- `--shell`: Colours for app chrome around the content panel.
- `--scrollbar`: Scrollbar thumb colours.

```bash
pnpm dlx shadcn@latest add @paneui/theme
```

`@paneui/theme` writes the variables below and installs `@paneui/utils`, whose `cn()` merges the `text-ui-*` sizes as font sizes. For a tinted wash, use the `-subtle` token, such as `bg-success-subtle`.

```css title="globals.css (excerpt)"
:root {
  --radius: 0.5rem;
  --radius-max: 1rem;             /* no token goes past 16px */
  --background: #fff;
  --foreground: #000000df;        /* gray a12 */
  --muted-foreground: #0000009b;  /* gray a11 */
  --primary: #0090ff;             /* blue 9 */
  --primary-hover: #0588f0;       /* blue 10 */
  --primary-subtle: #008ff519;    /* blue a3 */
  --ring: #0084e6a1;              /* blue a8 */
  --border: #00000017;            /* gray a4 */
  --shadow-lg: 0 0 0 0.5px #0000000f, 0 2px 3px -2px #0000000f, …;
  /* … */
}

.dark {
  --background: oklch(15% 0 0);
  --card: #111;                   /* gray 1 */
  --popover: oklch(25.2% 0 0);
  --foreground: #ffffffed;        /* gray a12 */
  --primary-hover: #3b9eff;       /* blue 10 */
  --border: #ffffff1b;            /* gray a4 */
  /* … */
}

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-xl: min(calc(var(--radius) * 1.25), var(--radius-max));
  --shadow-lg: var(--shadow-lg);
  /* … */
}
```

## Colors

Colours are named by role, and each surface has a matching `-foreground` token for text on it. Use tokens in components, never palette colours (`bg-zinc-100`) or hex values. Every token's light and dark value is on [Customize](https://paneui.dev/docs/colors/).

Every role, with its light and dark value, is listed on Customize.

## Dark mode

Put `.dark` on `<html>` to switch every token. The theme declares the variant as `@custom-variant dark (&:is(.dark *))`. Set `color-scheme` at the same time so native scrollbars and form controls follow. Pair `primary` with `text-primary-foreground`, never `text-white`, because the neutral preset makes it near-white in dark mode.

```js title="theme-script.js"
// Inline in <head>, before paint, so the page never flashes the wrong theme.
const mode = localStorage.getItem("theme") ?? "system"
const dark = mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
document.documentElement.classList.toggle("dark", dark)
document.documentElement.style.colorScheme = dark ? "dark" : "light"
```

To let users switch, use [Theme Toggle](https://paneui.dev/docs/theme-toggle/), which stores the choice for the script above.

## Accent presets

The accent is eight role variables per mode, blue by default: `primary` and its `-hover`, `-active`, `-foreground`, `-subtle`, `-subtle-hover` and `-border` variants, plus `ring`. Every preset reads the same steps of its own 12-step scale, so surfaces, text and charts stay the same. Install one after the theme.

The presets are `theme-neutral`, `theme-blue` (the default), `theme-green`, `theme-orange`, `theme-rose`, `theme-violet`.

```bash
pnpm dlx shadcn@latest add @paneui/theme-violet
```

An installed preset overwrites the variables on `:root` and `.dark`, so the accent is fixed. To let users switch, keep the default roles on `:root`, add one block per accent keyed on an attribute, and apply the saved choice in the same pre-paint script as dark mode.

For a brand colour, use the picker on [Customize](https://paneui.dev/docs/colors/#accent) to derive the eight roles and copy them.

```css title="globals.css"
/* Switch at runtime by setting data-accent on <html>: one block per mode swaps the eight roles */
html[data-accent="violet"] {
  --primary: #6e56cf;               /* violet 9 */
  --primary-hover: #654dc4;         /* violet 10 */
  --primary-active: #6550b9;        /* violet 11 */
  --primary-foreground: #fff;
  --primary-subtle: #4400ee0f;      /* violet a3 */
  --primary-subtle-hover: #4300ff1b;
  --primary-border: #3100fb35;      /* violet a6 */
  --ring: #2b00d066;                /* violet a8 */
}
html[data-accent="violet"].dark {
  --primary-hover: #7d66d9;
  --primary-active: #baa7ff;
  /* … */
}
```

## Typography

Use the `text-ui*` sizes inside components, and keep `text-sm` to `text-2xl` for reading copy and page headings. Set titles in `font-semibold`, labels and buttons in `font-medium`, and use `font-semimedium` (450) where 400 reads too light on a dense row.

| Class | Size | Use for |
| --- | --- | --- |
| `text-ui-2xs` | 10px | Tiny counters and labels. |
| `text-ui-xs` | 11px | Meta text, shortcuts and counts. |
| `text-ui-sm` | 12px | Captions, badges, small controls, tooltips. |
| `text-ui` | 13px | The default for controls, menus and text inside components. |
| `text-ui-lg` | 14px | Large controls and card titles. |

## Fonts

The theme names its faces in `--font-sans`, `--font-mono` and `--font-serif`, each with a CJK face and the system stack behind it. Without the font files it renders in system fonts, so installing them is optional.

| Utility | Face | Use for |
| --- | --- | --- |
| `font-sans` | Inter, Noto Sans SC | All UI text. Inter's ss03 set is on. |
| `font-mono` | JetBrains Mono | Code, keys, terminals and tabular IDs. |
| `font-serif` | Newsreader, Noto Serif SC | Long-form reading (the reading typeset preset). |

```bash
pnpm dlx shadcn@latest add @paneui/fonts
```

This adds the font packages and `app/fonts.css`; import that file once in your root layout. Each face is split by unicode range, so a page downloads only the glyph sets it shows. For code that lines up with Chinese text, install a CJK-aligned monospace such as Sarasa Gothic or Maple Mono yourself and put it first in `--font-mono`.

## Radius

Every step is a multiple of `--radius`, so change the base and the whole scale follows. No step goes past `--radius-max` (16px): larger corners turn controls into pills and push nested parts apart. Keep nested corners concentric, with the inner radius equal to the outer radius minus the padding between them. That is why `p-1` menus (`rounded-2xl`) hold `rounded-lg` rows. Use `rounded-full` only for shapes that are actually round. Sizes below are at the default `0.5rem`; try other values on [Customize](https://paneui.dev/docs/colors/#radius).

| Class | Size | Use for |
| --- | --- | --- |
| `rounded-xs` | 2px | Search highlights, favicons and tiny segments. |
| `rounded-sm` | 4px | Checkboxes, extra-small buttons, keys and small chips. |
| `rounded-md` | 6px | Tab indicators inside a p-0.5 list. |
| `rounded-lg` | 8px | Controls and menu rows. |
| `rounded-xl` | 10px | Cards, tables and code blocks. |
| `rounded-2xl` | 12px | Menus and popups, two-layer inset cards. |
| `rounded-3xl` | 16px | Dialogs, drawers and big panels. |
| `rounded-4xl` | 16px | Kept for older code; sits at the 16px cap. |
| `rounded-5xl` | 16px | Kept for older code; sits at the 16px cap. |

## Elevation

Four shadow levels back Tailwind's `shadow-xs` to `shadow-xl`, so plain utilities pick them up. Give resting cards, tables and code blocks `shadow-raised`, never a floating level. Show hover on rows, menu items and ghost buttons with a fill (`bg-secondary`), not a ring.

| Class | Token | Use for |
| --- | --- | --- |
| `shadow-xs` | `--shadow-border` | A 1px ring, no lift. |
| `shadow-sm` | `--shadow-default` | Resting controls and cards. |
| `shadow-lg` | `--shadow-lg` | Menus, popovers and floating panels (shadow-md is the same). |
| `shadow-xl` | `--shadow-xl` | Dialogs, drawers and sheets. |

Components read these named levels, each built on the scale above.

`shadow-raised`: Resting controls and cards (reads shadow-sm). Hover steps to shadow-raised-hover.

`shadow-surface`: Popovers, menus and floating panels (reads shadow-lg).

`shadow-well`: Inset hairline for fields and tracks.

`shadow-chip`: Keys and small chips.

`shadow-primary`: Filled primary buttons (none in dark).

## Native style rules

Follow these rules when you build a new component.

- `secondary`, `muted` and `accent` are fills; use `bg-card`, `bg-popover` or `bg-background` for anything that must be opaque.
- No gradient sheens, inset highlights, text shadows or glows.
- Size buttons and inputs at `h-8` (sm `h-7`, xs `h-6`) and menu rows at 26px. Show disabled with `opacity-64`.
- Answer a press on standard controls with a fill change, not a scale. Popups enter from `scale-98` and opacity.
- Show focus with `focus-visible:ring-2 focus-visible:ring-ring/50`.
- Put app chrome on `bg-shell` and the content in a `shell-inset` panel.

## Adding tokens

Define a new token with a value for both modes, then map it in `@theme inline` to get the utilities.

```css title="globals.css"
:root  { --info: oklch(0.6 0.12 230); }
.dark  { --info: oklch(0.68 0.12 230); }

@theme inline {
  --color-info: var(--info);   /* → bg-info, text-info, ring-info/20 … */
}
```
