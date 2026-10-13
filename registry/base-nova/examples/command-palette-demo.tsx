"use client"

import * as React from "react"

import {
  CalendarIcon,
  ChatIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  TrashIcon,
  UserIcon,
} from "@/components/icons"
import { CommandPalette, type CommandPaletteItem } from "@/registry/base-nova/blocks/command-palette/command-palette"
import { Button } from "@/registry/base-nova/ui/button"

export default function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false)
  const [last, setLast] = React.useState<string | null>(null)

  const items: CommandPaletteItem[] = [
    { id: "new-chat", label: "New chat", group: "Actions", icon: PlusIcon, shortcut: ["⌘", "N"] },
    { id: "ask", label: "Ask Hark to plan a trip", group: "Actions", icon: SparklesIcon, keywords: ["travel", "flight"] },
    { id: "compose", label: "Draft an email", group: "Actions", icon: MailIcon, shortcut: ["⌘", "E"] },
    { id: "theme", label: "Toggle dark mode", group: "Actions", icon: MoonIcon, keywords: ["theme", "light"], shortcut: ["⌘", "J"] },
    { id: "home", label: "Home", group: "Go to", icon: HomeIcon, shortcut: ["G", "H"] },
    { id: "calendar", label: "Calendar", group: "Go to", icon: CalendarIcon, description: "3 events today", shortcut: ["G", "C"] },
    { id: "chats", label: "Recent chats", group: "Go to", icon: ChatIcon },
    { id: "profile", label: "Profile", group: "Settings", icon: UserIcon },
    { id: "billing", label: "Billing and cards", group: "Settings", icon: CreditCardIcon, keywords: ["payment", "plan"] },
    { id: "prefs", label: "Preferences", group: "Settings", icon: SettingsIcon, shortcut: ["⌘", ","] },
    { id: "clear", label: "Clear chat history", group: "Settings", icon: TrashIcon, disabled: true },
  ]

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="secondary" onClick={() => setOpen(true)} className="w-64 justify-start text-muted-foreground">
        <SearchIcon data-icon="inline-start" />
        Search or jump to…
        <kbd className="ml-auto rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] shadow-chip">⌘K</kbd>
      </Button>
      <p className="text-xs text-muted-foreground">{last ? `Ran “${last}”` : "Press ⌘K anywhere on the page"}</p>
      <CommandPalette items={items} open={open} onOpenChange={setOpen} onSelect={(item) => setLast(item.label)} />
    </div>
  )
}
