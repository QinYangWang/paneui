---
name: puffy-icons
description: Draws new icons for the qinyang/ui icon set (single colour) in whichever style is installed, rounded (the default, 24x24 outline glyphs with 1.75px round strokes), puffy (18x18 soft, inflated filled glyphs) or outline (18x18, 1.6px round strokes), and adds them to an installed components/icons.tsx. Use when a component needs an icon the set doesn't have, when changing an existing glyph, or when choosing which icons to use together in a nav, toolbar or card header.
---

# Puffy icons

The qinyang/ui icon set (`@qinyang/icons`, installed as `components/icons.tsx`) is a single file of
React components: soft, slightly inflated glyphs in one colour. This skill lets you draw new icons
that sit in the same family, add them to that file, and use them the way the library does.

Install the set first if the project doesn't have it:

```bash
npx shadcn@latest add https://qinyangwang.github.io/ui/r/icons.json
```


Which icons to use where (families, sizes, chips, brand marks) is part of the `qinyang-design` skill
(`references/icons.md`); this skill is for drawing them.

## The primitives

Every icon is built from three things defined at the top of `components/icons.tsx`. Use them as-is;
never add your own stroke widths or wrappers.

```tsx
import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Icon({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor" aria-hidden {...props}>
      {children}
    </svg>
  );
}

// Thin round stroke for open glyphs.
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Trace every filled shape with this. It puffs the shape out a little and rounds all of its corners.
const puff = { stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" } as const;
```

- `puff`: filled with `currentColor` and traced with a 1.5 round-join stroke. Every **filled** shape
  uses it, which is what rounds the corners and gives the inflated look.
- `line`: no fill, 1.6 stroke, round caps and joins. Open glyphs (chevrons, arrows, check, x) and
  lines drawn inside or next to a shape.

## Which style is installed

The set ships in three styles with identical export names, all installed as `components/icons.tsx`:

```bash
npx shadcn@latest add https://qinyangwang.github.io/ui/r/icons.json --overwrite          # rounded (default)
npx shadcn@latest add https://qinyangwang.github.io/ui/r/icons-puffy.json --overwrite    # puffy
npx shadcn@latest add https://qinyangwang.github.io/ui/r/icons-outline.json --overwrite  # outline
```

Check the top of the file before drawing:

- **Rounded**: `viewBox="0 0 24 24"` and primitives `line` (stroke 1.75), `dot` and `solid`, no `puff`. Follow "Drawing in the rounded style".
- **Puffy**: 18x18, `puff` has no `fill` key (filled with `currentColor`, stroke 1.5). Follow the puffy rules below.
- **Outline**: 18x18, `puff` is `{ fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }`
  and there is also a `solid` primitive (the filled, 1.5-stroke version). Follow "Drawing in the outline style".

The primitives section above describes the puffy file; the rounded file defines its own at the top.
Always draw in the style the project has installed, so a new icon matches its neighbours.

## Drawing in the rounded style

```tsx
function Icon({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      {children}
    </svg>
  );
}
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const dot = { fill: "currentColor", stroke: "none" } as const;   // small dots only
const solid = { fill: "currentColor", stroke: "none" } as const; // brand marks only
```

- 24x24 grid, centre 12,12. Glyphs are large: artwork spans about 2 to 22 (a full circle is r=10,
  a card is 19x17 or 20x16). Thin glyphs (chevrons, check, plus) span about 12 to 16.
- Every shape is `line`. `dot` only for tiny filled dots (r 1.1 to 1.4: info dot, ellipsis, bullets).
- Very rounded: rect `rx` 4 to 5 on cards and windows (3 on small parts), corners on paths eased with
  arcs of radius 2 or more. Only arrowheads and chevrons keep a point, softened by the round join.
- Keep parallel strokes at least 2.25 apart and at most about three details inside a shape, so the
  icon reads at 16px. Circles sit a little smaller than squares (r=10 next to a 19 to 20 square).
- Shapes the puffy style fills are outlines here.

```tsx
export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="2" y="4" width="20" height="16" rx="4.5" />
    <path {...line} d="M6 8.5l4.3 3.1a3 3 0 0 0 3.4 0L18 8.5" />
  </Icon>
);

export const InfoIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="12" cy="12" r="10" />
    <path {...line} d="M12 16.5v-5" />
    <circle {...dot} cx="12" cy="8" r="1.1" />
  </Icon>
);
```

## Drawing in the outline style

Same grid, padding and element rules as puffy (18x18, art within about 2.6 to 15.4, `path`/`circle`/`rect`
only, `currentColor` only, every detail readable at 14px). What changes:

