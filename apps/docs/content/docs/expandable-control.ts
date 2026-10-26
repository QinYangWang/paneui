import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Button or chip that expands on click to reveal a label.", "zh": "点击展开控件的标签。"},
  baseUi: { name: "Button", href: "https://base-ui.com/react/components/button" },
  usage: {
    imports: `import { ExpandableButton, ExpandableChip } from "@/components/ui/expandable-control"`,
    code: `<ExpandableButton icon={<BellIcon />} label="Notify me" />`,
  },
  examples: [
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "chip-actions",
      title: { en: "Chip Actions", zh: "标签操作" },
    },
    {
      id: "prevent-toggle",
      title: { en: "Prevent Toggle", zh: "禁止切换" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Both parts expose `aria-expanded`. In a chip, `Escape` tucks the action away and returns focus to the chip; after an action runs, focus also returns to the chip.", zh: "两部分都暴露 `aria-expanded`。在 chip 中，`Escape` 会收起操作并将焦点返回 chip；操作执行后，焦点也会返回 chip。" },
    },
    {
      title: "Motion",
      body: { en: "The width springs between natural sizes (300 / 24 / 0.8). With reduced motion the width changes instantly and the revealed part only fades.", zh: "宽度在自然尺寸之间弹性变化（300 / 24 / 0.8）。在减少动态效果下，宽度立即变化，显示的部分仅淡入。" },
    },
  ],
  api: [
    {
      name: "ExpandableButton",
      description: { en: "Icon button that grows to reveal its label on click.", zh: "点击后扩展以显示其标签的图标按钮。" },
      extends: "Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        { name: "icon", type: "ReactNode", required: true, description: { en: "Always visible.", zh: "始终可见。" } },
        { name: "label", type: "ReactNode", required: true, description: { en: "Revealed beside the icon when expanded.", zh: "展开时显示在图标旁边。" } },
        { name: "expanded", type: "boolean", description: { en: "Controlled expanded state.", zh: "受控的展开状态。" } },
        { name: "defaultExpanded", type: "boolean", default: "false", description: { en: "Initial expanded state.", zh: "初始展开状态。" } },
        { name: "onExpandedChange", type: "(expanded: boolean) => void", description: { en: "Called when it toggles.", zh: "切换时调用。" } },
        {
          name: "aria-label",
          type: "string",
          default: "label, if a string",
          description: { en: "Accessible name (the label itself is `aria-hidden`).", zh: "无障碍名称（标签本身为 `aria-hidden`）。" },
        },
      ],
      dataAttributes: [{ name: "data-expanded", description: { en: "Present while expanded (primary fill).", zh: "展开时存在（主色填充）。" } }],
    },
    {
      name: "ExpandableChip",
      description: { en: "Chip that reveals a trailing action button when clicked.", zh: "点击后显示尾部操作按钮的 chip。" },
      props: [
        { name: "label", type: "ReactNode", required: true, description: { en: "The chip's text; clicking it toggles the action.", zh: "chip 的文本；点击它会切换操作。" } },
        { name: "actionIcon", type: "ReactNode", required: true, description: { en: "Icon in the revealed action button.", zh: "显示的操作按钮中的图标。" } },
        { name: "actionLabel", type: "string", required: true, description: { en: "Accessible name for the action, e.g. \"Remove Design\".", zh: "操作的访问名称，例如 \"Remove Design\"。" } },
        { name: "onAction", type: "() => void", description: { en: "Called when the action is clicked.", zh: "点击操作时调用。" } },
        {
          name: "collapseOnAction",
          type: "boolean",
          default: "true",
          description: { en: "Collapse (and return focus to the chip) after the action runs.", zh: "操作执行后收起（并将焦点返回 chip）。" },
        },
        { name: "actionTone", type: `"default" | "destructive"`, default: `"default"`, description: { en: "Visual tone of the action.", zh: "操作的视觉色调。" } },
        { name: "expanded", type: "boolean", description: { en: "Controlled expanded state.", zh: "受控的展开状态。" } },
        { name: "defaultExpanded", type: "boolean", default: "false", description: { en: "Initial expanded state.", zh: "初始展开状态。" } },
        { name: "onExpandedChange", type: "(expanded: boolean) => void", description: { en: "Called when it toggles.", zh: "切换时调用。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable the chip and its action.", zh: "禁用 chip 及其操作。" } },
        { name: "className", type: "string", description: { en: "Classes for the chip.", zh: "chip 的类名。" } },
      ],
      dataAttributes: [
        { name: "data-expanded", description: { en: "Present while the action is shown.", zh: "操作显示时存在。" } },
        { name: "data-disabled", description: { en: "Present when disabled.", zh: "禁用时存在。" } },
      ],
    },
  ],
} satisfies ComponentDoc
