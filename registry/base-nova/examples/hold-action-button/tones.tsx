import { HoldActionButton } from "@/registry/base-nova/ui/hold-action-button"

export default function HoldActionButtonTones() {
  return (
    <div className="flex flex-col items-center gap-3">
      <HoldActionButton tone="primary" completeLabel="Order placed">
        Hold to place order
      </HoldActionButton>
      <HoldActionButton tone="success" completeLabel="Shift confirmed">
        Hold to confirm shift
      </HoldActionButton>
      <HoldActionButton tone="destructive" completeLabel="Subscription cancelled">
        Hold to cancel subscription
      </HoldActionButton>
    </div>
  )
}
