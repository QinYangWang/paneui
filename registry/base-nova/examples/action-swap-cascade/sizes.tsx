import { BellIcon, CheckIcon } from "@/components/icons"
import { ActionSwapCascadeButton } from "@/registry/base-nova/ui/action-swap-cascade"

const items = [
  { value: "follow", label: "Follow", icon: <BellIcon /> },
  { value: "following", label: "Following", icon: <CheckIcon /> },
]

export default function ActionSwapCascadeSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ActionSwapCascadeButton size="xs" variant="secondary" items={items} />
      <ActionSwapCascadeButton size="sm" variant="secondary" items={items} />
      <ActionSwapCascadeButton variant="secondary" items={items} />
      <ActionSwapCascadeButton size="lg" variant="secondary" items={items} />
    </div>
  )
}
