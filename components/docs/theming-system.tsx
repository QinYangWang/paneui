import type * as React from "react"

import { Code } from "./guide-page"

/** Variable → utility → consumer, one row per kind of token in app/globals.css. */
const LAYERS: { variable: string; value: string; utility: React.ReactNode; usedBy: string }[] = [
  { variable: "--background", value: "oklch(100% 0 0)", utility: <Code>bg-background</Code>, usedBy: "Page canvas" },
  {
    variable: "--primary",
    value: "var(--accent-600)",
    utility: (
      <>
        <Code>bg-primary</Code> <Code>text-primary-foreground</Code>
      </>
    ),
    usedBy: "Filled buttons, switches, checks, selection",
  },
  { variable: "--border", value: "oklch(0% 0 0 / 8%)", utility: <Code>border-border</Code>, usedBy: "Every divider (base layer default)" },
  { variable: "--radius", value: "0.625rem", utility: <Code>rounded-sm … rounded-3xl</Code>, usedBy: "All corners, 0.6× to 2.2×" },
  { variable: "--skeuo-raised", value: "ring + 1px drop", utility: <Code>shadow-raised</Code>, usedBy: "Resting cards and controls" },
  { variable: "--text-ui", value: "0.8125rem", utility: <Code>text-ui</Code>, usedBy: "Buttons, inputs, menus, nav" },
]

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Map each mode",
    body: (
      <>
        Light values on <Code>:root</Code>, dark values on <Code>.dark</Code>, under the same names.
      </>
    ),
  },
  {
    title: "Use semantic utilities",
    body: (
      <>
        <Code>bg-card</Code>, <Code>text-muted-foreground</Code>, <Code>ring-ring/50</Code>: never palette colours or hex.
      </>
    ),
  },
  {
    title: "Keep it central",
    body: (
      <>
        Components don&apos;t need <Code>dark:</Code> colour overrides, so a theme change is one edit in one file.
      </>
    ),
  },
]

const EXTRAS: { name: React.ReactNode; body: string }[] = [
  { name: <Code>--radius</Code>, body: "One base with fixed multipliers; frame-* and rounded-inner keep nested corners concentric." },
  { name: <Code>text-ui-*</Code>, body: "A native 13px scale (10–14px) declared in @theme, so it does not change with mode." },
  { name: <Code>--skeuo-*</Code>, body: "Elevation: hairline rings and soft drops behind shadow-raised, -surface, -well, -chip, -primary." },
  { name: <Code>--shell</Code>, body: "App chrome: the window band, rail sidebar and the shell-inset content panel." },
  { name: <Code>--scrollbar</Code>, body: "Thumb colours read by the base layer's thin, rounded scrollbars." },
]

/** "How the system works" for the Theming page: two layers, two modes, one accent. */
export function ThemingSystem() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">
        The theme has two layers. <strong className="font-medium text-foreground">Values</strong> are CSS variables in{" "}
        <Code>globals.css</Code>, written per role in OKLCH (<Code>--card</Code>, <Code>--muted-foreground</Code>,{" "}
        <Code>--ring</Code>): what a colour is for, not what it looks like. <strong className="font-medium text-foreground">Utilities</strong>{" "}
        sit on top: <Code>@theme inline</Code> maps each variable to Tailwind classes, so <Code>--card</Code> becomes{" "}
        <Code>bg-card</Code>. Components only use the utilities. Change a value and every component follows, with no
        component file touched.
      </p>

      <div className="overflow-x-auto rounded-xl bg-card shadow-raised">
        <table className="w-full min-w-xl border-collapse text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              <th className="px-4 py-2.5 font-medium">Variable</th>
              <th className="px-4 py-2.5 font-medium">Utility</th>
              <th className="px-4 py-2.5 font-medium">Read by</th>
            </tr>
          </thead>
          <tbody>
            {LAYERS.map((l) => (
              <tr key={l.variable} className="border-b last:border-b-0">
                <td className="px-4 py-2.5 align-top">
                  <span className="flex flex-col gap-0.5">
                    <code className="font-mono text-xs text-foreground">{l.variable}</code>
                    <span className="font-mono text-ui-xs whitespace-nowrap text-muted-foreground">{l.value}</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 align-top">{l.utility}</td>
                <td className="px-4 py-2.5 align-top text-muted-foreground">{l.usedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-muted-foreground">
        That indirection is also the path to dark mode: <Code>.dark</Code> on <Code>&lt;html&gt;</Code> points the same
        variables at dark values, so a component written once is right in both modes. The accent works the same way one
        level up: <Code>--primary</Code> and <Code>--ring</Code> read an <Code>--accent-50…950</Code> ramp
        (blue by default), <Code>html[data-accent]</Code> swaps the ramp, and everything interactive recolours while
        surfaces, text, states and charts stay put.
      </p>

      <ol className="grid gap-3 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-1.5 rounded-xl bg-card p-4 shadow-raised">
            <span className="font-mono text-ui-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-ui-lg font-semibold">{s.title}</span>
            <span className="text-sm text-muted-foreground">{s.body}</span>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Beyond colour, the same file carries the rest of the system:</p>
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {EXTRAS.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-24 shrink-0">{e.name}</span>
              <span>{e.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
