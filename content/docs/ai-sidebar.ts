import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Collapsed Rail",
      description: "Use `defaultOpen={false}` when the main content needs the width.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `open` and `activeId` with their change handlers when routing or other UI owns the sidebar state.",
    },
    {
      id: "with-footer",
      title: "With Footer",
      description: "Use the `footer` and `actions` render props when they must switch to icon-only in the rail.",
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Use `searchable={false}` for short lists that don't need search.",
    },
    {
      id: "search-hotkey",
      title: "Search Hotkey",
      description: "Use `searchHotkey` when your app already uses ⌘K, or pass `null` to disable it.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The tree follows the WAI-ARIA tree pattern. `ArrowUp` / `ArrowDown` move, `ArrowRight` / `ArrowLeft` open, close or go to the parent, `Home` / `End` jump, `Enter` / `Space` activate, typing jumps by label, and `F2` renames when `renamable`. `Escape` clears search. The search shortcut (⌘K on Mac, Ctrl+K elsewhere) is shared, so with several sidebars on a page, only the most recently mounted, focused or clicked one responds.",
    },
    {
      title: "Related",
      body: "See also [Animated Sidebar](/docs/animated-sidebar).",
    },
  ],
  api: [
    {
      name: "AISidebar",
      description: "Workspace sidebar with bookmarks, a searchable resource tree and a collapsible icon rail.",
      extends: "motion.nav",
      props: [
        { name: "items", type: "SidebarResource[]", description: "Controlled workspace tree; folders and projects hold `children`, files are leaves." },
        { name: "defaultItems", type: "SidebarResource[]", default: "[]", description: "Initial tree when uncontrolled." },
        { name: "onItemsChange", type: "(items: SidebarResource[]) => void", description: "Called with the renamed tree." },
        { name: "bookmarks", type: "SidebarResource[]", default: "[]", description: "Pinned shortcuts in their own section." },
        { name: "activeId", type: "string | null", description: "Controlled active item." },
        { name: "defaultActiveId", type: "string | null", default: "null", description: "Initial active item." },
        { name: "onActiveChange", type: "(id: string, item: SidebarResource) => void", description: "Called when a leaf is activated." },
        { name: "defaultExpandedIds", type: "string[]", default: "[]", description: "Containers open on first render." },
        { name: "open", type: "boolean", description: "Controlled state, expanded (`true`) or icon rail (`false`)." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial state when uncontrolled. Closed, the sidebar is a 56px icon rail with tooltips, and clicking a folder or project expands it." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the sidebar expands or collapses." },
        { name: "title", type: "ReactNode", default: `"Workspace"`, description: "Title row content." },
        { name: "actions", type: "(open: boolean) => ReactNode", description: "Rendered under the title, e.g. a New chat button." },
        { name: "footer", type: "(open: boolean) => ReactNode", description: "Pinned to the bottom, e.g. the account row." },
        { name: "searchable", type: "boolean", default: "true", description: "Show the search field." },
        { name: "searchHotkey", type: "string | null", default: `"k"`, description: "⌘ (Mac) / Ctrl + this key opens the sidebar and focuses search; the hint shows the platform modifier. Only the most recently mounted, focused or clicked sidebar responds. `null` disables it." },
        { name: "renamable", type: "boolean", default: "false", description: "Allow inline rename (F2, double-click or the pencil)." },
        { name: "onRename", type: "(item: SidebarResource, label: string) => void", description: "Called after a rename, including bookmarks." },
        { name: "width", type: "string", default: `"16rem"`, description: "Expanded width as a CSS length." },
      ],
      dataAttributes: [
        { name: "data-state", description: "`open` or `collapsed`." },
        { name: "data-active", description: "On the active tree item." },
        { name: "data-kind", description: "On each tree item, its `kind`." },
      ],
    },
    {
      name: "SidebarResource",
      description: "One tree node.",
      props: [
        { name: "id", type: "string", required: true, description: "Stable id." },
        { name: "label", type: "string", required: true, description: "Shown text; also used by search and typeahead." },
        { name: "kind", type: `"folder" | "project" | "file" | "bookmark"`, required: true, description: "Icon and tint; folders and projects with `children` expand." },
        { name: "children", type: "SidebarResource[]", description: "Nested nodes." },
        { name: "meta", type: "ReactNode", description: "Trailing hint, e.g. a count or time." },
        { name: "disabled", type: "boolean", description: "Dim and skip activation." },
      ],
    },
    {
      name: "ResourceIcon",
      description: "The 16px icon for a resource kind.",
      props: [
        { name: "kind", type: `"folder" | "project" | "file" | "bookmark"`, required: true, description: "Which icon." },
        { name: "className", type: "string", description: "Merged onto the icon." },
      ],
    },
  ],
} satisfies ComponentDoc
