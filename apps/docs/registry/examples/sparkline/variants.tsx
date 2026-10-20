import { Sparkline } from "@paneui/ui/components/sparkline"

const values = [4, 6, 5, 8, 7, 9, 12, 10, 13, 15]

export default function SparklineVariants() {
  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-4">
      {(["area", "line", "bar"] as const).map((v) => (
        <div key={v} className="flex flex-col gap-2">
          <div className="text-chart-1"><Sparkline values={values} variant={v} className="h-10" /></div>
          <span className="text-center text-xs text-muted-foreground">{v}</span>
        </div>
      ))}
    </div>
  )
}
