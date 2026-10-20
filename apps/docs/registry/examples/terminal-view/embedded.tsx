import { Terminal, TerminalOutput } from "@paneui/ui/components/terminal-view"

const E = "\u001b["

export default function TerminalViewEmbedded() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <span className="text-ui text-muted-foreground">Run bun run lint</span>
      <Terminal variant="embedded">
        <TerminalOutput text={`Checked 1,284 files in 2.1s\n${E}32m✓${E}0m No lint errors\n${E}33m!${E}0m 2 warnings (unused imports)\n`} className="max-h-32" />
      </Terminal>
    </div>
  )
}
