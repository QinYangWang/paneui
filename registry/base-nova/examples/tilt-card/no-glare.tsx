import { TiltCard } from "@/registry/base-nova/ui/tilt-card"

export default function TiltCardNoGlare() {
  return (
    <TiltCard glare={false} scale={1} className="flex w-72 flex-col gap-3 p-5">
      <p className="text-xs font-medium text-muted-foreground">Invoice #2041</p>
      <p className="text-2xl font-semibold tracking-tight tabular-nums">$1,280.00</p>
      <p className="text-sm text-pretty text-muted-foreground">Due Nov 1 · Acme Design Studio</p>
    </TiltCard>
  )
}
