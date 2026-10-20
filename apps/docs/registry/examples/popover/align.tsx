import { Button } from "@paneui/ui/components/button"
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@paneui/ui/components/popover"

const aligns = ["start", "center", "end"] as const

export default function PopoverAlign() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {aligns.map((align) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="secondary" size="sm" />}>Align {align}</PopoverTrigger>
          <PopoverContent align={align} className="w-56">
            <PopoverDescription>Lined up with the trigger&apos;s {align} edge.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
