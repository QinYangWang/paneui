# Streaming Response

> Shows a reply as it arrives.

Page: https://paneui.dev/docs/streaming-response/

## Installation

```bash
npx shadcn@latest add @paneui/streaming-response
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/streaming-response.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/typeset`, `@paneui/icons`, `@paneui/citations`, `@paneui/tool-result`, `@paneui/locale-provider`, `@paneui/checkbox`.

## Usage

```tsx
import { StreamingResponse } from "@/components/ui/streaming-response"
```

```tsx
<StreamingResponse text={text} status={done ? "complete" : "streaming"} />
```

## Examples

### Markdown

```tsx
import type { CitationSource } from "@/registry/base-nova/ui/citations"
import { StreamingResponse } from "@/registry/base-nova/ui/streaming-response"

const SOURCES: CitationSource[] = [
  { id: "jr", title: "Hokuriku Shinkansen timetable", domain: "jreast.co.jp" },
  { id: "kanazawa", title: "Kenroku-en opening hours", domain: "pref.ishikawa.jp" },
]

const TEXT = `## Day trip to Kanazawa

Take the **Kagayaki** from Tokyo; it's the fastest service at about *2.5 hours* [1].

1. Leave Tokyo on the 7:20 departure
2. Walk to Kenroku-en, which opens at 7:00 [2]
3. Lunch at Omicho Market

Book seats with \`car 7\` for the quiet car, or see the [station map](#station-map).`

export default function StreamingResponseMarkdown() {
  return <StreamingResponse text={TEXT} status="complete" sources={SOURCES} className="max-w-lg" />
}
```

### Lists and Links

Use when replies continue numbered lists, paste URLs or keep checklists.

```tsx
"use client"

import { ResponseMarkdown } from "@/registry/base-nova/ui/streaming-response"

const TEXT = `Two steps are done:

1. Installed the dependencies
2. Ran the migrations

Next, continuing the list:

3. Seed the database
4. Start the server

Docs are at https://example.com/docs/setup.

- [x] Create the project
- [ ] Invite the team`

export default function StreamingResponseListsAndLinks() {
  return <ResponseMarkdown text={TEXT} className="max-w-lg" />
}
```

### Error

```tsx
"use client"

import * as React from "react"

import { StreamingResponse, type StreamingResponseStatus } from "@/registry/base-nova/ui/streaming-response"

const FULL = "Your three biggest expenses this month were rent (¥120,000), groceries (¥42,300) and the flight to Sapporo (¥28,900)."

export default function StreamingResponseError() {
  const [status, setStatus] = React.useState<StreamingResponseStatus>("error")
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setStatus("streaming")
    timer.current = window.setTimeout(() => setStatus("complete"), 1200)
  }

  return (
    <StreamingResponse
      text={status === "error" ? "Your three biggest expenses this month were rent" : status === "streaming" ? "Your three biggest" : FULL}
      status={status}
      errorMessage="Lost connection to your bank. Nothing was changed."
      onRetry={retry}
      className="max-w-lg"
    />
  )
}
```

### Controlled Feedback

```tsx
"use client"

import * as React from "react"

import { StreamingResponse, type StreamingResponseFeedback } from "@/registry/base-nova/ui/streaming-response"

export default function StreamingResponseFeedbackExample() {
  const [feedback, setFeedback] = React.useState<StreamingResponseFeedback>(null)
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <StreamingResponse
        text="The 18:05 ferry to Lamma Island leaves from Central Pier 4 and takes about 30 minutes."
        status="complete"
        feedback={feedback}
        onFeedbackChange={setFeedback}
      />
      <p className="text-xs text-muted-foreground">
        Feedback: <span className="font-medium text-foreground">{feedback ?? "none"}</span>
      </p>
    </div>
  )
}
```

### Sources Open, No Actions

Use in read-only transcripts where the sources matter more than the actions.

```tsx
import type { CitationSource } from "@/registry/base-nova/ui/citations"
import { StreamingResponse } from "@/registry/base-nova/ui/streaming-response"

const SOURCES: CitationSource[] = [
  { id: "hko", title: "9-day weather forecast", domain: "hko.gov.hk" },
  { id: "afcd", title: "Dragon’s Back trail guide", domain: "afcd.gov.hk" },
]

