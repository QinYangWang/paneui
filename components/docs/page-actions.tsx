"use client"

import * as React from "react"
import { siClaude } from "simple-icons"

import { ChatIcon, CheckIcon, ChevronDownIcon, CopyIcon, ExternalLinkIcon, FileIcon, LinkIcon } from "@/components/icons"
import { ActionSwapBlurIcon } from "@/registry/base-nova/ui/action-swap-blur"
import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { Button } from "@/registry/base-nova/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/registry/base-nova/ui/button-group"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from "@/registry/base-nova/ui/menu"
import { useToast } from "@/registry/base-nova/ui/toast"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** Absolute URL of a site path on the host the page is served from. */
const absolute = (p: string) => new URL(`${BASE_PATH}${p}`, window.location.origin).toString()

/**
 * "Copy page" and its menu, next to the page title. The Markdown is the static `/docs/<slug>.md`
 * written at build time, so the copy, the raw view and the chat links all read the same file.
 */
export function PageActions({ markdownPath, pagePath, title }: { markdownPath: string; pagePath: string; title: string }) {
  const toast = useToast()
  const [copied, setCopied] = React.useState(false)
  const cache = React.useRef<Promise<string> | null>(null)
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])

  const markdown = () => {
    cache.current ??= fetch(absolute(markdownPath)).then((r) => {
      if (!r.ok) throw new Error(String(r.status))
      return r.text()
    })
    cache.current.catch(() => (cache.current = null))
    return cache.current
  }

  const flash = () => {
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  const copyMarkdown = async () => {
    try {
      // Safari only allows a clipboard write inside the gesture, so hand it a promise of the text.
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": markdown().then((t) => new Blob([t], { type: "text/plain" })) })])
      } else {
        await navigator.clipboard.writeText(await markdown())
      }
      flash()
      toast.add({ title: "Copied as Markdown", type: "success" })
    } catch {
      toast.add({ title: "Couldn't copy this page", description: "Open it as Markdown instead.", type: "error" })
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(absolute(pagePath))
      toast.add({ title: "Link copied", type: "success" })
    } catch {
      toast.add({ title: "Couldn't copy the link", type: "error" })
    }
  }

  const openChat = (base: string) => {
    const prompt = `Read ${absolute(markdownPath)} so I can ask questions about ${title} in qinyang/ui.`
    window.open(`${base}${encodeURIComponent(prompt)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <ButtonGroup data-md-skip className="shrink-0">
      <Button variant="secondary" size="sm" onClick={copyMarkdown}>
        <ActionSwapBlurIcon value={copied ? "copied" : "copy"} className="size-3.5">
          {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
        </ActionSwapBlurIcon>
        Copy page
      </Button>
      <ButtonGroupSeparator />
      <Menu>
        <MenuTrigger render={<Button variant="secondary" size="icon-sm" aria-label="More page actions" />}>
          <ChevronDownIcon />
        </MenuTrigger>
        <MenuContent align="end" className="min-w-52">
          <MenuGroup>
            <MenuItem onClick={copyMarkdown}>
              <CopyIcon />
              Copy as Markdown
            </MenuItem>
            <MenuItem onClick={() => window.open(absolute(markdownPath), "_blank", "noopener,noreferrer")}>
              <FileIcon />
              View as Markdown
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuItem onClick={() => openChat("https://chatgpt.com/?hints=search&q=")}>
              {/* The brand icon package leaves this mark out, so it gets a neutral chat glyph. */}
              <ChatIcon />
              Open in ChatGPT
              <ExternalLinkIcon className="ms-auto rtl:-scale-x-100" />
            </MenuItem>
            <MenuItem onClick={() => openChat("https://claude.ai/new?q=")}>
              <BrandIcon icon={siClaude} />
              Open in Claude
              <ExternalLinkIcon className="ms-auto rtl:-scale-x-100" />
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem onClick={copyLink}>
            <LinkIcon />
            Copy page link
          </MenuItem>
        </MenuContent>
      </Menu>
    </ButtonGroup>
  )
}
