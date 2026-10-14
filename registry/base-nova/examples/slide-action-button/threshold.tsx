import { SlideActionButton } from "@/registry/base-nova/ui/slide-action-button"

export default function SlideActionButtonThreshold() {
  return (
    <div className="flex flex-col items-center gap-3">
      <SlideActionButton threshold={0.5} completeLabel="Checked in">
        Slide halfway to check in
      </SlideActionButton>
      <SlideActionButton threshold={0.98} completeLabel="Vault opened">
        Slide all the way to open
      </SlideActionButton>
    </div>
  )
}
