import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"

import { ACCENT_VARS, DEFAULT_ACCENT, PRESET_THEMES } from "@/components/docs/accent-color"
import { Code, GuideH2, GuidePage } from "@/components/docs/guide-page"
import { ThemingAccent } from "@/components/docs/theming-accent"
import { ThemingRadius } from "@/components/docs/theming-radius"
import { ThemingTokenTable } from "@/components/docs/theming-token-table"
import { parseThemeTokens, TOKEN_ROLES } from "@/components/docs/theming-tokens"
import { T } from "@/lib/site-locale"
import { LocalizedText } from "@/components/docs/localized"

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
    { id: "accent", title: { en: "One accent", zh: "一个主题色" } },
    { id: "radius", title: { en: "Radius", zh: "圆角" } },
    ...TOKEN_ROLES.map((r) => ({ id: r.id, title: r.title })),
  ]
  return (
    <GuidePage
      href="/docs/colors"
      toc={toc}
      lede={{ en: "Choose an accent and a corner radius.", zh: "选择主题色与圆角。" }}
    >
      <section className="flex flex-col gap-4">
        <GuideH2 id="accent">
          <T en="One accent, every control" zh="一个主题色，控制所有控件" />
        </GuideH2>
        <p className="text-muted-foreground">
          <T
            en={
              <>
                Every accented control reads eight variables, <Code>--primary</Code> and its variants plus{" "}
                <Code>--ring</Code>, and a preset swaps all eight per mode. Pick a preset or a brand colour below to try
                it, then copy the overrides. A custom colour is darkened or lifted only if it would fall under 3:1
                contrast against the page.
              </>
            }
            zh={
              <>
                每个主题色控件都读取八个变量：<Code>--primary</Code> 及其变体，再加上 <Code>--ring</Code>；预设会按模式替换这八个变量。
                在下方选择一个预设或品牌色试用，然后复制覆盖值。自定义颜色只有在与页面对比度低于 3:1 时才会被加深或提亮。
              </>
            }
          />
        </p>
        <ThemingAccent />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="radius">
          <T en="One radius, every corner" zh="一个圆角，所有拐角" />
        </GuideH2>
        <p className="text-muted-foreground">
          <T
            en={
              <>
                Every radius token multiplies <Code>--radius</Code>, and nested surfaces subtract their padding from it,
                so corners stay concentric at any value up to the 16px cap. Pick a preset or drag for your own, then copy
                the override, or install a preset with <Code>theme-radius-none</Code>, <Code>-sm</Code>, <Code>-lg</Code>{" "}
                or <Code>-xl</Code>.
              </>
            }
            zh={
              <>
                每个圆角变量都在 <Code>--radius</Code> 的基础上相乘，嵌套表面再减去自身内边距，因此在上限 16px 以内，任何取值下圆角都保持同心。
                选择预设或拖动自定义，然后复制覆盖值，也可以用 <Code>theme-radius-none</Code>、<Code>-sm</Code>、<Code>-lg</Code>{" "}
                或 <Code>-xl</Code> 安装预设。
              </>
            }
          />
        </p>
        <ThemingRadius />
      </section>

      {TOKEN_ROLES.map((role) => (
        <section key={role.id} className="flex flex-col gap-4">
          <GuideH2 id={role.id}>
            <LocalizedText text={role.title} />
          </GuideH2>
          <p className="text-muted-foreground">
            <LocalizedText text={role.description} />
          </p>
          <ThemingTokenTable role={role} theme={theme} />
        </section>
      ))}
    </GuidePage>
  )
}
