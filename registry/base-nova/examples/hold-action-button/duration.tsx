import { HoldActionButton } from "@/registry/base-nova/ui/hold-action-button"

export default function HoldActionButtonDuration() {
  return (
    <div className="flex flex-col items-center gap-3">
      <HoldActionButton orientation="horizontal" holdDuration={600} completeLabel="Marked as read">
        Quick hold · 0.6s
      </HoldActionButton>
      <HoldActionButton
        orientation="horizontal"
        tone="destructive"
        holdDuration={3000}
        holdingLabel="Still holding…"
        completeLabel="Account closed"
        hint="Press and hold for three seconds to close your account"
      >
        Long hold · 3s
      </HoldActionButton>
    </div>
  )
}
