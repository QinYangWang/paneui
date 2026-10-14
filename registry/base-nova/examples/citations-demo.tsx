import { Citation, CitationGroup, Citations, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCES: CitationSource[] = [
  {
    id: "mdn",
    title: "Using the View Transitions API",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API",
    snippet: "The View Transition API provides a mechanism for easily creating animated transitions between different website views.",
    meta: "MDN Web Docs",
  },
  {
    id: "webdev",
    title: "Smooth transitions with the View Transition API",
    url: "https://developer.chrome.com/docs/web-platform/view-transitions",
    snippet: "Same-document view transitions are supported in Chrome 111+, and cross-document transitions from Chrome 126.",
    meta: "Updated Aug 2025",
  },
  {
    id: "caniuse",
    title: "View Transitions API (single-document)",
    url: "https://caniuse.com/view-transitions",
    snippet: "Supported in Chromium-based browsers and Safari 18.",
  },
]

export default function CitationsDemo() {
  return (
    <CitationGroup sources={SOURCES}>
      <div className="flex w-full max-w-lg flex-col gap-3">
        <p className="text-base leading-relaxed text-foreground/90">
          The View Transition API animates between two DOM states with a single call
          <Citation sourceId="mdn" />. Same-document transitions shipped in Chrome 111, with cross-document support
          following later
          <Citation sourceId="webdev" />, and Safari 18 added the single-document flavour
          <Citation sourceId="caniuse" />.
        </p>
        <Citations />
      </div>
    </CitationGroup>
  )
}
