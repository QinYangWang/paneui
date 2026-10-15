/**
 * Outline redraws for icons whose automatic outline (puff traced as a contour) does not
 * read cleanly at 14px. Key = export name in registry/base-nova/icons/puffy/icons.tsx, value = the JSX that
 * goes inside <Icon>. Primitives available: `line`, `puff` (outline contour, same as
 * line) and `solid` (filled, for tiny dots). Same rules as the puffy set: 18x18 grid,
 * ~2.5px padding, path/circle/rect only, min gap between strokes ~1.4px.
 *
 * Every new icon in the puffy set needs an outline check: render the sheet with
 * `--outline` and add an entry here if the generated version looks wrong.
 */
export const outlineOverrides = {
  // Eyes were knockouts: keep them as solid dots inside the outlined head.
  BotIcon: `
    <path {...line} d="M9 3.4v2.2" />
    <path {...puff} d="M5.4 6.4h7.2c.9 0 1.6.7 1.6 1.6v4.4c0 .9-.7 1.6-1.6 1.6H5.4c-.9 0-1.6-.7-1.6-1.6V8c0-.9.7-1.6 1.6-1.6z" />
    <circle {...solid} cx="7.1" cy="10.2" r=".4" />
    <circle {...solid} cx="10.9" cy="10.2" r=".4" />
  `,
  // The inner panel would double the contour: outline + header line + one day dot.
  CalendarDaysIcon: `
    <path {...line} d="M6.4 3v1.6M11.6 3v1.6M3.6 7.9h10.8" />
    <path {...puff} d="M5.2 4.6h7.6a1.8 1.8 0 011.8 1.8v6.4a1.8 1.8 0 01-1.8 1.8H5.2a1.8 1.8 0 01-1.8-1.8V6.4a1.8 1.8 0 011.8-1.8z" />
    <circle {...solid} cx="7" cy="11.1" r=".45" />
  `,
  // Wheels are tiny dots: keep them solid.
  CartIcon: `
    <path {...line} d="M2.9 3.8h1.5l.5 1.6" />
    <path {...puff} d="M5.2 6.2h8.6c.4 0 .7.4.6.8l-.9 3.4c-.1.4-.5.7-.9.7H6.7c-.4 0-.8-.3-.9-.7z" />
    <circle {...solid} cx="7" cy="14" r=".6" />
    <circle {...solid} cx="12" cy="14" r=".6" />
  `,
  // Three outlined bars do not fit the grid: stroked bars on a baseline.
  ChartIcon: `
    <path {...line} d="M5.6 11.6V9.4M9 11.6V5M12.4 11.6V7.6M3.6 14.4h10.8" />
  `,
  CircleDotIcon: `
    <circle {...line} cx="9" cy="9" r="5.6" />
    <circle {...solid} cx="9" cy="9" r="1" />
  `,
  // Knocked-out rows become lines.
  ClipboardListIcon: `
    <path {...puff} d="M6 3.4h6c1 0 1.8.8 1.8 1.8v7.6c0 1-.8 1.8-1.8 1.8H6c-1 0-1.8-.8-1.8-1.8V5.2c0-1 .8-1.8 1.8-1.8z" />
    <path {...line} d="M7.2 7.2h3.6M7.2 10.8h3.6" />
  `,
  GripVerticalIcon: `
    <circle {...solid} cx="6.6" cy="4.4" r=".55" />
    <circle {...solid} cx="11.4" cy="4.4" r=".55" />
    <circle {...solid} cx="6.6" cy="9" r=".55" />
    <circle {...solid} cx="11.4" cy="9" r=".55" />
    <circle {...solid} cx="6.6" cy="13.6" r=".55" />
    <circle {...solid} cx="11.4" cy="13.6" r=".55" />
  `,
  // A solid dial with knocked-out hands: a rewinding arc with hands, so it stays distinct from Clock.
  HistoryIcon: `
    <path {...line} d="M3.8 9a5.4 5.4 0 105.4-5.4 5.8 5.8 0 00-4 1.6L3.8 6.6" />
    <path {...line} d="M3.8 3.8v2.8h2.8M9.2 6.4V9l2 1.2" />
  `,
  // The knocked-out tray becomes a tray line.
  InboxIcon: `
    <path {...puff} d="M5.2 3.6h7.6a1.8 1.8 0 011.8 1.8v7.2a1.8 1.8 0 01-1.8 1.8H5.2a1.8 1.8 0 01-1.8-1.8V5.4a1.8 1.8 0 011.8-1.8z" />
    <path {...line} d="M3.6 10.4h2.7l.7 1.7h4l.7-1.7h2.7" />
  `,
  MoreHorizontalIcon: `
    <circle {...solid} cx="4.4" cy="9" r=".55" />
    <circle {...solid} cx="9" cy="9" r=".55" />
    <circle {...solid} cx="13.6" cy="9" r=".55" />
  `,
  MoreVerticalIcon: `
    <circle {...solid} cx="9" cy="4.4" r=".55" />
    <circle {...solid} cx="9" cy="9" r=".55" />
    <circle {...solid} cx="9" cy="13.6" r=".55" />
  `,
  // Paint wells were knockouts: solid dots inside the outlined palette.
  PaletteIcon: `
    <path {...puff} d="M9 3.4a5.6 5.6 0 000 11.2c.9 0 1.4-.6 1.4-1.3 0-.8-.6-1.1-.6-1.8 0-.6.5-1.1 1.2-1.1h1.2c1.9 0 3.2-1.2 3.2-3C15.4 5.9 12.6 3.4 9 3.4z" />
    <circle {...solid} cx="6.3" cy="8.6" r=".45" />
    <circle {...solid} cx="9" cy="6.3" r=".45" />
    <circle {...solid} cx="12" cy="7" r=".45" />
  `,
  // Wider bars so each keeps an open middle.
  PauseIcon: `
    <rect {...puff} x="4.6" y="4.4" width="3" height="9.2" rx="1" />
    <rect {...puff} x="10.4" y="4.4" width="3" height="9.2" rx="1" />
  `,
  // The knocked-out q becomes a stroked q inside the outlined square.
  QinyangLogoIcon: `
    <path {...puff} d="M5.2 3.4h7.6a1.8 1.8 0 011.8 1.8v7.6a1.8 1.8 0 01-1.8 1.8H5.2a1.8 1.8 0 01-1.8-1.8V5.2a1.8 1.8 0 011.8-1.8z" />
    <circle {...line} cx="8.8" cy="8.2" r="1.8" />
    <path {...line} d="M10.6 7.4v4.1" />
  `,
  // Two knocked-out racks would double up: one outlined unit with a divider and status dots.
  ServerIcon: `
    <rect {...puff} x="3.4" y="3.6" width="11.2" height="10.8" rx="1.8" />
    <path {...line} d="M3.6 9h10.8M6.2 6.3h.01M6.2 11.7h.01" />
  `,
  // Bigger knobs so they read as rings at 14px.
  SlidersIcon: `
    <path {...line} d="M3.8 6h3.4M10.8 6h3.4M3.8 12h6.4M13.6 12h.6" />
    <circle {...puff} cx="9" cy="6" r="1.6" />
    <circle {...puff} cx="12" cy="12" r="1.6" />
  `,
  // The knocked-out prompt becomes stroked glyphs inside the outlined square.
  TerminalSquareIcon: `
    <path {...puff} d="M5.2 3.4h7.6a1.8 1.8 0 011.8 1.8v7.6a1.8 1.8 0 01-1.8 1.8H5.2a1.8 1.8 0 01-1.8-1.8V5.2a1.8 1.8 0 011.8-1.8z" />
    <path {...line} d="M6.4 6.6L8.8 9l-2.4 2.4M10 11.6h1.8" />
  `,
  // The narrow cuff would close up as a contour: draw it as a single stroke.
  ThumbsDownIcon: `
    <path {...line} d="M4.4 4.4v5.2" />
    <path {...puff} d="M7.4 10l2 4c.9 0 1.7-.8 1.5-1.8l-.3-1.8h2.6c.8 0 1.4-.8 1.2-1.6l-1-3.9c-.1-.6-.7-1-1.3-1H7.4z" />
  `,
  ThumbsUpIcon: `
    <path {...line} d="M4.4 8.4v5.2" />
    <path {...puff} d="M7.4 8l2-4c.9 0 1.7.8 1.5 1.8L10.6 7.6h2.6c.8 0 1.4.8 1.2 1.6l-1 3.9c-.1.6-.7 1-1.3 1H7.4z" />
  `,
}
