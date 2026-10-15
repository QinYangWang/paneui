"use client"

import * as React from "react"

import {
  createLocalShell,
  createWebSocketTransport,
  type ShellCommand,
  type TerminalTransport,
} from "@/registry/base-nova/ui/terminal"

import type { VsCodeHost } from "./host"
import { normalize, rel, ROOT, USER, type Workspace } from "./workspace"

export type TerminalSession = { id: string; title: string; transport: TerminalTransport; remote: boolean }

/** Runs `input` once the first view attaches (after the shell has drawn its prompt). */
function withStartup(t: TerminalTransport, input: string | null): TerminalTransport {
  let sent = !input
  return {
    write: (d) => t.write(d),
    onData(cb) {
      const off = t.onData(cb)
      if (!sent) {
        sent = true
        setTimeout(() => t.write(input!), 0)
      }
      return off
    },
    resize: t.resize ? (c, r) => t.resize!(c, r) : undefined,
    dispose: () => t.dispose?.(),
  }
}

const quote = (s: string) => (/^[\w./~-]+$/.test(s) ? s : `'${s.replace(/'/g, `'\\''`)}'`)

/**
 * Terminal sessions in groups: each group is one tab in the list and shows
 * its terminals side by side (a split). Local sessions run the browser shell
 * on the shared workspace; with a PTY address every new session connects to
 * a real shell instead, and a host's terminal (a desktop shell) wins over both.
 */
export function useTerminals({
  ws,
  ptyUrl,
  host,
  onOpenFile,
}: {
  ws: Workspace
  ptyUrl: string | null
  host?: VsCodeHost
  onOpenFile: (path: string) => void
}) {
  const [sessions, setSessions] = React.useState<TerminalSession[]>([])
  const [groups, setGroups] = React.useState<string[][]>([])
  const [active, setActive] = React.useState<string | null>(null)
  const counter = React.useRef(0)
  const openRef = React.useRef(onOpenFile)
  openRef.current = onOpenFile

  const commands = React.useMemo<Record<string, ShellCommand>>(
    () => ({
      // `code <file…>` opens files in the editor, creating missing ones.
      code: ({ args, cwd, fs, print }) => {
        if (!args.length) {
          print("usage: code <file>…\n")
          return 2
        }
        for (const a of args) {
          const p = normalize(a.startsWith("/") ? a : `${cwd}/${a}`)
          if (fs.isDir(p)) {
            print(`code: ${a}: is a folder\n`)
            continue
          }
          if (!fs.exists(p)) fs.writeFile(p, "")
          openRef.current(p)
        }
        return 0
      },
    }),
    []
  )

  const make = React.useCallback(
    (cwd?: string): TerminalSession => {
      const n = ++counter.current
      if (host?.terminal) {
        const dir = cwd && cwd.startsWith(ROOT) ? rel(cwd) : ""
        const transport = host.terminal({ cwd: ws.mounted ? dir : null, folder: ws.mounted })
        return { id: `term-${n}-${Date.now().toString(36)}`, title: `${host.shellName ?? "shell"} ${n}`, transport, remote: true }
      }
      const remote = !!ptyUrl
      const base = remote ? createWebSocketTransport(ptyUrl!) : createLocalShell({ fs: ws, cwd: ROOT, user: USER, host: "workspace", commands })
      const startup = cwd && cwd !== ROOT ? `cd ${quote(cwd)}\r` : null
      return { id: `term-${n}-${Date.now().toString(36)}`, title: remote ? `bash ${n}` : `sh ${n}`, transport: withStartup(base, startup), remote }
    },
    [ws, ptyUrl, host, commands]
  )

  const create = React.useCallback(
    (cwd?: string) => {
      const s = make(cwd)
      setSessions((list) => [...list, s])
      setGroups((g) => [...g, [s.id]])
      setActive(s.id)
      return s.id
    },
    [make]
  )

  /** Add a terminal next to the active one (up to three side by side). */
  const split = React.useCallback(() => {
    const group = groups.find((g) => active && g.includes(active))
    if (!group) return create()
    if (group.length >= 3) return active
    const s = make()
    setSessions((list) => [...list, s])
    setGroups((gs) => gs.map((g) => (g === group ? [...g, s.id] : g)))
    setActive(s.id)
    return s.id
  }, [groups, active, create, make])

  const kill = React.useCallback(
    (id: string) => {
      const s = sessions.find((x) => x.id === id)
      s?.transport.dispose?.()
      const nextGroups = groups.map((g) => g.filter((x) => x !== id)).filter((g) => g.length)
      setSessions((list) => list.filter((x) => x.id !== id))
      setGroups(nextGroups)
      if (active === id) {
        const flat = nextGroups.flat()
        const old = groups.flat().indexOf(id)
        setActive(flat[Math.min(old, flat.length - 1)] ?? null)
      }
    },
    [sessions, groups, active]
  )

  const rename = React.useCallback((id: string, title: string) => {
    setSessions((list) => list.map((s) => (s.id === id && s.title !== title ? { ...s, title } : s)))
  }, [])

  // Dispose every session when the app unmounts.
  const live = React.useRef(sessions)
  live.current = sessions
  React.useEffect(() => () => live.current.forEach((s) => s.transport.dispose?.()), [])

  const activeGroup = groups.find((g) => active && g.includes(active)) ?? groups[0] ?? []
  return { sessions, groups, active, activeGroup, setActive, create, split, kill, rename }
}

export type Terminals = ReturnType<typeof useTerminals>
