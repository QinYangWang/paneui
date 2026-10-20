import { AspectRatio } from "@paneui/ui/components/aspect-ratio"

const ratios = [
  { label: "16:9", value: 16 / 9, use: "Video" },
  { label: "4:3", value: 4 / 3, use: "Photo" },
  { label: "1:1", value: 1, use: "Avatar" },
]

export default function AspectRatioRatios() {
  return (
    <div className="grid w-full max-w-lg grid-cols-3 items-end gap-4">
      {ratios.map((r) => (
        <div key={r.label} className="flex flex-col gap-2">
          <AspectRatio ratio={r.value} radius={12} contentClassName="flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground tabular-nums">{r.label}</span>
          </AspectRatio>
          <span className="text-xs text-muted-foreground">{r.use}</span>
        </div>
      ))}
    </div>
  )
}
