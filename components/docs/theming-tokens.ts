/**
 * Colour tokens grouped by role for the Colors page, plus a small parser that
 * reads their light and dark values straight out of app/globals.css at build
 * time (so the tables can never drift from the theme). Client-safe: the page
 * reads the file and passes the parsed values down.
 */

/** How a token is previewed: a fill on the mode's page, text on it, or a hairline. */
export type TokenKind = "surface" | "fill" | "text" | "line"

/** `on`: preview text tokens on this token's fill instead of the page (primary-foreground on primary). */
export type TokenRow = { name: string; cls: string; kind: TokenKind; note?: string; on?: string }
export type TokenRole = { id: string; title: string; description: string; tokens: TokenRow[] }

export const TOKEN_ROLES: TokenRole[] = [
  {
    id: "background",
    title: "Background",
    description:
      "Use these for anything that must be opaque. shell is the app chrome band and code is the code block well.",
    tokens: [
      { name: "background", cls: "bg-background", kind: "surface" },
      { name: "card", cls: "bg-card", kind: "surface" },
      { name: "popover", cls: "bg-popover", kind: "surface" },
      { name: "shell", cls: "bg-shell", kind: "surface" },
      { name: "code", cls: "bg-code", kind: "surface" },
    ],
  },
  {
    id: "fill",
    title: "Fill",
    description:
      "Use primary for the main action and secondary, muted or accent for hover, selected and track states. The last three are translucent, so never use them as surfaces.",
    tokens: [
      { name: "primary", cls: "bg-primary", kind: "fill", note: "accent" },
      { name: "secondary", cls: "bg-secondary", kind: "fill" },
      { name: "muted", cls: "bg-muted", kind: "fill" },
      { name: "accent", cls: "bg-accent", kind: "fill" },
    ],
  },
  {
    id: "accent-ramp",
    title: "Accent ramp",
    description:
      "The ramp behind primary and ring. Presets and custom colours swap only these stops, and components never read them directly.",
    tokens: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"].map((s) => ({
      name: `accent-${s}`,
      cls: `var(--accent-${s})`,
      kind: "fill" as const,
      note: "accent",
    })),
  },
  {
    id: "text",
    title: "Text",
    description:
      "Use foreground for primary text and muted-foreground for captions, meta and nav icons. Both keep 4.5:1 contrast on every surface. Put each fill's *-foreground on top of it.",
    tokens: [
      { name: "foreground", cls: "text-foreground", kind: "text" },
      { name: "muted-foreground", cls: "text-muted-foreground", kind: "text" },
      { name: "card-foreground", cls: "text-card-foreground", kind: "text" },
      { name: "popover-foreground", cls: "text-popover-foreground", kind: "text" },
      { name: "primary-foreground", cls: "text-primary-foreground", kind: "text", note: "accent", on: "primary" },
      { name: "secondary-foreground", cls: "text-secondary-foreground", kind: "text" },
      { name: "accent-foreground", cls: "text-accent-foreground", kind: "text" },
    ],
  },
  {
    id: "border",
    title: "Border",
    description:
      "border is the divider every element inherits, input outlines fields, and shell-border edges the inset panel. Use ring at /50 for focus.",
    tokens: [
      { name: "border", cls: "border-border", kind: "line" },
      { name: "input", cls: "border-input", kind: "line" },
      { name: "shell-border", cls: "border-shell-border", kind: "line" },
      { name: "ring", cls: "ring-ring/50", kind: "line", note: "accent" },
      { name: "scrollbar", cls: "var(--scrollbar)", kind: "fill" },
      { name: "scrollbar-hover", cls: "var(--scrollbar-hover)", kind: "fill" },
    ],
  },
  {
    id: "state",
    title: "State",
    description:
      "These keep their meaning under every accent. Use them solid for icons and text, or as washes with an opacity modifier such as bg-success/12.",
    tokens: [
      { name: "destructive", cls: "bg-destructive", kind: "fill" },
      { name: "success", cls: "bg-success", kind: "fill" },
      { name: "warning", cls: "bg-warning", kind: "fill" },
    ],
  },
  {
    id: "chart",
    title: "Chart",
    description:
      "Charts never read primary, so data keeps its colours under every accent. Use them as classes, or as var(--chart-n) in SVG.",
    tokens: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ name: `chart-${n}`, cls: `bg-chart-${n}`, kind: "fill" as const })),
  },
]

export type ModeValues = Record<string, string>
export type ParsedTheme = { light: ModeValues; dark: ModeValues }

/**
 * Read the custom properties declared on `:root` and `.dark` in a stylesheet.
 * Later blocks win, as in CSS. Selector variants (html[data-accent] …) are ignored; a token
 * that `.dark` does not redeclare keeps its `:root` value (see `modeValue`).
 */
export function parseThemeTokens(css: string): ParsedTheme {
  const out: ParsedTheme = { light: {}, dark: {} }
  const src = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const block = /(?:^|[\n}])\s*(:root|\.dark)\s*\{([^{}]*)\}/g
  for (let m = block.exec(src); m; m = block.exec(src)) {
    const target = m[1] === ":root" ? out.light : out.dark
    for (const decl of m[2].split(";")) {
      const i = decl.indexOf(":")
      if (i < 0) continue
      const prop = decl.slice(0, i).trim()
      if (prop.startsWith("--")) target[prop.slice(2)] = decl.slice(i + 1).replace(/\s+/g, " ").trim()
    }
  }
  return out
}

/** A token's value in one mode: dark falls back to the light value when `.dark` does not redeclare it. */
export const modeValue = (theme: ParsedTheme, name: string, which: "light" | "dark") =>
  which === "dark" ? (theme.dark[name] ?? theme.light[name]) : theme.light[name]
