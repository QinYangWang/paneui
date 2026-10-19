import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows command output and takes commands in a terminal panel.", "zh": "展示命令输出并接收输入。"},
  usage: {
    imports: `import { Terminal, TerminalInput, TerminalOutput, TerminalStatusLine } from "@/components/ui/terminal-view"`,
    code: `<Terminal className="h-80">
  <TerminalOutput text={output} />
  <TerminalInput onSubmit={run} />
  <TerminalStatusLine text={status} />
</Terminal>`,
  },
  composition: `Terminal
├── TerminalOutput
├── TerminalInput
└── TerminalStatusLine`,
  examples: [
    { id: "progress", title: { en: "Progress", zh: "进度" }, description: { en: "Use for installs and downloads whose progress lines rewrite in place.", zh: "适用于会原地更新进度的安装或下载输出。" } },
    { id: "embedded", title: { en: "Embedded", zh: "嵌入" },  },
  ],
  notes: [
    { title: "ANSI", body: "`TerminalOutput` parses SGR colour codes plus bold, dim, italic, underline and inverse; 256-colour and 24-bit colours map to the nearest base colour. Colours map to theme tokens (red → destructive, green → success, yellow → warning, blue → primary, magenta / cyan → chart colours), so output follows the theme and accent. A carriage return rewrites the current line, and cursor movement and OSC sequences are dropped. `parseAnsi` and `stripAnsi` are exported." },
    { title: "Following", body: "Output stays pinned to the end while it grows, until the reader scrolls up; scrolling back to the bottom re-attaches. The log is `role=\"log\"` with polite announcements." },
    { title: "History", body: "`TerminalInput` keeps submitted commands, and ↑ / ↓ walk back and forward through them." },
  ],
  api: [
    { name: "Terminal", extends: "div", props: [{ name: "variant", type: `"default" | "embedded"`, default: `"default"`, description: "Full panel surface or compact inset well." }] },
    {
      name: "TerminalOutput",
      extends: "div",
      props: [
        { name: "text", type: "string", required: true, description: "Raw output with ANSI escape codes." },
        { name: "follow", type: "boolean", default: "true", description: "Stick to the end while new output arrives." },
        { name: "wrap", type: "boolean", default: "true", description: "Wrap long lines instead of scrolling sideways." },
      ],
    },
    {
      name: "TerminalInput",
      extends: "input",
      props: [
        { name: "prompt", type: "ReactNode", default: `"❯"`, description: "Glyph before the input." },
        { name: "onSubmit", type: "(command: string) => void", description: "Called on Enter; the input clears." },
      ],
    },
    { name: "TerminalStatusLine", extends: "div", props: [{ name: "text", type: "string", description: "ANSI text to render; otherwise children." }] },
  ],
} satisfies ComponentDoc
