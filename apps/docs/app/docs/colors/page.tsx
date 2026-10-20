import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"

import { ACCENT_VARS, DEFAULT_ACCENT, PRESET_THEMES } from "@/components/docs/accent-color"
import { Code, GuideH2, GuidePage } from "@/components/docs/guide-page"
import { ThemingAccent } from "@/components/docs/theming-accent"
import { ThemingRadius } from "@/components/docs/theming-radius"
import { ThemingTokenTable } from "@/components/docs/theming-token-table"
import { parseThemeTokens, TOKEN_ROLES } from "@/components/docs/theming-tokens"

export const metadata = { title: "Customize" }

/** Light/dark values straight from the theme, read once at build time. */
function readTheme() {
  const theme = parseThemeTokens(fs.readFileSync(repoPath( "packages/tokens/styles/globals.css"), "utf8"))
  // The generated presets mirror the accent roles on :root and .dark; flag drift in the build log.
  const preset = PRESET_THEMES[DEFAULT_ACCENT]
  if (ACCENT_VARS.some((k) => theme.light[k] !== preset.light[k] || theme.dark[k] !== preset.dark[k])) {
    console.warn("[docs/colors] accent-presets.generated.ts no longer matches packages/tokens/styles/globals.css (run regen-theme)")
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
      lede={{ en: "Choose an accent and corner radius.", zh: "选择主题色与圆角。" }}
    >
      <section className="flex flex-col gap-4">
        <GuideH2 id="accent">One accent, every control</GuideH2>
        <p className="text-muted-foreground">
          Every accented control reads eight variables, <Code>--primary</Code> and its variants plus{" "}
          <Code>--ring</Code>, and a preset swaps all eight per mode. Pick a preset or a brand colour below to try it,
          then copy the overrides. A custom colour is darkened or lifted only if it would fall under 3:1 contrast against
          the page.
        </p>
        <ThemingAccent />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="radius">One radius, every corner</GuideH2>
        <p className="text-muted-foreground">
          Every radius token multiplies <Code>--radius</Code>, and nested surfaces subtract their padding from it, so
          corners stay concentric at any value up to the 16px cap. Pick a preset or drag for your own, then copy the override, or install
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
