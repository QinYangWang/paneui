import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: { en: "Shows a shell command with a button that copies it.", zh: "展示一条命令，并可一键复制。" },
  usage: {
    imports: `import { CommandCopy } from "@/components/ui/command-copy"`,
    code: `<CommandCopy command="npx paneui@latest init" />`,
  },
  examples: [
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" }, description: { en: "Use `lg` for the one install line on a landing page.", zh: "落地页上的安装命令用 `lg`。" } },
    { id: "floating", title: { en: "Floating", zh: "悬浮" }, description: { en: "Use on pictures and tinted sections.", zh: "用于图片或有底色的区块上。" } },
    { id: "no-prompt", title: { en: "Without prompt", zh: "无提示符" } },
  ],
  notes: [
    { title: "Copy feedback", body: "The copy glyph cross-fades to a check for 1.6s and a polite live region says “Copied”. Under reduced motion the swap is an opacity fade only. If the clipboard is blocked nothing changes and `onCopy` is not called." },
    { title: "Labels", body: "The button reads “Copy command” and “Copied” from the nearest `LocaleProvider` (`copyCommand`, `copied`); `label` overrides the first. The prompt glyph is hidden from assistive tech and never copied." },
    { title: "Long commands", body: "The command stays on one line and scrolls sideways without a scrollbar, so the button never moves." },
  ],
  api: [
    {
      name: "CommandCopy",
      extends: "div",
      props: [
        { name: "command", type: "string", required: true, description: "The command, exactly as it is copied." },
        { name: "prompt", type: "ReactNode", default: `"$"`, description: "Glyph before the command; `null` hides it." },
        { name: "label", type: "string", description: "Accessible name of the copy button." },
        { name: "onCopy", type: "(command: string) => void", description: "Called after the command reaches the clipboard." },
        { name: "variant", type: `"default" | "floating"`, default: `"default"`, description: "`default` is a raised card; `floating` is a translucent, blurred bar with a deeper shadow." },
        { name: "size", type: `"default" | "lg"`, default: `"default"`, description: "`default` is 40px with a ghost button; `lg` is a 56px round bar with a solid round 40px button and larger type from the `sm` breakpoint." },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The variant." },
        { name: "data-size", description: "The size." },
      ],
    },
  ],
} satisfies ComponentDoc
