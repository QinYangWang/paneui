"use client"

import * as React from "react"
import { useLocale } from "@paneui/ui/components/locale-provider"
import { isNodeSelection, type Editor } from "@tiptap/core"
import { useEditorState } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"

import {
  BaselineIcon,
  BoldIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  TrashIcon,
  UnderlineIcon,
} from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import {
  getBlockTypes,
  getHighlightColors,
  getTextColors,
  type BlockType,
} from "@paneui/ui/blocks/notion-editor/block-types"
import { Button } from "@paneui/ui/components/button"
import { Input } from "@paneui/ui/components/input"
import { Menu, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuTrigger } from "@paneui/ui/components/menu"
import { Popover, PopoverContent, PopoverTrigger } from "@paneui/ui/components/popover"
import { SwatchPicker, type Swatch } from "@paneui/ui/components/swatch-picker"
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggle } from "@paneui/ui/components/toolbar"
import { Tooltip, TooltipContent, TooltipKbd, TooltipTrigger } from "@paneui/ui/components/tooltip"

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
const mod = isMac ? "⌘" : "Ctrl+"

function Tip({ label, kbd, children }: { label: string; kbd?: string; children: React.ReactElement }) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="top" sideOffset={10}>
        {label}
        {kbd && <TooltipKbd>{kbd}</TooltipKbd>}
      </TooltipContent>
    </Tooltip>
  )
}

/** Default: show on a non-empty text selection outside code blocks. */
export function shouldShowTextBubble({ editor, element, from, to }: { editor: Editor; element: HTMLElement; from: number; to: number }) {
  if (!editor.isEditable || from === to) return false
  // only while the user is in the editor (or working inside the bubble itself)
  if (!editor.view.hasFocus() && !element.contains(document.activeElement)) return false
  const { selection } = editor.state
  if (isNodeSelection(selection)) return false
  if (editor.isActive("codeBlock") || editor.isActive("mdxBlock")) return false
  return editor.state.doc.textBetween(from, to, " ").trim().length > 0
}

type BubbleProps = {
  editor: Editor
  /** "Turn into" targets; `false` hides the dropdown. */
  blockTypes?: BlockType[] | false
  /** Show the text colour / highlight picker. Default true. */
  colors?: boolean
  /** Palettes for the colour picker (theme tokens by default; pass hex for email). The first entry (no `color`) clears. */
  textColors?: Swatch[]
  highlightColors?: Swatch[]
  /** Extra toolbar items appended at the end. */
  children?: React.ReactNode
  shouldShow?: typeof shouldShowTextBubble
  className?: string
}

