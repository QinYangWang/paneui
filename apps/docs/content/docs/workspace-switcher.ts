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
  notes: [{ title: "In a sidebar", body: { en: "Put it in `SidebarHeader` and pass `collapsed={useSidebar().state === \"collapsed\"}` so it shrinks to the mark in the icon rail.", zh: "将其放在 `SidebarHeader` 中并传入 `collapsed={useSidebar().state === \"collapsed\"}`，以便它在图标栏中缩为标记。" } }],
  api: [
    {
      name: "WorkspaceSwitcher",
      extends: "Menu.Trigger",
      props: [
        { name: "workspaces", type: "{ id: string; name: string; plan?: string; logo?: ReactNode }[]", required: true, description: { en: "Choices; `logo` defaults to the first letter on a primary tile.", zh: "选项；`logo` 默认为主色块上的首字母。" } },
        { name: "value", type: "string", required: true, description: { en: "Current workspace id.", zh: "当前工作区 id。" } },
        { name: "onValueChange", type: "(id: string) => void", required: true, description: { en: "Called on pick.", zh: "选择时调用。" } },
        { name: "onCreate", type: "() => void", description: { en: "Adds a \"Create workspace\" item.", zh: "添加一个“Create workspace”项。" } },
        { name: "collapsed", type: "boolean", default: "false", description: { en: "Mark only.", zh: "仅标记。" } },
      ],
    },
  ],
} satisfies ComponentDoc
