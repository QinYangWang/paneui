import * as React from "react"

/** Renders `code` spans and [text](href) links in hand-written doc strings. */
export function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  const re = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] != null)
      parts.push(
        <code key={m.index} className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
          {m[1]}
        </code>,
      )
    else
      parts.push(
        <a
          key={m.index}
          href={m[3]}
          className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          {m[2]}
        </a>,
      )
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
