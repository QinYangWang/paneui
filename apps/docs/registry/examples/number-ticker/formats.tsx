import { NumberTicker } from "@paneui/ui/components/number-ticker"

export default function NumberTickerFormats() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={4280}
          locale="en-US"
          format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
          className="text-2xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">Trip budget</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={0.72}
          locale="en-US"
          format={{ style: "percent" }}
          className="text-2xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">Inbox cleared</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberTicker
          value={128400}
          locale="en-US"
          format={{ notation: "compact", maximumFractionDigits: 1 }}
          className="text-2xl font-semibold tracking-tight"
        />
        <span className="text-xs text-muted-foreground">Monthly visitors</span>
      </div>
    </div>
  )
}
