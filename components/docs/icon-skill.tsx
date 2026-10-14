"use client"

import * as React from "react"

import { CheckIcon, CopyIcon, DownloadIcon, FileIcon } from "@/components/icons"
import { CommandPill } from "@/components/docs/install-command"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Button } from "@/registry/base-nova/ui/button"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/base-nova/ui/collapsible"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
/** Served by app/skills/puffy-icons/SKILL.md/route.ts from skills/puffy-icons/SKILL.md. */
const SKILL_URL = `${BASE_PATH}/skills/puffy-icons/SKILL.md`
const INSTALL = "npx skills add QinYangWang/ui --skill puffy-icons"

/** Install command, copy/download and a collapsible preview of the puffy-icons agent skill. */
export function IconSkill({ skill }: { skill: string }) {
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <div className="flex flex-col gap-4">
      <CommandPill command={INSTALL} />
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
          <Button variant="ghost" size="sm" nativeButton={false} render={<a href={SKILL_URL} download="SKILL.md" />}>
            <DownloadIcon />
            Download
          </Button>
        </div>
        <CollapsiblePanel>
          <div className="pt-2">
            <AgentCodeBlock code={skill} language="markdown" maxHeight={480} copyable={false} />
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  )
}
