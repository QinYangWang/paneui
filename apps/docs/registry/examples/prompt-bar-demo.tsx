"use client"

import * as React from "react"

import { PromptBar } from "@paneui/ui/blocks/prompt-bar/prompt-bar"

export default function PromptBarDemo() {
  const [busy, setBusy] = React.useState(false)
  return (
    <PromptBar
      className="max-w-xl"
      busy={busy}
      onStop={() => setBusy(false)}
      onSubmit={() => {
        setBusy(true)
        setTimeout(() => setBusy(false), 2000)
      }}
    />
  )
}
