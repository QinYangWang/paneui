# Tool Result

> Shows what an agent tool call ran and what it returned.

Page: https://paneui.dev/docs/tool-result/

## Installation

```bash
npx shadcn@latest add @paneui/tool-result
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/tool-result.json
```

Packages: `@base-ui/react`, `motion`, `shiki`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/action-swap-roll`, `@paneui/icon-chip`, `@paneui/locale-provider`.

## Usage

```tsx
import { ToolResult, ToolResultOutput } from "@/components/ui/tool-result"
```

```tsx
<ToolResult kind="terminal" tool="bash" title="List files" status="success" duration={0.42}>
  <ToolResultOutput>{"$ ls\nREADME.md  package.json  src"}</ToolResultOutput>
</ToolResult>
```

## Composition

```text
ToolResult
├── ToolResultOutput
└── ToolResultRequest
```

## Examples

### Statuses

```tsx
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

export default function ToolResultStatuses() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult kind="terminal" tool="bash" title="Installing dependencies" status="running" defaultOpen={false}>
        <ToolResultOutput>{"$ pnpm install"}</ToolResultOutput>
      </ToolResult>
      <ToolResult kind="terminal" tool="bash" title="Type check" status="success" duration={3.2} defaultOpen={false}>
        <ToolResultOutput>{"$ tsc --noEmit\nNo errors."}</ToolResultOutput>
      </ToolResult>
      <ToolResult kind="terminal" tool="bash" title="Lint" status="error" duration={1.4} defaultOpen={false}>
        <ToolResultOutput>{"$ eslint .\n2 errors"}</ToolResultOutput>
      </ToolResult>
      <ToolResult kind="terminal" tool="bash" title="Deploy preview" status="cancelled" duration={12} defaultOpen={false}>
        <ToolResultOutput>{"$ pnpm deploy\nCancelled by user."}</ToolResultOutput>
      </ToolResult>
    </div>
  )
}
```

### Error with Retry

```tsx
"use client"

import * as React from "react"

import { ToolResult, ToolResultOutput, type ToolResultStatus } from "@/registry/base-nova/ui/tool-result"

const FAIL = `$ pnpm build
▲ Next.js 15.3.1
  Creating an optimized production build ...
Failed to compile.

./app/trips/page.tsx:14:7
Type error: Property 'startsAt' does not exist on type 'Trip'.`

const PASS = `$ pnpm build
▲ Next.js 15.3.1
  Creating an optimized production build ...
✓ Compiled successfully in 18.4s`

export default function ToolResultErrorRetry() {
  const [status, setStatus] = React.useState<ToolResultStatus>("error")
  const [attempt, setAttempt] = React.useState(1)
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setStatus("running")
    timer.current = window.setTimeout(() => {
      setAttempt((a) => a + 1)
      setStatus("success")
    }, 1800)
  }

  const output = status === "success" ? PASS : FAIL
  return (
    <ToolResult
      kind="terminal"
      tool="bash"
      title="Production build"
      status={status}
      duration={status === "running" ? undefined : status === "success" ? 18.4 : 6.1}
      meta={status === "running" ? undefined : status === "success" ? "exit 0" : "exit 1"}
      copyText={output}
      onRetry={retry}
      collapseOnComplete={false}
      className="max-w-lg"
    >
      <ToolResultOutput>{status === "running" ? `$ pnpm build   # attempt ${attempt + 1}` : output}</ToolResultOutput>
    </ToolResult>
  )
}
```

### Requests

```tsx
import { ToolResult, ToolResultRequest } from "@/registry/base-nova/ui/tool-result"

const CREATED = JSON.stringify({ id: "evt_91c", title: "Design review", starts_at: "2026-10-16T15:00:00+08:00" }, null, 2)
const MISSING = JSON.stringify({ error: "not_found", message: "No booking with id bk_204" }, null, 2)

export default function ToolResultRequests() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult kind="request" tool="http.post" title="Create calendar event" status="success" duration={0.41} collapseOnComplete={false}>
        <ToolResultRequest method="POST" url="https://api.calendar.app/v1/events" statusCode={201} statusText="Created" body={CREATED} />
      </ToolResult>
      <ToolResult kind="request" tool="http.delete" title="Cancel booking" status="error" duration={0.22}>
        <ToolResultRequest method="DELETE" url="https://api.tables.app/v2/bookings/bk_204" statusCode={404} statusText="Not Found" body={MISSING} />
      </ToolResult>
    </div>
  )
}
```

### Custom Icon

```tsx
import { CalendarDaysIcon, DatabaseIcon } from "@/components/icons"
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

export default function ToolResultCustomIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult tool="calendar.find_free" title="Find a free hour" status="success" duration={0.9} icon={<CalendarDaysIcon />} defaultOpen={false}>
        <ToolResultOutput language="text">{"Thu 16 Oct, 15:00–16:00\nFri 17 Oct, 10:00–11:00"}</ToolResultOutput>
      </ToolResult>
      <ToolResult tool="sql.query" title="Count active users" status="success" duration={0.12} icon={<DatabaseIcon />} meta="1 row" defaultOpen={false}>
        <ToolResultOutput language="text">{"active_users\n4,812"}</ToolResultOutput>
      </ToolResult>
    </div>
  )
}
```

### Output Languages

```tsx
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

const PATCH = `--- a/src/config.yaml
+++ b/src/config.yaml
@@ -1,3 +1,3 @@
 region: ap-east-1
-replicas: 2
+replicas: 3
 timeout: 30s`

