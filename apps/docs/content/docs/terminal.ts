import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Runs a shell in the page or on your machine.", "zh": "在页面中运行命令。"},
  usage: {
    imports: `import { Terminal, createLocalShell, createMemoryFs } from "@/components/ui/terminal"`,
    code: `const [shell] = React.useState(() =>
  createLocalShell({ fs: createMemoryFs({ "README.md": "# hi\\n" }) })
)

<Terminal transport={shell} className="h-80" />`,
  },
  examples: [
    { id: "custom-commands", title: { en: "Custom commands", zh: "自定义命令" },  },
    { id: "shared-files", title: { en: "Shared files", zh: "共享文件" },  },
    { id: "websocket", title: { en: "Real shell", zh: "本机终端" }, description: { en: "Use the WebSocket transport to drive a shell on your machine through the PTY bridge.", zh: "适用于通过桥接服务连接本机终端的场景。" } },
  ],
  notes: [
    {
      title: "Transports",
      body: { en: "`Terminal` only draws and takes keys; a `TerminalTransport` is the byte stream behind it. `createLocalShell` runs a shell in the page on a `ShellFs`. `createWebSocketTransport` talks to the PTY bridge: text frames carry data both ways and `{\"type\":\"resize\",\"cols\":n,\"rows\":n}` resizes. Output sent before the view attaches is kept and replayed. Create a transport once (`useState` initialiser) and dispose it yourself; the view never disposes it, so it survives remounts.", zh: "`Terminal` 只负责绘制和接收按键；`TerminalTransport` 是它背后的字节流。`createLocalShell` 在 `ShellFs` 上于页面内运行 shell。`createWebSocketTransport` 与 PTY 桥通信：文本帧双向传输数据，`{\"type\":\"resize\",\"cols\":n,\"rows\":n}` 用于调整大小。视图挂载前发送的输出会被保留并重放。只创建一次 transport（用 `useState` 初始化器），并自行销毁；视图不会销毁它，因此它能跨重新挂载存活。" },
    },
    {
      title: "PTY bridge",
      body: { en: "Installing the item also adds `terminal-server/pty-bridge.mjs` and its README. Run `npm install node-pty`, then `node terminal-server/pty-bridge.mjs`; it prints the address and token. It binds to `127.0.0.1` and rejects connections without the token, which grants shell access as you.", zh: "安装该项还会添加 `terminal-server/pty-bridge.mjs` 及其 README。运行 `npm install node-pty`，然后运行 `node terminal-server/pty-bridge.mjs`；它会打印地址和令牌。它绑定到 `127.0.0.1` 并拒绝没有令牌的连接，该令牌授予以你的身份访问 shell 的权限。" },
    },
    {
      title: "Local shell",
      body: { en: "Builtins: `ls -la`, `cd`, `pwd`, `cat`, `echo -ne`, `mkdir -p`, `touch`, `rm -rf`, `mv`, `cp -r`, `head`, `tail`, `wc`, `grep -invcrl`, `sort`, `uniq -c`, `tree`, `clear`, `history`, `env`, `export`, `unset`, `which`, `help`, `date`, `whoami`, `hostname`, `true`, `false`. `js <code>` evaluates the rest of the line (or stdin) with `fs` and `process` in scope and prints the result; `node -e`, `node -p` and `node <file>` run code too. Syntax: `|`, `>`, `>>`, `<`, `&&`, `||`, `;`, `$VAR` / `${VAR}` / `$?`, `NAME=value` prefixes, `~`, `*` / `?` globs and quotes. Unknown commands exit 127 with `command not found`. `cwd` is also `$HOME`.", zh: "内置命令：`ls -la`、`cd`、`pwd`、`cat`、`echo -ne`、`mkdir -p`、`touch`、`rm -rf`、`mv`、`cp -r`、`head`、`tail`、`wc`、`grep -invcrl`、`sort`、`uniq -c`、`tree`、`clear`、`history`、`env`、`export`、`unset`、`which`、`help`、`date`、`whoami`、`hostname`、`true`、`false`。`js <code>` 在作用域内包含 `fs` 和 `process` 的情况下求值该行剩余部分（或 stdin）并打印结果；`node -e`、`node -p` 和 `node <file>` 也运行代码。语法：`|`、`>`、`>>`、`<`、`&&`、`||`、`;`、`$VAR` / `${VAR}` / `$?`、`NAME=value` 前缀、`~`、`*` / `?` 通配符和引号。未知命令以 127 退出并显示 `command not found`。`cwd` 也是 `$HOME`。" },
    },
    {
      title: "Keyboard",
      body: { en: "← → Home End, Backspace and Delete, ⌥/Ctrl+← → by word, ↑ ↓ history, Tab completes commands and paths (a second Tab lists matches), Ctrl+A / E start and end, Ctrl+U / K / W cut, Ctrl+Y pastes the cut, Ctrl+L clears, Ctrl+C cancels the line or a running command. Keys typed while a command runs are replayed when it ends. Pasted text with newlines runs line by line.", zh: "← → Home End、Backspace 和 Delete、⌥/Ctrl+← → 按词移动、↑ ↓ 历史、Tab 补全命令和路径（再按一次 Tab 列出匹配项）、Ctrl+A / E 跳到行首和行尾、Ctrl+U / K / W 剪切、Ctrl+Y 粘贴剪切内容、Ctrl+L 清屏、Ctrl+C 取消当前行或运行中的命令。命令运行时输入的按键会在结束后重放。含换行符的粘贴文本会逐行运行。" },
    },
    {
      title: "Theme and size",
      body: { en: "Colours come from the theme tokens of the element (its background and text colour, ANSI colours from `destructive`, `success`, `warning`, `primary` and the chart colours) and update when the `dark` class or the accent on `<html>` changes. The view fits its container on every resize and reports columns and rows to the transport. The emulator loads in the browser only, so it is safe in server-rendered and static pages.", zh: "颜色来自元素的主题变量（其背景和文本颜色，ANSI 颜色来自 `destructive`、`success`、`warning`、`primary` 以及图表颜色），并在 `dark` 类或 `<html>` 上的 accent 变化时更新。视图在每次调整大小时适配容器，并向 transport 报告列数和行数。模拟器仅在浏览器中加载，因此在服务端渲染和静态页面中是安全的。" },
    },
  ],
  api: [
    {
      name: "Terminal",
      props: [
        { name: "transport", type: "TerminalTransport", required: true, description: { en: "Byte stream to a shell.", zh: "到 shell 的字节流。" } },
        { name: "fontSize", type: "number", default: "12", description: { en: "Font size in px.", zh: "字体大小，单位 px。" } },
        { name: "autoFocus", type: "boolean", description: { en: "Focus the terminal once it loads.", zh: "加载后聚焦终端。" } },
        { name: "onTitleChange", type: "(title: string) => void", description: { en: "Called when the shell sets the window title; the local shell sets `user@host: cwd`.", zh: "当 shell 设置窗口标题时调用；本地 shell 设置为 `user@host: cwd`。" } },
        { name: "ref", type: "Ref<TerminalHandle>", description: { en: "`focus()`, `clear()`, `fit()` and `write(data)`.", zh: "`focus()`、`clear()`、`fit()` 和 `write(data)`。" } },
        { name: "className", type: "string", description: { en: "Size and surface; the background and text colour also theme the emulator.", zh: "尺寸和外观；背景和文本颜色也会影响模拟器主题。" } },
      ],
    },
    {
      name: "createLocalShell",
      description: { en: "Returns a `TerminalTransport`.", zh: "返回一个 `TerminalTransport`。" },
      props: [
        { name: "fs", type: "ShellFs", required: true, description: { en: "File system the shell works on.", zh: "shell 工作的文件系统。" } },
        { name: "cwd", type: "string", default: `"/"`, description: { en: "Start directory and `$HOME`.", zh: "起始目录和 `$HOME`。" } },
        { name: "user", type: "string", default: `"user"`, description: { en: "Shown in the prompt and `whoami`.", zh: "显示在提示符和 `whoami` 中。" } },
        { name: "host", type: "string", default: `"localhost"`, description: { en: "Shown in the prompt and `hostname`.", zh: "显示在提示符和 `hostname` 中。" } },
        { name: "commands", type: "Record<string, ShellCommand>", description: { en: "Extra commands; they win over builtins. Each gets `{ args, cwd, fs, print, env, stdin }` and returns an exit code (sync or async).", zh: "额外命令；它们优先于内置命令。每个接收 `{ args, cwd, fs, print, env, stdin }` 并返回退出码（同步或异步）。" } },
      ],
    },
    {
      name: "createWebSocketTransport",
      description: { en: "Returns a `TerminalTransport`; connects when the view attaches.", zh: "返回一个 `TerminalTransport`；在视图挂载时连接。" },
      props: [{ name: "url", type: "string", required: true, description: { en: "Bridge address with `?token=`.", zh: "带 `?token=` 的桥地址。" } }],
    },
    {
      name: "createMemoryFs",
      description: { en: "Returns a `ShellFs` with `subscribe` for change notifications.", zh: "返回一个带有 `subscribe` 用于变更通知的 `ShellFs`。" },
      props: [{ name: "seed", type: "Record<string, string>", description: { en: "Path → content. Parent directories are implied; a key ending in `/` makes an empty directory.", zh: "路径 → 内容。父目录隐含；以 `/` 结尾的键会创建空目录。" } }],
    },
  ],
} satisfies ComponentDoc
