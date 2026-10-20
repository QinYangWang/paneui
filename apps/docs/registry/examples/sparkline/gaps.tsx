import { Sparkline } from "@paneui/ui/components/sparkline"

// A sensor that dropped two readings, and a new metric with no data yet.
const latency = [42, 40, 44, null, null, 47, 45, 49, null, 52, 50, 54]

export default function SparklineGaps() {
  return (
    <div className="grid w-full max-w-md grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 text-sm">
      {(["bridge", "break", "zero"] as const).map((gap) => (
        <div key={gap} className="contents">
          <span className="font-mono text-ui-sm text-muted-foreground">{gap}</span>
          <div className="text-chart-1">
            <Sparkline values={latency} gap={gap} variant="line" label={`Latency, gap ${gap}`} className="h-8" />
          </div>
        </div>
      ))}
      <span className="font-mono text-ui-sm text-muted-foreground">bars</span>
      <div className="text-chart-3">
        <Sparkline values={latency} variant="bar" label="Latency per hour" className="h-8" />
      </div>
      <span className="font-mono text-ui-sm text-muted-foreground">empty</span>
      <div className="text-muted-foreground">
        <Sparkline values={[]} label="No data yet" className="h-8" />
      </div>
    </div>
  )
}
