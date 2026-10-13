import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
}) {
  const html = await codeToHtml(code, { lang, theme: "github-dark-default" })
  return (
    <div data-slot="code-block" className={cn("overflow-hidden rounded-2xl bg-[#0d1117] shadow-surface", className)}>
      {title && (
        <div className="flex h-10 items-center border-b border-white/6 px-4 font-mono text-xs text-muted-foreground">{title}</div>
      )}
      <div className="relative">
        <CopyButton value={code} className="absolute top-2.5 right-2.5 z-10" />
        <div
          className="max-h-[32rem] overflow-auto text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:pr-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
