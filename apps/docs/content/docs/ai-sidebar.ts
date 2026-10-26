import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Navigates folders, projects and files in an AI workspace.", "zh": "浏览工作区的项目与文件。"},
  usage: {
    imports: `import { AISidebar } from "@/components/ui/ai-sidebar"`,
    code: `<AISidebar
  defaultItems={[{ id: "trips", label: "Trips", kind: "folder", children: [{ id: "kyoto", label: "Kyoto", kind: "file" }] }]}
  defaultExpandedIds={["trips"]}
/>`,
  },
  examples: [
    {
      id: "collapsed-rail",
      title: { en: "Collapsed Rail", zh: "收起为图标栏" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "with-footer",
      title: { en: "With Footer", zh: "带底栏" },
    },
    {
      id: "minimal",
      title: { en: "Minimal", zh: "简洁" },
    },
    {
      id: "search-hotkey",
      title: { en: "Search Hotkey", zh: "搜索快捷键" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "The tree follows the WAI-ARIA tree pattern. `ArrowUp` / `ArrowDown` move, `ArrowRight` / `ArrowLeft` open, close or go to the parent, `Home` / `End` jump, `Enter` / `Space` activate, typing jumps by label, and `F2` renames when `renamable`. `Escape` clears search. The search shortcut (⌘K on Mac, Ctrl+K elsewhere) is shared, so with several sidebars on a page, only the most recently mounted, focused or clicked one responds.", zh: "树遵循 WAI-ARIA 树模式。`ArrowUp` / `ArrowDown` 移动，`ArrowRight` / `ArrowLeft` 打开、关闭或转到父级，`Home` / `End` 跳转，`Enter` / `Space` 激活，输入按标签跳转，当 `renamable` 时 `F2` 重命名。`Escape` 清除搜索。搜索快捷键（Mac 上为 ⌘K，其他平台为 Ctrl+K）是共享的，所以当页面上有多个侧边栏时，只有最近挂载、获得焦点或点击的那个响应。" },
    },
    {
      title: "Related",
      body: { en: "See also [Animated Sidebar](/docs/animated-sidebar).", zh: "另见 [Animated Sidebar](/docs/animated-sidebar)。" },
    },
  ],
  api: [
    {
      name: "AISidebar",
      description: { en: "Workspace sidebar with bookmarks, a searchable resource tree and a collapsible icon rail.", zh: "带有书签、可搜索资源树和可折叠图标栏的工作区侧边栏。" },
      extends: "motion.nav",
      props: [
        { name: "items", type: "SidebarResource[]", description: { en: "Controlled workspace tree; folders and projects hold `children`, files are leaves.", zh: "受控工作区树；文件夹和项目包含 `children`，文件是叶子。" } },
        { name: "defaultItems", type: "SidebarResource[]", default: "[]", description: { en: "Initial tree when uncontrolled.", zh: "非受控时的初始树。" } },
        { name: "onItemsChange", type: "(items: SidebarResource[]) => void", description: { en: "Called with the renamed tree.", zh: "以重命名后的树调用。" } },
        { name: "bookmarks", type: "SidebarResource[]", default: "[]", description: { en: "Pinned shortcuts in their own section.", zh: "固定快捷方式位于其自己的部分。" } },
        { name: "activeId", type: "string | null", description: { en: "Controlled active item.", zh: "受控的活动项。" } },
        { name: "defaultActiveId", type: "string | null", default: "null", description: { en: "Initial active item.", zh: "初始活动项。" } },
        { name: "onActiveChange", type: "(id: string, item: SidebarResource) => void", description: { en: "Called when a leaf is activated.", zh: "激活叶子时调用。" } },
        { name: "defaultExpandedIds", type: "string[]", default: "[]", description: { en: "Containers open on first render.", zh: "首次渲染时容器打开。" } },
        { name: "open", type: "boolean", description: { en: "Controlled state, expanded (`true`) or icon rail (`false`).", zh: "受控状态，展开（`true`）或图标栏（`false`）。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Initial state when uncontrolled. Closed, the sidebar is a 56px icon rail with tooltips, and clicking a folder or project expands it.", zh: "非受控时的初始状态。关闭时，侧边栏是带有提示的 56px 图标栏，点击文件夹或项目会展开它。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the sidebar expands or collapses.", zh: "侧边栏展开或折叠时调用。" } },
        { name: "title", type: "ReactNode", default: "the locale's", description: { en: "Title row content.", zh: "标题行内容。" } },
        { name: "actions", type: "(open: boolean) => ReactNode", description: { en: "Rendered under the title, e.g. a New chat button.", zh: "渲染在标题下，例如 New chat 按钮。" } },
        { name: "footer", type: "(open: boolean) => ReactNode", description: { en: "Pinned to the bottom, e.g. the account row.", zh: "固定在底部，例如账户行。" } },
        { name: "searchable", type: "boolean", default: "true", description: { en: "Show the search field.", zh: "显示搜索字段。" } },
        { name: "searchHotkey", type: "string | null", default: `"k"`, description: { en: "⌘ (Mac) / Ctrl + this key opens the sidebar and focuses search; the hint shows the platform modifier. Only the most recently mounted, focused or clicked sidebar responds. `null` disables it.", zh: "⌘（Mac）/ Ctrl + 此键打开侧边栏并聚焦搜索；提示显示平台修饰键。只有最近挂载、获得焦点或点击的侧边栏响应。`null` 禁用它。" } },
        { name: "renamable", type: "boolean", default: "false", description: { en: "Allow inline rename (F2, double-click or the pencil).", zh: "允许内联重命名（F2、双击或铅笔）。" } },
        { name: "onRename", type: "(item: SidebarResource, label: string) => void", description: { en: "Called after a rename, including bookmarks.", zh: "重命名后调用，包括书签。" } },
        { name: "width", type: "string", default: `"16rem"`, description: { en: "Expanded width as a CSS length.", zh: "展开宽度，作为 CSS 长度。" } },
      ],
      dataAttributes: [
        { name: "data-state", description: { en: "`open` or `collapsed`.", zh: "`open` 或 `collapsed`。" } },
        { name: "data-active", description: { en: "On the active tree item.", zh: "在活动的树项上。" } },
        { name: "data-kind", description: { en: "On each tree item, its `kind`.", zh: "在每个树项上，其 `kind`。" } },
      ],
    },
    {
      name: "SidebarResource",
      description: { en: "One tree node.", zh: "一个树节点。" },
      props: [
        { name: "id", type: "string", required: true, description: { en: "Stable id.", zh: "稳定的 id。" } },
        { name: "label", type: "string", required: true, description: { en: "Shown text; also used by search and typeahead.", zh: "显示文本；也用于搜索和类型预输入。" } },
        { name: "kind", type: `"folder" | "project" | "file" | "bookmark"`, required: true, description: { en: "Icon and tint; folders and projects with `children` expand.", zh: "图标和着色；带有 `children` 的文件夹和项目可展开。" } },
        { name: "children", type: "SidebarResource[]", description: { en: "Nested nodes.", zh: "嵌套节点。" } },
        { name: "meta", type: "ReactNode", description: { en: "Trailing hint, e.g. a count or time.", zh: "尾部提示，例如计数或时间。" } },
        { name: "disabled", type: "boolean", description: { en: "Dim and skip activation.", zh: "变暗并跳过激活。" } },
      ],
    },
    {
      name: "ResourceIcon",
      description: { en: "The 16px icon for a resource kind.", zh: "资源类型的 16px 图标。" },
      props: [
        { name: "kind", type: `"folder" | "project" | "file" | "bookmark"`, required: true, description: { en: "Which icon.", zh: "哪个图标。" } },
        { name: "className", type: "string", description: { en: "Merged onto the icon.", zh: "合并到图标上。" } },
      ],
    },
  ],
} satisfies ComponentDoc
