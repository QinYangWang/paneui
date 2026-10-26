import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Floating panel for extra content or actions near a trigger.", "zh": "在触发控件附近显示补充内容。"},
  baseUi: {
    name: "Popover",
    href: "https://base-ui.com/react/components/popover",
  },
  usage: {
    imports: `import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"`,
    code: `<Popover>
  <PopoverTrigger render={<Button variant="secondary" />}>Details</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>All caught up</PopoverTitle>
    <PopoverDescription>No new approvals.</PopoverDescription>
  </PopoverContent>
</Popover>`,
  },
  composition: `Popover
├── PopoverTrigger
└── PopoverContent
    ├── PopoverCloseButton
    ├── PopoverHeader
    │   ├── PopoverTitle
    │   └── PopoverDescription
    └── PopoverFooter
        └── PopoverClose`,
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
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when the popover should close after a form submits.", zh: "适用于表单提交后需要关闭的浮层。" },
    },
    {
      id: "hover",
      title: { en: "Open on Hover", zh: "悬停打开" },
      description: { en: "Use for previews that should appear on hover, like a hover card.", zh: "适用于悬停查看的内容预览。" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The popup slides 4px toward its side and leaves faster than it arrives. With reduced motion it only fades.", zh: "弹出层向其所在侧滑动 4px，离开比进入更快。启用减少动态效果时仅淡出。" },
    },
    {
      title: "Keyboard",
      body: { en: "Enter or Space on the trigger opens it and moves focus inside; Esc closes it and returns focus.", zh: "在触发器上按 Enter 或 Space 打开并将焦点移入；按 Esc 关闭并返回焦点。" },
    },
    {
      title: "Related",
      body: { en: "[Popover Morph](/docs/popover-morph) grows the popover out of its trigger.", zh: "[Popover Morph](/docs/popover-morph) 让弹出层从触发器中展开。" },
    },
  ],
  api: [
    {
      name: "Popover",
      extends: "Popover.Root",
      extendsHref: "https://base-ui.com/react/components/popover#root",
      props: [],
    },
    {
      name: "PopoverTrigger",
      extends: "Popover.Trigger",
      extendsHref: "https://base-ui.com/react/components/popover#trigger",
      props: [],
    },
    {
      name: "PopoverContent",
      description: { en: "The 288px-wide popup, already wrapped in a portal and positioner.", zh: "宽 288px 的弹出层，已包装在 portal 和 positioner 中。" },
      extends: "Popover.Popup",
      extendsHref: "https://base-ui.com/react/components/popover#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          default: `"bottom"`,
          description: { en: "Edge of the trigger it opens on.", zh: "它从触发器哪一侧打开。" },
        },
        { name: "sideOffset", type: "number", default: "8", description: { en: "Gap to the trigger in px.", zh: "与触发器的间隙，单位为 px。" } },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"center"`,
          description: { en: "Alignment against the trigger.", zh: "相对触发器的对齐方式。" },
        },
        { name: "alignOffset", type: "number", default: "0", description: { en: "Shift along the alignment axis in px.", zh: "沿对齐轴偏移（px）。" } },
        {
          name: "collisionPadding",
          type: "number | Rect",
          default: "8",
          description: { en: "Space kept from the viewport edges.", zh: "与视口边缘保留的间距。" },
        },
      ],
      dataAttributes: [
        { name: "data-side", description: { en: "The side it actually opened on.", zh: "实际打开的那一侧。" } },
        { name: "data-starting-style / data-ending-style", description: { en: "Set during the enter and exit transitions.", zh: "在进入和退出过渡期间设置。" } },
      ],
    },
    {
      name: "PopoverHeader",
      description: { en: "Stacks title and description with a 4px gap.", zh: "堆叠标题和描述，间距 4px。" },
      extends: "div",
      props: [],
    },
    {
      name: "PopoverTitle",
      extends: "Popover.Title",
      extendsHref: "https://base-ui.com/react/components/popover#title",
      props: [],
    },
    {
      name: "PopoverDescription",
      extends: "Popover.Description",
      extendsHref: "https://base-ui.com/react/components/popover#description",
      props: [],
    },
    {
      name: "PopoverFooter",
      description: { en: "Right-aligned row for actions.", zh: "右对齐的操作行。" },
      extends: "div",
      props: [],
    },
    {
      name: "PopoverClose",
      description: { en: "Unstyled close part. Pass `render={<Button />}` to make any button close the popover.", zh: "无样式的关闭部分。传入 `render={<Button />}` 让任意按钮关闭弹出层。" },
      extends: "Popover.Close",
      extendsHref: "https://base-ui.com/react/components/popover#close",
      props: [],
    },
    {
      name: "PopoverCloseButton",
      description: { en: "Round × button pinned to the top-right corner, labelled \"Close\".", zh: "固定在右上角的圆形 × 按钮，标签为 “Close”。" },
      extends: "Popover.Close",
      extendsHref: "https://base-ui.com/react/components/popover#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
