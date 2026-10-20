import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Chat with coding agents and review their work.", "zh": "与编码助手对话并查看工作进度。"},
  usage: {
    imports: `// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-agent https://paneui.dev/r/agent-workspace.json
// or into an existing one (replaces app/page.tsx):
// pnpm dlx shadcn@latest add https://paneui.dev/r/agent-workspace.json
import { AgentWorkspace } from "@/components/agent-workspace/agent-workspace"`,
    code: `// app/page.tsx (installed for you: the workspace is the home page)
export default function AgentPage() {
  return <AgentWorkspace />
}

// Then, to drive real agents:
// node server/acp-bridge.mjs --root .
// and paste the printed address + token into Settings → Agents.`,
  },
  composition: `AgentWorkspace
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
server/acp-bridge.mjs             WebSocket ↔ stdio bridge for real agents`,
  examples: [],
  notes: [
    {
      title: "What it is",
      body: "A multi-provider coding-agent workspace that is a real [Agent Client Protocol](https://agentclientprotocol.com/get-started/introduction) client. Threads are ACP sessions. Streamed `session/update` notifications become messages, step logs (`tool_call` / `tool_call_update`), the plan, slash commands (`available_commands_update`), modes and models. `session/request_permission` opens an approval card, and `diff` content becomes the Edited files card with Undo and Review.",
    },
    {
      title: "Offline demo",
      body: "Out of the box it connects to an in-browser demo agent (`acp/mock-agent.ts`) that answers the same JSON-RPC methods as a real agent and replays a scripted session, so the page works as a static site. Switch Access to “Ask first” to see a permission request. Delete `acp/demo-data.ts` and the demo entry in `parts/agents.ts` when you only use real agents.",
    },
    {
      title: "Running the bridge",
      body: "Browsers cannot spawn agents, so `server/acp-bridge.mjs` (Node 18+, needs `ws`) does it. Run `node server/acp-bridge.mjs --root /path/to/repo` (options `--port 8787`, `--host 127.0.0.1`, `--token`, `--verbose`; or `ACP_BRIDGE_*` env vars). It prints `ws://127.0.0.1:8787` and a token. In the workspace open Settings → Agents, paste both, pick an agent and press Connect.",
    },
    {
      title: "Agents",
      body: "Any ACP agent works; the presets are Claude Code (`npx -y @zed-industries/claude-code-acp`, sign in with `claude /login` or set `ANTHROPIC_API_KEY`), Codex (`npx -y @zed-industries/codex-acp`, `OPENAI_API_KEY` or a ChatGPT login) and Gemini CLI (`gemini --experimental-acp`). Add others with a name, command, arguments and environment; they are saved in localStorage.",
    },
    {
      title: "What the bridge serves",
      body: "It pipes ACP between the WebSocket and the agent's stdio and answers the client-side methods itself (`fs/read_text_file`, `fs/write_text_file` and `terminal/create` · `output` · `wait_for_exit` · `kill` · `release`), all confined to `--root`. Terminal output and file writes are mirrored to the page as `_bridge/*` notifications (live output in the dock, Undo on edited files), and `_bridge/list_files`, `read_file`, `write_file` and `exec` power the explorer, @mentions and the terminal.",
    },
    {
      title: "Security",
      body: "Whoever holds the token can run commands as you inside the workspace root. The bridge binds to 127.0.0.1 and rejects WebSocket upgrades without the token; keep it that way, and do not expose the port.",
    },
    {
      title: "Keyboard",
      body: "⌘K command palette, ⌘N new thread, ⌘B threads sidebar, ⌘J terminal panel, ⌘\\\\ split chats, ⌘1–9 switch tabs, ⌘, settings. In the composer, Enter sends, Shift+Enter adds a line, Esc stops the agent, @ mentions files and / lists the agent's commands. Every divider drags, collapses (Enter) and remembers its size.",
    },
  ],
  api: [
    {
      name: "AcpClient",
      description: "Framework-free ACP client store (`acp/client.ts`); read it in React with `useAcpClient(client)`.",
      props: [
        { name: "connect", type: "(transport, options?) => Promise<InitializeResponse>", description: "Attach a transport and run `initialize`; `beforeInitialize` runs first (the bridge's `_bridge/spawn`)." },
        { name: "newSession / loadSession / listSessions", type: "(cwd, …) => Promise", description: "`session/new`, `session/load` (history replays into the timeline), `session/list`." },
        { name: "prompt", type: "(sessionId, text) => Promise<PromptResponse | null>", description: "`session/prompt`; `@path` mentions become `resource_link` blocks. Sending while the agent works cancels and steers." },
        { name: "cancel", type: "(sessionId) => void", description: "`session/cancel`; pending permission requests resolve as cancelled." },
        { name: "setMode / setConfigOption / setModel", type: "(sessionId, id, value?) => Promise", description: "`session/set_mode`, `session/set_config_option`, unstable `session/set_model`." },
        { name: "resolvePermission", type: "(sessionId, itemId, optionId | null) => void", description: "Answer a `session/request_permission`." },
        { name: "runShell / refreshFiles / readFile / undoEdits", type: "…", description: "Bridge helpers for the terminal, explorer and Undo." },
      ],
    },
    {
      name: "createWebSocketTransport / createMockTransport",
      description: "Transports implementing `AcpTransport` (`send`, `onMessage`, `onClose`, `close`).",
      props: [
        { name: "createWebSocketTransport", type: "(url: string) => Promise<AcpTransport>", description: "WebSocket to the bridge, e.g. `ws://127.0.0.1:8787/?token=…`." },
        { name: "createMockTransport", type: "({ speed? }) => AcpTransport", description: "In-memory demo agent." },
      ],
    },
  ],
} satisfies ComponentDoc
