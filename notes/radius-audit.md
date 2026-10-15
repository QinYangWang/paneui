# Nested-radius audit (2026-10-14)

User report: "I see many inconsistent corner radii, is there a way to solve it?" The fix is
systemic: a concentric-radius mechanism in the theme, a hard rule in `AGENTS.md`, a lint rule
for the static cases and a browser audit for everything else.

## Mechanism (app/globals.css › "Concentric radii")

```tsx
<div className="frame-2xl frame-p-2">      {/* radius 18, padding 8 */}
  <li className="rounded-inner" />          {/* 18 − 8 = 10 */}
</div>
```

- `frame-{sm…3xl,shell,[len]}`: container radius; publishes `--frame-inner-1` = radius − inset − border (min 2px).
- `frame-p-{n}`: padding + inset. `frame-inset-{n}`: inset only (padding sits on a wrapper or is asymmetric).
  `frame-border`: count a 1px border.
- `rounded-inner` / `rounded-{t,b,s,e}-inner`: child radius (fallback `rounded-lg` outside any frame).
- `frame-inner`: a padded child that is itself a frame (level 2): own radius = parent's inner,
  publishes `--frame-inner-2` for its children. A new `frame-*` resets the chain.
- The inputs (`--frame-r`, `--frame-p`, `--frame-b`) are registered as non-inheriting `@property`s, so a
  frame never picks up an ancestor's padding. Verified in Chromium: 2xl/p-1 → 14, nested frame-inner/p-1.5 → 8,
  a fresh frame inside resets → 10, `frame-border` → 9, no frame → 10.
- Utility order means a consumer `rounded-*` / `p-*` / `pr-*` on the same element wins over `frame-*`
  (`frame-p-2 pr-1.5` works); the published inset is then stale, so change the frame instead.
- tailwind-merge does not know these classes (see follow-ups).

## When the rule applies (AGENTS.md › Nested radii)

| Inset d | Concentric R − d | Rule |
| --- | --- | --- |
| ≤ 8px | ≥ 4px | **must** be concentric (`rounded-inner`) |
| any | < 4px | container too loose: child keeps its own token (or shrink the padding / grow the container) |
| 9–15px | ≥ 4px | surfaces (rows, panels, wells, media, thumbnails) concentric; controls (buttons, icon chips, inputs) keep their token |
| ≥ 16px | – | not nested for this purpose |

A child is never rounder than its container.

## Tools

- `pnpm lint` → `qinyang/concentric-radius` (warn, `eslint.config.mjs`): a JSX element with a literal
  radius token and `p-*`/`frame-p-*`, whose direct JSX child sets a literal radius token ≠ outer − padding (±2px).
  Static, so it only sees nesting written in one file. Currently 0 warnings repo-wide.
- `pnpm audit:radius` (`scripts/audit-radius.mjs`, config `scripts/audit-radius.config.mjs`): loads `/` and
  `/docs/<name>/` for every item in `content/docs/index.generated.ts` from the served static export
  (`BASE_URL`, default `http://localhost:3123`), measures every rounded element against its nearest rounded
  ancestor, then runs the configured interactions (opens menu/select/combobox/multi-select/context-menu/popover/
  popover-morph/select-morph/color-picker/date-range-picker and hovers their first rows) and measures again.
  Options: `--dark`, `--pages a,b`, `--all` (every page under out/docs), `--url <u1,u2>` (any page, e.g. an
  esbuild demo harness), `--no-actions`, `--strict` (exit 1 on any must), `--tolerance`, `--max-inset`.
  Output: `node_modules/.cache/radius-audit/report-{light,dark}.{md,json}`, grouped by page → example → data-slot,
  with selectors and the radius/padding classes of both elements.
  Skipped automatically: full rounds (pills, avatars, dots), flush children of clipping parents, square
  corners that paint nothing, rows cut by a scroll edge, concentric values < 4px with r ≤ R.
  Playwright comes from the project, `$PLAYWRIGHT_PATH`, or `/workspace/work/pw/node_modules`; Chromium from
  `$CHROMIUM_PATH` or `/usr/bin/chromium`.

## Run against the static export (out/, built before this round)

