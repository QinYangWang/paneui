import { ColorSelector, ColorSwatch } from "@/registry/base-nova/ui/color-selector"

const colors = [
  { value: "blue", label: "Blue", color: "oklch(0.6 0.19 255)" },
  { value: "violet", label: "Violet", color: "oklch(0.58 0.2 295)" },
  { value: "rose", label: "Rose", color: "oklch(0.64 0.2 10)" },
  { value: "amber", label: "Amber", color: "oklch(0.8 0.16 75)" },
  { value: "emerald", label: "Emerald", color: "oklch(0.68 0.15 160)" },
]

export default function ColorSelectorSizes() {
  return (
    <div className="flex flex-col gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-14 text-xs text-muted-foreground">{size}</span>
          <ColorSelector size={size} defaultValue="violet" aria-label={`Label colour (${size})`}>
            {colors.map((c) => (
              <ColorSwatch key={c.value} value={c.value} color={c.color} label={c.label} />
            ))}
          </ColorSelector>
        </div>
      ))}
    </div>
  )
}
