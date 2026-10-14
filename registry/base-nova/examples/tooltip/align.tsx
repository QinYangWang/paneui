import { Button } from "@/registry/base-nova/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

const aligns = ["start", "center", "end"] as const

export default function TooltipAlign() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {aligns.map((align) => (
        <Tooltip key={align}>
          <TooltipTrigger render={<Button variant="secondary" />}>Align {align}</TooltipTrigger>
          <TooltipContent side="bottom" align={align}>
            Lined up with the {align} edge
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
