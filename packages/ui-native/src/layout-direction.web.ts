/// <reference lib="dom" />
import { useSyncExternalStore } from "react"

function subscribe(listener: () => void) {
  const observer = new MutationObserver(listener)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir", "style", "class"] })
  return () => observer.disconnect()
}

export function useLayoutDirection() {
  return useSyncExternalStore(subscribe, () => getComputedStyle(document.documentElement).direction === "rtl", () => false)
}
