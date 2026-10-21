# Paper style (opt-in)

Added 2026-10-21. A second look for the whole library, switched with `data-style="paper"` on `<html>`
(or any element for one section). The default style is untouched: with no attribute every new token
resolves to the old value.

## How it is wired

- `packages/tokens/styles/theme-paper.css`: all Paper values, light and `.dark`, plus Paper versions of
  every accent preset (`html[data-style="paper"][data-accent="…"]`). Written by
  `/workspace/work/r43/gen-paper.py`; edit the values there and re-run, or edit the CSS by hand.
  Imported by `globals.css` after `theme-accents.css`; shipped as the `theme-paper` registry item.
- New theme tokens (in `@theme inline` and the `theme` item, version 2.4):
  - `--font-heading` = `var(--heading-font, <sans stack>)`, feature settings `var(--heading-font-features, "ss03")`.
  - `--radius-control` = `min(var(--control-radius, var(--radius)), var(--radius-max))`, `-sm` = half of it.
    Paper sets `--control-radius: 2rem`, so the cap (16px) applies and short controls render as pills.
- Components moved to the tokens: Button, Toggle / ToggleGroup, ButtonGroup text, Tabs and
  SegmentedControl wells (`frame-control*`). Titles with `font-heading`: Card, Dialog, AlertDialog,
  Drawer, BottomSheet, MorphingModal, EmptyState, PageHeader, SettingsSection; docs `DocHeading` and the
  components index headings. `cn()` knows `rounded-control*` so a `rounded-full` override still wins.
- Paper also raises `--radius` to 0.75rem when no radius preset is set, swaps greys to warm alpha inks,
  softens the four shadow levels and the state colours, and uses dusty accent solids (pastel solids with
  ink text in dark).
- Docs: `localStorage["style"]`, applied by the pre-paint script; `style-store.ts`; ThemeSync and
  `useFrameThemeSync` copy `data-style` into template and preview frames. Switches: the accent menu in
  the header (Style group) and the Style section on Customize.

## Open

- Native (`packages/ui-native`) has no Paper: its ThemeProvider only carries two colour sets and radii
  are static constants, so a Paper palette alone would not match.
- The Customize accent strip and its copied CSS show default-style accent values; Paper's own accent
  values live in theme-paper.css.
