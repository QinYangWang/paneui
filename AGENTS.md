# qinyang/ui — agent guide

A shadcn registry (`@qinyang/*`, style `base-nova`, Base UI primitives, Tailwind v4,
motion/react) plus its Next.js docs site. These rules keep every coding agent on one
style. `pnpm lint` enforces most of them (`@shadcn/lint`, rules in the
"qinyang/ui design-system rules" block of `eslint.config.mjs`); the rest is on you.

**After making changes, run `pnpm lint` and `pnpm exec tsc --noEmit -p .` and fix all errors.**
After changing radii or padding on nested surfaces, also run `pnpm audit:radius` against a fresh static export.

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
| `notes/synara-native-style.md` | Native desktop style reference (Synara/Codex values) | — |
| `notes/radius-audit.md` | Nested-radius audit triage (open findings by owner) | — |
| `scripts/audit-radius.mjs` (+ `.config.mjs`) | `pnpm audit:radius`: browser audit of nested radii | — |
| `THIRD_PARTY_NOTICES.md` | MIT notice for Synara | — |

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
  `border`, `input`, `ring`, `code`, `chart-1`…`chart-5`, `shell`, `shell-border` (each `*-foreground` where defined). Washes use
  opacity modifiers (`bg-success/12`, `ring-primary/20`). Never palette colors
  (`bg-zinc-100`), hex, or `[#…]`. `white`/`black` only for text on colored fills
  (`text-white` on destructive) and scrims (`bg-black/40`).
- **Visual direction: native desktop, after Synara / Codex (since 2026-10-14)**. Replaces the
  earlier flat look as the only style (no switch). Values from Synara's `index.css` and
  `components/ui` (MIT, see `THIRD_PARTY_NOTICES.md`); summary in `notes/synara-native-style.md`.
  Background `#fcfcfc` / `#0e0e0e`, card/popover white / background 99% + white, foreground
  neutral-800 / neutral-100. `secondary`, `muted`, `accent` are **translucent fills** (black 3–4% /
  white 4%), not surfaces: use them for hover/selected/track fills, and `bg-card` / `bg-popover` /
  `bg-background` for anything opaque (raised controls, triggers, floating panels, morph shells).
  `border` black 5% / white 4%, `input` black 6% / white 5%, `ring` neutral-400 / neutral-500
  (used at `/50`). No gradient sheens, inset highlights, text-shadows or glows. Charts stay
  coloured (Synara's grayscale charts were not adopted). App chrome: `bg-shell` (window band and
  rail sidebar, surface 97% + black / 95% + white) and the `shell-inset` utility (content panel:
  0.5px `shell-border` hairline, `rounded-shell`, 3px gap to the right and bottom window edges).
- **Primary is neutral (since 2026-10-14)**: near-black `oklch(0.205 0 0)` with white
  text in light, near-white `oklch(0.97 0 0)` (neutral-100) with near-black text in dark; `ring` is
  neutral-400 / neutral-500, used at `/50`. So never pair `bg-primary` with `text-white`: use
  `text-primary-foreground`, and check primary fills/text in dark mode (primary is white
  there). Accent presets (blue, green, orange, rose, violet) override `primary`,
  `primary-foreground` and an opaque `ring` (used at `/50` like the neutral one) via `html[data-accent="…"]` blocks in `globals.css`
  (light and `.dark`), switched by the docs header and persisted in
  `localStorage["accent"]`; each ships as a `theme-<name>` registry item. Charts never use
  `primary`: they use `chart-1`…`chart-5` (blue, green, amber, red, violet), which stay
  coloured under every accent.
