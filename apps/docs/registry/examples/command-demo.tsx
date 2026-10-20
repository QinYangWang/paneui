import { CalendarDaysIcon, FileIcon, InboxIcon, SettingsIcon, UserIcon } from "@paneui/ui/icons"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@paneui/ui/components/command"

export default function CommandDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl shadow-surface">
    <Command>
      <CommandInput placeholder="Type a command or search…" aria-label="Search commands" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <InboxIcon />
            Inbox
          </CommandItem>
          <CommandItem>
            <CalendarDaysIcon />
            Calendar
          </CommandItem>
          <CommandItem keywords={["doc", "page"]}>
            <FileIcon />
            New file
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Preferences
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
  )
}
