import fs from "node:fs"
import path from "node:path"

import { DEFAULT_ACCENT, PRESET_RAMPS, RAMP_STOPS } from "@/components/docs/accent-color"
import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { ThemingAccent } from "@/components/docs/theming-accent"
import { ThemingTokenTable } from "@/components/docs/theming-token-table"
import { parseThemeTokens, TOKEN_ROLES } from "@/components/docs/theming-tokens"

export const metadata = { title: "Colors" }

/** Light/dark values straight from the theme, read once at build time. */
function readTheme() {
  const theme = parseThemeTokens(fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8"))
  // The default ramp in accent-color.ts mirrors the --accent-* stops on :root; flag drift in the build log.
  const ramp = PRESET_RAMPS[DEFAULT_ACCENT]
  if (RAMP_STOPS.some((s, i) => theme.light[`accent-${s}`] !== ramp[i]) || theme.light.primary !== "var(--accent-600)") {
    console.warn("[docs/colors] accent-color.ts default ramp no longer matches app/globals.css")
  }
  return theme
}

export default function Colors() {
  const theme = readTheme()
  const toc = [
    { id: "accent", title: "One accent" },
    ...TOKEN_ROLES.map((r) => ({ id: r.id, title: r.title })),
  ]
  return (
    <GuidePage
      href="/docs/colors"
      toc={toc}
      lede={
        <>
          Every colour a component reads is a role token: a CSS variable with a light value on <Code>:root</Code> and a dark
          value on <Code>.dark</Code>, exposed as a Tailwind class. How the layers fit together is on{" "}
          <TextLink href="/docs/theming#how-it-works">Theming</TextLink>.
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <GuideH2 id="accent">One accent, every control</GuideH2>
        <p className="text-muted-foreground">
          Filled buttons, switches, checkboxes, radios, sliders, tabs, links, selection and focus rings all read{" "}
          <Code>--primary</Code>, <Code>--primary-foreground</Code> and <Code>--ring</Code>, and those read one{" "}
          <Code>--accent-50…950</Code> ramp: primary is its 600 stop with white text, ring its 500 stop, the same in both
          modes. Blue is the default; pick a preset or any colour and the whole site recolours live, while surfaces, text,
          states and charts deliberately stay as they are. A custom colour gets a ramp built on blue&apos;s lightness steps in
          its own hue, and is used as picked for primary (darkened or lifted only if it would fall under 3:1 against the
          page) with white or dark text by contrast. The choice is remembered like the header&apos;s accent menu.
        </p>
        <ThemingAccent />
      </section>

      {TOKEN_ROLES.map((role) => (
        <section key={role.id} className="flex flex-col gap-4">
          <GuideH2 id={role.id}>{role.title}</GuideH2>
          <p className="text-muted-foreground">{role.description}</p>
          <ThemingTokenTable role={role} theme={theme} />
        </section>
      ))}
    </GuidePage>
  )
}
