import type { CitationSource } from "@paneui/ui/components/citations"
import { StreamingResponse } from "@paneui/ui/components/streaming-response"

const SOURCES: CitationSource[] = [
  { id: "hko", title: "9-day weather forecast", domain: "hko.gov.hk" },
  { id: "afcd", title: "Dragon’s Back trail guide", domain: "afcd.gov.hk" },
]

export default function StreamingResponseSourcesOpen() {
  return (
    <StreamingResponse
      text="Saturday looks dry with a high of 26°C [1], so Dragon’s Back is a good pick: about 8.5 km and three hours [2]."
      status="complete"
      sources={SOURCES}
      defaultSourcesOpen
      showActions={false}
      className="max-w-lg"
    />
  )
}
