import { Sparkline } from "@paneui/ui/components/sparkline"

export default function Extrema() {
  return <div className="w-40 text-chart-1"><Sparkline values={[12, 8, 16, 22, 14, 18]} extrema label="8–22" /></div>
}
