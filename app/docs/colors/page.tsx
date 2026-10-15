import fs from "node:fs"
import path from "node:path"

import { DEFAULT_ACCENT, PRESET_RAMPS, RAMP_STOPS } from "@/components/docs/accent-color"
import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { ThemingAccent } from "@/components/docs/theming-accent"
import { ThemingRadius } from "@/components/docs/theming-radius"
import { ThemingTokenTable } from "@/components/docs/theming-token-table"
import { parseThemeTokens, TOKEN_ROLES } from "@/components/docs/theming-tokens"

export const metadata = { title: "Customize" }

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
    { id: "radius", title: "Radius" },
    ...TOKEN_ROLES.map((r) => ({ id: r.id, title: r.title })),
  ]
  return (
    <GuidePage
      href="/docs/colors"
      toc={toc}
      lede={
        <>
          Pick an accent and a radius for the whole site, then copy the CSS. Every colour a component reads is a role
          token with a light and a dark value; see{" "}
          <TextLink href="/docs/theming#how-it-works">Theming</TextLink> for how the layers fit together.
        </>
      }
    >
      <section className="flex flex-col gap-4">
        <GuideH2 id="accent">One accent, every control</GuideH2>
        <p className="text-muted-foreground">
          Every accented control reads <Code>--primary</Code> and <Code>--ring</Code>, and both read one{" "}
          <Code>--accent-50…950</Code> ramp. Pick a preset or a brand colour below to try it, then copy the overrides. A
          custom colour is darkened or lifted only if it would fall under 3:1 contrast against the page.
        </p>
        <ThemingAccent />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="radius">One radius, every corner</GuideH2>
        <p className="text-muted-foreground">
          Every radius token multiplies <Code>--radius</Code>, and nested surfaces subtract their padding from it, so
          corners stay concentric at any value. Pick a preset or drag for your own, then copy the override, or install
          a preset with <Code>theme-radius-none</Code>, <Code>-sm</Code>, <Code>-lg</Code> or <Code>-xl</Code>.
        </p>
        <ThemingRadius />
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
