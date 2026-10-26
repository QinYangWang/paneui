import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Prompt input for coding agents with file mentions and commands.", "zh": "输入提示并引用文件或命令。"},
  usage: {
    imports: `import { AgentComposer, AgentComposerBanner } from "@/components/agent-composer"`,
    code: `<AgentComposer
  busy={busy}
  onSubmit={send}
  onStop={stop}
  onAttach={pickFiles}
  mentions={files.map((value) => ({ value }))}
  toolbarEnd={<ModelPicker models={models} value={model} onValueChange={setModel} />}
/>`,
  },
  composition: `AgentComposer
└── AgentComposerBanner (in header)`,
  examples: [
    { id: "minimal", title: { en: "Minimal", zh: "简洁" },  },
    { id: "labels", title: { en: "Labels and Input Props", zh: "标签与输入属性" },  },
  ],
  notes: [
    { title: "Keyboard", body: { en: "Enter sends, Shift+Enter adds a line and Escape stops a busy agent. With suggestions open, arrow keys move, Enter or Tab inserts and Escape closes them.", zh: "Enter 发送，Shift+Enter 换行，Escape 停止忙碌的智能体。建议打开时，方向键移动，Enter 或 Tab 插入，Escape 关闭。" } },
    { title: "Labels", body: { en: "Unset `labels` keys come from `LocaleProvider`, English by default.", zh: "未设置的 `labels` 键来自 `LocaleProvider`，默认为英文。" } },
  ],
  api: [
    {
      name: "AgentComposer",
      extends: "form",
      props: [
        { name: "onSubmit", type: "(text: string) => void", description: { en: "Called with the trimmed text; the composer clears itself.", zh: "以去除首尾空白后的文本调用；编辑器随后自行清空。" } },
        { name: "busy", type: "boolean", default: "false", description: { en: "Send turns into Stop.", zh: "发送变为停止。" } },
        { name: "onStop", type: "() => void", description: { en: "Stop button and Escape while busy.", zh: "忙碌时显示停止按钮，并支持按 Esc。" } },
        { name: "onAttach", type: "() => void", description: { en: "Shows the attach button.", zh: "显示附件按钮。" } },
        { name: "onVoice", type: "() => void", description: { en: "Shows the dictate button.", zh: "显示听写按钮。" } },
        { name: "labels", type: "{ attach?, send?, stop?, input?, dictate?, mentions?, commands? }", description: { en: "Button names and tooltips, the input's accessible name and the suggestion headings.", zh: "按钮名称和提示、输入框的可访问名称以及建议标题。" } },
        { name: "inputProps", type: "TextareaHTMLAttributes", description: { en: "Passed to the textarea; its handlers run before the composer's own.", zh: "传给 textarea；其处理函数会在 composer 自身的处理函数之前运行。" } },
        { name: "mentions", type: "{ value, description?, icon? }[]", description: { en: "Offered after `@`.", zh: "在 `@` 之后提供。" } },
        { name: "commands", type: "{ name, description?, hint? }[]", description: { en: "Offered after a leading `/`.", zh: "在以 `/` 开头时提供。" } },
        { name: "toolbarStart / toolbarEnd", type: "ReactNode", description: { en: "Controls such as mode, model and effort pickers.", zh: "模式、模型和 effort 选择器等控件。" } },
        { name: "header", type: "ReactNode", description: { en: "Stacked above the input: banners, approvals, queued messages.", zh: "堆叠在输入框上方：横幅、审批、排队消息。" } },
        { name: "value / defaultValue / onValueChange", type: "string / string / (value: string) => void", description: { en: "Controlled or uncontrolled text.", zh: "受控或非受控文本。" } },
      ],
      dataAttributes: [{ name: "data-busy", description: { en: "Present while busy.", zh: "忙碌时显示。" } }],
    },
  ],
} satisfies ComponentDoc
