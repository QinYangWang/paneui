# Prompt Bar

> Writes and sends prompts to an agent.

Page: https://paneui.dev/docs/prompt-bar/

## Installation

```bash
npx shadcn@latest add @paneui/prompt-bar
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/prompt-bar.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/button`, `@paneui/icons`.

## Usage

```tsx
"use client"

import * as React from "react"

import { PromptBar } from "@/registry/base-nova/blocks/prompt-bar/prompt-bar"

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
```
