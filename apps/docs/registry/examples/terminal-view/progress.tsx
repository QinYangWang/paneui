"use client"

import * as React from "react"

import { Terminal, TerminalOutput } from "@paneui/ui/components/terminal-view"

const E = "\u001b["

/** Carriage returns rewrite the current line, so a progress bar settles in place. */
export default function TerminalViewProgress() {
  const [n, setN] = React.useState(0)
  React.useEffect(() => {
    const id = window.setInterval(() => setN((x) => (x >= 20 ? 0 : x + 1)), 180)
    return () => window.clearInterval(id)
  }, [])
  let text = `${E}2m$ pnpm install${E}0m\n`
  for (let i = 0; i <= n; i++) text += `\rProgress ${E}36m${"█".repeat(i)}${E}2m${"░".repeat(20 - i)}${E}0m ${i * 5}%`
  if (n === 20) text += `\n${E}32mDone${E}0m in 3.6s\n`
  return (
    <div className="h-40 w-full max-w-md overflow-hidden rounded-xl shadow-raised">
      <Terminal className="h-full">
        <TerminalOutput text={text} />
      </Terminal>
    </div>
  )
}
