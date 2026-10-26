import { CoverArt } from "@paneui/ui/components/cover-art"

export default function CoverArtImage() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt image="https://paneui.dev/covers/sky.jpg" aria-label="Cover for Summer reading" className="aspect-video" />
      </div>
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt image="https://paneui.dev/covers/night.jpg" aria-label="Cover for Night shift" className="aspect-video" />
      </div>
    </div>
  )
}
