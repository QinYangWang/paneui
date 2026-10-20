# Terminal

> Runs a shell in the page or on your machine.

Page: https://paneui.dev/docs/terminal/

## Installation

```bash
npx shadcn@latest add @paneui/terminal
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/terminal.json
```

Packages: `@xterm/xterm`, `@xterm/addon-fit`, `@xterm/addon-web-links`, `ws`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
import { Terminal, createLocalShell, createMemoryFs } from "@/components/ui/terminal"
```

```tsx
const [shell] = React.useState(() =>
  createLocalShell({ fs: createMemoryFs({ "README.md": "# hi\n" }) })
)

<Terminal transport={shell} className="h-80" />
```

## Examples

### Custom commands

```tsx
"use client"

import * as React from "react"

import { Terminal, createLocalShell, createMemoryFs, type ShellCommand } from "@/registry/base-nova/ui/terminal"

const E = "\u001b["
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

const deploy: ShellCommand = async ({ args, print }) => {
  const env = args[0] ?? "preview"
  for (const step of ["Building", "Uploading", "Routing traffic"]) {
    print(`${E}2m…${E}22m ${step}\n`)
    await wait(400)
  }
  print(`${E}32m✓${E}0m Deployed to ${E}1m${env}${E}22m\n`)
  return 0
}

const fortune: ShellCommand = ({ print }) => {
  const lines = ["Ship small, ship often.", "Read the error message twice.", "The cache was the problem."]
  print(lines[Math.floor(Math.random() * lines.length)] + "\n")
  return 0
}

export default function TerminalCustomCommands() {
  const [shell] = React.useState(() =>
    createLocalShell({ fs: createMemoryFs({ "app/index.html": "<h1>Hi</h1>\n" }), user: "you", host: "app", commands: { deploy, fortune } })
  )
  return (
    <div className="h-64 w-full max-w-xl overflow-hidden rounded-xl shadow-raised">
      <Terminal transport={shell} className="h-full" />
    </div>
  )
}
```

### Shared files

```tsx
"use client"

import * as React from "react"

import { Terminal, createLocalShell, createMemoryFs } from "@/registry/base-nova/ui/terminal"

function listFiles(fs: ReturnType<typeof createMemoryFs>, dir = "/"): string[] {
  return fs.readdir(dir).flatMap((e) => {
    const path = `${dir === "/" ? "" : dir}/${e.name}`
    return e.dir ? listFiles(fs, path) : [path]
  })
}

export default function TerminalSharedFiles() {
  const [fs] = React.useState(() => createMemoryFs({ "src/app.ts": "export {}\n", "notes.md": "- try `touch src/new.ts`\n" }))
  const [shell] = React.useState(() => createLocalShell({ fs, user: "you", host: "web" }))
  const files = React.useSyncExternalStore(
    React.useCallback((cb: () => void) => fs.subscribe?.(cb) ?? (() => {}), [fs]),
    React.useCallback(() => listFiles(fs).join("\n"), [fs]),
    () => ""
  )
  return (
    <div className="flex h-64 w-full max-w-2xl overflow-hidden rounded-xl bg-background shadow-raised">
      <ul className="w-44 shrink-0 overflow-auto border-r border-border p-2 font-mono text-ui-xs text-muted-foreground">
        {files.split("\n").filter(Boolean).map((f) => (
          <li key={f} className="truncate px-1 py-0.5">
            {f.slice(1)}
          </li>
        ))}
      </ul>
      <Terminal transport={shell} className="min-w-0 flex-1" />
    </div>
  )
}
```

### Real shell

Use the WebSocket transport to drive a shell on your machine through the PTY bridge.

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Terminal, createWebSocketTransport, type TerminalTransport } from "@/registry/base-nova/ui/terminal"

export default function TerminalWebSocket() {
  const [address, setAddress] = React.useState("ws://127.0.0.1:3457")
  const [token, setToken] = React.useState("")
  const [transport, setTransport] = React.useState<TerminalTransport | null>(null)

  React.useEffect(() => () => transport?.dispose?.(), [transport])

  const connect = (e: React.FormEvent) => {
    e.preventDefault()
    const url = new URL(address)
    url.searchParams.set("token", token)
    setTransport(createWebSocketTransport(url.toString()))
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <form onSubmit={connect} className="flex gap-2">
        <Input value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Bridge address" className="min-w-0 flex-1" />
        <Input value={token} onChange={(e) => setToken(e.target.value)} aria-label="Token" placeholder="Token" className="w-28" />
        <Button type="submit">{transport ? "Reconnect" : "Connect"}</Button>
      </form>
      <div className="h-64 overflow-hidden rounded-xl bg-background shadow-raised">
        {transport ? (
          <Terminal transport={transport} autoFocus className="h-full" />
        ) : (
          <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Start the bridge, then connect.</div>
        )}
      </div>
    </div>
  )
}
```

