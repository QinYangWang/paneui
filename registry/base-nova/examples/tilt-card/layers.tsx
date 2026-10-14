import { CreditCardIcon } from "@/components/icons"
import { TiltCard, TiltCardLayer } from "@/registry/base-nova/ui/tilt-card"

export default function TiltCardLayers() {
  return (
    <TiltCard max={14} perspective={700} className="h-48 w-80 p-5">
      <div aria-hidden className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary to-primary/60" />
      <TiltCardLayer depth={12} className="relative flex h-full flex-col justify-between text-primary-foreground">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">Acme Card</span>
          <TiltCardLayer depth={32}>
            <CreditCardIcon size={24} />
          </TiltCardLayer>
        </div>
        <TiltCardLayer depth={40} className="flex flex-col gap-1">
          <span className="font-mono text-lg tracking-wider tabular-nums">•••• •••• •••• 4242</span>
          <span className="text-xs opacity-80">Mei Lin · 09/29</span>
        </TiltCardLayer>
      </TiltCardLayer>
    </TiltCard>
  )
}
