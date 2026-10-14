"use client"

import * as React from "react"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"

import { demos } from "./demos"
import { examples } from "./examples.generated"

/** Preview / Code tabs. `name` is a gallery demo key; `example` ("<name>/<id>") picks a docs example instead. */
export function PreviewTabs({
  name,
  example,
  code,
  className,
}: {
  name?: string
  example?: string
  code: React.ReactNode
  className?: string
}) {
  const Demo = example ? examples[example] : name ? demos[name] : undefined
  return (
    <Tabs defaultValue="preview" className={className}>
      <TabsList>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
      </TabsList>
      <TabsPanel value="preview">
        <div
          className={
            example
              ? "flex min-h-56 items-center justify-center rounded-xl bg-card p-5 shadow-raised sm:p-8"
              : "flex min-h-80 items-center justify-center rounded-xl bg-card p-5 shadow-raised sm:p-10"
          }
        >
          {Demo ? <Demo /> : null}
        </div>
      </TabsPanel>
      <TabsPanel value="code">{code}</TabsPanel>
    </Tabs>
  )
}
