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
    { id: "pr-states", title: "Pull Request States", description: "The PR number takes its status colour: open success, draft muted, merged purple, closed destructive." },
    { id: "minimal", title: "Minimal", description: "Without `repo`, `pr` or `branch` the row is a single line, for plain chat lists." },
  ],
  notes: [{ title: "Truncation", body: "Title, repo and branch truncate independently; the branch gives way first so the PR number stays readable in a narrow sidebar." }],
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
        { name: "pr", type: `{ number: number; status: "open" | "draft" | "merged" | "closed" }`, description: "Linked pull request." },
        { name: "branch", type: "string", description: "Git branch." },
        { name: "active", type: "boolean", default: "false", description: "Selected row." },
        { name: "running", type: "boolean", default: "false", description: "Replace the icon with a spinner." },
        { name: "unread", type: "boolean", default: "false", description: "Primary dot after the title." },
        { name: "trailing", type: "ReactNode", description: "End of the title line (a time, a menu)." },
      ],
      dataAttributes: [
        { name: "data-active", description: "Present when active." },
        { name: "data-running", description: "Present while running." },
      ],
    },
  ],
} satisfies ComponentDoc
