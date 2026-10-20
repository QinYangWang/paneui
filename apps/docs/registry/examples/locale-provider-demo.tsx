"use client"

import * as React from "react"

import { LocaleProvider } from "@paneui/ui/components/locale-provider"
import { Pagination } from "@paneui/ui/components/pagination"
import { PasswordInput } from "@paneui/ui/components/password-input"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { WorkSummary, WorkSummaryStep } from "@paneui/ui/components/work-summary"

export default function LocaleProviderDemo() {
  const [locale, setLocale] = React.useState("zh-CN")
  const [page, setPage] = React.useState(2)
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-5">
      <SegmentedControl value={locale} onValueChange={setLocale} aria-label="Language">
        <SegmentedControlItem value="en">English</SegmentedControlItem>
        <SegmentedControlItem value="zh-CN">中文</SegmentedControlItem>
      </SegmentedControl>
      <LocaleProvider locale={locale}>
        <div className="flex w-full flex-col items-start gap-4">
          <WorkSummary duration={95} defaultOpen>
            <WorkSummaryStep kind="read" title="README.md" />
            <WorkSummaryStep kind="execute" title="pnpm test" status="in_progress" />
          </WorkSummary>
          <PasswordInput defaultValue="hunter2" aria-label="Password" />
          <Pagination page={page} pageCount={5} onPageChange={setPage} compact />
        </div>
      </LocaleProvider>
    </div>
  )
}
