import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Labels a control with a short hint on hover or focus.", "zh": "在悬停或聚焦时显示提示。"},
  baseUi: {
    name: "Tooltip",
    href: "https://base-ui.com/react/components/tooltip",
  },
  usage: {
    imports: `import { Tooltip, TooltipContent, TooltipKbd, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`,
    code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label="Copy" />}>
      <CopyIcon />
    </TooltipTrigger>
    <TooltipContent>
      Copy <TooltipKbd>⌘C</TooltipKbd>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  composition: `TooltipProvider
└── Tooltip
    ├── TooltipTrigger
    └── TooltipContent
        └── TooltipKbd`,
  examples: [
    {
      id: "sides",
      title: { en: "Sides", zh: "方向" },
    },
    {
      id: "align",
      title: { en: "Align", zh: "对齐" },
    },
    {
      id: "with-icon",
      title: { en: "With Icon", zh: "带图标" },
    },
    {
      id: "delay",
      title: { en: "Delay", zh: "延迟" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The tooltip scales from 90% and nudges 4px toward the trigger over 150ms. Moving between triggers in the same provider shows the next one instantly.",
    },
    {
      title: "Accessibility",
      body: "Tooltips open on hover and keyboard focus, and close with `Esc`. Keep essential information out of tooltips, since touch users can't hover.",
    },
  ],
  api: [
    {
      name: "TooltipProvider",
      description: "Shares the open delay between tooltips. The docs app wraps everything in one.",
      extends: "Tooltip.Provider",
      extendsHref: "https://base-ui.com/react/components/tooltip#provider",
      props: [
        { name: "delay", type: "number", default: "300", description: "Milliseconds before a tooltip opens." },
        { name: "closeDelay", type: "number", description: "Milliseconds before it closes." },
      ],
    },
    {
      name: "Tooltip",
      description: "Re-export of the primitive root.",
      extends: "Tooltip.Root",
      extendsHref: "https://base-ui.com/react/components/tooltip#root",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: "Called when the tooltip opens or closes.",
        },
      ],
    },
    {
      name: "TooltipTrigger",
      description: "Re-export. Use `render` to make a Button the trigger.",
      extends: "Tooltip.Trigger",
      extendsHref: "https://base-ui.com/react/components/tooltip#trigger",
      props: [],
    },
    {
      name: "TooltipContent",
      description: "Portal, positioner and popup in one.",
      extends: "Tooltip.Popup",
      extendsHref: "https://base-ui.com/react/components/tooltip#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          default: `"top"`,
          description: "Side of the trigger to open on. Passed to the positioner.",
        },
        { name: "sideOffset", type: "number", default: "8", description: "Gap from the trigger in px." },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"center"`,
          description: "Alignment against the trigger.",
        },
      ],
      dataAttributes: [
        { name: "data-side", description: "The side it actually opened on, after collision handling." },
        { name: "data-instant", description: "Present when it opens without animation (moving between triggers)." },
      ],
    },
    {
      name: "TooltipKbd",
      description: "Small keycap for a shortcut, pulled to the trailing edge.",
      extends: "kbd",
      props: [],
    },
  ],
} satisfies ComponentDoc
