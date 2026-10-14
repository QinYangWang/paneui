import { HeartIcon, PinIcon, StarIcon, CheckIcon } from "@/components/icons"
import { ActionSwapCascadeButton } from "@/registry/base-nova/ui/action-swap-cascade"

export default function ActionSwapCascadeIconOnly() {
  return (
    <div className="flex items-center justify-center gap-2">
      <ActionSwapCascadeButton
        size="icon"
        variant="ghost"
        items={[
          { value: "like", label: "Like", icon: <HeartIcon />, ariaLabel: "Like" },
          { value: "liked", label: "Liked", icon: <CheckIcon />, ariaLabel: "Unlike" },
        ]}
      />
      <ActionSwapCascadeButton
        size="icon"
        variant="ghost"
        items={[
          { value: "star", label: "Star", icon: <StarIcon />, ariaLabel: "Star repository" },
          { value: "starred", label: "Starred", icon: <CheckIcon />, ariaLabel: "Unstar repository" },
        ]}
      />
      <ActionSwapCascadeButton
        size="icon"
        variant="outline"
        items={[
          { value: "pin", label: "Pin", icon: <PinIcon />, ariaLabel: "Pin to sidebar" },
          { value: "pinned", label: "Pinned", icon: <CheckIcon />, ariaLabel: "Unpin from sidebar" },
        ]}
      />
    </div>
  )
}
