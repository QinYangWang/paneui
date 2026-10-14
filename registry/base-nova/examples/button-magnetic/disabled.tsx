import { MagneticButton } from "@/registry/base-nova/ui/button-magnetic"

export default function ButtonMagneticDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <MagneticButton disabled>Checkout unavailable</MagneticButton>
      <MagneticButton variant="secondary" wrapperClassName="ml-4" strength={0.45} range={48}>
        Wide pull zone
      </MagneticButton>
    </div>
  )
}
