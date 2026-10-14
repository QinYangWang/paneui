import { ColorSelector, ColorSwatch } from "@/registry/base-nova/ui/color-selector"

const colors = [
  { value: "graphite", label: "Graphite", color: "oklch(0.35 0 0)" },
  { value: "silver", label: "Silver", color: "oklch(0.86 0 0)" },
  { value: "blue", label: "Blue (sold out)", color: "oklch(0.6 0.19 255)", disabled: true },
  { value: "sage", label: "Sage", color: "oklch(0.72 0.06 150)" },
]

export default function ColorSelectorDisabled() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Finish</span>
        <ColorSelector defaultValue="graphite" aria-label="Finish">
          {colors.map((c) => (
            <ColorSwatch key={c.value} value={c.value} color={c.color} label={c.label} disabled={c.disabled} />
          ))}
        </ColorSelector>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Finish (locked after shipping)</span>
        <ColorSelector defaultValue="sage" disabled aria-label="Finish, locked">
          {colors.map((c) => (
            <ColorSwatch key={c.value} value={c.value} color={c.color} label={c.label} />
          ))}
        </ColorSelector>
      </div>
    </div>
  )
}
