import { CoverArt } from "@paneui/ui/components/cover-art"

const looks = [
  { mirror: "none", ramp: 0 },
  { mirror: "x", ramp: 1 },
  { mirror: "xy", ramp: 2 },
] as const

export default function CoverArtTones() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
      {looks.map((l) => (
        <div key={l.mirror} className="overflow-hidden rounded-xl shadow-raised">
          <CoverArt variant={6} mirror={l.mirror} ramp={l.ramp} className="aspect-video" />
        </div>
      ))}
    </div>
  )
}
