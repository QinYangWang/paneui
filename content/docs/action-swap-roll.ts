import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Rolls between button states.", "zh": "通过滚动过渡切换按钮状态。"},
  usage: {
    imports: `import { ActionSwapRollButton } from "@/components/ui/action-swap-roll"`,
    code: `<ActionSwapRollButton
  items={[
    { value: "follow", label: "Follow" },
    { value: "following", label: "Following" },
  ]}
/>`,
  },
  examples: [
    {
      id: "copy-reset",
      title: { en: "Copy With Reset", zh: "复制后重置" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "custom-slots",
      title: { en: "Custom Slots", zh: "自定义插槽" },
      description: { en: "Use the slots when you need your own button layout or slot order.", zh: "适用于需要自定义按钮布局的场景。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The roll springs at 460 / 32 / 0.55 and exits take 150ms. With reduced motion they cross-fade and the width snaps.",
    },
    {
      title: "Related",
      body: "[Action Swap Blur](/docs/action-swap-blur) has the same API with a blur and holds the shared engine.",
    },
  ],
  api: [
    {
      name: "ActionSwapRollButton",
      description: "A `Button` that advances through `items` on click, rolling its icon and label.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "items",
          type: "ActionSwapItem[]",
          required: true,
          description: "States in order, each `{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`.",
        },
        { name: "value", type: "string", description: "Controlled current item value." },
        { name: "defaultValue", type: "string", description: "Initial item value. Defaults to the first item." },
        {
          name: "onValueChange",
          type: "(value: string, item: ActionSwapItem) => void",
          description: "Called when the current item changes, including on reset.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "true for `icon*` sizes",
          description: "Hide the label and swap only the icon slot.",
        },
        { name: "cycle", type: "boolean", default: "true", description: "Advance to the next item on click." },
        {
          name: "resetAfter",
          type: "number",
          description: "Milliseconds after which the button returns to its first item.",
        },
      ],
    },
    {
      name: "ActionSwapRollText",
      description: "Label slot that rolls to new content when `value` changes.",
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: "Identity of the current label." },
        { name: "children", type: "ReactNode", required: true, description: "The label." },
        { name: "className", type: "string", description: "Classes for the slot." },
      ],
    },
    {
      name: "ActionSwapRollIcon",
      description: "16px icon slot that rolls to the new glyph.",
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: "Identity of the current icon." },
        { name: "children", type: "ReactNode", required: true, description: "The icon." },
        { name: "className", type: "string", description: "Classes for the slot." },
      ],
    },
  ],
} satisfies ComponentDoc