- **Elevation (near-flat)**: `shadow-raised` (resting control/card: 1px hairline ring + 0 1px 2px
  black/5%, Synara's icon chip) → `hover:shadow-raised-hover` (ring a step darker);
  `shadow-surface` (popovers, menus, dialogs, floating panels only: hairline + soft lift);
  `shadow-well` (inset hairline for fields and tracks); `shadow-chip` (kbd, small chips);
  `shadow-primary` (filled primary, a 1-2px drop, none in dark). Resting cards, tables and code
  blocks use `shadow-raised`, never `shadow-surface`. Dark mode elevation is the hairline ring
  only. Hover on rows, menu items, ghost/outline buttons and nav is a fill (`bg-secondary`), not a ring.
- **Focus**: `focus-visible:ring-2 focus-visible:ring-ring/50`.
- **Radius**: base `--radius` 0.625rem with Synara's multipliers → `rounded-sm/md/lg/xl/2xl/3xl`
  = 6/8/10/14/18/22px (`rounded-shell` 13px for the rail inset panel).
  Buttons, inputs, select/combobox triggers, tab lists, menu/select rows: `rounded-lg`; xs
  buttons `rounded-sm`, checkboxes 4px; tab indicators inside a `p-0.5` list `rounded-md`;
  menus/popups `rounded-xl` (`p-1`, concentric with `rounded-lg` rows); cards, tables, code
  blocks `rounded-xl`; two-layer inset cards and big panels `rounded-2xl`; dialogs `rounded-3xl`. Two-layer cards: `<Card variant="inset">` + `<CardPanel>` (tinted frame, p-1, raised panel) for presented content (demos, media, code, featured plans) only; dense dashboard cards stay default.
  Keep radii concentric (outer = inner + padding): see **Nested radii** below. `rounded-full` only for inherently
  round things: avatars, dots, switches and slider thumbs, badges/tags, icon-only
  circular buttons, progress bars.
- **Nested radii (hard rule, since 2026-10-14)**: any rounded element placed inside a rounded
  container with padding uses `rounded-inner` (or an explicitly computed concentric token), never
  the same token as its container. Declare the container with the `frame-*` utilities from
  `app/globals.css` and the child follows it:

  ```tsx
  <div className="frame-2xl frame-p-2 bg-card">        {/* 18px, padding 8px */}
    <li className="rounded-inner hover:bg-secondary">… {/* 18 − 8 = 10px */}
  ```

  | Utility | On | Does |
  | --- | --- | --- |
  | `frame-{sm…3xl,shell}` | container | sets its radius and publishes radius − inset to descendants |
  | `frame-p-{n}` | container | padding on all sides **and** the inset used in the maths (`pr-1.5` etc. still override one side) |
  | `frame-inset-{n}` | container | only the inset, when the gap comes from a wrapper's `px-2 pb-2`, a gap, or asymmetric padding |
  | `frame-border` | container | adds the container's 1px border to the inset |
  | `rounded-inner`, `rounded-{t,b,s,e}-inner` | child | radius = frame radius − inset (min 2px); outside any frame it falls back to `rounded-lg` |
  | `frame-inner` | child that is itself padded | takes `rounded-inner` and publishes its own inner radius (combine with `frame-p-*`/`frame-inset-*`) |

  Two levels (`frame-*` → `frame-inner` → `rounded-inner`) are supported; a third must compute its
  value. A component that uses `rounded-inner` puts its `frame-*` on its own root, so it never
  follows a frame it does not own. A consumer `rounded-*`/`p-*` on the same element still wins
  (utility order), but then the published inset is stale: change the `frame-*` instead.
  When the rule applies: inset ≤ 8px is always concentric. If radius − inset would be < 4px the
  container is too loose for concentric: the child keeps its own token (or shrink the padding /
  grow the container, as `attachment-upload` does). For insets of 9–15px, surfaces (rows, panels,
  wells, media, thumbnails) stay concentric; self-contained controls (buttons, icon chips, inputs)
  keep their token. Never put a child's radius above its container's.
  Checks: `pnpm lint` warns (`qinyang/concentric-radius`) when a direct JSX child's literal radius
  token breaks the rule; `pnpm audit:radius` (needs the static export served, `BASE_URL`, default
  `http://localhost:3123`) measures every docs page in the browser, including opened menus and
  hovered rows from `scripts/audit-radius.config.mjs`, and writes a report grouped by page and
  component (allow-list intentional cases there, each with a reason). Triage notes:
  `notes/radius-audit.md`.
- **New tokens**: add them to `app/globals.css` in `oklch()`, with a `.dark` value
  and an `@theme inline` mapping, in a separate reviewed change.

## Typography

System UI font (`font-sans`: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui) with
`letter-spacing: normal` (no negative tracking at UI sizes); JetBrains Mono → SF Mono → Menlo
(`font-mono`) for code, keys and terminals. **Native 13px scale** (Synara `appTypography`):
`text-ui-2xs` 10 · `text-ui-xs` 11 (meta, shortcuts, counts) · `text-ui-sm` 12 (captions,
badges, small controls, tooltips) · `text-ui` 13 (default UI: buttons, inputs, menus, nav,
body inside components) · `text-ui-lg` 14 (lg controls, card titles). Library components use
the `text-ui*` sizes; Tailwind's `text-sm`–`text-2xl` stay for reading copy and page/section
headings in consumers, `text-3xl`+ for hero only. Titles `font-semibold` (`tracking-tight`
only from `text-xl` up); labels and buttons `font-medium`. Secondary text is
`text-muted-foreground`. `lib/utils.ts` extends tailwind-merge so `text-ui*` merge as font
sizes (shipped as `@qinyang/utils`, a dependency of `@qinyang/theme`). Never `text-[10px]`/`text-[11px]`.

## Density

Synara's desktop density: buttons `h-8` default, `sm` h-7, `xs`/`icon-xs` h-6, `lg` h-9, `icon` 32,
`icon-sm` 28; inputs, select/combobox triggers `h-8` (`sm` h-7), `px-2.5`; menu/select/combobox
rows `min-h-6.5` (26px) `px-2` `rounded-lg`, popup padding `p-1`, separators `mx-2 my-1`; tooltips
`px-2 py-1 text-ui-sm`; sidebar rows `h-8` (sub rows `h-7`) with `text-ui`, icons
`text-muted-foreground`, hover `bg-secondary`, active `bg-foreground/6`; checkbox/radio 16px,
switch 32×20. Disabled is `opacity-64`.

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
- **No press scale on standard controls** (Button, triggers, toggles, nav rows, checkbox, radio):
  native controls answer with a fill change, as in Synara. Press scale is kept only where the
  motion is the component's point (expanding-arrow-button, expandable-control, card-folder,
  message-bubble, hold/slide action buttons). Popups enter from `scale-98` + opacity.

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

- **Press**: no press scale on standard controls (see Motion); motion-showcase pressables
  may scale to `0.96` over `150ms` `ease-out`, disabled never scales.
- **Concentric radii**: outer radius = inner radius + padding (+ border) on nested
  surfaces; use `frame-*` + `rounded-inner` (see Tokens › Nested radii for when it applies).
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

## Attribution

The visual style follows Synara (https://github.com/Emanuele-web04/synara), MIT License,
Copyright (c) 2026 T3 Tools Inc. and Copyright (c) 2026 Emanuele Di Pietro. Full notice in
`THIRD_PARTY_NOTICES.md`; keep it when moving more values from that source.
