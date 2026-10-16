"use client"

import * as React from "react"

import { ExternalLinkIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"

import { useFrameThemeSync } from "./theme-sync"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
/** Templates are previewed at a desktop viewport and scaled down to fit the card. */
const VIEWPORT = 1440

/**
 * Live, scaled-down preview of a full-page template in an iframe, plus an
 * "Open full page" link. The iframe renders at 1440px wide and is scaled with
 * a CSS transform to the frame's measured width.
 *
 * The iframe is same-origin, so theme and accent are mirrored straight from
 * this page's <html> onto the iframe's <html> the moment they change (and on
 * every load), rather than waiting for the embedded page to re-read storage.
 */
export function TemplatePreview({ name, path = `/templates/${name}/`, height = 440 }: { name: string; path?: string; height?: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = React.useState(0)
  const src = `${BASE_PATH}${path}`

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => entry && setScale(entry.contentRect.width / VIEWPORT))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const syncTheme = useFrameThemeSync(frameRef, scale > 0)

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        ref={ref}
        // Frame height is a prop and the scale is measured, so both are runtime values.
        style={{ "--frame-h": `${height}px` } as React.CSSProperties}
        className="relative h-(--frame-h) w-full overflow-hidden rounded-xl bg-background shadow-raised"
      >
        {scale > 0 && (
          <iframe
            ref={frameRef}
            src={src}
            onLoad={syncTheme}
            title={`${name} template preview`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden
            style={{ "--vw": `${VIEWPORT}px`, "--vh": `${height / scale}px`, "--scale": scale } as React.CSSProperties}
            className="pointer-events-none absolute top-0 left-0 h-(--vh) w-(--vw) origin-top-left scale-(--scale) border-0"
          />
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" nativeButton={false} render={<a href={src} target="_blank" rel="noreferrer" />}>
          Open full page
          <ExternalLinkIcon data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}
