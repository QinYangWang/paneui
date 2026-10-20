"use client"

import * as React from "react"

import { BellIcon, MoonIcon, SearchIcon, SunIcon } from "@paneui/ui/icons"
import { AvatarStatus } from "@paneui/ui/components/avatar"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { GeneratedAvatar } from "@paneui/ui/components/generated-avatar"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import { Progress, ProgressLabel, ProgressValue } from "@paneui/ui/components/progress"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { Slider } from "@paneui/ui/components/slider"
import { SwatchPicker } from "@paneui/ui/components/swatch-picker"
import { Switch } from "@paneui/ui/components/switch"
import { useThemeToggle } from "@paneui/ui/components/theme-toggle"
import { PRESET_LABELS, PRESET_THEMES, type PresetAccent } from "@/components/docs/accent-color"
import { setAccent, useAccentState } from "@/components/docs/accent-store"
import { RADIUS_MAX, RADIUS_MIN, radiusValue, setRadius, useRadiusState, type RadiusChoice } from "@/components/docs/radius-store"
import { RADII, THEME_KEY } from "@/components/docs/theme-script"
import { siteCopy } from "@/lib/site-copy"
import { T, useT } from "@/lib/site-locale"

import { Eyebrow } from "./pane-mark"
import { Reveal } from "./reveal"

const RADIUS_SHORT: Record<(typeof RADII)[number], string> = { none: "0", sm: "S", default: "M", lg: "L", xl: "XL" }
const isRadius = (v: unknown): v is RadiusChoice => v === "custom" || (RADII as readonly string[]).includes(v as string)
const px = (rem: number) => Math.round(rem * 16)

function Controls() {
  const t = useT()
  const { accent } = useAccentState()
  const radius = useRadiusState()
  const rem = radiusValue(radius)
  const { theme, setTheme } = useThemeToggle({ storageKey: THEME_KEY })
  const swatches = (Object.keys(PRESET_LABELS) as PresetAccent[]).map((a) => ({
    value: a,
    label: t(siteCopy(PRESET_LABELS[a])),
    color: a === "neutral" ? "var(--foreground)" : PRESET_THEMES[a].light.primary,
  }))
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <span className="text-ui-sm font-medium text-muted-foreground">{t({ en: "Accent", zh: "主题色" })}</span>
        <SwatchPicker
          aria-label={t({ en: "Accent", zh: "主题色" })}
          swatches={swatches}
          value={accent === "custom" ? "" : accent}
          onValueChange={(v) => setAccent(v as PresetAccent)}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-ui-sm font-medium text-muted-foreground">{t({ en: "Radius", zh: "圆角" })}</span>
          <span className="font-mono text-ui-sm text-muted-foreground tabular-nums">{px(rem)}px</span>
        </div>
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
        <Slider
          value={rem}
          min={RADIUS_MIN}
          max={RADIUS_MAX}
          step={0.0625}
          onValueChange={(v) => setRadius("custom", typeof v === "number" ? v : v[0])}
          aria-label={t({ en: "Custom radius", zh: "自定义圆角" })}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <span className="text-ui-sm font-medium text-muted-foreground">{t({ en: "Mode", zh: "外观" })}</span>
        <SegmentedControl
          value={theme ?? "light"}
          onValueChange={(v) => (v === "light" || v === "dark") && setTheme(v)}
          aria-label={t({ en: "Mode", zh: "外观" })}
          className="w-full"
        >
          <SegmentedControlItem value="light" className="flex-1">
            <SunIcon data-icon="inline-start" />
            {t(siteCopy("Light"))}
          </SegmentedControlItem>
          <SegmentedControlItem value="dark" className="flex-1">
            <MoonIcon data-icon="inline-start" />
            {t(siteCopy("Dark"))}
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
    </div>
  )
}

/** Four tiles that follow the live radius: every corner, nested or not, stays concentric. */
function Specimen() {
  const t = useT()
  const radius = useRadiusState()
  const rem = radiusValue(radius)
  return (
    <div className="frame-3xl frame-p-2 grid w-full grid-cols-2 gap-2 rounded-3xl bg-muted shadow-xl dark:bg-background">
      <div className="frame-inner frame-p-5 flex aspect-square flex-col justify-between bg-primary text-primary-foreground">
        <span className="font-mono text-ui-xs opacity-80">--radius</span>
        <span className="flex items-baseline gap-1 font-serif leading-none tabular-nums">
          <span className="text-7xl sm:text-9xl">{px(rem)}</span>
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

export function Tune() {
  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
      <Reveal className="flex flex-col gap-6">
        <Eyebrow index={0}>
          <T en="Make it yours" zh="随你定制" />
        </Eyebrow>
        <h2 className="text-balance break-keep text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
          <T en="One radius. Every corner." zh="一个半径，牵动每个圆角。" />
        </h2>
        <p className="max-w-md text-pretty break-keep text-lg leading-relaxed text-muted-foreground">
          <T en="Pick an accent and a radius. This page follows, and so will your app." zh="选一个主题色和圆角，这一页随之改变，你的应用也一样。" />
        </p>
        <div className="max-w-md">
          <Controls />
        </div>
      </Reveal>
      <Reveal delay={0.08} className="mx-auto w-full max-w-xl">
        <Specimen />
      </Reveal>
    </section>
  )
}
