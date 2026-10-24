"use client"

import { useState } from "react"
import { AgentActivity } from "@paneui/ui/components/agent-activity"
import { Button } from "@paneui/ui/components/button"
import { DataTable } from "@paneui/ui/components/data-table"
import { FileDiff } from "@paneui/ui/components/file-diff"
import { LocaleProvider } from "@paneui/ui/components/locale-provider"
import { NotionEditor } from "@paneui/ui/blocks/notion-editor/notion-editor"

export default function LocaleProviderChinese() {
  const [locale, setLocale] = useState("zh-CN")
  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <Button variant="outline" onClick={() => setLocale(locale === "zh-CN" ? "en" : "zh-CN")}>
        {locale === "zh-CN" ? "English" : "简体中文"}
      </Button>
      <LocaleProvider locale={locale}>
        <DataTable
          data={[{ id: "1", name: "林晓" }, { id: "2", name: "陈安" }]}
          columns={[{ key: "name", header: "姓名", accessor: (row) => row.name }]}
          getRowId={(row) => row.id}
          selectable
        />
        <FileDiff filename="greeting.ts" diff={'@@ -1 +1 @@\n-const greeting = "Hello"\n+const greeting = "你好"'} diffStyleToggle />
        <AgentActivity
          status="complete"
          defaultOpen
          duration={12}
          items={[{ id: "read", type: "tool", action: "read", target: "greeting.ts", status: "complete" }]}
        />
        <NotionEditor defaultValue="" />
      </LocaleProvider>
    </div>
  )
}
