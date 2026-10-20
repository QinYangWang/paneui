# Terminal View

> Shows command output and takes commands in a terminal panel.

Page: https://paneui.dev/docs/terminal-view/

## Installation

```bash
npx shadcn@latest add @paneui/terminal-view
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/terminal-view.json
```

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Terminal, TerminalInput, TerminalOutput, TerminalStatusLine } from "@/components/ui/terminal-view"
```

```tsx
<Terminal className="h-80">
  <TerminalOutput text={output} />
  <TerminalInput onSubmit={run} />
  <TerminalStatusLine text={status} />
</Terminal>
```

## Composition

```text
Terminal
├── TerminalOutput
├── TerminalInput
└── TerminalStatusLine
```

## Examples

### Progress

Use for installs and downloads whose progress lines rewrite in place.

```tsx
"use client"

import * as React from "react"

import { Terminal, TerminalOutput } from "@/registry/base-nova/ui/terminal-view"

const E = "\u001b["

/** Carriage returns rewrite the current line, so a progress bar settles in place. */
export default function TerminalViewProgress() {
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setN((x) => (x >= 20 ? 0 : x + 1)), 180)
    return () => window.clearInterval(id)
  }, [])
  let text = `${E}2m$ pnpm install${E}0m\n`
  for (let i = 0; i <= n; i++) text += `\rProgress ${E}36m${"█".repeat(i)}${E}2m${"░".repeat(20 - i)}${E}0m ${i * 5}%`
  if (n === 20) text += `\n${E}32mDone${E}0m in 3.6s\n`
  return (
    <div className="h-40 w-full max-w-md overflow-hidden rounded-xl shadow-raised">
      <Terminal className="h-full">
        <TerminalOutput text={text} />
      </Terminal>
    </div>
  )
}
```

### Embedded

```tsx
import { Terminal, TerminalOutput } from "@/registry/base-nova/ui/terminal-view"

const E = "\u001b["

export default function TerminalViewEmbedded() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <span className="text-ui text-muted-foreground">Run bun run lint</span>
      <Terminal variant="embedded">
        <TerminalOutput text={`Checked 1,284 files in 2.1s\n${E}32m✓${E}0m No lint errors\n${E}33m!${E}0m 2 warnings (unused imports)\n`} className="max-h-32" />
      </Terminal>
    </div>
  )
}
```

## ANSI

`TerminalOutput` parses SGR colour codes plus bold, dim, italic, underline and inverse; 256-colour and 24-bit colours map to the nearest base colour. Colours map to theme tokens (red → destructive, green → success, yellow → warning, blue → primary, magenta / cyan → chart colours), so output follows the theme and accent. A carriage return rewrites the current line, and cursor movement and OSC sequences are dropped. `parseAnsi` and `stripAnsi` are exported.

## Following

Output stays pinned to the end while it grows, until the reader scrolls up; scrolling back to the bottom re-attaches. The log is `role="log"` with polite announcements.

## History

`TerminalInput` keeps submitted commands, and ↑ / ↓ walk back and forward through them.

## API Reference

### Terminal

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "embedded"` | `"default"` | Full panel surface or compact inset well. |

### TerminalOutput

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` (required) | `string` | — | Raw output with ANSI escape codes. |
| `follow` | `boolean` | `true` | Stick to the end while new output arrives. |
| `wrap` | `boolean` | `true` | Wrap long lines instead of scrolling sideways. |

### TerminalInput

Also accepts every prop of `input`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `prompt` | `ReactNode` | `"❯"` | Glyph before the input. |
| `onSubmit` | `(command: string) => void` | — | Called on Enter; the input clears. |

### TerminalStatusLine

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | ANSI text to render; otherwise children. |
