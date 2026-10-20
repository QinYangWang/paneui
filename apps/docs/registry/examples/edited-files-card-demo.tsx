"use client"

import * as React from "react"

import { EditedFilesCard, type EditedFile } from "@paneui/ui/components/edited-files-card"

const FILES: EditedFile[] = [
  {
    path: "apps/web/src/components/chat/SplitChatSurface.tsx",
    oldText: 'export function SplitChatSurface() {\n  const [ratio, setRatio] = useState(0.5)\n  const guide = useGuide()\n  return <Panes ratio={ratio} guide={guide} />\n}\n',
    newText: 'export function SplitChatSurface() {\n  return <SplitPaneLayout storageKey="split-chat" />\n}\n',
  },
  {
    path: "apps/web/src/components/chat/SplitPaneLayout.tsx",
    oldText: null,
    newText: 'export function SplitPaneLayout({ storageKey }: Props) {\n  const [ratio, setRatio] = usePersistedRatio(storageKey)\n  return <Divider onMove={setRatio} />\n}\n',
  },
  {
    path: "docs/core-concepts.md",
    oldText: "## Split chats\n\nDrag the divider; the blue guide shows where it lands.\n",
    newText: "## Split chats\n\nDrag the divider; both chats follow the pointer.\nThe layout is saved on release.\n",
  },
]

export default function EditedFilesCardDemo() {
  const [undone, setUndone] = React.useState(false)
  return (
    <div className="w-full max-w-xl">
      <EditedFilesCard
        files={FILES}
        title={undone ? "Reverted 3 files" : undefined}
        onUndo={undone ? undefined : () => setUndone(true)}
        onReview={() => setUndone(false)}
        onRevealFile={() => undefined}
      />
    </div>
  )
}
