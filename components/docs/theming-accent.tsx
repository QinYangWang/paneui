"use client"

import * as React from "react"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { AgentCodeBlock, useCopy } from "@/registry/base-nova/ui/agent-code-block"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardPanel } from "@/registry/base-nova/ui/card"
import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/registry/base-nova/ui/color-picker"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"
import { Slider } from "@/registry/base-nova/ui/slider"
import { Switch } from "@/registry/base-nova/ui/switch"

import { DEFAULT_ACCENT, oklchToHex, parseOklch, PRESET_LABELS, PRESET_THEMES, RAMP_STOPS, themeCss, type PresetAccent } from "./accent-color"
import { setAccent, setCustomAccent, useAccentState } from "./accent-store"

const PRESETS = Object.keys(PRESET_THEMES) as PresetAccent[]
const CHARTS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-chart-6", "bg-chart-7", "bg-chart-8"]


/**
 * Live accent: presets and a custom colour recolour the whole site (header, demos,
 * template previews) by switching `data-accent` on <html>; "Copy theme CSS" exports
 * the exact ramp and :root/.dark overrides for the current pick.
 */
export function ThemingAccent() {
  const { accent, custom } = useAccentState()
  const { copied, copy } = useCopy()
  const preset = PRESET_THEMES[accent === "custom" ? DEFAULT_ACCENT : accent]
  const theme = accent === "custom" && custom ? custom : preset
  const label = accent === "custom" && custom ? `custom ${custom.hex}` : PRESET_LABELS[accent as PresetAccent].toLowerCase()
  const css = themeCss(theme, label)

  // The picker shows the custom colour once there is one, otherwise the current light primary.
  const pickerHex = custom?.hex ?? oklchToHex(parseOklch(preset.light.primary) ?? { l: 0.546, c: 0.245, h: 262.9 })
  const ramp = theme.ramp ?? preset.ramp ?? []

  // Coalesce drag updates to one per frame (each writes localStorage and re-syncs template iframes).
  const frame = React.useRef<number | null>(null)
  const pending = React.useRef<string | null>(null)
  const pick = React.useCallback((hex: string) => {
    pending.current = hex
    if (frame.current !== null) return
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      if (pending.current) setCustomAccent(pending.current)
    })
  }, [])
  React.useEffect(() => () => void (frame.current !== null && cancelAnimationFrame(frame.current)), [])

  return (
    <div className="flex flex-col gap-4">
      <Card variant="inset">
        <CardPanel className="gap-0 py-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-4 py-3">
            <div role="radiogroup" aria-label="Accent preset" className="flex items-center gap-2">
              {PRESETS.map((p) => {
                const checked = accent === p
                return (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    aria-label={PRESET_LABELS[p]}
                    title={PRESET_LABELS[p]}
                    onClick={() => setAccent(p)}
                    className="grid size-8 cursor-pointer place-items-center rounded-full outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50 aria-checked:ring-2 aria-checked:ring-foreground/70"
                  >
                    {/* Left half: the light-mode primary; right half: the dark-mode one. */}
                    <span
                      aria-hidden
                      className="flex size-6 overflow-hidden rounded-full shadow-chip"
                      style={{ "--sl": PRESET_THEMES[p].light.primary, "--sd": PRESET_THEMES[p].dark.primary } as React.CSSProperties}
                    >
                      <span className="flex-1 bg-(--sl)" />
                      <span className="flex-1 bg-(--sd)" />
                    </span>
                  </button>
                )
              })}
            </div>
            <span aria-hidden className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <ColorPicker value={pickerHex} onValueChange={pick}>
                <ColorPickerTrigger showHex aria-label="Custom accent colour" />
                <ColorPickerContent>
                  <ColorPickerArea />
                  <ColorPickerHue />
                  <div className="flex items-center gap-2">
                    <ColorPickerSwatch className="size-8" />
                    <ColorPickerHexInput />
                  </div>
                </ColorPickerContent>
              </ColorPicker>
              {accent === "custom" ? (
                <Badge variant="primary" size="sm">
                  Custom
                </Badge>
              ) : custom ? (
                <Button variant="ghost" size="xs" onClick={() => setAccent("custom")}>
                  Use custom
                </Button>
              ) : null}
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setAccent(DEFAULT_ACCENT, null)}>
              Reset
            </Button>
          </div>

          <div className="flex flex-col gap-1.5 border-b px-4 py-3">
            <div className="flex h-6 overflow-hidden rounded-md shadow-chip" role="img" aria-label="Accent ramp, 50 to 950">
              {ramp.map((v, i) => (
                <span key={RAMP_STOPS[i]} className="flex-1 bg-(--stop)" style={{ "--stop": v } as React.CSSProperties} />
              ))}
            </div>
            <div aria-hidden className="flex font-mono text-ui-2xs text-muted-foreground tabular-nums">
              {RAMP_STOPS.map((s) => (
                <span key={s} className="flex-1 text-center">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-5 px-4 py-5 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button>Deploy</Button>
                <Button variant="outline">Cancel</Button>
                <Badge variant="primary">Selected</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-ui">
                <label className="flex items-center gap-2">
                  <Switch defaultChecked aria-label="Sync" />
                  Sync
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox defaultChecked />
                  Notify
                </label>
                <RadioGroup defaultValue="a" aria-label="Plan" className="flex-row gap-4">
                  <label className="flex items-center gap-2">
                    <Radio value="a" />
                    Pro
                  </label>
                  <label className="flex items-center gap-2">
                    <Radio value="b" />
                    Team
                  </label>
                </RadioGroup>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Slider defaultValue={62} aria-label="Volume" />
              <div className="flex items-center gap-3">
                <div className="flex h-8 flex-1 items-center rounded-lg bg-card px-3 text-ui text-muted-foreground shadow-well ring-2 ring-ring/50">
                  Focus ring
                </div>
                <span className="text-ui font-medium text-primary underline underline-offset-4">Link</span>
                <span className="flex items-center gap-1" title="Charts keep their own colours">
                  {CHARTS.map((c) => (
                    <span key={c} className={`block size-2.5 rounded-full ${c}`} />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </CardPanel>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <p className="min-w-0 flex-1 text-sm text-muted-foreground">
          Take it home: paste these overrides after the theme variables. The eleven ramp stops plus primary, its text and the ring; nothing else changes.
        </p>
        <Button onClick={() => copy(css)}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy theme CSS"}
        </Button>
      </div>
      <AgentCodeBlock code={css} filename="globals.css" language="css" showLineNumbers={false} copyable={false} />
    </div>
  )
}
