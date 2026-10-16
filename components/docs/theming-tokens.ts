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

const stateTokens = (n: string): TokenRow[] => [
  { name: n, cls: `bg-${n}`, kind: "fill" },
  { name: `${n}-hover`, cls: `bg-${n}-hover`, kind: "fill" },
  { name: `${n}-subtle`, cls: `bg-${n}-subtle`, kind: "fill" },
  { name: `${n}-border`, cls: `border-${n}-border`, kind: "line" },
  { name: `${n}-foreground`, cls: `text-${n}-foreground`, kind: "text", on: n },
]

export const TOKEN_ROLES: TokenRole[] = [
  {
    id: "background",
    title: "Background",
    description: "Use these for anything that must be opaque, and sunken for wells inside a surface.",
    tokens: [
      { name: "background", cls: "bg-background", kind: "surface" },
      { name: "card", cls: "bg-card", kind: "surface" },
      { name: "popover", cls: "bg-popover", kind: "surface" },
      { name: "surface-sunken", cls: "bg-surface-sunken", kind: "fill" },
      { name: "surface-standout", cls: "bg-surface-standout", kind: "surface" },
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
    id: "accent-roles",
    title: "Accent roles",
    description: "Use hover and active for pressed solids, and subtle for selected rows and tinted chips.",
    tokens: [
      { name: "primary-hover", cls: "bg-primary-hover", kind: "fill", note: "accent" },
      { name: "primary-active", cls: "bg-primary-active", kind: "fill", note: "accent" },
      { name: "primary-subtle", cls: "bg-primary-subtle", kind: "fill", note: "accent" },
      { name: "primary-subtle-hover", cls: "bg-primary-subtle-hover", kind: "fill", note: "accent" },
      { name: "primary-border", cls: "border-primary-border", kind: "line", note: "accent" },
    ],
  },
  {
    id: "text",
    title: "Text",
    description:
      "Use foreground for primary text, muted-foreground for captions and nav icons, and fg-tertiary only for placeholders and hints.",
    tokens: [
      { name: "foreground", cls: "text-foreground", kind: "text" },
      { name: "muted-foreground", cls: "text-muted-foreground", kind: "text" },
      { name: "fg-tertiary", cls: "text-fg-tertiary", kind: "text" },
      { name: "fg-disabled", cls: "text-fg-disabled", kind: "text" },
      { name: "card-foreground", cls: "text-card-foreground", kind: "text" },
      { name: "popover-foreground", cls: "text-popover-foreground", kind: "text" },
      { name: "primary-foreground", cls: "text-primary-foreground", kind: "text", note: "accent", on: "primary" },
      { name: "standout-foreground", cls: "text-standout-foreground", kind: "text", on: "surface-standout" },
      { name: "secondary-foreground", cls: "text-secondary-foreground", kind: "text" },
      { name: "accent-foreground", cls: "text-accent-foreground", kind: "text" },
    ],
  },
  {
    id: "border",
    title: "Border",
    description: "Use border for dividers, border-strong or input for field outlines, and ring at /50 for focus.",
    tokens: [
      { name: "border", cls: "border-border", kind: "line" },
      { name: "border-subtle", cls: "border-border-subtle", kind: "line" },
      { name: "border-strong", cls: "border-border-strong", kind: "line" },
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
    description: "These keep their meaning under every accent. Use subtle for alert and badge washes, and the solid for icons and text.",
    tokens: [...stateTokens("destructive"), ...stateTokens("success"), ...stateTokens("warning")],
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
  const src = stripAtSupports(css.replace(/\/\*[\s\S]*?\*\//g, ""))
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

/** Drop `@supports { … }` blocks (wide-gamut and color-mix overrides) so the tables show the base values. */
function stripAtSupports(css: string): string {
  let out = ""
  let i = 0
  for (let at = css.indexOf("@supports", i); at >= 0; at = css.indexOf("@supports", i)) {
    out += css.slice(i, at)
    let j = css.indexOf("{", at)
    let depth = 0
    for (; j < css.length; j++) {
      if (css[j] === "{") depth++
      else if (css[j] === "}" && --depth === 0) break
    }
    i = j + 1
  }
  return out + css.slice(i)
}

/** A token's value in one mode: dark falls back to the light value when `.dark` does not redeclare it. */
export const modeValue = (theme: ParsedTheme, name: string, which: "light" | "dark") =>
  which === "dark" ? (theme.dark[name] ?? theme.light[name]) : theme.light[name]
