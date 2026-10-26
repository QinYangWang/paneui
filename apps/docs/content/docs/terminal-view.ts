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
    { title: "ANSI", body: { en: "`TerminalOutput` parses SGR colour codes plus bold, dim, italic, underline and inverse; 256-colour and 24-bit colours map to the nearest base colour. Colours map to theme tokens (red → destructive, green → success, yellow → warning, blue → primary, magenta / cyan → chart colours), so output follows the theme and accent. A carriage return rewrites the current line, and cursor movement and OSC sequences are dropped. `parseAnsi` and `stripAnsi` are exported.", zh: "`TerminalOutput` 解析 SGR 颜色代码以及粗体、暗淡、斜体、下划线和反显；256 色和 24 位颜色映射到最接近的基础颜色。颜色映射到主题变量（red → destructive，green → success，yellow → warning，blue → primary，magenta / cyan → chart 颜色），因此输出跟随主题和主题色。回车符重写当前行，光标移动和 OSC 序列被丢弃。`parseAnsi` 和 `stripAnsi` 也会导出。" } },
    { title: "Following", body: { en: "Output stays pinned to the end while it grows, until the reader scrolls up; scrolling back to the bottom re-attaches. The log is `role=\"log\"` with polite announcements.", zh: "输出增长时保持固定在末尾，直到读者向上滚动；滚动回底部重新固定。日志为 `role=\"log\"`，使用礼貌播报。" } },
    { title: "History", body: { en: "`TerminalInput` keeps submitted commands, and ↑ / ↓ walk back and forward through them.", zh: "`TerminalInput` 保留已提交的命令，↑ / ↓ 在它们之间前后浏览。" } },
  ],
  api: [
    { name: "Terminal", extends: "div", props: [{ name: "variant", type: `"default" | "embedded"`, default: `"default"`, description: { en: "Full panel surface or compact inset well.", zh: "完整面板表面或紧凑的内嵌槽。" } }] },
    {
      name: "TerminalOutput",
      extends: "div",
      props: [
        { name: "text", type: "string", required: true, description: { en: "Raw output with ANSI escape codes.", zh: "带 ANSI 转义码的原始输出。" } },
        { name: "follow", type: "boolean", default: "true", description: { en: "Stick to the end while new output arrives.", zh: "新输出到达时固定在末尾。" } },
        { name: "wrap", type: "boolean", default: "true", description: { en: "Wrap long lines instead of scrolling sideways.", zh: "长行换行而不是横向滚动。" } },
      ],
    },
    {
      name: "TerminalInput",
      extends: "input",
      props: [
        { name: "prompt", type: "ReactNode", default: `"❯"`, description: { en: "Glyph before the input.", zh: "输入前的符号。" } },
        { name: "onSubmit", type: "(command: string) => void", description: { en: "Called on Enter; the input clears.", zh: "按 Enter 时调用；输入会清空。" } },
      ],
    },
    { name: "TerminalStatusLine", extends: "div", props: [{ name: "text", type: "string", description: { en: "ANSI text to render; otherwise children.", zh: "要渲染的 ANSI 文本；否则渲染子元素。" } }] },
  ],
} satisfies ComponentDoc
