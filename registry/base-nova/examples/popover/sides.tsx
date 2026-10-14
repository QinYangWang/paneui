import { Button } from "@/registry/base-nova/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@/registry/base-nova/ui/popover"

const sides = ["top", "right", "bottom", "left"] as const

export default function PopoverSides() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="secondary" size="sm" />}>{side}</PopoverTrigger>
          <PopoverContent side={side} className="w-56">
            <PopoverDescription>Opens on the {side}, and flips if there is no room.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
