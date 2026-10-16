"use client"

import * as React from "react"

import { CheckIcon, CopyIcon, DownloadIcon, FileIcon } from "@/components/icons"
import { CommandPill } from "@/components/docs/install-command"
import { Button } from "@/registry/base-nova/ui/button"
import { CodeBlock } from "@/registry/base-nova/ui/code-block"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
/**
 * Install command, copy/download and a collapsible preview of one of the repo's agent
 * skills. `SKILL.md` is served by app/skills/<name>/SKILL.md/route.ts from skills/<name>/SKILL.md;
 * `html` is the same text highlighted at build time.
 */
export function AgentSkill({ name, skill, html }: { name: string; skill: string; html: string }) {
  const skillUrl = `${BASE_PATH}/skills/${name}/SKILL.md`
  const install = `npx skills add QinYangWang/ui --skill ${name}`
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <div className="flex flex-col gap-4">
      <CommandPill command={install} />
      <Collapsible>
        <div className="frame-xl frame-p-1 flex items-center gap-1 bg-card shadow-raised">
          <CollapsibleTrigger className="min-w-0 flex-1">
            <FileIcon className="text-muted-foreground" />
            <span className="truncate font-mono">SKILL.md</span>
          </CollapsibleTrigger>
          <Button
            variant="ghost"
            size="sm"
            aria-live="polite"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(skill)
                setCopied(true)
              } catch {
                // clipboard blocked: the download link still works
              }
            }}
          >
            {copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="ghost" size="sm" nativeButton={false} render={<a href={skillUrl} download="SKILL.md" />}>
            <DownloadIcon />
            Download
          </Button>
        </div>
        <CollapsiblePanel>
          <div className="pt-2">
            <CodeBlock html={html} maxHeight={480} copyable={false} />
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}
