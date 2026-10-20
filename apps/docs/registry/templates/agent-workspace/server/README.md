# ACP bridge

The Agent Workspace (installed as the home page, `app/page.tsx`) is an [Agent Client Protocol](https://agentclientprotocol.com/get-started/introduction) client. It starts on an offline demo agent. To drive a real agent (Claude Code, Codex, Gemini CLI or any other ACP agent) run this bridge next to your code:

```bash
node server/acp-bridge.mjs --root /path/to/your/repo
```

It prints an address and a token:

```
ACP bridge ready
  workspace  /path/to/your/repo
  address    ws://127.0.0.1:8787
  token      3f9c…
```

Open the workspace, go to **Settings → Agents**, paste the address and token, pick an agent and press **Connect**.

## Options

| Flag | Env | Default |
| --- | --- | --- |
| `--root <dir>` | `ACP_BRIDGE_ROOT` | current directory |
| `--port <n>` | `ACP_BRIDGE_PORT` | `8787` |
| `--host <addr>` | `ACP_BRIDGE_HOST` | `127.0.0.1` |
| `--token <secret>` | `ACP_BRIDGE_TOKEN` | random, printed at start |
| `--verbose` | `ACP_BRIDGE_VERBOSE=1` | off |

Needs Node 18+ and the `ws` package (installed with the template).

## Agents

| Agent | Command | Sign-in |
| --- | --- | --- |
| Claude Code | `npx -y @zed-industries/claude-code-acp` | `claude /login`, or `ANTHROPIC_API_KEY` in the agent's environment |
| Codex | `npx -y @zed-industries/codex-acp` | ChatGPT login or `OPENAI_API_KEY` |
| Gemini CLI | `gemini --experimental-acp` | `gemini` login or `GEMINI_API_KEY` |

Add any other agent in Settings with its command, arguments and environment variables.

## What it does

```
browser ── WebSocket (JSON-RPC) ──► acp-bridge ── stdio (ndjson) ──► agent
```

- `_bridge/spawn` starts the agent; every other ACP message is piped through unchanged.
- The agent's client-side calls are answered by the bridge, confined to `--root`: `fs/read_text_file`, `fs/write_text_file`, `terminal/create`, `terminal/output`, `terminal/wait_for_exit`, `terminal/kill`, `terminal/release`.
- Terminal output and file writes are mirrored to the page (`_bridge/terminal_output`, `_bridge/terminal_exit`, `_bridge/fs_write`) for live output and Undo.
- `_bridge/list_files`, `_bridge/read_file`, `_bridge/write_file` and `_bridge/exec` power the explorer, @mentions, Undo and the terminal panel.

## Security

Anyone with the token can run commands as you inside the workspace root. The bridge listens on 127.0.0.1 and refuses WebSocket connections without the token. Do not expose the port to other machines.
