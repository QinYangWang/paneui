# Agent Workspace

> Chat with coding agents and review their work.

Page: https://paneui.dev/docs/agent-workspace/

## Installation

```bash
npx shadcn@latest add @paneui/agent-workspace
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/agent-workspace.json
```

Packages: `@agentclientprotocol/sdk`, `ws`, `motion`, `simple-icons`.

Registry items it builds on: `@paneui/theme`, `@paneui/typeset`, `@paneui/icons`, `@paneui/agent-composer`, `@paneui/agent-code-block`, `@paneui/badge`, `@paneui/button`, `@paneui/command-palette`, `@paneui/dialog`, `@paneui/edited-files-card`, `@paneui/file-diff`, `@paneui/file-tree`, `@paneui/icon-rail`, `@paneui/input`, `@paneui/label`, `@paneui/loader`, `@paneui/menu`, `@paneui/message`, `@paneui/message-scroller`, `@paneui/model-picker`, `@paneui/resizable`, `@paneui/select`, `@paneui/streaming-response`, `@paneui/tab-strip`, `@paneui/terminal-view`, `@paneui/textarea`, `@paneui/theme-toggle`, `@paneui/thread-list-item`, `@paneui/todo-list`, `@paneui/tool-approval`, `@paneui/tooltip`, `@paneui/work-summary`, `@paneui/alert`, `@paneui/bottom-sheet`, `@paneui/brand-icon`, `@paneui/card`, `@paneui/drawer`, `@paneui/scroll-area`, `@paneui/settings-section`, `@paneui/code-block`, `@paneui/action-swap-blur`.

## Usage

```tsx
// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-agent https://paneui.dev/r/agent-workspace.json
// or into an existing one (replaces app/page.tsx):
// pnpm dlx shadcn@latest add https://paneui.dev/r/agent-workspace.json
import { AgentWorkspace } from "@/components/agent-workspace/agent-workspace"
```

```tsx
// app/page.tsx (installed for you: the workspace is the home page)
export default function AgentPage() {
  return <AgentWorkspace />
}

// Then, to drive real agents:
// node server/acp-bridge.mjs --root .
// and paste the printed address + token into Settings → Agents.
```

## Composition

```text
AgentWorkspace
├── IconRail                      app rail, provider avatars, settings
├── ResizablePanelGroup
│   ├── ThreadsSidebar            ThreadList / ThreadListItem
│   └── shell-inset panel
│       ├── TabStrip              open threads, reorder + close
│       ├── ChatPane (× 2 split)  MessageScroller → WorkSummary, messages,
│       │                         ToolApproval, EditedFilesCard;
│       │                         AgentComposer + Mode/Model/EffortPicker
│       └── Dock                  Terminal (TerminalView) · Explorer (FileTree) · Browser
├── CommandPalette (⌘K) · SettingsDialog · review Dialog (FileDiff)
└── acp/                          AcpClient store, transports, demo agent
server/acp-bridge.mjs             WebSocket ↔ stdio bridge for real agents
```

## What it is

A multi-provider coding-agent workspace that is a real [Agent Client Protocol](https://agentclientprotocol.com/get-started/introduction) client. Threads are ACP sessions. Streamed `session/update` notifications become messages, step logs (`tool_call` / `tool_call_update`), the plan, slash commands (`available_commands_update`), modes and models. `session/request_permission` opens an approval card, and `diff` content becomes the Edited files card with Undo and Review.

## Offline demo

Out of the box it connects to an in-browser demo agent (`acp/mock-agent.ts`) that answers the same JSON-RPC methods as a real agent and replays a scripted session, so the page works as a static site. Switch Access to “Ask first” to see a permission request. Delete `acp/demo-data.ts` and the demo entry in `parts/agents.ts` when you only use real agents.

## Running the bridge

Browsers cannot spawn agents, so `server/acp-bridge.mjs` (Node 18+, needs `ws`) does it. Run `node server/acp-bridge.mjs --root /path/to/repo` (options `--port 8787`, `--host 127.0.0.1`, `--token`, `--verbose`; or `ACP_BRIDGE_*` env vars). It prints `ws://127.0.0.1:8787` and a token. In the workspace open Settings → Agents, paste both, pick an agent and press Connect.

## Agents

Any ACP agent works; the presets are Claude Code (`npx -y @zed-industries/claude-code-acp`, sign in with `claude /login` or set `ANTHROPIC_API_KEY`), Codex (`npx -y @zed-industries/codex-acp`, `OPENAI_API_KEY` or a ChatGPT login) and Gemini CLI (`gemini --experimental-acp`). Add others with a name, command, arguments and environment; they are saved in localStorage.

## What the bridge serves

It pipes ACP between the WebSocket and the agent's stdio and answers the client-side methods itself (`fs/read_text_file`, `fs/write_text_file` and `terminal/create` · `output` · `wait_for_exit` · `kill` · `release`), all confined to `--root`. Terminal output and file writes are mirrored to the page as `_bridge/*` notifications (live output in the dock, Undo on edited files), and `_bridge/list_files`, `read_file`, `write_file` and `exec` power the explorer, @mentions and the terminal.

## Security

Whoever holds the token can run commands as you inside the workspace root. The bridge binds to 127.0.0.1 and rejects WebSocket upgrades without the token; keep it that way, and do not expose the port.

## Keyboard

⌘K command palette, ⌘N new thread, ⌘B threads sidebar, ⌘J terminal panel, ⌘\\ split chats, ⌘1–9 switch tabs, ⌘, settings. In the composer, Enter sends, Shift+Enter adds a line, Esc stops the agent, @ mentions files and / lists the agent's commands. Every divider drags, collapses (Enter) and remembers its size.

## API Reference

### AcpClient

Framework-free ACP client store (`acp/client.ts`); read it in React with `useAcpClient(client)`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `connect` | `(transport, options?) => Promise<InitializeResponse>` | — | Attach a transport and run `initialize`; `beforeInitialize` runs first (the bridge's `_bridge/spawn`). |
| `newSession / loadSession / listSessions` | `(cwd, …) => Promise` | — | `session/new`, `session/load` (history replays into the timeline), `session/list`. |
| `prompt` | `(sessionId, text) => Promise<PromptResponse \| null>` | — | `session/prompt`; `@path` mentions become `resource_link` blocks. Sending while the agent works cancels and steers. |
| `cancel` | `(sessionId) => void` | — | `session/cancel`; pending permission requests resolve as cancelled. |
| `setMode / setConfigOption / setModel` | `(sessionId, id, value?) => Promise` | — | `session/set_mode`, `session/set_config_option`, unstable `session/set_model`. |
| `resolvePermission` | `(sessionId, itemId, optionId \| null) => void` | — | Answer a `session/request_permission`. |
| `runShell / refreshFiles / readFile / undoEdits` | `…` | — | Bridge helpers for the terminal, explorer and Undo. |

### createWebSocketTransport / createMockTransport

Transports implementing `AcpTransport` (`send`, `onMessage`, `onClose`, `close`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `createWebSocketTransport` | `(url: string) => Promise<AcpTransport>` | — | WebSocket to the bridge, e.g. `ws://127.0.0.1:8787/?token=…`. |
| `createMockTransport` | `({ speed? }) => AcpTransport` | — | In-memory demo agent. |
