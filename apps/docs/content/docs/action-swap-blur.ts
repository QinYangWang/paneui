import type { ComponentDoc } from "@/lib/doc-types"

const ITEM_TYPE = "`{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`"

export default {
  summary: {"en": "Blurs between button states.", "zh": "通过模糊过渡切换按钮状态。"},
  usage: {
    imports: `import { ActionSwapBlurButton } from "@/components/ui/action-swap-blur"`,
    code: `<ActionSwapBlurButton
  resetAfter={1600}
  items={[
    { value: "copy", label: "Copy", icon: <CopyIcon /> },
    { value: "copied", label: "Copied", icon: <CheckIcon /> },
  ]}
/>`,
  },
  examples: [
    {
      id: "cycle",
      title: { en: "Cycle", zh: "循环" },
      description: { en: "Use when one button steps through several states in turn.", zh: "适用于一个按钮依次切换多个状态的场景。" },
    },
    {
      id: "text-only",
      title: { en: "Text Only", zh: "仅文字" },
      description: { en: "Use when the states need words but no icon.", zh: "适用于只需文字说明的状态。" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "custom-slots",
      title: { en: "Custom Slots", zh: "自定义插槽" },
    },
    {
      id: "animations",
      title: { en: "Animations", zh: "动画" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The swap runs 220ms ease-out while the width springs. With reduced motion they cross-fade and the width snaps. Each new state is announced through a polite live region.", zh: "切换以 220ms ease-out 运行，同时宽度弹性变化。启用减少动态效果时，两者交叉淡化且宽度立即变化。每次新状态通过 polite 实时区域播报。" },
    },
    {
      title: "Related",
      body: { en: "[Action Swap Roll](/docs/action-swap-roll) has the same API with a rolling animation.", zh: "[Action Swap Roll](/docs/action-swap-roll) 提供相同 API，但使用滚动动画。" },
    },
  ],
  api: [
    {
      name: "ActionSwapBlurButton",
      description: { en: "A `Button` that advances through `items` on click, swapping its icon and label with a blur. Same props as `ActionSwapButton` without `animation`.", zh: "一个 `Button`，点击时在 `items` 中前进，以模糊效果切换图标和标签。属性与 `ActionSwapButton` 相同，但不含 `animation`。" },
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        { name: "items", type: "ActionSwapItem[]", required: true, description: `States in order: ${ITEM_TYPE}.` },
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
        {
          name: "cycle",
          type: "boolean",
          default: "true",
          description: { en: "Advance to the next item on click. Turn off to drive `value` yourself.", zh: "点击时前进到下一项。关闭后由你自己驱动 `value`。" },
        },
        {
          name: "resetAfter",
          type: "number",
          description: { en: "Milliseconds after which the button returns to its first item, e.g. Copied → Copy.", zh: "按钮返回第一项前的毫秒数，例如 Copied → Copy。" },
        },
        { name: "size", type: "Button size", default: `"default"`, description: { en: "Passed to Button.", zh: "透传给 Button。" } },
      ],
    },
    {
      name: "ActionSwapBlurText",
      description: { en: "Label slot that swaps its content when `value` changes, gliding to the new width.", zh: "标签槽，在 `value` 变化时切换其内容，并滑向新宽度。" },
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: { en: "Identity of the current label; a new value triggers the swap.", zh: "当前标签的标识；新值会触发切换。" } },
        { name: "children", type: "ReactNode", required: true, description: { en: "The label.", zh: "标签。" } },
        { name: "className", type: "string", description: { en: "Classes for the slot.", zh: "槽的类名。" } },
      ],
    },
    {
      name: "ActionSwapBlurIcon",
      description: { en: "16px icon slot; the old glyph leaves as the new one arrives in the same cell.", zh: "16px 图标槽；旧字形离开的同时新字形进入同一单元格。" },
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: { en: "Identity of the current icon.", zh: "当前图标的标识。" } },
        { name: "children", type: "ReactNode", required: true, description: { en: "The icon.", zh: "图标。" } },
        { name: "className", type: "string", description: { en: "Classes for the slot.", zh: "槽的类名。" } },
      ],
    },
    {
      name: "ActionSwapButton",
      description: { en: "The shared engine behind the blur, roll and cascade presets.", zh: "模糊、滚动和级联预设背后的共享引擎。" },
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "animation",
          type: `"blur" | "roll" | "cascade"`,
          default: `"blur"`,
          description: { en: "Swap style. `cascade` splits plain-string labels letter by letter and rolls anything else.", zh: "切换样式。`cascade` 将纯字符串标签逐字母拆分，其他内容则滚动。" },
        },
        { name: "…", type: "same as ActionSwapBlurButton", description: "" },
      ],
    },
    {
      name: "ActionSwapText / ActionSwapIcon",
      description: { en: "Engine slots; the preset slots are these with `animation` fixed.", zh: "引擎槽；预设槽即这些槽固定了 `animation`。" },
      props: [
        { name: "animation", type: `"blur" | "roll" | "cascade"`, default: `"blur"`, description: { en: "Swap style.", zh: "切换样式。" } },
      ],
    },
  ],
} satisfies ComponentDoc
