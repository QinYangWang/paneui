"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import * as Rounded from "@paneui/ui/icons"
import {
  BellIcon,
  SearchIcon,
} from "@paneui/ui/icons"
import * as Emoji from "@paneui/ui/icons/emoji/icons"
import { AvatarStatus } from "@paneui/ui/components/avatar"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { CodeBlock } from "@paneui/ui/components/code-block"
import { FileTree, FileTreeFile, FileTreeFolder } from "@paneui/ui/components/file-tree"
import { GeneratedAvatar } from "@paneui/ui/components/generated-avatar"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import { Progress, ProgressLabel, ProgressValue } from "@paneui/ui/components/progress"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { SwatchPicker } from "@paneui/ui/components/swatch-picker"
import { Switch } from "@paneui/ui/components/switch"
import { PRESET_LABELS, PRESET_THEMES, type PresetAccent } from "@/components/docs/accent-color"
import { setAccent, useAccentState } from "@/components/docs/accent-store"
import { radiusValue, setRadius, useRadiusState, type RadiusChoice } from "@/components/docs/radius-store"
import { RADII } from "@/components/docs/theme-script"
import { siteCopy } from "@/lib/site-copy"
import { useT, type Localized } from "@/lib/site-locale"

import { useStill } from "./reveal"

/* ───────────── Theming ───────────── */

const RADIUS_SHORT: Record<(typeof RADII)[number], string> = { none: "0", sm: "S", default: "M", lg: "L", xl: "XL" }
const isRadius = (v: unknown): v is RadiusChoice => v === "custom" || (RADII as readonly string[]).includes(v as string)
const px = (rem: number) => Math.round(rem * 16)

export function AccentControls() {
  const t = useT()
  const { accent } = useAccentState()
  const radius = useRadiusState()
  const swatches = (Object.keys(PRESET_LABELS) as PresetAccent[]).map((a) => ({
    value: a,
    label: t(siteCopy(PRESET_LABELS[a])),
    color: a === "neutral" ? "var(--foreground)" : PRESET_THEMES[a].light.primary,
  }))
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex h-9 items-center rounded-full border border-border bg-card px-3">
        <SwatchPicker
          aria-label={t({ en: "Accent", zh: "主题色" })}
          swatches={swatches}
          value={accent === "custom" ? "" : accent}
          onValueChange={(v) => setAccent(v as PresetAccent)}
        />
      </div>
      <SegmentedControl
        value={radius.radius}
        onValueChange={(v) => isRadius(v) && setRadius(v)}
        aria-label={t({ en: "Radius preset", zh: "圆角预设" })}
      >
        {RADII.map((r) => (
          <SegmentedControlItem key={r} value={r}>
            {RADIUS_SHORT[r]}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </div>
  )
}

/** Four tiles that follow the live accent and radius; nested corners stay concentric. */
export function Specimen() {
  const t = useT()
  const rem = radiusValue(useRadiusState())
  return (
    <div className="frame-3xl frame-p-2 grid w-full grid-cols-2 gap-2 rounded-3xl bg-shell/80 shadow-xl backdrop-blur-xl">
      <div className="frame-inner frame-p-5 flex aspect-square flex-col justify-between bg-primary text-primary-foreground">
        <span className="font-mono text-ui-xs opacity-80">--radius</span>
        <span className="font-heading text-balance flex items-baseline gap-1 tabular-nums">
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
const SETS = { rounded: Rounded, emoji: Emoji } as unknown as Record<"rounded" | "emoji", Record<string, IconFn>>
export type IconStyle = keyof typeof SETS
const STYLE_LABEL: Record<IconStyle, Localized> = {
  rounded: { en: "Rounded", zh: "圆润" },
  emoji: { en: "Emoji", zh: "拟物" },
}

export function IconStylePicker({ value, onChange }: { value: IconStyle; onChange: (v: IconStyle) => void }) {
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

export function IconsVisual({ style }: { style: IconStyle }) {
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

export function CodeVisual({ html }: { html: string }) {
  const t = useT()
  const [file, setFile] = React.useState<string | null>("components/ui/button.tsx")
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
      <div className="hidden overflow-hidden rounded-xl bg-code py-2 shadow-xl sm:col-span-2 sm:block">
        <FileTree label={t({ en: "Project files", zh: "项目文件" })} value={file} onValueChange={setFile} defaultExpanded={["app", "components", "components/ui"]}>
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
