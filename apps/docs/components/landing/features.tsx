"use client"

import * as React from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import Link from "next/link"

import * as Rounded from "@paneui/ui/icons"
import {
  BellIcon,
  CodeIcon,
  GitBranchIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  RefreshIcon,
  SearchIcon,
  SmartphoneIcon,
  TerminalIcon,
} from "@paneui/ui/icons"
import * as Outline from "@paneui/ui/icons/outline/icons"
import * as Puffy from "@paneui/ui/icons/puffy/icons"
import { cn } from "@paneui/ui/lib/utils"
import { AvatarStatus } from "@paneui/ui/components/avatar"
import { Badge } from "@paneui/ui/components/badge"
import { Button, ButtonArrow } from "@paneui/ui/components/button"
import { CodeBlock } from "@paneui/ui/components/code-block"
import { FileTree, FileTreeFile, FileTreeFolder } from "@paneui/ui/components/file-tree"
import { GeneratedAvatar } from "@paneui/ui/components/generated-avatar"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import { Progress, ProgressLabel, ProgressValue } from "@paneui/ui/components/progress"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { SwatchPicker } from "@paneui/ui/components/swatch-picker"
import { Switch } from "@paneui/ui/components/switch"
import { WindowFrame, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@paneui/ui/components/window-frame"
import { PRESET_LABELS, PRESET_THEMES, type PresetAccent } from "@/components/docs/accent-color"
import { setAccent, useAccentState } from "@/components/docs/accent-store"
import { radiusValue, setRadius, useRadiusState, type RadiusChoice } from "@/components/docs/radius-store"
import { RADII } from "@/components/docs/theme-script"
import { siteCopy } from "@/lib/site-copy"
import { useT, type Localized } from "@/lib/site-locale"

import { Eyebrow } from "./parts"
import { Phone, Usage } from "./pieces"
import { Reveal, useStill } from "./reveal"

type Tone = "lilac" | "butter" | "mint" | "peach"
const TONE: Record<Tone, string> = { lilac: "lp-lilac", butter: "lp-butter", mint: "lp-mint", peach: "lp-peach" }

/**
 * One big pastel card: copy on one side, a live piece of UI on the other. `flip` puts the copy
 * first on wide screens.
 */
function FeatureCard({
  id,
  tone,
  flip,
  eyebrow,
  title,
  body,
  link,
  points,
  extra,
  visual,
}: {
  id: string
  tone: Tone
  flip?: boolean
  eyebrow: string
  title: [string, string]
  body: string
  link: React.ReactNode
  points?: { icon: React.ReactNode; label: string }[]
  extra?: React.ReactNode
  visual: React.ReactNode
}) {
  const still = useStill()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(p, [0, 1], [48, -48])
  return (
    <Reveal as="section" className="mx-auto w-full max-w-6xl px-2 sm:px-8">
      <div
        ref={ref}
        aria-labelledby={id}
        className={cn("lp-grain relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl px-5 py-10 sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-14", TONE[tone])}
      >
        <div className={cn("flex flex-col items-start gap-5 lg:col-span-5", flip ? "lg:order-1" : "lg:order-2")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 id={id} className="lp-display text-balance -mt-1 text-4xl sm:text-5xl">
            <span className="block">{title[0]}</span>
            <span className="block">{title[1]}</span>
          </h3>
          <p className="max-w-md text-pretty text-base leading-relaxed text-foreground/70">{body}</p>
          {extra}
          {link}
          {points ? (
            <ul className="mt-3 grid w-full grid-cols-2 gap-x-6 gap-y-5">
              {points.map((pt) => (
                <li key={pt.label} className="flex items-center gap-3 text-ui-lg font-medium [&_svg]:size-6 [&_svg]:shrink-0">
                  {pt.icon}
                  {pt.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <motion.div className={cn("relative min-w-0 lg:col-span-7", flip ? "lg:order-2" : "lg:order-1")} style={still ? undefined : { y }}>
          {visual}
        </motion.div>
      </div>
    </Reveal>
  )
}

/* ───────────── Web + Native ───────────── */

function PlatformsVisual() {
  const t = useT()
  return (
    <div className="relative pb-44 sm:pb-16">
      <WindowFrame variant="glass" size="sm" className="w-full sm:w-10/12">
        <WindowFrameBar>
          <WindowFrameTitle>app.example.com</WindowFrameTitle>
        </WindowFrameBar>
        <WindowFrameBody>
          <Usage />
        </WindowFrameBody>
      </WindowFrame>
      <Phone className="absolute end-0 -bottom-2 w-56 origin-bottom-right scale-75 sm:-bottom-8 sm:w-60 sm:scale-90 lg:scale-100" />
      <span className="sr-only">{t({ en: "A desktop window and a phone", zh: "桌面窗口和手机" })}</span>
    </div>
  )
}

/* ───────────── Theming ───────────── */

const RADIUS_SHORT: Record<(typeof RADII)[number], string> = { none: "0", sm: "S", default: "M", lg: "L", xl: "XL" }
const isRadius = (v: unknown): v is RadiusChoice => v === "custom" || (RADII as readonly string[]).includes(v as string)
const px = (rem: number) => Math.round(rem * 16)

function ThemeControls() {
  const t = useT()
  const { accent } = useAccentState()
  const radius = useRadiusState()
  const swatches = (Object.keys(PRESET_LABELS) as PresetAccent[]).map((a) => ({
    value: a,
    label: t(siteCopy(PRESET_LABELS[a])),
    color: a === "neutral" ? "var(--foreground)" : PRESET_THEMES[a].light.primary,
  }))
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-card/60 p-4 shadow-raised backdrop-blur-xl">
      <div className="flex flex-col gap-2">
        <span className="text-ui-sm font-medium text-muted-foreground">{t({ en: "Accent", zh: "主题色" })}</span>
        <SwatchPicker
          aria-label={t({ en: "Accent", zh: "主题色" })}
          swatches={swatches}
          value={accent === "custom" ? "" : accent}
          onValueChange={(v) => setAccent(v as PresetAccent)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-ui-sm font-medium text-muted-foreground">{t({ en: "Radius", zh: "圆角" })}</span>
        <SegmentedControl
          value={radius.radius}
          onValueChange={(v) => isRadius(v) && setRadius(v)}
          aria-label={t({ en: "Radius preset", zh: "圆角预设" })}
          className="w-full"
        >
          {RADII.map((r) => (
            <SegmentedControlItem key={r} value={r} className="flex-1">
              {RADIUS_SHORT[r]}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>
    </div>
  )
}

/** Four tiles that follow the live accent and radius; nested corners stay concentric. */
function Specimen() {
  const t = useT()
  const rem = radiusValue(useRadiusState())
  return (
    <div className="frame-3xl frame-p-2 grid w-full grid-cols-2 gap-2 rounded-3xl bg-shell/80 shadow-xl backdrop-blur-xl">
      <div className="frame-inner frame-p-5 flex aspect-square flex-col justify-between bg-primary text-primary-foreground">
        <span className="font-mono text-ui-xs opacity-80">--radius</span>
        <span className="lp-display text-balance flex items-baseline gap-1 tabular-nums">
          <span className="text-6xl sm:text-8xl">{px(rem)}</span>
          <span className="text-2xl opacity-80 sm:text-3xl">px</span>
        </span>
      </div>
      <div className="frame-inner frame-p-4 flex aspect-square flex-col justify-between gap-3 bg-card shadow-raised sm:frame-p-5">
        <div className="flex items-center gap-3">
          <GeneratedAvatar seed="mika" size="lg">
            <AvatarStatus status="online" label={t({ en: "Online", zh: "在线" })} />
          </GeneratedAvatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium">Mika</span>
            <span className="truncate text-ui-sm text-muted-foreground">{t({ en: "Design", zh: "设计" })}</span>
          </div>
        </div>
        <Progress value={64}>
          <ProgressLabel>{t({ en: "Storage", zh: "存储" })}</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
      <div className="frame-inner frame-p-4 flex flex-col justify-center gap-3 bg-card shadow-raised sm:frame-p-5">
        <Label className="justify-between gap-2">
          <span className="flex items-center gap-2">
            <BellIcon size={16} className="text-muted-foreground" />
            {t({ en: "Alerts", zh: "提醒" })}
          </span>
          <Switch defaultChecked />
        </Label>
        <Badge size="sm" variant="primary">
          {t({ en: "3 new", zh: "3 条新消息" })}
        </Badge>
      </div>
      <div className="frame-inner frame-p-4 flex flex-col justify-center gap-2 bg-card shadow-raised sm:frame-p-5">
        <div className="relative">
          <SearchIcon size={14} className="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label={t({ en: "Search", zh: "搜索" })} placeholder={t({ en: "Search", zh: "搜索" })} className="ps-8" />
        </div>
        <Button size="sm" className="w-full">
          {t({ en: "Save", zh: "保存" })}
        </Button>
      </div>
    </div>
  )
}

/* ───────────── Icons ───────────── */

type IconFn = (p: { size?: number }) => React.ReactElement
const ICON_NAMES = [
  "HomeIcon",
  "InboxIcon",
  "CalendarDaysIcon",
  "ChatIcon",
  "SearchIcon",
  "BellIcon",
  "FolderIcon",
  "ImageIcon",
  "SettingsIcon",
  "UserIcon",
  "HeartIcon",
  "SparklesIcon",
  "CameraIcon",
  "CloudIcon",
  "LockIcon",
  "SendIcon",
] as const
const SETS = { rounded: Rounded, puffy: Puffy, outline: Outline } as unknown as Record<"rounded" | "puffy" | "outline", Record<string, IconFn>>
type IconStyle = keyof typeof SETS
const STYLE_LABEL: Record<IconStyle, Localized> = {
  rounded: { en: "Rounded", zh: "圆润" },
  puffy: { en: "Puffy", zh: "饱满" },
  outline: { en: "Outline", zh: "线框" },
}

function IconStylePicker({ value, onChange }: { value: IconStyle; onChange: (v: IconStyle) => void }) {
  const t = useT()
  return (
    <SegmentedControl value={value} onValueChange={(v) => v in SETS && onChange(v as IconStyle)} aria-label={t({ en: "Icon style", zh: "图标风格" })}>
      {(Object.keys(SETS) as IconStyle[]).map((s) => (
        <SegmentedControlItem key={s} value={s}>
          {t(STYLE_LABEL[s])}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  )
}

function IconsVisual({ style }: { style: IconStyle }) {
  const still = useStill()
  const set = SETS[style]
  return (
    <div className="frame-3xl frame-p-3 grid grid-cols-4 gap-3 rounded-3xl bg-card/55 shadow-raised backdrop-blur-xl sm:frame-p-4">
      {ICON_NAMES.map((name, i) => {
        const Icon = set[name] ?? (Rounded as unknown as Record<string, IconFn>)[name]
        return (
          <div key={name} className="frame-inner relative flex aspect-square items-center justify-center bg-background shadow-raised">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={style}
                aria-hidden
                className="flex"
                initial={{ opacity: 0, scale: still ? 1 : 0.6, filter: still ? "blur(0px)" : "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: still ? 1 : 0.6, filter: still ? "blur(0px)" : "blur(4px)" }}
                transition={{ type: "spring", duration: 0.35, bounce: 0, delay: still ? 0 : i * 0.015 }}
              >
                <Icon size={24} />
              </motion.span>
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ───────────── Own the code ───────────── */

function CodeVisual({ html }: { html: string }) {
  const t = useT()
  const [file, setFile] = React.useState<string | null>("components/ui/button.tsx")
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
      <div className="frame-2xl frame-p-2 hidden rounded-2xl bg-card/70 shadow-raised backdrop-blur-xl sm:col-span-2 sm:block">
        <FileTree variant="ghost" label={t({ en: "Project files", zh: "项目文件" })} value={file} onValueChange={setFile} defaultExpanded={["app", "components", "components/ui"]}>
          <FileTreeFolder name="app">
            <FileTreeFile name="layout.tsx" />
            <FileTreeFile name="page.tsx" />
          </FileTreeFolder>
          <FileTreeFolder name="components">
            <FileTreeFolder name="ui">
              <FileTreeFile name="button.tsx" />
              <FileTreeFile name="card.tsx" />
              <FileTreeFile name="dialog.tsx" />
              <FileTreeFile name="tabs.tsx" />
            </FileTreeFolder>
          </FileTreeFolder>
          <FileTreeFile name="paneui.json" />
        </FileTree>
      </div>
      <CodeBlock html={html} title="components/ui/button.tsx" language="tsx" lineNumbers className="min-w-0 shadow-xl sm:col-span-5" />
    </div>
  )
}

export function Features({ codeHtml }: { codeHtml: string }) {
  const t = useT()
  const [iconStyle, setIconStyle] = React.useState<IconStyle>("rounded")
  return (
    <>
      <FeatureCard
        id="feature-platforms"
        tone="lilac"
        eyebrow="Web + React Native"
        title={[t({ en: "One design,", zh: "一套设计，" }), t({ en: "two platforms.", zh: "两个平台。" })]}
        body={t({
          en: "Web and Native components read the same tokens. Each keeps the feel of its own platform.",
          zh: "Web 与 Native 组件读取同一套设计变量，各自保留平台本身的手感。",
        })}
        link={
          // The showcase is a separate app on the same host, so a plain link leaves the router.
          <Button variant="glass" shape="pill" size="xl" nativeButton={false} render={<a href="/native/" />}>
            {t({ en: "Open the Native showcase", zh: "打开 Native 展示" })}
            <ButtonArrow />
          </Button>
        }
        points={[
          { icon: <MonitorIcon />, label: t({ en: "Desktop density", zh: "桌面密度" }) },
          { icon: <SmartphoneIcon />, label: t({ en: "Touch sizes", zh: "触控尺寸" }) },
          { icon: <PaletteIcon />, label: t({ en: "Shared tokens", zh: "共享变量" }) },
          { icon: <MoonIcon />, label: t({ en: "Dark mode", zh: "深色模式" }) },
        ]}
        visual={<PlatformsVisual />}
      />

      <FeatureCard
        id="feature-theming"
        tone="butter"
        flip
        eyebrow={t({ en: "Theming", zh: "主题" })}
        title={[t({ en: "Pick a colour.", zh: "选一个颜色，" }), t({ en: "Watch it spread.", zh: "看它铺满全站。" })]}
        body={t({
          en: "Accent and radius change this whole site. The same values ship with your theme.",
          zh: "主题色和圆角会改变整个网站，同样的值也随你的主题一起交付。",
        })}
        extra={<ThemeControls />}
        link={
          <Button variant="glass" shape="pill" size="xl" nativeButton={false} render={<Link href="/docs/theming" />}>
            {t({ en: "Theming guide", zh: "主题指南" })}
            <ButtonArrow />
          </Button>
        }
        visual={<Specimen />}
      />

      <FeatureCard
        id="feature-icons"
        tone="mint"
        eyebrow={t({ en: "Icons", zh: "图标" })}
        title={[t({ en: "Icons drawn", zh: "图标与组件" }), t({ en: "on the same grid.", zh: "画在同一网格上。" })]}
        body={t({
          en: "Three styles share every name. Swap the import and the whole app follows.",
          zh: "三种风格共用同一套名称，换一个导入，整个应用随之切换。",
        })}
        extra={<IconStylePicker value={iconStyle} onChange={setIconStyle} />}
        link={
          <Button variant="glass" shape="pill" size="xl" nativeButton={false} render={<Link href="/docs/icons" />}>
            {t({ en: "Browse icons", zh: "浏览图标" })}
            <ButtonArrow />
          </Button>
        }
        visual={<IconsVisual style={iconStyle} />}
      />

      <FeatureCard
        id="feature-code"
        tone="peach"
        flip
        eyebrow={t({ en: "Open code", zh: "开放源码" })}
        title={[t({ en: "The source is yours.", zh: "源码归你，" }), t({ en: "Edit any line.", zh: "每一行都能改。" })]}
        body={t({
          en: "The CLI copies each component into your project. Nothing hides in a package.",
          zh: "CLI 把每个组件复制进你的项目，没有藏在包里的代码。",
        })}
        link={
          <Button variant="glass" shape="pill" size="xl" nativeButton={false} render={<Link href="/docs/cli" />}>
            {t({ en: "CLI reference", zh: "CLI 文档" })}
            <ButtonArrow />
          </Button>
        }
        points={[
          { icon: <CodeIcon />, label: t({ en: "Plain TSX", zh: "普通 TSX" }) },
          { icon: <TerminalIcon />, label: t({ en: "One command", zh: "一条命令" }) },
          { icon: <RefreshIcon />, label: t({ en: "Update on demand", zh: "按需更新" }) },
          { icon: <GitBranchIcon />, label: t({ en: "Lives in your repo", zh: "留在你的仓库" }) },
        ]}
        visual={<CodeVisual html={codeHtml} />}
      />
    </>
  )
}

