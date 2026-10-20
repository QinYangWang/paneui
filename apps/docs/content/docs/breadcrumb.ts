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
      body: "Each crumb fades and slides in 4px when it mounts, e.g. when navigating deeper. With reduced motion it appears at once.",
    },
    {
      title: "Accessibility",
      body: "`Breadcrumb` is a `nav` labelled \"Breadcrumb\". `BreadcrumbPage` is marked `aria-current=\"page\"`, and separators are hidden from screen readers.",
    },
  ],
  api: [
    {
      name: "Breadcrumb",
      extends: "nav",
      props: [{ name: "aria-label", type: "string", default: `"Breadcrumb"`, description: "Accessible name of the nav." }],
    },
    {
      name: "BreadcrumbList",
      description: "Wrapping row of crumbs.",
      extends: "ol",
      props: [{ name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Crumb height 24, 28 or 32px and text size, for every part inside." }],
      dataAttributes: [{ name: "data-size", description: "The `size` value." }],
    },
    { name: "BreadcrumbItem", description: "One crumb; fades in on mount.", extends: "li", props: [] },
    {
      name: "BreadcrumbLink",
      description: "A link crumb. Icons inside it, or inside `BreadcrumbPage`, are sized to 14px.",
      extends: "a",
      props: [
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the `<a>`, e.g. with a router `Link`.",
        },
      ],
    },
    {
      name: "BreadcrumbPage",
      description: "The current page, with `aria-current=\"page\"`.",
      extends: "span",
      props: [],
    },
    {
      name: "BreadcrumbSeparator",
      extends: "li",
      props: [{ name: "children", type: "ReactNode", default: "<ChevronRightIcon />", description: "Separator glyph." }],
    },
    {
      name: "BreadcrumbEllipsis",
      description: "The \"…\" crumb. With `items` it is a button that opens a menu of the hidden crumbs; without them it is a plain marker.",
      extends: "span",
      props: [
        {
          name: "items",
          type: "{ label: ReactNode; href?: string; icon?: ReactNode; onClick?: () => void }[]",
          description: "Hidden crumbs listed in the menu.",
        },
        {
          name: "label",
          type: "string",
          default: `"Show hidden breadcrumbs"`,
          description: "Accessible name of the menu button.",
        },
      ],
      dataAttributes: [{ name: "data-popup-open", description: "Present on the menu button while its menu is open." }],
    },
    {
      name: "BreadcrumbTrail",
      description: "Renders a whole breadcrumb from `items`; the last item is the current page.",
      extends: "nav",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Passed to `BreadcrumbList`." },
        {
          name: "items",
          type: "{ label: ReactNode; href?: string; icon?: ReactNode; onClick?: () => void }[]",
          required: true,
          description: "Crumbs from root to current page.",
        },
        { name: "maxItems", type: "number", default: "4", description: "Collapse the middle once there are more items than this." },
        { name: "itemsBeforeCollapse", type: "number", default: "1", description: "Crumbs kept before the ellipsis." },
        { name: "itemsAfterCollapse", type: "number", default: "2", description: "Crumbs kept after the ellipsis." },
        { name: "separator", type: "ReactNode", description: "Replaces the chevron between crumbs." },
      ],
    },
  ],
} satisfies ComponentDoc
