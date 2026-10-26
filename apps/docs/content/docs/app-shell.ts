import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "App frame with a collapsible sidebar and an inset content panel.", "zh": "组织应用导航与主内容。"},
  usage: {
    imports: `import { AppShell, AppShellInsetHeader, AppShellMain, AppShellSidebar, AppShellSwitcher } from "@/components/ui/app-shell"
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarMenu } from "@/components/ui/animated-sidebar"`,
    code: `<AppShell>
  <AppShellSidebar>
    <SidebarHeader>
      <AppShellSwitcher name="Acme" description="Business" avatar={<Avatar shape="rounded">…</Avatar>}>
        <MenuItem>New team</MenuItem>
      </AppShellSwitcher>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarItem icon={<HomeIcon />} label="Home" isActive />
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <UserMenu name="Dana Chen" email="dana@acme.dev">…</UserMenu>
    </SidebarFooter>
  </AppShellSidebar>
  <AppShellMain>
    <AppShellInsetHeader>
      <Breadcrumb>…</Breadcrumb>
    </AppShellInsetHeader>
    <div className="p-4">…</div>
  </AppShellMain>
</AppShell>`,
  },
  composition: `AppShell
├── AppShellHeader (optional, header-first)
│   └── AppShellTrigger
├── AppShellSidebar
│   ├── SidebarHeader → AppShellSwitcher
│   ├── SidebarContent
│   └── SidebarFooter → UserMenu
└── AppShellMain
    └── AppShellInsetHeader
        └── AppShellTrigger, Separator, your breadcrumb`,
  examples: [
    {
      id: "header-first",
      title: { en: "Header First", zh: "通栏标题栏" },
    },
    {
      id: "sidebar",
      title: { en: "Sidebar", zh: "侧栏" },
    },
    {
      id: "floating",
      title: { en: "Floating", zh: "浮动" },
    },
    {
      id: "top-nav",
      title: { en: "Top Nav", zh: "顶部导航" },
    },
    {
      id: "icon-rail",
      title: { en: "Icon Rail", zh: "图标栏" },
    },
    {
      id: "header-actions",
      title: { en: "Header Actions", zh: "标题栏操作" },
    },
  ],
  notes: [
    {
      title: "Sidebar first or header first",
      body: { en: "Without a direct `AppShellHeader` child the sidebar runs the full height and the panel sits 3px below the top, with `AppShellInsetHeader` as its first row. With one, the header spans the top and the sidebar and panel start below it. The choice is made in CSS from the children, so it renders right on the server.", zh: "没有直接的 `AppShellHeader` 子元素时，侧边栏贯穿整个高度，面板顶部下方 3px，`AppShellInsetHeader` 作为第一行。有则页眉贯穿顶部，侧边栏和面板从其下方开始。该选择在 CSS 中根据子元素决定，因此在服务器端也能正确渲染。" },
    },
    {
      title: "Alignment",
      body: { en: "The header's leading column is exactly `--sidebar-width-icon` wide, so the trigger sits on the rail's icon column whether the sidebar is expanded or folded. Header content starts on the sidebar's label column (`--app-shell-label-inset`), so a title or logo lines up with the nav labels. Change the rail width on `AppShell` with `style={{ \"--sidebar-width-icon\": \"4rem\" }}` and both follow. The floating rail grows by its 3px gutter and the trigger moves with it, so the icons stay on the trigger's column. `AppShellSwitcher` puts a 32px avatar on the same column.", zh: "页眉的前置列宽度正好是 `--sidebar-width-icon`，因此无论侧边栏展开还是折叠，触发器都位于图标栏的图标列上。页眉内容从侧边栏的标签列（`--app-shell-label-inset`）开始，因此标题或徽标与导航标签对齐。在 `AppShell` 上用 `style={{ \"--sidebar-width-icon\": \"4rem\" }}` 更改图标栏宽度，两者都会跟随。浮动图标栏按 3px 的间隙增长，触发器随之移动，因此图标保持在触发器的列上。`AppShellSwitcher` 将 32px 的头像放在同一列。" },
    },
    {
      title: "Page and window",
      body: { en: "`variant=\"page\"` fills the viewport: the header and the rail stick, the panel scrolls with the page and a sticky cap keeps its rounded top under the header, so start your content at least 1rem below the panel's top. `variant=\"window\"` is a bounded frame (give it a height) whose panel scrolls on its own; the panel's radius is the frame's radius minus its 3px gap.", zh: "`variant=\"page\"` 填满视口：页眉和图标栏固定，面板随页面滚动，粘性顶盖使圆角顶部保持在页眉下方，因此内容至少从面板顶部下方 1rem 开始。`variant=\"window\"` 是有边界的框架（给它一个高度），其面板自行滚动；面板的圆角等于框架圆角减去其 3px 间隙。" },
    },
    {
      title: "Mobile",
      body: { en: "Below the `lg` breakpoint the sidebar's children move into a left drawer and `AppShellTrigger` opens it. Following a link inside the drawer closes it; disclosure rows stay open. Lead `mobileTitle` with an 18px mark so it lines up with the nav icons.", zh: "低于 `lg` 断点时，侧边栏的子元素移入左侧抽屉，`AppShellTrigger` 打开它。在抽屉内点击链接会关闭抽屉；展开项保持打开。`mobileTitle` 以 18px 标记开头，使其与导航图标对齐。" },
    },
    {
      title: "Keyboard",
      body: { en: "⌘/Ctrl + B toggles the rail; change the key with `shortcut` or pass `null` to turn it off. The trigger sets `aria-expanded` for the rail on desktop and for the drawer on mobile.", zh: "⌘/Ctrl + B 切换图标栏；用 `shortcut` 更改按键，或传 `null` 关闭。触发器在桌面端为图标栏、在移动端为抽屉设置 `aria-expanded`。" },
    },
    {
      title: "Related",
      body: { en: "The sidebar parts come from [Animated Sidebar](/docs/animated-sidebar).", zh: "侧边栏部件来自 [Animated Sidebar](/docs/animated-sidebar)。" },
    },
  ],
  api: [
    {
      name: "AppShell",
      description: { en: "The band. Holds the sidebar state and lays out the header, sidebar and panel on one grid.", zh: "区域。持有侧边栏状态，并将页眉、侧边栏和面板排在一个网格中。" },
      extends: "div",
      props: [
        { name: "variant", type: `"page" | "window"`, default: `"page"`, description: { en: "`page` fills the viewport and sticks to it; `window` is a rounded frame whose panel scrolls inside.", zh: "`page` 填满视口并固定其中；`window` 是圆角框架，其面板在内部滚动。" } },
        { name: "layout", type: `"inset" | "sidebar" | "floating"`, default: `"inset"`, description: { en: "`inset` puts the page in a rounded panel on the band; `sidebar` is flush, with hairlines under the header and beside the rail; `floating` makes the rail a rounded panel of its own.", zh: "`inset` 将页面放在区域上的圆角面板中；`sidebar` 贴合，页眉下方和图标栏旁有细线；`floating` 使图标栏成为独立的圆角面板。" } },
        { name: "open", type: "boolean", description: { en: "Controlled expanded state of the rail.", zh: "受控的图标栏展开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Initial expanded state when uncontrolled.", zh: "非受控时的初始展开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the rail expands or collapses.", zh: "图标栏展开或折叠时调用。" } },
        { name: "shortcut", type: "string | null", default: `"b"`, description: { en: "Key that toggles the rail with ⌘/Ctrl. `null` disables it.", zh: "使用 ⌘/Ctrl 切换图标栏的按键。`null` 禁用它。" } },
      ],
      dataAttributes: [
        { name: "data-state", description: { en: "`expanded` or `collapsed`.", zh: "`expanded` 或 `collapsed`。" } },
        { name: "data-variant", description: { en: "`page` or `window`.", zh: "`page` 或 `window`。" } },
        { name: "data-layout", description: { en: "`inset`, `sidebar` or `floating`.", zh: "`inset`、`sidebar` 或 `floating`。" } },
      ],
    },
    {
      name: "AppShellHeader",
      description: { en: "The top row. Children start on the sidebar's label column.", zh: "顶部行。子元素从侧边栏的标签列开始。" },
      extends: "header",
      props: [
        { name: "leading", type: "ReactNode", default: "<AppShellTrigger />", description: { en: "Content of the rail-wide leading column. `null` leaves it empty.", zh: "贯穿图标栏的前置列内容。`null` 使其留空。" } },
      ],
    },
    {
      name: "AppShellTrigger",
      description: { en: "Toggles the rail on desktop and opens the drawer below `lg`.", zh: "在桌面端切换图标栏，在低于 `lg` 时打开抽屉。" },
      extends: "button",
      props: [],
      dataAttributes: [{ name: "data-state", description: { en: "`expanded` or `collapsed`.", zh: "`expanded` 或 `collapsed`。" } }],
    },
    {
      name: "AppShellSidebar",
      description: { en: "The rail sidebar on desktop, a left drawer below `lg`. Takes the animated sidebar's parts as children.", zh: "桌面端的图标栏侧边栏，低于 `lg` 时为左侧抽屉。将动画侧边栏的部件作为 children 传入。" },
      extends: "Sidebar",
      extendsHref: "/docs/animated-sidebar",
      props: [
        { name: "mobileTitle", type: "ReactNode", default: `"Navigation"`, description: { en: "Title of the mobile drawer.", zh: "移动端抽屉的标题。" } },
        { name: "aria-label", type: "string", default: `"Sidebar"`, description: { en: "Accessible name of the sidebar and the drawer's sidebar.", zh: "侧边栏和抽屉侧边栏的无障碍名称。" } },
      ],
    },
    {
      name: "AppShellMain",
      description: { en: "The inset content panel. Bring your own padding.", zh: "inset 内容面板。自带内边距。" },
      extends: "main",
      props: [],
    },
    {
      name: "AppShellInsetHeader",
      description: { en: "The panel's first row in a sidebar-first shell. Sticks to the panel's top.", zh: "侧边栏优先外壳中面板的第一行。固定在面板顶部。" },
      extends: "header",
      props: [
        { name: "trigger", type: "boolean", default: "true", description: { en: "Lead with `AppShellTrigger` and a vertical divider.", zh: "以 `AppShellTrigger` 和垂直分隔线开头。" } },
      ],
    },
    {
      name: "AppShellSwitcher",
      description: { en: "The team or workspace at the top of the sidebar, opening a menu of the others.", zh: "侧边栏顶部团队或工作区，打开其他团队的菜单。" },
      extends: "button",
      props: [
        { name: "name", type: "ReactNode", required: true, description: { en: "The current team.", zh: "当前团队。" } },
        { name: "description", type: "ReactNode", description: { en: "Second line, such as the plan.", zh: "第二行，例如套餐。" } },
        { name: "avatar", type: "ReactNode", required: true, description: { en: "A 32px `Avatar shape=\"rounded\"`; it stays visible in the icon rail.", zh: "32px 的 `Avatar shape=\"rounded\"`；在图标栏中保持可见。" } },
        { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"bottom"`, description: { en: "Menu side.", zh: "菜单方向。" } },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: { en: "Menu alignment.", zh: "菜单对齐方式。" } },
        { name: "children", type: "ReactNode", description: { en: "Menu contents.", zh: "菜单内容。" } },
      ],
    },
    {
      name: "useAppShell",
      description: { en: "Read the shell state inside `AppShell`. Also returns everything `useSidebar` does.", zh: "在 `AppShell` 内读取外壳状态。同时返回 `useSidebar` 的所有内容。" },
      props: [
        { name: "variant", type: `"page" | "window"`, description: { en: "The shell variant.", zh: "外壳变体。" } },
        { name: "isMobile", type: "boolean", description: { en: "Whether the viewport is below `lg` (the sidebar is a drawer).", zh: "视口是否低于 `lg`（侧边栏为抽屉）。" } },
        { name: "mobileOpen", type: "boolean", description: { en: "Whether the drawer is open.", zh: "抽屉是否打开。" } },
        { name: "setMobileOpen", type: "(open: boolean) => void", description: { en: "Open or close the drawer.", zh: "打开或关闭抽屉。" } },
      ],
    },
  ],
} satisfies ComponentDoc
