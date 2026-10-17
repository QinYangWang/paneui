import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { Badge } from "@/registry/base-nova/ui/badge"

export const metadata = { title: "Changelog" }

type Entry = { id: string; date: string; title: string; tag?: string; changes: React.ReactNode[] }

/* Newest first. Summarised from the repository history; dates are commit dates. */
const ENTRIES: Entry[] = [
  {
    id: "2026-10-17-descenders-and-default-labels",
    date: "October 17, 2026",
    title: "Whole descenders and default labels that stay",
    tag: "Components",
    changes: [
      <>
        <TextLink href="/docs/og-image">OG Image</TextLink> titles and descriptions no longer cut off the bottom of g, y and
        p on their last line.
      </>,
      <>
        Passing <Code>{"aria-label={undefined}"}</Code> (or <Code>title</Code>, <Code>aria-labelledby</Code>) to a component
        keeps its default or translated label instead of removing it. A label you pass still wins.
      </>,
    ],
  },
  {
    id: "2026-10-17-share-cards-and-labels",
    date: "October 17, 2026",
    title: "Share cards, fitting tables and more translated labels",
    tag: "Components",
    changes: [
      <>
        <TextLink href="/docs/og-image">OG Image</TextLink> is a 1200 × 630 share card you render to PNG at build time. Its
        colours come from <Code>OG_IMAGE_TOKENS</Code>, generated from the theme for every accent in both modes.
      </>,
      <>
        <TextLink href="/docs/simple-table">Simple Table</TextLink> body cells keep their minimum width only on small
        screens, so short tables with many columns fit a reading column on desktop; empty cells never get one.{" "}
        <Code>cellMinWidth</Code> keeps the floor everywhere or removes it.
      </>,
      <>
        The outline, sidebar nav, command palette, theme toggle and cover art read their built-in text from{" "}
        <TextLink href="/docs/locale-provider">Locale Provider</TextLink>, in English and Simplified Chinese. Their props
        still win, and <Code>SidebarNavSection</Code> takes a <Code>toggleLabel</Code>.
      </>,
    ],
  },
  {
    id: "2026-10-17-tables-and-nav-icons",
    date: "October 17, 2026",
    title: "Table overflow, group icons and stable installs",
    tag: "Components",
    changes: [
      <>
        Inline code in <TextLink href="/docs/simple-table">Simple Table</TextLink> no longer breaks inside a word, and body
        text keeps a minimum width, so a narrow table scrolls sideways instead of squeezing its columns.
      </>,
      <>
        <Code>SidebarNavSection</Code> takes an <Code>icon</Code>. When rows or group labels beside each other mix icons
        and none, the ones without start at the icon rows&apos; text, and so do the rows inside those groups.
      </>,
      <>
        <Code>TabBarItem</Code> draws its focus ring around the icon pill and has no corners of its own, so it sits cleanly
        inside a rounded screen. The jump-to-latest button in <Code>MessageScroller</Code> and an expanded{" "}
        <Code>ExpandableControl</Code> hover to the accent&apos;s own hover colour.
      </>,
      <>
        Reinstalling items now writes the same files every time, in projects with or without Server Components: shipped
        files keep <Code>&quot;use client&quot;</Code> where they use client APIs, and files that don&apos;t, such as{" "}
        <Code>Label</Code>, <Code>Separator</Code> and <Code>Timeline</Code>, no longer have it.
      </>,
      <>
        The upgrade check with <Code>--fix</Code> checks again after fixing and lists only what is left.
      </>,
    ],
  },
  {
    id: "2026-10-17-docs-parts",
    date: "October 17, 2026",
    title: "Cover seeds, linked nav groups and Markdown tables",
    tag: "Components",
    changes: [
      <>
        <TextLink href="/docs/cover-art">Cover Art</TextLink> has eight compositions, and a <Code>seed</Code> now also sets a
        mirror, a tone offset and a pattern, so posts next to each other no longer share a cover. Seeded covers change once;{" "}
        <Code>variant</Code> <Code>0</Code> to <Code>3</Code> look as before. <Code>coverArtStyle(seed)</Code> returns
        everything a seed decides.
      </>,
      <>
        <Code>SidebarNavLink</Code> takes an <Code>icon</Code>. A <Code>SidebarNavSection</Code> label can be a link to the
        section&apos;s own page with <Code>href</Code> or <Code>labelRender</Code>, marked current with <Code>active</Code>; the
        chevron beside it still folds the rows.
      </>,
      <>
        <Code>SimpleTableHead</Code> and <Code>SimpleTableCell</Code> take the <Code>align</Code> values Markdown writes:{" "}
        <Code>left</Code>, <Code>center</Code> and <Code>right</Code> map to the start edge, the center and the end edge.
        Bare <Code>code</Code> in body cells gets the inline-code chip, so MDX tables map straight onto them.
      </>,
      <>
        The <Code>Outline</Code> divider above Back to top now fades in with the link instead of showing on its own.
      </>,
      <>
        <Code>ThreadListItem</Code> with <Code>actions</Code> sends <Code>className</Code>, <Code>id</Code>,{" "}
        <Code>style</Code> and <Code>data-*</Code> to the list item and the rest to the row button, and takes{" "}
        <Code>buttonProps</Code>. <Code>SettingsRowLink</Code> takes every anchor attribute, adds{" "}
        <Code>rel=&quot;noopener noreferrer&quot;</Code> to <Code>target=&quot;_blank&quot;</Code> links and shows an
        external icon with <Code>external</Code>.
      </>,
      <>
        Read-only checkboxes, such as task items in <Code>ResponseMarkdown</Code>, no longer show a pointer. The menu and
        command shortcuts no longer trip the design check in your project.
      </>,
      <>
        Theme 2.3: reinstalling the theme leaves your stylesheet unchanged, because it no longer ships{" "}
        <Code>@property</Code> rules. Run the upgrade check with <Code>--fix</Code> once to delete the old copies. The
        design skill and the upgrade check now land at the project root in projects with <Code>src/</Code>; move an
        earlier <Code>src/.agents</Code> copy up, or delete it and reinstall.
      </>,
    ],
  },
  {
    id: "2026-10-16-app-gaps",
    date: "October 16, 2026",
    title: "Tab bar, timeline, locales and agent fixes",
    tag: "Components",
    changes: [
      <>
        New items: <TextLink href="/docs/tab-bar">Tab Bar</TextLink> for phone navigation,{" "}
        <TextLink href="/docs/timeline">Timeline</TextLink> for schedules and{" "}
        <TextLink href="/docs/locale-provider">Locale Provider</TextLink>, which switches the built-in labels of overlays,
        fields, navigation and agent parts to another language at once. English stays the default; Chinese is built in.
      </>,
      <>
        <Code>ModelPicker</Code> and <Code>ComposerPicker</Code> take <Code>searchable</Code> and <Code>maxPerGroup</Code>{" "}
        for long model lists, and every option carries <Code>data-value</Code>. <Code>AgentComposer</Code> hides its attach
        button without <Code>onAttach</Code> and takes <Code>labels</Code> and <Code>inputProps</Code>.
      </>,
      <>
        <Code>ThreadListItem</Code> takes <Code>description</Code>, <Code>meta</Code> and <Code>actions</Code>; actions sit
        outside the row button, so a row menu no longer nests a button in a button. <Code>SettingsRow</Code> takes{" "}
        <Code>interactive</Code> and <Code>detail</Code>, and <Code>SettingsRowLink</Code> renders a link row.
      </>,
      <>
        <Code>WorkSummaryStep</Code> can fold its output with <Code>collapsible</Code>, and{" "}
        <Code>WorkSummaryThought</Code> shows the model&apos;s thinking. <Code>ResponseMarkdown</Code> keeps a numbered
        list&apos;s first number, links bare URLs and shows task items with a checkbox. <Code>CodeHighlight</Code> loads only
        its seven grammars, each on first use.
      </>,
      <>
        The design check no longer crashes when TypeScript 7 is installed; it falls back to its line checks.
      </>,
    ],
  },
  {
    id: "2026-10-16-docs-from-the-library",
    date: "October 16, 2026",
    title: "Docs built from the library, five docs layouts",
    tag: "Components",
    changes: [
      <>
        New items: <TextLink href="/docs/outline">Outline</TextLink> (the On this page rail and its popover),{" "}
        <TextLink href="/docs/sidebar-nav">Sidebar Nav</TextLink>, <TextLink href="/docs/simple-table">Simple Table</TextLink> and{" "}
        <TextLink href="/docs/cover-art">Cover Art</TextLink>. The docs site, the docs template and the blog template now use them
        instead of their own copies.
      </>,
      <>
        <Code>Card</Code> takes <Code>render</Code> and <Code>interactive</Code> for cards that are one link,{" "}
        <Code>NavigationMenuLink</Code> has a <Code>tab</Code> variant for header sections, and <Code>PageHeader</Code> has{" "}
        <Code>size=&quot;lg&quot;</Code> for reading pages.
      </>,
      <>
        The <TextLink href="/docs/docs">Docs Site</TextLink> template takes a <Code>layout</Code>: classic, notebook, flux, spacious or
        home. Each one has a preview on its page.
      </>,
      <>
        The Markdown copy of each guide page reads cleanly: interactive previews become a short note, link tiles a list, and
        tables keep only the columns with text.
      </>,
    ],
  },
  {
    id: "2026-10-16-docs-pages",
    date: "October 16, 2026",
    title: "Docs pages you can copy, share and follow",
    tag: "Docs",
    changes: [
      <>
        Every docs page has a Markdown copy at the same address with <Code>.md</Code>, for example{" "}
        <Code>/docs/button.md</Code>. Copy page next to the title copies it; its menu opens it, hands it to a chat
        assistant or copies the page link. <Code>llms.txt</Code> links to these files.
      </>,
      <>
        The outline&apos;s line steps in for nested entries and back out, and the stretch beside the current section
        slides as you read. On narrow screens and template pages it folds into an On this page button above the content.
      </>,
      <>
        Hover a heading to copy a link to it. The section name sits above each title, and each page ends with the
        previous and next page in sidebar order and the date its sources last changed.
      </>,
    ],
  },
  {
    id: "2026-10-16-rtl-examples",
    date: "October 16, 2026",
    title: "Right-to-left examples and a calmer preview toolbar",
    tag: "Docs",
    changes: [
      <>
        Twenty component pages end their examples with an RTL one in Arabic, among them{" "}
        <TextLink href="/docs/select">Select</TextLink>, <TextLink href="/docs/menu">Menu</TextLink>,{" "}
        <TextLink href="/docs/tabs">Tabs</TextLink> and <TextLink href="/docs/animated-sidebar">Animated Sidebar</TextLink>.
        The toolbar&apos;s RTL toggle and control-size switch are gone.
      </>,
      <>
        Popups, dialogs, drawers and toasts carry the <Code>DirectionProvider</Code> direction into their portal, so
        they read right to left with the page. Toasts stack at the bottom left and swipe out to the left.
      </>,
      <>
        Fixed in right-to-left: switch thumbs, slider ticks, carousel arrows and keys, calendar arrow keys, the
        chevrons in breadcrumbs, pagination and submenus, and the padding of select, combobox, multi-select, menu,
        dialog, drawer and sidebar parts. Submenus open toward the end side, and shortcut keys keep their order.
      </>,
      <>
        The viewport switch is an icon tab list that matches Preview / Code. New <Code>TabletIcon</Code> and{" "}
        <Code>MaximizeIcon</Code> in every icon style; a tab whose only child is an icon is square.
      </>,
      <>
        The page outline stays inside the window on long pages: its list scrolls on its own, keeps the current
        section in view, and shows long titles in full on hover. Back to top appears once you scroll.
      </>,
    ],
  },
  {
    id: "2026-10-16-design-skill",
    date: "October 16, 2026",
    title: "A design skill for coding agents",
    tag: "Docs",
    changes: [
      <>
        The <TextLink href="/docs/skill">design skill</TextLink> collects the library&apos;s rules in one place, each with
        a recommended and an avoid example. Install it with <Code>npx skills add QinYangWang/ui --skill qinyang-design</Code>{" "}
        or as the <Code>design-skill</Code> registry item.
      </>,
      <>
        It ships a check that runs without dependencies and reports broken rules before you commit, plus a console
        snippet for nested corners as rendered.
      </>,
      <>
        Fixes the check found here: menu labels outside their groups, press scale on two controls, tight tracking on
        small headings, five descriptions over 12 words. Template parts no longer share a name with an item: the blog
        avatar is <Code>parts/author-avatar.tsx</Code> and the editor buffers are <Code>parts/buffers.ts</Code>.
      </>,
      <>
        Code on the guide and component pages is highlighted when the site builds; Customize highlights its CSS as you
        change it.
      </>,
    ],
  },
  {
    id: "2026-10-16-radius-cap",
    date: "October 16, 2026",
    title: "Radius stops at 16px",
    tag: "Theme",
    changes: [
      <>
        Theme 2.2: no radius token goes past 16px, and the custom radius on{" "}
        <TextLink href="/docs/colors#radius">Customize</TextLink> goes up to 1rem. Above that, controls turned into pills
        and nested parts drifted off their containers. <Code>rounded-4xl</Code> and <Code>rounded-5xl</Code> stay as names
        at the cap.
      </>,
      <>
        Multi-select chips line up with the field&apos;s corners at every radius; they were 2px too square. Message
        bubbles, the bottom sheet and the card folder follow the same cap.
      </>,
      <>
        The docs and blog templates show code with <TextLink href="/docs/code-block">Code Block</TextLink> instead of
        highlighting it in the browser, and the SaaS customer drawer uses settings rows for its details and invoices.
      </>,
    ],
  },
  {
    id: "2026-10-16-templates",
    date: "October 16, 2026",
    title: "Brand icons, an upgrade path and refreshed templates",
    tag: "Templates",
    changes: [
      <>
        New <TextLink href="/docs/brand-icon">Brand Icon</TextLink> draws third-party logos at the icon set&apos;s sizes, in
        the text colour or the brand&apos;s own. Import logos one at a time so only those reach the bundle.
      </>,
      <>
        Theme 2.1: the wide-gamut colours and the layered popover shadow now take effect after install. Reinstall{" "}
        <Code>theme</Code> with <Code>--overwrite</Code>, then run the new <Code>upgrade-check</Code> to clean up what
        earlier versions left behind. Steps and a migration list are on{" "}
        <TextLink href="/docs/cli#upgrading">CLI &amp; registry</TextLink>.
      </>,
      <>
        The SaaS dashboard runs on <Code>AppShell</Code>, with the workspace menu, breadcrumb, search and theme in the
        header band, and gains an Integrations page. Settings is one sidebar link; its sections stay in the page&apos;s own
        nav. Sign-in offers GitHub and Google.
      </>,
      <>
        Date pickers print the same text on the server and in the browser, which fixes a hydration error on pages that
        render one (the analytics dashboard among them) and the dark and radius settings it reset.
      </>,
      <>
        Templates use the library for scroll areas, keys, alerts and the three-way theme toggle, and drop leftover
        translucent colours for the <Code>-subtle</Code> tokens.
      </>,
    ],
  },
  {
    id: "2026-10-16-charts",
    date: "October 16, 2026",
    title: "Chart colours match the theme",
    tag: "Theme",
    changes: [
      <>
        <Code>--chart-1</Code> to <Code>--chart-8</Code> now come from the same colour scales as the UI: blue,
        orange, violet, green, pink, amber, cyan and gray, with wide-gamut values. Reinstall <Code>theme</Code> to
        pick them up; series that relied on a token number change hue.
      </>,
      <>Legend and tooltip swatches are round dots at every radius.</>,
    ],
  },
  {
    id: "2026-10-16-radius",
    date: "October 16, 2026",
    title: "Nested corners stay concentric after install",
    tag: "Theme",
    changes: [
      <>
        The <Code>theme</Code> item now ships <Code>frame-*</Code>, <Code>rounded-inner</Code>,{" "}
        <Code>rounded-inner-*</Code> and <Code>rounded-inner-or-*</Code>. Reinstall it so installed components keep
        their nested corners.
      </>,
      <>
        Icon rail items, tab strip tabs, the popover close button, the inline range slider and approval card details
        follow their container at every radius.
      </>,
    ],
  },
  {
    id: "2026-10-16-foundation",
    date: "October 16, 2026",
    title: "New foundation: Inter, alpha greys, four shadows and a tighter radius",
    tag: "Theme",
    changes: [
      <>
        UI text is set in Inter with a Chinese fallback, code in JetBrains Mono and reading prose in Newsreader. Install{" "}
        <Code>fonts</Code> to self-host them; without it the theme uses system fonts.
      </>,
      <>
        Text, fills and borders are translucent greys, so they read the same on any surface. New tokens cover tertiary
        text, sunken and standout surfaces and subtle and strong borders, and the accent and each state colour gain{" "}
        <Code>-hover</Code>, <Code>-subtle</Code> and <Code>-border</Code> variants.
      </>,
      <>
        The accent is eight role variables instead of a ramp. Presets and custom colours on{" "}
        <TextLink href="/docs/colors">Customize</TextLink> swap all eight; a custom colour saved before today resets to blue.
      </>,
      <>
        <Code>--radius</Code> is now 0.5rem, so controls are 8px, cards 10px and dialogs 16px. New{" "}
        <Code>rounded-4xl</Code> and <Code>rounded-5xl</Code>.
      </>,
      <>
        <Code>shadow-xs</Code> to <Code>shadow-xl</Code> read four shadow levels. Dialogs, drawers and sheets use the
        deepest one.
      </>,
    ],
  },
  {
    id: "2026-10-16-novon",
    date: "October 16, 2026",
    title: "Static code blocks, a system theme and prose in panels",
    tag: "Components",
    changes: [
      <>
        New <TextLink href="/docs/code-block">Code Block</TextLink> and <Code>CodeGroup</Code> for code highlighted at
        build time. Nothing is highlighted in the browser.
      </>,
      <>
        <Code>ThemeToggle</Code> takes <Code>modes=&quot;tri&quot;</Code> to cycle light, dark and system. The new{" "}
        <Code>useTheme()</Code> hook and <Code>getThemeScript()</Code> follow the OS while nothing is stored.
      </>,
      <>
        <Code>typeset</Code> on <Code>TabsPanel</Code>, <Code>AccordionPanel</Code>, <Code>CollapsiblePanel</Code>{" "}
        and <Code>CardContent</Code> styles their content as prose inside a <Code>typeset</Code> container.
      </>,
      <>
        New <TextLink href="/docs/theme-accents">Theme Accents</TextLink> switches every accent preset with{" "}
        <Code>data-accent</Code>, and the hidden <Code>theme-radii</Code> does the same for <Code>data-radius</Code>.
      </>,
      <>
        <Code>FileTreeFolder</Code> and <Code>FileTreeFile</Code> no longer need a <Code>value</Code>; it defaults to
        the node&apos;s path.
      </>,
    ],
  },
  {
    id: "2026-10-16-components",
    date: "October 16, 2026",
    title: "Radius control, 16 new components and a new docs layout",
    tag: "Components",
    changes: [
      <>
        Every radius follows <Code>--radius</Code>. Pick a preset or a custom value on{" "}
        <TextLink href="/docs/colors">Customize</TextLink>, copy the CSS, or install a <Code>theme-radius-*</Code> item.
        Nested frames stay concentric at every value.
      </>,
      <>
        New <Code>alert-dialog</Code>, <Code>command</Code>, <Code>calendar</Code>, <Code>date-picker</Code>,{" "}
        <Code>progress</Code>, <Code>skeleton</Code>, <Code>separator</Code>, <Code>kbd</Code>, <Code>input-otp</Code>,{" "}
        <Code>input-group</Code>, <Code>button-group</Code>, <Code>native-select</Code>, <Code>menubar</Code>,{" "}
        <Code>navigation-menu</Code>, <Code>carousel</Code> and <Code>hover-card</Code>.
      </>,
      <>
        The docs have a single header and a text sidebar with collapsible sections, counts and a page outline. The
        logo is now a capital Q.
      </>,
      <>
        Component previews switch between device widths and open in a new tab.
      </>,
    ],
  },
  {
    id: "2026-10-15-sizes",
    date: "October 15, 2026",
    title: "Sizes and variants across form and display components",
    tag: "Components",
    changes: [
      <>
        Form controls take the Button size scale (<Code>xs</Code>, <Code>sm</Code>, <Code>default</Code>,{" "}
        <Code>lg</Code>), so a field and the button beside it line up at every size.
      </>,
      <>
        <Code>size</Code> on <Code>Field</Code> sizes the label and the control inside. <Code>size</Code> on{" "}
        <Code>Select</Code>, <Code>Combobox</Code> and <Code>MultiSelect</Code> sizes the trigger and its rows together.
      </>,
      <>
        New <Code>underline</Code> variant for tabs, <Code>outline</Code> and <Code>ghost</Code> cards, a{" "}
        <Code>lg</Code> card, and a small alert.
      </>,
      <>
        Checkbox, radio, switch, slider, pagination and breadcrumb take a <Code>size</Code>. Every default looks the same
        as before.
      </>,
    ],
  },
  {
    id: "2026-10-15-desktop",
    date: "October 15, 2026",
    title: "Code editor on the desktop",
    tag: "Templates",
    changes: [
      <>
        New desktop example in <Code>apps/desktop</Code> runs the <Code>vscode</Code> template in a native window, on
        folders from disk with real shells.
      </>,
      <>
        <Code>VsCodeApp</Code> takes an optional <Code>host</Code> for folders on disk, terminals, a native menu and a
        draggable title bar.
      </>,
    ],
  },
  {
    id: "2026-10-15-terminal",
    date: "October 15, 2026",
    title: "Terminal and a code editor template",
    tag: "Templates",
    changes: [
      <>
        New <Code>terminal</Code> runs a shell in the page, or a real one on your machine through the bundled bridge.
      </>,
      <>
        New <Code>vscode</Code> template: an editor, file explorer and terminals on one shared workspace.
      </>,
    ],
  },
  {
    id: "2026-10-15-scroll-area",
    date: "October 15, 2026",
    title: "Scroll area, smoother loaders and a compact tool approval",
    tag: "Components",
    changes: [
      <>
        New <Code>scroll-area</Code> keeps thin scrollbars inside rounded frames. Table, code block, pull to refresh,
        smooth scroll and scroll progress use it.
      </>,
      <>Loader runs on CSS keyframes and loops without a jump. Text shimmer has a brighter band.</>,
      <>Tool approval is a single request row that folds into a result line.</>,
      <>Data table and availability scheduler lay out by their own width.</>,
    ],
  },
  {
    id: "2026-10-15-app-shell",
    date: "October 15, 2026",
    title: "App shell, overflow hints and real block drag",
    tag: "Components",
    changes: [
      <>
        New <Code>app-shell</Code>: header, rail sidebar and inset panel on one grid, with the toggle centred on the rail
        icons. The docs site runs on it.
      </>,
      <>
        New <Code>overflow-hint</Code> shows the full text of a truncated label in a hover card you can select and copy.
        Tab strip titles use it, and the last tab keeps its border.
      </>,
      <>Block editor drag works with mouse and touch, with a drop line, Move up and Move down, and keyboard moves.</>,
      <>Avatar generator lays out by its own width. Agent activity&rsquo;s live ring is no longer clipped.</>,
      <>Inline code no longer breaks after a hyphen, and <Code>shadow-surface</Code> sits lower.</>,
    ],
  },
  {
    id: "2026-10-15-typeset-copy",
    date: "October 15, 2026",
    title: "Typeset and shorter copy",
    tag: "Docs",
    changes: [
      <>
        New <Code>typeset</Code> item for long-form text, with <Code>typeset-docs</Code>, <Code>typeset-reading</Code>{" "}
        and <Code>typeset-chat</Code> presets. It replaces <Code>prose-qy</Code>, and streamed responses, the blog and the
        docs template now use it.
      </>,
      <>Gallery cards show the name and the preview only.</>,
      <>Every description, example intro and note was rewritten to the copy-density rules in AGENTS.md.</>,
    ],
  },
  {
    id: "2026-10-15-file-tree-icons",
    date: "October 15, 2026",
    title: "File tree: chevrons for folders, type icons for files",
    tag: "File tree",
    changes: [
      <>
        Folders show only their chevron; files show a file-type icon picked and tinted by extension. Both sit in the same
        16px slot, so at each level chevrons and file icons line up. <Code>getFileKind(name)</Code> is exported, and the
        default <Code>indent</Code> is now 12px.
      </>,
      <>Redrawn <Code>CarIcon</Code> (side view), <Code>HighlighterIcon</Code> (chisel marker with a stroke) and <Code>SendIcon</Code> (points right).</>,
    ],
  },
  {
    id: "2026-10-15-rounded-icons",
    date: "October 15, 2026",
    title: "Rounded icons are the new default",
    tag: "Icons",
    changes: [
      <>
        <Code>icons</Code> is now a hand-drawn rounded set: the same 136 names and props, outline glyphs on a 24×24 grid
        with 1.75px round strokes, soft corners and shapes that fill the box, so they read larger at the same size.
      </>,
      <>
        The previous filled style moved to <Code>icons-puffy</Code>; <Code>icons-outline</Code> is unchanged. Switch with{" "}
        <Code>add …/r/icons-puffy.json --overwrite</Code>, back with <Code>add …/r/icons.json --overwrite</Code>. The Icons
        page toggle has Rounded / Puffy / Outline.
      </>,
      <>
        <Code>ThemeToggle</Code> has <Code>variant=&quot;ghost&quot;</Code>, a 28px toolbar button; the docs header uses it.
      </>,
    ],
  },
  {
    id: "2026-10-15-outline-icons",
    date: "October 15, 2026",
    title: "Outline icon style",
    tag: "Icons",
    changes: [
      <>
        The icon set ships in an outline style as <Code>icons-outline</Code>: the same 136 names, props and 18×18 grid,
        with filled shapes drawn as 1.6px round outlines and tiny dots kept solid. It installs to{" "}
        <Code>components/icons.tsx</Code> like the puffy set, so <Code>add …/r/icons-outline.json --overwrite</Code>{" "}
        switches every component and <Code>add …/r/icons.json --overwrite</Code> switches back. See{" "}
        <TextLink href="/docs/icons#icon-styles">Icons</TextLink> and{" "}
        <TextLink href="/docs/cli#icon-style">CLI &amp; registry</TextLink>.
      </>,
      <>
        The Icons page has a Puffy / Outline toggle that previews the whole grid in either style.
      </>,
    ],
  },
  {
    id: "2026-10-15-mobile",
    date: "October 15, 2026",
    title: "Agent workspace and Colors on phones",
    tag: "Mobile",
    changes: [
      <>
        <Code>agent-workspace</Code> has a phone layout below <Code>md</Code>: a header with the scrolling thread tabs, the
        rail and threads in a drawer, terminal / explorer / browser in a bottom sheet and one full-width chat (split chats
        are desktop only). On tablets it opens with the dock collapsed.
      </>,
      <>
        <TextLink href="/docs/icon-rail">icon-rail</TextLink> gains <Code>orientation=&quot;horizontal&quot;</Code>;{" "}
        <TextLink href="/docs/tab-strip">tab-strip</TextLink> scrolls instead of reordering on touch screens, with larger
        targets; the mode and effort pickers show only their glyph in a composer narrower than 28rem;{" "}
        <TextLink href="/docs/edited-files-card">edited-files-card</TextLink> no longer overlaps its buttons when narrow.
      </>,
      <>
        On phones the Colors token tables and every API reference table become stacked lists, so nothing scrolls the page
        sideways.
      </>,
    ],
  },
  {
    id: "2026-10-15-templates",
    date: "October 15, 2026",
    title: "SaaS and agent workspace templates, block and email editors",
    tag: "Templates",
    changes: [
      <>
        One-command templates: <Code>shadcn init -d -n my-app &lt;url&gt;</Code> creates a Next.js app with the theme, every
        component and the routes in place, with no <Code>components.json</Code> setup (published items reference their
        dependencies by URL). See <TextLink href="/docs/cli#templates">CLI &amp; registry</TextLink>.
      </>,
      <>
        <Code>saas</Code> replaces the Landing Page and SaaS Dashboard templates: marketing home, pricing and changelog,
        login, sign-up, password reset and email code with mock auth, a dashboard with overview, analytics and a customers
        table, settings (profile, account, billing, team, notifications, appearance) and a 404.
      </>,
      <>
        <Code>agent-workspace</Code> is rebuilt as an Agent Client Protocol client: threads, tabs, split chat
        panes, terminal, file explorer, review diffs and an offline demo agent, plus a WebSocket bridge
        (<Code>server/acp-bridge.mjs</Code>) that runs Claude Code, Codex, Gemini CLI or any ACP agent.
      </>,
      <>
        <TextLink href="/docs/notion-editor">Block editor</TextLink> (slash menu, bubble menu, drag handles,
        callouts, toggles, tables, MDX import and export) and <TextLink href="/docs/email-editor">email editor</TextLink>{" "}
        (email blocks and variables, rendered to email-safe HTML).
      </>,
      <>
        28 new components the templates are built from: sparkline, trend-chart, bar-list, stat-card, empty-state,
        page-header, usage-meter, settings-section, field, password-input, segmented-control, accent-picker, pagination,
        workspace-switcher, user-menu, data-table, resizable, tab-strip, icon-rail, terminal-view, thread-list-item,
        work-summary, edited-files-card, model-picker, toggle-group, toolbar, menu-list and swatch-picker; the
        agent-composer block; a plain variant for signup-form and new options on file-diff and message-scroller.
      </>,
      <>
        The theme item now sets <Code>--color-primary</Code>, <Code>--color-ring</Code> and the dark primary and chart
        colours explicitly, so a fresh shadcn app no longer keeps its default dark primary.
      </>,
    ],
  },
  {
    id: "2026-10-14-native-desktop",
    date: "October 14, 2026",
    title: "Native desktop style, neutral primary and accent presets",
    tag: "Theme",
    changes: [
      <>
        New native desktop visual direction: system UI font on a 13px <Code>text-ui</Code> scale, translucent
        fills for secondary, muted and accent, 5–6% hairline borders, a 0.625rem radius with multiplier steps and an inset
        docs shell.
      </>,
      <>
        The primary colour is now neutral (near-black in light, near-white in dark). Five accent presets,{" "}
        <Code>theme-blue</Code>, <Code>theme-green</Code>, <Code>theme-orange</Code>, <Code>theme-rose</Code> and{" "}
        <Code>theme-violet</Code>, ship as registry items; see <TextLink href="/docs/theming#accent-presets">Theming</TextLink>.
      </>,
      <>Desktop density across controls: 32px buttons and inputs, 26px menu rows, no press scale on standard controls.</>,
      <>Docs: a Getting started section (Introduction, Installation, Theming, CLI &amp; registry, Changelog) and a components overview.</>,
    ],
  },
  {
    id: "2026-10-14-docs",
    date: "October 14, 2026",
    title: "Component pages, templates and lint rules",
    tag: "Docs",
    changes: [
      <>Every component page now has install tabs, usage, composition, examples and an API reference with an on-page TOC.</>,
      <>
        Five full-page templates: SaaS Dashboard, Agent Workspace, Landing Page, Docs Site and Personal Blog, plus the{" "}
        <Code>prose-qy</Code> long-form typography utility.
      </>,
      <>
        Design-system lint rules on <Code>@shadcn/lint</Code> and an AGENTS.md guide keep tokens, radii and motion
        consistent.
      </>,
      <>
        <Code>Card</Code> gained an inset variant with <Code>CardPanel</Code> for presented content, and{" "}
        <Code>IconChip</Code> became the frame for header icons.
      </>,
      <>37 showcase-only components and the dock were removed to keep the library focused on app UI.</>,
    ],
  },
  {
    id: "2026-10-13-library",
    date: "October 13, 2026",
    title: "The library grows: motion, agents, charts and blocks",
    tag: "Components",
    changes: [
      <>Forms, overlays and disclosure components, text and number motion, and selection controls.</>,
      <>Motion components: stateful and confirm buttons, action swaps, morphing surfaces, pickers, slider variants, scroll effects.</>,
      <>Navigation, virtualized tables, agent surfaces (messages, tool calls, diffs, plans), charts and composed blocks.</>,
      <>
        The docs site: live gallery, per-component pages, an animated-sidebar nav, a ⌘K command palette and a light / dark /
        system theme menu, published as a static export.
      </>,
    ],
  },
  {
    id: "2026-10-12-init",
    date: "October 12, 2026",
    title: "First release",
    tag: "Release",
    changes: [
      <>A shadcn registry (the base-nova style) with Tailwind CSS 4, the first core components and the puffy icon set.</>,
    ],
  },
]

export default function Changelog() {
  return (
    <GuidePage href="/docs/changelog" toc={ENTRIES.map((e) => ({ id: e.id, title: e.title }))}>
      {ENTRIES.map((e) => (
        <section key={e.id} className="flex flex-col gap-3">
          <div data-md-skip className="flex items-center gap-2 text-sm text-muted-foreground">
            <time>{e.date}</time>
            {e.tag && <Badge size="sm">{e.tag}</Badge>}
          </div>
          <GuideH2 id={e.id}>{e.title}</GuideH2>
          <p hidden data-md-only>
            <em>{e.tag ? `${e.date} · ${e.tag}` : e.date}</em>
          </p>
          <div className="typeset typeset-docs text-muted-foreground">
            <ul>
              {e.changes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </GuidePage>
  )
}
