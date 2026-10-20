"use client"

import { useT } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { demos } from "./demos"
import { examples } from "./examples.generated"
import { ThemeSync } from "./theme-sync"

/** The demo or example named in the query string, centred on the page background. */
export function PreviewFrame() {
  const t = useT()
  const label = (text: string) => t(siteCopy(text))
  const params = useSearchParams()
  const demo = params.get("demo")
  const example = params.get("example")
  const Demo = example ? examples[example] : demo ? demos[demo] : undefined
  return (
    <>
      <ThemeSync />
      <div data-slot="preview-frame" className="flex min-h-svh items-center justify-center p-6 sm:p-10">
        {Demo ? <Demo /> : <p className="text-ui text-muted-foreground">{label("Nothing to preview.")}</p>}
      </div>
    </>
  )
}
