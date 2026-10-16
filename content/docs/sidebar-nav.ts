import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSearch,
  SidebarNavSection,
} from "@/components/ui/sidebar-nav"`,
    code: `<SidebarNav>
  <SidebarNavSearch shortcut="⌘K" onClick={openSearch} />
  <SidebarNavContent aria-label="Docs">
    <SidebarNavSection label="Getting started">
      <SidebarNavList>
        <SidebarNavLink href="/docs" active>Introduction</SidebarNavLink>
        <SidebarNavLink href="/docs/installation">Installation</SidebarNavLink>
      </SidebarNavList>
    </SidebarNavSection>
  </SidebarNavContent>
</SidebarNav>`,
  },
  composition: `SidebarNav
├── SidebarNavSearch
├── SidebarNavContent
│   └── SidebarNavSection            label, count, href, active
│       ├── SidebarNavList
│       │   └── SidebarNavLink       active, icon, badge
│       └── SidebarNavSection level="group"
└── SidebarNavFooter`,
  examples: [
    { id: "icons", title: "Icons", description: "Use `icon` for a short app-style list where each page has a symbol." },
    { id: "linked-groups", title: "Linked Groups", description: "Use `href` or `labelRender` when a section or group has an overview page of its own." },
    { id: "persisted", title: "Remembered Sections", description: "Use `open` and `onOpenChange` to keep folded sections folded across visits." },
    { id: "rtl", title: "RTL", description: "For right-to-left languages, wrap the tree in `DirectionProvider` and set `dir=\"rtl\"` on its root." },
  ],
  notes: [
    {
      title: "When to use",
      body: "For long page trees in docs, settings and admin sidebars. For an app rail with icons that folds to a strip, use [Animated Sidebar](/docs/animated-sidebar).",
    },
    {
      title: "Keyboard",
      body: "Section headings are buttons with `aria-expanded`. A linked heading is a link plus a separate chevron button named “Toggle” and the label. The current row has `aria-current=\"page\"`, and on mount the list scrolls it into view when it would start below the fold.",
    },
  ],
  api: [
    { name: "SidebarNav", extends: "div", description: "Column that fills its container.", props: [] },
    {
      name: "SidebarNavSearch",
      extends: "button",
      description: "A field-shaped button that opens your search.",
      props: [{ name: "shortcut", type: "React.ReactNode", description: "Key cap at the end, such as `⌘K`." }],
    },
    { name: "SidebarNavContent", extends: "nav", description: "The scrolling list. Give it an `aria-label`.", props: [] },
    {
      name: "SidebarNavSection",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "label", type: "React.ReactNode", required: true, description: "Heading text." },
        { name: "count", type: "number", description: "Muted count after the label." },
        { name: "level", type: `"section" | "group"`, default: `"section"`, description: "`group` is a smaller muted heading inside a section." },
        { name: "collapsible", type: "boolean", default: "true", description: "`false` drops the toggle and keeps it open." },
        { name: "href", type: "string", description: "Makes the label a link to the section's own page; the chevron beside it still folds the rows." },
        { name: "labelRender", type: "React.ReactElement | (props) => React.ReactElement", description: "Renders the label link with your router's link, such as `<Link href=\"…\" />`." },
        { name: "active", type: "boolean", default: "false", description: "Marks the label's page as current with the fill, the bar and `aria-current=\"page\"`." },
      ],
    },
    { name: "SidebarNavList", extends: "ul", props: [] },
    {
      name: "SidebarNavLink",
      extends: "a",
      description: "A row inside its own `li`. Use `render` for your router's link.",
      props: [
        { name: "active", type: "boolean", default: "false", description: "Marks the current page with a fill, a bar in the gutter and `aria-current=\"page\"`." },
        { name: "icon", type: "React.ReactNode", description: "Leading icon in a 16px slot, muted until the row is hovered or current." },
        { name: "badge", type: "React.ReactNode", description: "Trailing content, such as a New badge." },
      ],
    },
    { name: "SidebarNavFooter", extends: "div", description: "Pinned under the list, above a hairline.", props: [] },
  ],
} satisfies ComponentDoc
