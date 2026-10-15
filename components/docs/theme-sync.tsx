"use client"

import * as React from "react"

import { customAccentStyle, DEFAULT_ACCENT } from "./accent-color"
import { readAccentState, readCustomStyle, syncCustomStyle } from "./accent-store"
import { applyRadius, readRadiusState } from "./radius-store"
import { ACCENT_KEY, CUSTOM_ACCENT_KEY, CUSTOM_RADIUS_KEY, RADIUS_KEY, THEME_KEY } from "./theme-script"

/**
 * Theme state carried on <html>: the `dark` class, `color-scheme` and `data-accent`,
 * plus the custom accent's <style> text when `data-accent` is "custom", and `data-radius` with
 * the inline `--radius` a custom radius sets.
 */
export type RootTheme = { dark: boolean; accent: string | null; custom?: string | null; radius?: string | null; radiusValue?: string | null }

export const readRootTheme = (root: HTMLElement): RootTheme => {
  const accent = root.getAttribute("data-accent")
  return {
    dark: root.classList.contains("dark"),
    accent,
    custom: accent === "custom" ? readCustomStyle(root.ownerDocument) : null,
    radius: root.getAttribute("data-radius"),
    radiusValue: root.style.getPropertyValue("--radius") || null,
  }
}

/**
 * Apply theme state to a document's <html> with transitions muted for the swap,
 * so an embedded or background page snaps to the new colours instead of easing.
 */
export function applyRootTheme(doc: Document, { dark, accent, custom = null, radius = null, radiusValue = null }: RootTheme) {
  const root = doc.documentElement
  // Radius needs no transition muting (nothing animates border-radius on a swap).
  if (root.getAttribute("data-radius") !== radius || (root.style.getPropertyValue("--radius") || null) !== radiusValue) applyRadius(root, radius, radiusValue)
  // The custom accent's colours live in a <style>, so they can change while data-accent stays "custom".
  const styleChanged = syncCustomStyle(doc, accent === "custom" ? custom : null)
  if (!styleChanged && root.classList.contains("dark") === dark && root.getAttribute("data-accent") === accent) return
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
  try {
    mode = localStorage.getItem(THEME_KEY)
  } catch {
    // storage can be unavailable (private mode, sandboxed iframes)
  }
  const m = mode ?? "system"
  const dark = m === "dark" || (m === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
  const { accent, custom } = readAccentState()
  const r = readRadiusState()
  const radius = r.radius === "custom" && r.custom != null ? { radius: "custom", radiusValue: `${r.custom}rem` } : { radius: r.radius === "default" ? null : r.radius, radiusValue: null }
  if (accent === "custom" && custom) return { dark, accent, custom: customAccentStyle(custom), ...radius }
  return { dark, accent: accent === DEFAULT_ACCENT ? null : accent, ...radius }
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
      if (e.key === null || e.key === THEME_KEY || e.key === ACCENT_KEY || e.key === CUSTOM_ACCENT_KEY || e.key === RADIUS_KEY || e.key === CUSTOM_RADIUS_KEY) sync()
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
