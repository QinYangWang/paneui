"use client"

import { LocaleProvider } from "@paneui/ui/components/locale-provider"
import { WorkSummary, WorkSummaryStep } from "@paneui/ui/components/work-summary"

export default function LocaleProviderOverrides() {
  return (
    <LocaleProvider labels={{ workedFor: (d) => `Took ${d}` }}>
      <WorkSummary duration={12}>
        <WorkSummaryStep kind="search" title="Searched the docs" />
      </WorkSummary>
    </LocaleProvider>
  )
}
