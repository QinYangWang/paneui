import { FileIcon } from "@paneui/ui/icons"
import { OverflowHint, OverflowHintContent, OverflowHintTrigger } from "@paneui/ui/components/overflow-hint"

const files = [
  "src/app/(workspace)/projects/[projectId]/settings/members/page.tsx",
  "src/components/composer.tsx",
  "src/lib/transport/reconnect-with-backoff.ts",
]

export default function OverflowHintParts() {
  return (
    <ul className="flex w-64 flex-col frame-xl frame-p-1 bg-card text-ui shadow-raised">
      {files.map((path) => (
        <li key={path} className="flex h-7 items-center gap-1.5 rounded-inner px-2 hover:bg-secondary">
          <FileIcon className="size-4 shrink-0 text-muted-foreground" />
          <OverflowHint>
            <OverflowHintTrigger>{path}</OverflowHintTrigger>
            <OverflowHintContent>
              <span className="font-mono">{path}</span>
            </OverflowHintContent>
          </OverflowHint>
        </li>
      ))}
    </ul>
  )
}
