import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows where the current page sits in the site hierarchy.", "zh": "显示当前页面的位置。"},
  usage: {
    imports: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`,
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  composition: `Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   ├── BreadcrumbLink
    │   ├── BreadcrumbEllipsis
    │   └── BreadcrumbPage
    └── BreadcrumbSeparator

BreadcrumbTrail (renders all of the above from items)`,
  examples: [
    {
      id: "custom-separator",
      title: { en: "Custom Separator", zh: "自定义分隔符" },
      description: { en: "Use a custom separator, like a slash, for file paths.", zh: "文件路径可使用斜杠分隔。" },
    },
    {
      id: "with-icons",
      title: { en: "With Icons", zh: "带图标" },
    },
    {
      id: "trail-options",
      title: { en: "Trail Options", zh: "路径选项" },
    },
    {
      id: "static-ellipsis",
      title: { en: "Static Ellipsis", zh: "静态省略号" },
      description: { en: "Use a static ellipsis when the hidden crumbs aren't worth navigating to.", zh: "适用于无需访问被省略路径的场景。" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Each crumb fades and slides in 4px when it mounts, e.g. when navigating deeper. With reduced motion it appears at once.", zh: "每个面包屑在挂载时淡入并滑动 4px，例如导航到更深层级时。在减少动态效果下，它立即出现。" },
    },
    {
      title: "Accessibility",
      body: { en: "`Breadcrumb` is a `nav` labelled \"Breadcrumb\". `BreadcrumbPage` is marked `aria-current=\"page\"`, and separators are hidden from screen readers.", zh: "`Breadcrumb` 是一个标记为“Breadcrumb”的 `nav`。`BreadcrumbPage` 标记为 `aria-current=\"page\"`，分隔符对屏幕阅读器隐藏。" },
    },
  ],
  api: [
    {
      name: "Breadcrumb",
      extends: "nav",
      props: [{ name: "aria-label", type: "string", default: `"Breadcrumb"`, description: { en: "Accessible name of the nav.", zh: "导航的无障碍名称。" } }],
    },
    {
      name: "BreadcrumbList",
      description: { en: "Wrapping row of crumbs.", zh: "面包屑的包裹行。" },
      extends: "ol",
      props: [{ name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Crumb height 24, 28 or 32px and text size, for every part inside.", zh: "每个内部部件的面包屑高度 24、28 或 32px 及文字大小。" } }],
      dataAttributes: [{ name: "data-size", description: { en: "The `size` value.", zh: "`size` 值。" } }],
    },
    { name: "BreadcrumbItem", description: { en: "One crumb; fades in on mount.", zh: "一个面包屑；挂载时淡入。" }, extends: "li", props: [] },
    {
      name: "BreadcrumbLink",
      description: { en: "A link crumb. Icons inside it, or inside `BreadcrumbPage`, are sized to 14px.", zh: "链接面包屑。其内部或 `BreadcrumbPage` 内部的图标尺寸为 14px。" },
      extends: "a",
      props: [
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: { en: "Replace the `<a>`, e.g. with a router `Link`.", zh: "替换 `<a>`，例如换为路由器的 `Link`。" },
        },
      ],
    },
    {
      name: "BreadcrumbPage",
      description: { en: "The current page, with `aria-current=\"page\"`.", zh: "当前页面，带有 `aria-current=\"page\"`。" },
      extends: "span",
      props: [],
    },
    {
      name: "BreadcrumbSeparator",
      extends: "li",
      props: [{ name: "children", type: "ReactNode", default: "<ChevronRightIcon />", description: { en: "Separator glyph.", zh: "分隔符字形。" } }],
    },
    {
      name: "BreadcrumbEllipsis",
      description: { en: "The \"…\" crumb. With `items` it is a button that opens a menu of the hidden crumbs; without them it is a plain marker.", zh: "“…” 面包屑。有 `items` 时是打开隐藏面包屑菜单的按钮；没有时是普通标记。" },
      extends: "span",
      props: [
        {
          name: "items",
          type: "{ label: ReactNode; href?: string; icon?: ReactNode; onClick?: () => void }[]",
          description: { en: "Hidden crumbs listed in the menu.", zh: "菜单中列出的隐藏面包屑。" },
        },
        {
          name: "label",
          type: "string",
          default: `"Show hidden breadcrumbs"`,
          description: { en: "Accessible name of the menu button.", zh: "菜单按钮的无障碍名称。" },
        },
      ],
      dataAttributes: [{ name: "data-popup-open", description: { en: "Present on the menu button while its menu is open.", zh: "菜单打开时出现在菜单按钮上。" } }],
    },
    {
      name: "BreadcrumbTrail",
      description: { en: "Renders a whole breadcrumb from `items`; the last item is the current page.", zh: "根据 `items` 渲染整个面包屑；最后一项是当前页面。" },
      extends: "nav",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Passed to `BreadcrumbList`.", zh: "传递给 `BreadcrumbList`。" } },
        {
          name: "items",
          type: "{ label: ReactNode; href?: string; icon?: ReactNode; onClick?: () => void }[]",
          required: true,
          description: { en: "Crumbs from root to current page.", zh: "从根到当前页面的面包屑。" },
        },
        { name: "maxItems", type: "number", default: "4", description: { en: "Collapse the middle once there are more items than this.", zh: "项目超过此数量时折叠中间部分。" } },
        { name: "itemsBeforeCollapse", type: "number", default: "1", description: { en: "Crumbs kept before the ellipsis.", zh: "省略号前保留的面包屑。" } },
        { name: "itemsAfterCollapse", type: "number", default: "2", description: { en: "Crumbs kept after the ellipsis.", zh: "省略号后保留的面包屑。" } },
        { name: "separator", type: "ReactNode", description: { en: "Replaces the chevron between crumbs.", zh: "替换面包屑之间的箭头。" } },
      ],
    },
  ],
} satisfies ComponentDoc
