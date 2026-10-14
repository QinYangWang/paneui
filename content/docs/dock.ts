import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Dock, DockItem } from "@/components/ui/dock"`,
    code: `<Dock>
  <DockItem label="Home" active>
    <HomeIcon />
  </DockItem>
  <DockItem label="Inbox">
    <InboxIcon />
  </DockItem>
</Dock>`,
  },
  composition: `Dock
├── DockGroup
│   └── DockItem
├── DockSeparator
└── DockItem`,
  examples: [
    {
      id: "sizes",
      title: "Sizes",
      description: "`size` is the resting item size, `magnification` the size under the pointer and `distance` how far the swell reaches (px).",
    },
    {
      id: "no-magnification",
      title: "Without Magnification",
      description: "Set `magnification` equal to `size` for a still dock that keeps the gliding active pill.",
    },
    {
      id: "tooltip-bottom",
      title: "Tooltip Bottom",
      description: "`tooltipSide=\"bottom\"` for a dock along the top of the screen.",
    },
    {
      id: "links",
      title: "Links",
      description: "`render={<a />}` turns an item into a link; group items and split groups with `DockSeparator`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Items swell toward the pointer on a spring, and the active pill and dot glide between items. With reduced motion items stay at `size` and the pill jumps.",
    },
    {
      title: "Accessibility",
      body: "The dock is a `toolbar`. Each item's `label` is its accessible name and tooltip; the active item gets `aria-current=\"page\"`.",
    },
  ],
  api: [
    {
      name: "Dock",
      extends: "div",
      props: [
        { name: "size", type: "number", default: "44", description: "Resting item size in px." },
        { name: "magnification", type: "number", default: "64", description: "Item size in px directly under the pointer." },
        { name: "distance", type: "number", default: "140", description: "Pointer distance in px over which neighbours grow." },
        { name: "tooltipSide", type: `"top" | "bottom"`, default: `"top"`, description: "Side tooltips open on." },
        { name: "aria-label", type: "string", default: `"Dock"`, description: "Accessible name of the toolbar." },
      ],
    },
    {
      name: "DockGroup",
      description: "Groups items (`role=\"group\"`).",
      extends: "div",
      props: [],
    },
    {
      name: "DockSeparator",
      description: "Thin vertical rule between groups.",
      extends: "div",
      props: [],
    },
    {
      name: "DockItem",
      description: "A magnifying button with a tooltip.",
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: "Tooltip text and accessible name." },
        { name: "active", type: "boolean", description: "Show the gliding pill and indicator dot." },
        { name: "render", type: "ReactElement", description: "Render another element instead of a `<button>`, e.g. `<a href />`." },
        { name: "children", type: "ReactNode", required: true, description: "Usually an icon; it scales with the item." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present on the active item." }],
    },
  ],
} satisfies ComponentDoc
