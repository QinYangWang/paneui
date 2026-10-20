import { Suspense } from "react"

import { PreviewFrame } from "@/components/docs/preview-frame"

export const metadata = { title: "Preview", robots: { index: false } }

/**
 * One bare page renders any gallery demo or docs example, picked by query string
 * (`?demo=button` or `?example=button/sizes`). Component pages load it in an iframe for the
 * Desktop, Tablet and Mobile viewports, so media and container queries react.
 */
export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewFrame />
    </Suspense>
  )
}
