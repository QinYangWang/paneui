/*
 * Agents the workspace can connect to. "demo" runs the in-browser mock agent;
 * every other entry is spawned by the ACP bridge (server/acp-bridge.mjs) with
 * its command, args and env. The list and the bridge address persist in
 * localStorage.
 */

export type AgentProvider = "codex" | "claude" | "gemini" | "custom"

export type AgentConfig = {
  id: string
  name: string
  provider: AgentProvider
  /** Empty for the built-in demo agent. */
  command: string
  args: string[]
  env: Record<string, string>
  builtin?: boolean
}

export type BridgeConfig = {
  /** e.g. ws://127.0.0.1:8787, printed by `node server/acp-bridge.mjs`. */
  url: string
  /** The token the bridge printed (or ACP_BRIDGE_TOKEN). */
  token: string
}

export const DEMO_AGENT: AgentConfig = {
  id: "demo",
  name: "Demo agent (offline)",
  provider: "codex",
  command: "",
  args: [],
  env: {},
  builtin: true,
}

/** Known ACP agents; adjust commands to how you installed them. */
export const PRESET_AGENTS: AgentConfig[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    provider: "claude",
    command: "npx",
    args: ["-y", "@zed-industries/claude-code-acp"],
    env: {},
  },
  {
    id: "codex",
    name: "Codex",
    provider: "codex",
    command: "npx",
    args: ["-y", "@zed-industries/codex-acp"],
    env: {},
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    provider: "gemini",
    command: "gemini",
    args: ["--experimental-acp"],
    env: {},
  },
]

const AGENTS_KEY = "agent-workspace:agents"
const BRIDGE_KEY = "agent-workspace:bridge"

export function loadAgents(): AgentConfig[] {
  try {
    const saved = JSON.parse(localStorage.getItem(AGENTS_KEY) ?? "null") as AgentConfig[] | null
    if (Array.isArray(saved)) return [DEMO_AGENT, ...saved.filter((a) => a.id !== "demo")]
  } catch {
    /* fall through */
  }
  return [DEMO_AGENT, ...PRESET_AGENTS]
}

export function saveAgents(agents: AgentConfig[]) {
  try {
    localStorage.setItem(AGENTS_KEY, JSON.stringify(agents.filter((a) => !a.builtin)))
  } catch {
    /* storage blocked */
  }
}

export function loadBridge(): BridgeConfig {
  try {
    const saved = JSON.parse(localStorage.getItem(BRIDGE_KEY) ?? "null") as BridgeConfig | null
    if (saved && typeof saved.url === "string") return saved
  } catch {
    /* fall through */
  }
  return { url: "ws://127.0.0.1:8787", token: "" }
}

export function saveBridge(bridge: BridgeConfig) {
  try {
    localStorage.setItem(BRIDGE_KEY, JSON.stringify(bridge))
  } catch {
    /* storage blocked */
  }
}

/** "KEY=value" lines ⇄ env object, for the settings form. */
export function parseEnv(text: string): Record<string, string> {
  const env: Record<string, string> = {}
  for (const line of text.split("\n")) {
    const i = line.indexOf("=")
    if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return env
}

export function formatEnv(env: Record<string, string>) {
  return Object.entries(env)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n")
}

/** Split a command line into args, honouring simple quotes. */
export function parseArgs(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)) out.push(m[1] ?? m[2] ?? m[3])
  return out
}
