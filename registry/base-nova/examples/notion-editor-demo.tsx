"use client"

import { NotionEditor } from "@/registry/base-nova/blocks/notion-editor/notion-editor"

const welcome = `# Project notes

Type **/** for blocks, select text for the format bar, and drag the grip on the left to reorder. Markdown shortcuts work too: \`#\`, \`-\`, \`[]\` and \`>\`.

<Callout type="info" icon="💡">
  Import an \`.mdx\` file from the toolbar, or export this page as MDX.
</Callout>

## This week

- [x] Ship the editor
- [ ] Write the docs page
- [ ] Record a demo

<details>
  <summary>Release checklist</summary>

  Bump the version, regenerate the registry and publish.
</details>

\`\`\`ts
export function greet(name: string) {
  return \`Hello, \${name}\`
}
\`\`\`

| Block   | Shortcut |
| ------- | -------- |
| Heading | \`#\`      |
| To-do   | \`[]\`     |
`

export default function NotionEditorDemo() {
  return <NotionEditor toolbar defaultValue={welcome} fileName="project-notes.mdx" className="h-140 w-full max-w-3xl" />
}
