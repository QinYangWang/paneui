"use client"

import { NotionEditor } from "@/registry/base-nova/blocks/notion-editor/notion-editor"

const doc = `## Release notes

<Callout type="success" icon="✅">
  Version 2.4 is live for everyone.
</Callout>

- Faster cold starts
- A new **email editor** block
- Fixed the toggle chevron in dark mode
`

export default function NotionEditorReadOnly() {
  return <NotionEditor readOnly defaultValue={doc} className="w-full max-w-2xl" contentClassName="py-6" />
}
