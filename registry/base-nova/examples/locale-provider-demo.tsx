"use client"

import * as React from "react"

import { LocaleProvider } from "@/registry/base-nova/ui/locale-provider"
import { Pagination } from "@/registry/base-nova/ui/pagination"
import { PasswordInput } from "@/registry/base-nova/ui/password-input"
import { SegmentedControl, SegmentedControlItem } from "@/registry/base-nova/ui/segmented-control"
import { WorkSummary, WorkSummaryStep } from "@/registry/base-nova/ui/work-summary"

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
