"use client"

import * as React from "react"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

import { demos } from "./demos"

export function PreviewTabs({ name, code }: { name: string; code: React.ReactNode }) {
  const Demo = demos[name]
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
      </TabsList>
      <TabsPanel value="preview">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-card/40 p-5 inset-ring inset-ring-border sm:p-10">
          {Demo ? <Demo /> : null}
        </div>
      </TabsPanel>
      <TabsPanel value="code">{code}</TabsPanel>
    </Tabs>
  )
}
