"use client"

import * as React from "react"
import { ReactRenderer } from "@tiptap/react"
import type { SuggestionKeyDownProps, SuggestionOptions, SuggestionProps } from "@tiptap/suggestion"

import { cn } from "@/lib/utils"
import {
  MenuList,
  MenuListEmpty,
  MenuListGroup,
  MenuListItem,
  MenuListItemText,
  MenuListLabel,
  type MenuListHandle,
} from "@/registry/base-nova/ui/menu-list"

/**
 * Glue between Tiptap's suggestion plugin and a MenuList popup: the popup is
 * mounted into <body>, positioned by the plugin's floating-ui `mount`, and key
 * presses are forwarded from the editor (focus never leaves the text).
 */

export type SuggestionMenuItem = {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  group?: string
  /** Shown on the right (a markdown shortcut such as `#` or `---`). */
  hint?: string
}

export type SuggestionMenuProps<I extends SuggestionMenuItem> = {
  items: I[]
  command: (item: I) => void
  query: string
  emptyLabel?: string
  className?: string
}

/** The popup body: grouped rows with an icon tile, title, description and hint. */
function SuggestionMenu<I extends SuggestionMenuItem>({
  ref,
  items,
  command,
  emptyLabel = "No results",
  className,
}: SuggestionMenuProps<I> & { ref?: React.Ref<MenuListHandle> }) {
  const groups = React.useMemo(() => {
    const map = new Map<string, I[]>()
    for (const item of items) {
      const key = item.group ?? ""
      map.set(key, [...(map.get(key) ?? []), item])
    }
    return [...map.entries()]
  }, [items])

  return (
    <MenuList ref={ref} aria-label="Suggestions" className={cn("w-72", className)}>
      {items.length === 0 && <MenuListEmpty>{emptyLabel}</MenuListEmpty>}
      {groups.map(([group, groupItems]) => (
        <MenuListGroup key={group || "_"}>
          {group && <MenuListLabel>{group}</MenuListLabel>}
          {groupItems.map((item) => (
            <MenuListItem key={item.id} value={item.id} onSelect={() => command(item)} className="gap-2.5 py-0.5">
              {item.icon && (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-card shadow-raised">
                  {item.icon}
                </span>
              )}
              <MenuListItemText title={item.title} description={item.description} />
              {item.hint && <span className="ml-2 shrink-0 font-mono text-ui-2xs text-muted-foreground/72">{item.hint}</span>}
            </MenuListItem>
          ))}
        </MenuListGroup>
      ))}
    </MenuList>
  )
}

/**
 * `render` for a Tiptap suggestion: mounts `Component` (default SuggestionMenu)
 * with the plugin's items and forwards keys to its MenuList handle.
 */
export function suggestionRenderer<I extends SuggestionMenuItem>(
  options: { emptyLabel?: string; className?: string; Component?: typeof SuggestionMenu } = {}
): NonNullable<SuggestionOptions<I, I>["render"]> {
  const Component = options.Component ?? SuggestionMenu
  return () => {
    let renderer: ReactRenderer<MenuListHandle, SuggestionMenuProps<I> & { ref?: React.Ref<MenuListHandle> }> | null = null
    let unmount: (() => void) | null = null

    const propsFor = (p: SuggestionProps<I, I>) => ({
      items: p.items,
      query: p.query,
      command: (item: I) => p.command(item),
      emptyLabel: options.emptyLabel,
      className: options.className,
    })

    return {
      onStart: (p) => {
        renderer = new ReactRenderer(Component as never, { props: propsFor(p), editor: p.editor })
        const el = renderer.element as HTMLElement
        el.dataset.slot = "suggestion-popup"
        el.style.position = "absolute"
        el.style.zIndex = "50"
        document.body.appendChild(el)
        unmount = p.mount(el)
      },
      onUpdate: (p) => {
        renderer?.updateProps(propsFor(p))
      },
      onKeyDown: (p: SuggestionKeyDownProps) => {
        if (p.event.key === "Escape") return false
        return renderer?.ref?.onKeyDown(p.event) ?? false
      },
      onExit: () => {
        unmount?.()
        renderer?.element.remove()
        renderer?.destroy()
        renderer = null
        unmount = null
      },
    }
  }
}

/** Case-insensitive filter on title, id and keywords. */
export function filterSuggestionItems<I extends SuggestionMenuItem & { keywords?: string[] }>(items: I[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items.filter((i) => [i.title, i.id, ...(i.keywords ?? [])].some((s) => s.toLowerCase().includes(q)))
}

export { SuggestionMenu }
