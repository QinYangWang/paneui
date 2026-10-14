import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Custom Separator",
      description: "Pass children to `BreadcrumbSeparator` to replace the chevron.",
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Icons inside a link or page crumb are sized to 14px. Give icon-only links an `aria-label`.",
    },
    {
      id: "trail-options",
      title: "Trail Options",
      description:
        "`BreadcrumbTrail` folds the middle into a menu past `maxItems`; `itemsBeforeCollapse` and `itemsAfterCollapse` set what stays, and `separator` swaps the chevron.",
    },
    {
      id: "static-ellipsis",
      title: "Static Ellipsis",
      description: "Without `items`, `BreadcrumbEllipsis` is a plain visual marker instead of a menu button.",
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
    { name: "BreadcrumbList", description: "Wrapping row of crumbs.", extends: "ol", props: [] },
    { name: "BreadcrumbItem", description: "One crumb; fades in on mount.", extends: "li", props: [] },
    {
      name: "BreadcrumbLink",
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
      description: "The current page as a raised chip, with `aria-current=\"page\"`.",
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
      description: "The \"…\" crumb. With `items` it is a button that opens a menu of the hidden crumbs.",
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
