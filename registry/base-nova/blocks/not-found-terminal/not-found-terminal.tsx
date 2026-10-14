"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/base-nova/ui/button"

type NotFoundProps = Omit<React.ComponentProps<"div">, "title" | "children"> & {
  /** The big status code. Default "404". */
  code?: string
  title?: React.ReactNode
  description?: React.ReactNode
  homeHref?: string
  homeLabel?: React.ReactNode
  /** Optional second action; hidden when no href is given. */
  secondaryHref?: string
  secondaryLabel?: React.ReactNode
}

function NotFoundCopy({
  title = "Page not found",
  description = "The page you're looking for moved, was renamed, or never existed.",
  homeHref = "/",
  homeLabel = "Back home",
  secondaryHref,
  secondaryLabel = "Contact support",
}: Pick<NotFoundProps, "title" | "description" | "homeHref" | "homeLabel" | "secondaryHref" | "secondaryLabel">) {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-balance">{title}</h1>
        <p className="max-w-sm text-sm text-pretty text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <a href={homeHref} className={buttonVariants({ size: "lg" })}>
          {homeLabel}
        </a>
        {secondaryHref && (
          <a href={secondaryHref} className={buttonVariants({ variant: "secondary", size: "lg" })}>
            {secondaryLabel}
          </a>
        )}
      </div>
    </>
  )
}

type TerminalLine = { kind: "cmd" | "out" | "err" | "ok"; text: string }

type NotFoundTerminalProps = NotFoundProps & {
  /** The path the visitor asked for, shown in the failed `cd`. */
  path?: string
  /** Prompt prefix. Default "~". */
  prompt?: string
  /** Typing speed in ms per character. Default 38. */
  speed?: number
  /** Window title. */
  windowTitle?: string
}

/**
 * 404 page as a terminal session: it types a `cd` into the missing path, prints
 * the failure and the 404 status, then idles on a blinking caret. Reduced motion
 * shows the whole session at once.
 */
function NotFoundTerminal({
  code = "404",
  path = "/this-page",
  prompt = "~",
  speed = 38,
  windowTitle = "zsh",
  title,
  description,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  className,
  ...props
}: NotFoundTerminalProps) {
  const reduce = useReducedMotion()
  const script = React.useMemo<TerminalLine[]>(
    () => [
      { kind: "cmd", text: `cd ${path}` },
      { kind: "err", text: `cd: no such file or directory: ${path}` },
      { kind: "cmd", text: `curl -sI ${path} | head -1` },
      { kind: "err", text: `HTTP/2 ${code} Not Found` },
    ],
    [path, code]
  )
  // Progress through the script: index of the line being written and how many characters of it.
  const [cursor, setCursor] = React.useState({ line: 0, char: 0 })
  const finished = cursor.line >= script.length

  React.useEffect(() => {
    setCursor(reduce ? { line: script.length, char: 0 } : { line: 0, char: 0 })
  }, [script, reduce])

  React.useEffect(() => {
    if (reduce || finished) return
    const line = script[cursor.line]
    const typing = line.kind === "cmd"
    let delay: number
    let next: { line: number; char: number }
    if (typing && cursor.char < line.text.length) {
      delay = cursor.char === 0 ? 450 : speed + Math.random() * speed * 0.6
      next = { line: cursor.line, char: cursor.char + 1 }
    } else {
      // Output lands all at once, after a beat for "running".
      delay = typing ? 260 : 120
      next = { line: cursor.line + 1, char: 0 }
    }
    const id = window.setTimeout(() => setCursor(next), delay)
    return () => window.clearTimeout(id)
  }, [cursor, finished, reduce, script, speed])

  const rows = script.slice(0, Math.min(cursor.line + 1, script.length)).map((l, i) => {
    const current = i === cursor.line
    if (l.kind === "cmd") return { ...l, text: current ? l.text.slice(0, cursor.char) : l.text, current }
    return current ? null : { ...l, current: false }
  })

  const promptEl = (
    <span className="text-success">
      {prompt}
      <span className="text-muted-foreground"> $ </span>
    </span>
  )
  const caretEl = (
    <span
      aria-hidden
      className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-foreground/80 animate-[nf-caret_1.05s_steps(1)_infinite] motion-reduce:animate-none"
    />
  )

  return (
    <div
      data-slot="not-found-terminal"
      className={cn("flex min-h-[420px] w-full flex-col items-center justify-center gap-7 px-4 text-center", className)}
      {...props}
    >
      <style>{`@keyframes nf-caret{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card text-left shadow-surface">
        <div className="flex h-9 items-center gap-1.5 border-b border-border/70 px-3.5">
          <span className="size-2.5 rounded-full bg-destructive/80" />
          <span className="size-2.5 rounded-full bg-warning/80" />
          <span className="size-2.5 rounded-full bg-success/80" />
          <span className="flex-1 pr-10 text-center text-xs text-muted-foreground">{windowTitle}</span>
        </div>
        <p className="sr-only">
          {script.map((l) => (l.kind === "cmd" ? `$ ${l.text}. ` : `${l.text}. `))}
        </p>
        <pre aria-hidden className="min-h-[9.5rem] overflow-x-auto bg-muted/40 px-4 py-3.5 font-mono text-[13px] leading-6 whitespace-pre-wrap break-all shadow-well">
          {rows.map((row, i) =>
            row === null ? null : row.kind === "cmd" ? (
              <div key={i}>
                {promptEl}
                {row.text}
                {row.current && caretEl}
              </div>
            ) : (
              <div key={i} className={row.kind === "err" ? "text-destructive" : "text-muted-foreground"}>
                {row.text}
              </div>
            )
          )}
          {finished && (
            <div>
              {promptEl}
              {caretEl}
            </div>
          )}
        </pre>
      </div>
      <NotFoundCopy {...{ title, description, homeHref, homeLabel, secondaryHref, secondaryLabel }} />
    </div>
  )
}

export { NotFoundTerminal, type NotFoundTerminalProps }
