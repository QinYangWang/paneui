import { AspectRatio } from "@/registry/base-nova/ui/aspect-ratio"

export default function AspectRatioRadius() {
  return (
    <div className="grid w-full max-w-lg grid-cols-3 gap-4">
      {[0, 12, 32].map((radius) => (
        <AspectRatio key={radius} ratio={1} radius={radius} contentClassName="flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground tabular-nums">{radius}px</span>
        </AspectRatio>
      ))}
    </div>
  )
}
