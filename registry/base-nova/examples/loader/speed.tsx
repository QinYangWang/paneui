import { Loader } from "@/registry/base-nova/ui/loader"

const SPEEDS = [0.5, 1, 2]

export default function LoaderSpeed() {
  return (
    <div className="flex gap-10">
      {SPEEDS.map((speed) => (
        <div key={speed} className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <Loader variant="dots" speed={speed} label={`Loading at ${speed}× speed`} />
            <Loader variant="orbit" speed={speed} label={`Loading at ${speed}× speed`} />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">speed {speed}</span>
        </div>
      ))}
    </div>
  )
}
