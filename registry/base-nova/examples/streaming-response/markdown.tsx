import type { CitationSource } from "@/registry/base-nova/ui/citations"
import { StreamingResponse } from "@/registry/base-nova/ui/streaming-response"

const SOURCES: CitationSource[] = [
  { id: "jr", title: "Hokuriku Shinkansen timetable", domain: "jreast.co.jp" },
  { id: "kanazawa", title: "Kenroku-en opening hours", domain: "pref.ishikawa.jp" },
]

const TEXT = `## Day trip to Kanazawa

Take the **Kagayaki** from Tokyo; it's the fastest service at about *2.5 hours* [1].

1. Leave Tokyo on the 7:20 departure
2. Walk to Kenroku-en, which opens at 7:00 [2]
3. Lunch at Omicho Market

Book seats with \`car 7\` for the quiet car, or see the [station map](#station-map).`

export default function StreamingResponseMarkdown() {
  return <StreamingResponse text={TEXT} status="complete" sources={SOURCES} className="max-w-lg" />
}