Light: **28 findings (19 must), 13 allow-listed**; dark: same set (no theme-only issue).
`out/` predates this round, so it does not show the fixes below. They were checked by rendering the real
demo files in an esbuild harness and auditing that page (`--url`): **0 findings, light and dark**.

### Fixed in this pass (21 of the 28)

| Item | Was | Now |
| --- | --- | --- |
| tool-result | code well `rounded-xl` (14) in `rounded-2xl` root, 8px inset (must, visible) | root `frame-2xl frame-inset-2`, well `rounded-inner` → 10 |
| todo-list | item rows `rounded-xl` in `rounded-2xl`, 8px inset | root `frame-2xl frame-inset-2`, rows `rounded-inner` → 10 |
| availability-scheduler (block) | day rows `rounded-xl` in `rounded-2xl p-2` | `frame-2xl frame-p-2`, rows `rounded-inner` → 10 |
| file-upload (block) | thumbnail `rounded-xl` in item `rounded-2xl p-2.5` | item `frame-2xl frame-p-2.5`, thumb `rounded-inner` → 8 |
| attachment-upload (block) | rows `rounded-2xl` in `rounded-3xl p-3` (want 10), thumbs `rounded-xl` in rows p-2 | root `frame-3xl frame-p-2` (header padding bumped to keep its position), dropzone + rows → 14, rows `frame-inner frame-p-2` so thumbs → 6; compact dropzone icon `rounded-sm` (≈ 14 − 10) |
| color-picker | area `rounded-xl` and hex field `rounded-xl` in popup `rounded-2xl p-3` (want 6) | popup `frame-2xl frame-p-3`, area + hex field `rounded-inner` (6 in the popup, 10 standalone); inline example wrapper `frame-2xl frame-p-3` |
| icon-chip demo | rows `rounded-xl` in list `rounded-2xl p-2` | list `frame-2xl frame-p-2`, rows `rounded-inner` → 10 (chips keep their token: 10 − 8 < 4) |
| file-tree examples (demo, items, open-file, controlled-expanded) | 6px rows in `rounded-2xl p-2` cards (want 10) | cards `rounded-xl` (6 + 8 = 14) |
| message-scroller › custom-jump | xs button (6) in the footer corner, 8px in from an 18px frame | `size="sm"` (10) |
| smooth-scroll › scroll-to-section | xs buttons (6) 8px in | `size="sm"` (10) |
| smooth-scroll › easing | cards `rounded-lg` in `p-3` (want 6) | list `p-2` (18 − 8 = 10) |

Screenshots (harness, light/dark): `work/radius/shot-<demo>-<theme>.png` in the project workspace
(attachment, availability, color-inline, color-popup [light only], custom-jump, easing, file-tree, file-upload, icon-chip,
scroll-to-section, todo-list, tool-result).

### Open: components owned by other agents this round (not touched)

| Where | Finding | Suggested fix |
| --- | --- | --- |
| `registry/base-nova/ui/animated-sidebar.tsx` (floating panel) | **must**, latent (hover/active fill): sidebar items `rounded-lg` (10) inside the floating `sidebar-panel` `rounded-xl` (14) with an 8px inset → want 6. Seen in main-demo, collapsed, controlled. | panel `frame-xl frame-inset-2` + item `rounded-inner`, or items `rounded-sm` in the floating variant |
| animated-sidebar demo (`examples/animated-sidebar*`) | should, visible: dashboard placeholder cards `rounded-xl` in `sidebar-inset` `rounded-2xl p-3` → want 6 | inset `frame-2xl frame-p-3` + cards `rounded-inner`, or `p-2` (→ 10, `rounded-lg`) |
| `components/docs/install-command.tsx` (`command-pill`, every docs page) | **must**, latent: copy button (`action-swap-button`, `rounded-lg` 10) 4px inside the `rounded-lg` pill (`pr-1`) → want 6 | pill `frame-lg frame-inset-1`, button `rounded-inner`; or pill `rounded-xl` (14 − 4 = 10) |
| `examples/shader-background-demo.tsx` | should (round container): xs buttons `rounded-sm` inside a `rounded-full p-1` group → round frame wants round children | buttons pill-shaped, or group `frame-lg frame-p-1` + `rounded-inner`. The current file no longer has `rounded-full`, so the owner may have changed it already: re-check after the rebuild. |

