import { ArcPicker } from "@/registry/base-nova/ui/arc-picker"

const speeds = [
  { value: "0.5", label: "0.5×" },
  { value: "0.75", label: "0.75×" },
  { value: "1", label: "1×" },
  { value: "1.25", label: "1.25×" },
  { value: "1.5", label: "1.5×" },
  { value: "2", label: "2×" },
]

export default function ArcPickerSides() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <ArcPicker aria-label="Playback speed" options={speeds} defaultValue="1" side="bottom" className="w-72" />
        <span className="font-mono text-xs text-muted-foreground">side=&quot;bottom&quot;</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ArcPicker aria-label="Playback speed" options={speeds} defaultValue="1" side="top" className="w-72" />
        <span className="font-mono text-xs text-muted-foreground">side=&quot;top&quot;</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ArcPicker aria-label="Playback speed" options={speeds} defaultValue="1" side="left" className="w-40" />
        <span className="font-mono text-xs text-muted-foreground">side=&quot;left&quot;</span>
      </div>
    </div>
  )
}
