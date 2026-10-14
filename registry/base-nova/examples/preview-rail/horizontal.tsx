import { PreviewRail } from "@/registry/base-nova/ui/preview-rail"

const chapters = [
  { id: "c1", label: "Chapter 1 — Arrival", description: "The ferry, the fog, the first night at the inn." },
  { id: "c2", label: "Chapter 2 — The Market", description: "Haggling over peaches and an unexpected letter." },
  { id: "c3", label: "Chapter 3 — The Ridge", description: "A four-hour climb and a storm on the way down." },
  { id: "c4", label: "Chapter 4 — Lanterns", description: "The festival, and who was missing from it." },
  { id: "c5", label: "Chapter 5 — Departure", description: "Loose ends, and the ferry back." },
  { id: "c6", label: "Afterword", description: "Notes on the places that inspired the book." },
]

export default function PreviewRailHorizontal() {
  return (
    <div className="flex h-64 w-full max-w-md items-end justify-center pb-4">
      <PreviewRail items={chapters} orientation="horizontal" side="start" defaultValue="c3" label="Chapters" />
    </div>
  )
}
