import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/popover"

export default {
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
      title: "Placement",
      description: "`side` (`bottom` or `top`) sets which way the panel grows; `align` pins it to the trigger's `start`, `center` or `end` edge.",
    },
    {
      id: "form",
      title: "Controlled Form",
      description: "Control it with `open` / `onOpenChange` to close the panel after a submit.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The panel starts clipped to the trigger's box and colour, then unclips to full size over 450ms while its content fades and settles in 100ms later; closing folds it back. With reduced motion it only cross-fades, in 150ms.",
    },
    {
      title: "Keyboard",
      body: "Base UI Popover: Enter or Space opens it, focus moves into the panel, Escape or an outside press closes it and returns focus to the trigger.",
    },
    {
      title: "Related",
      body: "Other morphing surfaces: [Select Morph](/docs/select-morph), [Morphing Modal](/docs/morphing-modal), [Center Morph Modal](/docs/center-morph-modal), [Morphing Lightbox](/docs/morphing-lightbox), [Morphing Search](/docs/morphing-search), [Morphing Search Chips](/docs/morphing-search-chips), [Morphing Tabs](/docs/morphing-tabs).",
    },
  ],
  api: [
    {
      name: "MorphPopover",
      description: "Base UI `Popover.Root`, re-exported unchanged.",
      extends: "Base UI Popover.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "MorphPopoverTrigger",
      description: "A raised secondary button (36px, `rounded-lg`) that presses to 0.96.",
      extends: "Base UI Popover.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphPopoverContent",
      description: "Portal, positioner and popup laid over the trigger. A 288px panel by default.",
      extends: "Base UI Popover.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom"`, default: `"bottom"`, description: "Which way the panel grows from the trigger." },
        {
          name: "align",
          type: `"start" | "center" | "end"`,
          default: `"start"`,
          description: "Which trigger edge the panel stays pinned to.",
        },
        {
          name: "triggerRadius",
          type: "string",
          default: `"var(--radius-lg)"`,
          description: "Corner radius (CSS length) of the trigger shape the panel starts from. The default matches `MorphPopoverTrigger`'s `rounded-lg`; change it only if you reshape the trigger.",
        },
      ],
      dataAttributes: [
        { name: "data-side / data-align", description: "The resolved placement, used to work out the clip start." },
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
      extends: "Base UI Popover.Title",
      extendsHref: `${BASE}#title`,
      props: [],
    },
    {
      name: "MorphPopoverDescription",
      extends: "Base UI Popover.Description",
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
      extends: "Base UI Popover.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
    {
      name: "MorphPopoverCloseButton",
      description: "Round × button pinned to the panel's top-right corner, labelled `Close`.",
      extends: "Base UI Popover.Close",
      extendsHref: `${BASE}#close`,
      props: [],
    },
  ],
} satisfies ComponentDoc
