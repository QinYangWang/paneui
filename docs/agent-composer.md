# Agent Composer

> Prompt input for coding agents with file mentions and commands.

Page: https://paneui.dev/docs/agent-composer/

## Installation

```bash
npx shadcn@latest add @paneui/agent-composer
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/agent-composer.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/tooltip`, `@paneui/locale-provider`.

## Usage

```tsx
import { AgentComposer, AgentComposerBanner } from "@/components/agent-composer"
```

```tsx
<AgentComposer
  busy={busy}
  onSubmit={send}
  onStop={stop}
  onAttach={pickFiles}
  mentions={files.map((value) => ({ value }))}
  toolbarEnd={<ModelPicker models={models} value={model} onValueChange={setModel} />}
/>
```

## Composition

```text
AgentComposer
└── AgentComposerBanner (in header)
```

## Examples

### Minimal

```tsx
"use client"

import { AgentComposer } from "@/registry/base-nova/blocks/agent-composer/agent-composer"

export default function AgentComposerMinimal() {
  return (
    <div className="w-full max-w-xl">
      <AgentComposer placeholder="Message the agent" />
    </div>
  )
}
```

### Labels and Input Props

```tsx
"use client"

import { AgentComposer } from "@/registry/base-nova/blocks/agent-composer/agent-composer"

export default function AgentComposerLabels() {
  return (
    <div className="w-full max-w-xl">
      <AgentComposer
        placeholder="问点什么"
        labels={{ send: "发送", stop: "停止", input: "消息", attach: "添加文件" }}
        inputProps={{ id: "chat-input", name: "message", enterKeyHint: "send" }}
        onAttach={() => undefined}
      />
    </div>
  )
}
```

## Keyboard

Enter sends, Shift+Enter adds a line and Escape stops a busy agent. With suggestions open, arrow keys move, Enter or Tab inserts and Escape closes them.

## Labels

Unset `labels` keys come from `LocaleProvider`, English by default.

## API Reference

### AgentComposer

Also accepts every prop of `form`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSubmit` | `(text: string) => void` | — | Called with the trimmed text; the composer clears itself. |
| `busy` | `boolean` | `false` | Send turns into Stop. |
| `onStop` | `() => void` | — | Stop button and Escape while busy. |
| `onAttach` | `() => void` | — | Shows the attach button. |
| `onVoice` | `() => void` | — | Shows the dictate button. |
| `labels` | `{ attach?, send?, stop?, input?, dictate?, mentions?, commands? }` | — | Button names and tooltips, the input's accessible name and the suggestion headings. |
| `inputProps` | `TextareaHTMLAttributes` | — | Passed to the textarea; its handlers run before the composer's own. |
| `mentions` | `{ value, description?, icon? }[]` | — | Offered after `@`. |
| `commands` | `{ name, description?, hint? }[]` | — | Offered after a leading `/`. |
| `toolbarStart / toolbarEnd` | `ReactNode` | — | Controls such as mode, model and effort pickers. |
| `header` | `ReactNode` | — | Stacked above the input: banners, approvals, queued messages. |
| `value / defaultValue / onValueChange` | `string / string / (value: string) => void` | — | Controlled or uncontrolled text. |

| Data attribute | Description |
| --- | --- |
| `data-busy` | Present while busy. |