const CONFIG = `region: ap-east-1
replicas: 3
timeout: 30s
alerts:
  email: ops@example.com`

export default function ToolResultOutputLanguages() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult tool="git.diff" title="Show the change" status="success" duration={0.08} collapseOnComplete={false}>
        <ToolResultOutput language="diff">{PATCH}</ToolResultOutput>
      </ToolResult>
      <ToolResult tool="fs.read" title="Read config" status="success" duration={0.02} maxHeight={96} collapseOnComplete={false}>
        <ToolResultOutput language="yaml">{CONFIG}</ToolResultOutput>
      </ToolResult>
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

export default function ToolResultControlled() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult
        kind="terminal"
        tool="bash"
        title="Disk usage"
        status="success"
        duration={0.31}
        open={open}
        onOpenChange={setOpen}
      >
        <ToolResultOutput>{"$ du -sh *\n412M  node_modules\n 18M  .next\n2.1M  public"}</ToolResultOutput>
      </ToolResult>
      <Button size="sm" variant="secondary" className="self-end" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide output" : "Show output"}
      </Button>
    </div>
  )
}
```

## Behaviour

The result opens when a run starts and, with `collapseOnComplete` (default), folds to its header only after a `success`. While running the duration ticks on its own and the log follows its tail.

## Highlighting

`CodeHighlight` loads the highlighter core, the two themes and each grammar on first use. Only the seven `CodeLanguage` grammars reach your bundle, each as its own chunk.

## Motion

Under reduced motion the panel opens without a height transition, the spinner stops and the log tail jumps instead of smooth-scrolling.

## API Reference

Built on [the Collapsible primitive](https://base-ui.com/react/components/collapsible#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### ToolResult

Execution disclosure for one agent tool call. Also accepts every prop of [Collapsible.Root](https://base-ui.com/react/components/collapsible#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tool` (required) | `ReactNode` | — | Tool identifier shown in mono, e.g. `bash` or `http.get`. Hidden below `sm`. |
| `title` (required) | `ReactNode` | — | What the call does. |
| `status` | `"running" \| "success" \| "error" \| "cancelled"` | `"running"` | Run state. |
| `kind` | `"terminal" \| "request" \| "custom"` | `"custom"` | Picks the default header icon. |
| `duration` | `number` | — | Final duration in seconds. While running and unset, elapsed time ticks on its own (and stays frozen after); a call that never ran in this mount shows no duration. |
| `meta` | `ReactNode` | — | Extra header text such as an exit code. |
| `icon` | `ReactNode` | — | Replaces the `kind` icon in the chip. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `true` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called when the disclosure opens or closes. |
| `collapseOnComplete` | `boolean` | `true` | Fold to the header when a run finishes with `success`. |
| `maxHeight` | `number` | `240` | Max height of the output well before it scrolls, in px. |
| `copyText` | `string \| (() => void \| Promise<void>)` | — | Text (or handler) for the Copy output action; omit to hide it. |
| `onRetry` | `() => void` | — | Show a Run again action (disabled while running). |
| `contentClassName` | `string` | — | Classes for the padded box around `children`. |

| Data attribute | Description |
| --- | --- |
| `data-status` | The current `status`. |

### ToolResultOutput

Highlighted, wrapping output body.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` (required) | `string` | — | The output text. |
| `language` | `"bash" \| "json" \| "diff" \| "tsx" \| "typescript" \| "yaml" \| "python" \| "text"` | `"bash"` | Highlight grammar. |
| `className` | `string` | — | Merged onto the `pre`. |

### ToolResultRequest

Request line plus response body for `kind="request"`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `url` (required) | `string` | — | Request URL. |
| `method` | `string` | `"GET"` | HTTP method; GET, POST, PUT, PATCH and DELETE get their own tint. |
| `statusCode` | `number` | — | Response code; green below 400, red otherwise. |
| `statusText` | `string` | — | Text after the code, e.g. `OK`. |
| `body` | `string` | — | Response body. |
| `language` | `CodeLanguage` | `"json"` | Highlight grammar for `body`. |
| `className` | `string` | — | Merged onto the wrapper. |

### CodeHighlight

Dual-theme syntax highlight shared by the agent components. Also accepts every prop of `pre`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `code` (required) | `string` | — | Source text. |
| `language` | `CodeLanguage` | `"bash"` | Highlight grammar. |
| `wrap` | `boolean` | `false` | Wrap long lines instead of scrolling horizontally. |

### ToolStatusIcon

The spinner / check / cross / stop glyph for a status.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` (required) | `ToolResultStatus` | — | Which glyph to show. |
| `className` | `string` | — | Merged onto the icon. |

### AgentIconButton

Small round ghost icon button used across the agent components. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` (required) | `string` | — | `aria-label` and `title`. |
| `pressed` | `boolean` | — | Sets `aria-pressed` and a pressed chip style. |

### AgentCopyButton

`AgentIconButton` that copies and flips to a check.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string \| (() => void \| Promise<void>)` | — | Text to copy, or a handler to run instead. |
| `label` | `string` | `"Copy"` | Accessible label. |
| `className` | `string` | — | Merged onto the button. |

### Hooks and helpers

`useCodeTokens(code, language)`, `useCopyToClipboard(timeout = 1600)`, `useElapsed(active)`, `useControllableOpen(open, defaultOpen, onOpenChange)`, `formatDuration(seconds)` (`420ms`, `2.4s`, `1m 05s`) and the `AGENT_EASE` curve are exported for the other agent components.
