import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Narrow bar of icon buttons for switching between app sections.", "zh": "通过图标切换应用分区。"},
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
    { id: "badges", title: { en: "Badges", zh: "标记" },  },
    { id: "horizontal", title: { en: "Horizontal", zh: "横向" },  },
  ],
  notes: [
    { title: "Icons", body: "Use solid icons at 18px, as the icon usage rules ask. Each item's tooltip shows its `label` and shortcut, so make the label clear." },
    { title: "Tooltips", body: "Wrap the app (or the rail) in `TooltipProvider` so moving along the rail opens tooltips instantly after the first one." },
  ],
  api: [
    {
      name: "IconRail",
      extends: "nav",
      props: [
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "A 48px column, or a 48px row (groups, separators and the spacer follow)." },
        { name: "tooltipSide", type: `"right" | "left" | "top" | "bottom"`, default: `"right" / "top"`, description: "Side tooltips open on. Defaults to `right` for a vertical rail and `top` for a horizontal one; use `left` for a rail on the right edge." },
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
        { name: "status", type: `"online" | "busy" | "error" | "offline"`, default: `"offline"`, description: "Ring colour. `online` is success, `busy` warning, `error` destructive and `offline` has none." },
        { name: "hint", type: "string", description: "Extra tooltip text, e.g. the connection state." },
      ],
    },
    { name: "IconRailGroup", extends: "div", props: [] },
    { name: "IconRailSeparator", extends: "div", props: [] },
    { name: "IconRailSpacer", description: "Pushes what follows to the bottom.", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
