"use client"

import * as React from "react"

import { ACCENT_KEY, ACCENTS, THEME_KEY } from "./theme-script"

/** Theme state carried on <html>: the `dark` class, `color-scheme` and `data-accent`. */
export type RootTheme = { dark: boolean; accent: string | null }

export const readRootTheme = (root: HTMLElement): RootTheme => ({
  dark: root.classList.contains("dark"),
  accent: root.getAttribute("data-accent"),
})

/**
 * Apply theme state to a document's <html> with transitions muted for the swap,
 * so an embedded or background page snaps to the new colours instead of easing.
 */
export function applyRootTheme(doc: Document, { dark, accent }: RootTheme) {
  const root = doc.documentElement
  if (root.classList.contains("dark") === dark && root.getAttribute("data-accent") === accent) return
  const mute = doc.createElement("style")
  mute.textContent = "*,*::before,*::after{transition:none!important}"
  doc.head.appendChild(mute)
  root.classList.toggle("dark", dark)
  root.style.colorScheme = dark ? "dark" : "light"
  if (accent) root.setAttribute("data-accent", accent)
  else root.removeAttribute("data-accent")
  const win = doc.defaultView
  if (!win) return mute.remove()
  void win.getComputedStyle(root).opacity
  win.requestAnimationFrame(() => win.requestAnimationFrame(() => mute.remove()))
}

/** Theme state as stored in localStorage (what the pre-paint script reads). */
function readStoredTheme(): RootTheme {
  let mode: string | null = null
  let accent: string | null = null
  try {
    mode = localStorage.getItem(THEME_KEY)
    accent = localStorage.getItem(ACCENT_KEY)
  } catch {
    // storage can be unavailable (private mode, sandboxed iframes)
  }
  const m = mode ?? "system"
  const dark = m === "dark" || (m === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
  const valid = accent && accent !== "neutral" && (ACCENTS as readonly string[]).includes(accent)
  return { dark, accent: valid ? accent : null }
}

/**
 * Keeps a chrome-less page (the /templates/* routes) in step with theme and
 * accent changes made elsewhere: another tab, or the docs page embedding it,
 * via `storage` events, plus OS theme flips while in "system" mode.
 */
export function ThemeSync() {
  React.useEffect(() => {
    const sync = () => applyRootTheme(document, readStoredTheme())
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === THEME_KEY || e.key === ACCENT_KEY) sync()
    }
    const mq = matchMedia("(prefers-color-scheme: dark)")
    window.addEventListener("storage", onStorage)
    mq.addEventListener("change", sync)
    return () => {
      window.removeEventListener("storage", onStorage)
      mq.removeEventListener("change", sync)
    }
  }, [])
  return null
}
