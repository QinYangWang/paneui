"use client"

import * as React from "react"

import { Terminal, createLocalShell, createMemoryFs, type ShellCommand } from "@paneui/ui/components/terminal"

const E = "\u001b["
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

const deploy: ShellCommand = async ({ args, print }) => {
  const env = args[0] ?? "preview"
  for (const step of ["Building", "Uploading", "Routing traffic"]) {
    print(`${E}2m…${E}22m ${step}\n`)
    await wait(400)
  }
  print(`${E}32m✓${E}0m Deployed to ${E}1m${env}${E}22m\n`)
  return 0
}

const fortune: ShellCommand = ({ print }) => {
  const lines = ["Ship small, ship often.", "Read the error message twice.", "The cache was the problem."]
  print(lines[Math.floor(Math.random() * lines.length)] + "\n")
  return 0
}

export default function TerminalCustomCommands() {
  const [shell] = React.useState(() =>
    createLocalShell({ fs: createMemoryFs({ "app/index.html": "<h1>Hi</h1>\n" }), user: "you", host: "app", commands: { deploy, fortune } })
  )
  return (
    <div className="h-64 w-full max-w-xl overflow-hidden rounded-xl shadow-raised">
      <Terminal transport={shell} className="h-full" />
    </div>
  )
}
