"use client"

import * as React from "react"
import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@paneui/ui/components/accordion"
import { Button } from "@paneui/ui/components/button"
import { FileTree, FileTreeFile, FileTreeFolder } from "@paneui/ui/components/file-tree"
import { Kbd } from "@paneui/ui/components/kbd"
import { ThemeSwitch } from "@paneui/ui/components/theme-toggle"
import { PRESET_LABELS, PRESET_THEMES, type PresetAccent } from "@/components/docs/accent-color"
import { setAccent, useAccentState } from "@/components/docs/accent-store"
import { THEME_KEY } from "@/components/docs/theme-script"
import { siteCopy } from "@/lib/site-copy"
import { useT, type Localized } from "@/lib/site-locale"

import { CodeVisual, IconStylePicker, IconsVisual, Specimen, type IconStyle } from "./features"

/** A section's centred-left heading and lede, the same on every block of the page. */
export function SectionHead({ id, title, lede, className }: { id: string; title: string; lede?: string; className?: string }) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      <h2 id={id} className="font-heading text-3xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {lede && <p className="text-base text-pretty text-muted-foreground sm:text-lg">{lede}</p>}
    </div>
  )
}

/**
 * A numbered figure card: "Fig n" and a small label over a live visual, a mono caption under it,
 * then the title and one or two lines of body. `wide` puts the copy beside the figure.
 */
function Fig({
  n,
  tag,
  caption,
  title,
  body,
  wide,
  className,
  children,
}: {
  n: number
  tag: string
  caption: string
  title: string
  body: string
  wide?: boolean
  className?: string
  children: React.ReactNode
}) {
  const figure = (
    <div className={cn("flex min-w-0 flex-col", wide && "lg:col-span-2 lg:border-s lg:border-border")}>
      <div className="flex items-center justify-between px-4 pt-3 font-mono text-ui-2xs tracking-wide text-muted-foreground uppercase">
        <span>Fig {n}</span>
        <span>{tag}</span>
      </div>
      <div className="flex min-h-56 flex-1 items-center justify-center px-6 py-6">{children}</div>
      <div className="px-4 pb-3 font-mono text-ui-2xs text-muted-foreground">{caption}</div>
    </div>
  )
  const copy = (
    <div className={cn("flex flex-col gap-1.5 p-5", wide ? "justify-center lg:order-first" : "border-t border-border")}>
      <h3 className="text-lg font-semibold text-balance">{title}</h3>
      <p className="text-ui-lg text-pretty text-muted-foreground">{body}</p>
    </div>
  )
  return (
    <div className={cn("grid overflow-hidden frame-2xl border border-border bg-card", wide ? "lg:grid-cols-3" : "grid-rows-[1fr_auto]", className)}>
      {figure}
      {copy}
    </div>
  )
}

function KeysVisual() {
  const t = useT()
  const [file, setFile] = React.useState<string | null>("src/app.tsx")
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <FileTree label={t({ en: "Project files", zh: "项目文件" })} value={file} onValueChange={setFile} defaultExpanded={["src"]}>
        <FileTreeFolder name="src">
          <FileTreeFile name="app.tsx" />
          <FileTreeFile name="theme.css" />
        </FileTreeFolder>
        <FileTreeFile name="package.json" />
      </FileTree>
      <div className="flex items-center justify-center gap-1">
        {["↑", "↓", "←", "→"].map((k) => (
          <Kbd key={k}>{k}</Kbd>
        ))}
      </div>
    </div>
  )
}

function DarkVisual() {
  const t = useT()
  return (
    <div className="flex flex-col items-center gap-4">
      <ThemeSwitch storageKey={THEME_KEY} modes="tri" />
      <p className="max-w-48 text-center text-ui-sm text-muted-foreground">{t({ en: "This page follows it too.", zh: "这个页面也跟着切换。" })}</p>
    </div>
  )
}

