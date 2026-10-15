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
      "Opaque surfaces. Light: a white page, white cards and popovers that stand off it by their hairline. Dark: a #121212 page (neutral-925) with neutral-800 cards, popovers and fields. shell is the app chrome band (neutral-100 / neutral-900); code is the code block well.",
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
      "Interactive fills. primary is the accent's 600 stop with white text, the only role the accent replaces. secondary, muted and accent are translucent washes for hover, selected and track states (black 3% = neutral-100 on white; white 5–7% in dark), never surfaces.",
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
      "--accent-50…950: one eleven-stop ramp per accent, blue by default (Tailwind blue with #3392ff at 400). primary reads the 600 stop (700 for green and orange) and ring the 500 stop; presets and custom colours swap only these stops. Not exposed as utilities: components read primary and ring.",
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
      "Type on those surfaces. foreground is text/primary (neutral-950 / neutral-50); muted-foreground is text/secondary for captions, meta and nav icons: neutral-500 in light (4.7:1 on white) and neutral-400 in dark, so it keeps 4.5:1 on neutral-800 cards. Each fill has a *-foreground for what sits on it.",
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
      "Hairlines and focus. border is the divider every element inherits (black 8% = neutral-200 on white; white 8% = neutral-800 on the dark page), input outlines fields (neutral-200 / neutral-700 on a card), shell-border draws the inset panel's 0.5px edge. ring is the accent's 500 stop, always used at /50.",
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
      "Feedback colours keep their meaning in every theme and accent: destructive red-500 in both modes (it also fills the destructive button, where white on red-400 would be 2.9:1), success lime-600 / lime-400, warning yellow-600 / yellow-500. Use them solid for icons and text, and as washes with an opacity modifier (bg-success/12, ring-destructive/30).",
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
      "The categorical ramp, all at 400 and the same in both modes: teal, lime, pink, sky, purple, blue, emerald, yellow. Charts never read primary, so data stays coloured under every accent. Use them as classes or as var(--chart-n) in SVG.",
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
