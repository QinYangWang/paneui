import { PlayIcon } from "@/components/icons"
import { MagneticButton } from "@/registry/base-nova/ui/button-magnetic"

export default function ButtonMagneticVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <MagneticButton>Get started</MagneticButton>
      <MagneticButton variant="outline">
        <PlayIcon data-icon="inline-start" />
        Watch the tour
      </MagneticButton>
      <MagneticButton variant="ghost" size="sm">
        Contact sales
      </MagneticButton>
    </div>
  )
}
