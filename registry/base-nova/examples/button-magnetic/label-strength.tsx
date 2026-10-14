import { MagneticButton } from "@/registry/base-nova/ui/button-magnetic"

export default function ButtonMagneticLabelStrength() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <MagneticButton size="lg" labelStrength={0}>
          Flat
        </MagneticButton>
        <span className="text-xs text-muted-foreground">labelStrength 0</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <MagneticButton size="lg" labelStrength={0.3}>
          Layered
        </MagneticButton>
        <span className="text-xs text-muted-foreground">labelStrength 0.3</span>
      </div>
    </div>
  )
}
