import { Citation, CitationGroup, Citations, type CitationSource } from "@paneui/ui/components/citations"

const SOURCES: CitationSource[] = [
  {
    id: "hko",
    title: "Tropical cyclone warning signals",
    url: "https://www.hko.gov.hk/en/wservice/tsheet/pms/tcws.htm",
    snippet: "Signal No. 8 is issued when gale or storm force winds are expected.",
  },
  {
    id: "mtr",
    title: "Train service during typhoons",
    url: "https://www.mtr.com.hk/en/customer/main/index.html",
    snippet: "Open-air sections may be suspended under Signal No. 8 or above.",
  },
]

export default function CitationsNoRemoteFavicons() {
  return (
    <CitationGroup sources={SOURCES} favicon={false} defaultOpen>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-pretty">
          Under Signal No. 8 offices close
          <Citation sourceId="hko" />, and open-air rail lines may stop running
          <Citation sourceId="mtr" />.
        </p>
        <Citations />
      </div>
    </CitationGroup>
  )
}
