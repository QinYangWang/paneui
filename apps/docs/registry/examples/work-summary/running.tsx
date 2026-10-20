"use client"

import * as React from "react"

import { WorkSummary, WorkSummaryStep } from "@paneui/ui/components/work-summary"

export default function WorkSummaryRunning() {
  const [startedAt] = React.useState(() => Date.now() - 4000)
  return (
    <div className="w-full max-w-md">
      <WorkSummary running startedAt={startedAt} defaultOpen>
        <WorkSummaryStep kind="read" title="Read package.json" />
        <WorkSummaryStep kind="execute" title="Run pnpm build" status="in_progress" />
        <WorkSummaryStep kind="edit" title="Edit next.config.ts" status="pending" />
      </WorkSummary>
    </div>
  )
}
