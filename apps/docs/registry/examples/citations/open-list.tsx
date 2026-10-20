import { Citation, CitationGroup, Citations, type CitationSource } from "@paneui/ui/components/citations"

const SOURCES: CitationSource[] = [
  { id: "a", title: "Tokyo to Osaka by Shinkansen", domain: "japan-guide.com", snippet: "The Nozomi takes about 2 hours 15 minutes." },
  { id: "b", title: "JR Pass prices from October 2023", domain: "jrpass.com", snippet: "A 7-day ordinary pass costs ¥50,000." },
]

export default function CitationsOpenList() {
  return (
    <CitationGroup sources={SOURCES} defaultOpen>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-pretty">
          The fastest train takes about 2 hours 15 minutes
          <Citation sourceId="a" />, and a 7-day rail pass now costs ¥50,000
          <Citation sourceId="b" />.
        </p>
        <Citations title="References" />
      </div>
    </CitationGroup>
  )
}
