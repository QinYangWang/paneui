import { Parallax } from "@/registry/base-nova/ui/parallax"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

export default function ParallaxNoSpring() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="grid grid-cols-2 gap-3 px-4 py-40">
        <Parallax speed={0.35}>
          <div className="flex h-32 flex-col justify-end rounded-xl bg-card p-3 shadow-raised">
            <p className="text-sm font-medium text-foreground">spring</p>
            <p className="text-xs text-muted-foreground">Trails the scroll</p>
          </div>
        </Parallax>
        <Parallax speed={0.35} spring={false}>
          <div className="flex h-32 flex-col justify-end rounded-xl bg-card p-3 shadow-raised">
            <p className="text-sm font-medium text-foreground">spring=false</p>
            <p className="text-xs text-muted-foreground">Locked to the scroll</p>
          </div>
        </Parallax>
      </div>
    </SmoothScroll>
  )
}
