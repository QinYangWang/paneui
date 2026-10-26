import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows the full text of a truncated label on hover.", "zh": "显示被截断的完整文本。"},
  baseUi: {
    name: "Preview Card",
    href: "https://base-ui.com/react/components/preview-card",
  },
  usage: {
    imports: `import { OverflowHintText } from "@/components/ui/overflow-hint"`,
    code: `<OverflowHintText>{thread.title}</OverflowHintText>`,
  },
  composition: `OverflowHint
├── OverflowHintTrigger
└── OverflowHintContent

OverflowHintText`,
  examples: [
    { id: "lines", title: { en: "Line Clamp", zh: "行数限制" },  },
    { id: "parts", title: { en: "Parts", zh: "组成部分" }, description: { en: "Use the parts when the hint shows something other than the label.", zh: "适用于提示内容与标签不同的场景。" } },
  ],
  notes: [
    {
      title: "When it opens",
      body: { en: "The trigger is measured when the pointer rests on it, and the hint opens only if its text is cut off (wider or taller than its box). Text that fits never opens it, so it is safe on every row.", zh: "当指针停留在触发器上时测量触发器，只有当其文本被截断（比其框更宽或更高）时提示才会打开。适合的文本永远不会打开它，因此对每一行都安全。" },
    },
    {
      title: "Selecting text",
      body: { en: "The pointer can move from the trigger into the hint without closing it, and the text there can be selected and copied. Presses inside the hint don't reach the trigger's row or tab. Pressing the trigger closes the hint until the pointer leaves, so clicks and drags don't bring it back.", zh: "指针可以从触发器移动到提示中而不关闭它，并且那里的文本可以被选择和复制。提示内的按压不会到达触发器的行或选项卡。按压触发器会关闭提示，直到指针离开，因此点击和拖动不会将其带回。" },
    },
    {
      title: "Long text",
      body: { en: "The hint wraps at 320px (or the viewport less 16px), breaks long paths and scrolls past 192px of height. Line breaks in a string are kept.", zh: "提示在 320px（或视口减去 16px）处换行，断开长路径，并在超过 192px 高度时滚动。字符串中的换行符保留。" },
    },
    {
      title: "Accessibility",
      body: { en: "Truncation is visual, so screen readers already get the full label from the trigger. The hint opens on hover only, which keeps it out of the way of keyboard focus on tabs and rows.", zh: "截断是视觉上的，因此屏幕阅读器已经从触发器获得完整标签。提示仅在悬停时打开，这使其远离选项卡和行的键盘焦点。" },
    },
    {
      title: "Motion",
      body: { en: "The hint opens and closes over 150ms with a slight scale and a 4px nudge from the trigger; with reduced motion it only fades.", zh: "提示在 150ms 内打开和关闭，带有轻微的缩放和从触发器 4px 的轻推；在减少动态效果下，它只淡入淡出。" },
    },
  ],
  api: [
    {
      name: "OverflowHintText",
      description: { en: "A trigger and its hint in one. Takes every `OverflowHintTrigger` prop.", zh: "触发器及其提示合二为一。接受所有 `OverflowHintTrigger` 属性。" },
      extends: "OverflowHintTrigger",
      props: [
        { name: "hint", type: "ReactNode", description: { en: "Hint content. Defaults to `children`.", zh: "提示内容。默认为 `children`。" } },
        { name: "side", type: `"top" | "right" | "bottom" | "left"`, default: `"top"`, description: { en: "Side of the text to open on.", zh: "文本打开的一侧。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: { en: "Alignment against the text.", zh: "相对于文本的对齐方式。" } },
        { name: "sideOffset", type: "number", default: "6", description: { en: "Gap from the text in px.", zh: "与文本的间隙，单位为 px。" } },
        { name: "alignOffset", type: "number", default: "0", description: { en: "Shift along the text in px.", zh: "沿文本的偏移，单位为 px。" } },
      ],
    },
    {
      name: "OverflowHint",
      description: { en: "Root. Keeps the hint closed while the trigger's text fits.", zh: "根。当触发器的文本适合时保持提示关闭。" },
      extends: "PreviewCard.Root",
      extendsHref: "https://base-ui.com/react/components/preview-card#root",
      props: [
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean, eventDetails) => void", description: { en: "Called when the hint opens or closes; never called to open untruncated text.", zh: "当提示打开或关闭时调用；永远不会为打开未截断的文本而调用。" } },
      ],
    },
    {
      name: "OverflowHintTrigger",
      description: { en: "The text that truncates and gets measured. Renders a block `span`.", zh: "被截断并被测量的文本。渲染一个块级 `span`。" },
      extends: "PreviewCard.Trigger",
      extendsHref: "https://base-ui.com/react/components/preview-card#trigger",
      props: [
        { name: "lines", type: "1 | 2 | 3", default: "1", description: { en: "Lines before the text is cut off with an ellipsis.", zh: "文本被省略号截断之前的行数。" } },
        { name: "delay", type: "number", default: "300", description: { en: "Milliseconds before the hint opens.", zh: "提示打开前的毫秒数。" } },
        { name: "closeDelay", type: "number", default: "150", description: { en: "Milliseconds before it closes after the pointer leaves.", zh: "指针离开后关闭前的毫秒数。" } },
      ],
    },
    {
      name: "OverflowHintContent",
      description: { en: "Portal, positioner and popup in one.", zh: "合并了 portal、positioner 和 popup。" },
      extends: "PreviewCard.Popup",
      extendsHref: "https://base-ui.com/react/components/preview-card#popup",
      props: [
        { name: "side", type: `"top" | "right" | "bottom" | "left"`, default: `"top"`, description: { en: "Side of the trigger to open on.", zh: "弹出层从触发器的哪一侧打开。" } },
        { name: "sideOffset", type: "number", default: "6", description: { en: "Gap from the trigger in px.", zh: "与触发器的间距，单位为 px。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: { en: "Alignment against the trigger.", zh: "相对触发器的对齐方式。" } },
        { name: "alignOffset", type: "number", default: "0", description: { en: "Shift along the trigger in px.", zh: "沿触发器的偏移，单位为 px。" } },
        { name: "collisionPadding", type: "number", default: "8", description: { en: "Space kept from the viewport edges in px.", zh: "与视口边缘保持的空间，单位为 px。" } },
      ],
      dataAttributes: [{ name: "data-side", description: { en: "The side it actually opened on, after collision handling.", zh: "经过碰撞处理后实际打开的一侧。" } }],
    },
  ],
} satisfies ComponentDoc
