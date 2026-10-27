import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: { en: "Shows a shell command with a button that copies it.", zh: "展示一条命令，并可一键复制。" },
  usage: {
    imports: `import { CommandCopy } from "@/components/ui/command-copy"`,
    code: `<CommandCopy command="npx @taimatsu/paneui@latest init" />`,
  },
  examples: [
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" }, description: { en: "Use `lg` for the one install line on a landing page.", zh: "落地页上的安装命令用 `lg`。" } },
    { id: "floating", title: { en: "Floating", zh: "悬浮" }, description: { en: "Use on pictures and tinted sections.", zh: "用于图片或有底色的区块上。" } },
    { id: "no-prompt", title: { en: "Without prompt", zh: "无提示符" } },
  ],
  notes: [
    { title: "Copy feedback", body: { en: "The copy glyph cross-fades to a check for 1.6s and a polite live region says “Copied”. Under reduced motion the swap is an opacity fade only. If the clipboard is blocked nothing changes and `onCopy` is not called.", zh: "复制图标交叉淡入为对勾，持续 1.6 秒，礼貌的实时区域朗读“已复制”。在减少动态效果下，仅以不透明度淡入淡出切换。如果剪贴板被阻止，则无变化且不调用 `onCopy`。" } },
    { title: "Labels", body: { en: "The button reads “Copy command” and “Copied” from the nearest `LocaleProvider` (`copyCommand`, `copied`); `label` overrides the first. The prompt glyph is hidden from assistive tech and never copied.", zh: "按钮从最近的 `LocaleProvider` 读取“Copy command”和“Copied”（`copyCommand`、`copied`）；`label` 覆盖第一个。提示图标对辅助技术隐藏，且永远不会被复制。" } },
    { title: "Long commands", body: { en: "The command stays on one line and scrolls sideways without a scrollbar, so the button never moves.", zh: "命令保持在一行并横向滚动，不显示滚动条，因此按钮永远不会移动。" } },
  ],
  api: [
    {
      name: "CommandCopy",
      extends: "div",
      props: [
        { name: "command", type: "string", required: true, description: { en: "The command, exactly as it is copied.", zh: "命令，与复制时完全一致。" } },
        { name: "prompt", type: "ReactNode", default: `"$"`, description: { en: "Glyph before the command; `null` hides it.", zh: "命令前的图标；`null` 隐藏它。" } },
        { name: "label", type: "string", description: { en: "Accessible name of the copy button.", zh: "复制按钮的无障碍名称。" } },
        { name: "onCopy", type: "(command: string) => void", description: { en: "Called after the command reaches the clipboard.", zh: "命令到达剪贴板后调用。" } },
        { name: "variant", type: `"default" | "floating"`, default: `"default"`, description: { en: "`default` is a raised card; `floating` is a translucent, blurred bar with a deeper shadow.", zh: "`default` 是凸起卡片；`floating` 是半透明、模糊且阴影更深的条。" } },
        { name: "size", type: `"default" | "lg"`, default: `"default"`, description: { en: "`default` is 40px with a ghost button; `lg` is a 56px round bar with a solid round 40px button and larger type from the `sm` breakpoint.", zh: "`default` 是 40px 带幽灵按钮；`lg` 是 56px 圆形条，带实心圆形 40px 按钮，从 `sm` 断点起使用更大字号。" } },
      ],
      dataAttributes: [
        { name: "data-variant", description: { en: "The variant.", zh: "变体。" } },
        { name: "data-size", description: { en: "The size.", zh: "尺寸。" } },
      ],
    },
  ],
} satisfies ComponentDoc
