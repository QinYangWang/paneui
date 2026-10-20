import { CitationCount, CitationList, CitationStack, type CitationSource } from "@paneui/ui/components/citations"

const SOURCES: CitationSource[] = [
  { id: "nhk", title: "Typhoon No. 14 heads north", domain: "nhk.or.jp" },
  { id: "jma", title: "Storm warnings for Kyushu", domain: "jma.go.jp" },
  { id: "ana", title: "Flight status updates", domain: "ana.co.jp" },
  { id: "jr", title: "Shinkansen service suspensions", domain: "jr-central.co.jp" },
]

export default function CitationsListAndCount() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-card p-4 shadow-raised">
      <div className="flex items-center justify-between gap-3">
        <CitationStack sources={SOURCES} limit={4} />
        <CitationCount count={SOURCES.length} />
      </div>
      <CitationList sources={SOURCES} />
    </div>
  )
}
