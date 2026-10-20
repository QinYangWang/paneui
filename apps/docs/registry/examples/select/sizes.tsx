import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@paneui/ui/components/select"

const rows = [
  { value: "10", label: "10 rows" },
  { value: "25", label: "25 rows" },
  { value: "50", label: "50 rows" },
]

export default function SelectSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Select key={size} size={size} items={rows} defaultValue="25">
          <SelectTrigger className="w-auto" aria-label={`Rows (${size})`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rows.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
