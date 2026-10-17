# Polish

The small details that decide whether a screen feels finished: targets, alignment, edges, numbers,
icon swaps, exits and what the compositor is asked to do. Each section names its check
(`scripts/check.mjs` rule id, or the runtime probe) and the example pair in `examples/<rule>/`.

Express every fix in the project's own system: Tailwind classes and theme tokens, the component's
`variant`/`size`, or a utility from the theme. Never add a second styling approach for one detail.

## Text

- **Headings balance.** `text-balance` on `h1`–`h3` and short titles, so a wrapped heading never leaves
  one word alone. Browsers only balance short blocks (about six lines), so it does nothing on paragraphs.
  Paragraphs, captions and card text take `text-pretty`; long reading copy can go without either. Code
  and preformatted text never take either. Check: `text-wrap`; probe: `text-wrap`.
- **Smoothing once.** `antialiased` on `<body>` (the theme's base layer already sets it). Switching it per
  element makes some text heavier than the rest. Check: `font-smoothing`; probe: `font-smoothing`.
- **Tabular digits for numbers that move.** Counters, timers, progress, prices, file sizes, table
  columns, anything inside `role="status"`, `role="timer"` or `aria-live`. Not for numbers fixed in a
  sentence, phone numbers, postcodes or version strings. Inter's tabular `1` is wider and centred; that is
  expected. A number that never changes can keep proportional digits with
  `design-check-ignore tabular-nums -- <why>`. Check: `tabular-nums`; probe: `tabular-nums`.

## Surfaces

- **Concentric corners**: rule 6 and `foundations.md` › Concentric nesting. Checks: `concentric-radius`,
  `scripts/radius-probe.js`.
- **Shadow for depth, border for structure**: a shadow level already draws the hairline; a `border` on the
  same element doubles it and turns grey on tinted backgrounds. Dividers (`border-b`, `border-t`), table
  cells and field outlines stay borders. Check: `border-and-shadow`.
- **Image edges**: `media-outline` (theme utility) on photos, covers, thumbnails and video: a 1px
  outline inset by 1px, pure black at 10%, pure white at 10% in dark. Never a palette grey or the accent,
  which pick up the surface colour and read as dirt. Leave it off transparent marks (favicons, logos) and
  off images drawn for a renderer that has no outline (share cards). Check: `media-outline`; probe:
  `media-outline`.

## Targets

- **24px minimum on desktop, 44px under a coarse pointer.** Keep the visible size of a 14–20px control and
  extend its target with a pseudo-element on a `relative` host:

  | Visible | Classes | Target |
  | --- | --- | --- |
  | 16px | `after:absolute after:-inset-1` | 24px |
  | 20px | `after:absolute after:-inset-0.5` | 24px |
  | 16px, touch | `pointer-coarse:after:-inset-3.5` | 44px |

- **No shared pixels.** When an extension would reach the next target (dots 6px apart, a close button at a
  tab's edge), extend only as far as half the gap, on that axis. Carousel dots extend 9px vertically and
  3px sideways.
- A control inside a `<label>` counts the label as its target. Inline text links are exempt.
- Checks: `hit-area` (static size classes); probe: `hit-area`, `hit-overlap` (as rendered, pseudo-elements
  included).

## Optical alignment

- **Icon side of a button**: the glyph's side bearing adds space, so mark the icon `data-icon="inline-start"`
  or `"inline-end"` and Button trims 2px on that side (default 12 → 10px, sm 10 → 8, lg 14 → 12, xs 8 → 6).
  Check: `optical-icon-padding`; probe: `optical-padding`.
- **Asymmetric glyphs** (play, arrows, stars) are corrected in the icon set's artwork, so they centre
  geometrically in the component. Don't add margins to nudge a house icon; fix the drawing (the
  `puffy-icons` skill) if one looks off.

## Motion

- **Transitions for state, keyframes for one-offs.** Hover, open, checked and pressed are transitions
  (or `data-starting-style` / `data-ending-style`), which retarget when the state flips mid-way. Keyframes
  are for loops (spinners, shimmers) and sequences that play once. Check: `keyframes-on-state`.
- **High-frequency interactions stay quiet.** Row and button hovers, keystrokes and tab switches get an
  immediate change or a fill/opacity transition of 150ms or less, never a keyframe or a long transition.
  Motion is never the only signal: the colour, icon or label changes too, so reduced motion and a missed
  frame lose nothing. Check: `motion-restraint`.
- **Entrances** for infrequent moments (first load of a hero, an empty or success state) may stagger
  semantic chunks 100ms apart (opacity, 12px rise, 4px blur); a hero title may stagger words about 80ms
  apart. Never stagger routine interactions.
- **Exits are quieter than entrances**: opacity plus a short fixed offset (`y: -8` to `-12`) and 4px blur
  over about 150ms. No half-scale shrink, no full-height flight. Remove instantly when the motion says
  nothing (frequent toggles, reduced motion). A drawer, sheet or card returning to a place it came from may
  travel the whole way. Check: `exit-subtle`.
- **Icon swaps** (copy → check, show → hide, play → pause, sun → moon): opacity 0 → 1, scale 0.25 → 1,
  blur 4px → 0, spring `{ duration: 0.3, bounce: 0 }`, `AnimatePresence initial={false} mode="popLayout"`.
  A glyph that itself turns (sun/moon, more/close) may add a quarter turn. In screens, use
  `<ActionSwapBlurIcon value={state}>` (the `action-swap-blur` item), which is this recipe. A library
  component without motion keeps both glyphs in one grid cell and cross-fades them with CSS
  (`opacity-0 motion-safe:scale-25 motion-safe:blur-xs`, `transition-[opacity,scale,filter] duration-300`,
  easing `cubic-bezier(0.22,1,0.36,1)`). Under reduced motion only the opacity changes. Checks:
  `icon-swap`, `presence-initial`.
- **Springs**: `bounce: 0`, or stiffness/damping at 0.6 of critical damping or more
  (`damping ≥ 1.2 × √(stiffness × mass)`). Checks: `spring-bounce`, `spring-damping`.
- **Press scale**: only where rule 23 allows it, at `0.96` over 150ms, never below `0.95`, never on a
  disabled control. Checks: `no-press-scale`, `press-scale-floor`.

## Performance

- Name the properties a transition animates; never `all` (check `no-transition-all`, probe
  `transition-all`).
- `will-change` only for `transform`, `opacity` or `filter`, never `all`, and only after you saw a
  first-frame stutter (Safari benefits most). Each hint costs a compositing layer. Check: `will-change`
  (error); probe: `will-change`.

## Icons

- One SVG per glyph, painted with `currentColor`; hover, selected and disabled come from text colour and
  opacity, never a second asset or a baked-in fill. Check: `icon-color`.
- Keep the set's stroke; switching style (`icons`, `icons-puffy`, `icons-outline`) is how the weight
  changes. Check: `icon-stroke`.
- Render on the grid (12, 14, 16, 18, 20, 24px); check every new glyph at its smallest size. Check:
  `icon-size`.
- In right-to-left, flip glyphs that point along the reading direction (back/forward arrows, chevrons,
  send, reply, indent) with `rtl:-scale-x-100`; never flip checkmarks, clocks, media controls or brand
  marks. Check: `icon-rtl`, on when `qinyang-design.config.json` sets `"rtl": true`.
- Icon-only controls have an `aria-label`; icons beside a label are hidden from assistive tech. Check:
  `icon-button-label` (error).

## Where we differ

Common polish advice that this library deliberately doesn't follow, and why:

| Advice | Here | Why |
| --- | --- | --- |
| Scale every button to 0.96 on press, with an opt-out prop | No press scale on standard controls (rule 23) | Native desktop controls answer a press with a fill; scaling every button makes dense screens feel springy. The 0.96 value and the 0.95 floor are kept where a press scale is allowed. |
| 40px minimum targets in dense desktop UI, 44px on touch | 24px on desktop, 44px under `pointer-coarse:` | Controls are 24–32px tall by design (rule 13); 24px is the accessibility floor, and the touch size still applies on touch. |
| Icon stroke follows the weight of the text beside it | One stroke per icon style | The set is tuned as a family; per-instance strokes mix two looks in one row. |
| Outline icons by default, filled for the active state | Solid family for navigation, line family for controls (rule 19) | Families split by role; the active state is a fill on the row, not a different glyph. |
| `cubic-bezier(0.2, 0, 0, 1)` for CSS icon cross-fades | `cubic-bezier(0.22, 1, 0.36, 1)` | One ease-out curve for the whole library. |

## Reviewing a screen

1. Walk every state: rest, hover, focus, pressed, open, loading, empty, error, disabled, in light and dark,
   at the smallest and largest radius, at 390px and in right-to-left.
2. Slow motion down to 10% (the browser's animation panel) and replay each transition; what looks wrong
   slowed down feels subtly wrong at full speed.
3. Run `scripts/check.mjs`, then paste `scripts/radius-probe.js` and `scripts/polish-probe.js` with the
   state open.

Report modes: **quick** covers the main path and its busiest states, reports only high and medium findings,
at most 5; **full** covers the whole scope across text, surfaces, targets, motion, icons and performance, at
most 15. Default to full.

Report format:

- **Scope**: mode, what was inspected (files, screens, states) per area, and anything not reviewed with the
  reason. Never imply an area was checked when it wasn't.
- **Findings**, grouped by rule, one table per rule with Severity, Location (`file:line`, or screen and
  component), Before, After, Why. High: inaccessible, misleading, unreadable or disruptive on every use.
  Medium: a noticeable usability or consistency problem. Low: isolated polish (full mode only). One row per
  systemic issue, listing every location.
- **Considered and kept**: 1–3 candidates (quick) or 2–5 (full) you looked at and left, with the reason.
  Fewer is fine; don't pad.
- **Verification**: the commands and interactions you ran and what they showed; anything not run is marked
  not verified.
- **Verdict**: block while a high finding remains, needs changes for medium or low, approve when nothing
  actionable remains.
