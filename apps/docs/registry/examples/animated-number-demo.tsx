import { AnimatedNumber } from "@paneui/ui/components/animated-number"

const STATS = [
  { label: "Tasks done", value: 1842, format: {} },
  { label: "Hours saved", value: 312.5, format: { maximumFractionDigits: 1 } },
  { label: "On time", value: 0.986, format: { style: "percent", maximumFractionDigits: 1 } },
] satisfies { label: string; value: number; format: Intl.NumberFormatOptions }[]

export default function AnimatedNumberDemo() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-1 rounded-2xl bg-card px-4 py-3 shadow-raised"
        >
          <AnimatedNumber
            value={s.value}
            locale="en-US"
            format={s.format}
            className="text-2xl font-semibold tracking-tight"
          />
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
