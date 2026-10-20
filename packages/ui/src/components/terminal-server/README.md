# PTY bridge

The `Terminal` component can drive a real shell on your machine. Browsers can't start processes, so this small Node server spawns your shell in a pseudo-terminal and streams it over a WebSocket.

```
browser ── WebSocket ──► pty-bridge ── PTY ──► $SHELL
```

## Run it

```bash
npm install ws node-pty
node terminal-server/pty-bridge.mjs
```

`node-pty` compiles a native module, so it needs a C++ toolchain (Xcode Command Line Tools on macOS, `build-essential` and `python3` on Linux, Visual Studio Build Tools on Windows). Without one, install `@homebridge/node-pty-prebuilt-multiarch` instead; the bridge picks up either.

It prints an address and a token:

```
PTY bridge ready
  shell    /bin/zsh
  cwd      /Users/you
  address  ws://127.0.0.1:3457
  token    3f9c…
  url      ws://127.0.0.1:3457/?token=3f9c…
```

Connect the component to the `url`:

```tsx
const [transport] = React.useState(() => createWebSocketTransport("ws://127.0.0.1:3457/?token=3f9c…"))

<Terminal transport={transport} className="h-96" />
```

Each WebSocket gets its own shell; closing the socket ends it, and the socket closes when the shell exits.

## Options

| Flag | Env | Default |
| --- | --- | --- |
| `--port <n>` | `PTY_BRIDGE_PORT` | `3457` |
| `--host <addr>` | `PTY_BRIDGE_HOST` | `127.0.0.1` |
| `--token <secret>` | `PTY_BRIDGE_TOKEN` | random, printed at start |
| `--cwd <dir>` | `PTY_BRIDGE_CWD` | your home directory |
| `--shell <path>` | `PTY_BRIDGE_SHELL` | `$SHELL`, else `/bin/bash` (`powershell.exe` on Windows) |
| | `PTY_BRIDGE_ORIGINS` | any; a comma-separated list of allowed page origins |
| `--verbose` | `PTY_BRIDGE_VERBOSE=1` | off |

Needs Node 18+.

## Protocol

- Text frames carry raw terminal data both ways: keystrokes in, output (with ANSI) out.
- A text frame `{"type":"resize","cols":120,"rows":32}` resizes the PTY. `createWebSocketTransport` sends one on connect and on every resize.
- `?cols=` and `?rows=` on the URL set the starting size.
- Close code `1000` means the shell exited.

## Security

Anyone with the token can run commands as you. Keep the default `127.0.0.1` binding, don't commit the token, and set `PTY_BRIDGE_ORIGINS` to your app's origin (for example `http://localhost:3000`) so other pages can't connect even if they learn it.
