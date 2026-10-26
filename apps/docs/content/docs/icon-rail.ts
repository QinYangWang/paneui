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
    { title: "Icons", body: { en: "Use solid icons at 18px, as the icon usage rules ask. Each item's tooltip shows its `label` and shortcut, so make the label clear.", zh: "按照图标使用规则，使用 18px 的实心图标。每个项的提示会显示其 `label` 和快捷键，所以让标签清晰。" } },
    { title: "Tooltips", body: { en: "Wrap the app (or the rail) in `TooltipProvider` so moving along the rail opens tooltips instantly after the first one.", zh: "将应用（或侧边栏）包裹在 `TooltipProvider` 中，这样在第一次之后沿侧边栏移动会立即打开提示。" } },
  ],
  api: [
    {
      name: "IconRail",
      extends: "nav",
      props: [
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: { en: "A 48px column, or a 48px row (groups, separators and the spacer follow).", zh: "48px 的列，或 48px 的行（分组、分隔符和占位元素随之）。" } },
        { name: "tooltipSide", type: `"right" | "left" | "top" | "bottom"`, default: `"right" / "top"`, description: { en: "Side tooltips open on. Defaults to `right` for a vertical rail and `top` for a horizontal one; use `left` for a rail on the right edge.", zh: "侧边提示打开的方向。垂直默认为 `right`，水平默认为 `top`；位于右边缘的侧边栏使用 `left`。" } },
      ],
      dataAttributes: [{ name: "data-orientation", description: { en: "`vertical` or `horizontal`.", zh: "`vertical` 或 `horizontal`。" } }],
    },
    {
      name: "IconRailItem",
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: { en: "Accessible name and tooltip text.", zh: "无障碍名称和提示文本。" } },
        { name: "icon", type: "ReactNode", required: true, description: { en: "The glyph.", zh: "图标。" } },
        { name: "shortcut", type: "string", description: { en: "Shown as a key chip in the tooltip.", zh: "在提示中显示为按键 chip。" } },
        { name: "active", type: "boolean", default: "false", description: { en: "Selected state; sets `aria-current=\"page\"`.", zh: "选中状态；设置 `aria-current=\"page\"`。" } },
        { name: "badge", type: "number | boolean", description: { en: "Count or dot.", zh: "计数或圆点。" } },
        { name: "render", type: "ReactElement", description: { en: "Render as another element, e.g. a `Link`.", zh: "渲染为另一个元素，例如 `Link`。" } },
      ],
      dataAttributes: [{ name: "data-active", description: { en: "Present when active.", zh: "激活时存在。" } }],
    },
    {
      name: "IconRailAvatar",
      description: { en: "Round button for accounts or agent providers at the bottom of the rail.", zh: "侧边栏底部用于账号或代理提供商的圆形按钮。" },
      extends: "button",
      props: [
        { name: "label", type: "string", required: true, description: { en: "Accessible name and tooltip.", zh: "可访问名称和提示。" } },
        { name: "status", type: `"online" | "busy" | "error" | "offline"`, default: `"offline"`, description: { en: "Ring colour. `online` is success, `busy` warning, `error` destructive and `offline` has none.", zh: "圆环颜色。`online` 为成功，`busy` 为警告，`error` 为破坏性，`offline` 无颜色。" } },
        { name: "hint", type: "string", description: { en: "Extra tooltip text, e.g. the connection state.", zh: "额外的提示文本，例如连接状态。" } },
      ],
    },
    { name: "IconRailGroup", extends: "div", props: [] },
    { name: "IconRailSeparator", extends: "div", props: [] },
    { name: "IconRailSpacer", description: { en: "Pushes what follows to the bottom.", zh: "将其后的内容推到底部。" }, extends: "div", props: [] },
  ],
} satisfies ComponentDoc
