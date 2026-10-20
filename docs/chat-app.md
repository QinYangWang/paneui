# Chat App

> Agent workspace with a sidebar, conversation and prompt bar.

Page: https://paneui.dev/docs/chat-app/

## Installation

```bash
npx shadcn@latest add @paneui/chat-app
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/chat-app.json
```

Packages: `motion`, `@base-ui/react`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/chat`, `@paneui/prompt-bar`, `@paneui/ai-sidebar`, `@paneui/todo-list`, `@paneui/reasoning-text`, `@paneui/agent-progress`, `@paneui/icon-chip`.

## Usage

```tsx
import { ChatApp } from "@/registry/base-nova/blocks/chat-app/chat-app"

export default function ChatAppDemo() {
  return (
    <div className="h-160 w-full">
      <ChatApp searchHotkey={null} autoPlayPrompt="Plan a Kyoto trip in November" />
    </div>
  )
}
```
