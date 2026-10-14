import { CloudIcon, MoonIcon, StarIcon, SunIcon } from "@/components/icons"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { Parallax } from "@/registry/base-nova/ui/parallax"
import { SmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const SCENES = [
  { title: "Sunrise run", time: "06:30", icon: SunIcon },
  { title: "Deep work", time: "10:00", icon: CloudIcon },
  { title: "Evening walk", time: "19:45", icon: MoonIcon },
]

export default function ParallaxDemo() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well">
      <div className="flex flex-col gap-16 px-6 py-24">
        <p className="text-center text-xs text-muted-foreground">Scroll — the layers drift at different speeds</p>
        {SCENES.map(({ title, time, icon: Icon }, i) => (
          <div key={title} className="relative flex h-40 items-center justify-center">
            <Parallax speed={0.35} className="absolute inset-x-6 inset-y-0">
              <div className="size-full rounded-3xl bg-linear-to-br from-primary/25 to-primary/5" />
            </Parallax>
            <Parallax speed={-0.25} className={i % 2 ? "absolute top-2 left-4" : "absolute right-4 bottom-2"}>
              <StarIcon className="size-6 text-primary/60" />
            </Parallax>
            <Parallax speed={-0.1}>
              <div className="relative flex items-center gap-3 rounded-2xl bg-card bg-linear-to-b from-white/6 to-transparent px-4 py-3 shadow-raised">
                <IconChip tone="primary">
                  <Icon />
                </IconChip>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">{time}</p>
                </div>
              </div>
            </Parallax>
          </div>
        ))}
      </div>
    </SmoothScroll>
  )
}
