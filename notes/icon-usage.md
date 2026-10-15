# Icon usage (qinyang/ui)

One system for every icon in the library and the docs site. Drawing rules for
new glyphs live at the top of `components/icons.tsx` (puffy 18x18 grid).

## Two families, never mixed in one group
- **Solid (puff)**: filled silhouettes traced with `puff`, knockouts via
  `fillRule="evenodd"` (Home, Bot, Settings, Inbox, CalendarDays, Navigation,
  Server, TerminalSquare, Shapes, QinyangLogo, Github…).
- **Line / ring**: open glyphs with `line` (chevrons, arrows, check, x, search)
  and outlined objects (Mail, Calendar, Info, Clock, Globe, Image, Monitor).
- A set of icons shown side by side (a nav list, a rail, a dock, a tab bar, a
  palette group, a feed of cards) uses **one family**. Navigation sets use the
  solid family: use `InboxIcon` instead of `MailIcon`, `CalendarDaysIcon`
  instead of `CalendarIcon`, `TerminalSquareIcon` instead of `TerminalIcon`.
- Line glyphs stay for controls: chevrons, close, add, search fields, toolbar
  buttons.

## Sizes and colour by context
| Context | Size | Colour | Frame |
| --- | --- | --- | --- |
| Nav item, sidebar rail, command palette, dock-style menus | 16px | `text-muted-foreground`; active/selected `text-foreground` | bare |
| Inline with text (buttons, badges, meta rows) | 14–16px (button sets it) | inherits | bare |
| Title / header / card / notification / alert icon | chip sets it | chip tone | `IconChip` |
| Brand mark in the docs header | 22px | `text-foreground` | bare |

## IconChip (`@qinyang/icon-chip`)
The only frame for title-level icons. Raised squircle, never a circle (circles
are for avatars and status dots).
- sizes: `sm` 24px r8 (icon 14) · `default` 32px r10 (icon 16) · `lg` 40px r12 (icon 20) · `xl` 48px r16 (icon 24)
- tones: `neutral` (secondary + `shadow-raised`, muted icon) · `primary` / `success` / `warning` / `destructive` (12–14% wash + hairline ring) · `solid` (filled primary + `shadow-primary`, for brand/hero marks)
- Within one list all chips use the same size; tone may carry status.

Used by: gallery category headings, alert, tool-approval, tool-result,
notification-stack, approval-card, project-folder dialog, preview-rail,
chat-app empty state, animated-sidebar / tilt-card / parallax / scroll-reveal demos.

## Not icons (left as hand-drawn SVG on purpose)
Progress rings (attachment-upload, dynamic-island, pull-to-refresh,
scroll-progress), chart geometry and sparklines (prediction-market-card,
knockout-wheel, *-chart), the image-generation demo artwork, the animated
dotted chevron of expanding-arrow-button, and the pathLength-animated checks of
checkbox / otp-input / animated-badge (these share CheckIcon's path and round
caps; checkbox/otp use a 2px stroke because they sit on a filled box).

## Brand
- `QinyangLogoIcon`: soft rounded square with a "q" knocked out. Docs header,
  mobile drawer title, favicon (`app/icon.svg`, same path, light/dark aware).
- `GithubIcon`: simplified puffy octocat silhouette, used for the repo link.

## Outline variant
The set ships in a second style, outline (`@qinyang/icons-outline`), with the same
exports, `IconProps` and `Icon` wrapper. Both registry items target
`components/icons.tsx`, so `shadcn add <site>/r/icons-outline.json --overwrite`
switches a project and `.../icons.json --overwrite` switches back.

- **Single source**: `components/icons.tsx` (puffy) is the only hand-drawn file.
  `scripts/gen-icon-styles.mjs` (`pnpm icons:gen`, also the first step of
  `pnpm registry:build`) copies it into
  `registry/base-nova/icons/outline/icons.tsx` and redefines `puff` as an outline
  contour (fill none, 1.6 stroke, round caps and joins, the same as `line`), so
  every filled shape becomes its own outline on the same geometry. Never edit the
  generated file; `node scripts/gen-icon-styles.mjs --check` fails when it is
  stale.
- **Override map**: `scripts/icon-outline-overrides.mjs` maps an export name to
  the JSX inside `<Icon>` for icons whose automatic outline does not read: evenodd
  knockouts that would double up (Bot, Inbox, Server, TerminalSquare,
  ClipboardList, Palette, QinyangLogo, History, CalendarDays), shapes too narrow to
  keep an open middle (Chart, Pause, the thumbs cuffs, Sliders knobs) and tiny dots
  that stay filled (Grip, More, Cart wheels, CircleDot centre). Overrides may use
  `solid` (the filled puff) for dots of r ≤ ~0.6. The generator fails if an
  override names an icon that no longer exists.
- **Outline check for new icons**: whenever an icon is added or changed, render it in
  both styles (`node sheet.cjs out.png <filter> --compare`, see the icon skill for
  the bundling step) and look at 14px: min ~1.4px between strokes, holes still
  open, weight matching the other outline icons. Add an override when it fails.
- **Adding components later**: items depend on `icons`, so the CLI asks before
  overwriting an existing, different `components/icons.tsx` (default no; a
  non-interactive run stops at the prompt). `add … --overwrite` restores the
  puffy set; users re-run the outline command afterwards.
- Docs: `/docs/icons` previews both styles with a Puffy / Outline segmented
  control (`components/docs/icon-grid.tsx` imports both files).
