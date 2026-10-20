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
      body: "Both parts expose `aria-expanded`. In a chip, `Escape` tucks the action away and returns focus to the chip; after an action runs, focus also returns to the chip.",
    },
    {
      title: "Motion",
      body: "The width springs between natural sizes (300 / 24 / 0.8). With reduced motion the width changes instantly and the revealed part only fades.",
    },
  ],
  api: [
    {
      name: "ExpandableButton",
      description: "Icon button that grows to reveal its label on click.",
      extends: "Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        { name: "icon", type: "ReactNode", required: true, description: "Always visible." },
        { name: "label", type: "ReactNode", required: true, description: "Revealed beside the icon when expanded." },
        { name: "expanded", type: "boolean", description: "Controlled expanded state." },
        { name: "defaultExpanded", type: "boolean", default: "false", description: "Initial expanded state." },
        { name: "onExpandedChange", type: "(expanded: boolean) => void", description: "Called when it toggles." },
        {
          name: "aria-label",
          type: "string",
          default: "label, if a string",
          description: "Accessible name (the label itself is `aria-hidden`).",
        },
      ],
      dataAttributes: [{ name: "data-expanded", description: "Present while expanded (primary fill)." }],
    },
    {
      name: "ExpandableChip",
      description: "Chip that reveals a trailing action button when clicked.",
      props: [
        { name: "label", type: "ReactNode", required: true, description: "The chip's text; clicking it toggles the action." },
        { name: "actionIcon", type: "ReactNode", required: true, description: "Icon in the revealed action button." },
        { name: "actionLabel", type: "string", required: true, description: "Accessible name for the action, e.g. \"Remove Design\"." },
        { name: "onAction", type: "() => void", description: "Called when the action is clicked." },
        {
          name: "collapseOnAction",
          type: "boolean",
          default: "true",
          description: "Collapse (and return focus to the chip) after the action runs.",
        },
        { name: "actionTone", type: `"default" | "destructive"`, default: `"default"`, description: "Visual tone of the action." },
        { name: "expanded", type: "boolean", description: "Controlled expanded state." },
        { name: "defaultExpanded", type: "boolean", default: "false", description: "Initial expanded state." },
        { name: "onExpandedChange", type: "(expanded: boolean) => void", description: "Called when it toggles." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable the chip and its action." },
        { name: "className", type: "string", description: "Classes for the chip." },
      ],
      dataAttributes: [
        { name: "data-expanded", description: "Present while the action is shown." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
