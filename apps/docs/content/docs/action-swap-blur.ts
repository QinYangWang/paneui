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
      body: "The swap runs 220ms ease-out while the width springs. With reduced motion they cross-fade and the width snaps. Each new state is announced through a polite live region.",
    },
    {
      title: "Related",
      body: "[Action Swap Roll](/docs/action-swap-roll) has the same API with a rolling animation.",
    },
  ],
  api: [
    {
      name: "ActionSwapBlurButton",
      description: "A `Button` that advances through `items` on click, swapping its icon and label with a blur. Same props as `ActionSwapButton` without `animation`.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        { name: "items", type: "ActionSwapItem[]", required: true, description: `States in order: ${ITEM_TYPE}.` },
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
        {
          name: "cycle",
          type: "boolean",
          default: "true",
          description: "Advance to the next item on click. Turn off to drive `value` yourself.",
        },
        {
          name: "resetAfter",
          type: "number",
          description: "Milliseconds after which the button returns to its first item, e.g. Copied → Copy.",
        },
        { name: "size", type: "Button size", default: `"default"`, description: "Passed to Button." },
      ],
    },
    {
      name: "ActionSwapBlurText",
      description: "Label slot that swaps its content when `value` changes, gliding to the new width.",
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: "Identity of the current label; a new value triggers the swap." },
        { name: "children", type: "ReactNode", required: true, description: "The label." },
        { name: "className", type: "string", description: "Classes for the slot." },
      ],
    },
    {
      name: "ActionSwapBlurIcon",
      description: "16px icon slot; the old glyph leaves as the new one arrives in the same cell.",
      extends: "span",
      props: [
        { name: "value", type: "string", required: true, description: "Identity of the current icon." },
        { name: "children", type: "ReactNode", required: true, description: "The icon." },
        { name: "className", type: "string", description: "Classes for the slot." },
      ],
    },
    {
      name: "ActionSwapButton",
      description: "The shared engine behind the blur, roll and cascade presets.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "animation",
          type: `"blur" | "roll" | "cascade"`,
          default: `"blur"`,
          description: "Swap style. `cascade` splits plain-string labels letter by letter and rolls anything else.",
        },
        { name: "…", type: "same as ActionSwapBlurButton", description: "" },
      ],
    },
    {
      name: "ActionSwapText / ActionSwapIcon",
      description: "Engine slots; the preset slots are these with `animation` fixed.",
      props: [
        { name: "animation", type: `"blur" | "roll" | "cascade"`, default: `"blur"`, description: "Swap style." },
      ],
    },
  ],
} satisfies ComponentDoc
