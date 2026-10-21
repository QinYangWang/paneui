"use client"

import { useT } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"

import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

import { setStyle, STYLE_LABELS, useStyle } from "./style-store"
import { STYLES, type StylePreset } from "./theme-script"

const isStyle = (v: unknown): v is StylePreset => (STYLES as readonly unknown[]).includes(v)

/** Live style switch: flips `data-style` on the whole site, its previews and template frames. */
export function ThemingStyle() {
  const t = useT()
  const style = useStyle()
  return (
    <div data-md-text="The web page has a live style switch here (Default or Paper)." className="flex">
      <SegmentedControl value={style} onValueChange={(v) => isStyle(v) && setStyle(v)} aria-label={t(siteCopy("Style"))}>
        {STYLES.map((s) => (
          <SegmentedControlItem key={s} value={s}>
            {t(siteCopy(STYLE_LABELS[s]))}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    </div>
  )
}