- Shapes are contours: draw the silhouette with `puff` (which is now an outline), details with `line`.
  Everything reads at one 1.6px weight.
- No knockouts. Where a puffy icon would cut a hole with `fillRule="evenodd"`, draw the inner detail as a
  `line` stroke or a separate contour instead. Two concentric contours closer than about 1.4px turn into a
  blob at 14px; drop one or simplify.
- Tiny dots (radius 0.6 or less: grip dots, ellipsis, status dots, wheels, eyes) use `solid` so they stay
  visible; a stroked dot that small closes up.
- Narrow bars and slots: if a shape is too thin to stay open as a contour (inner gap under about 1.4px),
  draw it as a single `line` stroke instead (chart bars, pause bars, a cuff).
- Corner radii about 1.8 on rectangles, matching the line rings in the set.

Reference (outline):

```tsx
// Bot: outlined head, solid eyes
<path {...line} d="M9 3.4v2.2" />
<path {...puff} d="M5.4 6.4h7.2c.9 0 1.6.7 1.6 1.6v4.4c0 .9-.7 1.6-1.6 1.6H5.4c-.9 0-1.6-.7-1.6-1.6V8c0-.9.7-1.6 1.6-1.6z" />
<circle {...solid} cx="7.1" cy="10.2" r=".4" />
<circle {...solid} cx="10.9" cy="10.2" r=".4" />
```

In the outline style the solid vs line family rule in "Using icons" still applies to which glyph you pick
(`InboxIcon` for nav), even though both now render as outlines.

## Style rules (puffy)

- **Grid**: 18x18 viewBox, centre (9, 9), about 2.5px padding. Artwork stays inside roughly x/y
  2.6–15.4. The puff stroke adds 0.75px on each side, so a filled path's own coordinates sit about
  0.75px further in than its visual edge.
- **Colour**: `currentColor` only. No other colours, no opacity tricks, no gradients.
- **Elements**: `path`, `circle` and `rect` only. No `transform`, `mask`, `clipPath`, `filter`, or
  styling on `<g>`.
