import type * as React from "react"

import { Card, CardDescription, CardTitle } from "@paneui/ui/components/card"

import { Code } from "./guide-page"
import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@paneui/ui/components/simple-table"

/** Variable → utility → consumer, one row per kind of token in packages/tokens/styles/globals.css. */
const LAYERS: { variable: string; value: string; utility: React.ReactNode; usedBy: string }[] = [
  { variable: "--background", value: "#fff", utility: <Code>bg-background</Code>, usedBy: "Page canvas" },
  {
    variable: "--primary",
    value: "#0090ff",
    utility: (
      <>
        <Code>bg-primary</Code> <Code>text-primary-foreground</Code>
      </>
    ),
    usedBy: "Filled buttons, switches, checks, selection",
  },
  { variable: "--border", value: "#00000017", utility: <Code>border-border</Code>, usedBy: "Every divider and edge" },
  { variable: "--radius", value: "0.5rem", utility: <Code>rounded-sm … rounded-3xl</Code>, usedBy: "All corners" },
  { variable: "--shadow-default", value: "hairline + 1px drop", utility: <Code>shadow-raised</Code>, usedBy: "Resting cards and controls" },
  { variable: "--text-ui", value: "0.8125rem", utility: <Code>text-ui</Code>, usedBy: "Buttons, inputs, menus, nav" },
]

const STEPS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Map each mode",
    body: (
      <>
        Put light values on <Code>:root</Code> and dark values on <Code>.dark</Code>, under the same names.
      </>
    ),
  },
  {
    title: "Use semantic utilities",
    body: (
      <>
        Write <Code>bg-card</Code> or <Code>text-muted-foreground</Code>, never palette colours or hex.
      </>
    ),
  },
  {
    title: "Keep it central",
    body: (
      <>
        Skip <Code>dark:</Code> colour overrides in components, so a theme change stays one edit in one file.
      </>
    ),
  },
]

const EXTRAS: { name: React.ReactNode; body: string }[] = [
  { name: <Code>--radius</Code>, body: "One base that every corner multiplies, so nested corners stay concentric." },
  { name: <Code>text-ui-*</Code>, body: "The type scale for text inside components." },
  { name: <Code>--shadow-*</Code>, body: "Four shadow levels behind shadow-xs to shadow-xl and the named elevation." },
  { name: <Code>--font-*</Code>, body: "The UI, code and reading font stacks." },
  { name: <Code>--shell</Code>, body: "Colours for app chrome around the content panel." },
  { name: <Code>--scrollbar</Code>, body: "Scrollbar thumb colours." },
]

/** "How the system works" for the Theming page: two layers, two modes, one accent. */
export function ThemingSystem() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground">
        The theme has two layers. <strong className="font-medium text-foreground">Values</strong> are CSS variables in{" "}
        <Code>globals.css</Code>, named for what a colour is for, such as <Code>--card</Code>.{" "}
        <strong className="font-medium text-foreground">Utilities</strong> map each variable to a class in{" "}
        <Code>@theme inline</Code>, so <Code>--card</Code> becomes <Code>bg-card</Code>. Components use only the
        utilities, so changing a value restyles every component without touching its file.
      </p>

      <SimpleTable className="min-w-xl">
          <SimpleTableHeader>
            <SimpleTableRow>
              <SimpleTableHead>Variable</SimpleTableHead>
              <SimpleTableHead>Utility</SimpleTableHead>
              <SimpleTableHead>Read by</SimpleTableHead>
            </SimpleTableRow>
          </SimpleTableHeader>
          <SimpleTableBody>
            {LAYERS.map((l) => (
              <SimpleTableRow key={l.variable}>
                <SimpleTableCell>
                  <span className="flex flex-col gap-0.5">
                    <code className="font-mono text-xs text-foreground">{l.variable}</code>
                    <span className="font-mono text-ui-xs whitespace-nowrap text-muted-foreground">{l.value}</span>
                  </span>
                </SimpleTableCell>
                <SimpleTableCell>{l.utility}</SimpleTableCell>
                <SimpleTableCell>{l.usedBy}</SimpleTableCell>
              </SimpleTableRow>
            ))}
          </SimpleTableBody>
        </SimpleTable>

      <p className="text-muted-foreground">
        Dark mode works the same way. <Code>.dark</Code> on <Code>&lt;html&gt;</Code> points the same variables at dark
        values, so a component written once is right in both modes. The accent is eight of those variables,{" "}
        <Code>--primary</Code> to <Code>--ring</Code>, which a preset swaps together.
      </p>

      <ol className="grid gap-3 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <Card key={s.title} render={<li />} className="gap-1.5 px-4">
            <span aria-hidden className="font-mono text-ui-xs text-muted-foreground tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <CardTitle>{s.title}</CardTitle>
            <CardDescription className="text-sm">{s.body}</CardDescription>
          </Card>
        ))}
      </ol>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">The same file also holds these tokens.</p>
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {EXTRAS.map((e, i) => (
            <li key={i} className="flex gap-3">
              <span data-md-after=":" className="w-24 shrink-0">
                {e.name}
              </span>
              <span>{e.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