## Transports

`Terminal` only draws and takes keys; a `TerminalTransport` is the byte stream behind it. `createLocalShell` runs a shell in the page on a `ShellFs`. `createWebSocketTransport` talks to the PTY bridge: text frames carry data both ways and `{"type":"resize","cols":n,"rows":n}` resizes. Output sent before the view attaches is kept and replayed. Create a transport once (`useState` initialiser) and dispose it yourself; the view never disposes it, so it survives remounts.

## PTY bridge

Installing the item also adds `terminal-server/pty-bridge.mjs` and its README. Run `npm install node-pty`, then `node terminal-server/pty-bridge.mjs`; it prints the address and token. It binds to `127.0.0.1` and rejects connections without the token, which grants shell access as you.

## Local shell

Builtins: `ls -la`, `cd`, `pwd`, `cat`, `echo -ne`, `mkdir -p`, `touch`, `rm -rf`, `mv`, `cp -r`, `head`, `tail`, `wc`, `grep -invcrl`, `sort`, `uniq -c`, `tree`, `clear`, `history`, `env`, `export`, `unset`, `which`, `help`, `date`, `whoami`, `hostname`, `true`, `false`. `js <code>` evaluates the rest of the line (or stdin) with `fs` and `process` in scope and prints the result; `node -e`, `node -p` and `node <file>` run code too. Syntax: `|`, `>`, `>>`, `<`, `&&`, `||`, `;`, `$VAR` / `${VAR}` / `$?`, `NAME=value` prefixes, `~`, `*` / `?` globs and quotes. Unknown commands exit 127 with `command not found`. `cwd` is also `$HOME`.

## Keyboard

← → Home End, Backspace and Delete, ⌥/Ctrl+← → by word, ↑ ↓ history, Tab completes commands and paths (a second Tab lists matches), Ctrl+A / E start and end, Ctrl+U / K / W cut, Ctrl+Y pastes the cut, Ctrl+L clears, Ctrl+C cancels the line or a running command. Keys typed while a command runs are replayed when it ends. Pasted text with newlines runs line by line.

## Theme and size

Colours come from the theme tokens of the element (its background and text colour, ANSI colours from `destructive`, `success`, `warning`, `primary` and the chart colours) and update when the `dark` class or the accent on `<html>` changes. The view fits its container on every resize and reports columns and rows to the transport. The emulator loads in the browser only, so it is safe in server-rendered and static pages.

## API Reference

### Terminal

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `transport` (required) | `TerminalTransport` | — | Byte stream to a shell. |
| `fontSize` | `number` | `12` | Font size in px. |
| `autoFocus` | `boolean` | — | Focus the terminal once it loads. |
| `onTitleChange` | `(title: string) => void` | — | Called when the shell sets the window title; the local shell sets `user@host: cwd`. |
| `ref` | `Ref<TerminalHandle>` | — | `focus()`, `clear()`, `fit()` and `write(data)`. |
| `className` | `string` | — | Size and surface; the background and text colour also theme the emulator. |

### createLocalShell

Returns a `TerminalTransport`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fs` (required) | `ShellFs` | — | File system the shell works on. |
| `cwd` | `string` | `"/"` | Start directory and `$HOME`. |
| `user` | `string` | `"user"` | Shown in the prompt and `whoami`. |
| `host` | `string` | `"localhost"` | Shown in the prompt and `hostname`. |
| `commands` | `Record<string, ShellCommand>` | — | Extra commands; they win over builtins. Each gets `{ args, cwd, fs, print, env, stdin }` and returns an exit code (sync or async). |

### createWebSocketTransport

Returns a `TerminalTransport`; connects when the view attaches.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `url` (required) | `string` | — | Bridge address with `?token=`. |

### createMemoryFs

Returns a `ShellFs` with `subscribe` for change notifications.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `seed` | `Record<string, string>` | — | Path → content. Parent directories are implied; a key ending in `/` makes an empty directory. |