export function Figures({ codeHtml }: { codeHtml: string }) {
  const t = useT()
  const [iconStyle, setIconStyle] = React.useState<IconStyle>("rounded")
  return (
    <section aria-labelledby="figs-title" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
      <SectionHead
        id="figs-title"
        title={t({ en: "Built for apps people keep open all day", zh: "为整天开着的应用而做" })}
        lede={t({
          en: "Each component is a file the CLI copies into your project, drawn in your theme and usable from the keyboard.",
          zh: "每个组件都是 CLI 复制进项目的一个文件，用你的主题绘制，也能用键盘操作。",
        })}
      />
      <Fig
        wide
        n={1}
        tag={t({ en: "Own the code", zh: "源码归你" })}
        caption="components/ui/button.tsx"
        title={t({ en: "Copied in, and yours to edit", zh: "复制进来，随你修改" })}
        body={t({ en: "Nothing hides in a package. Read any line, change it, keep it in your repo.", zh: "没有藏在包里的代码。读任何一行，改它，留在你的仓库里。" })}
      >
        <div className="w-full">
          <CodeVisual html={codeHtml} />
        </div>
      </Fig>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Fig
          n={2}
          tag={t({ en: "Keys", zh: "键盘" })}
          caption={t({ en: "arrows · enter · type to jump", zh: "方向键 · 回车 · 输入跳转" })}
          title={t({ en: "Keyboard first", zh: "键盘优先" })}
          body={t({ en: "Trees, menus and grids take the arrow keys. Motion stops for reduced motion.", zh: "树、菜单和网格都支持方向键。减少动态效果时动画会停下。" })}
        >
          <KeysVisual />
        </Fig>
        <Fig
          n={3}
          tag={t({ en: "Icons", zh: "图标" })}
          caption={t({ en: "two styles · one set of names", zh: "两种风格 · 同一套名称" })}
          title={t({ en: "Icons on the same grid", zh: "同一网格上的图标" })}
          body={t({ en: "Swap one file and every icon in the app follows.", zh: "换一个文件，整个应用的图标随之切换。" })}
        >
          <div className="flex w-full flex-col items-center gap-4">
            <IconStylePicker value={iconStyle} onChange={setIconStyle} />
            <div className="w-full max-w-64">
              <IconsVisual style={iconStyle} />
            </div>
          </div>
        </Fig>
        <Fig
          n={4}
          tag={t({ en: "Theme", zh: "主题" })}
          caption="light · dark · system"
          title={t({ en: "Dark mode built in", zh: "内置深色模式" })}
          body={t({ en: "Every token has a dark value. The switch repaints with a reveal.", zh: "每个变量都有深色值，切换时带揭开动画。" })}
        >
          <DarkVisual />
        </Fig>
        <Fig
          n={5}
          tag={t({ en: "Corners", zh: "圆角" })}
          caption="outer = inner + padding"
          title={t({ en: "Concentric corners", zh: "同心圆角" })}
          className="lg:col-span-2"
          body={t({ en: "Nested surfaces work out their own radius, at every preset.", zh: "嵌套的表面自动计算圆角，每种预设都成立。" })}
        >
          <div className="w-full max-w-md">
            <Specimen />
          </div>
        </Fig>
        <Fig
          n={6}
          tag={t({ en: "Agents", zh: "助手" })}
          caption="skills/paneui-design"
          title={t({ en: "Rules your agent can read", zh: "助手也能读的规则" })}
          body={t({ en: "A design skill ships with the library, so generated code keeps the style.", zh: "组件库附带设计技能，生成的代码也保持同一风格。" })}
        >
          <Button variant="outline" nativeButton={false} render={<Link href="/docs/skill" />}>
            {t({ en: "Design skill", zh: "设计技能" })}
            <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
        </Fig>
      </div>
    </section>
  )
}

