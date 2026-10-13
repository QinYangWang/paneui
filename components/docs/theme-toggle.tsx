"use client"

import * as React from "react"

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"
import { cn } from "@/lib/utils"

type Mode = "light" | "system" | "dark"
const KEY = "theme"
/** Same event the registry ThemeToggle fires after it changes the theme. */
const EVENT = "theme-change"
const isMode = (v: unknown): v is Mode => v === "light" || v === "system" || v === "dark"

/** Runs before paint (inlined in <head>) so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var m=localStorage.getItem("${KEY}")||"system";var d=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(_){}})()`

function apply(mode: Mode) {
  const dark = mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
  const root = document.documentElement
  // Suppress transitions for the swap so every surface flips in the same frame.
  root.classList.add("[&_*]:!transition-none")
  root.classList.toggle("dark", dark)
  root.style.colorScheme = dark ? "dark" : "light"
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("[&_*]:!transition-none")))
}

const options: { mode: Mode; label: string; icon: typeof SunIcon }[] = [
  { mode: "light", label: "Light", icon: SunIcon },
  { mode: "system", label: "System", icon: MonitorIcon },
  { mode: "dark", label: "Dark", icon: MoonIcon },
]

export function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = React.useState<Mode | null>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem(KEY)
    setMode(isMode(stored) ? stored : "system")
    // Another toggle on this page (e.g. the registry ThemeToggle in a demo) changed the theme.
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<{ theme?: unknown; storageKey?: string }>).detail
      if (detail?.storageKey && detail.storageKey !== KEY) return
      if (isMode(detail?.theme)) setMode(detail.theme)
    }
    // Another tab changed the stored theme.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return
      const m = isMode(e.newValue) ? e.newValue : "system"
      setMode(m)
      apply(m)
    }
    window.addEventListener(EVENT, onThemeChange)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener(EVENT, onThemeChange)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  React.useEffect(() => {
    if (mode !== "system") return
    const mq = matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => apply("system")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [mode])

  const choose = (m: Mode) => {
    setMode(m)
    try {
      localStorage.setItem(KEY, m)
    } catch {
      // storage can be unavailable (private mode, sandboxed iframes)
    }
    apply(m)
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { theme: m, storageKey: KEY } }))
  }

  const index = Math.max(0, options.findIndex((o) => o.mode === mode))

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn("relative z-0 inline-flex items-center gap-0.5 rounded-full bg-muted/70 p-0.5 shadow-well", className)}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 left-0.5 -z-10 size-7 rounded-full bg-secondary bg-linear-to-b from-white/6 to-transparent shadow-raised transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          mode === null && "opacity-0"
        )}
        style={{ translate: `${index * 1.875}rem 0` }}
      />
      {options.map(({ mode: m, label, icon: Icon }) => (
        <Tooltip key={m}>
          <TooltipTrigger
            render={
              <button
                type="button"
                role="radio"
                aria-checked={mode === m}
                aria-label={label}
                onClick={() => choose(m)}
                className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring aria-checked:text-foreground"
              />
            }
          >
            <Icon size={15} />
          </TooltipTrigger>
          <TooltipContent side="bottom">{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
