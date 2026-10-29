"use client"

import * as React from "react"

type Loader<P> = () => Promise<React.ComponentType<P> | { default: React.ComponentType<P> }>
type Options = { ssr?: boolean; loading?: () => React.ReactNode }

/** next/dynamic on the Astro site. `ssr: false` renders `loading` (or nothing) until mounted in the browser. */
export default function dynamic<P extends object>(loader: Loader<P>, options: Options = {}) {
  const Lazy = React.lazy(async () => {
    const mod = await loader()
    return { default: "default" in (mod as object) ? (mod as { default: React.ComponentType<P> }).default : (mod as React.ComponentType<P>) }
  })
  const fallback = options.loading ? options.loading() : null
  function Dynamic(props: P) {
    const [mounted, setMounted] = React.useState(options.ssr !== false)
    React.useEffect(() => setMounted(true), [])
    if (!mounted) return <>{fallback}</>
    return (
      <React.Suspense fallback={fallback}>
        <Lazy {...(props as P & React.JSX.IntrinsicAttributes)} />
      </React.Suspense>
    )
  }
  return Dynamic
}
