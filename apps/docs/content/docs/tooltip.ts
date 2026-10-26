import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Labels a control with a short hint on hover or focus.", "zh": "在悬停或聚焦时显示提示。"},
  baseUi: {
    name: "Tooltip",
    href: "https://base-ui.com/react/components/tooltip",
  },
  usage: {
    imports: `import { Tooltip, TooltipContent, TooltipKbd, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`,
    code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label="Copy" />}>
      <CopyIcon />
    </TooltipTrigger>
    <TooltipContent>
      Copy <TooltipKbd>⌘C</TooltipKbd>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  composition: `TooltipProvider
└── Tooltip
    ├── TooltipTrigger
    └── TooltipContent
        └── TooltipKbd`,
  examples: [
    {
      id: "sides",
      title: { en: "Sides", zh: "方向" },
    },
    {
      id: "align",
      title: { en: "Align", zh: "对齐" },
    },
    {
      id: "with-icon",
      title: { en: "With Icon", zh: "带图标" },
    },
    {
      id: "delay",
      title: { en: "Delay", zh: "延迟" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The tooltip scales from 90% and nudges 4px toward the trigger over 150ms. Moving between triggers in the same provider shows the next one instantly.", zh: "提示在 150ms 内从 90% 缩放，并向触发器偏移 4px。在同一 provider 内的触发器之间移动时，下一个提示会立即显示。" },
    },
    {
      title: "Accessibility",
      body: { en: "Tooltips open on hover and keyboard focus, and close with `Esc`. Keep essential information out of tooltips, since touch users can't hover.", zh: "提示在悬停和键盘聚焦时打开，按 `Esc` 关闭。不要把关键信息只放在提示中，因为触屏用户无法悬停。" },
    },
  ],
  api: [
    {
      name: "TooltipProvider",
      description: { en: "Shares the open delay between tooltips. The docs app wraps everything in one.", zh: "在多个提示之间共享打开延迟。文档应用将所有内容包裹在一个 provider 中。" },
      extends: "Tooltip.Provider",
      extendsHref: "https://base-ui.com/react/components/tooltip#provider",
      props: [
        { name: "delay", type: "number", default: "300", description: { en: "Milliseconds before a tooltip opens.", zh: "提示打开前的毫秒数。" } },
        { name: "closeDelay", type: "number", description: { en: "Milliseconds before it closes.", zh: "提示关闭前的毫秒数。" } },
      ],
    },
    {
      name: "Tooltip",
      description: { en: "Re-export of the primitive root.", zh: "重新导出 primitive 根。" },
      extends: "Tooltip.Root",
      extendsHref: "https://base-ui.com/react/components/tooltip#root",
      props: [
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: { en: "Called when the tooltip opens or closes.", zh: "提示打开或关闭时调用。" },
        },
      ],
    },
    {
      name: "TooltipTrigger",
      description: { en: "Re-export. Use `render` to make a Button the trigger.", zh: "重新导出。使用 `render` 让 Button 成为触发器。" },
      extends: "Tooltip.Trigger",
      extendsHref: "https://base-ui.com/react/components/tooltip#trigger",
      props: [],
    },
    {
      name: "TooltipContent",
      description: { en: "Portal, positioner and popup in one.", zh: "合并了 portal、positioner 和 popup。" },
      extends: "Tooltip.Popup",
      extendsHref: "https://base-ui.com/react/components/tooltip#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          default: `"top"`,
          description: { en: "Side of the trigger to open on. Passed to the positioner.", zh: "在触发器的哪一侧打开。传递给定位器。" },
        },
        { name: "sideOffset", type: "number", default: "8", description: { en: "Gap from the trigger in px.", zh: "与触发器的间距，单位为 px。" } },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"center"`,
          description: { en: "Alignment against the trigger.", zh: "相对触发器的对齐方式。" },
        },
      ],
      dataAttributes: [
        { name: "data-side", description: { en: "The side it actually opened on, after collision handling.", zh: "经过碰撞处理后实际打开的一侧。" } },
        { name: "data-instant", description: { en: "Present when it opens without animation (moving between triggers).", zh: "在无动画打开时（在触发器之间移动）存在。" } },
      ],
    },
    {
      name: "TooltipKbd",
      description: { en: "Small keycap for a shortcut, pulled to the trailing edge.", zh: "用于快捷键的小键帽，被拉到尾部边缘。" },
      extends: "kbd",
      props: [],
    },
  ],
} satisfies ComponentDoc
