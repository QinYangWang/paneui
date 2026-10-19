import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Header First",
      description: "Add `AppShellHeader` when brand, search and actions should span the window.",
    },
    {
      id: "sidebar",
      title: "Sidebar",
      description: "Use `layout=\"sidebar\"` for dense tools where a panel edge would waste space.",
    },
    {
      id: "floating",
      title: "Floating",
      description: "Use `layout=\"floating\"` when the navigation should read as its own surface.",
    },
    {
      id: "top-nav",
      title: "Top Nav",
      description: "Leave out `AppShellSidebar` when a few sections fit in the header.",
    },
    {
      id: "icon-rail",
      title: "Icon Rail",
      description: "Use `defaultOpen={false}` when the content needs the width from the start.",
    },
    {
      id: "header-actions",
      title: "Header Actions",
      description: "Use `open` and `onOpenChange` when other controls fold the rail.",
    },
  ],
  notes: [
    {
      title: "Sidebar first or header first",
      body: "Without a direct `AppShellHeader` child the sidebar runs the full height and the panel sits 3px below the top, with `AppShellInsetHeader` as its first row. With one, the header spans the top and the sidebar and panel start below it. The choice is made in CSS from the children, so it renders right on the server.",
    },
    {
      title: "Alignment",
      body: "The header's leading column is exactly `--sidebar-width-icon` wide, so the trigger sits on the rail's icon column whether the sidebar is expanded or folded. Header content starts on the sidebar's label column (`--app-shell-label-inset`), so a title or logo lines up with the nav labels. Change the rail width on `AppShell` with `style={{ \"--sidebar-width-icon\": \"4rem\" }}` and both follow. The floating rail grows by its 3px gutter and the trigger moves with it, so the icons stay on the trigger's column. `AppShellSwitcher` puts a 32px avatar on the same column.",
    },
    {
      title: "Page and window",
      body: "`variant=\"page\"` fills the viewport: the header and the rail stick, the panel scrolls with the page and a sticky cap keeps its rounded top under the header, so start your content at least 1rem below the panel's top. `variant=\"window\"` is a bounded frame (give it a height) whose panel scrolls on its own; the panel's radius is the frame's radius minus its 3px gap.",
    },
    {
      title: "Mobile",
      body: "Below the `lg` breakpoint the sidebar's children move into a left drawer and `AppShellTrigger` opens it. Following a link inside the drawer closes it; disclosure rows stay open. Lead `mobileTitle` with an 18px mark so it lines up with the nav icons.",
    },
    {
      title: "Keyboard",
      body: "⌘/Ctrl + B toggles the rail; change the key with `shortcut` or pass `null` to turn it off. The trigger sets `aria-expanded` for the rail on desktop and for the drawer on mobile.",
    },
    {
      title: "Related",
      body: "The sidebar parts come from [Animated Sidebar](/docs/animated-sidebar).",
    },
  ],
  api: [
    {
      name: "AppShell",
      description: "The band. Holds the sidebar state and lays out the header, sidebar and panel on one grid.",
      extends: "div",
      props: [
        { name: "variant", type: `"page" | "window"`, default: `"page"`, description: "`page` fills the viewport and sticks to it; `window` is a rounded frame whose panel scrolls inside." },
        { name: "layout", type: `"inset" | "sidebar" | "floating"`, default: `"inset"`, description: "`inset` puts the page in a rounded panel on the band; `sidebar` is flush, with hairlines under the header and beside the rail; `floating` makes the rail a rounded panel of its own." },
        { name: "open", type: "boolean", description: "Controlled expanded state of the rail." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial expanded state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the rail expands or collapses." },
        { name: "shortcut", type: "string | null", default: `"b"`, description: "Key that toggles the rail with ⌘/Ctrl. `null` disables it." },
      ],
      dataAttributes: [
        { name: "data-state", description: "`expanded` or `collapsed`." },
        { name: "data-variant", description: "`page` or `window`." },
        { name: "data-layout", description: "`inset`, `sidebar` or `floating`." },
      ],
    },
    {
      name: "AppShellHeader",
      description: "The top row. Children start on the sidebar's label column.",
      extends: "header",
      props: [
        { name: "leading", type: "ReactNode", default: "<AppShellTrigger />", description: "Content of the rail-wide leading column. `null` leaves it empty." },
      ],
    },
    {
      name: "AppShellTrigger",
      description: "Toggles the rail on desktop and opens the drawer below `lg`.",
      extends: "button",
      props: [],
      dataAttributes: [{ name: "data-state", description: "`expanded` or `collapsed`." }],
    },
    {
      name: "AppShellSidebar",
      description: "The rail sidebar on desktop, a left drawer below `lg`. Takes the animated sidebar's parts as children.",
      extends: "Sidebar",
      extendsHref: "/docs/animated-sidebar",
      props: [
        { name: "mobileTitle", type: "ReactNode", default: `"Navigation"`, description: "Title of the mobile drawer." },
        { name: "aria-label", type: "string", default: `"Sidebar"`, description: "Accessible name of the sidebar and the drawer's sidebar." },
      ],
    },
    {
      name: "AppShellMain",
      description: "The inset content panel. Bring your own padding.",
      extends: "main",
      props: [],
    },
    {
      name: "AppShellInsetHeader",
      description: "The panel's first row in a sidebar-first shell. Sticks to the panel's top.",
      extends: "header",
      props: [
        { name: "trigger", type: "boolean", default: "true", description: "Lead with `AppShellTrigger` and a vertical divider." },
      ],
    },
    {
      name: "AppShellSwitcher",
      description: "The team or workspace at the top of the sidebar, opening a menu of the others.",
      extends: "button",
      props: [
        { name: "name", type: "ReactNode", required: true, description: "The current team." },
        { name: "description", type: "ReactNode", description: "Second line, such as the plan." },
        { name: "avatar", type: "ReactNode", required: true, description: "A 32px `Avatar shape=\"rounded\"`; it stays visible in the icon rail." },
        { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"bottom"`, description: "Menu side." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Menu alignment." },
        { name: "children", type: "ReactNode", description: "Menu contents." },
      ],
    },
    {
      name: "useAppShell",
      description: "Read the shell state inside `AppShell`. Also returns everything `useSidebar` does.",
      props: [
        { name: "variant", type: `"page" | "window"`, description: "The shell variant." },
        { name: "isMobile", type: "boolean", description: "Whether the viewport is below `lg` (the sidebar is a drawer)." },
        { name: "mobileOpen", type: "boolean", description: "Whether the drawer is open." },
        { name: "setMobileOpen", type: "(open: boolean) => void", description: "Open or close the drawer." },
      ],
    },
  ],
} satisfies ComponentDoc
