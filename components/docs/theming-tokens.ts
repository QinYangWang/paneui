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
      "Opaque surfaces, from the page outward. Cards and popovers sit one step above the canvas; shell is the app chrome band behind an inset panel; code is the code block well.",
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
      "Interactive fills. primary is the one emphasis colour and the only role the accent replaces. secondary, muted and accent are translucent washes (black 3–4% / white 4%) for hover, selected and track states, never surfaces.",
    tokens: [
      { name: "primary", cls: "bg-primary", kind: "fill", note: "accent" },
      { name: "secondary", cls: "bg-secondary", kind: "fill" },
      { name: "muted", cls: "bg-muted", kind: "fill" },
      { name: "accent", cls: "bg-accent", kind: "fill" },
    ],
  },
  {
    id: "text",
    title: "Text",
    description:
      "Type on those surfaces. foreground for titles and body, muted-foreground for captions, meta and nav icons; each fill has a *-foreground for what sits on it.",
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
      "Hairlines and focus. border is the 5% / 4% divider every element inherits, input outlines fields, shell-border draws the inset panel's 0.5px edge. ring is opaque and always used at /50.",
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
      "Feedback colours keep their meaning in every theme and accent. Use them solid for icons and text, and as washes with an opacity modifier (bg-success/12, ring-destructive/30).",
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
      "A categorical ramp: blue, green, amber, red, violet. Charts never read primary, so data stays coloured under every accent. Use them as classes or as var(--chart-n) in SVG.",
    tokens: [
      { name: "chart-1", cls: "bg-chart-1", kind: "fill" },
      { name: "chart-2", cls: "bg-chart-2", kind: "fill" },
      { name: "chart-3", cls: "bg-chart-3", kind: "fill" },
      { name: "chart-4", cls: "bg-chart-4", kind: "fill" },
      { name: "chart-5", cls: "bg-chart-5", kind: "fill" },
    ],
  },
]

export type ModeValues = Record<string, string>
export type ParsedTheme = { light: ModeValues; dark: ModeValues }

/**
 * Read the custom properties declared on `:root` and `.dark` in a stylesheet.
 * Later blocks win, as in CSS. Selector variants (html[data-accent] …) are ignored.
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