const ACCENT_LINES: Record<PresetAccent, Localized> = {
  blue: { en: "Calm and familiar.", zh: "平静而熟悉。" },
  neutral: { en: "The default. Ink on paper, no hue.", zh: "默认。纸上的墨色，没有色相。" },
  green: { en: "Fresh, good for finance and health.", zh: "清新，适合金融和健康类应用。" },
  orange: { en: "Warm and lively.", zh: "温暖而活泼。" },
  rose: { en: "Soft, with a little edge.", zh: "柔和，带一点锋芒。" },
  violet: { en: "Playful, made for creative tools.", zh: "俏皮，适合创作工具。" },
}

export function Accents() {
  const t = useT()
  const { accent } = useAccentState()
  return (
    <section aria-labelledby="accents-title" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
      <SectionHead
        id="accents-title"
        title={t({ en: "Six accents, light and dark", zh: "六种主题色，浅色与深色" })}
        lede={t({ en: "Pick one and the whole site follows. The same values ship with your theme.", zh: "选一个，整个网站随之变化。同样的值随你的主题一起交付。" })}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(PRESET_LABELS) as PresetAccent[]).map((a) => {
          const selected = accent === a
          return (
            <button
              key={a}
              type="button"
              aria-pressed={selected}
              onClick={() => setAccent(a)}
              className={cn(
                "flex cursor-pointer flex-col items-start gap-3 frame-2xl border border-border bg-card p-5 text-start outline-none hover:bg-secondary/50 focus-visible:ring-2 focus-visible:ring-ring/50",
                selected && "border-foreground/30 bg-secondary/50"
              )}
            >
              <span
                aria-hidden
                className="size-7 rounded-full shadow-raised"
                style={{ background: a === "neutral" ? "var(--foreground)" : PRESET_THEMES[a].light.primary }}
              />
              <span className="flex flex-col gap-1">
                <span className="text-lg font-semibold">{t(siteCopy(PRESET_LABELS[a]))}</span>
                <span className="text-ui-lg text-muted-foreground">{t(ACCENT_LINES[a])}</span>
              </span>
            </button>
          )
        })}
      </div>
      <div>
        <Button variant="outline" nativeButton={false} render={<Link href="/docs/theming" />}>
          {t({ en: "Read the theming guide", zh: "阅读主题指南" })}
          <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
        </Button>
      </div>
    </section>
  )
}

const FAQ: { q: Localized; a: Localized }[] = [
  {
    q: { en: "Is it a package I install?", zh: "它是一个需要安装的包吗？" },
    a: { en: "No. The CLI copies each component's source into your project.", zh: "不是。CLI 会把每个组件的源码复制进你的项目。" },
  },
  {
    q: { en: "What do I need?", zh: "需要什么环境？" },
    a: { en: "A React 19 project with Tailwind CSS 4.", zh: "一个使用 Tailwind CSS 4 的 React 19 项目。" },
  },
  {
    q: { en: "Can I change the theme?", zh: "可以修改主题吗？" },
    a: { en: "Yes. Accent, radius and every colour are CSS variables in one theme file.", zh: "可以。主题色、圆角和所有颜色都是同一个主题文件里的 CSS 变量。" },
  },
  {
    q: { en: "Is it accessible?", zh: "支持无障碍吗？" },
    a: { en: "Roles, states, labels and keyboard support come with every interactive component.", zh: "每个交互组件都带有角色、状态、标签和键盘支持。" },
  },
  {
    q: { en: "What does it cost?", zh: "需要付费吗？" },
    a: { en: "Nothing. It is MIT licensed.", zh: "免费，MIT 许可。" },
  },
]

export function Faq() {
  const t = useT()
  return (
    <section aria-labelledby="faq-title" className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 sm:px-6">
      <h2 id="faq-title" className="font-heading text-3xl font-semibold tracking-tight">
        {t({ en: "Frequently asked questions", zh: "常见问题" })}
      </h2>
      <Accordion variant="ghost">
        {FAQ.map((f, i) => (
          <AccordionItem key={i} value={String(i)}>
            <AccordionTrigger>{t(f.q)}</AccordionTrigger>
            <AccordionPanel>{t(f.a)}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