/** Floating format bar over a text selection: turn into, marks, link, colour. */
export function EditorBubbleMenu({
  editor,
  blockTypes,
  colors = true,
  textColors,
  highlightColors,
  children,
  shouldShow = shouldShowTextBubble,
  className,
}: BubbleProps) {
  const l10n = useLocale().labels
  if (highlightColors === undefined) highlightColors = getHighlightColors(l10n)
  if (textColors === undefined) textColors = getTextColors(l10n)
  if (blockTypes === undefined) blockTypes = getBlockTypes(l10n)

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      code: e.isActive("code"),
      link: e.isActive("link"),
      href: (e.getAttributes("link").href as string | undefined) ?? "",
      color: (e.getAttributes("textStyle").color as string | undefined) ?? "default",
      highlight: e.isActive("highlight") ? ((e.getAttributes("highlight").color as string | undefined) ?? "default") : "default",
      block: blockTypes ? (blockTypes.find((b) => b.isActive(e)) ?? null) : null,
    }),
  })

  const [linkOpen, setLinkOpen] = React.useState(false)
  React.useEffect(() => {
    // ⌘K opens the link editor from the keyboard
    const storage = (editor.storage as unknown as Record<string, { openLink?: () => void } | undefined>).notionShortcuts
    if (!storage) return
    storage.openLink = () => setLinkOpen(true)
    return () => {
      storage.openLink = undefined
    }
  }, [editor])

  const toggle = (run: () => boolean) => () => {
    run()
  }
  const BlockIcon = state.block?.icon

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="notionBubbleMenu"
      shouldShow={shouldShow}
      appendTo={() => document.body}
      options={{ placement: "top", offset: 8, flip: true, shift: { padding: 8 } }}
      className="z-40"
    >
      <Toolbar variant="floating" aria-label={l10n.format} className={cn("motion-safe:animate-in motion-safe:fade-in-0", className)}>
        {blockTypes && (
          <>
            <Menu>
              <MenuTrigger
                render={
                  <ToolbarButton aria-label={l10n.turnInto} size="label" className="text-foreground">
                    {BlockIcon && <BlockIcon className="size-3.5" />}
                    <span className="max-w-24 truncate">{state.block?.label ?? l10n.text}</span>
                    <ChevronDownIcon className="size-3 opacity-60" />
                  </ToolbarButton>
                }
              />
              <MenuContent className="w-48" sideOffset={8}>
                <MenuGroup>
                  <MenuLabel>{l10n.turnInto}</MenuLabel>
                  {blockTypes.map((b) => (
                    <MenuItem key={b.id} onClick={() => b.apply(editor)}>
                      <b.icon />
                      {b.label}
                      {state.block?.id === b.id && <CheckIcon className="ml-auto !text-foreground" />}
                    </MenuItem>
                  ))}
                </MenuGroup>
              </MenuContent>
            </Menu>
            <ToolbarSeparator />
          </>
        )}
        <Tip label={l10n.bold} kbd={`${mod}B`}>
          <ToolbarToggle aria-label={l10n.bold} pressed={state.bold} onPressedChange={toggle(() => editor.chain().focus().toggleBold().run())}>
            <BoldIcon />
          </ToolbarToggle>
        </Tip>
        <Tip label={l10n.italic} kbd={`${mod}I`}>
          <ToolbarToggle aria-label={l10n.italic} pressed={state.italic} onPressedChange={toggle(() => editor.chain().focus().toggleItalic().run())}>
            <ItalicIcon />
          </ToolbarToggle>
        </Tip>
        <Tip label={l10n.underline} kbd={`${mod}U`}>
          <ToolbarToggle aria-label={l10n.underline} pressed={state.underline} onPressedChange={toggle(() => editor.chain().focus().toggleUnderline().run())}>
            <UnderlineIcon />
          </ToolbarToggle>
        </Tip>
        <Tip label={l10n.strikethrough} kbd={`${mod}⇧S`}>
          <ToolbarToggle aria-label={l10n.strikethrough} pressed={state.strike} onPressedChange={toggle(() => editor.chain().focus().toggleStrike().run())}>
            <StrikethroughIcon />
          </ToolbarToggle>
        </Tip>
        <Tip label={l10n.inlineCode} kbd={`${mod}E`}>
          <ToolbarToggle aria-label={l10n.inlineCode} pressed={state.code} onPressedChange={toggle(() => editor.chain().focus().toggleCode().run())}>
            <CodeIcon />
          </ToolbarToggle>
        </Tip>
        <ToolbarSeparator />
        <Popover open={linkOpen} onOpenChange={setLinkOpen}>
          <PopoverTrigger
            render={
              <ToolbarButton aria-label={l10n.link} data-pressed={state.link ? "" : undefined}>
                <LinkIcon />
              </ToolbarButton>
            }
          />
          <PopoverContent side="bottom" sideOffset={10} className="w-72 p-2">
            <LinkForm
              key={String(linkOpen) + state.href}
              href={state.href}
              onApply={(href) => {
                if (href) editor.chain().focus().extendMarkRange("link").setLink({ href }).run()
                else editor.chain().focus().extendMarkRange("link").unsetLink().run()
                setLinkOpen(false)
              }}
              onRemove={
                state.link
                  ? () => {
                      editor.chain().focus().extendMarkRange("link").unsetLink().run()
                      setLinkOpen(false)
                    }
                  : undefined
              }
            />
          </PopoverContent>
        </Popover>
        {colors && (
          <Popover>
            <PopoverTrigger
              render={
                <ToolbarButton aria-label={l10n.colour} className="gap-0.5 px-1">
                  <BaselineIcon style={state.color !== "default" ? { color: state.color } : undefined} />
                  <ChevronDownIcon className="size-3 opacity-60" />
                </ToolbarButton>
              }
            />
            <PopoverContent side="bottom" sideOffset={10} className="w-fit gap-3 p-3">
              <SwatchPicker
                label={l10n.textColour}
                variant="letter"
                swatches={textColors}
                value={state.color}
                onValueChange={(value) => {
                  if (value === "default") editor.chain().focus().unsetColor().run()
                  else editor.chain().focus().setColor(String(value)).run()
                }}
              />
              <SwatchPicker
                label={l10n.background}
                swatches={highlightColors}
                value={state.highlight}
                onValueChange={(value) => {
                  if (value === "default") editor.chain().focus().unsetHighlight().run()
                  else editor.chain().focus().setHighlight({ color: String(value) }).run()
                }}
              />
            </PopoverContent>
          </Popover>
        )}
        {children}
      </Toolbar>
    </BubbleMenu>
  )
}

function LinkForm({ href, onApply, onRemove }: { href: string; onApply: (href: string) => void; onRemove?: () => void }) {
  const l10n = useLocale().labels

  const [value, setValue] = React.useState(href)
  return (
    <form
      className="flex items-center gap-1.5"
      onSubmit={(e) => {
        e.preventDefault()
        const v = value.trim()
        onApply(v && !/^[a-z][a-z0-9+.-]*:|^\/|^#|^mailto:/i.test(v) ? `https://${v}` : v)
      }}
    >
      <Input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder={l10n.pasteOrTypeALink} aria-label={l10n.linkURL} className="h-7" />
      <Button type="submit" size="icon-sm" variant="ghost" aria-label={l10n.applyLink}>
        <CheckIcon />
      </Button>
      {onRemove && (
        <Button type="button" size="icon-sm" variant="ghost" aria-label={l10n.removeLink} onClick={onRemove}>
          <TrashIcon />
        </Button>
      )}
    </form>
  )
}
