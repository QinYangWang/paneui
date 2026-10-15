"use client"

import * as React from "react"

import { Terminal, createLocalShell, createMemoryFs } from "@/registry/base-nova/ui/terminal"

function listFiles(fs: ReturnType<typeof createMemoryFs>, dir = "/"): string[] {
  return fs.readdir(dir).flatMap((e) => {
    const path = `${dir === "/" ? "" : dir}/${e.name}`
    return e.dir ? listFiles(fs, path) : [path]
  })
}

export default function TerminalSharedFiles() {
  const [fs] = React.useState(() => createMemoryFs({ "src/app.ts": "export {}\n", "notes.md": "- try `touch src/new.ts`\n" }))
  const [shell] = React.useState(() => createLocalShell({ fs, user: "you", host: "web" }))
  const files = React.useSyncExternalStore(
    React.useCallback((cb: () => void) => fs.subscribe?.(cb) ?? (() => {}), [fs]),
    React.useCallback(() => listFiles(fs).join("\n"), [fs]),
    () => ""
  )
  return (
    <div className="flex h-64 w-full max-w-2xl overflow-hidden rounded-xl bg-background shadow-raised">
      <ul className="w-44 shrink-0 overflow-auto border-r border-border p-2 font-mono text-ui-xs text-muted-foreground">
        {files.split("\n").filter(Boolean).map((f) => (
          <li key={f} className="truncate px-1 py-0.5">
            {f.slice(1)}
          </li>
        ))}
      </ul>
      <Terminal transport={shell} className="min-w-0 flex-1" />
    </div>
  )
}
