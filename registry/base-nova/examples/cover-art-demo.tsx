import { CoverArt } from "@/registry/base-nova/ui/cover-art"

export default function CoverArtDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-3">
      {([0, 1, 2, 3] as const).map((v) => (
        <div key={v} className="overflow-hidden rounded-xl shadow-raised">
          <CoverArt variant={v} className="aspect-video" />
        </div>
      ))}
    </div>
  )
}
