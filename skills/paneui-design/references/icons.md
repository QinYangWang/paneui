# Icons and brand marks

All glyphs come from the house set (`@paneui/icons`, installed as `components/icons.tsx`), never another
icon package or an ad-hoc SVG. Drawing new glyphs is the `puffy-icons` skill
(`npx skills add taimatsuorg/paneui --skill puffy-icons`); it covers the grids, primitives and preview script
for every style.

## Styles

One file, three styles with the same exports: rounded (default, 24×24, 1.75px strokes), puffy (18×18 soft
filled shapes) and outline (the puffy shapes as 1.6px outlines). Switch a project with
`npx shadcn@latest add <site>/r/icons-puffy.json --overwrite` (or `icons-outline.json`, `icons.json`).
Check a new icon in every style at 14px.

## Families

- **Solid**: filled silhouettes with knockouts (`HomeIcon`, `BotIcon`, `SettingsIcon`, `InboxIcon`,
  `CalendarDaysIcon`, `ServerIcon`, `TerminalSquareIcon` in the puffy style).
- **Line / ring**: open glyphs and outlined objects (chevrons, arrows, check, x, search, `MailIcon`,
  `CalendarIcon`, `InfoIcon`, `ClockIcon`).
- A set shown side by side (nav list, rail, dock, tab bar, palette group, a feed of cards) uses one family.
  Navigation uses the nav glyphs: `InboxIcon` not `MailIcon`, `CalendarDaysIcon` not `CalendarIcon`,
  `TerminalSquareIcon` not `TerminalIcon`. In the rounded and outline styles they are outline like the
  controls; the puffy style draws them solid.
- **Filled pairs**: `HomeFilledIcon`, `InboxFilledIcon`, `ChatFilledIcon`, `CalendarDaysFilledIcon`,
  `BellFilledIcon`, `UserFilledIcon`, `SettingsFilledIcon`, `FolderFilledIcon`, for the active item of a
  nav without a row fill (`TabBarItem activeIcon`). A row fill already marks the active item in sidebars
  and rails, so they keep the outline glyph. Add a pair in all three styles when a new glyph goes in a tab
  bar (the outline style generates it from the puffy drawing).

## Stroke tiers

Line strokes have a regular and a bold tier (1.2x). The `<svg>` sets the width as
`calc(<style stroke> * var(--icon-stroke-scale, 1))`, so `icon-bold` on an ancestor or `weight="bold"` on
the icon switches every line in the glyph at once. Use bold beside semibold or bold text (titles, Badge,
section labels), regular beside regular and medium text. Never set `strokeWidth` on an instance.

## Sizes and colour

| Context | Size | Colour | Frame |
| --- | --- | --- | --- |
| Nav item, rail, command palette | 16px | `text-muted-foreground`, active `text-foreground` | bare |
| Inline in a button, badge or meta row | the control sets it | inherits | bare |
| Card, header, notification or alert icon | the chip sets it | chip tone | `IconChip` |
| Brand mark in a header | 22px | `text-foreground` | bare |

`IconChip` sizes `sm` 24 / `default` 32 / `lg` 40 / `xl` 48; tones neutral, primary, success, warning,
destructive, solid. One size per list. Chips are squircles, never circles (circles are avatars and status
dots). On an icon, `className` takes size, layout, a token colour, opacity and motion only, never a
stroke width or an off-grid pixel size. Inline icons align with the first line of text. Icons beside a
Button label take `data-icon="inline-start"` / `"inline-end"`; glyphs that point along the reading
direction take `rtl:-scale-x-100` (`polish.md` › Icons).

## Brand marks

Other products' logos (sign-in providers, integrations, agents, languages) use
`<BrandIcon icon={siGithub} />` from `@paneui/brand-icon`, with one named import per logo (never
`import *` or a lookup by slug). `color="brand"` where the logo is the content (a list of apps), the
default `current` in toolbars and nav. AI vendors the package leaves out (OpenAI, xAI) come from
`@/lib/brand-marks` (`markOpenai`, `markXai`), the vendor's published mark in the same shape; any other
missing brand gets a neutral icon from the set, never a redrawn mark. Models in a picker show their
vendor's mark.

## Not icons

Progress rings, chart geometry and sparklines, illustration artwork and animated checkmarks stay
hand-drawn SVG inside their components.
