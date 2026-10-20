import { InfoIcon } from "@paneui/ui/icons"
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverDescription,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverTrigger,
} from "@paneui/ui/components/popover-morph"

const placements = [
  { label: "Bottom start", side: "bottom", align: "start" },
  { label: "Bottom end", side: "bottom", align: "end" },
  { label: "Top center", side: "top", align: "center" },
] as const

export default function PopoverMorphPlacement() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {placements.map((p) => (
        <MorphPopover key={p.label}>
          <MorphPopoverTrigger>
            <InfoIcon />
            {p.label}
          </MorphPopoverTrigger>
          <MorphPopoverContent side={p.side} align={p.align}>
            <MorphPopoverHeader>
              <MorphPopoverTitle>Grows from the trigger</MorphPopoverTitle>
              <MorphPopoverDescription>
                The panel stays pinned to the trigger&apos;s {p.align} edge and opens toward the {p.side}.
              </MorphPopoverDescription>
            </MorphPopoverHeader>
          </MorphPopoverContent>
        </MorphPopover>
      ))}
    </div>
  )
}
