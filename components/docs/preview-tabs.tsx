"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"

import { ExternalLinkIcon } from "@/components/icons"
import { ControlSizeContext, type ControlSize } from "@/lib/control-size"
import { Button } from "@/registry/base-nova/ui/button"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"
import { Toggle } from "@/registry/base-nova/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { demos } from "./demos"
import { examples } from "./examples.generated"
import { useFrameThemeSync } from "./theme-sync"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** "fit" renders inline at the card's width; the others load the /preview frame at a device width. */
type Viewport = "fit" | "desktop" | "tablet" | "mobile"
const VIEWPORTS: { value: Viewport; label: string; width?: number }[] = [
  { value: "fit", label: "Fit" },
  { value: "desktop", label: "Desktop", width: 1024 },
  { value: "tablet", label: "Tablet", width: 768 },
  { value: "mobile", label: "Mobile", width: 390 },
]
const SIZES: { value: ControlSize | "auto"; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "xs", label: "XS" },
  { value: "sm", label: "SM" },
  { value: "default", label: "MD" },
  { value: "lg", label: "LG" },
]

const isViewport = (v: unknown): v is Viewport => VIEWPORTS.some((x) => x.value === v)
const isSize = (v: unknown): v is ControlSize | "auto" => SIZES.some((x) => x.value === v)

/**
 * A device-width preview: the /preview frame in an iframe at `width`, scaled down to fit the
 * card when it is wider, grown to its content's height, and kept in the docs' theme.
 */
function DeviceFrame({ src, width, title }: { src: string; width: number; title: string }) {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const [box, setBox] = React.useState(0)
  const [height, setHeight] = React.useState(420)
  const scale = box > 0 ? Math.min(1, box / width) : 0

  React.useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => e && setBox(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const sync = useFrameThemeSync(frameRef)

  // Follow the framed page's height (popups and accordions change it).
  const onLoad = React.useCallback(() => {
    sync()
    const doc = frameRef.current?.contentDocument
    const body = doc?.querySelector<HTMLElement>("[data-slot=preview-frame]")
    if (!body) return
    const measure = () => setHeight(Math.min(900, Math.max(320, Math.ceil(body.scrollHeight))))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(body)
    frameRef.current?.addEventListener("load", () => ro.disconnect(), { once: true })
  }, [sync])

  return (
    <div ref={boxRef} className="flex w-full justify-center">
      {scale > 0 && (
        <div
          style={{ "--w": `${width * scale}px`, "--h": `${height * scale}px` } as React.CSSProperties}
          className="relative h-(--h) w-(--w) overflow-hidden rounded-inner bg-background shadow-raised"
        >
          <iframe
            ref={frameRef}
            src={src}
            title={title}
            onLoad={onLoad}
            loading="lazy"
            style={{ "--vw": `${width}px`, "--vh": `${height}px`, "--scale": scale } as React.CSSProperties}
            className="absolute top-0 left-0 h-(--vh) w-(--vw) origin-top-left scale-(--scale) border-0"
          />
        </div>
      )}
    </div>
  )
}

/**
 * Preview / Code tabs with a preview toolbar: viewport (fit, or a device width in an iframe so
 * media and container queries react), control size and text direction.
 * `name` is a gallery demo key; `example` ("<name>/<id>") picks a docs example instead.
 */
export function PreviewTabs({
  name,
  example,
  code,
  className,
}: {
  name?: string
  example?: string
  code: React.ReactNode
  className?: string
}) {
  const Demo = example ? examples[example] : name ? demos[name] : undefined
  const [tab, setTab] = React.useState("preview")
  const [viewport, setViewport] = React.useState<Viewport>("fit")
  const [size, setSize] = React.useState<ControlSize | "auto">("auto")
  const [rtl, setRtl] = React.useState(false)
  const dir = rtl ? "rtl" : "ltr"

  const query = new URLSearchParams({ ...(example ? { example } : { demo: name ?? "" }), ...(size !== "auto" ? { size } : {}), ...(rtl ? { dir } : {}) })
  const src = `${BASE_PATH}/preview/?${query.toString()}`
  const device = VIEWPORTS.find((v) => v.value === viewport)

  const inline = Demo ? <Demo /> : null
  const sized = size === "auto" ? inline : <ControlSizeContext.Provider value={size}>{inline}</ControlSizeContext.Provider>

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(String(v))} className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <TabsList>
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsList>
        {tab === "preview" && (
          <div data-slot="preview-toolbar" className="ms-auto flex flex-wrap items-center gap-2">
            {/* Device widths need room to compare against; small screens keep the inline preview. */}
            <div className="max-md:hidden">
              <SegmentedControl size="xs" value={viewport} onValueChange={(v) => isViewport(v) && setViewport(v)} aria-label="Viewport">
                {VIEWPORTS.map((v) => (
                  <SegmentedControlItem key={v.value} value={v.value}>
                    {v.label}
                  </SegmentedControlItem>
                ))}
              </SegmentedControl>
            </div>
            <SegmentedControl size="xs" value={size} onValueChange={(v) => isSize(v) && setSize(v)} aria-label="Control size">
              {SIZES.map((s) => (
                <SegmentedControlItem key={s.value} value={s.value}>
                  {s.label}
                </SegmentedControlItem>
              ))}
            </SegmentedControl>
            <Toggle size="xs" variant="outline" pressed={rtl} onPressedChange={setRtl} aria-label="Right-to-left">
              RTL
            </Toggle>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    nativeButton={false}
                    render={<a href={src} target="_blank" rel="noreferrer" />}
                    aria-label="Open preview in a new tab"
                  />
                }
              >
                <ExternalLinkIcon />
              </TooltipTrigger>
              <TooltipContent>Open in a new tab</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
      <TabsPanel value="preview">
        {device?.width ? (
          <div className="frame-2xl frame-p-3 bg-secondary">
            <DeviceFrame key={src + device.width} src={src} width={device.width} title={`${example ?? name} preview, ${device.label}`} />
          </div>
        ) : (
          <div
            dir={dir}
            className={
              example
                ? "flex min-h-56 items-center justify-center rounded-xl bg-card p-5 shadow-raised sm:p-8"
                : "flex min-h-80 items-center justify-center rounded-xl bg-card p-5 shadow-raised sm:p-10"
            }
          >
            <DirectionProvider direction={dir}>{sized}</DirectionProvider>
          </div>
        )}
      </TabsPanel>
      <TabsPanel value="code">{code}</TabsPanel>
    </Tabs>
  )
}
