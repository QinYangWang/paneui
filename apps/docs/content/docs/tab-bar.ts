import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Bottom navigation for phones, with a label under each icon.", "zh": "为手机提供底部导航。"},
  usage: {
    imports: `import { TabBar, TabBarItem } from "@/components/ui/tab-bar"`,
    code: `<TabBar aria-label="App" className="fixed inset-x-0 bottom-0">
  <TabBarItem icon={<HomeIcon />} activeIcon={<HomeFilledIcon />} label="Home" active />
  <TabBarItem icon={<ChatIcon />} activeIcon={<ChatFilledIcon />} label="Chats" badge={3} />
  <TabBarItem icon={<SettingsIcon />} activeIcon={<SettingsFilledIcon />} label="Settings" />
</TabBar>`,
  },
  composition: `TabBar
└── TabBarItem`,
  examples: [{ id: "links", title: { en: "Links", zh: "链接" },  }],
  notes: [
    { title: "Phones", body: { en: "The bar adds the bottom safe-area inset as padding, so it can sit flush with the screen edge; add `viewport-fit=cover` to the viewport meta tag for the inset to apply. Labels show under each icon, so there are no tooltips.", zh: "该栏会把底部安全区域内边距作为 padding，因此可以紧贴屏幕边缘；需在 viewport meta 标签中添加 `viewport-fit=cover` 才能使内边距生效。标签显示在每个图标下方，因此没有提示。" } },
    { title: "Active glyph", body: { en: "The bar has no row fill, so the active item swaps to the filled glyph as well as the foreground colour. Every nav icon has a `<Name>FilledIcon` pair.", zh: "该栏没有行填充，所以激活项同时切换为填充字形和前景色。每个导航图标都有对应的 `<Name>FilledIcon`。" } },
    { title: "Wider screens", body: { en: "Swap to `SidebarRail` from `md` up, where a column of icons with tooltips fits better.", zh: "`md` 及以上改用 `SidebarRail`，那里一列带提示的图标更合适。" } },
    { title: "Accessibility", body: { en: "The active item gets `aria-current=\"page\"`. The keyboard focus ring draws around the icon pill, so it never clashes with rounded screen corners. Give the `TabBar` an `aria-label` when the page has more than one navigation region.", zh: "激活项获得 `aria-current=\"page\"`。键盘焦点环绘制在图标胶囊周围，因此不会与圆角屏幕边缘冲突。页面有多个导航区域时，请给 `TabBar` 一个 `aria-label`。" } },
  ],
  api: [
    { name: "TabBar", extends: "nav", props: [] },
    {
      name: "TabBarItem",
      extends: "button (useRender)",
      props: [
        { name: "icon", type: "ReactNode", required: true, description: { en: "Outline icon, drawn at 20px.", zh: "轮廓图标，以 20px 绘制。" } },
        { name: "activeIcon", type: "ReactNode", description: { en: "Filled glyph shown while active, such as `HomeFilledIcon` for `HomeIcon`.", zh: "激活时显示的填充字形，例如 `HomeIcon` 对应 `HomeFilledIcon`。" } },
        { name: "label", type: "ReactNode", required: true, description: { en: "Text under the icon; also the accessible name.", zh: "图标下方的文本；也是可访问名称。" } },
        { name: "active", type: "boolean", default: "false", description: { en: "Current destination: foreground colour and `aria-current`.", zh: "当前目标：前景色和 `aria-current`。" } },
        { name: "badge", type: "number | boolean", description: { en: "A count (capped at 99+) or an attention dot (`true`).", zh: "计数（上限 99+）或提醒圆点（`true`）。" } },
        { name: "render", type: "ReactElement", description: { en: "Render as another element, such as a router link.", zh: "渲染为其他元素，如路由链接。" } },
      ],
      dataAttributes: [{ name: "data-active", description: { en: "Present on the active item.", zh: "在激活项上存在。" } }],
    },
  ],
} satisfies ComponentDoc
