import { CoverArt } from "@paneui/ui/components/cover-art"

export default function CoverArtRtl() {
  return (
    <div dir="rtl" className="grid w-full max-w-md grid-cols-2 gap-3">
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt variant={1} aria-label="غلاف مقال" className="aspect-video" />
      </div>
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt variant={3} aria-label="غلاف مقال" className="aspect-video" />
      </div>
    </div>
  )
}
