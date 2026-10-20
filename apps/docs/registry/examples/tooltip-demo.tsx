import { CopyIcon, EditIcon, SettingsIcon, TrashIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Tooltip, TooltipContent, TooltipKbd, TooltipProvider, TooltipTrigger } from "@paneui/ui/components/tooltip"

const actions = [
  { label: "Edit", kbd: "E", icon: EditIcon },
  { label: "Copy", kbd: "⌘C", icon: CopyIcon },
  { label: "Settings", icon: SettingsIcon },
  { label: "Delete", kbd: "⌫", icon: TrashIcon },
]

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-1 rounded-xl bg-muted/60 p-1 shadow-well">
        {actions.map(({ label, kbd, icon: Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger render={<Button variant="secondary" size="icon" aria-label={label} />}>
              <Icon />
            </TooltipTrigger>
            <TooltipContent>
              {label}
              {kbd && <TooltipKbd>{kbd}</TooltipKbd>}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
