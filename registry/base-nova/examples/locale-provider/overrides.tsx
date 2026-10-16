"use client"

import { LocaleProvider } from "@/registry/base-nova/ui/locale-provider"
import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

export default function LocaleProviderOverrides() {
  return (
    <LocaleProvider labels={{ workedFor: (d) => `Took ${d}` }}>
      <WorkSummary duration={12}>
        <WorkSummaryStep kind="search" title="Searched the docs" />
      </WorkSummary>
    </LocaleProvider>
  )
}
