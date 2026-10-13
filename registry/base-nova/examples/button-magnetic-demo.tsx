import { ArrowRightIcon } from "@/components/icons"
import { MagneticButton } from "@/registry/base-nova/ui/button-magnetic"

export default function ButtonMagneticDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <MagneticButton size="lg">
        Start free trial
        <ArrowRightIcon data-icon="inline-end" />
      </MagneticButton>
      <MagneticButton variant="secondary" size="lg" strength={0.2}>
        Book a demo
      </MagneticButton>
    </div>
  )
}
