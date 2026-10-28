"use client"

import { CodeBlock, type CodeBlockProps } from "@paneui/ui/components/code-block"

/*
 * Static code on the docs site: highlighted at build time in the page frontmatter
 * (highlight()/highlightAll() in lib/build.ts), rendered here from the html. Nothing is tokenized
 * in the browser. Replaces the Next-era async <DocsCode code=…>.
 */
type StaticCodeProps = Omit<CodeBlockProps, "html" | "children"> & {
  html: string
  /** Title bar text, usually the file name. */
  filename?: string
  /** Language id the html was highlighted as; shown with the title. Use languageOf(filename) in frontmatter. */
  language?: string
}

export function StaticCode({ html, filename, title, language, lineNumbers = Boolean(filename), ...props }: StaticCodeProps) {
  const head = title ?? filename
  return <CodeBlock html={html} title={head} language={head !== undefined ? language : undefined} lineNumbers={lineNumbers} {...props} />
}
