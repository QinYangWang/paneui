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
      body: { en: "The roll springs at 460 / 32 / 0.55 and exits take 150ms. With reduced motion they cross-fade and the width snaps.", zh: "滚动以 460 / 32 / 0.55 弹性运行，退出耗时 150ms。启用减少动态效果时，两者交叉淡化且宽度立即变化。" },
    },
    {
      title: "Related",
      body: { en: "[Action Swap Blur](/docs/action-swap-blur) has the same API with a blur and holds the shared engine.", zh: "[Action Swap Blur](/docs/action-swap-blur) 提供相同 API，使用模糊效果，并承载共享引擎。" },
    },
  ],
  api: [
    {
      name: "ActionSwapRollButton",
      description: { en: "A `Button` that advances through `items` on click, rolling its icon and label.", zh: "一个 `Button`，点击时在 `items` 中前进，滚动切换其图标和标签。" },
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "items",
          type: "ActionSwapItem[]",
          required: true,
          description: { en: "States in order, each `{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`.", zh: "按顺序排列的状态，每项为 `{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`。" },
        },
        { name: "value", type: "string", description: { en: "Controlled current item value.", zh: "受控的当前项值。" } },
        { name: "defaultValue", type: "string", description: { en: "Initial item value. Defaults to the first item.", zh: "初始项值。默认为第一项。" } },
        {
          name: "onValueChange",
          type: "(value: string, item: ActionSwapItem) => void",
          description: { en: "Called when the current item changes, including on reset.", zh: "当前项变化时调用，包括重置时。" },
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "true for `icon*` sizes",
          description: { en: "Hide the label and swap only the icon slot.", zh: "隐藏标签，仅切换图标槽。" },
        },
        { name: "cycle", type: "boolean", default: "true", description: { en: "Advance to the next item on click.", zh: "点击时前进到下一项。" } },
        {
          name: "resetAfter",
          type: "number",
          description: { en: "Milliseconds after which the button returns to its first item.", zh: "按钮返回第一项前的毫秒数。" },
        },
      ],
    },
    {
      name: "ActionSwapRollText",
      description: { en: "Label slot that rolls to new content when `value` changes.", zh: "标签槽，在 `value` 变化时滚动到新内容。" },
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: { en: "Identity of the current label.", zh: "当前标签的标识。" } },
        { name: "children", type: "ReactNode", required: true, description: { en: "The label.", zh: "标签。" } },
        { name: "className", type: "string", description: { en: "Classes for the slot.", zh: "槽的类名。" } },
      ],
    },
    {
      name: "ActionSwapRollIcon",
      description: { en: "16px icon slot that rolls to the new glyph.", zh: "16px 图标槽，滚动到新字形。" },
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: { en: "Identity of the current icon.", zh: "当前图标的标识。" } },
        { name: "children", type: "ReactNode", required: true, description: { en: "The icon.", zh: "图标。" } },
        { name: "className", type: "string", description: { en: "Classes for the slot.", zh: "槽的类名。" } },
      ],
    },
  ],
} satisfies ComponentDoc
