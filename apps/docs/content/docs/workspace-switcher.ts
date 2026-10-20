import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Switches between workspaces or teams from the sidebar header.", "zh": "切换工作区或团队。"},
  baseUi: { name: "Menu", href: "https://base-ui.com/react/components/menu" },
  usage: {
    imports: `import { WorkspaceSwitcher } from "@/components/ui/workspace-switcher"`,
    code: `<WorkspaceSwitcher
  workspaces={[{ id: "acme", name: "Acme", plan: "Pro" }]}
  value={workspace}
  onValueChange={setWorkspace}
  onCreate={() => setCreating(true)}
/>`,
  },
  examples: [],
  notes: [{ title: "In a sidebar", body: "Put it in `SidebarHeader` and pass `collapsed={useSidebar().state === \"collapsed\"}` so it shrinks to the mark in the icon rail." }],
  api: [
    {
      name: "WorkspaceSwitcher",
      extends: "Menu.Trigger",
      props: [
        { name: "workspaces", type: "{ id: string; name: string; plan?: string; logo?: ReactNode }[]", required: true, description: "Choices; `logo` defaults to the first letter on a primary tile." },
        { name: "value", type: "string", required: true, description: "Current workspace id." },
        { name: "onValueChange", type: "(id: string) => void", required: true, description: "Called on pick." },
        { name: "onCreate", type: "() => void", description: "Adds a \"Create workspace\" item." },
        { name: "collapsed", type: "boolean", default: "false", description: "Mark only." },
      ],
    },
  ],
} satisfies ComponentDoc
