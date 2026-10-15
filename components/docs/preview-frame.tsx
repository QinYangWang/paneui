"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { useSearchParams } from "next/navigation"

import { ControlSizeContext, type ControlSize } from "@/lib/control-size"

import { demos } from "./demos"
import { examples } from "./examples.generated"
import { ThemeSync } from "./theme-sync"

const SIZES: ControlSize[] = ["xs", "sm", "default", "lg"]

/** The demo or example named in the query string, centred on the page background. */
export function PreviewFrame() {
  const params = useSearchParams()
  const demo = params.get("demo")
  const example = params.get("example")
  const size = params.get("size") as ControlSize | null
  const dir = params.get("dir") === "rtl" ? "rtl" : "ltr"
  const Demo = example ? examples[example] : demo ? demos[demo] : undefined
  const content = Demo ? <Demo /> : <p className="text-ui text-muted-foreground">Nothing to preview.</p>
  return (
    <>
      <ThemeSync />
      <DirectionProvider direction={dir}>
        <div dir={dir} data-slot="preview-frame" className="flex min-h-svh items-center justify-center p-6 sm:p-10">
          {size && SIZES.includes(size) ? <ControlSizeContext.Provider value={size}>{content}</ControlSizeContext.Provider> : content}
        </div>
      </DirectionProvider>
    </>
  )
}
