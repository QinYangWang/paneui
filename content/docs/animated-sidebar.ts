import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Icon Rail",
      description: "Use `defaultOpen={false}` on the provider when the content needs the width; rail items show their `label` or `tooltip` as a tooltip.",
    },
    {
      id: "flush-right",
      title: "Flush, Right Side",
      description: "Use `variant=\"sidebar\"` for full-height app shells, and `side=\"right\"` for secondary panels.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `open` and `onOpenChange` when other UI must fold the rail or a disclosure item.",
    },
    {
      id: "static",
      title: "Non-collapsible Links",
      description: "Use `collapsible=\"none\"` for short link lists that never fold.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "⌘/Ctrl + B toggles the sidebar; change the key with `shortcut` or pass `null` to turn it off. All sidebars share one listener, so with several on a page, only the most recently mounted, focused or clicked one toggles. Disclosure items set `aria-expanded` and `aria-controls`.",
    },
    {
      title: "Related",
      body: "See also [AI Sidebar](/docs/ai-sidebar).",
    },
  ],
  api: [
    {
      name: "SidebarProvider",
      description: "Holds the open state and lays out the sidebar and inset in a row.",
      extends: "div",
      props: [
        { name: "open", type: "boolean", description: "Controlled expanded state." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial expanded state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the sidebar expands or collapses." },
        { name: "shortcut", type: "string | null", default: `"b"`, description: "Key that toggles with ⌘/Ctrl. Only the most recently mounted, focused or clicked sidebar responds. `null` disables the shortcut." },
      ],
      dataAttributes: [{ name: "data-state", description: "`expanded` or `collapsed`." }],
    },
    {
      name: "Sidebar",
      description: "The panel. Its width springs between `--sidebar-width` (15rem) and `--sidebar-width-icon` (3.75rem).",
      extends: "motion.aside",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        { name: "side", type: `"left" | "right"`, default: `"left"`, description: "Which side of the inset it sits on." },
        { name: "variant", type: `"floating" | "sidebar"`, default: `"floating"`, description: "`floating` is a raised rounded card; `sidebar` sits flush with a hairline edge." },
        { name: "collapsible", type: `"icon" | "none"`, default: `"icon"`, description: "`icon` folds into an icon rail; `none` never collapses." },
        { name: "panelClassName", type: "string", description: "Class for the inner panel surface." },
        { name: "aria-label", type: "string", default: `"Sidebar"`, description: "Accessible name of the aside." },
      ],
      dataAttributes: [
        { name: "data-state", description: "`expanded` or `collapsed`." },
        { name: "data-variant", description: "`floating` or `sidebar`." },
        { name: "data-side", description: "`left` or `right`." },
      ],
    },
    { name: "SidebarHeader", extends: "div", props: [] },
    { name: "SidebarContent", description: "Scrolling middle section.", extends: "div", props: [] },
    { name: "SidebarFooter", description: "Bottom section with a hairline divider.", extends: "div", props: [] },
    { name: "SidebarGroup", extends: "div", props: [] },
    { name: "SidebarGroupLabel", description: "Small caps heading; folds into a short rule in the icon rail.", extends: "div", props: [] },
    { name: "SidebarMenu", extends: "ul", props: [] },
    {
      name: "SidebarItem",
      description: "A row. With a `SidebarSub` child it becomes a disclosure.",
      extends: "button",
      props: [
        { name: "label", type: "ReactNode", required: true, description: "Row text; fades out in the rail." },
        { name: "icon", type: "ReactNode", description: "Leading icon, 16px." },
        { name: "tooltip", type: "string", description: "Tooltip in the icon rail. Defaults to `label` when it is a string." },
        { name: "badge", type: "ReactNode", description: "Trailing count pill." },
        { name: "isActive", type: "boolean", default: "false", description: "Show the active pill and set `aria-current=\"page\"`." },
        { name: "href", type: "string", description: "Render as a link." },
        { name: "disabled", type: "boolean", description: "Dim and ignore clicks." },
        { name: "open", type: "boolean", description: "Controlled disclosure state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial disclosure state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the disclosure opens or closes." },
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: "Replace the rendered element, e.g. a router `Link`." },
        { name: "itemClassName", type: "string", description: "Class for the wrapping `li`." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present while the pill sits on this row (itself active, or a hidden active child)." }],
    },
    {
      name: "SidebarSub",
      description: "Nested list of a disclosure item; folds away in the rail.",
      extends: "motion.ul",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [],
      dataAttributes: [{ name: "data-state", description: "`open` or `closed`." }],
    },
    {
      name: "SidebarSubItem",
      extends: "button",
      props: [
        { name: "isActive", type: "boolean", default: "false", description: "Show the active pill." },
        { name: "href", type: "string", description: "Render as a link." },
        { name: "disabled", type: "boolean", description: "Dim and ignore clicks." },
        { name: "icon", type: "ReactNode", description: "Leading icon." },
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: "Replace the rendered element." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present when active." }],
    },
    {
      name: "SidebarTrigger",
      description: "Round button that toggles the sidebar. Shows `SidebarIcon` unless you pass children.",
      extends: "button",
      props: [],
      dataAttributes: [{ name: "data-state", description: "`expanded` or `collapsed`." }],
    },
    { name: "SidebarInset", description: "The main content area beside the sidebar.", extends: "main", props: [] },
    { name: "SidebarHideCollapsed", description: "Wrapper for header or footer content that hides in the icon rail.", extends: "div", props: [] },
    {
      name: "useSidebar",
      description: "Read the sidebar state inside `SidebarProvider`.",
      props: [
        { name: "open", type: "boolean", description: "Whether it is expanded." },
        { name: "setOpen", type: "(open: boolean) => void", description: "Set the state." },
        { name: "toggle", type: "() => void", description: "Flip the state." },
        { name: "state", type: `"expanded" | "collapsed"`, description: "Same as `open`, as a string." },
        { name: "reduce", type: "boolean", description: "Whether reduced motion is on." },
        { name: "pillId", type: "string", description: "Shared layout id of the active pill." },
      ],
    },
  ],
} satisfies ComponentDoc
