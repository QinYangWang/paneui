import { CoverArt } from "@paneui/ui/components/cover-art"

export default function CoverArtDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="col-span-2 overflow-hidden rounded-xl shadow-raised sm:col-span-4">
        <CoverArt className="aspect-video" />
      </div>
      {([0, 1, 2, 3, 4, 5, 6, 7] as const).map((v) => (
        <div key={v} className="overflow-hidden rounded-xl shadow-raised">
          <CoverArt variant={v} className="aspect-video" />
        </div>
      ))}
    </div>
  )
}
