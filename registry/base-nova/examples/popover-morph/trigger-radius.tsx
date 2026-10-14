import { PlusIcon } from "@/components/icons"
import {
  MorphPopover,
  MorphPopoverClose,
  MorphPopoverContent,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverTrigger,
} from "@/registry/base-nova/ui/popover-morph"
import { Button } from "@/registry/base-nova/ui/button"

export default function PopoverMorphTriggerRadius() {
  return (
    <MorphPopover>
      <MorphPopoverTrigger>
        <PlusIcon />
        New
      </MorphPopoverTrigger>
      <MorphPopoverContent triggerRadius="var(--radius-lg)" className="w-56">
        <MorphPopoverHeader>
          <MorphPopoverTitle>Create</MorphPopoverTitle>
        </MorphPopoverHeader>
        <div className="flex flex-col gap-1">
          <MorphPopoverClose render={<Button variant="ghost" size="sm" className="w-full" />}>Document</MorphPopoverClose>
          <MorphPopoverClose render={<Button variant="ghost" size="sm" className="w-full" />}>Spreadsheet</MorphPopoverClose>
          <MorphPopoverClose render={<Button variant="ghost" size="sm" className="w-full" />}>Folder</MorphPopoverClose>
        </div>
      </MorphPopoverContent>
    </MorphPopover>
  )
}
