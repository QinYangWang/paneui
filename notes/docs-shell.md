# Docs shell (2026-10-16)

Decision: the docs chrome is one white surface split by hairlines, not an app shell with a grey
rail and an inset panel. The library's `shell` / `shell-inset` tokens stay for templates and apps;
the docs site no longer uses them.

- **Header**: `h-12`, `border-b`, sticky. The brand column is `lg:w-64`, the sidebar's width, and
  starts on the sidebar's content edge, so the mark, the sidebar search and the rows share one left line.
- **Tabs** (Docs, Components, Templates) mirror the sidebar's three sections. Active tab = foreground
  text plus a 2px bottom indicator, the same treatment as the sidebar's left indicator line.
- **Right side**: search field with the shortcut (icon-only under `sm`), GitHub, theme and accent controls.
- **Sidebar** (`components/docs/docs-nav.tsx`): search field at the top (opens the palette),
  collapsible sections with counts, category groups inside Components, `h-7` text-only rows
  (`text-ui`, no per-item icons), "New" badges and a sticky "What's new" footer from
  `components/docs/whats-new.ts`. Collapsed state persists in `localStorage["docs-nav-collapsed"]`.
  Below `lg` it opens in the left drawer.
  - **One left edge (round 15)**: no indent and no guide line. Section labels, group labels and rows
    all put their text on the same line (`px-2` inside the nav's `px-3`). Hierarchy comes from type
    and spacing instead: section labels `text-ui` semibold foreground, group labels `text-ui-sm`
    medium muted with a `mt-2` gap above, chevrons on the right for both. Active row = `bg-secondary`
    + a 2px bar in the gutter left of the row (`-start-2`), outside the fill.
- **Right TOC** (`doc-toc.tsx`) on docs and component pages from `xl`, with back to top.
- **Previews**: Desktop renders inline; Tablet (768), Mobile (390) and 1024 render `/preview?demo=…`
  or `?example=…` in an iframe so media and container queries react. The toolbar also sets the
  control size (`size=`) and direction (`dir=rtl`). `/preview` renders bare like `/templates/*`.

Why: the old rail and inset panel read as a second app inside the page, the header and rail used
different heights and paddings, and icon+label rows were too large for ~150 items.
