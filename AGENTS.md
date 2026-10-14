# qinyang/ui — agent guide

A shadcn registry (`@qinyang/*`, style `base-nova`, Base UI primitives, Tailwind v4,
motion/react) plus its Next.js docs site. These rules keep every coding agent on one
style. `pnpm lint` enforces most of them (`@shadcn/lint`, rules in the
"qinyang/ui design-system rules" block of `eslint.config.mjs`); the rest is on you.

**After making changes, run `pnpm lint` and `pnpm exec tsc --noEmit -p .` and fix all errors.**

## Where things live

| Path | What | Lint audience |
| --- | --- | --- |
| `registry/base-nova/ui/*.tsx` | Components (`registry:ui`) | library |
| `registry/base-nova/blocks/<name>/` | Composed blocks (`registry:block`) | library |
| `components/icons.tsx` | Puffy icon set (`@qinyang/icons`) | library |
| `registry/base-nova/examples/<name>-demo.tsx` | One demo per item | consumer |
| `registry/base-nova/templates/**`, `app/**` | Page templates, docs site routes | consumer |
| `components/docs/**` | Docs shell (nav, gallery, install command) | consumer |
| `app/globals.css` | The theme: every token below | — |
| `notes/icon-usage.md` | Icon usage system | — |

Import library code as `@/registry/base-nova/ui/<file>` or `@/registry/base-nova/blocks/<name>/<file>`.
**Library** files own their appearance (no `no-restyle`; arbitrary values only warn).
**Consumer** files compose the library: tokens only, `className` on a component for
layout, plus the per-family contracts (Card parts take spacing, titles take
typography, Buttons take margins and `w-full`). If lint says a component "owns" a
style, use a variant/size or style a plain wrapper `<div>`; add a variant to the
component only if the design really needs a new treatment.

## Tokens (`app/globals.css`)

