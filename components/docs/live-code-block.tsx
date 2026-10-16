"use client"

import * as React from "react"
import type { HighlighterCore } from "shiki/core"

import { CodeBlock, type CodeBlockProps } from "@/registry/base-nova/ui/code-block"

/*
 * CodeBlock for code that changes while you watch (the CSS the Customize panels
 * generate). One small highlighter with only the CSS grammar loads once; after
 * that every change is highlighted in the same render, so the block never shows
 * stale code. Until it loads the code renders plain.
 */

const THEMES = { light: "github-light-default", dark: "github-dark-default" } as const
let loading: Promise<HighlighterCore> | null = null

function loadHighlighter() {
  loading ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/langs/css.mjs"),
    import("shiki/themes/github-light-default.mjs"),
    import("shiki/themes/github-dark-default.mjs"),
  ]).then(([core, engine, css, light, dark]) =>
    core.createHighlighterCore({
      themes: [light.default, dark.default],
      langs: [css.default],
      engine: engine.createJavaScriptRegexEngine({ forgiving: true }),
    })
  )
  return loading
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const plain = (code: string) =>
  `<pre class="shiki"><code>${code.split("\n").map((l) => `<span class="line">${escape(l)}</span>`).join("\n")}</code></pre>`

export function LiveCodeBlock({ code, ...props }: Omit<CodeBlockProps, "html" | "children" | "language"> & { code: string }) {
  const [hl, setHl] = React.useState<HighlighterCore | null>(null)
  React.useEffect(() => {
    let live = true
    loadHighlighter()
      .then((h) => live && setHl(h))
      .catch(() => {
        /* stays plain */
      })
    return () => {
      live = false
    }
  }, [])
  const html = React.useMemo(
    () => (hl ? hl.codeToHtml(code, { lang: "css", themes: THEMES, defaultColor: false }) : plain(code)),
    [hl, code]
  )
  return <CodeBlock html={html} language="css" {...props} />
}
