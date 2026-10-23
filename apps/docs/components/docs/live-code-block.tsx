"use client"

import * as React from "react"
import { highlight, plainHighlight } from "@paneui/ui/lib/highlight"
import { CodeBlock, type CodeBlockProps } from "@paneui/ui/components/code-block"

export function LiveCodeBlock({ code, ...props }: Omit<CodeBlockProps, "html" | "children" | "language"> & { code: string }) {
  const [result, setResult] = React.useState<{ code: string; html: string } | null>(null)
  React.useEffect(() => {
    let active = true
    highlight(code, "css").then((html) => { if (active) setResult({ code, html }) })
    return () => { active = false }
  }, [code])
  return <CodeBlock html={result?.code === code ? result.html : plainHighlight(code)} language="css" {...props} />
}
