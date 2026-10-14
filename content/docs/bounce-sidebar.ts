import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { BounceSidebar } from "@/components/ui/bounce-sidebar"`,
    code: `<BounceSidebar
  items={[
    { id: "overview", label: "Overview" },
    { id: "inbox", label: "Inbox", meta: 12 },
  ]}
  defaultValue="overview"
/>`,
  },
  examples: [
    {
      id: "links",
      title: "Links and Disabled",
      description: "Items with an `href` render as links (`target=\"_blank\"` adds a safe `rel`); `disabled` items are skipped and dimmed. `meta` adds a trailing count.",
    },
    {
      id: "without-track",
      title: "Without Track",
      description: "`track={false}` hides the faint rail the dot travels along. Icons are optional.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The dot hops to the new row on a curved spring path; longer jumps get a softer, heavier spring. Under reduced motion it moves straight to the row with no animation.",
    },
    {
      title: "Related",
      body: "[Animated Sidebar](/docs/animated-sidebar), [AI Sidebar](/docs/ai-sidebar).",
    },
  ],
  api: [
    {
      name: "BounceSidebar",
      description: "Vertical nav with a hopping active dot. Each item is a button, or a link when it has an `href`; the active one gets `aria-current=\"page\"`.",
      extends: "nav",
      props: [
        { name: "items", type: "BounceSidebarItem[]", required: true, description: "The rows, in order." },
        { name: "value", type: "string", description: "Controlled active item id." },
        { name: "defaultValue", type: "string", default: "items[0].id", description: "Initial active id when uncontrolled." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called with the id of the clicked item." },
        { name: "label", type: "string", default: `"Sidebar"`, description: "Accessible name of the navigation landmark." },
        { name: "track", type: "boolean", default: "true", description: "Show the faint inset track the dot travels along." },
        { name: "itemClassName", type: "string", description: "Class for every row." },
        { name: "dotClassName", type: "string", description: "Class for the active dot." },
      ],
      dataAttributes: [{ name: "data-active", description: "On the active row's button or link." }],
    },
    {
      name: "BounceSidebarItem",
      description: "Type of each entry in `items`.",
      props: [
        { name: "id", type: "string", required: true, description: "Unique id, used as the value." },
        { name: "label", type: "ReactNode", required: true, description: "Row text." },
        { name: "icon", type: "ReactNode", description: "Leading icon, sized to 16px." },
        { name: "meta", type: "ReactNode", description: "Trailing content (count, kbd, badge)." },
        { name: "href", type: "string", description: "Render the row as a link." },
        { name: "target", type: "HTMLAttributeAnchorTarget", description: "Link target." },
        { name: "rel", type: "string", description: "Link rel. Defaults to `noreferrer noopener` for `_blank`." },
        { name: "disabled", type: "boolean", description: "Dim the row and ignore clicks." },
      ],
    },
  ],
} satisfies ComponentDoc
