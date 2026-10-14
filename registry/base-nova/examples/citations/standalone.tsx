import { Citation, type CitationSource } from "@/registry/base-nova/ui/citations"

const SOURCE: CitationSource = {
  id: "jma",
  title: "Weather forecast for Kyoto Prefecture",
  domain: "jma.go.jp",
  url: "https://www.jma.go.jp/bosai/forecast/",
  snippet: "Cloudy with occasional rain from the afternoon; chance of rain 70% after 15:00.",
  meta: "Japan Meteorological Agency",
}

export default function CitationsStandalone() {
  return (
    <p className="max-w-lg text-base leading-relaxed text-pretty">
      Pack an umbrella: rain is likely in Kyoto from mid-afternoon on Saturday
      <Citation source={SOURCE} index={1} />.
    </p>
  )
}
