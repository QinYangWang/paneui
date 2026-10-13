import { SparklesIcon } from "@/components/icons"
import { TiltCard, TiltCardLayer } from "@/registry/base-nova/ui/tilt-card"

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-64 p-5">
      <TiltCardLayer depth={28} className="flex flex-col gap-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary bg-linear-to-b from-white/14 to-transparent text-primary-foreground shadow-primary">
          <SparklesIcon size={18} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[0.95rem] font-semibold tracking-tight">Pro plan</p>
          <p className="text-sm leading-relaxed text-muted-foreground">Unlimited projects, preview deploys and priority builds.</p>
        </div>
        <p className="text-2xl font-semibold tracking-tight">
          $12<span className="text-sm font-medium text-muted-foreground"> / month</span>
        </p>
      </TiltCardLayer>
    </TiltCard>
  )
}