export default function StreamingResponseSourcesOpen() {
  return (
    <StreamingResponse
      text="Saturday looks dry with a high of 26°C [1], so Dragon’s Back is a good pick: about 8.5 km and three hours [2]."
      status="complete"
      sources={SOURCES}
      defaultSourcesOpen
      showActions={false}
      className="max-w-lg"
    />
  )
}
```

### Custom Content

```tsx
import { StreamingResponse } from "@/registry/base-nova/ui/streaming-response"

const ROWS = [
  { day: "Mon", plan: "Gym, 7:00" },
  { day: "Wed", plan: "Dinner with Sam, 19:30" },
  { day: "Fri", plan: "Flight CX 520, 09:15" },
]

export default function StreamingResponseCustomChildren() {
  return (
    <StreamingResponse
      status="complete"
      copyText={ROWS.map((r) => `${r.day}: ${r.plan}`).join("\n")}
      className="max-w-lg"
    >
      <p>Here’s your week at a glance:</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        {ROWS.map((r) => (
          <div key={r.day} className="contents">
            <dt className="font-medium text-foreground">{r.day}</dt>
            <dd className="text-muted-foreground tabular-nums">{r.plan}</dd>
          </div>
        ))}
      </dl>
    </StreamingResponse>
  )
}
```

### ResponseMarkdown and StreamingCaret

Use these to build your own message surface with the same renderer and caret.

```tsx
import { ResponseMarkdown, StreamingCaret } from "@/registry/base-nova/ui/streaming-response"

export default function StreamingResponseMarkdownAndCaret() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <ResponseMarkdown caret text={"Checking three options:\n\n- **Direct** flight at 09:15\n- Via Taipei at 11:40"} />
      <p className="text-sm text-muted-foreground">
        Drafting your reply
        <StreamingCaret />
      </p>
    </div>
  )
}
```

## Markdown

The renderer covers paragraphs, `#` headings, bullet and numbered lists, fenced code, inline code, bold, italics, links and `[n]` citations. A numbered list keeps its first number (`<ol start>`), bare `http(s)` URLs become links without their trailing punctuation, and `- [ ]` / `- [x]` items show a read-only checkbox.

## Layout

The actions row keeps its height while streaming (hidden and `inert`), so the reply doesn't jump when it completes. Sources appear only after streaming ends.

## Motion

Under reduced motion the caret stops blinking and the actions and sources fade in without sliding.

## API Reference

### StreamingResponse

Surface for an assistant reply, with actions and sources under the text. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | — | Markdown subset (headings, lists, fenced and inline code, bold, italic, links, `[n]` citations), streamed in by appending. |
| `children` | `ReactNode` | — | Custom content instead of `text`. |
| `status` | `"streaming" \| "complete" \| "error"` | `"streaming"` | Reply state; `streaming` shows the caret and hides actions. |
| `sources` | `CitationSource[]` | — | Sources for `[n]` markers and the footer list. See [Citations](https://paneui.dev/docs/citations). |
| `defaultSourcesOpen` | `boolean` | `false` | Start with the sources list open. |
| `copyText` | `string` | — | Plain text for the copy action. Defaults to `text`. |
| `onRetry` | `() => void` | — | Adds a Regenerate action, and Retry on errors. |
| `feedback` | `"up" \| "down" \| null` | — | Controlled thumbs state. |
| `defaultFeedback` | `"up" \| "down" \| null` | `null` | Initial thumbs state when uncontrolled. |
| `onFeedbackChange` | `(feedback: "up" \| "down" \| null) => void` | — | Called when a thumb is toggled. |
| `errorMessage` | `ReactNode` | `"The response was interrupted."` | Message shown when `status="error"`. |
| `showActions` | `boolean` | `true` | Show the copy / regenerate / feedback row. |
| `contentClassName` | `string` | — | Classes for the wrapper around the body. |

| Data attribute | Description |
| --- | --- |
| `data-status` | The current `status`. |

### ResponseMarkdown

The markdown-ish renderer behind `text`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` (required) | `string` | — | Source text. |
| `sources` | `CitationSource[]` | — | Resolves `[n]` markers; needs a surrounding `CitationGroup` for numbering and jump-to-list. |
| `caret` | `boolean` | `false` | Append a `StreamingCaret` to the last block. |
| `className` | `string` | — | Merged onto the wrapper. |

### StreamingCaret

Blinking block caret for the tail of streamed text.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged onto the caret. |
