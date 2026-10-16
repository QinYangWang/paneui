import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ThreadList, ThreadListGroup, ThreadListItem } from "@/components/ui/thread-list-item"`,
    code: `<ThreadList>
  <ThreadListGroup label="Recent">
    <ThreadListItem
      title="Fix broken chat dragging"
      icon={<ApertureIcon />}
      repo="workspace"
      pr={{ number: 1526, status: "open" }}
      branch="feat/fix-chat-dragging"
      active
    />
  </ThreadListGroup>
</ThreadList>`,
  },
  composition: `ThreadList
└── ThreadListGroup
    └── ThreadListItem`,
  examples: [
    { id: "pr-states", title: "Pull Request States", description: "Use in coding-agent sidebars where threads map to pull requests." },
    { id: "actions", title: "Description and Actions", description: "Use for chat lists with a subtitle, a time and a row menu." },
    { id: "minimal", title: "Minimal", description: "Use for plain chat lists; without `repo`, `pr` or `branch` the row is one line." },
  ],
  notes: [
    { title: "Truncation", body: "Title, repo and branch truncate independently; the branch gives way first so the PR number stays readable in a narrow sidebar." },
    { title: "Actions", body: "With `actions` the item is a list item holding the row button and the actions side by side, so a menu button never nests inside the row and its clicks don't reach the row. The actions show on hover, keyboard focus, while the row is active and while a menu they opened is open; on touch screens they always show and `meta` moves left of them. Then `className` and `data-active` sit on the list item." },
  ],
  api: [
    { name: "ThreadList", extends: "div", props: [] },
    { name: "ThreadListGroup", extends: "div", props: [{ name: "label", type: "ReactNode", required: true, description: "Section heading." }, { name: "action", type: "ReactNode", description: "Control on the heading row." }] },
    {
      name: "ThreadListItem",
      extends: "button",
      props: [
        { name: "title", type: "ReactNode", required: true, description: "Thread title." },
        { name: "icon", type: "ReactNode", description: "Provider or agent glyph." },
        { name: "repo", type: "string", description: "Repository or project." },
        { name: "pr", type: `{ number: number; status: "open" | "draft" | "merged" | "closed" }`, description: "Linked pull request. The number takes the status colour (open success, draft muted, merged purple, closed destructive)." },
        { name: "branch", type: "string", description: "Git branch." },
        { name: "active", type: "boolean", default: "false", description: "Selected row." },
        { name: "running", type: "boolean", default: "false", description: "Replace the icon with a spinner." },
        { name: "unread", type: "boolean", default: "false", description: "Primary dot after the title." },
        { name: "description", type: "ReactNode", description: "Free second line; truncates. Shown above `repo` / `pr` / `branch`." },
        { name: "meta", type: "ReactNode", description: "Quiet text at the end of the title line, such as a relative time. `actions` replace it on hover." },
        { name: "actions", type: "ReactNode", description: "Row controls, placed over the end of the row outside its button." },
        { name: "trailing", type: "ReactNode", description: "Non-interactive content at the end of the title line, inside the row button." },
      ],
      dataAttributes: [
        { name: "data-active", description: "Present when active." },
        { name: "data-running", description: "Present while running." },
      ],
    },
  ],
} satisfies ComponentDoc
