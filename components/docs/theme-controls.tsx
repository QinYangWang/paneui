"use client"

import * as React from "react"

import { ChevronDownIcon, MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import { Menu, MenuContent, MenuGroup, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { THEME_CHANGE_EVENT, ThemeToggle, useThemeToggle, type ThemeChangeDetail } from "@/registry/base-nova/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

import { ACCENT_KEY, ACCENTS, THEME_KEY, type Accent } from "./theme-script"

type Mode = "light" | "dark" | "system"
const isMode = (v: unknown): v is Mode => v === "light" || v === "dark" || v === "system"
const systemDark = () => matchMedia("(prefers-color-scheme: dark)").matches

function store(mode: Mode) {
  try {
    localStorage.setItem(THEME_KEY, mode)
  } catch {
    // storage can be unavailable (private mode, sandboxed iframes)
  }
}

/** Instant swap (no reveal) for changes the user did not click: OS theme flips, other tabs. */
function applyInstant(dark: boolean) {
  const root = document.documentElement
  if (root.classList.contains("dark") === dark) return
  const mute = document.createElement("style")
  mute.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(mute)
  root.classList.toggle("dark", dark)
  root.style.colorScheme = dark ? "dark" : "light"
  void window.getComputedStyle(root).opacity
  requestAnimationFrame(() => requestAnimationFrame(() => mute.remove()))
}

const isAccent = (v: unknown): v is Accent => typeof v === "string" && (ACCENTS as readonly string[]).includes(v)

/** Menu swatches: each preset's light primary (neutral follows the current foreground). Mirrors app/globals.css. */
const accentOptions: { accent: Accent; label: string; swatch: string }[] = [
  { accent: "neutral", label: "Neutral", swatch: "var(--foreground)" },
  { accent: "blue", label: "Blue", swatch: "oklch(0.57 0.15 258)" },
  { accent: "green", label: "Green", swatch: "oklch(0.56 0.13 155)" },
  { accent: "orange", label: "Orange", swatch: "oklch(0.62 0.17 45)" },
  { accent: "rose", label: "Rose", swatch: "oklch(0.58 0.19 12)" },
  { accent: "violet", label: "Violet", swatch: "oklch(0.55 0.18 290)" },
]

function applyAccent(accent: Accent) {
  const root = document.documentElement
  if (accent === "neutral") root.removeAttribute("data-accent")
  else root.setAttribute("data-accent", accent)
}

/**
 * Accent picker: swaps `data-accent` on <html> (presets live in app/globals.css),
 * persists localStorage["accent"] for the pre-paint script and syncs other tabs.
 */
export function AccentControl() {
  const [accent, setAccent] = React.useState<Accent>("neutral")

  React.useEffect(() => {
    const stored = localStorage.getItem(ACCENT_KEY)
    setAccent(isAccent(stored) ? stored : "neutral")
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ACCENT_KEY) return
      const next = isAccent(e.newValue) ? e.newValue : "neutral"
      setAccent(next)
      applyAccent(next)
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const choose = (next: Accent) => {
    setAccent(next)
    applyAccent(next)
    try {
      localStorage.setItem(ACCENT_KEY, next)
    } catch {
      // storage can be unavailable (private mode, sandboxed iframes)
    }
  }

  const label = accentOptions.find((o) => o.accent === accent)?.label ?? "Neutral"

  return (
    <Menu>
      <Tooltip>
        <TooltipTrigger
          render={
            <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Accent colour: ${label}`} />} />
          }
        >
          <span aria-hidden className="size-3.5 rounded-full bg-primary shadow-chip" />
        </TooltipTrigger>
        <TooltipContent side="bottom">Accent: {label}</TooltipContent>
      </Tooltip>
      <MenuContent align="end" className="min-w-40">
        <MenuGroup>
          <MenuLabel>Accent</MenuLabel>
          <MenuRadioGroup value={accent} onValueChange={(v) => isAccent(v) && choose(v)}>
            {accentOptions.map(({ accent: a, label: l, swatch }) => (
              <MenuRadioItem key={a} value={a} closeOnClick>
                <span
                  aria-hidden
                  className="size-3.5 shrink-0 rounded-full bg-(--swatch) shadow-chip"
                  style={{ "--swatch": swatch } as React.CSSProperties}
                />
                {l}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  )
}

const options: { mode: Mode; label: string; icon: typeof SunIcon }[] = [
  { mode: "light", label: "Light", icon: SunIcon },
  { mode: "dark", label: "Dark", icon: MoonIcon },
  { mode: "system", label: "System", icon: MonitorIcon },
]

/**
 * The registry ThemeToggle (circular View Transition reveal) plus a small menu
 * that adds the third "System" mode. Everything shares localStorage["theme"]
 * with the pre-paint script in <head>.
 */
export function ThemeControls({ className }: { className?: string }) {
  const [mode, setMode] = React.useState<Mode | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  // Set while a "System" choice is animating; the toggle hook writes light/dark, we restore "system" after.
  const pendingSystem = React.useRef(false)

  const { setTheme } = useThemeToggle({
    storageKey: THEME_KEY,
    onThemeChange: () => {
      if (!pendingSystem.current) return
      pendingSystem.current = false
      store("system")
      setMode("system")
    },
  })

  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY)
    setMode(isMode(stored) ? stored : "system")
    // ThemeToggle (header or a demo) changed the theme: that is an explicit light/dark pick.
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<ThemeChangeDetail>).detail
      if (detail?.storageKey && detail.storageKey !== THEME_KEY) return
      if (isMode(detail?.theme)) setMode(detail.theme)
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return
      const m = isMode(e.newValue) ? e.newValue : "system"
      setMode(m)
      applyInstant(m === "dark" || (m === "system" && systemDark()))
    }
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange)
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  React.useEffect(() => {
    if (mode !== "system") return
    const mq = matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => applyInstant(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [mode])

  const choose = (next: Mode) => {
    const rect = triggerRef.current?.getBoundingClientRect()
    const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
    const dark = next === "dark" || (next === "system" && systemDark())
    const current = document.documentElement.classList.contains("dark")
    pendingSystem.current = false
    if (dark === current) {
      // nothing to repaint, only the stored preference changes
      store(next)
      setMode(next)
      return
    }
    if (next === "system") pendingSystem.current = true
    else setMode(next)
    setTheme(dark ? "dark" : "light", { origin })
  }

  const ActiveIcon = options.find((o) => o.mode === mode)?.icon ?? MonitorIcon

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <AccentControl />
      <ThemeToggle storageKey={THEME_KEY} />
      <Menu>
        <Tooltip>
          <TooltipTrigger
            render={
              <MenuTrigger
                ref={triggerRef}
                // eslint-disable-next-line shadcn/no-restyle -- compact 28px-wide trigger beside the GitHub icon (existing header design)
                render={<Button variant="ghost" size="icon-sm" aria-label="Theme options" className="w-7 text-muted-foreground" />}
              />
            }
          >
            <ChevronDownIcon className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <ActiveIcon size={13} />
            Theme: {options.find((o) => o.mode === mode)?.label ?? "System"}
          </TooltipContent>
        </Tooltip>
        <MenuContent align="end" className="min-w-40">
          <MenuGroup>
            <MenuLabel>Theme</MenuLabel>
            <MenuRadioGroup value={mode ?? "system"} onValueChange={(v) => isMode(v) && choose(v)}>
              {options.map(({ mode: m, label, icon: Icon }) => (
                <MenuRadioItem key={m} value={m} closeOnClick>
                  <Icon />
                  {label}
                </MenuRadioItem>
              ))}
            </MenuRadioGroup>
          </MenuGroup>
        </MenuContent>
      </Menu>
    </div>
  )
}
