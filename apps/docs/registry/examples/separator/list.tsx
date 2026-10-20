import { Separator } from "@paneui/ui/components/separator"

const rows = [
  ["Plan", "Team"],
  ["Seats", "8 of 10"],
  ["Renews", "Nov 1, 2026"],
]

export default function SeparatorList() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2.5 text-ui">
      {rows.map(([k, v], i) => (
        <div key={k} className="flex flex-col gap-2.5">
          {i > 0 && <Separator />}
          <div className="flex justify-between">
            <span className="text-muted-foreground">{k}</span>
            <span className="tabular-nums">{v}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
