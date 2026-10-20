/**
 * Transports carry newline-free JSON-RPC 2.0 messages between the browser ACP
 * client and an agent. Two ship with the template:
 * - `createMockTransport()` (./mock-agent): an in-memory agent that replays a
 *   scripted coding session, so the static demo works offline;
 * - `createWebSocketTransport(url)`: a WebSocket to `server/acp-bridge.mjs`,
 *   which spawns a real ACP agent over stdio and serves fs / terminal calls.
 */

export type JsonRpcId = number | string

export type JsonRpcMessage = {
  jsonrpc: "2.0"
  id?: JsonRpcId | null
  method?: string
  params?: unknown
  result?: unknown
  error?: { code: number; message: string; data?: unknown }
}

export interface AcpTransport {
  /** Human label for the connection ("Demo agent", "ws://127.0.0.1:8787"). */
  readonly label: string
  send(message: JsonRpcMessage): void
  /** Subscribe to incoming messages; returns an unsubscribe function. */
  onMessage(listener: (message: JsonRpcMessage) => void): () => void
  /** Called once when the connection ends (agent exited, socket closed). */
  onClose(listener: (reason: string) => void): () => void
  close(): void
}

/** Small listener set shared by the transports. */
export function createEmitter<T>() {
  const listeners = new Set<(value: T) => void>()
  return {
    on(listener: (value: T) => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    emit(value: T) {
      for (const l of [...listeners]) l(value)
    },
  }
}

/**
 * Open a WebSocket to the ACP bridge. Resolves once the socket is open;
 * rejects if it fails to connect (bridge not running, wrong token).
 */
export function createWebSocketTransport(url: string): Promise<AcpTransport> {
  return new Promise((resolve, reject) => {
    let ws: WebSocket
    try {
      ws = new WebSocket(url)
    } catch (err) {
      reject(err instanceof Error ? err : new Error(String(err)))
      return
    }
    const messages = createEmitter<JsonRpcMessage>()
    const closed = createEmitter<string>()
    let open = false
    ws.addEventListener("open", () => {
      open = true
      resolve({
        label: url.replace(/([?&])token=[^&]*/, "$1token=…"),
        send: (message) => {
          if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(message))
        },
        onMessage: messages.on,
        onClose: closed.on,
        close: () => ws.close(),
      })
    })
    ws.addEventListener("message", (event) => {
      const text = typeof event.data === "string" ? event.data : ""
      for (const line of text.split("\n")) {
        if (!line.trim()) continue
        try {
          messages.emit(JSON.parse(line) as JsonRpcMessage)
        } catch {
          /* ignore malformed frames */
        }
      }
    })
    ws.addEventListener("close", (event) => {
      if (!open) reject(new Error(event.reason || `Could not connect to ${url}`))
      else closed.emit(event.reason || "Connection closed")
    })
    ws.addEventListener("error", () => {
      if (!open) reject(new Error(`Could not connect to ${url}. Is the bridge running?`))
    })
  })
}
