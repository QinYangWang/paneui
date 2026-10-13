import { CheckIcon, TrashIcon } from "@/components/icons"
import { HoldActionButton } from "@/registry/base-nova/ui/hold-action-button"

export default function HoldActionButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <HoldActionButton
        tone="destructive"
        holdingLabel="Keep holding to delete"
        completeLabel={
          <>
            <CheckIcon />
            Workspace deleted
          </>
        }
      >
        <TrashIcon />
        Hold to delete workspace
      </HoldActionButton>
      <HoldActionButton
        orientation="horizontal"
        holdDuration={1200}
        holdingLabel="Approving…"
        completeLabel="Payout approved"
      >
        Hold to approve $1,240 payout
      </HoldActionButton>
    </div>
  )
}
