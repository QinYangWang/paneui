"use client"

import { LandingPage } from "@/components/landing/landing-page"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

/** Build-time values the homepage needs: the installable item count and the highlighted source card. */
export type LandingData = { count: number; codeHtml: string }

export default function LandingRoute({ site, data }: { site: SiteProps; data: LandingData }) {
  return (
    <SiteRoot {...site}>
      <LandingPage count={data.count} codeHtml={data.codeHtml} />
    </SiteRoot>
  )
}
