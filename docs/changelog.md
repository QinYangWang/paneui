# Changelog

Page: https://paneui.dev/docs/changelog/

Updates to paneui.

## Share images for Next.js routes

_October 19, 2026 · Components_

- [OG Image](https://paneui.dev/docs/og-image/) renders straight from an `opengraph-image.tsx` route with `ImageResponse`. It exports `ogImageSize` and `ogImageContentType` for the route's `size` and `contentType`, and has a new look: title at the bottom, an optional URL, a faint grid or dot backdrop and an accent glow.
- `@paneui/og-image-route` adds `app/opengraph-image.tsx` and `app/twitter-image.tsx`; `@paneui/og-image-post-route` adds a per-post image under `app/blog/[slug]`. The docs site draws its own share image the same way and writes it to `/og.png`, so static hosts serve it as an image; the OG Image notes show how.
- New: `OgCoverArt`, the [Cover Art](https://paneui.dev/docs/cover-art/) compositions drawn for share images. A slug picks the same art in both. The file now installs as a ui component, at `components/ui/og-image.tsx`.

## Sidebar-first App Shell, one border colour

_October 19, 2026 · Components_

- [App Shell](https://paneui.dev/docs/app-shell/) leads with a full-height sidebar: a team switcher (`AppShellSwitcher`) on top, folding groups, projects and the user menu at the foot, and the panel's own header (`AppShellInsetHeader`) with the trigger, a divider and a breadcrumb. Add `AppShellHeader` for the header-first layout, now its own example.
- The sidebar's edge line no longer runs past the inset panel's rounded corners, and the floating rail's icons sit on the trigger's column again (they were 3px off). The panel header's divider is centred.
- Outline buttons, cards, select and combobox triggers, fields, tab lists and dividers share one edge colour, `--border` (gray a4) at 1px, in light and dark. `--input` now equals it.
- [Edited Files Card](https://paneui.dev/docs/edited-files-card/): Undo, Review and the toggle follow the card's corner, and so does a closed last file row.

## Vendor logos in the model picker, sparkline gaps

_October 19, 2026 · Components_

- [Model Picker](https://paneui.dev/docs/model-picker/): model and effort rows show the name only. A `description` still type-checks and shows with `showDescriptions`. The examples and the agent templates show each model's vendor logo; OpenAI and xAI marks ship in `lib/brand-marks.ts` with [Brand Icon](https://paneui.dev/docs/brand-icon/).
- [Sparkline](https://paneui.dev/docs/sparkline/) takes missing points (`null`). `gap` bridges them with a faint dashed line (default), breaks the line or plots zero. An empty or one-point series draws a flat dashed baseline. The line no longer breaks into dashes when the chart is stretched.
- Removed: 404 Terminal. The SaaS template's 404 page uses Empty State.

## iOS Zoom Lock

_October 18, 2026 · Components_

- New: [iOS Zoom Lock](https://paneui.dev/docs/ios-zoom-lock/). Mount it once and iOS stops zooming into a focused field, while pinch zoom keeps working. It's opt-in; nothing mounts it for you.
- The [Input](https://paneui.dev/docs/input/) and [Textarea](https://paneui.dev/docs/textarea/) notes now recommend it for phone forms. `max-md:text-base` still works when you'd rather have 16px text on phones.

## Phone fixes for fields, the outline and the arrow button

_October 18, 2026 · Components_

- [Input](https://paneui.dev/docs/input/), [Textarea](https://paneui.dev/docs/textarea/), Input Group, Combobox, Command, Multi Select and Native Select keep the control text size on phones too; they no longer step up to 16px under 768px. Add `max-md:text-base` to a field where the browser's focus zoom matters more than density.
- [Outline](https://paneui.dev/docs/outline/) no longer flickers between sections while the page scrolls. A heading has to be clearly past the line before the section changes, and a clicked entry holds while the page scrolls to it.
- The shadow swatches on [Theme](https://paneui.dev/docs/theme/) and the accent role strip on [Customize](https://paneui.dev/docs/colors/) keep every label whole and centred on a phone.

## App shell layouts and smaller fixes

_October 18, 2026 · Components_

- [App Shell](https://paneui.dev/docs/app-shell/) takes `layout`: `inset` (the default, unchanged), `sidebar` for a flush shell with hairlines, and `floating` for a rail on its own panel. Leave out `AppShellSidebar` for a header-only shell.
- [Accordion](https://paneui.dev/docs/accordion/) icon chips follow the row's corner instead of sitting round inside it.
- [Agent Code Block](https://paneui.dev/docs/agent-code-block/) `wrap` now wraps long lines; before, the block still scrolled sideways.
- The SaaS dashboard header shows the workspace mark beside its name.

## Icon stroke that matches the text, and filled nav icons

_October 18, 2026 · Icons_

- Icons take `weight="bold"` for a 20% heavier stroke, or sit inside `icon-bold`. Badges, card, dialog, drawer and popover titles, page headers, empty states and settings sections use it so icons match semibold text. Buttons keep the regular stroke. Reinstall `@paneui/theme` for the utility; the upgrade check warns when it is missing.
- Home, Inbox, Chat, Calendar Days, Bell, User, Settings and Folder have filled versions in every icon style. [Tab Bar](https://paneui.dev/docs/tab-bar/) items take `activeIcon` to show one on the current tab.
- The [design skill](https://paneui.dev/docs/skill/) adds rules 41–43 (stroke weight, filled active glyphs, logical text alignment) and three checks: `icon-weight`, `nav-active-icon` and `text-align-logical`.

## Start and end alignment, and more translated labels

_October 18, 2026 · Components_

- Text aligned left or right now aligns to the start or end, so it flips in right-to-left. In [Table](https://paneui.dev/docs/table/), `align="left"` and `"right"` map to start and end.
- [Editable Table](https://paneui.dev/docs/table-editable/) column menus say Insert before and Insert after, and the insert marker sits on the correct side in right-to-left.
- Tool approval, edited files, file diff, AI sidebar, colour picker, chart and pagination summary labels come from the [locale provider](https://paneui.dev/docs/locale-provider/), in English and Simplified Chinese.

## Icons that point the right way in right-to-left

_October 17, 2026 · Components_

- Arrows, chevrons, send, undo, external-link and log-out icons flip in right-to-left across components, blocks, templates and examples. Disclosure chevrons still turn down when open.
- [Carousel](https://paneui.dev/docs/carousel/) dots sit further apart so each one is a full 24px target.
- The upgrade check warns when your theme is missing `media-outline`. Reinstall `@paneui/theme` to fix it.

## Polish rules, checks and examples in the design skill

_October 17, 2026 · Design skill_

- The [design skill](https://paneui.dev/docs/skill/) has eight new rules (33–40) for the details that make a screen feel finished, from target sizes to icon swaps and exits. Each comes with a Recommended and Avoid pair, shipped with the skill in `examples/`.
- The check gains 21 rules (run `--list`) and `--self-test`, which runs the examples. `scripts/polish-probe.js` checks hit areas, image edges, heading wrap and live numbers on the rendered page.
- The theme adds `media-outline`. Reinstall `@paneui/theme` to get it.
- Checkbox and radio reach a 24px target; carousel dots, tab and chip close buttons extend theirs without overlapping. Button trims 2px on the icon side at every size, using start and end padding so it holds in right-to-left.
- Icon swaps in the copy button, password reveal, theme toggle, overflow actions, status marks and slide action share one cross-fade, and springs that bounced now settle once.

## Whole descenders and default labels that stay

_October 17, 2026 · Components_

- [OG Image](https://paneui.dev/docs/og-image/) titles and descriptions no longer cut off the bottom of g, y and p on their last line.
- Passing `aria-label={undefined}` (or `title`, `aria-labelledby`) to a component keeps its default or translated label instead of removing it. A label you pass still wins.

## Share cards, fitting tables and more translated labels

_October 17, 2026 · Components_

- [OG Image](https://paneui.dev/docs/og-image/) is a 1200 × 630 share card you render to PNG at build time. Its colours come from `OG_IMAGE_TOKENS`, generated from the theme for every accent in both modes.
- [Simple Table](https://paneui.dev/docs/simple-table/) body cells keep their minimum width only on small screens, so short tables with many columns fit a reading column on desktop; empty cells never get one. `cellMinWidth` keeps the floor everywhere or removes it.
- The outline, sidebar nav, command palette, theme toggle and cover art read their built-in text from [Locale Provider](https://paneui.dev/docs/locale-provider/), in English and Simplified Chinese. Their props still win, and `SidebarNavSection` takes a `toggleLabel`.

## Table overflow, group icons and stable installs

_October 17, 2026 · Components_

- Inline code in [Simple Table](https://paneui.dev/docs/simple-table/) no longer breaks inside a word, and body text keeps a minimum width, so a narrow table scrolls sideways instead of squeezing its columns.
- `SidebarNavSection` takes an `icon`. When rows or group labels beside each other mix icons and none, the ones without start at the icon rows' text, and so do the rows inside those groups.
- `TabBarItem` draws its focus ring around the icon pill and has no corners of its own, so it sits cleanly inside a rounded screen. The jump-to-latest button in `MessageScroller` and an expanded `ExpandableControl` hover to the accent's own hover colour.
- Reinstalling items now writes the same files every time, in projects with or without Server Components: shipped files keep `"use client"` where they use client APIs, and files that don't, such as `Label`, `Separator` and `Timeline`, no longer have it.
- The upgrade check with `--fix` checks again after fixing and lists only what is left.

## Cover seeds, linked nav groups and Markdown tables

_October 17, 2026 · Components_

- [Cover Art](https://paneui.dev/docs/cover-art/) has eight compositions, and a `seed` now also sets a mirror, a tone offset and a pattern, so posts next to each other no longer share a cover. Seeded covers change once; `variant` `0` to `3` look as before. `coverArtStyle(seed)` returns everything a seed decides.
- `SidebarNavLink` takes an `icon`. A `SidebarNavSection` label can be a link to the section's own page with `href` or `labelRender`, marked current with `active`; the chevron beside it still folds the rows.
- `SimpleTableHead` and `SimpleTableCell` take the `align` values Markdown writes: `left`, `center` and `right` map to the start edge, the center and the end edge. Bare `code` in body cells gets the inline-code chip, so MDX tables map straight onto them.
- The `Outline` divider above Back to top now fades in with the link instead of showing on its own.
- `ThreadListItem` with `actions` sends `className`, `id`, `style` and `data-*` to the list item and the rest to the row button, and takes `buttonProps`. `SettingsRowLink` takes every anchor attribute, adds `rel="noopener noreferrer"` to `target="_blank"` links and shows an external icon with `external`.
- Read-only checkboxes, such as task items in `ResponseMarkdown`, no longer show a pointer. The menu and command shortcuts no longer trip the design check in your project.
- Theme 2.3: reinstalling the theme leaves your stylesheet unchanged, because it no longer ships `@property` rules. Run the upgrade check with `--fix` once to delete the old copies. The design skill and the upgrade check now land at the project root in projects with `src/`; move an earlier `src/.agents` copy up, or delete it and reinstall.

## Tab bar, timeline, locales and agent fixes

_October 16, 2026 · Components_

- New items: [Tab Bar](https://paneui.dev/docs/tab-bar/) for phone navigation, [Timeline](https://paneui.dev/docs/timeline/) for schedules and [Locale Provider](https://paneui.dev/docs/locale-provider/), which switches the built-in labels of overlays, fields, navigation and agent parts to another language at once. English stays the default; Chinese is built in.
- `ModelPicker` and `ComposerPicker` take `searchable` and `maxPerGroup` for long model lists, and every option carries `data-value`. `AgentComposer` hides its attach button without `onAttach` and takes `labels` and `inputProps`.
- `ThreadListItem` takes `description`, `meta` and `actions`; actions sit outside the row button, so a row menu no longer nests a button in a button. `SettingsRow` takes `interactive` and `detail`, and `SettingsRowLink` renders a link row.
- `WorkSummaryStep` can fold its output with `collapsible`, and `WorkSummaryThought` shows the model's thinking. `ResponseMarkdown` keeps a numbered list's first number, links bare URLs and shows task items with a checkbox. `CodeHighlight` loads only its seven grammars, each on first use.
- The design check no longer crashes when TypeScript 7 is installed; it falls back to its line checks.

## Docs built from the library, five docs layouts

_October 16, 2026 · Components_

- New items: [Outline](https://paneui.dev/docs/outline/) (the On this page rail and its popover), [Sidebar Nav](https://paneui.dev/docs/sidebar-nav/), [Simple Table](https://paneui.dev/docs/simple-table/) and [Cover Art](https://paneui.dev/docs/cover-art/). The docs site, the docs template and the blog template now use them instead of their own copies.
- `Card` takes `render` and `interactive` for cards that are one link, `NavigationMenuLink` has a `tab` variant for header sections, and `PageHeader` has `size="lg"` for reading pages.
- The [Docs Site](https://paneui.dev/docs/docs/) template takes a `layout`: classic, notebook, flux, spacious or home. Each one has a preview on its page.
- The Markdown copy of each guide page reads cleanly: interactive previews become a short note, link tiles a list, and tables keep only the columns with text.

## Docs pages you can copy, share and follow

_October 16, 2026 · Docs_

- Every docs page has a Markdown copy at the same address with `.md`, for example `/docs/button.md`. Copy page next to the title copies it; its menu opens it, hands it to a chat assistant or copies the page link. `llms.txt` links to these files.
- The outline's line steps in for nested entries and back out, and the stretch beside the current section slides as you read. On narrow screens and template pages it folds into an On this page button above the content.
- Hover a heading to copy a link to it. The section name sits above each title, and each page ends with the previous and next page in sidebar order and the date its sources last changed.

## Right-to-left examples and a calmer preview toolbar

_October 16, 2026 · Docs_

- Twenty component pages end their examples with an RTL one in Arabic, among them [Select](https://paneui.dev/docs/select/), [Menu](https://paneui.dev/docs/menu/), [Tabs](https://paneui.dev/docs/tabs/) and [Animated Sidebar](https://paneui.dev/docs/animated-sidebar/). The toolbar's RTL toggle and control-size switch are gone.
- Popups, dialogs, drawers and toasts carry the `DirectionProvider` direction into their portal, so they read right to left with the page. Toasts stack at the bottom left and swipe out to the left.
- Fixed in right-to-left: switch thumbs, slider ticks, carousel arrows and keys, calendar arrow keys, the chevrons in breadcrumbs, pagination and submenus, and the padding of select, combobox, multi-select, menu, dialog, drawer and sidebar parts. Submenus open toward the end side, and shortcut keys keep their order.
- The viewport switch is an icon tab list that matches Preview / Code. New `TabletIcon` and `MaximizeIcon` in every icon style; a tab whose only child is an icon is square.
- The page outline stays inside the window on long pages: its list scrolls on its own, keeps the current section in view, and shows long titles in full on hover. Back to top appears once you scroll.

## A design skill for coding agents

_October 16, 2026 · Docs_

- The [design skill](https://paneui.dev/docs/skill/) collects the library's rules in one place, each with a recommended and an avoid example. Install it with `npx skills add QinYangWang/ui --skill paneui-design` or as the `design-skill` registry item.
- It ships a check that runs without dependencies and reports broken rules before you commit, plus a console snippet for nested corners as rendered.
- Fixes the check found here: menu labels outside their groups, press scale on two controls, tight tracking on small headings, five descriptions over 12 words. Template parts no longer share a name with an item: the blog avatar is `parts/author-avatar.tsx` and the editor buffers are `parts/buffers.ts`.
- Code on the guide and component pages is highlighted when the site builds; Customize highlights its CSS as you change it.

## Radius stops at 16px

_October 16, 2026 · Theme_

- Theme 2.2: no radius token goes past 16px, and the custom radius on [Customize](https://paneui.dev/docs/colors/#radius) goes up to 1rem. Above that, controls turned into pills and nested parts drifted off their containers. `rounded-4xl` and `rounded-5xl` stay as names at the cap.
- Multi-select chips line up with the field's corners at every radius; they were 2px too square. Message bubbles, the bottom sheet and the card folder follow the same cap.
- The docs and blog templates show code with [Code Block](https://paneui.dev/docs/code-block/) instead of highlighting it in the browser, and the SaaS customer drawer uses settings rows for its details and invoices.

## Brand icons, an upgrade path and refreshed templates

_October 16, 2026 · Templates_

- New [Brand Icon](https://paneui.dev/docs/brand-icon/) draws third-party logos at the icon set's sizes, in the text colour or the brand's own. Import logos one at a time so only those reach the bundle.
- Theme 2.1: the wide-gamut colours and the layered popover shadow now take effect after install. Reinstall `theme` with `--overwrite`, then run the new `upgrade-check` to clean up what earlier versions left behind. Steps and a migration list are on [CLI & registry](https://paneui.dev/docs/cli/#upgrading).
- The SaaS dashboard runs on `AppShell`, with the workspace menu, breadcrumb, search and theme in the header band, and gains an Integrations page. Settings is one sidebar link; its sections stay in the page's own nav. Sign-in offers GitHub and Google.
- Date pickers print the same text on the server and in the browser, which fixes a hydration error on pages that render one (the analytics dashboard among them) and the dark and radius settings it reset.
- Templates use the library for scroll areas, keys, alerts and the three-way theme toggle, and drop leftover translucent colours for the `-subtle` tokens.

## Chart colours match the theme

_October 16, 2026 · Theme_

- `--chart-1` to `--chart-8` now come from the same colour scales as the UI: blue, orange, violet, green, pink, amber, cyan and gray, with wide-gamut values. Reinstall `theme` to pick them up; series that relied on a token number change hue.
- Legend and tooltip swatches are round dots at every radius.

## Nested corners stay concentric after install

_October 16, 2026 · Theme_

- The `theme` item now ships `frame-*`, `rounded-inner`, `rounded-inner-*` and `rounded-inner-or-*`. Reinstall it so installed components keep their nested corners.
- Icon rail items, tab strip tabs, the popover close button, the inline range slider and approval card details follow their container at every radius.

## New foundation: Inter, alpha greys, four shadows and a tighter radius

_October 16, 2026 · Theme_

- UI text is set in Inter with a Chinese fallback, code in JetBrains Mono and reading prose in Newsreader. Install `fonts` to self-host them; without it the theme uses system fonts.
- Text, fills and borders are translucent greys, so they read the same on any surface. New tokens cover tertiary text, sunken and standout surfaces and subtle and strong borders, and the accent and each state colour gain `-hover`, `-subtle` and `-border` variants.
- The accent is eight role variables instead of a ramp. Presets and custom colours on [Customize](https://paneui.dev/docs/colors/) swap all eight; a custom colour saved before today resets to blue.
- `--radius` is now 0.5rem, so controls are 8px, cards 10px and dialogs 16px. New `rounded-4xl` and `rounded-5xl`.
- `shadow-xs` to `shadow-xl` read four shadow levels. Dialogs, drawers and sheets use the deepest one.

## Static code blocks, a system theme and prose in panels

_October 16, 2026 · Components_

- New [Code Block](https://paneui.dev/docs/code-block/) and `CodeGroup` for code highlighted at build time. Nothing is highlighted in the browser.
- `ThemeToggle` takes `modes="tri"` to cycle light, dark and system. The new `useTheme()` hook and `getThemeScript()` follow the OS while nothing is stored.
- `typeset` on `TabsPanel`, `AccordionPanel`, `CollapsiblePanel` and `CardContent` styles their content as prose inside a `typeset` container.
- New [Theme Accents](https://paneui.dev/docs/theme-accents/) switches every accent preset with `data-accent`, and the hidden `theme-radii` does the same for `data-radius`.
- `FileTreeFolder` and `FileTreeFile` no longer need a `value`; it defaults to the node's path.

## Radius control, 16 new components and a new docs layout

_October 16, 2026 · Components_

- Every radius follows `--radius`. Pick a preset or a custom value on [Customize](https://paneui.dev/docs/colors/), copy the CSS, or install a `theme-radius-*` item. Nested frames stay concentric at every value.
- New `alert-dialog`, `command`, `calendar`, `date-picker`, `progress`, `skeleton`, `separator`, `kbd`, `input-otp`, `input-group`, `button-group`, `native-select`, `menubar`, `navigation-menu`, `carousel` and `hover-card`.
- The docs have a single header and a text sidebar with collapsible sections, counts and a page outline. The logo is now a capital Q.
- Component previews switch between device widths and open in a new tab.

## Sizes and variants across form and display components

_October 15, 2026 · Components_

- Form controls take the Button size scale (`xs`, `sm`, `default`, `lg`), so a field and the button beside it line up at every size.
- `size` on `Field` sizes the label and the control inside. `size` on `Select`, `Combobox` and `MultiSelect` sizes the trigger and its rows together.
- New `underline` variant for tabs, `outline` and `ghost` cards, a `lg` card, and a small alert.
- Checkbox, radio, switch, slider, pagination and breadcrumb take a `size`. Every default looks the same as before.

## Code editor on the desktop

_October 15, 2026 · Templates_

- New desktop example in `apps/desktop` runs the `vscode` template in a native window, on folders from disk with real shells.
- `VsCodeApp` takes an optional `host` for folders on disk, terminals, a native menu and a draggable title bar.

## Terminal and a code editor template

_October 15, 2026 · Templates_

- New `terminal` runs a shell in the page, or a real one on your machine through the bundled bridge.
- New `vscode` template: an editor, file explorer and terminals on one shared workspace.

## Scroll area, smoother loaders and a compact tool approval

_October 15, 2026 · Components_

- New `scroll-area` keeps thin scrollbars inside rounded frames. Table, code block, pull to refresh, smooth scroll and scroll progress use it.
- Loader runs on CSS keyframes and loops without a jump. Text shimmer has a brighter band.
- Tool approval is a single request row that folds into a result line.
- Data table and availability scheduler lay out by their own width.

## App shell, overflow hints and real block drag

_October 15, 2026 · Components_

- New `app-shell`: header, rail sidebar and inset panel on one grid, with the toggle centred on the rail icons. The docs site runs on it.
- New `overflow-hint` shows the full text of a truncated label in a hover card you can select and copy. Tab strip titles use it, and the last tab keeps its border.
- Block editor drag works with mouse and touch, with a drop line, Move up and Move down, and keyboard moves.
- Avatar generator lays out by its own width. Agent activity’s live ring is no longer clipped.
- Inline code no longer breaks after a hyphen, and `shadow-surface` sits lower.

## Typeset and shorter copy

_October 15, 2026 · Docs_

- New `typeset` item for long-form text, with `typeset-docs`, `typeset-reading` and `typeset-chat` presets. It replaces `prose-qy`, and streamed responses, the blog and the docs template now use it.
- Gallery cards show the name and the preview only.
- Every description, example intro and note was rewritten to the copy-density rules in AGENTS.md.

## File tree: chevrons for folders, type icons for files

_October 15, 2026 · File tree_

- Folders show only their chevron; files show a file-type icon picked and tinted by extension. Both sit in the same 16px slot, so at each level chevrons and file icons line up. `getFileKind(name)` is exported, and the default `indent` is now 12px.
- Redrawn `CarIcon` (side view), `HighlighterIcon` (chisel marker with a stroke) and `SendIcon` (points right).

## Rounded icons are the new default

_October 15, 2026 · Icons_

- `icons` is now a hand-drawn rounded set: the same 136 names and props, outline glyphs on a 24×24 grid with 1.75px round strokes, soft corners and shapes that fill the box, so they read larger at the same size.
- The previous filled style moved to `icons-puffy`; `icons-outline` is unchanged. Switch with `add …/r/icons-puffy.json --overwrite`, back with `add …/r/icons.json --overwrite`. The Icons page toggle has Rounded / Puffy / Outline.
- `ThemeToggle` has `variant="ghost"`, a 28px toolbar button; the docs header uses it.

## Outline icon style

_October 15, 2026 · Icons_

- The icon set ships in an outline style as `icons-outline`: the same 136 names, props and 18×18 grid, with filled shapes drawn as 1.6px round outlines and tiny dots kept solid. It installs to `components/icons.tsx` like the puffy set, so `add …/r/icons-outline.json --overwrite` switches every component and `add …/r/icons.json --overwrite` switches back. See [Icons](https://paneui.dev/docs/icons/#icon-styles) and [CLI & registry](https://paneui.dev/docs/cli/#icon-style).
- The Icons page has a Puffy / Outline toggle that previews the whole grid in either style.

## Agent workspace and Colors on phones

_October 15, 2026 · Mobile_

- `agent-workspace` has a phone layout below `md`: a header with the scrolling thread tabs, the rail and threads in a drawer, terminal / explorer / browser in a bottom sheet and one full-width chat (split chats are desktop only). On tablets it opens with the dock collapsed.
- [icon-rail](https://paneui.dev/docs/icon-rail/) gains `orientation="horizontal"`; [tab-strip](https://paneui.dev/docs/tab-strip/) scrolls instead of reordering on touch screens, with larger targets; the mode and effort pickers show only their glyph in a composer narrower than 28rem; [edited-files-card](https://paneui.dev/docs/edited-files-card/) no longer overlaps its buttons when narrow.
- On phones the Colors token tables and every API reference table become stacked lists, so nothing scrolls the page sideways.

## SaaS and agent workspace templates, block and email editors

_October 15, 2026 · Templates_

- One-command templates: `shadcn init -d -n my-app <url>` creates a Next.js app with the theme, every component and the routes in place, with no `components.json` setup (published items reference their dependencies by URL). See [CLI & registry](https://paneui.dev/docs/cli/#templates).
- `saas` replaces the Landing Page and SaaS Dashboard templates: marketing home, pricing and changelog, login, sign-up, password reset and email code with mock auth, a dashboard with overview, analytics and a customers table, settings (profile, account, billing, team, notifications, appearance) and a 404.
- `agent-workspace` is rebuilt as an Agent Client Protocol client: threads, tabs, split chat panes, terminal, file explorer, review diffs and an offline demo agent, plus a WebSocket bridge (`server/acp-bridge.mjs`) that runs Claude Code, Codex, Gemini CLI or any ACP agent.
- [Block editor](https://paneui.dev/docs/notion-editor/) (slash menu, bubble menu, drag handles, callouts, toggles, tables, MDX import and export) and [email editor](https://paneui.dev/docs/email-editor/) (email blocks and variables, rendered to email-safe HTML).
- 28 new components the templates are built from: sparkline, trend-chart, bar-list, stat-card, empty-state, page-header, usage-meter, settings-section, field, password-input, segmented-control, accent-picker, pagination, workspace-switcher, user-menu, data-table, resizable, tab-strip, icon-rail, terminal-view, thread-list-item, work-summary, edited-files-card, model-picker, toggle-group, toolbar, menu-list and swatch-picker; the agent-composer block; a plain variant for signup-form and new options on file-diff and message-scroller.
- The theme item now sets `--color-primary`, `--color-ring` and the dark primary and chart colours explicitly, so a fresh shadcn app no longer keeps its default dark primary.

## Native desktop style, neutral primary and accent presets

_October 14, 2026 · Theme_

- New native desktop visual direction: system UI font on a 13px `text-ui` scale, translucent fills for secondary, muted and accent, 5–6% hairline borders, a 0.625rem radius with multiplier steps and an inset docs shell.
- The primary colour is now neutral (near-black in light, near-white in dark). Five accent presets, `theme-blue`, `theme-green`, `theme-orange`, `theme-rose` and `theme-violet`, ship as registry items; see [Theming](https://paneui.dev/docs/theming/#accent-presets).
- Desktop density across controls: 32px buttons and inputs, 26px menu rows, no press scale on standard controls.
- Docs: a Getting started section (Introduction, Installation, Theming, CLI & registry, Changelog) and a components overview.

## Component pages, templates and lint rules

_October 14, 2026 · Docs_

- Every component page now has install tabs, usage, composition, examples and an API reference with an on-page TOC.
- Five full-page templates: SaaS Dashboard, Agent Workspace, Landing Page, Docs Site and Personal Blog, plus the `prose-qy` long-form typography utility.
- Design-system lint rules on `@shadcn/lint` and an AGENTS.md guide keep tokens, radii and motion consistent.
- `Card` gained an inset variant with `CardPanel` for presented content, and `IconChip` became the frame for header icons.
- 37 showcase-only components and the dock were removed to keep the library focused on app UI.

## The library grows: motion, agents, charts and blocks

_October 13, 2026 · Components_

- Forms, overlays and disclosure components, text and number motion, and selection controls.
- Motion components: stateful and confirm buttons, action swaps, morphing surfaces, pickers, slider variants, scroll effects.
- Navigation, virtualized tables, agent surfaces (messages, tool calls, diffs, plans), charts and composed blocks.
- The docs site: live gallery, per-component pages, an animated-sidebar nav, a ⌘K command palette and a light / dark / system theme menu, published as a static export.

## First release

_October 12, 2026 · Release_

- A shadcn registry (the base-nova style) with Tailwind CSS 4, the first core components and the puffy icon set.
