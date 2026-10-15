import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Terminal, createLocalShell, createMemoryFs } from "@/components/ui/terminal"`,
    code: `const [shell] = React.useState(() =>
  createLocalShell({ fs: createMemoryFs({ "README.md": "# hi\\n" }) })
)

<Terminal transport={shell} className="h-80" />`,
  },
  examples: [
    { id: "custom-commands", title: "Custom commands", description: "Use `commands` to add app-specific commands next to the builtins." },
    { id: "shared-files", title: "Shared files", description: "Use one `ShellFs` when an editor or file tree shows the same files as the shell." },
    { id: "websocket", title: "Real shell", description: "Use the WebSocket transport to drive a shell on your machine through the PTY bridge." },
  ],
  notes: [
    {
      title: "Transports",
      body: "`Terminal` only draws and takes keys; a `TerminalTransport` is the byte stream behind it. `createLocalShell` runs a shell in the page on a `ShellFs`. `createWebSocketTransport` talks to the PTY bridge: text frames carry data both ways and `{\"type\":\"resize\",\"cols\":n,\"rows\":n}` resizes. Output sent before the view attaches is kept and replayed. Create a transport once (`useState` initialiser) and dispose it yourself; the view never disposes it, so it survives remounts.",
    },
    {
      title: "PTY bridge",
      body: "Installing the item also adds `terminal-server/pty-bridge.mjs` and its README. Run `npm install node-pty`, then `node terminal-server/pty-bridge.mjs`; it prints the address and token. It binds to `127.0.0.1` and rejects connections without the token, which grants shell access as you.",
    },
    {
      title: "Local shell",
      body: "Builtins: `ls -la`, `cd`, `pwd`, `cat`, `echo -ne`, `mkdir -p`, `touch`, `rm -rf`, `mv`, `cp -r`, `head`, `tail`, `wc`, `grep -invcrl`, `sort`, `uniq -c`, `tree`, `clear`, `history`, `env`, `export`, `unset`, `which`, `help`, `date`, `whoami`, `hostname`, `true`, `false`. `js <code>` evaluates the rest of the line (or stdin) with `fs` and `process` in scope and prints the result; `node -e`, `node -p` and `node <file>` run code too. Syntax: `|`, `>`, `>>`, `<`, `&&`, `||`, `;`, `$VAR` / `${VAR}` / `$?`, `NAME=value` prefixes, `~`, `*` / `?` globs and quotes. Unknown commands exit 127 with `command not found`. `cwd` is also `$HOME`.",
    },
    {
      title: "Keyboard",
      body: "← → Home End, Backspace and Delete, ⌥/Ctrl+← → by word, ↑ ↓ history, Tab completes commands and paths (a second Tab lists matches), Ctrl+A / E start and end, Ctrl+U / K / W cut, Ctrl+Y pastes the cut, Ctrl+L clears, Ctrl+C cancels the line or a running command. Keys typed while a command runs are replayed when it ends. Pasted text with newlines runs line by line.",
    },
    {
      title: "Theme and size",
      body: "Colours come from the theme tokens of the element (its background and text colour, ANSI colours from `destructive`, `success`, `warning`, `primary` and the chart colours) and update when the `dark` class or the accent on `<html>` changes. The view fits its container on every resize and reports columns and rows to the transport. The emulator loads in the browser only, so it is safe in server-rendered and static pages.",
    },
  ],
  api: [
    {
      name: "Terminal",
      props: [
        { name: "transport", type: "TerminalTransport", required: true, description: "Byte stream to a shell." },
        { name: "fontSize", type: "number", default: "12", description: "Font size in px." },
        { name: "autoFocus", type: "boolean", description: "Focus the terminal once it loads." },
        { name: "onTitleChange", type: "(title: string) => void", description: "Called when the shell sets the window title; the local shell sets `user@host: cwd`." },
        { name: "ref", type: "Ref<TerminalHandle>", description: "`focus()`, `clear()`, `fit()` and `write(data)`." },
        { name: "className", type: "string", description: "Size and surface; the background and text colour also theme the emulator." },
      ],
    },
    {
      name: "createLocalShell",
      description: "Returns a `TerminalTransport`.",
      props: [
        { name: "fs", type: "ShellFs", required: true, description: "File system the shell works on." },
        { name: "cwd", type: "string", default: `"/"`, description: "Start directory and `$HOME`." },
        { name: "user", type: "string", default: `"user"`, description: "Shown in the prompt and `whoami`." },
        { name: "host", type: "string", default: `"localhost"`, description: "Shown in the prompt and `hostname`." },
        { name: "commands", type: "Record<string, ShellCommand>", description: "Extra commands; they win over builtins. Each gets `{ args, cwd, fs, print, env, stdin }` and returns an exit code (sync or async)." },
      ],
    },
    {
      name: "createWebSocketTransport",
      description: "Returns a `TerminalTransport`; connects when the view attaches.",
      props: [{ name: "url", type: "string", required: true, description: "Bridge address with `?token=`." }],
    },
    {
      name: "createMemoryFs",
      description: "Returns a `ShellFs` with `subscribe` for change notifications.",
      props: [{ name: "seed", type: "Record<string, string>", description: "Path → content. Parent directories are implied; a key ending in `/` makes an empty directory." }],
    },
  ],
} satisfies ComponentDoc