- **Colors**: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`,
  `muted`, `muted-foreground`, `accent`, `destructive`, `success`, `warning`,
  `border`, `input`, `ring`, `code`, `chart-1`…`chart-5` (each `*-foreground` where defined). Washes use
  opacity modifiers (`bg-success/12`, `ring-primary/20`). Never palette colors
  (`bg-zinc-100`), hex, or `[#…]`. `white`/`black` only for text on colored fills
  (`text-white` on destructive) and scrims (`bg-black/40`).
- **Visual direction (flat, since 2026-10-14)**: after jakub.kr / oklch.fyi. Chroma-0
  neutral grays. No gradient sheens, inset highlights, text-shadows or glows on controls.
  Research: `notes/flat-tokens-research.md`.
- **Primary is neutral (since 2026-10-14)**: near-black `oklch(0.205 0 0)` with white
  text in light, near-white `oklch(0.922 0 0)` with near-black text in dark; `ring` is a
  translucent gray. So never pair `bg-primary` with `text-white`: use
  `text-primary-foreground`, and check primary fills/text in dark mode (primary is white
  there). Accent presets (blue, green, orange, rose, violet) override `primary`,
  `primary-foreground` and `ring` via `html[data-accent="…"]` blocks in `globals.css`
  (light and `.dark`), switched by the docs header and persisted in
  `localStorage["accent"]`; each ships as a `theme-<name>` registry item. Charts never use
  `primary`: they use `chart-1`…`chart-5` (blue, green, amber, red, violet), which stay
  coloured under every accent.
- **Elevation**: `shadow-raised` (resting control/card: 1px hairline ring + faint drop)
  → `hover:shadow-raised-hover` (ring a step darker) and/or `hover:bg-accent`;
  `shadow-surface` (popovers, menus, floating panels); `shadow-well` (inset hairline for
  fields and tracks); `shadow-chip` (kbd, small chips); `shadow-primary` (filled primary).
  Dark mode elevation is the hairline ring only. `shadow-pressed` is a flat ring; press
  is expressed with scale, not shadow.
- **Radius**: base `--radius` 0.5rem → `rounded-sm/md/lg/xl/2xl` = 4/6/8/12/16px.
  Buttons, inputs, select/combobox triggers, tab lists: `rounded-lg`; items inside a
  padded container `rounded-md`; menus/popups `rounded-xl`; cards `rounded-xl`/`2xl`. Two-layer cards: `<Card variant="inset">` + `<CardPanel>` (tinted frame, p-1, raised panel) for presented content (demos, media, code, featured plans) only; dense dashboard cards stay default.
  Keep radii concentric (outer = inner + padding). `rounded-full` only for inherently
  round things: avatars, dots, switches and slider thumbs, badges/tags, icon-only
  circular buttons, progress bars.
- **New tokens**: add them to `app/globals.css` in `oklch()`, with a `.dark` value
  and an `@theme inline` mapping, in a separate reviewed change.

## Typography

Geist Sans (`font-sans`) for UI, Geist Mono (`font-mono`) for code, keys and numbers in
terminals. Scale: `text-xs` meta/captions/badges · `text-sm` default UI and body ·
`text-base` reading copy and card titles · `text-lg`–`text-2xl` section/page headings ·
`text-3xl`+ hero only. Titles `font-semibold tracking-tight`; labels and buttons
`font-medium`. Secondary text is `text-muted-foreground`, never a grey palette color.
Consumers use the scale only; off-scale sizes (`text-[11px]`) are library-only and are
flagged as token candidates.

## Spacing rhythm

4px grid (Tailwind spacing). Inline gaps `gap-1.5`–`gap-2` (icon + label), control
groups `gap-2`–`gap-3`, card padding `p-4`–`p-6`, stacked sections `gap-6`–`gap-10`.
Card inner parts own their padding; put space between things with `gap` on the parent
or margin on the child, not padding on a component.

## Icons (summary of `notes/icon-usage.md` + puffy rules)

- All icons come from `@/components/icons` (`@qinyang/icons`), never lucide or ad-hoc SVG.
- Drawing: 18×18 grid, ~2.5px padding, only the `puff` (filled, 1.5 round stroke)
  and `line` (1.6 stroke, round caps) primitives, `currentColor` only, `path`/`circle`/`rect` only.
- Two families never mixed in one group: **solid (puff)** and **line/ring**. Nav,
  rails, docks, tab bars and palettes use solid (`InboxIcon` not `MailIcon`,
  `CalendarDaysIcon` not `CalendarIcon`, `TerminalSquareIcon` not `TerminalIcon`).
  Line glyphs are for controls (chevrons, close, add, search).
- Nav/sidebar/palette icons: 16px, `text-muted-foreground`, active `text-foreground`, bare.
  Inline icons: the button sets the size.
- Title/header/card/alert icons go in `<IconChip>` (sizes sm 24 / default 32 / lg 40 / xl 48;
  tones neutral, primary, success, warning, destructive, solid); one size per list.
  Add `@qinyang/icon-chip` to `registryDependencies` when used.
- On an icon, `className` takes size, layout, a token text color, opacity and motion only.

## Motion

- motion/react springs, bounce-free and critically damped-ish: the house range is
  `{ type: "spring", stiffness: 380–520, damping: 26–42, mass: 0.5–0.7 }`
  (e.g. `420/38/0.6` for settles, `500/30` for snappy toggles). Icon cross-fades:
  `{ type: "spring", duration: 0.3, bounce: 0 }`.
- CSS: `duration-150` (press, hover, high-frequency), `duration-200` (state changes),
  `duration-300` (reveals, panels); easing `ease-[cubic-bezier(0.22,1,0.36,1)]`
  (or `EASE = [0.22, 1, 0.36, 1]` in motion); the overshoot curve
  `cubic-bezier(0.34,1.56,0.64,1)` only for playful pops.
- Transition named properties (`transition-[box-shadow,background-color,color]`,
  `transition-colors`, `transition-transform`), never `transition-all`.
- Every movement, scale or blur is gated: `useReducedMotion()` / `motion-reduce:` /
  `motion-safe:`, falling back to an opacity cross-fade.
- Press is `active:scale-96` (150ms ease-out, `scale` in the transition list) on
  Button and every custom pressable; large surfaces may use `scale-98`.

## Light and dark

Every change must look right in both themes (`.dark` on `<html>`). Use tokens, not
`dark:` overrides with palette colors; check the gallery in both themes
(theme toggle in the docs header).

## House rules from the better-* skills

Jakub Krehel's skills are installed in `.agents/skills/`. Load the relevant one for UI work:

| Work | Skill |
| --- | --- |
| Full review of a component, block or page | `better-interface` (runs all the better-* skills) |
| Reviewing a diff / branch / PR | `interface-review` |
| Surfaces, radii, shadows, icons, motion | `better-ui` |
| Type scale, wrapping, numerals, punctuation | `better-typography` |
| Grouping, alignment, responsive structure | `better-layout` |
| Color tokens, palettes, contrast | `better-colors` |
| Focus, keyboard, ARIA, forms, reduced motion | `better-accessibility` |
| Labels, errors, empty states, confirmations | `better-writing` |

Where our tokens and components above don't already decide, adopt their exact values as
house rules:

- **Press**: custom pressables scale to `0.96` over `150ms` `ease-out`
  (`enabled:active:scale-96`); disabled never scales; never below 0.96.
- **Concentric radii**: outer radius = inner radius + padding (+ border) on nested
  surfaces with an even inset ≤ 24px; beyond that, keep each surface's own token.
- **Text wrapping**: `text-balance` on headings and titles, `text-pretty` on body
  paragraphs and descriptions.
- **Numbers**: `tabular-nums` on any number that updates, aligns in columns, or
  counts (prices, timers, tickers, tables).
- **Reduced motion**: movement/scale/blur only under `prefers-reduced-motion: no-preference`;
  under reduce, cross-fade opacity instead of removing motion abruptly.
- **Transitions**: name the properties; never `all`. `will-change` only for a seen
  stutter, naming the property.
- **Enter/exit**: staggered entrances 100ms apart (opacity + 4px blur + 12px
  translateY, 300ms ease-out); exits shorter (150ms, -12px). `initial={false}` on
  `AnimatePresence` state swaps.
- **Overlays**: `overscroll-contain` on scrollable dialogs, drawers, menus.
- **New colors**: `oklch()` tokens in `app/globals.css`, light and dark.

## Adding a registry item

1. Component: `registry/base-nova/ui/<name>.tsx` (or `blocks/<name>/…`). Export named
   parts, `data-slot` on each, variants with `cva`, forward `className` through `cn`.
2. Example: `registry/base-nova/examples/<name>-demo.tsx` (default export), written as
   a consumer: it must pass consumer lint.
3. `registry.json`: add the item (`name`, `type`, `title`, `description`,
   `dependencies`, `registryDependencies` such as `@qinyang/theme` / `@qinyang/icons` /
   `@qinyang/icon-chip`, `files`, and `meta.category`, one of `Foundations, Forms,
   Overlays, Display, Navigation, Text, Motion, Data, Agents, Charts, Blocks`
   (see `ORDER` in `lib/docs.ts`)).
4. `components/docs/demos.tsx`: import the demo and add `"<name>": <Name>Demo`.
5. `pnpm lint`, `pnpm exec tsc --noEmit -p .`, then `pnpm shadcn build` to regenerate `public/r/`.

## Lint exceptions

Fix the code first. If a rule is wrong for a legitimate case, use one
`// eslint-disable-next-line shadcn/<rule> -- <reason>` (JSX: `{/* … */}`) on that
line only, with a reason. List them with `rg "eslint-disable.*shadcn/"`; each is a design decision to review.

## Component docs pages
Every registry:ui item has `content/docs/<name>.ts` (type `ComponentDoc` in lib/doc-types.ts: usage, composition, examples, notes, api) and examples in `registry/base-nova/examples/<name>/<id>.tsx`. After adding or renaming one run `pnpm docs:gen` (regenerates content/docs/index.generated.ts and components/docs/examples.generated.tsx; commit both). API tables list only props the library adds or changes; the rest is `extends` with a Base UI link. Examples render client-only.
