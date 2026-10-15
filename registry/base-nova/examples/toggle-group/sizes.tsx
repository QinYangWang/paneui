import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/registry/base-nova/ui/toggle-group"

export default function ToggleGroupSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup key={size} size={size} defaultValue={["left"]} aria-label={`Alignment (${size})`}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  )
}
