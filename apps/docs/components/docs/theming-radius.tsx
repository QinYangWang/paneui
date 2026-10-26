"use client"

import * as React from "react"

import { CheckIcon, CopyIcon } from "@paneui/ui/icons"
import { LiveCodeBlock } from "@/components/docs/live-code-block"
import { ActionSwapBlurIcon } from "@paneui/ui/components/action-swap-blur"
import { useCopy } from "@paneui/ui/components/code-block"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { Card, CardPanel } from "@paneui/ui/components/card"
import { Checkbox } from "@paneui/ui/components/checkbox"
import { Input } from "@paneui/ui/components/input"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { Slider } from "@paneui/ui/components/slider"
import { Switch } from "@paneui/ui/components/switch"
import { T, useT } from "@/lib/site-locale"

import {
  DEFAULT_RADIUS,
  RADIUS_LABELS,
  RADIUS_MAX,
  RADIUS_MIN,
  radiusCss,
  radiusValue,
  setRadius,
  useRadiusState,
  type RadiusChoice,
} from "./radius-store"
import { RADII } from "./theme-script"

const isChoice = (v: unknown): v is RadiusChoice => v === "custom" || (RADII as readonly string[]).includes(v as string)
const px = (rem: number) => Math.round(rem * 16 * 10) / 10

const RADIUS_LABEL_ZH: Record<string, string> = { none: "无", sm: "小", default: "默认", lg: "大", xl: "特大" }

const ROWS: { en: string; zh: string }[] = [
  { en: "Inbox", zh: "收件箱" },
  { en: "Drafts", zh: "草稿" },
  { en: "Archive", zh: "归档" },
]

/**
 * Live radius: a preset or a custom value rescales every radius token on the site through
 * `--radius`; "Copy radius CSS" exports the one override.
 */
export function ThemingRadius() {
  const state = useRadiusState()
  const t = useT()
  const { copied, copy } = useCopy()
  const rem = radiusValue(state)
  const label = state.radius === "custom" ? `custom ${rem}rem` : RADIUS_LABELS[state.radius].toLowerCase()
  const css = radiusCss(rem, label)

  return (
    <div className="flex flex-col gap-4">
      <Card
        variant="inset"
        data-md-text={t({
          en: "The web page has a live radius picker here: choose a preset or drag for your own value to see it on real controls. The CSS below is for the default radius.",
          zh: "网页上这里有一个实时圆角选择器：选择一个预设，或拖动滑块得到自己的值，在真实控件上查看效果。下面的 CSS 是默认圆角对应的值。",
        })}
      >
        <CardPanel className="gap-0 py-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-4 py-3">
            <SegmentedControl
              value={state.radius}
              onValueChange={(v) => isChoice(v) && setRadius(v, v === "custom" ? (state.custom ?? rem) : undefined)}
              aria-label={t({ en: "Radius preset", zh: "圆角预设" })}
            >
              {RADII.map((r) => (
                <SegmentedControlItem key={r} value={r}>
                  {RADIUS_LABELS[r] === "Extra large" ? "XL" : <T en={RADIUS_LABELS[r]} zh={RADIUS_LABEL_ZH[r]} />}
                </SegmentedControlItem>
              ))}
              <SegmentedControlItem value="custom">
                <T en="Custom" zh="自定义" />
              </SegmentedControlItem>
            </SegmentedControl>
            <div className="flex min-w-48 flex-1 items-center gap-3">
              <Slider
                value={rem}
                min={RADIUS_MIN}
                max={RADIUS_MAX}
                step={0.0625}
                onValueChange={(v) => setRadius("custom", typeof v === "number" ? v : v[0])}
                aria-label={t({ en: "Custom radius", zh: "自定义圆角" })}
                className="flex-1"
              />
              <span className="w-24 shrink-0 text-end font-mono text-ui-sm text-muted-foreground tabular-nums">
                {rem}rem · {px(rem)}px
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setRadius(DEFAULT_RADIUS, null)}>
              <T en="Reset" zh="重置" />
            </Button>
          </div>

          <div className="grid gap-x-8 gap-y-5 px-4 py-5 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button>
                  <T en="Deploy" zh="部署" />
                </Button>
                <Button variant="outline">
                  <T en="Cancel" zh="取消" />
                </Button>
                <Button variant="secondary" size="xs">
                  <T en="Draft" zh="草稿" />
                </Button>
                <Badge variant="primary">
                  <T en="Selected" zh="已选中" />
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  placeholder={t({ en: "Search", zh: "搜索" })}
                  aria-label={t({ en: "Search", zh: "搜索" })}
                  className="flex-1"
                />
                <label className="flex items-center gap-2 text-ui">
                  <Checkbox defaultChecked />
                  <T en="Notify" zh="通知" />
                </label>
                <Switch defaultChecked aria-label={t({ en: "Sync", zh: "同步" })} />
              </div>
            </div>
            {/* Nested surfaces: each level follows its frame, so corners stay concentric at any radius. */}
            <div className="frame-2xl frame-p-1.5 bg-secondary">
              <div className="frame-inner frame-p-1 flex flex-col bg-card shadow-raised">
                {ROWS.map((row, i) => (
                  <div
                    key={row.en}
                    data-active={i === 0 || undefined}
                    className="flex h-7 items-center gap-2 rounded-inner px-2 text-ui data-active:bg-foreground/6"
                  >
                    <T en={row.en} zh={row.zh} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardPanel>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <p className="min-w-0 flex-1 basis-64 text-sm text-pretty text-muted-foreground">
          <T
            en="Every radius token is a multiple of this one value and stops at 16px, so the override is a single line."
            zh="每个圆角变量都是这个值的倍数，并且最大为 16px，所以覆盖只需一行。"
          />
        </p>
        <Button onClick={() => copy(css)}>
          <ActionSwapBlurIcon value={copied ? "copied" : "copy"}>
            {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          </ActionSwapBlurIcon>
          {copied ? <T en="Copied" zh="已复制" /> : <T en="Copy radius CSS" zh="复制圆角 CSS" />}
        </Button>
      </div>
      <LiveCodeBlock code={css} title="globals.css" copyable={false} />
    </div>
  )
}
