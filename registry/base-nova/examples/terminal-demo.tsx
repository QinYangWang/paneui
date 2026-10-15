"use client"

import * as React from "react"

import { Terminal, createLocalShell, createMemoryFs } from "@/registry/base-nova/ui/terminal"

const SEED = {
  "README.md": "# notes-app\n\nA tiny app to try the shell on.\n\nRun `help` to see the commands.\n",
  "package.json": '{\n  "name": "notes-app",\n  "version": "0.1.0",\n  "scripts": { "dev": "vite" }\n}\n',
  "src/index.ts": 'import { greet } from "./greet"\n\nconsole.log(greet("world"))\n',
  "src/greet.ts": "export function greet(name: string) {\n  return `Hello, ${name}!`\n}\n",
  "notes/todo.txt": "ship the terminal\nwrite docs\nfix the flaky test\nreview the layout\n",
}

export default function TerminalDemo() {
  const [shell] = React.useState(() => createLocalShell({ fs: createMemoryFs(SEED), user: "you", host: "notes-app" }))
  const [title, setTitle] = React.useState("")
  return (
    <div className="flex h-80 w-full max-w-xl flex-col overflow-hidden rounded-xl bg-background shadow-raised">
      <div className="flex h-8 shrink-0 items-center justify-center border-b border-border px-3">
        <span className="truncate text-ui-xs text-muted-foreground">{title || "Terminal"}</span>
      </div>
      <Terminal transport={shell} onTitleChange={setTitle} className="min-h-0 flex-1" />
    </div>
  )
}
