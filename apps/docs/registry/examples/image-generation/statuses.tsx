import { ImageGeneration, type ImageGenerationStatus } from "@paneui/ui/components/image-generation"

const STATUSES: ImageGenerationStatus[] = ["queued", "generating", "refining", "error"]

export default function ImageGenerationStatuses() {
  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-4">
      {STATUSES.map((status) => (
        <ImageGeneration key={status} status={status} queuePosition={3} meta={status}>
          <div className="bg-linear-to-br from-primary via-primary/50 to-success/70" />
        </ImageGeneration>
      ))}
    </div>
  )
}
