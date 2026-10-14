import { HoldActionButton } from "@/registry/base-nova/ui/hold-action-button"

export default function HoldActionButtonDisabled() {
  return (
    <HoldActionButton disabled tone="destructive">
      Hold to delete (owner only)
    </HoldActionButton>
  )
}
