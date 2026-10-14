import { Button } from "@/registry/base-nova/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/base-nova/ui/tooltip"

const sides = ["top", "right", "bottom", "left"] as const

export default function TooltipSides() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="secondary" />}>{side}</TooltipTrigger>
          <TooltipContent side={side}>Opens on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
