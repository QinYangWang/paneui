import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "App navigation sidebar that folds into an icon rail.", "zh": "可收起为图标栏的侧边导航。"},
  usage: {
    imports: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/animated-sidebar"`,
    code: `<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarItem icon={<HomeIcon />} label="Home" isActive />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`,
  },
  composition: `SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   │   └── SidebarHideCollapsed
│   ├── SidebarContent
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel
│   │       └── SidebarMenu
│   │           └── SidebarItem
│   │               └── SidebarSub
│   │                   └── SidebarSubItem
│   └── SidebarFooter
└── SidebarInset
    └── SidebarTrigger`,
  examples: [
    {
      id: "collapsed",
      title: { en: "Icon Rail", zh: "图标栏" },
    },
    {
      id: "flush-right",
      title: { en: "Flush, Right Side", zh: "右侧贴边" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "static",
      title: { en: "Non-collapsible Links", zh: "始终展开的链接" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "⌘/Ctrl + B toggles the sidebar; change the key with `shortcut` or pass `null` to turn it off. All sidebars share one listener, so with several on a page, only the most recently mounted, focused or clicked one toggles. Disclosure items set `aria-expanded` and `aria-controls`.", zh: "⌘/Ctrl + B 切换侧边栏；用 `shortcut` 更改按键，或传 `null` 关闭。所有侧边栏共用一个监听器，因此页面上有多个时，只有最近挂载、聚焦或点击的那个会切换。展开项会设置 `aria-expanded` 和 `aria-controls`。" },
    },
    {
      title: "Related",
      body: { en: "See also [AI Sidebar](/docs/ai-sidebar).", zh: "另见 [AI Sidebar](/docs/ai-sidebar)。" },
    },
  ],
  api: [
    {
      name: "SidebarProvider",
      description: { en: "Holds the open state and lays out the sidebar and inset in a row.", zh: "持有展开状态，并将侧边栏和 inset 排成一行。" },
      extends: "div",
      props: [
        { name: "open", type: "boolean", description: { en: "Controlled expanded state.", zh: "受控的展开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Initial expanded state when uncontrolled.", zh: "非受控时的初始展开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the sidebar expands or collapses.", zh: "侧边栏展开或折叠时调用。" } },
        { name: "shortcut", type: "string | null", default: `"b"`, description: { en: "Key that toggles with ⌘/Ctrl. Only the most recently mounted, focused or clicked sidebar responds. `null` disables the shortcut.", zh: "使用 ⌘/Ctrl 切换的按键。只有最近挂载、聚焦或点击的侧边栏会响应。`null` 禁用快捷键。" } },
      ],
      dataAttributes: [{ name: "data-state", description: { en: "`expanded` or `collapsed`.", zh: "`expanded` 或 `collapsed`。" } }],
    },
    {
      name: "Sidebar",
      description: { en: "The panel. Its width springs between `--sidebar-width` (15rem) and `--sidebar-width-icon` (3.75rem).", zh: "面板。其宽度在 `--sidebar-width`（15rem）和 `--sidebar-width-icon`（3.75rem）之间弹簧过渡。" },
      extends: "motion.aside",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        { name: "side", type: `"left" | "right"`, default: `"left"`, description: { en: "Which side of the inset it sits on.", zh: "它位于 inset 的哪一侧。" } },
        { name: "variant", type: `"floating" | "sidebar"`, default: `"floating"`, description: { en: "`floating` is a raised rounded card; `sidebar` sits flush with a hairline edge.", zh: "`floating` 是凸起的圆角卡片；`sidebar` 贴合边缘，带一条细线。" } },
        { name: "collapsible", type: `"icon" | "none"`, default: `"icon"`, description: { en: "`icon` folds into an icon rail; `none` never collapses.", zh: "`icon` 折叠为图标栏；`none` 从不折叠。" } },
        { name: "panelClassName", type: "string", description: { en: "Class for the inner panel surface.", zh: "内部面板表面的类名。" } },
        { name: "aria-label", type: "string", default: `"Sidebar"`, description: { en: "Accessible name of the aside.", zh: "aside 的无障碍名称。" } },
      ],
      dataAttributes: [
        { name: "data-state", description: { en: "`expanded` or `collapsed`.", zh: "`expanded` 或 `collapsed`。" } },
        { name: "data-variant", description: { en: "`floating` or `sidebar`.", zh: "`floating` 或 `sidebar`。" } },
        { name: "data-side", description: { en: "`left` or `right`.", zh: "`left` 或 `right`。" } },
      ],
    },
    { name: "SidebarHeader", extends: "div", props: [] },
    { name: "SidebarContent", description: { en: "Scrolling middle section.", zh: "可滚动的中间区域。" }, extends: "div", props: [] },
    { name: "SidebarFooter", description: { en: "Bottom section with a hairline divider.", zh: "带细线分隔线的底部区域。" }, extends: "div", props: [] },
    { name: "SidebarGroup", extends: "div", props: [] },
    { name: "SidebarGroupLabel", description: { en: "Small caps heading; folds into a short rule in the icon rail.", zh: "小型大写标题；在图标栏中折叠为一条短横线。" }, extends: "div", props: [] },
    { name: "SidebarMenu", extends: "ul", props: [] },
    {
      name: "SidebarItem",
      description: { en: "A row. With a `SidebarSub` child it becomes a disclosure.", zh: "行。带有 `SidebarSub` 子元素时成为展开项。" },
      extends: "button",
      props: [
        { name: "label", type: "ReactNode", required: true, description: { en: "Row text; fades out in the rail.", zh: "行文本；在图标栏中淡出。" } },
        { name: "icon", type: "ReactNode", description: { en: "Leading icon, 16px.", zh: "前置图标，16px。" } },
        { name: "tooltip", type: "string", description: { en: "Tooltip in the icon rail. Defaults to `label` when it is a string.", zh: "图标栏中的提示。当 `label` 为字符串时默认使用它。" } },
        { name: "badge", type: "ReactNode", description: { en: "Trailing count pill.", zh: "尾部计数胶囊。" } },
        { name: "isActive", type: "boolean", default: "false", description: { en: "Show the active pill and set `aria-current=\"page\"`.", zh: "显示激活胶囊并设置 `aria-current=\"page\"`。" } },
        { name: "href", type: "string", description: { en: "Render as a link.", zh: "渲染为链接。" } },
        { name: "disabled", type: "boolean", description: { en: "Dim and ignore clicks.", zh: "变暗并忽略点击。" } },
        { name: "open", type: "boolean", description: { en: "Controlled disclosure state.", zh: "受控的展开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Initial disclosure state.", zh: "初始展开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the disclosure opens or closes.", zh: "展开项打开或关闭时调用。" } },
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: { en: "Replace the rendered element, e.g. a router `Link`.", zh: "替换渲染的元素，例如路由的 `Link`。" } },
        { name: "itemClassName", type: "string", description: { en: "Class for the wrapping `li`.", zh: "包裹 `li` 的类名。" } },
      ],
      dataAttributes: [{ name: "data-active", description: { en: "Present while the pill sits on this row (itself active, or a hidden active child).", zh: "当胶囊位于此行（自身激活，或有隐藏的激活子项）时存在。" } }],
    },
    {
      name: "SidebarSub",
      description: { en: "Nested list of a disclosure item; folds away in the rail.", zh: "展开项的嵌套列表；在图标栏中折叠。" },
      extends: "motion.ul",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [],
      dataAttributes: [{ name: "data-state", description: { en: "`open` or `closed`.", zh: "`open` 或 `closed`。" } }],
    },
    {
      name: "SidebarSubItem",
      extends: "button",
      props: [
        { name: "isActive", type: "boolean", default: "false", description: { en: "Show the active pill.", zh: "显示激活胶囊。" } },
        { name: "href", type: "string", description: { en: "Render as a link.", zh: "渲染为链接。" } },
        { name: "disabled", type: "boolean", description: { en: "Dim and ignore clicks.", zh: "变暗并忽略点击。" } },
        { name: "icon", type: "ReactNode", description: { en: "Leading icon.", zh: "前置图标。" } },
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: { en: "Replace the rendered element.", zh: "替换渲染的元素。" } },
      ],
      dataAttributes: [{ name: "data-active", description: { en: "Present when active.", zh: "激活时存在。" } }],
    },
    {
      name: "SidebarTrigger",
      description: { en: "Round button that toggles the sidebar. Shows `SidebarIcon` unless you pass children.", zh: "切换侧边栏的圆形按钮。除非传入 children，否则显示 `SidebarIcon`。" },
      extends: "button",
      props: [],
      dataAttributes: [{ name: "data-state", description: { en: "`expanded` or `collapsed`.", zh: "`expanded` 或 `collapsed`。" } }],
    },
    { name: "SidebarInset", description: { en: "The main content area beside the sidebar.", zh: "侧边栏旁的主内容区域。" }, extends: "main", props: [] },
    { name: "SidebarHideCollapsed", description: { en: "Wrapper for header or footer content that hides in the icon rail.", zh: "页眉或页脚内容的包装器，在图标栏中隐藏。" }, extends: "div", props: [] },
    {
      name: "useSidebar",
      description: { en: "Read the sidebar state inside `SidebarProvider`.", zh: "在 `SidebarProvider` 内读取侧边栏状态。" },
      props: [
        { name: "open", type: "boolean", description: { en: "Whether it is expanded.", zh: "是否已展开。" } },
        { name: "setOpen", type: "(open: boolean) => void", description: { en: "Set the state.", zh: "设置状态。" } },
        { name: "toggle", type: "() => void", description: { en: "Flip the state.", zh: "翻转状态。" } },
        { name: "state", type: `"expanded" | "collapsed"`, description: { en: "Same as `open`, as a string.", zh: "与 `open` 相同，为字符串。" } },
        { name: "reduce", type: "boolean", description: { en: "Whether reduced motion is on.", zh: "是否开启减少动态效果。" } },
        { name: "pillId", type: "string", description: { en: "Shared layout id of the active pill.", zh: "激活胶囊的共享布局 id。" } },
      ],
    },
  ],
} satisfies ComponentDoc
