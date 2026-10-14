import { CalendarDaysIcon, FileIcon, InboxIcon } from "@/components/icons"
import { Citation, CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCES: CitationSource[] = [
  { id: "lease", title: "Lease agreement 2025.pdf", icon: <FileIcon />, snippet: "Either party may terminate with 60 days’ written notice.", meta: "Page 4" },
  { id: "email", title: "Re: Renewal terms", icon: <InboxIcon />, snippet: "Happy to renew at the current rate if you sign by November 30.", meta: "From the landlord · Oct 2" },
  { id: "calendar", title: "Lease ends", icon: <CalendarDaysIcon />, snippet: "All-day event · Jan 31, 2027" },
]

export default function CitationsFileSources() {
  return (
    <CitationGroup sources={SOURCES}>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-pretty">
          You need to give 60 days’ notice
          <Citation sourceId="lease" />, and the landlord will hold the current rent if you sign by November 30
          <Citation sourceId="email" />. The lease ends on January 31
          <Citation sourceId="calendar" />.
        </p>
        <Citations />
      </div>
    </CitationGroup>
  )
}
