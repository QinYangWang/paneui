import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { IconRail, IconRailItem, IconRailSpacer } from "@/components/ui/icon-rail"`,
    code: `<IconRail aria-label="App">
  <IconRailItem label="Home" icon={<HomeIcon />} shortcut="⌘1" active />
  <IconRailItem label="Inbox" icon={<InboxIcon />} badge={3} />
  <IconRailSpacer />
  <IconRailItem label="Settings" icon={<SettingsIcon />} />
</IconRail>`,
  },
  composition: `IconRail
├── IconRailGroup
│   └── IconRailItem
├── IconRailSeparator
├── IconRailSpacer
└── IconRailAvatar`,
  examples: [
    { id: "badges", title: "Badges", description: "`badge` takes a count (99+ caps it) or `true` for an attention dot." },
    { id: "horizontal", title: "Horizontal", description: "`orientation=\"horizontal\"` lays the rail out as a 48px row, e.g. along the bottom of a mobile drawer; tooltips open above and the row scrolls sideways if it runs out of room." },
  ],
  notes: [
    { title: "Icons", body: "Rails use the solid icon family at 18px, muted at rest and foreground when active, as the icon usage rules ask. Every item has a tooltip with its label and shortcut, so give it a clear `label`." },
    { title: "Tooltips", body: "Wrap the app (or the rail) in `TooltipProvider` so moving along the rail opens tooltips instantly after the first one." },
  ],
  api: [
    {
      name: "IconRail",
      extends: "nav",
      props: [
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "A 48px column, or a 48px row (groups, separators and the spacer follow)." },
        { name: "tooltipSide", type: `"right" | "left" | "top" | "bottom"`, default: `"right" / "top"`, description: "Side the tooltips open on: `right` for a vertical rail (left for one on the right edge), `top` for a horizontal one." },
      ],
      dataAttributes: [{ name: "data-orientation", description: "`vertical` or `horizontal`." }],
    },
    {
      name: "IconRailItem",
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: "Accessible name and tooltip text." },
        { name: "icon", type: "ReactNode", required: true, description: "The glyph." },
        { name: "shortcut", type: "string", description: "Shown as a key chip in the tooltip." },
        { name: "active", type: "boolean", default: "false", description: "Selected state; sets `aria-current=\"page\"`." },
        { name: "badge", type: "number | boolean", description: "Count or dot." },
        { name: "render", type: "ReactElement", description: "Render as another element, e.g. a `Link`." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present when active." }],
    },
    {
      name: "IconRailAvatar",
      description: "Round button for accounts or agent providers at the bottom of the rail.",
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: "Accessible name and tooltip." },
        { name: "status", type: `"online" | "busy" | "error" | "offline"`, default: `"offline"`, description: "Coloured ring: success, warning, destructive, none." },
        { name: "hint", type: "string", description: "Extra tooltip text, e.g. the connection state." },
      ],
    },
    { name: "IconRailGroup", extends: "div", props: [] },
    { name: "IconRailSeparator", extends: "div", props: [] },
    { name: "IconRailSpacer", description: "Pushes what follows to the bottom.", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
