"use client"

import * as React from "react"

import { withBase } from "./next-navigation"

type Url = string | { pathname?: string; query?: Record<string, string>; hash?: string }

type LinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  href: Url
  prefetch?: boolean | null
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  legacyBehavior?: boolean
}

function toHref(href: Url) {
  if (typeof href === "string") return href
  const q = href.query ? `?${new URLSearchParams(href.query)}` : ""
  return `${href.pathname ?? ""}${q}${href.hash ? `#${href.hash}` : ""}`
}

/** next/link on the Astro site: a plain anchor with the base path added. */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, ...rest },
  ref
) {
  // Next-only props have no meaning on a plain anchor.
  const props = { ...rest }
  for (const k of ["prefetch", "replace", "scroll", "shallow", "passHref", "legacyBehavior"] as const) delete props[k]
  return <a ref={ref} href={withBase(toHref(href))} {...props} />
})

export default Link
