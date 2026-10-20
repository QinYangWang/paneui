"use client"

import * as React from "react"

/**
 * iOS and iPadOS Safari zoom into a focused field whose text is under 16px. While a text field has
 * focus this adds `maximum-scale=1` to the viewport meta, which stops that zoom, and puts the exact
 * original content back when focus leaves text entry. Pinch zoom is untouched the rest of the time.
 * Opt-in: nothing in the library mounts it.
 */

type IosZoomLockDevices = "ios" | "touch"

type IosZoomLockOptions = {
  /** Turn the lock off without unmounting, e.g. only while a chat or sheet is open. */
  enabled?: boolean
  /** `ios` (default): iPhone, iPad and iPod, including iPadOS with a desktop user agent. `touch`: those plus any coarse pointer. */
  devices?: IosZoomLockDevices
}

const NON_TEXT_TYPES = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
])

/** True on iPhone, iPad and iPod, including iPadOS reporting itself as a Mac. Call it in an effect, never during render. */
function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) return true
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1
}

function matchesDevices(devices: IosZoomLockDevices): boolean {
  if (isIosDevice()) return true
  if (devices !== "touch" || typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(pointer: coarse)").matches
}

function isTextEntry(node: EventTarget | null): boolean {
  if (!(node instanceof HTMLElement)) return false
  if (node.isContentEditable) return true
  if (node instanceof HTMLTextAreaElement || node instanceof HTMLSelectElement) return true
  if (node instanceof HTMLInputElement) return !NON_TEXT_TYPES.has(node.type)
  return false
}

/** Viewport content with `maximum-scale=1`, keeping every other directive in its place. */
function withMaximumScale(content: string): string {
  const parts = content
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter((part) => part && !/^maximum-scale\s*=/i.test(part))
  return [...parts, "maximum-scale=1"].join(", ")
}

/*
 * One controller per document, shared by every mounted hook, so two locks never undo each other.
 * `saved` is what the meta looked like before the lock: its element, its exact content and whether
 * the lock created it.
 */
let users = 0
let saved: { meta: HTMLMetaElement; content: string | null; created: boolean } | null = null
let pendingCheck: ReturnType<typeof setTimeout> | null = null

function lock() {
  if (saved) return
  let meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')
  if (meta) {
    saved = { meta, content: meta.getAttribute("content"), created: false }
    meta.setAttribute("content", withMaximumScale(saved.content ?? ""))
  } else {
    meta = document.createElement("meta")
    meta.name = "viewport"
    meta.setAttribute("content", "maximum-scale=1")
    document.head.appendChild(meta)
    saved = { meta, content: null, created: true }
  }
}

function unlock() {
  if (pendingCheck !== null) {
    clearTimeout(pendingCheck)
    pendingCheck = null
  }
  if (!saved) return
  const { meta, content, created } = saved
  saved = null
  if (created) meta.remove()
  else if (content === null) meta.removeAttribute("content")
  else meta.setAttribute("content", content)
}

/* Restore once focus has settled outside text entry; a move from one field to the next keeps the lock. */
function scheduleCheck() {
  if (pendingCheck !== null) clearTimeout(pendingCheck)
  pendingCheck = setTimeout(() => {
    pendingCheck = null
    if (!isTextEntry(document.activeElement)) unlock()
  }, 0)
}

function onFocusIn(event: FocusEvent) {
  if (!isTextEntry(event.target)) return
  if (pendingCheck !== null) {
    clearTimeout(pendingCheck)
    pendingCheck = null
  }
  lock()
}

function onFocusOut(event: FocusEvent) {
  if (!saved || !isTextEntry(event.target)) return
  if (isTextEntry(event.relatedTarget)) return
  scheduleCheck()
}

/* A field removed while focused fires no focusout; the next touch catches it before a pinch starts. */
function onTouchStart() {
  if (saved) scheduleCheck()
}

function acquire(): () => void {
  users += 1
  if (users === 1) {
    document.addEventListener("focusin", onFocusIn, true)
    document.addEventListener("focusout", onFocusOut, true)
    document.addEventListener("touchstart", onTouchStart, { capture: true, passive: true })
    /* Mounted while a field already has focus: lock now so the next zoom is stopped too. */
    if (isTextEntry(document.activeElement)) lock()
  }
  let released = false
  return () => {
    if (released) return
    released = true
    users -= 1
    if (users > 0) return
    document.removeEventListener("focusin", onFocusIn, true)
    document.removeEventListener("focusout", onFocusOut, true)
    document.removeEventListener("touchstart", onTouchStart, { capture: true })
    unlock()
  }
}

/** Stops the focus zoom on iOS while a text field has focus. Does nothing on the server or on other devices. */
function useIosInputZoomLock({ enabled = true, devices = "ios" }: IosZoomLockOptions = {}) {
  React.useEffect(() => {
    if (!enabled || !matchesDevices(devices)) return
    return acquire()
  }, [enabled, devices])
}

/** Mount once (in a layout, a form or a sheet) to run `useIosInputZoomLock`. Renders nothing. */
function IosZoomLock(props: IosZoomLockOptions) {
  useIosInputZoomLock(props)
  return null
}

export { IosZoomLock, isIosDevice, useIosInputZoomLock, withMaximumScale }
export type { IosZoomLockDevices, IosZoomLockOptions }
