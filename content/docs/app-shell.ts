import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AppShell, AppShellHeader, AppShellMain, AppShellSidebar } from "@/components/ui/app-shell"
import { SidebarContent, SidebarItem, SidebarMenu } from "@/components/ui/animated-sidebar"`,
    code: `<AppShell>
  <AppShellHeader>
    <span className="text-ui font-semibold">Acme</span>
  </AppShellHeader>
  <AppShellSidebar>
    <SidebarContent>
      <SidebarMenu>
        <SidebarItem icon={<HomeIcon />} label="Home" isActive />
      </SidebarMenu>
    </SidebarContent>
  </AppShellSidebar>
  <AppShellMain>
    <div className="p-8">…</div>
  </AppShellMain>
</AppShell>`,
  },
  composition: `AppShell
├── AppShellHeader
│   └── AppShellTrigger
├── AppShellSidebar
│   └── SidebarContent, SidebarFooter, …
└── AppShellMain`,
  examples: [
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
      title: "Alignment",
      body: "The header's leading column is exactly `--sidebar-width-icon` wide, so the trigger sits on the rail's icon column whether the sidebar is expanded or folded. Header content starts on the sidebar's label column (`--app-shell-label-inset`), so a title or logo lines up with the nav labels. Change the rail width on `AppShell` with `style={{ \"--sidebar-width-icon\": \"4rem\" }}` and both follow.",
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
