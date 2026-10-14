import { ArcPicker } from "@/registry/base-nova/ui/arc-picker"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => ({
  value: m.toLowerCase(),
  label: m,
}))

export default function ArcPickerCurve() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <ArcPicker aria-label="Month, tight curve" options={months} defaultValue="oct" radius={140} visibleCount={5} />
        <span className="font-mono text-xs text-muted-foreground">radius={140} · 5 visible</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ArcPicker
          aria-label="Month, gentle curve"
          options={months}
          defaultValue="oct"
          radius={480}
          itemSpacing={36}
          visibleCount={9}
        />
        <span className="font-mono text-xs text-muted-foreground">radius={480} · 9 visible</span>
      </div>
    </div>
  )
}
