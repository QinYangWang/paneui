"use client"

import * as React from "react"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { LiveCodeBlock } from "@/components/docs/live-code-block"
import { ActionSwapBlurIcon } from "@/registry/base-nova/ui/action-swap-blur"
import { useCopy } from "@/registry/base-nova/ui/code-block"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardPanel } from "@/registry/base-nova/ui/card"
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Input } from "@/registry/base-nova/ui/input"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { Slider } from "@/registry/base-nova/ui/slider"
import { Switch } from "@/registry/base-nova/ui/switch"

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

/**
 * Live radius: a preset or a custom value rescales every radius token on the site through
 * `--radius`; "Copy radius CSS" exports the one override.
 */
export function ThemingRadius() {
  const state = useRadiusState()
  const { copied, copy } = useCopy()
  const rem = radiusValue(state)
  const label = state.radius === "custom" ? `custom ${rem}rem` : RADIUS_LABELS[state.radius].toLowerCase()
  const css = radiusCss(rem, label)

  return (
    <div className="flex flex-col gap-4">
      <Card variant="inset" data-md-text="The web page has a live radius picker here: choose a preset or drag for your own value to see it on real controls. The CSS below is for the default radius.">
        <CardPanel className="gap-0 py-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-4 py-3">
            <SegmentedControl
              value={state.radius}
              onValueChange={(v) => isChoice(v) && setRadius(v, v === "custom" ? (state.custom ?? rem) : undefined)}
              aria-label="Radius preset"
            >
              {RADII.map((r) => (
                <SegmentedControlItem key={r} value={r}>
                  {RADIUS_LABELS[r] === "Extra large" ? "XL" : RADIUS_LABELS[r]}
                </SegmentedControlItem>
              ))}
              <SegmentedControlItem value="custom">Custom</SegmentedControlItem>
            </SegmentedControl>
            <div className="flex min-w-48 flex-1 items-center gap-3">
              <Slider
                value={rem}
                min={RADIUS_MIN}
                max={RADIUS_MAX}
                step={0.0625}
                onValueChange={(v) => setRadius("custom", typeof v === "number" ? v : v[0])}
                aria-label="Custom radius"
                className="flex-1"
              />
              <span className="w-24 shrink-0 text-end font-mono text-ui-sm text-muted-foreground tabular-nums">
                {rem}rem · {px(rem)}px
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setRadius(DEFAULT_RADIUS, null)}>
              Reset
            </Button>
          </div>

          <div className="grid gap-x-8 gap-y-5 px-4 py-5 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button>Deploy</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="secondary" size="xs">
                  Draft
                </Button>
                <Badge variant="primary">Selected</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Input placeholder="Search" aria-label="Search" className="flex-1" />
                <label className="flex items-center gap-2 text-ui">
                  <Checkbox defaultChecked />
                  Notify
                </label>
                <Switch defaultChecked aria-label="Sync" />
              </div>
            </div>
            {/* Nested surfaces: each level follows its frame, so corners stay concentric at any radius. */}
            <div className="frame-2xl frame-p-1.5 bg-secondary">
              <div className="frame-inner frame-p-1 flex flex-col bg-card shadow-raised">
                {["Inbox", "Drafts", "Archive"].map((row, i) => (
                  <div
                    key={row}
                    data-active={i === 0 || undefined}
                    className="flex h-7 items-center gap-2 rounded-inner px-2 text-ui data-active:bg-foreground/6"
                  >
                    {row}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardPanel>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <p className="min-w-0 flex-1 basis-64 text-sm text-pretty text-muted-foreground">
          Every radius token is a multiple of this one value and stops at 16px, so the override is a single line.
        </p>
        <Button onClick={() => copy(css)}>
          <ActionSwapBlurIcon value={copied ? "copied" : "copy"}>
            {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          </ActionSwapBlurIcon>
          {copied ? "Copied" : "Copy radius CSS"}
        </Button>
      </div>
      <LiveCodeBlock code={css} title="globals.css" copyable={false} />
    </div>
  )
}
