"use client"

import * as React from "react"

/*
 * Minimal next/navigation for the Astro site. Each page island is wrapped in <PathnameProvider>
 * with the path Astro rendered, so usePathname() is identical on the server and in the browser.
 * Paths are returned without the base path and without the trailing slash (like Next).
 */

const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "")

export function stripBase(pathname: string) {
  let p = pathname
  if (BASE && (p === BASE || p.startsWith(`${BASE}/`))) p = p.slice(BASE.length) || "/"
  if (p.length > 1) p = p.replace(/\/+$/, "")
  return p || "/"
}

/** Adds the base path to a root-relative href (`/docs/x` → `/base/docs/x`). */
export function withBase(href: string) {
  if (!BASE || !href.startsWith("/") || href.startsWith("//")) return href
  if (href === BASE || href.startsWith(`${BASE}/`)) return href
  return `${BASE}${href}`
}

const PathnameContext = React.createContext<string | null>(null)

export function PathnameProvider({ pathname, children }: { pathname: string; children: React.ReactNode }) {
  return <PathnameContext.Provider value={stripBase(pathname)}>{children}</PathnameContext.Provider>
}

export function usePathname(): string {
  const ctx = React.useContext(PathnameContext)
  if (ctx != null) return ctx
  return typeof window === "undefined" ? "/" : stripBase(window.location.pathname)
}

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb)
  return () => window.removeEventListener("popstate", cb)
}

export function useSearchParams(): URLSearchParams {
  const search = React.useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => ""
  )
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function useParams<T extends Record<string, string>>(): T {
  return {} as T
}

type NavigateOptions = { scroll?: boolean }

export function useRouter() {
  return React.useMemo(
    () => ({
      push: (href: string, ...[]: [NavigateOptions?]) => window.location.assign(withBase(href)),
      replace: (href: string, ...[]: [NavigateOptions?]) => window.location.replace(withBase(href)),
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      refresh: () => window.location.reload(),
      prefetch: (...[]: [string]) => {},
    }),
    []
  )
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND")
}

export function redirect(href: string): never {
  if (typeof window !== "undefined") window.location.replace(withBase(href))
  throw new Error(`NEXT_REDIRECT ${href}`)
}
