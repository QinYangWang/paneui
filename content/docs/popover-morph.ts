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
      body: "The surface grows from a copy of the trigger across the 8px gap over 450ms, and the content settles in 150ms later. Closing folds it back in 300ms. With reduced motion it only cross-fades, in 150ms.",
    },
    {
      title: "Keyboard",
      body: "Enter or Space opens it, focus moves into the panel, Escape or an outside press closes it and returns focus to the trigger.",
    },
    {
      title: "Related",
      body: "See also [Select Morph](/docs/select-morph), [Morphing Modal](/docs/morphing-modal), [Morphing Search](/docs/morphing-search) and [Morphing Tabs](/docs/morphing-tabs).",
    },
  ],
  api: [
    {
      name: "MorphPopover",
      description: "`Popover.Root`, re-exported unchanged.",
      extends: "Popover.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "MorphPopoverTrigger",
      description: "A raised trigger (32px, `rounded-lg`).",
      extends: "Popover.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphPopoverContent",
      description: "Portal, positioner and popup, anchored to the trigger like Popover (8px side offset) with the standard popover surface (`rounded-2xl`, `bg-popover`, `shadow-surface`). A 288px panel by default.",
      extends: "Popover.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom"`, default: `"bottom"`, description: "Which side of the trigger the panel opens on (and grows towards)." },
        { name: "sideOffset", type: "number", default: "8", description: "Gap between trigger and panel in px, as in Popover." },
        { name: "collisionPadding", type: "number", default: "8", description: "Viewport margin kept when the panel flips or shifts." },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"center"`,
          description: "Which trigger edge the panel lines up with, as in Popover.",
        },
        {
          name: "triggerRadius",
          type: "string",
          default: `"var(--radius-lg)"`,
          description: "Corner radius (CSS length) of the trigger shape the panel starts from. The default matches `MorphPopoverTrigger`'s `rounded-lg`; change it only if you reshape the trigger.",
        },
      ],
      dataAttributes: [
        { name: "data-side / data-align", description: "The resolved placement (on the positioner and popup), used to work out where the morph starts." },
        { name: "data-starting-style / data-ending-style", description: "Present while the panel opens or closes." },
      ],
    },
    {
      name: "MorphPopoverHeader",
      description: "Title and description stack; leaves room on the right for the close button.",
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
      description: "Right-aligned row of actions.",
      extends: "div",
      props: [],
    },
    {
      name: "MorphPopoverClose",
      description: "Unstyled close part; pass `render` to turn any element (e.g. a `Button`) into a close control.",
      extends: "Popover.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
    {
      name: "MorphPopoverCloseButton",
      description: "Round × button pinned to the panel's top-right corner, labelled `Close`.",
      extends: "Popover.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
  ],
} satisfies ComponentDoc
