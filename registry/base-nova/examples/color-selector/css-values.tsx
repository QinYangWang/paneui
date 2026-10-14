import { ColorSelector, ColorSwatch } from "@/registry/base-nova/ui/color-selector"

const tokens = [
  { value: "var(--primary)", label: "Primary" },
  { value: "var(--success)", label: "Success" },
  { value: "var(--warning)", label: "Warning" },
  { value: "var(--destructive)", label: "Destructive" },
  { value: "var(--muted-foreground)", label: "Muted" },
]

export default function ColorSelectorCssValues() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium">Status colour</span>
      <ColorSelector defaultValue="var(--success)" aria-label="Status colour">
        {tokens.map((t) => (
          <ColorSwatch key={t.value} value={t.value} label={t.label} />
        ))}
      </ColorSelector>
    </div>
  )
}
