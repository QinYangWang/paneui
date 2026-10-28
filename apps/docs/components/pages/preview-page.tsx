"use client"

import { Suspense } from "react"

import { PreviewFrame } from "@/components/docs/preview-frame"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

/**
 * One bare page renders any gallery demo or docs example, picked by query string
 * (`?demo=button` or `?example=button/sizes`). Component pages load it in an iframe for the
 * Desktop, Tablet and Mobile viewports, so media and container queries react.
 */
export default function PreviewPage({ site }: { site: SiteProps }) {
  return (
    <SiteRoot {...site}>
      <Suspense>
        <PreviewFrame />
      </Suspense>
    </SiteRoot>
  )
}
