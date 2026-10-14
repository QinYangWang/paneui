"use client"

import * as React from "react"

import { renderEmailHtml } from "@/registry/base-nova/blocks/email-editor/render"
import { sampleEmailValues, welcomeEmail } from "@/registry/base-nova/blocks/email-editor/templates"
import { Switch } from "@/registry/base-nova/ui/switch"

export default function EmailEditorRenderHtml() {
  const [filled, setFilled] = React.useState(false)
  const [html, setHtml] = React.useState("")
  React.useEffect(() => {
    void renderEmailHtml(welcomeEmail, { variables: filled ? sampleEmailValues : undefined }).then(setHtml)
  }, [filled])
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Switch checked={filled} onCheckedChange={setFilled} />
        Fill variables with sample values
      </label>
      <pre className="h-80 overflow-auto rounded-xl bg-code p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap shadow-raised">
        {html.slice(0, 6000)}
        {html.length > 6000 ? "\n…" : ""}
      </pre>
    </div>
  )
}
