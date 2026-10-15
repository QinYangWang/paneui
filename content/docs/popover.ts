import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Popover",
    href: "https://base-ui.com/react/components/popover",
  },
  usage: {
    imports: `import { Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"`,
    code: `<Popover>
  <PopoverTrigger render={<Button variant="secondary" />}>Details</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>All caught up</PopoverTitle>
    <PopoverDescription>No new approvals.</PopoverDescription>
  </PopoverContent>
</Popover>`,
  },
  composition: `Popover
├── PopoverTrigger
└── PopoverContent
    ├── PopoverCloseButton
    ├── PopoverHeader
    │   ├── PopoverTitle
    │   └── PopoverDescription
    └── PopoverFooter
        └── PopoverClose`,
  examples: [
    {
      id: "sides",
      title: "Sides",
      description: "Use `side` to keep the popover off content it would cover; it flips when there is no room.",
    },
    {
      id: "align",
      title: "Align",
      description: "Use `start` or `end` when the trigger sits near an edge of the layout.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when the popover should close after a form submits.",
    },
    {
      id: "hover",
      title: "Open on Hover",
      description: "Use for previews that should appear on hover, like a hover card.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The popup slides 4px toward its side and leaves faster than it arrives. With reduced motion it only fades.",
    },
    {
      title: "Keyboard",
      body: "Enter or Space on the trigger opens it and moves focus inside; Esc closes it and returns focus.",
    },
    {
      title: "Related",
      body: "[Popover Morph](/docs/popover-morph) grows the popover out of its trigger.",
    },
  ],
  api: [
    {
      name: "Popover",
      extends: "Popover.Root",
      extendsHref: "https://base-ui.com/react/components/popover#root",
      props: [],
    },
    {
      name: "PopoverTrigger",
      extends: "Popover.Trigger",
      extendsHref: "https://base-ui.com/react/components/popover#trigger",
      props: [],
    },
    {
      name: "PopoverContent",
      description: "The 288px-wide popup, already wrapped in a portal and positioner.",
      extends: "Popover.Popup",
      extendsHref: "https://base-ui.com/react/components/popover#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          default: `"bottom"`,
          description: "Edge of the trigger it opens on.",
        },
        { name: "sideOffset", type: "number", default: "8", description: "Gap to the trigger in px." },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"center"`,
          description: "Alignment against the trigger.",
        },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the alignment axis in px." },
        {
          name: "collisionPadding",
          type: "number | Rect",
          default: "8",
          description: "Space kept from the viewport edges.",
        },
      ],
      dataAttributes: [
        { name: "data-side", description: "The side it actually opened on." },
        { name: "data-starting-style / data-ending-style", description: "Set during the enter and exit transitions." },
      ],
    },
    {
      name: "PopoverHeader",
      description: "Stacks title and description with a 4px gap.",
      extends: "div",
      props: [],
    },
    {
      name: "PopoverTitle",
      extends: "Popover.Title",
      extendsHref: "https://base-ui.com/react/components/popover#title",
      props: [],
    },
    {
      name: "PopoverDescription",
      extends: "Popover.Description",
      extendsHref: "https://base-ui.com/react/components/popover#description",
      props: [],
    },
    {
      name: "PopoverFooter",
      description: "Right-aligned row for actions.",
      extends: "div",
      props: [],
    },
    {
      name: "PopoverClose",
      description: "Unstyled close part. Pass `render={<Button />}` to make any button close the popover.",
      extends: "Popover.Close",
      extendsHref: "https://base-ui.com/react/components/popover#close",
      props: [],
    },
    {
      name: "PopoverCloseButton",
      description: "Round × button pinned to the top-right corner, labelled \"Close\".",
      extends: "Popover.Close",
      extendsHref: "https://base-ui.com/react/components/popover#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