- **Knockouts** (a hole, like a gear's centre): one path with `fillRule="evenodd"`, outline and hole
  in the same `d`. Draw the hole 0.75px larger per side than you want it to look, because the puff
  stroke shrinks it by 0.75px per side.
- **Objects that read as frames** (envelope, calendar, info, clock, image, monitor): outlined rings
  drawn with `line` (a `rect` with `rx` about 2), not filled.
- **Mixing is fine** inside one icon: a puff body with `line` details (a bell is a puff bell plus a
  line clapper).
- **Simple**: every detail has to survive at 14px. One shape plus at most one or two details; keep
  at least about 1.4px between strokes.
- **Curves**: corner radii on filled outlines about 1.5–1.8, generous arcs, no hairline spikes or
  needle points.
- **Export**: `export const NameIcon = (p: IconProps) => (<Icon {...p}>…</Icon>);`, PascalCase ending
  in `Icon`, using the conventional icon name when one exists (the name people search icon sets by). Put it in
  the matching section of the file: `Basic glyphs (line)` or `Solid shapes (puff)`.

## Reference examples

Copy the feel of these; they are taken from the set.

```tsx
// Pure puff
export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M9 14.3c-.3 0-.6-.1-.86-.27C5.2 12.1 3.2 10 3.2 7.35A2.95 2.95 0 019 6.05a2.95 2.95 0 015.8 1.3c0 2.65-2 4.75-4.94 6.68-.26.17-.56.27-.86.27z" />
  </Icon>
);

// Ring object
export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.3" y="4.5" width="11.4" height="9" rx="2" />
    <path {...line} d="M4.4 6.4L9 9.6l4.6-3.2" />
  </Icon>
);

// Puff body + line detail
export const BellIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M9 3.6c-2.2 0-3.9 1.8-3.9 4v2.1l-.9 1.4c-.3.5 0 1 .5 1h8.6c.5 0 .8-.5.5-1l-.9-1.4V7.6c0-2.2-1.7-4-3.9-4z" />
    <path {...line} d="M7.6 14.4h2.8" />
  </Icon>
);

// Evenodd knockout: gear outline and centre hole in one path
export const SettingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      {...puff}
      fillRule="evenodd"
      d="M7.99 3.51 L10.01 3.51 L10.46 5.19 L11.69 5.86 L13.37 5.42 L14.38 7.1 L13.14 8.33 L13.14 9.67 L14.38 10.9 L13.37 12.58 L11.69 12.14 L10.46 12.81 L10.01 14.49 L7.99 14.49 L7.54 12.81 L6.31 12.14 L4.63 12.58 L3.62 10.9 L4.86 9.67 L4.86 8.33 L3.62 7.1 L4.63 5.42 L6.31 5.86 L7.54 5.19zM9 6.95a2.05 2.05 0 100 4.1 2.05 2.05 0 000-4.1z"
    />
  </Icon>
);

// Line glyph
export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M4.4 9.6l3 3 6.2-6.4" />
  </Icon>
);
```

## Using icons

- **Two families, never mixed in one group.** Solid (puff silhouettes) and line/ring. Icons shown
  side by side (a nav list, a rail, a dock, a tab bar, a command palette group, a feed of cards) all
  come from one family. Navigation uses the solid family: `InboxIcon` rather than `MailIcon`,
  `CalendarDaysIcon` rather than `CalendarIcon`, `TerminalSquareIcon` rather than `TerminalIcon`.
  Line glyphs are for controls: chevrons, close, add, search fields, toolbar buttons.
- **Nav, sidebar, palette**: 16px, `text-muted-foreground`, active or selected `text-foreground`, no
  frame.
- **Inline** (buttons, badges, meta rows): no size of its own; the button or text sets it.
- **Title, header, card, alert icons** sit in an `IconChip` (`npx shadcn@latest add
  https://qinyangwang.github.io/ui/r/icon-chip.json`): sizes `sm` 24, `default` 32, `lg` 40, `xl` 48;
  tones `neutral`, `primary`, `success`, `warning`, `destructive`, `solid`. One size per list.
- On an icon, `className` sets size, layout, a token text colour, opacity and motion only.
- Import every icon from `@/components/icons`. Don't mix in another icon library or ad-hoc SVG next
  to these; draw the missing glyph instead.

## Workflow

1. **Check it doesn't exist.** List the exports and look for the name and its synonyms:
   `grep -o "export const [A-Za-z]*Icon" components/icons.tsx`.
2. **Check the installed style** (see Which style is installed) and draw in it.
3. **Pick the family.** Decide solid or line from where the icon will sit (see Using icons) and
   which neighbours it will appear with.
4. **Sketch on the grid.** Work out coordinates around the centre (9, 9) inside the 2.6–15.4 box,
   using only `puff` and `line` (plus `solid` for tiny dots in the outline style). Start from the closest reference example.
5. **Add the export** to the matching section of `components/icons.tsx`, after the existing icons
   of that section. Don't change the primitives or other icons.
6. **Render and look at it**, next to three or four existing icons of the same family, at 48px,
   18px and 14px. This skill ships `scripts/preview.tsx`, which renders a contact sheet of any
   exports you filter for:

   ```bash
   npx esbuild <this skill>/scripts/preview.tsx --bundle --platform=node --jsx=automatic \
     --alias:icons=./components/icons.tsx --external:@resvg/resvg-js --outfile=.icon-preview.cjs
   node .icon-preview.cjs icon-preview.png heart,bell,settings,yournew        # dark background
   node .icon-preview.cjs icon-preview-light.png heart,bell,yournew --light   # light background
   rm .icon-preview.cjs
   ```

   If you only downloaded `SKILL.md`, save the script next to it as `scripts/preview.tsx` from
   https://qinyangwang.github.io/ui/skills/puffy-icons/scripts/preview.tsx.

   Run it from the project root (it needs the project's `react` and `react-dom`). PNG output needs
   `@resvg/resvg-js` (`npm i -D @resvg/resvg-js`); without it the sheet is written as SVG. Any other
   way of rendering the components to an image works too, such as a scratch page in your dev server.
7. **Check the sheet** and fix what fails, then render again:
   - Padding and optical size match the neighbours (nothing visibly bigger or smaller, nothing
     clipped at the edges).
   - Weight matches: a puff icon looks as heavy as the other puff icons, a line icon as light as the
     other line icons.
   - Holes and gaps are still open at 14px; no detail turns into a blob.
   - Optically centred (a heavy top or a pointed side may need a 0.2–0.4px shift).
8. **Typecheck** (`npx tsc --noEmit`) and use the icon.

If you ever re-install or switch the set with shadcn (`--overwrite`), it overwrites `components/icons.tsx`. Keep your
own glyphs in a separate section at the end of the file (for example `/* My icons */`) so they're
easy to copy back, or move them to their own file that copies the three primitives above.
