# Agent Code Block

> Displays code from an agent, including code still streaming in.

Page: https://paneui.dev/docs/agent-code-block/

## Installation

```bash
npx shadcn@latest add @paneui/agent-code-block
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/agent-code-block.json
```

Packages: `shiki`, `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/scroll-area`, `@paneui/code-block`.

## Usage

```tsx
import { AgentCodeBlock } from "@/components/ui/agent-code-block"
```

```tsx
<AgentCodeBlock filename="lib/greet.ts" code={code} />
```

## Examples

### Without Header

```tsx
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `def nights_between(check_in, check_out):
    return (check_out - check_in).days
`

export default function AgentCodeBlockWithoutHeader() {
  return <AgentCodeBlock language="python" code={CODE} className="w-full max-w-xl" />
}
```

### Excerpt

```tsx
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `export function formatDate(date: Date, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}`

export default function AgentCodeBlockExcerpt() {
  return (
    <AgentCodeBlock
      filename="lib/format.ts"
      code={CODE}
      startLine={41}
      highlightLines={[41, [44, 45]]}
      className="w-full max-w-xl"
    />
  )
}
```

### Without Line Numbers

Turn line numbers off for shell commands and short snippets.

```tsx
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `pnpm dlx shadcn@latest add @paneui/agent-code-block
pnpm dev`

export default function AgentCodeBlockNoLineNumbers() {
  return <AgentCodeBlock filename="Terminal" language="bash" code={CODE} showLineNumbers={false} className="w-full max-w-xl" />
}
```

### Wrap

```tsx
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `{
  "summary": "Moved the Thursday design review to 3 pm, notified all six attendees, and attached the updated agenda with the two new items from Dana about the onboarding flow.",
  "attendees": ["dana@example.com", "sam@example.com", "lee@example.com", "kai@example.com", "mo@example.com", "ren@example.com"],
  "status": "confirmed"
}`

export default function AgentCodeBlockWrap() {
  return <AgentCodeBlock filename="response.json" code={CODE} wrap maxHeight={200} className="w-full max-w-xl" />
}
```

### Not Copyable

Turn copying off for read-only output that shouldn't be pasted back.

```tsx
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

const CODE = `✓ 128 tests passed
✓ Coverage 91.4%
Done in 6.2s`

export default function AgentCodeBlockNotCopyable() {
  return <AgentCodeBlock filename="vitest output" code={CODE} copyable={false} showLineNumbers={false} className="w-full max-w-xl" />
}
```

### Copy Button

```tsx
import { CodeCopyButton } from "@/registry/base-nova/ui/agent-code-block"

export default function AgentCodeBlockCopyButton() {
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-3 rounded-xl bg-muted py-1.5 pr-1.5 pl-3 shadow-well">
      <code className="truncate font-mono text-sm">sk-live-7f3a…c91e</code>
      <CodeCopyButton value="sk-live-7f3a2b8d4e6f0c91e" label="Copy API key" />
    </div>
  )
}
```

## Scrollbars

The code area scrolls in a [Scroll Area](https://paneui.dev/docs/scroll-area) on both axes, below the header and inside the rounded frame.

## Streaming

While `streaming`, the block follows the newest line unless the reader scrolls away, and keeps already-coloured tokens so lines never flash back to plain text.

## Motion

The copy-to-check swap cross-fades without scaling under reduced motion, and the streaming follow jumps instead of smooth-scrolling.

## API Reference

### AgentCodeBlock

Syntax-highlighted code surface (light and dark themes) for agent output. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `code` (required) | `string` | — | Source text. |
| `language` | `string` | — | Syntax language id. Inferred from `filename` when omitted; unknown ids render as plain text. |
| `filename` | `ReactNode` | — | Shown in a header with the language chip and copy button. Without it the copy button floats. |
| `showLineNumbers` | `boolean` | `true` | Show the sticky line-number gutter. |
| `startLine` | `number` | `1` | First line number, for excerpts. |
| `highlightLines` | `(number \| [start: number, end: number])[]` | — | Line numbers or `[start, end]` ranges, as displayed, to emphasise. |
| `streaming` | `boolean` | `false` | Show a live caret and Writing badge and follow the newest line. |
| `maxHeight` | `number` | `360` | Max height of the scrolling code area in px. |
| `copyable` | `boolean` | `true` | Show the copy button. |
| `wrap` | `boolean` | `false` | Wrap long lines instead of scrolling horizontally. |

| Data attribute | Description |
| --- | --- |
| `data-streaming` | On the root while `streaming`. |
| `data-line` | On each line, its displayed number. |
| `data-highlighted` | On lines listed in `highlightLines`. |

### CodeCopyButton

Round icon button that copies and swaps to a check. Also accepts every prop of `button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` (required) | `string \| (() => string)` | — | Text to copy, or a function returning it at click time. |
| `label` | `string` | `"Copy code"` | Accessible label before copying. |
| `className` | `string` | — | Merged onto the button. |

| Data attribute | Description |
| --- | --- |
| `data-copied` | Present for 1.6s after a successful copy. |

### useCodeTokens

`(code: string, language: string) => CodeToken[][] | null`. Tokenises with light and dark colours; `null` until the first pass.

### CodeLine

Renders one line from (possibly stale) tokens.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` (required) | `string` | — | The line's text. |
| `tokens` | `CodeToken[]` | — | Tokens for that line from `useCodeTokens`. |

### useCopy

`(timeout = 1600) => { copied: boolean; copy: (text: string) => Promise<void> }`.

### languageFromFilename

`(filename?: string, fallback = "text") => string`. Maps an extension like `.tsx` to a language id.
