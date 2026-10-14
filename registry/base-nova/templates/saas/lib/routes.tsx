"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

/*
 * Every internal link goes through `useHref`, so the whole template can live
 * under a sub-path (the docs preview mounts it at /templates/saas). In your
 * app there is no <SaasBase>, so hrefs are the plain routes below.
 */

export const routes = {
  home: "/",
  pricing: "/pricing",
  changelog: "/changelog",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  verify: "/verify",
  dashboard: "/dashboard",
  analytics: "/dashboard/analytics",
  customers: "/dashboard/customers",
  settings: "/dashboard/settings",
  settingsAccount: "/dashboard/settings/account",
  settingsBilling: "/dashboard/settings/billing",
  settingsTeam: "/dashboard/settings/team",
  settingsNotifications: "/dashboard/settings/notifications",
  settingsAppearance: "/dashboard/settings/appearance",
} as const

const BaseContext = React.createContext("")

/** Mounts the template under a sub-path. Only the docs preview needs it. */
export function SaasBase({ base, children }: { base: string; children: React.ReactNode }) {
  return <BaseContext.Provider value={base.replace(/\/$/, "")}>{children}</BaseContext.Provider>
}

/** Prefix a route with the mount path. Hash-only links pass through. */
export function useHref() {
  const base = React.useContext(BaseContext)
  return React.useCallback(
    (path: string) => {
      if (!path.startsWith("/")) return path
      if (path === "/") return base ? `${base}/` : "/"
      return `${base}${path}`
    },
    [base]
  )
}

/** The current route with the mount path removed ("/dashboard/customers"). */
export function useRoute() {
  const base = React.useContext(BaseContext)
  const pathname = usePathname() ?? "/"
  const p = base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname
  return p.length > 1 ? p.replace(/\/$/, "") : p
}

/** next/link that resolves template routes. */
export function AppLink({ href, ...props }: React.ComponentProps<typeof Link> & { href: string }) {
  const to = useHref()
  return <Link href={to(href)} {...props} />
}
