import { CoverArt } from "@paneui/ui/components/cover-art"

export default function CoverArtDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
      <div className="col-span-2 overflow-hidden rounded-xl shadow-raised">
        <CoverArt seed="designing-for-desktop-density" className="aspect-video" />
      </div>
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt image="https://paneui.dev/covers/sky.jpg" className="aspect-video" />
      </div>
      <div className="overflow-hidden rounded-xl shadow-raised">
        <CoverArt shader="grain-gradient" palette={["#ff8a3d", "#ffd36e", "#8fd3ff"]} className="aspect-video" />
      </div>
    </div>
  )
}
