import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/popover"

export default {
  summary: {"en": "Popover that grows out of its trigger and folds back.", "zh": "从触发控件展开浮层。"},
  baseUi: { name: "Popover", href: BASE },
  usage: {
    imports: `import { MorphPopover, MorphPopoverContent, MorphPopoverTitle, MorphPopoverTrigger } from "@/components/ui/popover-morph"`,
    code: `<MorphPopover>
  <MorphPopoverTrigger>Alerts</MorphPopoverTrigger>
  <MorphPopoverContent>
    <MorphPopoverTitle>Deploy alerts</MorphPopoverTitle>
  </MorphPopoverContent>
</MorphPopover>`,
  },
  composition: `MorphPopover
├── MorphPopoverTrigger
└── MorphPopoverContent
    ├── MorphPopoverCloseButton
    ├── MorphPopoverHeader
    │   ├── MorphPopoverTitle
    │   └── MorphPopoverDescription
    └── MorphPopoverFooter
        └── MorphPopoverClose`,
  examples: [
    {
      id: "placement",
      title: { en: "Placement", zh: "位置" },
    },
    {
      id: "form",
      title: { en: "Controlled Form", zh: "受控表单" },
      description: { en: "Use when the panel should close after a submit.", zh: "适用于提交后需要关闭的面板。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The surface grows from a copy of the trigger across the 8px gap over 450ms, and the content settles in 150ms later. Closing folds it back in 300ms. With reduced motion it only cross-fades, in 150ms.", zh: "面板从触发器的副本沿 8px 间隙在 450ms 内展开，内容在 150ms 后稳定下来。关闭时在 300ms 内折回。启用减少动态效果时，仅做 150ms 的交叉淡入淡出。" },
    },
    {
      title: "Keyboard",
      body: { en: "Enter or Space opens it, focus moves into the panel, Escape or an outside press closes it and returns focus to the trigger.", zh: "Enter 或 Space 打开，焦点移入面板，Escape 或外部按下关闭并将焦点返回触发器。" },
    },
    {
      title: "Related",
      body: { en: "See also [Select Morph](/docs/select-morph), [Morphing Modal](/docs/morphing-modal), [Morphing Search](/docs/morphing-search) and [Morphing Tabs](/docs/morphing-tabs).", zh: "另见 [Select Morph](/docs/select-morph)、[Morphing Modal](/docs/morphing-modal)、[Morphing Search](/docs/morphing-search) 和 [Morphing Tabs](/docs/morphing-tabs)。" },
    },
  ],
  api: [
    {
      name: "MorphPopover",
      description: { en: "`Popover.Root`, re-exported unchanged.", zh: "`Popover.Root`，原样重新导出。" },
      extends: "Popover.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "MorphPopoverTrigger",
      description: { en: "A raised trigger (32px, `rounded-lg`).", zh: "凸起的触发器（32px，`rounded-lg`）。" },
      extends: "Popover.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphPopoverContent",
      description: { en: "Portal, positioner and popup, anchored to the trigger like Popover (8px side offset) with the standard popover surface (`rounded-2xl`, `bg-popover`, `shadow-surface`). A 288px panel by default.", zh: "Portal、positioner 和 popup，像 Popover 一样锚定到触发器（侧边偏移 8px），使用标准弹出层表面（`rounded-2xl`、`bg-popover`、`shadow-surface`）。面板默认宽度 288px。" },
      extends: "Popover.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom"`, default: `"bottom"`, description: { en: "Which side of the trigger the panel opens on (and grows towards).", zh: "面板从触发器的哪一侧打开（并朝该方向展开）。" } },
        { name: "sideOffset", type: "number", default: "8", description: { en: "Gap between trigger and panel in px, as in Popover.", zh: "触发器与面板之间的间隙，单位为 px，与 Popover 相同。" } },
        { name: "collisionPadding", type: "number", default: "8", description: { en: "Viewport margin kept when the panel flips or shifts.", zh: "面板翻转或移位时保留的视口边距。" } },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"center"`,
          description: { en: "Which trigger edge the panel lines up with, as in Popover.", zh: "面板与触发器的哪条边对齐，与 Popover 相同。" },
        },
        {
          name: "triggerRadius",
          type: "string",
          default: `"var(--radius-lg)"`,
          description: { en: "Corner radius (CSS length) of the trigger shape the panel starts from. The default matches `MorphPopoverTrigger`'s `rounded-lg`; change it only if you reshape the trigger.", zh: "面板起始形状的圆角半径（CSS 长度），与触发器一致。默认值与 `MorphPopoverTrigger` 的 `rounded-lg` 匹配；仅在重塑触发器时修改。" },
        },
      ],
      dataAttributes: [
        { name: "data-side / data-align", description: { en: "The resolved placement (on the positioner and popup), used to work out where the morph starts.", zh: "解析后的放置位置（在 positioner 和 popup 上），用于计算变形起点。" } },
        { name: "data-starting-style / data-ending-style", description: { en: "Present while the panel opens or closes.", zh: "面板打开或关闭期间存在。" } },
      ],
    },
    {
      name: "MorphPopoverHeader",
      description: { en: "Title and description stack; leaves room on the right for the close button.", zh: "堆叠标题和描述；右侧为关闭按钮留出空间。" },
      extends: "div",
      props: [],
    },
    {
      name: "MorphPopoverTitle",
      extends: "Popover.Title",
      extendsHref: `${BASE}#title`,
      props: [],
    },
    {
      name: "MorphPopoverDescription",
      extends: "Popover.Description",
      extendsHref: `${BASE}#description`,
      props: [],
    },
    {
      name: "MorphPopoverFooter",
      description: { en: "Right-aligned row of actions.", zh: "右对齐的操作行。" },
      extends: "div",
      props: [],
    },
    {
      name: "MorphPopoverClose",
      description: { en: "Unstyled close part; pass `render` to turn any element (e.g. a `Button`) into a close control.", zh: "无样式的关闭部分；传入 `render` 可将任意元素（例如 `Button`）变成关闭控件。" },
      extends: "Popover.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
    {
      name: "MorphPopoverCloseButton",
      description: { en: "Round × button pinned to the panel's top-right corner, labelled `Close`.", zh: "固定在面板右上角的圆形 × 按钮，标签为 `Close`。" },
      extends: "Popover.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
  ],
} satisfies ComponentDoc
