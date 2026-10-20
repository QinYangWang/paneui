"use client"

import * as React from "react"

import { Terminal, TerminalInput, TerminalOutput, TerminalStatusLine } from "@paneui/ui/components/terminal-view"

const E = "\u001b["
const START = `${E}2m$ pnpm vitest run${E}0m
 ${E}32m✓${E}0m src/split-pane.test.ts ${E}2m(12 tests)${E}0m
 ${E}32m✓${E}0m src/chat-surface.test.ts ${E}2m(34 tests)${E}0m
 ${E}31m✗${E}0m src/drag-preview.test.ts ${E}2m(1 failed)${E}0m

 ${E}1mTest Files${E}0m  ${E}31m1 failed${E}0m | ${E}32m2 passed${E}0m
`

export default function TerminalViewDemo() {
  const [text, setText] = React.useState(START)
  return (
    <div className="h-80 w-full max-w-xl overflow-hidden rounded-xl shadow-raised">
      <Terminal className="h-full">
        <TerminalOutput text={text} />
        <TerminalInput
          placeholder="Try: echo hello"
          onSubmit={(cmd) => setText((t) => `${t}${E}2m❯${E}22m ${cmd}\n${cmd.startsWith("echo ") ? cmd.slice(5) : `${E}33mdemo:${E}0m ${cmd.split(" ")[0]}: not available here`}\n`)}
        />
        <TerminalStatusLine text={`${E}34mmain${E}0m  ${E}32m✓ 46${E}0m  ${E}31m✗ 1${E}0m  ${E}2mnode 22${E}0m`} />
      </Terminal>
    </div>
  )
}
