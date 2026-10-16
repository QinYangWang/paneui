import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
    { id: "minimal", title: "Minimal", description: "Use for plain chat; without `onAttach` and `onVoice` there are no extra buttons." },
    { id: "labels", title: "Labels and Input Props", description: "Use `labels` for another language and `inputProps` for an id, a name or the Enter key hint." },
  ],
  notes: [
    { title: "Keyboard", body: "Enter sends, Shift+Enter adds a line and Escape stops a busy agent. With suggestions open, arrow keys move, Enter or Tab inserts and Escape closes them." },
    { title: "Labels", body: "Unset `labels` keys come from `LocaleProvider`, English by default." },
  ],
  api: [
    {
      name: "AgentComposer",
      extends: "form",
      props: [
        { name: "onSubmit", type: "(text: string) => void", description: "Called with the trimmed text; the composer clears itself." },
        { name: "busy", type: "boolean", default: "false", description: "Send turns into Stop." },
        { name: "onStop", type: "() => void", description: "Stop button and Escape while busy." },
        { name: "onAttach", type: "() => void", description: "Shows the attach button." },
        { name: "onVoice", type: "() => void", description: "Shows the dictate button." },
        { name: "labels", type: "{ attach?, send?, stop?, input?, dictate?, mentions?, commands? }", description: "Button names and tooltips, the input's accessible name and the suggestion headings." },
        { name: "inputProps", type: "TextareaHTMLAttributes", description: "Passed to the textarea; its handlers run before the composer's own." },
        { name: "mentions", type: "{ value, description?, icon? }[]", description: "Offered after `@`." },
        { name: "commands", type: "{ name, description?, hint? }[]", description: "Offered after a leading `/`." },
        { name: "toolbarStart / toolbarEnd", type: "ReactNode", description: "Controls such as mode, model and effort pickers." },
        { name: "header", type: "ReactNode", description: "Stacked above the input: banners, approvals, queued messages." },
        { name: "value / defaultValue / onValueChange", type: "string / string / (value: string) => void", description: "Controlled or uncontrolled text." },
      ],
      dataAttributes: [{ name: "data-busy", description: "Present while busy." }],
    },
  ],
} satisfies ComponentDoc
