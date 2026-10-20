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
      body: "The trigger is measured when the pointer rests on it, and the hint opens only if its text is cut off (wider or taller than its box). Text that fits never opens it, so it is safe on every row.",
    },
    {
      title: "Selecting text",
      body: "The pointer can move from the trigger into the hint without closing it, and the text there can be selected and copied. Presses inside the hint don't reach the trigger's row or tab. Pressing the trigger closes the hint until the pointer leaves, so clicks and drags don't bring it back.",
    },
    {
      title: "Long text",
      body: "The hint wraps at 320px (or the viewport less 16px), breaks long paths and scrolls past 192px of height. Line breaks in a string are kept.",
    },
    {
      title: "Accessibility",
      body: "Truncation is visual, so screen readers already get the full label from the trigger. The hint opens on hover only, which keeps it out of the way of keyboard focus on tabs and rows.",
    },
    {
      title: "Motion",
      body: "The hint opens and closes over 150ms with a slight scale and a 4px nudge from the trigger; with reduced motion it only fades.",
    },
  ],
  api: [
    {
      name: "OverflowHintText",
      description: "A trigger and its hint in one. Takes every `OverflowHintTrigger` prop.",
      extends: "OverflowHintTrigger",
      props: [
        { name: "hint", type: "ReactNode", description: "Hint content. Defaults to `children`." },
        { name: "side", type: `"top" | "right" | "bottom" | "left"`, default: `"top"`, description: "Side of the text to open on." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: "Alignment against the text." },
        { name: "sideOffset", type: "number", default: "6", description: "Gap from the text in px." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the text in px." },
      ],
    },
    {
      name: "OverflowHint",
      description: "Root. Keeps the hint closed while the trigger's text fits.",
      extends: "PreviewCard.Root",
      extendsHref: "https://base-ui.com/react/components/preview-card#root",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean, eventDetails) => void", description: "Called when the hint opens or closes; never called to open untruncated text." },
      ],
    },
    {
      name: "OverflowHintTrigger",
      description: "The text that truncates and gets measured. Renders a block `span`.",
      extends: "PreviewCard.Trigger",
      extendsHref: "https://base-ui.com/react/components/preview-card#trigger",
      props: [
        { name: "lines", type: "1 | 2 | 3", default: "1", description: "Lines before the text is cut off with an ellipsis." },
        { name: "delay", type: "number", default: "300", description: "Milliseconds before the hint opens." },
        { name: "closeDelay", type: "number", default: "150", description: "Milliseconds before it closes after the pointer leaves." },
      ],
    },
    {
      name: "OverflowHintContent",
      description: "Portal, positioner and popup in one.",
      extends: "PreviewCard.Popup",
      extendsHref: "https://base-ui.com/react/components/preview-card#popup",
      props: [
        { name: "side", type: `"top" | "right" | "bottom" | "left"`, default: `"top"`, description: "Side of the trigger to open on." },
        { name: "sideOffset", type: "number", default: "6", description: "Gap from the trigger in px." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: "Alignment against the trigger." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the trigger in px." },
        { name: "collisionPadding", type: "number", default: "8", description: "Space kept from the viewport edges in px." },
      ],
      dataAttributes: [{ name: "data-side", description: "The side it actually opened on, after collision handling." }],
    },
  ],
} satisfies ComponentDoc
