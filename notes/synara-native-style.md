# Synara "native" style (extracted 2026-10-14)

Source: github.com/Emanuele-web04/synara, apps/web/src/index.css (MIT, © T3 Tools Inc. & Emanuele Di Pietro). Fork of t3code, Codex-like desktop look.

## Tokens
- Font: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`, letter-spacing normal. Mono: JetBrains Mono → SF Mono → Menlo.
- Type scale from base 13px: ui 13, ui-lg 14, ui-sm 12, ui-xs/meta 11, 2xs 10, timestamp 9; chat 13, chat-code 12.
- Radius 0.625rem (sm .6x, md .8x, lg 1x, xl 1.4x). User message bubble 1rem.
- Light: background #fcfcfc, foreground neutral-800, card/popover white, primary neutral-900, secondary black/3%, muted & accent black/4%, muted-fg neutral-500 mixed 10% black, border black/5%, input black/6%, ring neutral-400.
- Dark: background #0e0e0e, foreground neutral-100, card = bg 99% + white, primary neutral-100, secondary/muted/accent white/4%, border white/4%, input white/5%, ring neutral-500.
- Charts are grayscale (0.87 → 0.269); info = blue-500; status colors softened 72% toward white in dark.
- Rail/shell layout: shell tone = surface 97% + black (light) / 95% + white (dark); content block is an inset panel with 0.5px border black/10% (dark white/9%), radius 1.3x, 3px gap to window edge. Internal dividers = border at 60% alpha; sidebar seam black/5%.
- Sidebar icon buttons: muted-foreground/60, hover foreground/82, rounded-sm, p-0.5. Icon chips: 1px sidebar-border ring + 0 1px 2px black/5%.
- Density: buttons h-8 (sm:h-8 default, sm h-7, xs h-6 at desktop widths), text-ui-sm in small controls.

## Applied to qinyang/ui (2026-10-14)
Replaced the flat style outright (no switch). Kept: neutral black/white primary + accent presets
(their rings are now opaque and used at `/50`), coloured chart-1..5, status colours
(destructive/success/warning keep the earlier hues), existing shadow token names.
- Tokens: `app/globals.css` (system font, text-ui scale, radius multipliers, alpha fills,
  `shell`/`shell-border`, `rounded-shell`, `shell-inset` utility); `lib/utils.ts` teaches
  tailwind-merge the text-ui sizes (`@qinyang/utils`, dependency of `@qinyang/theme`).
- `secondary/muted/accent` became translucent, so every opaque use of `bg-secondary` in the
  library (raised controls, triggers, morph shells, toasts, cards) moved to `bg-card`.
- Removed press scale from standard controls (Synara has none); kept it on motion showcases.
- Dialog/drawer/sheet backdrops lost their blur (Synara: plain dim).
- Not adopted: grayscale charts, translucent/glass popups (popovers stay opaque `bg-popover`),
  1px CSS borders on controls (we keep the inset/outer hairline shadows, same alphas).