No findings, at rest or with the configured interactions, in the pre-round build for: table-editable,
message-bubble, message, agent-activity, returns-calendar, expandable-action-bar, overflow-actions,
morphing-tabs, or anything under `app/`. They are being edited now, so re-run after the rebuild.

### Allow-listed (scripts/audit-radius.config.mjs)

- Controls (buttons, icon chips, inputs, tabs, badges, kbd) 9–15px in keep their token. This covers tool-approval
  (chips and buttons 14px in), alert icon, notification-stack chip, sortable-stack button, scroll-to button,
  date-range-picker presets/clear, popover close.
- `citation-favicon` img: a square favicon inside a round badge.
- `project-folder`: drawn illustration (flaps, paper sheets), not nested surfaces.

## Follow-ups (outside this assignment's files)

1. `lib/utils.ts`: teach tailwind-merge the new classes so `cn("rounded-inner", "rounded-lg")` and
   `cn("frame-p-2", "p-4")` collapse instead of both staying: extend `classGroups` with
   `rounded: [{ rounded: ["inner"] }]`, `"rounded-t": [{ "rounded-t": ["inner"] }]` (and b/s/e), and a
   `frame` group for `frame-*`. Utility order already makes the consumer class win, so this is tidiness.
2. After the lead's `next build`: run `pnpm audit:radius` and `pnpm audit:radius -- --dark` (serve `out/` on 3123
   first) and update this file. Expect the 21 fixed findings to be gone and the 7 open ones above to remain
   until their owners pick them up.
3. Add actions to the config when a new component only shows nested radii on interaction.

## Round 6 (2026-10-15)

Audit of the round-6 components and templates, light and dark: 0 findings after these fixes.

- Fixed in the library: `edited-files-card` (root `frame-xl frame-inset-2`, header buttons `rounded-inner`),
  `notion-editor` (root `frame-xl frame-inset-2`, so the document toolbar's `rounded-inner` buttons sit at 6px),
  `email-editor` header (h-12 px-3: its controls sit 9.5px in and keep their token).
- Fixed in examples: wrappers around rail/list rows (`thread-list-item`, `user-menu`, `workspace-switcher`,
  `icon-rail`, `tab-strip`) are `rounded-2xl` around `p-2`/`p-1.5` (18 − 8 = 10 = the rows' `rounded-lg`);
  `toolbar/document-bar` is a `frame-xl frame-inset-2` bar.
- Allow-listed: `segmented-control` 9–15px in (a control), the `swatch-picker` "none" strike line, and an
  email section nested in a Show-if block (third frame level, editor chrome only).

## Round 13 (2026-10-16): radius presets

`pnpm audit:radius --radius <none|sm|lg|xl>` audits under a preset. Token pairs that were concentric by
coincidence at the default `--radius` (rounded-xl around p-1 rows = rounded-lg) drift at large radii,
because the padding stays fixed while every token scales. The fix is always `frame-*` + `rounded-inner`.

- Default radius: 0 findings (11 allow-listed).
- Fixed: inset `Card` publishes its frame (`frame-2xl frame-inset-1`, `CardPanel` `rounded-inner`); multi-select
  well (`frame-lg` + per-size inset; chips and the trigger button `rounded-inner`) and popup
  (`frame-xl frame-inset-1`, rows `rounded-inner`, 10px at default instead of 8px); morph-select popup
  (`frame-xl frame-inset-1.5`, rows `rounded-inner`); card-folder dashed outline computes outer − 8px.
- Allow-listed: calendar range endpoints (round button over a square-sided strip); terminal emulator scroll
  layers (square, clipped by the demo card's overflow-hidden).
- Open at `xl` (17: 3 must, 14 should; all latent or controls): multi-select chip remove buttons (make the
  chip `frame-inner frame-inset-0.5`), `shared-layout-bg/disabled` and `thread-list-item` demos (container
  token around a fixed `p-1`/`p-2`; the consumer lint blocks `frame-*` on library components, so these need
  a plain wrapper frame), `user-menu` demo, kbd inside the header search and input-group addons
  (controls), animated-sidebar inset panel.
