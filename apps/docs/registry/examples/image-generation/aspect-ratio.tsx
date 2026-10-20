import { ImageGeneration } from "@paneui/ui/components/image-generation"

export default function ImageGenerationAspectRatio() {
  return (
    <div className="flex w-full max-w-xl items-start gap-4">
      <ImageGeneration status="complete" aspectRatio="3 / 4" meta="768 × 1024 · portrait" className="flex-1">
        <div className="bg-linear-to-b from-primary/70 to-success/60" />
      </ImageGeneration>
      <ImageGeneration status="refining" progress={0.8} aspectRatio="16 / 9" meta="1792 × 1024 · wide" className="flex-1">
        <div className="bg-linear-to-r from-warning/70 to-destructive/60" />
      </ImageGeneration>
    </div>
  )
}
