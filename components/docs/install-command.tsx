"use client"

import { useT } from "@/lib/site-locale"
import { siteCopy } from "@/lib/site-copy"

import * as React from "react"

import { CheckIcon, CopyIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ActionSwapBlurButton, type ActionSwapItem } from "@/registry/base-nova/ui/action-swap-blur"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"
import cliPackage from "@/packages/cli/package.json"

const MANAGERS = {
  pnpm: "pnpm dlx shadcn@latest",
  npm: "npx shadcn@latest",
  yarn: "yarn dlx shadcn@latest",
  bun: "bunx --bun shadcn@latest",
} as const
type Manager = keyof typeof MANAGERS

/** The library's own CLI (packages/cli); its npm name is the one field to change when it is renamed. */
export const CLI_NAME = cliPackage.name
const RUNNERS = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx",
} as const satisfies Record<Manager, string>
const PM_KEY = "package-manager"
const isManager = (v: unknown): v is Manager => typeof v === "string" && v in MANAGERS

/* One package-manager choice shared by every command block on the page (and remembered). */
const listeners = new Set<() => void>()
let current: Manager = "pnpm"
function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
function setManager(pm: Manager) {
  current = pm
  try {
    localStorage.setItem(PM_KEY, pm)
  } catch {}
  listeners.forEach((fn) => fn())
}
function usePackageManager() {
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(PM_KEY)
      if (isManager(stored) && stored !== current) setManager(stored)
    } catch {}
  }, [])
  return React.useSyncExternalStore(
    subscribe,
    () => current,
    () => "pnpm" as Manager,
  )
}

const COPY_ITEMS = [
  {
    value: "copy",
    label: "Copy",
    icon: <CopyIcon />,
    ariaLabel: "Copy command",
  },
  {
    value: "copied",
    label: "Copied",
    icon: <CheckIcon className="text-success" />,
    ariaLabel: "Copied",
  },
] satisfies ActionSwapItem[]

/** A raised pill holding one shell command, with a blur-swap copy button. */
export function CommandPill({ command, className }: { command: string; className?: string }) {
  const t = useT()
  const items = React.useMemo(() => COPY_ITEMS.map((item) => ({ ...item, label: t(siteCopy(item.label)), ariaLabel: t(siteCopy(item.ariaLabel ?? "Copy command")) })), [t])
  const [state, setState] = React.useState("copy")
  return (
    <div
      data-slot="command-pill"
      className={cn(
        "flex h-10 min-w-0 items-center gap-2 rounded-xl bg-card ps-3 pe-1 font-mono text-ui text-card-foreground shadow-raised",
        className,
      )}
    >
      <span aria-hidden className="text-muted-foreground select-none">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap scrollbar-none">{command}</code>
      <ActionSwapBlurButton
        items={items}
        value={state}
        onValueChange={setState}
        cycle={false}
        resetAfter={1600}
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command)
            setState("copied")
          } catch {
            // clipboard blocked: leave the button as is
          }
        }}
      />
    </div>
  )
}

/**
 * CLI command with pnpm / npm / yarn / bun tabs. `args` is everything after the CLI, e.g. "add @x/button".
 * `cli="paneui"` runs the library's own CLI instead of shadcn.
 */
export function InstallCommand({ args, cli = "shadcn", className }: { args: string; cli?: "shadcn" | "paneui"; className?: string }) {
  const pm = usePackageManager()
  const runner = (m: Manager) => (cli === "shadcn" ? MANAGERS[m] : `${RUNNERS[m]} ${CLI_NAME}@latest`)
  return (
    <Tabs value={pm} onValueChange={(v) => isManager(v) && setManager(v)} className={cn("gap-2.5", className)}>
      <TabsList className="p-0.5">
        {(Object.keys(MANAGERS) as Manager[]).map((m) => (
          // eslint-disable-next-line shadcn/no-restyle -- compact mono package-manager tabs; Tabs has no size prop yet
          <TabsTab key={m} value={m} className="h-6 px-3 font-mono text-xs">
            {m}
          </TabsTab>
        ))}
      </TabsList>
      {(Object.keys(MANAGERS) as Manager[]).map((m) => (
        <TabsPanel key={m} value={m}>
          <CommandPill command={`${runner(m)} ${args}`} />
        </TabsPanel>
      ))}
    </Tabs>
  )
}

const ADD = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
} as const satisfies Record<Manager, string>

/** `pnpm add <packages>` with the same remembered package-manager tabs. */
export function PackageInstall({ packages, className }: { packages: string[]; className?: string }) {
  const pm = usePackageManager()
  return (
    <Tabs value={pm} onValueChange={(v) => isManager(v) && setManager(v)} className={cn("gap-2.5", className)}>
      <TabsList className="p-0.5">
        {(Object.keys(ADD) as Manager[]).map((m) => (
          // eslint-disable-next-line shadcn/no-restyle -- compact mono package-manager tabs; Tabs has no size prop yet
          <TabsTab key={m} value={m} className="h-6 px-3 font-mono text-xs">
            {m}
          </TabsTab>
        ))}
      </TabsList>
      {(Object.keys(ADD) as Manager[]).map((m) => (
        <TabsPanel key={m} value={m}>
          <CommandPill command={`${ADD[m]} ${packages.join(" ")}`} />
        </TabsPanel>
      ))}
    </Tabs>
  )
}
